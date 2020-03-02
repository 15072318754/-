
const grua=(req,res,next)=>{
    // 客户端向服务端发起请求时，要判断是否是以admin开头
    // 判断是否是登录页面---是否从login页面过来的
    // 判断登录状态---有没有sessionId

    // 如果不是从登录页面过来的，且也没有登录过
    // (因为登录过，session下面就会有username信息,如果把cookies中的sessionid删掉也代表没有登录)，
    // 就重定项到登录页面
    // 如果是从登录页面过来的，并且有sessionId那么就放行
    // console.log(req.session);  
    if(req.url!='/login' && !req.session.username){
        res.redirect('/admin/login')
    }else {
        // 如果是是从登录页面过来的，还要判断他是不是normal用户，如果是就跳转到博客页面
        if(req.session.role=='normal'){
                 // 重定项到博客首页
            return  res.redirect('/home/')
        }
        next()
    } 
}
module.exports=grua