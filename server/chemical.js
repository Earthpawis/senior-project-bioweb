const { log } = require('console');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "admin",
    database: "bio",
    port: "3306",
    password: "password",
})
module.exports = function(app){

    const multer = require('multer'); 
    const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/', 'imgChemical'),
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
app.post('/addChemical', (req, res) => { 
        let upload = multer({ storage: storage }).single('IMG');
        upload(req, res, function (err) {
            if (!req.file) {
                let CheName = req.body.CheName
                let CheCas = req.body.CheCas
                let CheFormular = req.body.CheFormular
                let CheCode = req.body.CheCode
                let CheManu = req.body.CheManu
                let CheQuan = req.body.CheQuan
                let CheAmount = req.body.CheAmount
                let CheStorage = req.body.CheStorage
                let CheStatus = req.body.CheStatus
                let CheExp = req.body.CheExp
                db.query("INSERT INTO chemical (ch_name , ch_cas_no , ch_formula , ch_code , ch_manufacturer , ch_quantity , ch_amount ,ch_status ,ch_storage  ,ch_exp) VALUES(?,?,?,?,?,?,?,?,?,?) "
                    , [CheName, CheCas, CheFormular, CheCode, CheManu, CheQuan, CheAmount, CheStatus, CheStorage, CheExp],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("Values inserted");
                        }
                    })
            } else  {
                let CheName = req.body.CheName
                let CheCas = req.body.CheCas
                let CheFormular = req.body.CheFormular
                let CheCode = req.body.CheCode
                let CheManu = req.body.CheManu
                let CheQuan = req.body.CheQuan
                let CheAmount = req.body.CheAmount
                let CheStorage = req.body.CheStorage
                let CheStatus = req.body.CheStatus
                let CheExp = req.body.CheExp

                db.query("INSERT INTO chemical (ch_name , ch_cas_no , ch_formula , ch_code , ch_manufacturer , ch_quantity , ch_amount ,ch_status ,ch_storage ,ch_img ,ch_exp) VALUES(?,?,?,?,?,?,?,?,?,?,?) "
                    , [CheName, CheCas, CheFormular, CheCode, CheManu, CheQuan, CheAmount, CheStatus, CheStorage, req.file.filename, CheExp],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("Values inserted");
                        }
                    })   
            }
        } )
    
})

    

app.get('/chemicalList', (req, res) => { 
        db.query("SELECT * FROM chemical", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        })
    });

    app.get("/readChe/:id", (req, res) => {
        const id = req.params.id;
        db.query("SELECT * FROM chemical where ch_id = ?", [id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
    });

    
//---------- EditCh ------------------
app.put('/updateChe', (req, res) => {
    let update = multer({ storage: storage }).single('IMG');
    update(req,res,function(err){
        if(!req.file){
            const ch_id = req.body.ch_id;
    const ch_cas_no = req.body.ch_cas_no;
    const ch_formula = req.body.ch_formula;
    const ch_code = req.body.ch_code;
    const ch_manufacturer = req.body.ch_manufacturer;
    const ch_quantity = req.body.ch_quantity;
    const ch_amount = req.body.ch_amount;
    const ch_status = req.body.ch_status;
    const ch_storage = req.body.ch_storage;
    const ch_name = req.body.ch_name;
    const ch_exp = req.body.ch_exp;
    console.log(req.body.ch_exp);
    db.query("UPDATE chemical SET ch_cas_no =? ,ch_name =? ,ch_formula =?, ch_code =?, ch_manufacturer =?, ch_quantity =? , ch_amount =? ,ch_status =?,ch_storage =?,ch_exp =? WHERE ch_id=? ",
        [ch_cas_no, ch_name, ch_formula, ch_code, ch_manufacturer, ch_quantity, ch_amount, ch_status, ch_storage,ch_exp, ch_id],
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
        }else {
            const ch_id = req.body.ch_id;
    const ch_cas_no = req.body.ch_cas_no;
    const ch_formula = req.body.ch_formula;
    const ch_code = req.body.ch_code;
    const ch_manufacturer = req.body.ch_manufacturer;
    const ch_quantity = req.body.ch_quantity;
    const ch_amount = req.body.ch_amount;
    const ch_status = req.body.ch_status;
    const ch_storage = req.body.ch_storage;
    const ch_name = req.body.ch_name;
    const ch_exp = req.body.ch_exp;
    db.query("UPDATE chemical SET ch_cas_no =? ,ch_name =? ,ch_formula =?, ch_code =?, ch_manufacturer =?, ch_quantity =? , ch_amount =? ,ch_status =?,ch_storage =?,ch_exp =?,ch_img=? WHERE ch_id=? ",
        [ch_cas_no, ch_name, ch_formula, ch_code, ch_manufacturer, ch_quantity, ch_amount, ch_status, ch_storage,ch_exp,req.file.filename, ch_id],
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
        }
    })
    
})

//----- del ------
app.delete("/delChe/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM chemical where ch_id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})




}