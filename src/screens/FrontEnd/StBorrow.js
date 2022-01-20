import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'

const stDis = () => {
    return (
       <div className="container">
  <div className="card" style={{marginTop: '5rem', borderRadius: 15, boxShadow: '0 30px 50px rgb(0 0 0 / 20%)'}}>
    <div className="card-body">
      <h3>ยืมอุปกรณ์</h3>
      <div className>
        <table className=" table table-bordered ">
          <thead className=" ">
            <tr>
              <th width="10%" style={{minWidth: 100}}>ID</th>
              <th width="30%" style={{minWidth: 170}}>รายการ</th>
              <th width="10%" style={{minWidth: 100}}>จำนวน</th>
              <th width="5%" style={{minWidth: 100}}>ขนาด</th>
              <th width="2%" style={{minWidth: 20}} />
            </tr>
          </thead>
          <tbody style={{verticalAlign: 'middle'}}>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td><input className="form-control form-control-sm" type="text" aria-label=".form-control-sm example" /></td>
              <Form.Select aria-label="Default select example" onChange={(Event) => { }}>
                    <option value="0">หน่วย</option>
                    <option value="1">g.</option>
                    <option value="2">mL.</option>
                  </Form.Select>
              <td style={{textAlign: 'center'}}><i className="far fa-trash-alt" style={{color: '#E91919', textAlign: 'center'}} /></td>
            </tr>
            
              
          </tbody>
        </table>
        <div className="row">
          <div className="col-xl-6 col-sm-12 col-md-6 col-lg-6 col-12 ">
            <div className="dropdown text-end mt-2">
            <Form.Select aria-label="Default select example" onChange={(Event) => { }}>
                    <option value="0">กรุณาเลือกชื่ออาจารย์ที่อนุมัติ</option>
                    <option value="1">Solids</option>
                    <option value="2">Liquids</option>
                  </Form.Select>
            </div>
          </div>
          <div className="col-xl-6 col-sm-12 col-md-6 col-lg-6 col-12 ">
            <div className="input-group">
              <span className="input-group-text">เพื่อ</span>
              <textarea className="form-control" aria-label="With textarea" defaultValue={""} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}

export default stDis
