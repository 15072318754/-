const express = require('express')
const app = express()
require('./model/conn.js')
// require('./model/user.js')
const path = require('path')
const bodyparse = require('body-parser')
const session = require('express-session')
const dateformat = require('dateformat')
const template = require('art-template')

// 向模板中导入变量 通过该变量对时间进行格式化
template.defaults.imports.dateformat=dateformat
// bcryptjs 是一个第三方密码加密库，是对原有 bcrypt 的优化，优点是不需要安装任何依赖
// 中间件 处理post请求
app.use(bodyparse.urlencoded({ extended: false }))
// 配置session
app.use(session({
    // 设置密钥
    secret: 'secretkey',
    // 不保存未初始化的cookies
    saveUninitialized: false,
    // 给cookies设置过期时间 maxage只接受毫秒
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))

// 模板所在位置
app.set('views', path.join(__dirname, 'views'))
// 模板的后缀名
app.set('view engine', 'art')
// 告诉浏览器使用什么模板
app.engine('art', require('express-art-template'))

// 静态资源托管
app.use(express.static(path.join(__dirname, 'public')))
// 引用路由模块
const home = require('./route/home.js')
const admin = require('./route/admin.js')
// 登录拦截
app.use('/admin', require('./middle/logingrua'))
// 为路由匹配路径
app.use('/home', home)// 如果你输入的是/home,就去找home模块
app.use('/admin', admin)
// 错误处理优化
app.use((err, req, res, next) => {
    // 将字符串中解析出json对象
    const result = JSON.parse(err)
    // obj={path:'/admin/user-edit',message:'密码比对失败，不能进行用户信息的修改',id:id}
    let params=[] // 把拼接好的字符串放到数组中
    // 对对象进行遍历
    for (let k in result) { //这里的k代表path、message、id、
        // 如果k的值不等于path时，我们再进行参数的拼接
        if (k != 'path') { //意思就是把 path 这个属性，剔除了不遍历它
            // message='密码比对失败'
            // k +'='+result[k]
            params.push(k +'='+result[k])
        }
    }
    // 将params参数拼接到？号后面  多个参数用&符号进行分割
    res.redirect(`${result.path}?${params.join('&')}`)
})
app.listen(80, () => {
    console.log('http://localhost')
})