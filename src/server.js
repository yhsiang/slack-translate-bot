import Koa from "koa";
import Route from "koa-router";
import convert from "koa-convert";
import body from "koa-better-body";
import request from "request-promise";

const PORT = process.env.PORT || 7777;
const TOKEN = process.env.TOKEN || '';
const SLACK_URL = process.env.SLACK_URL || '';
const API_KEY = process.env.API_KEY || '';
const app = new Koa();
const router = new Route();

function postBack(text) {
  console.log(text)
  const payload = {
    channel: "#general-en",
    username: "TranslateBot",
    text,
  };

  request({
    method: 'POST',
    uri: SLACK_URL,
    form: { payload: `${JSON.stringify(payload)}` },
  });
}

router
  .get('/', (ctx, next) => {
    ctx.body = "I am a translate bot!";
    next();
  })
  .post('/webhook', ctx => {
    if (ctx.request.fields) {
      console.log(ctx.request.fields)
      const { token, text, user_name } = ctx.request.fields;
      if (token !== TOKEN) return;
      if (text.match(/[\u4e00-\u9fa5]/)) {
        request({
          method: 'POST',
          uri: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
          qs: {
            key: API_KEY,
            lang: "zh-en"
          },
          form: {
            text
          }
        })
        .then(response => {
          const { text } = JSON.parse(response);
          const [ translated ] = text;
          postBack(`${user_name} < ${translated}`);
        })
        .catch(console.log);
      }
    }
  });

app
  .use(convert(body()))
  .use(router.routes())
  .listen(PORT, () => console.log(`Server listen on ${PORT}`));
