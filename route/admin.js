const express=require('express')

const admin=express.Router()

admin.get('/login',require('./admin/loginpage'))
// 实现登录功能，获取post请求
admin.post('/login',require('./admin/login'))
// 用户列表
admin.get('/user',require('./admin/userpage'))
// 退出功能
admin.get('/logout',require('./admin/logout'))
// 创建用户编辑功能
admin.get('/user-edit',require('./admin/user-edit'))
// 新增用户功能
admin.post('/user-edit',require('./admin/user-edit-fn'))
// 修改功能
admin.post('/user-modify',require('./admin/user-modify'))
// 删除功能
admin.get('/delete',require('./admin/delete'))
// 文章列表页面
admin.get('/article',require('./admin/article'))
// 文章编辑页面
admin.get('/article-edit',require('./admin/article-edit'))

module.exports=admin