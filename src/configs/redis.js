const redis = require("redis");
module.exports = {
  connectToServer: async function () {
    this.client.on("error", (err) => console.log("Redis Client Error", err));
    await this.client.connect();
    console.log("Redis connected!");
  },
  client: redis.createClient({
    host: "127.0.0.1",
    port: 6379,
  }),
};
