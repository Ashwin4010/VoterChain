var blockchain = require('./js/blockchain');
var admin = require('./js/admin');
var client = require('./js/client');
var express = require('express');
var bodyParser = require('body-parser');
var os = require('os');

var platform = os.platform();
var browser;
if(platform !== "linux" && platform !== "darwin") {
    console.log(os.platform()+' not supported...');
    process.exit(0);
}

if (process.argv[2] === "admin") {
    selectBrowser();
    admin.server(browser);
    admin.cleanUp();
} else if (process.argv[2] === "client") {
    selectBrowser();
    client.server(browser);
    client.cleanUp();
} else if(process.argv[2] === "help") {
    helpMes();
} else {
    console.log("Command Usage error...\n");
    helpMes();
}

function helpMes() {
    if(platform === "linux") {
        console.log("USAGE:\tsudo npm start [client|admin] [firefox|chrome]");
    } else if(platform === "darwin") {
        console.log("USAGE:\tsudo npm start [client|admin] [safari|firefox|chrome]");
    }
    console.log("HELP:\tnpm start help");
    process.exit(0);
}

function selectBrowser() {
    if(process.argv[3] === "chrome") {
        if(platform === "linux") {
            browser = "google-chrome";
        } else {
            browser = "google chrome"
        }
    } else if(process.argv[3] === "firefox") {
        browser = "firefox";
    } else if(process.argv[3] === "safari" && platform === "darwin") {
        browser = "safari";
    } else {
        console.log("Command Usage error...\n");
        helpMes();
    }
}