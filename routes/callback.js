var express = require('express');
var router = express.Router();
const axios = require('axios');

const base = "https://api.groupme.com/v3/";

router.post('/', function (req, res, next) {
    if(req.body["text"].includes("@everyone")) {
        axios.get(base + "groups?token=" + process.env.GROUPME_TOKEN)
            .then(function (response) {
                let names = [];
                // console.log(response.data)
                // console.log(req.body)
                for(let i = 0; i < response.data["response"].length; i++) {
                    if(response.data["response"][i]["group_id"] === req.body["group_id"]) {
                        for(let k = 0; k < response.data["response"][i]["members"].length; k++) {
                            names.push(response.data["response"][i]["members"][k]["id"]);
                        }
                        break;
                    }
                }
                console.log(names)
                let currMsg = "";
                // for(let i = 0; i < names.length; i++) {
                //     if(currMsg.length > 1000 - names[i].length - 2) {
                //         axios.post(base + "bots/post?token=" + process.env.GROUPME_TOKEN, {
                //             "bot_id": process.env.GROUPME_BOT_ID,
                //             "text": "test"
                //         }).then(function(response) {
                //             console.log("Posted message " + response.data["message"]["id"] + " to group " + req.body["group_id"]);
                //             currMsg = "";
                //         }).catch(function(error) {
                //             console.log(error);
                //         })
                //     }
                //     currMsg += "@" + names[i] + " ";
                // }
                axios.post(base + "bots/post?token=" + process.env.GROUPME_TOKEN, {
                    "bot_id": process.env.GROUPME_BOT_ID,
                    "text": "",
                    "attachments": [
                        {
                            "type": "mentions",
                            "user_ids": [parseInt(names[0])]
                        }
                    ]
                }).then(function(response) {
                    console.log(response.data);
                    currMsg = "";
                }).catch(function(error) {
                    console.log(error);
                })

            })
            .catch(function (error) {
                console.log(error);
            })
    }
    res.send("completed");
});

module.exports = router;
