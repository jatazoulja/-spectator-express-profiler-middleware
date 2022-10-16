# Spec8r Profiler

A simple profiler for Node [Express.js.](https://expressjs.com/)

## DISCLAIMER

This library is does not have unit test. This library is a compilation of some of this projects:

- [express-profiler](https://github.com/Adpa18/express-profiler) by [Adpa18](https://github.com/Adpa18)
- [os-utils](https://github.com/oscmejia/os-utils) by [oscmejia](https://github.com/oscmejia/)

express-profiler

## Install

`npm install --save-dev spectator-profiler-middleware`

## Example

```javascript
const {
  SpecModelBuilder,
  SpecMiddleware,
} = require("spectator-profiler-middleware");

app.use(
  SpecMiddleware((req, res, profile) => {
    profile.user = req.user;
    SpecModelBuilder(profile);
  }, true)
);
```

## Main Functions

| Function                  | Usage                                                                               | Remarks                                                          |
| ------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| SpecMiddleware            | `(callback(req, res, profile), asyncEnable)`                                        | some data requires async callback set true to enable async data. |
| SpecMiddleware.callback   | `(req, res, profile)`                                                               | profile returns JSON object of profile                           |
| SpecModelBuilder `(json)` | optional: this will create a json file in root directory that contains all profile. |

## Helpers

\*\* for os-utils check [os-utils](https://github.com/oscmejia/os-utils) by [oscmejia](https://github.com/oscmejia/)
for my modification:

| Function                            | Usage |
| ----------------------------------- | ----- |
| OSUtils.cpuCount(),                 |       |
| OSUtils.sysUptime(),                |       |
| OSUtils.processUptime(),            |       |
| OSUtils.freemem(),                  |       |
| OSUtils.totalmem(),                 |       |
| OSUtils.freememPercentage(),        |       |
| OSUtils.harddrive() : "N/A",        |       |
| OSUtils.allLoadavg(),               |       |
| OSUtils.loadavg(),                  |       |
| OSUtils.cpuFree((i) => i) : "N/A",  |       |
| OSUtils.cpuUsage((i) => i) : "N/A", |       |
| SpecHelpers.getStackTrace(),        |       |
