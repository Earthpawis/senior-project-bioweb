import React from 'react'
import { Modal, Button, Form, Card } from 'react-bootstrap'
import { useState, useEffect, useMemo } from 'react'
import axios, { Axios } from 'axios'
import { getCartItem, setCartItem, getUserData } from '../../functions/cartItem'
import Swal from 'sweetalert2'

const StBorrow = () => {

  let item = getCartItem();
  const i = JSON.parse(localStorage.getItem("user"));

  //Cart_detail
  const [dis_quantity, setDis_quantity] = useState();
  const [dis_unit, setUnit] = useState();
  const [std_id, setStd_id] = useState();
  const [prof_id, setProf_id] = useState();
  const [ch_id, setCh_id] = useState();
  const [dis_date, setDis_date] = useState();
  const [dis_descrip, setDis_descrip] = useState();
  const [cartData, setCartData] = useState([]);

  const submit = () => {
    console.log(item);
    console.log(i);
    console.log(prof_id);
     
  
    axios.post('http://localhost:3307/submitDis', {item:cartData, user:i, descrip:dis_descrip, prof:prof_id}).then(
      res => {
      if(res.status === 200){
        Swal.fire("ทำรายการเบิกสำเร็จ", "", "success")
      }else if (res.status === 500){
        console.log("555555555555555555555555555555")
        Swal.fire("ไม่สามารถอัพโหลดข้อมูลได้", "เนื่องจากไม่ได้เเนบรูปภาพ", "error")
      }
    })
    // axios.post('http://localhost:3307/submitDis', {
    //   dis_quantity: dis_quantity,
    //   dis_unit: dis_unit,
    //   std_id: i.std_id,
    //   prof_id: prof_id,
    //   ch_id: item.ch_id
    // })
  }


  const [professerList, setProfesserList] = useState([]);


  const delItem = (key) => {
    localStorage.removeItem('item'[key]);
    item.splice(key)
    console.log(item);
    setCartItem(item);
    window.location.reload();

  }


  const getProfesser = () => {
    axios.get('http://localhost:3307/dataProfesser').then((Response) => {
      setProfesserList(Response.data);
    });
  }
  useEffect(() => {
    console.log(cartData);
  }, [cartData])
  useEffect(() => {
    getProfesser();
    setCartData(getCartItem())
  }, [])
  return (

    <div className="container">
      <div className="card" style={{ marginTop: '5rem', borderRadius: 15, boxShadow: '0 30px 50px rgb(0 0 0 / 20%)' }}>
        <div className="card-body">
          <h3>เบิกสารเคมี</h3>
          <div className="">
            <table className=" table table-bordered ">
              <thead className=" ">
                <tr>
                  <th width="10%" style={{ minWidth: 100 }}></th>
                  <th width="10%" style={{ minWidth: 100 }}>ID</th>
                  <th width="30%" style={{ minWidth: 170 }}>รายการ</th>
                  <th width="10%" style={{ minWidth: 100 }}>จำนวน</th>
                  <th width="5%" style={{ minWidth: 100 }}>หน่วย</th>
                  <th width="2%" style={{ minWidth: 20 }} />
                </tr>
              </thead>
              <tbody style={{ verticalAlign: 'middle' }}>
                {cartData.map((val, key) => {
                  return (<tr key={key}>
                    <th scope="row">{key + 1}</th>
                    <th scope="row">{val.ch_id}</th>
                    <td>{val.ch_name}</td>
                    <td><input className="form-control form-control-sm" type="text" aria-label=".form-control-sm example"
                      onChange={(event) => {
                        cartData[key].quantity = parseInt(event.target.value);
                        setCartData([...cartData])
                      }}
                    /></td>
                    <td><Form.Select aria-label="Default select example" onChange={(event) => {
                      setUnit(event.target.value)
                    }}>
                      <option value="0">หน่วย</option>
                      <option value="1">g.</option>
                      <option value="2">mL.</option>
                    </Form.Select></td>
                    <td style={{ textAlign: 'center' }}><button><i className="far fa-trash-alt" style={{ color: '#E91919', textAlign: 'center' }} onClick={() => delItem(key)} /></button></td>
                  </tr>)

                })}
              </tbody>
            </table>
            <div className="row mt-3">
              <div className="col-xl-6 col-sm-12 col-md-6 col-lg-6 col-12 ">
                <div className="dropdown text-end mt-2">
                  <Form.Select aria-label="Default select example" onChange={(Event) => { setProf_id(Event.target.value) }}>
                    {professerList.map((val, key) => {
                      return (<>
                        <option value={val.prof_id}>{val.prof_name}</option>
                      </>
                      )
                    })}
                  </Form.Select>
                </div>
              </div>
              <div className="col-xl-6 col-sm-12 col-md-6 col-lg-6 col-12 ">
                <div className="input-group">
                  <span className="input-group-text">เพื่อ</span>
                  <textarea className="form-control" aria-label="With textarea" defaultValue={""}
                    onChange={(event) => {
                      setDis_descrip(event.target.value)
                    }} />
                </div>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6" style={{ textAlign: "end" }}>
                <button type="submit" className="btn btn-add-modal" style={{ color: '#fff' }} onClick={submit}  >
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

export default StBorrow
