
var fs = require("fs");

var express = require("express");
var app = express();
//控制器
var router = require("./controller");

//设置模板引擎
// app.set("view engine", "ejs");

//路由中间件，静态页面
app.use(express.static("./public"));
app.use(express.static("./uploads"));

//首页
// app.get("/", router.showIndex);
// app.get("/:albumName", router.showAlbum);
// app.get("/up", router.showUp);
// app.post("/up", router.doPost);



app.get('/list', function (req, res) {

    var dir = "./uploads"  
    // console.log(req.params.folder)
  
    fs.readdir(dir, function(err, files) {  
      res.json(files)
    })
});

app.get('/list/:folder', function (req, res) {

    var dir = "./uploads/" + req.params.folder
  
    fs.readdir(dir, function(err, files) {  
      res.json(files)
    })
  
  });
  

//404
// app.use(function (req, res) {
//     console.log("error find page")
//     // res.render("err");
// });

var server =app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
  
    console.log('服务器启动成功： http://%s:%s', host, port);
});
