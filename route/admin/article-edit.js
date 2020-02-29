module.exports=(req,res)=>{
    // 在通过req.app.locals下添加的属性，在模板中是可以拿到的
    req.app.locals.currentLink='article'
    res.render('admin/article-edit.art')
}