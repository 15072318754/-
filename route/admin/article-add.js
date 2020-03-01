const formidable = require('formidable');
const path = require('path');
const {Article}=require('../../model/article')

module.exports=(req,res)=>{
    // bodyparse只能接收普通表单传递过来的参数，而文章表单属于二进制类型的表单
    // 利用formidable接收表单传递过来的二进数参数
    // 1\创建表单解析对象
    const form=new formidable.IncomingForm()
    // 2\配置文件上传存放路径
   form.uploadDir=path.join(__dirname,'../','../','public','update')
    // 3、设置后缀为true
    form.keepExtensions=true
    // 4\解析表单
    form.parse(req,async (err,field,file)=>{
        // fields 保存普通表单的数据
        // file 保存和上传相关的文件
        // res.send(field)
        // 客户端浏览器是通过网址的方式来访问服务器端电脑上的资源的，而不是电脑的硬盘路径，这里对path做处理
        // res.send(file.cover.path.split('public')[1])

        // 把文章插入数据库中
        await Article.create({
            title: field.title,
            author:field.author,
            publishDate: field.publishDate,
            content:field.content,
            cover:file.cover.path.split('public')[1],
        })
        res.redirect('/admin/article')
    })
    
}