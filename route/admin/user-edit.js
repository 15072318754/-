const {User}=require('../../model/user')
module.exports=async (req,res)=>{
    // 获取地址栏请求的参数
    const {message,id}=req.query
    // 如果当前有id参数，那么是修改操作，否则是添加操作
    if(id) {
        // 修改操作
        let user=await User.findOne({_id:id})
        // res.send(user)
        // 编辑页面
        res.render('admin/user-edit',{
            message:message,
            user:user,
            link:'/admin/user-modify?id='+id,
            button: '修改'
        })
    }else {
        // 添加操作
        res.render('admin/user-edit',{
            message:message,
            link:'/admin/user-edit',
            button: '添加'
        })
    }
}