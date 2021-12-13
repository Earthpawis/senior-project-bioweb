const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "bio",
    port: "3306",
    password: "",


})

app.listen('3307', () => {
    console.log('Server is running on port 3307');
})



// --------------------- GET ----------------------

app.get('/bioo', (req, res) => {
    db.query("SELECT * FROM admin", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    })
});

app.get('/chemicalList', (req, res) => {
    db.query("SELECT * FROM chemical", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    })
});

app.get('/toolsList', (req, res) => {
    db.query("SELECT * FROM tools", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    })
});

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
            console.log(err);
        } else {
            res.send(result);
        }
    })
})



app.get('/dataProfesser', (req, res) => {
    db.query("SELECT * FROM professer", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    })
});

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




 app.get("/readChe/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM Chemical where ch_id = ?", [id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  //---------- EditCh ------------------
app.put('/updateChe', (req, res) => {
    console.log(req);
    const ch_id = req.body.ch_id;
    const ch_cas_no = req.body.ch_cas_no;
    const ch_formula = req.body.ch_formula;
    const ch_code = req.body.ch_code;
    const ch_manufacturer = req.body.ch_manufacturer;
    const ch_quantity = req.body.ch_quantity;
    const ch_amount = req.body.ch_amount;
    const ch_status = req.body.ch_status;
    const ch_storage = req.body.ch_storage;
    const err = "";
    console.log(req)
    db.query("UPDATE chemical SET ch_cas_no =? ,ch_formula =?, ch_code =?, ch_manufacturer =?, ch_quantity =? , ch_amount =? ,ch_status =?,ch_storage =? WHERE ch_id=? ",
        [ch_cas_no,ch_formula,ch_code,ch_manufacturer,ch_quantity,ch_amount,ch_status,ch_storage,ch_id],
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

//----- del ------
app.delete("/delChe/:id" , (req, res) =>{
    const id = req.params.id;
    console.log(id);
    db.query("DELETE FROM chemical where ch_id = ?" , [id], (err , result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    })
})


// --------------- POST -----------------
const multer = require('multer');

app.post("/login", (req, res) => {
    const useremail = req.body.email;
    const userpassword = req.body.password;
    console.log(useremail, userpassword);
    db.query("SELECT * FROM admin where admin_username = ? and admin_password = ? ", [useremail, userpassword], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});


const path = require('path');
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/', 'imgChemical'),
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
app.post('/addChemical', (req, res) => {
    try {
        let upload = multer({ storage: storage }).single('IMG');

        upload(req, res, function (err) {
            if (!req.file) {
                return res.send('Please select an image to upload');
            } else if (err instanceof multer.MulterError) {
                return res.send(err);
            } else if (err) {
                return res.send(err);
            }
            let CheName = req.body.CheName
            let CheCas = req.body.CheCas
            let CheFormular = req.body.CheFormular
            let CheCode = req.body.CheCode
            let CheManu = req.body.CheManu
            let CheQuan = req.body.CheQuan
            let CheAmount = req.body.CheAmount
            let CheStorage = req.body.CheStorage
            let CheStatus = req.body.CheStatus

            db.query("INSERT INTO chemical (ch_name , ch_cas_no , ch_formula , ch_code , ch_manufacturer , ch_quantity , ch_amount ,ch_status ,ch_storage ,ch_img) VALUES(?,?,?,?,?,?,?,?,?,?) "
                , [CheName, CheCas, CheFormular, CheCode, CheManu, CheQuan, CheAmount, CheStatus, CheStorage, req.file.filename])
        })
    }
    catch (err) {
        console.log(err)
    }
})


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

app.post('/dataProfessercreate', (req, res) => {
    const prof_id = req.body.prof_id
    const prof_name = req.body.prof_name
    const prof_password = req.body.prof_password
    const prof_tel = req.body.prof_tel
    const prof_username = req.body.prof_username

    db.query("INSERT INTO professer (prof_id, prof_name, prof_password, prof_username, prof_tel) VALUES(?,?,?,?,?)",
        [prof_id, prof_name, prof_password, prof_username, prof_tel],
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
        [std_password,std_level,std_name,std_tel,std_id],
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



app.put('/updateEditProfesser', (req, res) => {
    console.log(req);
    const prof_id = req.body.prof_id;
    const prof_name = req.body.prof_name;
    const prof_password = req.body.prof_password;
    const prof_tel = req.body.prof_tel;
    const prof_username = req.body.prof_username;
    const err = "";
    
    db.query("UPDATE professer SET prof_name =? ,prof_password =?, prof_tel =?, prof_username =? WHERE prof_id=? ",
        [prof_name,prof_password,prof_tel,prof_username,prof_id],
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

//------------------ DELETE ------------------------
app.delete("/deleteDataStudent/:id" , (req, res) =>{
    const id = req.params.id;
    console.log(id);
    db.query("DELETE FROM student where std_id = ?" , [id], (err , result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.delete("/deleteDataProfesser/:id" , (req, res) =>{
    const id = req.params.id;
    console.log(id);
    db.query("DELETE FROM professer where prof_id = ?" , [id], (err , result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    })
})