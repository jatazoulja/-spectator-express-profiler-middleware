const os = require("./os-utils");
const { getStackTrace } = require("./helpers");
module.exports = (callback, asyncToggle) => {
  return (req, res, next) => {
    req.Debug = require("./debug")(req);
    const send = res.send;
    let timestamps = [];
    const startTime = Date.now();
    res.timestamp = () => {
      if (timestamps.length === 0) {
        timestamps.push(Date.now() - startTime);
        return;
      }
      timestamps.push(Date.now() - timestamps[timestamps.length - 1]);
      return;
    };
    res.send = async function (json) {
      send.call(this, json);
      const endTime = Date.now();

      const profile = {
        request: {
          uri: req.originalUrl,
          method: req.method,
          headers: req.headers,
          params: req.params,
          query: req.query,
          body: req.body,
        },
        response: {
          status: {
            code: res.statusCode,
            message: res.statusMessage,
          },
          body: json,
        },
        date: endTime,
        elapsedTime: endTime - startTime,
        timestamps,
        logs: req.logs,
        OS: {
          cpuCount: os.cpuCount(),
          sysUptime: os.sysUptime(),
          processUptime: os.processUptime(),
          freemem: os.freemem(),
          totalmem: os.totalmem(),
          freememPercentage: os.freememPercentage(),
          harddrive: asyncToggle ? await os.harddrive() : "N/A",
          allLoadavg: os.allLoadavg(),
          loadavg: os.loadavg(),
          cpuFree: asyncToggle ? await os.cpuFree((i) => i) : "N/A",
          cpuUsage: asyncToggle ? await os.cpuUsage((i) => i) : "N/A",
        },
      };
      if (callback) {
        callback(req, res, profile);
      }
    };
    next();
  };
};
