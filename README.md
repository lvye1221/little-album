# little-album
nodejs 写的-小小相册管理系统

# 运行及访问 #

```
node app.js

http://localhost:3000/
```


# 技术点

## express

```
//路由中间件，静态页面
app.use(express.static("./public"));
app.use(express.static("./uploads"));

```

## BootStrap
顶部导航条

## NodeJS 文件读取

```
//通过文件名，得到所有图片
exports.getAllImagesByAlbumName = function(albumName,callback){
    fs.readdir("./uploads/" + albumName,function(err,files){
        if(err){
            callback("没有找到uploads文件",null);
            return;
        }
        var allImages = [];
        (function iterator(i){
            if(i == files.length){
                //遍历结束
                console.log(allImages);
                callback(null,allImages);
                return;
            }
            fs.stat("./uploads/" + albumName + "/" + files[i],function(err,stats){
                if(err){
                    callback("找不到文件" + files[i] , null);
                    return;
                }
                if(stats.isFile()){
                    allImages.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0);
    });
}
```


## 上传文件功能实现 ##

## 后台 ##

```
// 表单格式化
var formidable = require('formidable');


exports.doPost = function(req,res){
    var form = new formidable.IncomingForm();

    form.uploadDir = path.normalize(__dirname + "/../tempup/");

    form.parse(req, function(err, fields, files,next) {

        console.log(files);
        //改名
        if(err){
            next();     //这个中间件不受理这个请求了，往下走
            return;
        }
        //判断文件尺寸
        var size = parseInt(files.tupian.size);
        if(size > 20000){
            res.send("图片尺寸应该小于1M");
            //删除图片
            fs.unlink(files.tupian.path);
            return;
        }

    }

```

## 前台 ##

```
<form style="width:40%;" method="post" action="#" enctype="multipart/form-data">
    <div class="form-group">
        <label for="exampleInputEmail1">选择文件夹</label>
        <select class="form-control" name="wenjianjia">
            <% for(var i = 0 ; i < albums.length ; i++){%>
                <option><%= albums[i] %></option>
            <%}%>
        </select>
     </div>

    <div class="form-group">
        <label for="exampleInputFile">选择图片</label>
        <p>尺寸小于2M</p>
        <input type="file" id="exampleInputFile"  name="tupian">
     </div>

    <button type="submit" class="btn btn-default">上传</button>
</form>

```
