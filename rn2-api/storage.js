class Storage {
    getStoredAccounts() {
        let fs = require('fs');
        let accounts = JSON.parse(fs.readFileSync('./storage/accounts/accounts.json', 'utf-8'));

        for (let i = 0; i < accounts.length; i++) {
            accounts[i]["id"] = "";
            accounts[i]["username"] = "";
            accounts[i]["isSearching"] = false;
            accounts[i]["partnerId"] = -1;
            accounts[i]["partnerUsername"] = "";
        }

        return accounts;
    }

    lookForExistingLogin(accounts, login) {
        for (let i = 0; i < accounts.length; i++) {
            if (!accounts[i]["login"].localeCompare(login)) {
                return false;
            }
        }
        return true;
    }

    storeAccount(account) {
        return new Promise(function(resolve, reject) {
            let fs = require('fs');
            let storedAccounts;

            fs.readFile('./storage/accounts/accounts.json', 'utf-8', function(err, data) {
                if (err) {
                    reject(err);
                }

                storedAccounts = JSON.parse(data);

                let replaceIndex = -1;

                for (let i = 0; i < storedAccounts.length; i++) {
                    if (!storedAccounts[i]["login"].localeCompare(account["login"])) {
                        replaceIndex = i;
                    }
                }

                if (replaceIndex > -1) {
                    storedAccounts[replaceIndex]["password"] = account["password"];

                    if (account["accountAssetLink"] !== undefined) {
                        storedAccounts[replaceIndex]["accountAssetLink"] = account["accountAssetLink"];
                    }
                }
                else {
                    storedAccounts[storedAccounts.length] = {};
                    storedAccounts[storedAccounts.length - 1]["login"] = account["login"];
                    storedAccounts[storedAccounts.length - 1]["password"] = account["password"];

                    if (account["accountAssetLink"] !== undefined) {
                        storedAccounts[storedAccounts.length - 1]["accountAssetLink"] = account["accountAssetLink"];
                    }
                }

                console.log("write ok");
                fs.writeFile('./storage/accounts/accounts.json', JSON.stringify(storedAccounts), 'utf-8', function(err) {
                    if (err)
                        reject(err);
                    else {
                        resolve(true)
                    }
                });
            })
        });
    }

    getStoredAssetsLinks(account) {
        let fs = require('fs');
        return JSON.parse(fs.readFileSync('./storage/accounts/assetsLinks.json', 'utf-8'));
    }

    getAccountAsset(account) {
        return new Promise(function(resolve, reject) {
            let fs = require('fs');
            let assetsLinks = this.getStoredAccounts();

            for (let i = 0; i < assetsLinks.length; i++) {
                if (!account["login"].localeCompare(assetsLinks["login"])) {

                    fs.readFile(assetsLinks[i]["path"], function(err, data) {
                        if (err) {
                            reject(false);
                        }

                        resolve(data);
                    })
                }
            }
        });
    }

    storeAccountImage(account) {

    }

    generateId() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4();
    }
}

module.exports = Storage;