const Bot = require("./modules/bot");
let dotenv = require("dotenv");
dotenv.config("./env");

const JuejinPlugin = require("./plugins/juejin_latest");

require("./modules/date-format");

const cron = require("node-cron");


class Plugin extends Bot {
  constructor() {
    super();
  }
  async run() {
    //启动定时任务
    cron.schedule("50 8 * * 1-5", () => {
      new JuejinPlugin().run()
    });
  }
}

new Plugin().run();
