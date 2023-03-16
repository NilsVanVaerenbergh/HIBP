//Imports
require("dotenv").config();
const crypto = require('crypto')
const prompt = require('prompt-sync')();
// Vraag gebruiker om informatie.
const name = prompt("What is your username?");
const pw = prompt("what is your password?");
// Heeft gebruiker niet alles ingevuld sluit process.
if(!name || !pw) {
    return console.log("Fill in everything"), process.exit(0);
}
// Creeër hash van meegegeven wachtwoord
let shasum = crypto.createHash("sha1");
shasum.update(pw);
let hashedPW = shasum.digest("hex").toUpperCase()
let firstHalf = hashedPW.substring(0, 5);
let lastHalf = hashedPW.substring(6, hashedPW.length);
// Api call tijd.
fetch("https://api.pwnedpasswords.com/range/" + firstHalf, {method: "get"})
.then(response => response.text())
.then(data => {
    let found = data.split("\n").find(hash => hash = lastHalf);
    if(!found) {
        return console.log("Not found");
    }
    return console.log(`Your password has been breached ${found.charAt(36)} times`)
})
.catch(err => console.log(err))
