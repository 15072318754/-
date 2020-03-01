const {Article}=require('../../model/article')
module.exports=async (req,res)=>{
    // 在通过req.app.locals下添加的属性，在模板中是可以拿到的
    req.app.locals.currentLink='article'
    // 通过集合构造函数查询所有文章数据
    //     因为模板渲染出来的作者栏是id,这个时候通过多集合的方法populate查询auther
    let articleData=await Article.find().populate('author')
    // res.send(articleData)
    res.render('admin/article.art',{
        articleData
    })
}