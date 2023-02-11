const redis = require("../configs/redis");

const isCacheAvail = async (key) => {
  try {
    const isCacheAvail = await redis.client.get(key);
    return isCacheAvail ? true : false;
  } catch (e) {
    console.log(e);
  }
};

const getValueUsers = async (key) => {
  const value = await redis.client.get(key);
  return value;
};

const setValueUsers = async (key, value) => {
  try {
    console.log("Create user cache!");
    await redis.client.set(key, value);
    return true;
  } catch (e) {
    console.log(e);
  }
};

const deleteCacheUsers = async (key) => {
  console.log(`Delete Cache :${key}`);
  await redis.client.del(key);
};

module.exports = {
  isCacheAvail,
  getValueUsers,
  setValueUsers,
  deleteCacheUsers,
};
