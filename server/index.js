const express = require('express');
const app = express();
const mysql = require('mysql2');
const mysql2 = require('mysql2/promise')
const cors = require('cors');
const csvParser = require('csv-parser')
const multer = require('multer');
const path = require('path');
const { readFileSync, createReadStream, unlinkSync } = require('fs');
const { query } = require('express');
const { log } = require('console');

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
// const bodyParser = require('body-parser'); 
//  app.use(bodyParser.json()); 

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "bio",
    port: "3306",
    password: "",
    // host: "localhost",
    // user: "admin",
    // database: "bio",
    // port: "3306",
    // password: "password",
})

app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    console.log(req.originalUrl);
    next();
});

require('./chemical')(app)
require('./cart')(app)
require('./st_pickingList')(app)
require('./dashboard')(app)
require('./aj_pickingList')(app)  
require('./tool')(app)   
require('./report')(app)  
require('./mail')(app)  

app.listen('3307', () => {
    console.log('Server is running on port 3307');
})

// --------------------- GET ----------------------

app.get('/',(req,res) => {
 res.send("5555")
})


//-----------mail





//-----------
app.get('/bioo', (req, res) => {
    db.query("SELECT * FROM admin", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    })
});


//---------- Login
app.post("/login", async (req, res) => {
    const useremail = req.body.email;
    const userpassword = req.body.password;
    const database = await mysql2.createConnection({
        host: "localhost",
        user: "root",
        database: "bio",
        port: "3306",
        password: "",
    })
    const [_resultAdmin, _fieldAdmin] = await database.execute("SELECT * FROM admin where admin_username = ? and admin_password = ? ", [useremail, userpassword]);
    console.log('admin', _resultAdmin);
    if (_resultAdmin.length>0) {
        return res.json(_resultAdmin);
    }
    const [_resultStudent, _fieldStudent] = await database.execute("SELECT * FROM student where std_id = ? and std_password = ? ", [useremail, userpassword]);
    console.log('student', _resultStudent);
    if (_resultStudent.length>0) {
        return res.json(_resultStudent);
    }
    const [_resultProfesser, _fieldProfesser] = await database.execute("SELECT * FROM professer where prof_username = ? and prof_password = ?", [useremail, userpassword]);
    console.log('professer', _resultProfesser);
    if (_resultProfesser) {
        return res.json(_resultProfesser);   
    } 
    
        return res.status(404).json({})
    
});



//------------------------------------------------- Student
app.get('/dataStudent', (req, res) => {
    db.query("SELECT * FROM student", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    })
});

app.post('/stuRead:std_id', (req, res) => {
    const id = req.params.std_id;
    db.query("SELECT * FROM student WHERE std_id = ?", id, (err, result) => {
        if (err) {
        } else {
            res.send(result);
        }
    })
})

app.get("/readStudent/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM student where std_id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/dataStudentcreate', (req, res) => {
    const std_id = req.body.std_id
    const std_name = req.body.std_name
    const std_password = req.body.std_password
    const std_tel = req.body.std_tel
    const std_level = req.body.std_level

    db.query("INSERT INTO student (std_id, std_name, std_password, std_level, std_tel) VALUES(?,?,?,?,?)",
        [std_id, std_name, std_password, std_level, std_tel],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        }
    )
})


//------------------ PUT ------------------------
app.put('/dataStudentupdate', (req, res) => {
    const std_id = req.body.std_id;
    const std_password = req.body.std_password;
    console.log(std_id, std_password)
    db.query("UPDATE student set std_password = ? WHERE std_id = ? ", [std_password, std_id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})

app.put('/updateEditStudent', (req, res) => {
    console.log(req);
    const std_id = req.body.std_id;
    const std_password = req.body.std_password;
    const std_level = req.body.std_level;
    const std_name = req.body.std_name;
    const std_tel = req.body.std_tel;
    const err = "";
    db.query("UPDATE student SET std_password =? ,std_level =?, std_name =?, std_tel =? WHERE std_id=? ",
        [std_password, std_level, std_name, std_tel, std_id],
        (err,
            (result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send("values insert complete")
                }
            }
        )
    )
})

app.delete("/deleteDataStudent/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("DELETE FROM student where std_id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})


//-----------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------- Professer 
app.get('/dataProfesser', (req, res) => {
    db.query("SELECT * FROM professer", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    })
});

app.get("/readProfesser/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM professer where prof_id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/dataProfessercreate', (req, res) => {
    const prof_id = req.body.prof_id
    const prof_name = req.body.prof_name
    const prof_password = req.body.prof_password
    const prof_tel = req.body.prof_tel
    const prof_username = req.body.prof_username
    const prof_email = req.body.prof_email

    db.query("INSERT INTO professer (prof_id, prof_name, prof_password, prof_username, prof_tel,prof_email) VALUES(?,?,?,?,?,?)",
        [prof_id, prof_name, prof_password, prof_username, prof_tel,prof_email],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted"); 
            }
        }
    )
})
app.put('/updateEditProfesser', (req, res) => {
    console.log(req);
    const prof_id = req.body.prof_id;
    const prof_name = req.body.prof_name;
    const prof_password = req.body.prof_password;
    const prof_tel = req.body.prof_tel;
    const prof_username = req.body.prof_username;
    const prof_email = req.body.prof_email;
    const err = "";

    db.query("UPDATE professer SET prof_name =? ,prof_password =?, prof_tel =?, prof_username =?,prof_email =? WHERE prof_id=? ", 
        [prof_name, prof_password, prof_tel, prof_username,prof_email, prof_id],
        (err,
            (result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send("values insert complete")
                }
            }
        )
    )
})

app.delete("/deleteDataProfesser/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("DELETE FROM professer where prof_id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})
//---------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------- UPLOADFILE 
app.post('/uploadFileCSV', (req, res) => {
    try {
        let upload = multer({
            storage: multer.diskStorage({
                destination: path.join(__dirname, 'public/', 'excel_pool'),
                filename: function (req, file, cb) {
                    cb(null, Date.now() + '-' + file.originalname)
                }
            })
        }).single('fileCSV');
        upload(req, res, function (err) {
            if (!req.file) {
                return res.send('Please select an image to upload');
            } else if (err instanceof multer.MulterError) {
                return res.send(err);
            } else if (err) {
                return res.send(err);
            }
            let fileName = req.file.filename;
            let results = [];
            createReadStream("./public/excel_pool/" + fileName, 'utf-8').pipe(csvParser({ headers: true })).on('data', (data) => results.push(data))
                .on('end', () => {
                    for (let index = 1; index < results.length; index++) {
                        let data = results[index];
                        console.log(data);
                        if (data['_1'] && data['_2']){
                            var sql = `INSERT INTO chemical (ch_code,ch_name,ch_formula,ch_cas_no,ch_danger,ch_quantity,ch_amount,ch_grade,ch_price,ch_storage,ch_ststatus,ch_date_import,ch_date_enable,ch_seller,ch_manufacturer,ch_exp,ch_date_out,ch_budget
                                ,ch_open,ch_note ) values ('${data['_1']}','${data['_2']}','${data['_3']}','${data[`_4`]}','${data[`_5`]}','${data[`_6`]}','${data[`_7`]}','${data[`_8`]}','${data[`_9`]}','${data[`_10`]}','${data[`_11`]}','${data[`_12`]}'
                                ,'${data[`_13`]}','${data[`_14`]}','${data[`_15`]}','${data[`_16`]}','${data[`_17`]}','${data[`_18`]}','${data[`_19`]}','${data[`_20`]}')`;
                            console.log(data[`_1`], data[`_2`], data[`_3`], data[`_4`]) 
                            // console.log(`INSERT INTO tableName values(${data[`_0`]},${data[`_1`]},${data[`_2`]})`);
                            // db.query(`INSERT INTO chemical (ch_code,ch_name,ch_formula) VALUES(?,?,?),`,[data[`_1`],data[`_2`],data[`_3`]]) 
                            db.query(sql, function (err, result) {  
                                if (err) throw err;
                                console.log(err); 
                            });

                        }
                        
                    }
                });
            unlinkSync("./public/excel_pool/" + fileName)
            // const raw = readFileSync("./public/excel_pool/" + fileName, 'utf-8');
            // let arrayData = raw.split(/\r?\n/);
            // console.log(results);
        })
        return res.status(200).json({})
    } catch (e) {
        console.log(e);
        return res.status(500).json({})
    }
})



//-------------------------------------------------------------------------------------------------------------------
