const express = require("express");
const redis = require("redis");
const util = require("util");
const redisURL = "redis://127.0.0.1:6379"
const client = redis.createClient(redisURL);

client.set = util.promisify(client.set);

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
    const { key, value } = req.body;
    const response = await client.set(key, value);
    res.json(response);
});

app.listen(8080, () => {
    console.log("Hey, now listening on port 8080!");
});