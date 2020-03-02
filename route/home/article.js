const {Article}=require('../../model/article')
const {Comment}=require('../../model/comment')
module.exports=async (req,res)=>{
    // 获取传过来的文章id
    let id=req.query.id
    // 通过id查询文章的列表信息
    let article=await Article.findOne({_id:id}).populate('author')
    // 查询当前文章所对应的评论信息:通过aid查询是属于哪一篇文章的id,uid查询是由谁来评论
    let comments=await Comment.find({aid:id}).populate('uid')
    // res.send(comments)
    // 将查询到的信息渲染到页面中
    res.render('home/article.art',{
        article:article,
        comments: comments
    })
}