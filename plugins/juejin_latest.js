// 掘金 每日最新帖子列表

const Bot = require("../modules/bot");
require("../modules/date-format");

const axios = require("axios").default;

const body = {
  id_type: 2,
  sort_type: 3,
  cate_id: "6809637767543259144",
  tag_id: "6809640407484334093",
  cursor: "0",
  limit: 5,
};
class JuejinPlugin extends Bot {
  constructor() {
    super();
    this.API = "https://api.juejin.cn/recommend_api/v1/article/recommend_cate_tag_feed";
  }
  run() {

    axios.post(this.API, { ...body }).then((res) => {
      const { data } = res;
      const articles = [];
      const now = new Date().Format("M/d h:m:s");

      data.data.map((d) => {
        articles.push({
          title: d.article_info.title,
          url: `https://juejin.cn/post/${d.article_id}`,
        });
      });

      const content = `
      🤖️ ${now} 今日掘金最热文章：今天也要发光发热哦😎\n ${articles.map(
        (e) => `\n [${e.title}](${e.url})`
      )}`;
      this.sendMarkdown(content);
      // console.log(content);
    });
  }
}

module.exports = JuejinPlugin;
