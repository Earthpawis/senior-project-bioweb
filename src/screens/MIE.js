import React from 'react'
import '../css/MIE.css'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import {Modal,Button} from 'react-bootstrap'

export default function MIE() {

  const [show, setShow] = useState(false);
  const addClose = () => setShow(false);
  const addShow = () => setShow(true);



  const [chemicalList, setChemicalList] = useState([]);
  const getChemical = () => {
    Axios.get('http://localhost:3307/chemicalList').then((response) => {
      setChemicalList(response.data);
    });
  }
  const [equipmentList, setEquipmentList] = useState([]);
  const getEquipment = () => {
    Axios.get('http://localhost:3307/equipmentList').then((response) => {
      setEquipmentList(response.data);
    });
  }

  useEffect(() => {
    getChemical();
    getEquipment();
  }, []);


  return (

    <>
    <div className="col-9 " style={{ marginRight: '20rem', marginTop: '5rem' }}>
      <div className="warpper" >
        <input className="radio" id="one" name="group" type="radio" defaultChecked />
        <input className="radio" id="two" name="group" type="radio" />
        <div className="tabs">
          <label className="tab" id="one-tab" htmlFor="one">สารเคมี</label>
          <label className="tab" id="two-tab" htmlFor="two">อุปกรณ์</label>
        </div>
        <div className="panels">
          <div className="panel" id="one-panel">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th className="headname-th" scope="col" width="3%" style={{ minWidth: 100 }}> <span>ชนิด</span> </th>
                  <th className="headname-th" scope="col" width="5%" style={{ minWidth: 200 }}><span>ชื่อสารเคมี </span></th>
                  <th className="headname-th" scope="col" width="3%" style={{ minWidth: 180 }}><span>รหัสสารเคมี</span> </th>
                  <th className="headname-th" scope="col" width="3%" style={{ minWidth: 150 }}><span>ยอดคงเหลือ</span> </th>
                  <th className="headname-th" scope="col" width="5%" style={{ minWidth: 150 }}><span>สถานที่เก็บ</span> </th>
                  <th className="headname-th" scope="col" width="5%" style={{ minWidth: 200 }} />
                  <th>
                    <button type="button" onClick={addShow} className="btn btn-report " data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: '#5DD480', borderRadius: 4, width: 95, color: '#fff' }}><i aria-hidden="true" className="fas fa-plus" style={{ fontSize: 15 }} /><label className="mx-2">เพิ่ม</label> </button>
                  </th>
                </tr>
              </thead>
              <tbody style={{ height: '12rem', verticalAlign: 'middle' }}  >
                {chemicalList.map((val) => {
                  return (
                    <tr className="table-name-report">
                      <th scope="row">{val.ch_id}</th>
                      <td>{val.ch_name}</td>
                      <td><label className="class-room">{val.ch_code}</label></td>
                      <td>{val.ch_amount}</td>
                      <td>{val.ch_storage}</td>
                      <td>
                        <button type="button" className="btn btn-report " data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-search-plus" style={{ fontSize: 15 }} /><label className="mx-2">ดูรายละเอียด</label> </button>
                      </td>
                      <td><button type="button" className="btn btn-report " data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: '#958F8F', color: '#fff' }}><i aria-hidden="true" className="far fa-edit" style={{ fontSize: 15 }} /><label className="mx-2">แก้ไข</label> </button></td>
                    </tr>)

                })}

              </tbody>
            </table>
          </div>
 
          <div className="panel" id="two-panel">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th className="headname-th" scope="col" width="3%" style={{ minWidth: 100 }}> <span>ชนิด</span> </th>
                  <th className="headname-th" scope="col" width="5%" style={{ minWidth: 250 }}><span>ชื่อสารเคมี </span></th>
                  <th className="headname-th" scope="col" width="3%" style={{ minWidth: 150 }}><span /> </th>
                  <th className="headname-th" scope="col" width="3%" style={{ minWidth: 150 }}><span>ยอดคงเหลือ</span> </th>
                  <th className="headname-th" scope="col" width="5%" style={{ minWidth: 150 }}><span>สถานที่เก็บ</span> </th>
                  <th className="headname-th" scope="col" width="5%" style={{ minWidth: 200 }} />
                  <th>
                    <button type="button" className="btn btn-report " data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: '#5DD480', borderRadius: 4, width: 95, color: '#fff' }}><i aria-hidden="true" className="fas fa-plus" style={{ fontSize: 15 }} /><label className="mx-2">เพิ่ม</label> </button>
                  </th>
                </tr>
              </thead>
              <tbody style={{ height: '12rem', verticalAlign: 'middle' }}>
                {equipmentList.map((val) => {
                  return (
                    <tr className="table-name-report ">
                      <th scope="row">{val.equ_id}</th>
                      <td>{val.equ_name}</td>
                      <td><label className="class-room" /></td>
                      <td>{val.equ_amount}</td>
                      <td>{val.equ_storage}</td>
                      <td>
                        <button type="button" className="btn btn-report " data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-search-plus" style={{ fontSize: 15 }} /><label className="mx-2">ดูรายละเอียด</label> </button>
                      </td>
                      <td><button type="button" className="btn btn-report " data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: '#958F8F', color: '#fff' }}><i aria-hidden="true" className="far fa-edit" style={{ fontSize: 15 }} /><label className="mx-2">แก้ไข</label> </button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <Modal
        show={show}
        onHide={addClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มข้อมูลอุปกรณ์</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
                            <div className="row">
                                <div className="col-xl-4 col-lg-5 col-md-5 col-12 col-sm-12">
                                    <div className="row mb-3">
                                        <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name">ชื่อสารเคมี :
                                        </label>
                                        <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                            <input type="text" className="input-text form-control " id formcontrolname />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name">ชนิด :
                                        </label>
                                        <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                            <input type="text" className="input-text form-control " id formcontrolname />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name">สูตรโมเลกุล
                                        </label>
                                        <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                            <input type="text" className="input-text form-control " id formcontrolname />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name">CAS No :
                                        </label>
                                        <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                            <input type="text" className="input-text form-control " id formcontrolname />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name">รหัสสารเคมี :
                                        </label>
                                        <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                            <input type="text" className="input-text form-control " id formcontrolname />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name">จำนวน :
                                        </label>
                                        <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                            <input type="text" className="input-text form-control " id formcontrolname />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-5 col-lg-5 col-md-5 col-12 col-sm-12">
                                    <div className="row mb-3">
                                        <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name">สถานที่เก็บ :
                                        </label>
                                        <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                            <input type="text" className="input-text form-control " id formcontrolname />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name">ขนาดบรรจุ :
                                        </label>
                                        <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                            <input type="text" className="input-text form-control " id formcontrolname />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name">สถาน :
                                        </label>
                                        <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                            <input type="text" className="input-text form-control " id formcontrolname />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name">วันหมดอายุ :
                                        </label>
                                        <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                            <input type="text" className="input-text form-control " id formcontrolname />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name">ผู้ผลิต :
                                        </label>
                                        <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                            <input type="text" className="input-text form-control " id formcontrolname />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3">
                                    <div className="form-group mb-3">
                                        <div className="image-upload">
                                            {/*     <i class="far fa-image" style=" font-size: 30px;"></i> */}
                                            <input className="form-control" type="file" />
                                        </div>
                                    </div>
                                </div>
                                {/*   <div class="modal-footer"> */}
                                <div className="row mt-4 ">
                                    <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6 " style={{ textAlign: '-webkit-right' ,textAlign:"end" }}>
                                        <button type="submit" className="btn " style={{ backgroundColor: '#1E6E66', color: '#fff', fontFamily: '"Prompt", sans-serif', textAlign: 'center' }}>
                                            <i aria-hidden="true" className="fas fa-check mx-2" style={{ fontSize: 16 }} />ยืนยัน
                                        </button>
                                    </div>
                                    <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6">
                                        <button type="button" className="btn " style={{ backgroundColor: '#D12E2E', color: '#fff', fontFamily: '"Prompt", sans-serif', textAlign: 'center' }}>
                                            <i aria-hidden="true" className="fas fa-times mx-2" style={{ fontSize: 16 }} />
                                            ยกเลิก
                                        </button>
                                    </div>
                                </div>
                            </div>
                  
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
   
                </>
  )
}
