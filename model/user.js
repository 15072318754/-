const mongoose=require('mongoose')
const bcryptjs = require('bcryptjs');
const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 保证邮箱地址在插入时数据不重复
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    // 超级管理员就是admin

    role: {
        type: String,
        required: true,
    },
    // 0 启用
    // 1 禁用
    state:{
        type: Number,
        default: 0,
    }
})
const User=mongoose.model('User',userSchema)
// 生成随机字符串
async function createUser(){
    // 通过变量接收随机字符串、
    const salt =await bcryptjs.genSalt(10)
    // 对密码进行加密
    const pass=await bcryptjs.hash('123456',salt)
    // 插入文档
    const user=await User.create({
            username: 'damao',
            email: 'aa@qq.com',
            password: pass,
            role: 'admin',
            state: 0
        }).then((doc)=>console.log(doc,'创建用户成功'))
        .catch((err)=>console.log(err,'创建用户失败'))
}
// createUser()
module.exports={User}