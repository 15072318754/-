const {Comment}=require('../../model/comment')
module.exports=async (req,res)=>{
    // 接收传递过来的post参数并解构 req.body
    const {content,uid,aid}=req.body
    // 将评论信息存储到评论集合中
    await Comment.create({
        content:content,
        uid:uid,
        aid:aid,
        time:new Date()
    })
    // 提交后回到当前页面
    res.redirect('/home/article?id='+aid)
}