const express = require("express");
const redis = require("redis");

const redisURL = "redis://127.0.0.1:6379"
redis.createClient(redisURL);

const app = express();



app.listen(8080, () => {
    console.log("Hey, now listening on port 8080!");
});