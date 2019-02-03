const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 8084});
const Storage = require('./storage');
const Matcher = require('./matcher');

let storage = new Storage();
let matcher = new Matcher();
let accounts = storage.getStoredAccounts();

wss.parseMessage = function(client, message) {
    let code = message.split('//')[0];

    switch (code) {
        case "101":
            let authenticated = false;

            console.log("client is trying to authenticate");
            for (let i = 0; i < accounts.length; i++) {
                if (!accounts[i]["login"].localeCompare(message.split('//')[1]) &&
                    !accounts[i]["password"].localeCompare(message.split('//')[2])) {

                    accounts[i]["id"] = client.id;
                    accounts[i]["token"] = wss.generateId();
                    accounts[i]["username"] = "";
                    accounts[i]["isSearching"] = false;
                    accounts[i]["partnerId"] = -1;
                    accounts[i]["partnerUsername"] = "";
                    accounts[i]["ws"] = client;

                    console.log("Authentication success");

                    client.send("102//" + accounts[i]["token"]);
                    authenticated = true;
                }
            }
            if (!authenticated) {
                client.send('103//');
            }
            break;
        case "201":
            if (!storage.lookForExistingLogin(accounts, message.split('//')[1])) {
                console.log("error : login already exists");
                client.send('203//');
            }
            else {
                console.log("client is trying to create an account");
                let account = {};

                account["id"] = client.id;
                account["login"] = message.split('//')[1];
                account["password"] = message.split('//')[2];
                account["username"] = "";
                account["isSearching"] = false;
                account["partnerId"] = -1;
                account["partnerUsername"] = "";
                account["ws"] = client;

                console.log("created account : " + account["login"] + " , " + account["password"]);

                accounts.push(account);

                storage.storeAccount(account).then(function (value) {
                    if (value) {
                        client.send('202//');
                    } else {
                        client.send('204//');
                    }
                });
            }
            break;
        case "301":
            console.log(message.split('//')[2]);
            for (let i = 0; i < accounts.length; i++) {
                if (!accounts[i]["id"].localeCompare(client.id) && !accounts[i]["token"].localeCompare(message.split('//')[2])) {
                    accounts[i]["username"] = message.split('//')[1];
                    accounts[i]["isSearching"] = true;

                    let matchedClient = matcher.matchPartner(accounts, client, i);

                    if (matchedClient !== undefined) {
                        let clientUsername;

                        accounts[i]["isSearching"] = false;
                        accounts[i]["partnerId"] = matchedClient.id;
                        accounts[i]["partnerUsername"] = matchedClient.username;
                        clientUsername = accounts[i]["username"];

                        let toSend = "302//" + accounts[i]["partnerUsername"];

                        console.log("sending : " + toSend);

                        client.send(toSend);

                        for (let j = 0; j < accounts.length; j++) {
                            if (!accounts[j]["id"].localeCompare(matchedClient.id)) {
                                accounts[j]["isSearching"] = false;
                                accounts[j]["partnerId"] = client.id;
                                accounts[j]["partnerUsername"] = clientUsername;

                                let toSend = "302//" + accounts[j]["partnerUsername"];

                                console.log("sending to partner : " + toSend);

                                accounts[j]["ws"].send(toSend);
                            }
                        }
                    }
                    else {
                        client.send("303//");
                    }
                }
            }
            break;
        case "311":
            for (let i = 0; i < accounts.length; i++) {
                if (!accounts[i]["id"].localeCompare(client.id) && !accounts[i]["token"].localeCompare(message.split('//')[1])) {

                    if (accounts[i]["accountAssetLink"] !== undefined) {
                        storage.getAccountAsset(accounts[i]).then(function (value) {
                            if (value !== false) {
                                ws.send(value);
                            }
                        });
                    }
                }
            }
            break;
        case "401":
            let partnerId = "";

            for (let i = 0; i < accounts.length; i++) {
                if (!accounts[i]["id"].localeCompare(client.id)  && !accounts[i]["token"].localeCompare(message.split('//')[2])) {
                    partnerId = accounts[i]["partnerId"];
                }
            }

            for (let i = 0; i < accounts.length; i++) {
                if (!accounts[i]["id"].localeCompare(partnerId)) {
                    let toSend = "402//" + message.split('//')[1];

                    console.log("sending : " + toSend);

                    accounts[i]["ws"].send(toSend);
                }
            }
            break;
        // TODO
        case "403":
            break;
        case "501":
            let partnerToLeaveId = "";

            for (let i = 0; i < accounts.length; i++) {
                if (!accounts[i]["id"].localeCompare(client.id)  && !accounts[i]["token"].localeCompare(message.split('//')[1])) {
                    partnerToLeaveId = accounts[i]["partnerId"];

                    accounts[i]["partnerId"] = -1;
                    accounts[i]["partnerUsername"] = "";
                }
            }

            for (let i = 0; i < accounts.length; i++) {
                if (!accounts[i]["id"].localeCompare(partnerToLeaveId)) {
                    accounts[i]["partnerId"] = -1;
                    accounts[i]["partnerUsername"] = "";
                }
            }
            break;
        default:
            console.log("unknown code");
            client.send("Unknown request");
            break;
    }
};

console.log("listening");

wss.generateId = function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

wss.on('connection', function(ws) {
    ws.id = wss.generateId();

    ws.on('message', function incoming(message) {
        wss.parseMessage(ws, message);
    });
});