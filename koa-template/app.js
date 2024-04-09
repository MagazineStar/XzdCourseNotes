const koa = require("koa");
const { sql_exec } = require("./db/index");
/* 给服务设置了跨域参数 */
const cors = require("koa2-cors");
/* koa-body获取post请求提交的数据 */
const { koaBody } = require('koa-body');
const app = new koa();
/* 中间件 */

const router = require("koa-router")();
router.get("/user", async ctx => {
    const sql = `select * from user`;
    let result = await sql_exec(sql);
    console.log(result)
    ctx.body = {
        result,
        code: 200
    }
})
router.post("/add", async ctx => {
    console.log(ctx.request.body)
    var { name, password } = ctx.request.body;
    const sql = `insert into user (name,password) values('${name}','${password}')`;
    let result = await sql_exec(sql);
})
/* 查询用户名 密码 post */
router.post("/query", async ctx => {
    var { name, password } = ctx.request.body;
    const sql = `select * from user where name ='${name}' and password = '${password}'`;
    let result = await sql_exec(sql);
    console.log(result)
    if (result.length > 0) {
        ctx.body = {
            code: 200,
            result
        }
    } else {
        ctx.body = {
            msg: "用户名或密码错误"
        }
    }
})
app.use(cors());
app.use(koaBody())
app.use(router.routes())
app.listen(8081);
