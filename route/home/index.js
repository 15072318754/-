const {Article}=require('../../model/article')
const pagination=require('mongoose-sex-page')
module.exports=async (req,res)=>{
    // 获取当前页
    let page=req.query.page
    // 从数据库中查询数据
    let result=await pagination(Article).find().page(page).size(2).display(3).populate('author').exec()
    // res.send(result)
    // 渲染模板
    res.render('home/default.art',{
        result:result
    })
}