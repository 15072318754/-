const bcryptjs = require('bcryptjs')
const {User}=require('../../model/user.js')
module.exports=async (req,res)=>{
    // 接收请求参数
    // res.send(req.body)
    // // 获取表单的提交过来的数据 对象结构
    const {email,password}=req.body
    // 判断邮箱和密码是否填写
    if(email.trim().length==0||password.trim().length==0) {
        // return res.status(400).send('邮件或密码错误')
        // 如果验证没有通过就给他渲染error模板
        return res.status(400).render('admin/error',{msg: '密码或用户名错误'})
    }
     // 根据邮箱地址查询用户信息
     const user=await User.findOne({email})
    if(user) {
         //  将客户端传递过来的密码和用户名信息中的密码进行对比 
        // 用bcrypt下面的compare方法，返回的是布尔值
        let isValid =await bcryptjs.compare(password,user.password)
        if(isValid){
            // 将用户id存储到session
            // req.session.username=user.username
            req.session.username=user.username
            req.session.role=user.role

            // res.send('登录成功')
            // 在locals下添加的属性，模板中是可以拿到的
            req.app.locals.userInfo=user
            // console.log(req.app.locals.userInfo)
            // console.log(req.session.userId)
            // 对用户角色进行判断
            if(user.role=='admin'){
                // 重定项到后台用户页面
                res.redirect('/admin/user')
            }else {
                // 重定项到博客首页
                res.redirect('/home/')
            }
            
        }else {
            res.status(400).render('admin/error',{msg: '密码或用户名错误'})
        }
     }else {
         // 走这一步 表示没有查询到用户信息
         res.status(400).render('admin/error',{msg: '密码或用户名错误'})
     }
}
// module.exports=login