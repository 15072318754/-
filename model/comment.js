const mongoose=require('mongoose')
// 创建集合
const commentSchema=new mongoose.Schema({
    // 文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        // 引用文章集合
        ref: 'Article'
    },
    // 用户id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        // 引用用户集合
        ref: 'User'
    },
    time: {
        type: Date
    },
    // 评论内容
    content: {
        type: String
    }
})
let Comment=mongoose.model('Comment',commentSchema)
module.exports= {
    Comment
}