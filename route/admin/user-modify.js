const {User}=require('../../model/user')
const bcryptjs = require('bcryptjs')
module.exports=async (req,res,next)=>{
    // 拿到post提交过来的修改用户信息、
    // const body=req.body
    const {username,role,password,state,email}=req.body
    // 拿到get请求传过来的id
    const id=req.query.id
    // 通过id在数据库中进行比对
    const user=await User.findOne({_id:id})
    
    // 密码比对
    const isVidate=bcryptjs.compareSync(password,user.password)
    if(isVidate){
        // 密码比对成功
        // res.send('比对成功')
        // 通过集合下面的updateOne来进行更新
        // 这个id是客户端传过来的id,参数2为修改的用户的信息
        // 这里需要注意的是，不能将密码传递过去，这个页面密码只做比对功能，而req.body是整个对象的信息他包含了密码，
        // 如果直接将req.body传递进去，会将数据库中的密码也进行了修改。就直接将指定要更新的参数传进去（这里利用解构赋值的方式可简化代码）
        // const a1=await User.updateOne({_id: id},{
        //     username: req.body.username,
        //     email: req.body.email,
        //     role: req.body.role,
        //     state: req.body.state,
        // })
        await User.updateOne({_id: id},{
            username:username,
            email: email,
            role: role,
            state: state,
        })
        // 将页面重定项到用户列表页面
        res.redirect('/admin/user')
    }else {
        // 密码比对失败 跳转到user-edit页面,这里利用中间件来做错误处理
        // 如果出错了，要带上 修改的那个用户的 id，再重定向会 /admin/user-edit
        let obj={path:'/admin/user-edit',message:'密码比对失败，不能进行用户信息的修改',id:id}
        // JSON.stringify将一个对象中解析出字符串
        next(JSON.stringify(obj))
    }
    
}