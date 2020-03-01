const mongoose=require('mongoose')
// 创建集合
const articleSchema=new mongoose.Schema({
    //文章标题
    title: {
        type:String,
        maxlength:20,
        minlength: 4,
        required: [true,'请填写文章标题']
    },
    // 作者
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',// 存的是作者的id
        required: [true,'请传递作者']
    },
    // 发布时间
    publishDate: {
        type: Date,
        default: Date.now
    },
    //文章封面
    cover: {
        type: String,
        default: null
    },
    // 内容
    content: {
        type: String
    }
})
// 根据规则创建集合  
// 参数1返回的集合名称是Article 首字母必须是大写

const Article=mongoose.model('Article',articleSchema)
// 导出 
module.exports={
    Article
}