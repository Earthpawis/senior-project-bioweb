import React from 'react'
import { Modal, Button, Form, Card } from 'react-bootstrap'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { getCartItemTool , setCartItemTool} from '../../functions/cartItem'

const StCartTools = () => {

  let item = getCartItemTool();
  const i = JSON.parse(localStorage.getItem("user"));

  //Cart_detail
  const [prof_id, setProf_id] = useState("1");
  const [dis_descrip, setDis_descrip] = useState();

  
  const [proid, setProid] = useState();
  const [professerList, setProfesserList] = useState([]);
  const delItem = (key) => {
    localStorage.removeItem('item'[key]);
    item.splice(key)
    console.log(item);
    setCartItemTool(item);
    window.location.reload();
  }
  const submit = () => {
    console.log(proid);
  }
  const getProfesser = () => {
    axios.get('http://localhost:3307/dataProfesser').then((Response) => {
        setProfesserList(Response.data);
    });
  }
  useEffect(() => {
    getProfesser();
    console.log(getCartItemTool());
  }, [])

  return (
    <div className="container">
      <div className="card" style={{ marginTop: '5rem', borderRadius: 15, boxShadow: '0 30px 50px rgb(0 0 0 / 20%)' }}>
        <div className="card-body">
          <h3>ยืมอุปกรณ์</h3>
          <div className="">
            <table className=" table table-bordered  ">
              <thead className=" ">
                <tr>
                <th width="2%" style={{ minWidth: 20 }}></th>
                  <th width="10%" style={{ minWidth: 100 }}>ID</th>
                  <th width="30%" style={{ minWidth: 170 }}>รายการ</th>
                  <th width="10%" style={{ minWidth: 100 }}>จำนวน</th>
                  <th width="5%" style={{ minWidth: 100 }}>ขนาด</th>
                  <th width="2%" style={{ minWidth: 20 }} />
                </tr>
              </thead>
              <tbody style={{ verticalAlign: 'middle' }}>
              {item.map((val,key) => {
                  return (<tr key= {key}>
                    <th scope="row">{key+1}</th>
                    <th scope="row">{val.tool_id}</th>
                    <td>{val.tool_name}</td>
                    <td><input className="form-control form-control-sm" type="text" aria-label=".form-control-sm example" /></td>
                    <td><Form.Select aria-label="Default select example" onChange={(Event) => { }}>
                      <option value="0">หน่วย</option>
                      <option value="1">g.</option>
                      <option value="2">mL.</option>
                    </Form.Select></td>
                    <td style={{ textAlign: 'center' }}><i className="far fa-trash-alt" style={{ color: '#E91919', textAlign: 'center' , cursor:'pointer' }} onClick={() => delItem(key)} /></td>
                  </tr>)
                  
                })}
              </tbody>
            </table>
            <div className="row mt-3">
              <div className="col-xl-6 col-sm-12 col-md-6 col-lg-6 col-12 ">
                <div className="dropdown text-end mt-2">
                  <Form.Select aria-label="Default select example" onChange={(Event) => { setProid(Event.target.value) }}>
                  {professerList.map((val,key) =>{
                     return ( <>
                     <option value={val.prof_id}>{val.prof_name}</option>
                     </>  
                     )
                   } )}
                  </Form.Select>
                </div>
              </div>
              <div className="col-xl-6 col-sm-12 col-md-6 col-lg-6 col-12 sm-mt-2 ">
                <div className="input-group">
                  <span className="input-group-text">เพื่อ</span>
                  <textarea className="form-control" aria-label="With textarea" defaultValue={""} />
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6" style={{ textAlign: "end" }}>
                <button type="submit" className="btn btn-add-modal" style={{ color: '#fff' }} onClick={submit} >
                  <i aria-hidden="true" className="fas fa-check mx-2" style={{ fontSize: 16 }} />ยืนยัน
                </button>
              </div>
              <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6">
                <button type="button" className="btn  btn-add-cancal" style={{ color: '#fff' }}>
                  <i aria-hidden="true" className="fas fa-times mx-2 " style={{ fontSize: 16 }} />
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StCartTools
