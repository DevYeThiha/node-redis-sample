const { default: axios } = require("axios");
const express = require("express");
const redis = require("redis");
const util = require("util");
const redisURL = "redis://127.0.0.1:6379"
const client = redis.createClient(redisURL);

client.set = util.promisify(client.set);
client.get = util.promisify(client.get);

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
    const { key, value } = req.body;
    const response = await client.set(key, value);
    res.json(response);
});

app.get("/", async (req, res) => {
    const { key } = req.body;
    const value = await client.get(key);
    res.json(value);
});

app.get("/posts/:id", async (req,res) => {
    const { id } = req.params;

    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);

    return res.json(response.data);
});

app.listen(8080, () => {
    console.log("Hey, now listening on port 8080!");
});