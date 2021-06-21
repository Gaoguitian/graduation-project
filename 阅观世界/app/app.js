
var express = require('express');
var path = require('path');
let sqlQuery = require("./mysql")
var app = express();
const session = require('express-session')
const bodyParser = require('body-parser');
const formidable = require('formidable')
const { userInfo } = require('os');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}))
app.use(session({secret:'secret key',
    resave: false,
    saveUninitialized: true, 
    cookie:{
        maxAge:24*60*60*1000
    }
}))

app.use('/loginOut',function(req,res){
	//注销session
	req.session.destroy(function(err){
    res.clearCookie('connect.sid')
    req.app.locals.userInfo = null;
    res.redirect('/');
	});
});

app.get('/',async (req,res)=>{
  let strsql="select id,bookname,bookimg,author,sort from book limit 68,88";
  let result=await sqlQuery(strsql)
  let userInfo = req.app.locals.userInfo
  let options={
    books:Array.from(result),
    sorts:await getsort(),
    userInfo
  } 
    res.render('shouye.ejs',options)
})
app.get('/books/:bookid',async (req,res)=>{
  let strsql = "select id,bookname,bookimg,author,sort,tag,pubtime,brief,abrief,download from book where id =?";
  let bookid = req.params.bookid
  let result = await sqlQuery(strsql,[bookid])
  let strsql1 = "select com1,id,user,content from comment where id = ?"
  let result1 = await sqlQuery(strsql1,[bookid])
  let userInfo = req.app.locals.userInfo
  let options={
    book:result[0],
    bookid,
    userInfo,
    result1
  }
   res.render('book.ejs',options)
})

app.get('/seach/:seachKey/page/:pid',async (req,res)=>{
  let sqlStr = "select id,bookname,bookimg,author,sort,tag,pubtime,brief,abrief,download from book where bookname like '%"+req.params.seachKey+"%' or author like '%"+req.params.seachKey+"%' limit 0,21"
  let result = await sqlQuery(sqlStr)
  let searchkey = req.params.seachKey;
  //获取总页数
  let sqlStr1 = "select count(id) as num  from book where bookname  like '%"+req.params.seachKey+"%' or author like '%"+req.params.seachKey+"%'"
  let result1 = await sqlQuery(sqlStr1)
  let pageAll = Math.ceil(result1[0].num/21) ;
  let cid = req.params.seachKey
  let userInfo = req.app.locals.userInfo
  //设置分页的起始点
  let page = parseInt(req.params.pid)
  let startPage = (page - 4)<1?1:(page-4);
  let endPage = (page+5)>pageAll?pageAll:page+5;
  let options = {
    books:Array.from(result),
    sorts:await getsort(),
    pageAll,
    page,
    cid,
    startPage,
    endPage,
    searchkey,
    userInfo
  }
  res.render('search.ejs',options)
})
async function getsort(){
  let strsql = "select * from sort"
  let result = await sqlQuery(strsql)
  return Array.from(result)
}
app.get('/c/:cid/page/:pid',async (req,res)=>{
  let page = parseInt(req.params.pid)
  let sqlStr;
  let result;
  let arr;
  let sqlStr1;
  let sqlStr2;
  if(req.params.cid == 0){
    sqlStr = "select id,bookname,bookimg,author,sort from book limit ?,28"
    arr = [(page-1)*28];
    result = await sqlQuery(sqlStr,arr)
    sqlStr1 = "select count(id) as num  from book"
  }else{
    sqlStr = "select id,bookname,bookimg,author,sort from book WHERE sort in (SELECT sort from sort WHERE id = ?) limit ?,28"
    arr = [req.params.cid,(page-1)*28];
    result = await sqlQuery(sqlStr,arr)
    sqlStr1 = "select count(id) as num  from book WHERE sort in (SELECT sort from sort WHERE id = ?)" 
    sqlStr2 = "select * from book WHERE sort in (SELECT sort from sort WHERE id = ?)" 
  }
  //获取总页数
  let result1 = await sqlQuery(sqlStr1,arr)
  let pageAll = Math.ceil(result1[0].num/28) ;
  let cid = req.params.cid
  let result2 = await sqlQuery(sqlStr2,[cid])
  //设置分页的起始点
  let startPage = (page - 4)<1?1:(page-4);
  let endPage = (page+5)>pageAll?pageAll:page+5;
  let userInfo = req.app.locals.userInfo
  let options = {
    books:Array.from(result),
    sorts:await getsort(),
    pageAll,
    page,
    cid,
    startPage,
    endPage,
    result2,
    userInfo
  }
  res.render('index.ejs',options)
})


app.post('/login',async (req,res)=>{
      const {email,password} = req.body
      let strsql = "SELECT * FROM user where email = '"+email+"'" 
      let result = await sqlQuery(strsql)
      if(result.length>0){
          if(password == result[0].password){
            // req.session.username = result[0].username
            req.app.locals.userInfo = result
            res.send('登录成功')
          }else{
            res.send('密码错误')
          }
      }
      else {
        res.send('邮箱不存在')
      }
})
app.post('/register',async (req, res) =>{
      const {username,email,password} = req.body
        let sqlStr = "insert into user(username,email,password) values (?,?,?)"
        let arr = [username,email,password]
        let result = await sqlQuery(sqlStr,arr)
        res.send('注册成功')
})

app.get('/register1/:username',async (req, res) =>{
  let username = req.params.username
  let strsql2 = "SELECT * FROM user where username = '"+username+"'" 
  let result2 = await sqlQuery(strsql2)
  if(result2[0]){
    res.send('用户名存在')
  }else{
    res.send('名称可以使用')
  }
})

app.get('/register2/:email',async (req, res) =>{
  let email = req.params.email
  let strsql2 = "SELECT * FROM user where email = '"+email+"'" 
  let result2 = await sqlQuery(strsql2)
  if(result2[0]){
    res.send('邮箱存在')
  }else{
    res.send('邮箱可以使用')
  }
})

app.get('/comment/:bookid/:username/:content',async(req,res) =>{
      let bookid = req.params.bookid
      let content = req.params.content
      let user = req.params.username
      let sqlStr = 'insert into comment(id,user,content) values (?,?,?)'
      let arr = [bookid,user,content]
      let result = await sqlQuery(sqlStr,arr)
      let sqlStr2 = 'select * from comment where id=? and user=? and content=?'
      let result2 = await sqlQuery(sqlStr2,arr)
      let options = {
        result2
      }
      // res.redirect('/books/'+bookid)
      res.send(result2)
})
app.get('/del/:com1',async(req,res)=>{
      let com1 = req.params.com1
      let sqlStr = 'DELETE FROM comment WHERE com1 = ?'
      let result = await sqlQuery(sqlStr,[com1])
      // res.redirect('/books/'+bookid)
      res.send("删除成功")
})

app.get('/changename/:email/:username/:uname',async (req,res) => {
      let email = req.params.email;
      let username = req.params.username;
      let uname = req.params.uname;
      let arr = [username,email];
      let sqlStr = 'update user set username = ? where email = ?'
      let result = await sqlQuery(sqlStr,arr)
      let arr1 = [username,uname]
      let sqlStr1 = 'update comment set user = ? where user = ?'
      let result1 = await sqlQuery(sqlStr1,arr1)
      let userInfo = req.app.locals.userInfo
      userInfo[0].username = username;
      res.send("更改成功")
})

app.get('/changepass/:email/:password',async (req,res) => {
  let email = req.params.email;
  let password = req.params.password
  let arr = [password,email];
  let sqlStr = 'update user set password = ? where email = ?'
  let result = await sqlQuery(sqlStr,arr)
  res.send("更改成功")
})

app.post('/release', async (req,res) => {
  const {bookname,bookimg,author,tag,pubtime,sort,brief,abrief,bookUrl,download} = req.body;
  let arr = [bookname,bookimg,author,tag,pubtime,sort,brief,abrief,bookUrl,download];
  let sqlStr = 'insert into book(bookname,bookimg,author,tag,pubtime,sort,brief,abrief,bookUrl,download) values (?,?,?,?,?,?,?,?,?,?)'
  let result = await sqlQuery(sqlStr,arr)
  res.send('发布成功')
})
app.use((req,res,next)=>{
   if(req.app.locals.userInfo&&req.url=='/login'){
      res.redirect('/')
   }else{
      next()
   }
})
app.get('/login',(req,res)=>{
  res.render('login.ejs')
})

app.use((req,res,next)=>{
  if(!(req.app.locals.userInfo)&&req.url=='/backstage/1/2/3/4/5/6/7/8'){
     res.redirect('/')
  }else{
     next()
  }
})

app.get('/backstage/:lishi/:jingji/:xiaoshuo/:lizhi/:renwen/:shenhuo/:xuexi/:yinwen',async (req,res)=>{
    let sqlStr = 'select * from book where sort = (select sort from sort WHERE id =?)'
    let lishi = req.params.lishi;
    let jingji = req.params.jingji;
    let xiaoshuo = req.params.xiaoshuo;
    let lizhi = req.params.lizhi;
    let renwen = req.params.renwen;
    let shenhuo = req.params.shenhuo;
    let xuexi = req.params.xuexi;
    let yinwen = req.params.yinwen;
    let result1 = await sqlQuery(sqlStr,[lishi])
    let result2 = await sqlQuery(sqlStr,[jingji])
    let result3 = await sqlQuery(sqlStr,[xiaoshuo])
    let result4 = await sqlQuery(sqlStr,[lizhi])
    let result5 = await sqlQuery(sqlStr,[renwen])
    let result6 = await sqlQuery(sqlStr,[shenhuo])
    let result7 = await sqlQuery(sqlStr,[xuexi])
    let result8 = await sqlQuery(sqlStr,[yinwen])
    let userInfo = req.app.locals.userInfo;
    let options = {
      result1,
      result2,
      result3,
      result4,
      result5,
      result6,
      result7,
      result8,
      userInfo
    }
    res.render('management.ejs',options)
})

app.get('/usermessage', async (req,res)=>{
      let sqlStr = 'select * from user'
      let result = await sqlQuery(sqlStr)
      res.send(result)
})

app.get('/deluser/:id/:username',async (req, res)=>{
  console.log(1111)
      let id = req.params.id
      let username = req.params.username;
      let sqlStr = 'delete from user where id = ?'
      let result = await sqlQuery(sqlStr,[id])
      let strsql1 = 'DELETE  from comment WHERE user = ?'
      let result1 = await sqlQuery(strsql1,[username])
      res.send('删除用户成功')
})

app.post('/upload', async (req,res)=>{
      const form = new formidable.IncomingForm();
      let path1;
      let path2;
      form.uploadDir = path.join(__dirname, 'public','uploads')
      form.keepExtensions = true
      form.parse(req,async (err,fields,files)=>{
        console.log(fields)
        if(files.bookimg){
          path1 = files.bookimg.path.substr(48)
          fields.bookimg = path1
        }
        if(files.download){
          path2 = files.download.path.substr(48)
          fields.download = path2
        }
        console.log(fields)
        let bookname = fields.bookname; 
        let bookimg = fields.bookimg
        let author = fields.author
        let tag = fields.tag
        let pubtime = fields.pubtime
        let sort = fields.sort
        let brief = fields.brief
        let abrief = fields.abrief
        let bookUrl = fields.bookUrl
        let download = fields.download
        let arr = [bookname,bookimg,author,tag,pubtime,sort,brief,abrief,bookUrl,download]
        let sqlStr = 'insert into book(bookname,bookimg,author,tag,pubtime,sort,brief,abrief,bookUrl,download) values (?,?,?,?,?,?,?,?,?,?)'
        let result = await sqlQuery(sqlStr,arr)
        res.send('发表成功')
      })
})

app.post('/headimg', async (req,res)=>{
      const form = new formidable.IncomingForm();
      form.uploadDir = path.join(__dirname, 'public','uploads')
      form.keepExtensions = true
      console.log(req.query)
      console.log(req.url)
      form.parse(req,async (err,fields,files)=>{
        console.log(fields.email)
      let sqlStr = 'update user set headimg ="'+files.headimg.path.substr(48)+'" where email = "'+fields.email+'"'
      console.log(sqlStr)
      let result = await sqlQuery(sqlStr)
      let userInfo = req.app.locals.userInfo
      userInfo[0].headimg = files.headimg.path.substr(48)
      res.send(files.headimg.path.substr(48))
      })
     
})

app.get('/user1',async (req,res)=>{
      let {page,limit} = req.query
      page = (page-1)*limit
      let sqlStr = 'select * from user'
      let result = await sqlQuery(sqlStr)
      let sqlStr2 = 'select * from user limit '+page+' ,'+limit
      let data = await sqlQuery(sqlStr2)
      let count = result
      let options ={
        code:"0",
        msg:"等待加载数据",
        count:result.length,
        data:data
      }
      res.json(options)
})

app.get('/userxinxi/:email',async (req, res)=>{
      let email = req.params.email
      let sqlStr = 'select * from user where email = "'+email+'"'
      console.log(sqlStr)
      let result = await sqlQuery(sqlStr)
      console.log(result)
      res.send(result)
})

app.get('/layout', async (req, res)=>{
  res.render('layui.ejs')
})

app.use(function(req, res){
  res.render('404.ejs')
})
module.exports = app;

