const Joi=require('joi')
const {User}=require('../../model/user')
const bcryptjs = require('bcryptjs')
module.exports=async (req,res)=>{
    const schema={
        username: Joi.string().min(2).max(20).required().error(new Error('用户名格式不符合规则')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合规则')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,15}$/).required().error(new Error('密码格式不符合规则')),
        role: Joi.string().valid('admin','normal').required().error(new Error('状态格式不符合规则')),
        state:Joi.number().valid(0,1).required().error(new Error('操作格式不符合规则'))
    }
    // 对请求的参数的格式进行验证
    try{
        await  Joi.validate(req.body,schema)
    }catch(er){
        return res.redirect(`/admin/user-edit?message=${er.message}`)
    }
    // 验证邮箱是否被注册过
    let user=await User.findOne({email: req.body.email})
    // findOne返回的是个对象，如果数据库中有这个邮箱，代表当前邮箱已经存在，返回的是对象的信息
    // res.send(user)如果查询数据库中没有返回的是为 空
    // 如果有就让他重定项
    if(user){
        return res.redirect(`/admin/user-edit?message=邮箱地址被占用`)
    }
    // res.send(user)
    // 如果没有，将用户密码进行加密
            // 1\生成随机字符串
            // 因为返回的是异步函数，要么加await,要么用同步的写法
    const salt=bcryptjs.genSaltSync(10)
            // 2\加密
    const password=bcryptjs.hashSync(req.body.password,salt)
            // 3、替换 因为password是已经加密后的密码，所以要把用户的密码替换成加密后的密码添加到数据库中
    req.body.password=password
    // res.send(req.body)
    // 将用户信息添加到数据库中,并重定项到列表页面
    await User.create(req.body)
    res.redirect('/admin/user')
}