class Matcher {
    matchPartner(accounts, client, clientIndex) {
        const random = require('random-js');
        let searchingClients = [];

        for (let i = 0; i < accounts.length; i++) {
            if (i !== clientIndex && accounts[i]["isSearching"] === true) {
                searchingClients.push(accounts[i]);
            }
        }

        if (searchingClients.length > 0) {
            let randomMatchedClient;

            if (searchingClients.length > 1) {
                randomMatchedClient = searchingClients[random.integer(0, searchingClients.length - 1)];
            } else {
                randomMatchedClient = searchingClients[0];
            }

            console.log("randomMatchedClient : " + randomMatchedClient["username"]);

            return randomMatchedClient;
        }
        return undefined;
    }
}

module.exports = Matcher;