const express=require("express")
const bodyParser=require("body-parser")
const userRouter=require("./router/user")

var app=express()
app.listen(5050)
app.use(bodyParser.urlencoded({
    extended:false
}))
/*使用中间件express把静态文件托管到public下*/
app.use(express.static(__dirname+"public"))
//把路由器挂在到user下
app.use("/user",userRouter)