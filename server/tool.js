const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "bio",
    port: "3306",
    password: "",
})
module.exports = function(app){

    const multer = require('multer');
    const path = require('path');

    const storageTool = multer.diskStorage({
        destination: path.join(__dirname, 'public/', 'imgTools'),
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
    app.post('/addTool', (req, res) => {
        try {
            let uploadTool = multer({ storage: storageTool }).single('IMG');
            uploadTool(req, res, function (err) {
                if (!req.file) {
                    return res.send('Please select an image to upload');
                } else if (err instanceof multer.MulterError) {
                    return res.send(err);
                } else if (err) {
                    return res.send(err);
                }
                let ToolAmount = req.body.ToolAmount
                let ToolSize = req.body.ToolSize
                let ToolStorage = req.body.ToolStorage
                let ToolName = req.body.ToolName
                console.log(req.body.ToolName)
                db.query("INSERT INTO tools (tool_name , tool_storage , tool_size , tool_amount , tool_img) VALUES(?,?,?,?,?) "
                    , [ToolName, ToolStorage, ToolSize, ToolAmount, req.file.filename],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("Values inserted");
                        }
                    })
            })
        }
        catch (err) {
            console.log(err)
        }
    })

    app.get('/toolsList', (req, res) => {
        db.query("SELECT * FROM tools", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        })
    });

    app.get("/readTool/:id", (req, res) => {
        const id = req.params.id;
        db.query("SELECT * FROM tools where tool_id = ?", [id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
    });
    
    app.put('/updateTool',(req,res) => {
        let updateTool = multer({ storage: storageTool }).single('IMG');
        updateTool(req,res,function(err){
            if(!req.file){
            let tool_id = req.body.tool_id
            let tool_name = req.body.tool_name
            let tool_storage = req.body.tool_storage
            let tool_size = req.body.tool_size
            let tool_amount = req.body.tool_amount
            db.query('UPDATE tools SET tool_name =?, tool_storage =?, tool_size =?, tool_amount =? WHERE tool_id =? ', 
            [tool_name,tool_storage,tool_size,tool_amount,tool_id] , 
            (err, result) => {
                if(err){
                    console.log(err); 
                } else {
                    res.send("Values Updated")  
                }
            } )
            }else {
                let tool_id = req.body.tool_id
            let tool_name = req.body.tool_name
            let tool_storage = req.body.tool_storage
            let tool_size = req.body.tool_size
            let tool_amount = req.body.tool_amount
            db.query('UPDATE tools SET tool_name =?, tool_storage =? , tool_size =? , tool_amount =? , tool_img =? WHERE tool_id =? ', 
            [tool_name,tool_storage,tool_size,tool_amount, req.file.filename ,tool_id] , 
            (err, result) => {
                if(err){
                    console.log(err); 
                } else {
                    res.send("Values Updated")  
                }
            } )
            }
        }) 
    })
    
    //------------- delTool -------------------------------
    app.delete("/delTool/:id", (req, res) => {
        const id = req.params.id;
        console.log(id);
        db.query("DELETE FROM tools where tool_id = ?", [id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
    })
    
    



}