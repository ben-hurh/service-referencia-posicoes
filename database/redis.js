const Redis = require("ioredis");
const redis = new Redis({
    port: 6379,
    host: "192.168.1.247",
    db: 2,
});

module.exports = redis;