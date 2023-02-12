const redis = require("redis");
module.exports = {
  connectToServer: async function () {
    this.client.on("error", (err) => console.log("Redis Client Error", err));
    await this.client.connect();
    console.log("Redis connected!");
  },
  client: redis.createClient({
    host: "localhost",
    port: 6379,
  }),
};
