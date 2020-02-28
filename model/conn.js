const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true })
.then(()=>console.log('数据库连接成功'))
.catch(()=>console.log('数据库连接失败'))
// ,useCreateIndex: true