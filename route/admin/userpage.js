const {User}=require('../../model/user')
module.exports=async (req,res)=>{
    // 在通过req.app.locals下添加的属性，在模板中是可以拿到的
    req.app.locals.currentLink='user'
    // 接收客户端传递过来的当前页的参数
    // 如果用户没有传入页码，就默认让他显示第一页数据
    let page=req.query.page||1

    // 每一页显示的数据条数
    let pagesize=4
   // 总数据条数
    let count=await User.countDocuments({})

    // 总页数
    let total=Math.ceil(count/pagesize)

    // 数据开始查询的位置=（当前页-1）* 每页显示的数据条数
    let start=(page-1)*pagesize

    // 查询所有用户的数据
    let users=await User.find({}).limit(pagesize).skip(start)
    // res.send(user)
    res.render('admin/user',{
        users:users,
        page:page,
        total:total
    })
}