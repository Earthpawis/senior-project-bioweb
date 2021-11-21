import React from 'react'
import '../css/MIE.css'
import Axios from 'axios'
import { useState, useEffect } from 'react'

export default function MIE() {

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
                    <button type="button" className="btn btn-report " data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: '#5DD480', borderRadius: 4, width: 95, color: '#fff' }}><i aria-hidden="true" className="fas fa-plus" style={{ fontSize: 15 }} /><label className="mx-2">เพิ่ม</label> </button>
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


  )
}
