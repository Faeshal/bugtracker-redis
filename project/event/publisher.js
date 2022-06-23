require("pretty-error").start();
const Redis = require("ioredis");
const redis = new Redis();
const log = require("log4js").getLogger("publisher");
log.level = "info";

async function publish(dataObj) {
  const { stream } = dataObj;
  log.info("nama stream", stream);
  await redis.xadd(
    stream, // stream name
    "*", // means redis give incremental data id
    "data", // key
    JSON.stringify(dataObj) // value
  );
  log.info("sent ✈️", dataObj);
}

module.exports = publish;
