const express = require("express")
const app = express()
require("dotenv").config()
const bodyParser = require("body-parser")
const cors = require ("cors")
const nodemailer = require("nodemailer")

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json)
app.use(cors())
app.listen((process.env.PORT || 4000 ,
    () => {
       console.log("Server is listening on port 4000");
})
)
const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "bio",
    port: "3306",
    password: "",
})

module.exports = function (app) {
 
app.post("/mail",cors(),(req,res)=>{
    let item = req.body.item
    let user = req.body.user
    let descrip = req.body.descrip
    let prof_id = req.body.prof
    let item_aomunt = item.length
    let date = req.body.date ;
    let email = ""; 
    
    db.query("SELECT prof_email FROM professer where prof_id = ?", [prof_id],async (err, result) => {
        email = result[0].prof_email ;
        console.log(result[0]); 
          let transport = nodemailer.createTransport({ 
            host : process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
    
        await transport.sendMail({
            from: process.env.MAIL_FROM,
            to: `${email}`,
            subject:"มีการขอเบิกใช้สารเคมี",
            html:  `<div className="email" style ="border:1px solid black ; 
            padding: 20px ; 
            font-family: sans-serif;
            line-height : 2 ;
            font-size: 20 px ;
            ">
            <h2>ขอเบิกใช้สารเคมี</h2>
            <p>เพื่อ : ${descrip}</p> 
            <p>วันที่เบิก : ${date}</p> 
            <p>ชื่อผู้เบิก : ${user.std_name} &nbsp; &nbsp; รหัสนักศึกษา :  ${user.std_id}&nbsp; &nbsp;ชั้นปี : ${user.std_level}  </p>
            <p>เบอร์โทรศัพท์ : ${user.std_tel}  </p>
            <p>รายการเบิกจำนวน : ${item_aomunt} รายการ</p>
            </div>
            `
        })
    });
})

app.post("/mailTool",cors(),(req,res)=>{
    let item = req.body.item
    let user = req.body.user
    let descrip = req.body.descrip
    let prof_id = req.body.prof
    let item_aomunt = item.length
    let date = req.body.date ;
    let email = ""; 
    
    db.query("SELECT prof_email FROM professer where prof_id = ?", [prof_id],async (err, result) => {
        email = result[0].prof_email ;
        console.log(result[0]); 
          let transport = nodemailer.createTransport({ 
            host : process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
    
        await transport.sendMail({
            from: process.env.MAIL_FROM,
            to: `${email}`,
            subject:"มีการขอเบิกใช้อุปกรณ์",
            html:  `<div className="email" style ="border:1px solid black ; 
            padding: 20px ; 
            font-family: sans-serif;
            line-height : 2 ;
            font-size: 20 px ;
            ">
            <h2>ขอเบิกใช้สารเคมี</h2>
            <p>เพื่อ : ${descrip}</p> 
            <p>วันที่เบิก : ${date}</p> 
            <p>ชื่อผู้เบิก : ${user.std_name} &nbsp; &nbsp; รหัสนักศึกษา :  ${user.std_id}&nbsp; &nbsp;ชั้นปี : ${user.std_level}  </p>
            <p>เบอร์โทรศัพท์ : ${user.std_tel}  </p>
            <p>รายการเบิกจำนวน : ${item_aomunt} รายการ</p>
            </div>
            `
        })
    });
})



}