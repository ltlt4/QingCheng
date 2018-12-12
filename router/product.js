const express=require("express")
var  router=express.Router()
const pool=require("../pool")

router.get("/list",function(req,res){
   var sql="SELECT * FROM sjproductmin"
   pool.query(sql,[],function(err,result){
       if(err) throw err;
       res.send(result);
   })
})
router.get("/shop",function(req,res){
    var pid=req.query.pid;
    if(!pid){
        res.send("-1")
    }
    var sql="SELECT * FROM sjproduct WHERE pid=?"
    pool.query(sql,[pid],function(err,result){
        if(err) throw err;
        res.send(result);
    })
})
module.exports=router