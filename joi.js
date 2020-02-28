const Joi=require('joi')
const schema={
    username: Joi.string().min(2).max(10).required().error(new Error('username属性验证失败'))
}
// 返回的是个promise,可以通过异步的方式拿到他的返回值
// Joi.validate({username:'aa'},schema)

async function run(){
    // try可以捕获异步或同步代码执行过程中的错误，如果验证通过就会返回对象，如果验证没通过就返回错误信息
    try{
        // 验证
        await Joi.validate({username:'ab'},schema)
    }catch(err){
        console.log(err.message)
        return
    }
    console.log('验证通过')
}
run()

