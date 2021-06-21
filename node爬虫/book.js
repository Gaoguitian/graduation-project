let mysql = require('mysql')
let axios = require('axios')
let cheerio = require('cheerio')

let page = 2;
let count = 1;
let options = {
    host:"localhost",
    //port:"3306",//可选，默认式3306
    user:"root",
    password:"12345678",
    database:"book"
}
let con = mysql.createConnection(options)
con.connect()
//获取第N个页面所有书籍的链接
async function getPageUrl(num){
    let httpUrl = "https://sobooks.cc/yingwenyuanban/page/"+num;
    let res = await axios.get(httpUrl)
    console.log(res.data)
    let $ = cheerio.load(res.data)
    let hrefList = []
    console.log(num)
    $("#cardslist .card-item .thumb-img>a").each((i,ele)=>{
        let href = $(ele).attr("href")
    //    console.log(href)
        //根据地址访问书籍详情页面
        hrefList.push(href)
        getBookInfo(href)
    }) 
    
}
async function getBookInfo(href){
    let res = await axios.get(href);
    let $ = cheerio.load(res.data);
    let bookimg =$('.article-content .bookpic img').attr('src');
    let bookname = $('.article-content .bookinfo li:nth-child(1)').text()
    bookname = bookname.substring(3,bookname.length)
    let author = $('.article-content .bookinfo li:nth-child(2)').text()
    author = author.substring(3,author.length)
    let tag = $('.article-content .bookinfo li:nth-child(4)').text()
    tag = tag.substring(3,tag.length)
    let pubtime = $('.article-content .bookinfo li:nth-child(5)').text()
    pubtime = pubtime.substring(3,pubtime.length)
    let sort = $('.article-header .meta #mute-category a').text().trim()
    sort = sort.substring(0,sort.length)
    let brief = $('body > section > div.content-wrap > div > article > p').text()
    brief = brief.substring(0,brief.length)
    let abrief = $('body > section > div.content-wrap > div > article > p:nth-child(7)').text()
    abrief = abrief.substring(0,abrief.length)
    let bookUrl = href;
    let download;
    try{
         download = $('body > section > div.content-wrap > div > article > table > tbody > tr:nth-child(3) > td > a:nth-child(3)').attr('href').split("?url=")[1];
    }catch (error) {
        download = $('body > section > div.content-wrap > div > article > table > tbody > tr:nth-child(3) > td > a:nth-child(3)').attr('href');}
   
   console.log(bookimg)

     let arr = [bookimg,bookname,author,tag,pubtime,sort,brief,abrief,bookUrl,download]

     let strSql = 'insert into book(bookimg,bookname,author,tag,pubtime,sort,brief,abrief,bookUrl,download) values (?,?,?,?,?,?,?,?,?,?)'

     con.query(strSql,arr,(err,results) => {
         console.log(err)
         console.log(results)
     })
    
    
  }

  getPageUrl(page)
