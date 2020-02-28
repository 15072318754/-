module.exports=async (req,res)=>{
    // console.log(req.session.username)
    // const user=await User.findOne({_id:req.session.userId})
    // console.log(user.username)
    res.render('admin/user'
    // ,{
    //     msg:user.username
    // }
    )
}