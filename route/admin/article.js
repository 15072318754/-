const {Article}=require('../../model/article')
const pagination=require('mongoose-sex-page')
module.exports=async (req,res)=>{
    // 在通过req.app.locals下添加的属性，在模板中是可以拿到的
    req.app.locals.currentLink='article'
    // 接收客户端传递过来的页码
    let page=req.query.page
    // 通过集合构造函数查询所有文章数据
    //     因为模板渲染出来的作者栏是id,这个时候通过多集合的方法populate查询auther
    // 利用pagination实现分页 
            // pagination(里面是集合构造函数)
            // 查询条件：
            // page代表当前页
            // size每页显示多少条数据
            // display浏览器显示的页码数量
            // exec向数据库发出查询请求
    let articleData=await pagination(Article).find().page(page).size(1).display(10).populate('author').exec()
    // res.send(articleData)
    res.render('admin/article',{
        articleData:articleData
    })
}