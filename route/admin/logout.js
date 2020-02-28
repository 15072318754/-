module.exports=(req,res)=>{
    // 删除session   destroy方法内部会根据cookies中存的sessionId来删除对应的session信息
    // req.session.destroy(function(){
    //      // 删除cookies
    //     res.clearCookie('connect.sid')
    //      // 重定项到登录页面
    //     res.redirect('/admin/login')
    // })
    req.session=null
    res.clearCookie('connect.sid')
    res.redirect('/admin/login')
}