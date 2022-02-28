const mysql = require('mysql');
const db = mysql.createConnection({
   host: "localhost",
    user: "admin",
    database: "bio",
    port: "3306",
    password: "password",
})

module.exports = function (app) {
    
    app.get('/AJ_pickingListChemical/:id', (req, res) => {
        const id = req.params.id;
        
        db.query("SELECT o_dis_id,o_dis_item_amount,o_dis_descrip,o_dis_status,o_dis_date,prof_name,std_name,o_dis_status FROM order_dis od JOIN professer prof ON od.prof_id = prof.prof_id JOIN student std ON std.std_id = od.std_id WHERE prof.prof_id = ? ORDER BY o_dis_date DESC",[id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
                console.log(result);  
            }
        })
    });
    
    app.get('/AJ_detailPLChemical/:id',(req,res) => {
        const id = req.params.id;
        console.log(id);
        db.query("SELECT ch_name, dis_quantity, dis_unit, prof_name , o_dis_date , o_dis_status ,o_dis_descrip,od.o_dis_id,std_name , std.std_id,std_level,std_tel FROM o_disbursement od JOIN order_dis ord ON od.o_dis_id = ord.o_dis_id JOIN chemical che ON che.ch_id = od.ch_id JOIN professer prof ON prof.prof_id = ord.prof_id JOIN student std ON std.std_id = ord.std_id WHERE od.o_dis_id = ?", [id],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.json(result);
                console.log(result);          
            } 
        })
    }) 

    app.put('/AJ_submitPLChemical/:id',(req,res) => {
        const id = req.params.id;
        console.log(id);
        const status = 2 ;
        db.query("UPDATE order_dis SET o_dis_status =? WHERE o_dis_id = ? ", [status,id],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.json(result);
                console.log(result);          
            } 
        })
    }) 

    app.put('/AJ_disSubmitPLChemical/:id',(req,res) => {
        const id = req.params.id;
        console.log(id);
        const status = 3 ;
        db.query("UPDATE order_dis SET o_dis_status =? WHERE o_dis_id = ? ", [status,id],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.json(result);
                console.log(result);          
            } 
        })
    }) 


    app.get('/AJ_pickingListTool/:id',(req,res) => {
        const id = req.params.id;
        db.query("SELECT o_bor_id,o_bor_date,o_bor_returned_date,o_bor_item_amount,o_bor_descrip,o_bor_status,prof_name,std_name FROM order_bor ob JOIN professer prof ON ob.prof_id = prof.prof_id JOIN student std ON std.std_id = ob.std_id WHERE prof.prof_id = ? ORDER BY o_bor_date DESC",[id],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.json(result);
                console.log(result);
            }
        })
    }) 

    app.get('/AJ_detailPLTool/:id',(req,res) => {
        const id = req.params.id;
        console.log(id);
        db.query("SELECT tool_name, tool_size,o_tool_amount, prof_name , o_bor_date , o_bor_status ,o_bor_descrip,o_bor_returned_date,ob.o_bor_id,std_name,std.std_id,std_level,std_tel FROM o_borrow ob JOIN order_bor orb ON ob.o_bor_id = orb.o_bor_id JOIN tools t ON t.tool_id = ob.tool_id JOIN professer prof ON prof.prof_id = orb.prof_id JOIN student std ON std.std_id = orb.std_id WHERE ob.o_bor_id = ?", [id],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.json(result);
                console.log(result);           
            } 
        })
    }) 

    app.put('/AJ_submitPLTool/:id',(req,res) => {
        const id = req.params.id;
        console.log(id);
        const status = 2 ;
        db.query("UPDATE order_bor SET o_bor_status =? WHERE o_bor_id = ? ", [status,id],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.json(result);
                console.log(result);          
            } 
        })
    }) 

    app.put('/AJ_disSubmitPLTool/:id',(req,res) => {
        const id = req.params.id;
        console.log(id);
        const status = 3 ;
        db.query("UPDATE order_bor SET o_bor_status =? WHERE o_bor_id = ? ", [status,id],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.json(result);
                console.log(result);          
            } 
        })
    }) 
}