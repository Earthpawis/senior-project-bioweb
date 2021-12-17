import React from 'react'
import '../css/Bor.css'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import { Modal, Button, ModalFooter } from 'react-bootstrap'

export default function Bor() {

  const [showDetail, setshowDetail] = useState(false);
  const detailCloseStd = () => setshowDetail(false);
  const ShowdetailClose = () => setshowDetail(true);

  const [showDetaileMei, setshowDetaileMei] = useState(false);
  const detailCloseEmi = () => setshowDetaileMei(false);
  const detailEmi = () => setshowDetaileMei(true);
  return (
    <>
      <div className="col-9 " style={{ marginRight: '5rem', marginTop: '5rem' }}>
        <div className="warpper">
          <input className="radio" id="one" name="group" type="radio" defaultChecked />
          <input className="radio" id="two" name="group" type="radio" />
          <div className="tabs">
            <label className="tab" id="one-tab" htmlFor="one">เบิกใช้</label>
            <label className="tab" id="two-tab" htmlFor="two">ยืมอุปกรณ์</label>
          </div>
          <div className="panels">
            <div className="panel" id="one-panel">
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 110 }}> <span>ORDER ID</span> </th>
                    <th className="headname-th" scope="col" width="5%" style={{ minWidth: 280 }}><span> ชื่อ-นามสกุล</span></th>
                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 100 }}><span>ชั้นปี</span> </th>
                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 150 }} />
                    <th className="headname-th" scope="col" width="5%" style={{ minWidth: 200 }} />
                    <th className="headname-th" scope="col" width="5%" style={{ minWidth: 200 }} />
                  </tr>
                </thead>
                <tbody style={{ height: '12rem', verticalAlign: 'middle' }}>
                  <tr className="table-name-report ">
                    <th scope="row">1</th>
                    <td>นายนารัตน์ พักลม</td>
                    <td><label className="class-room">1</label> </td>
                    <td>3 รายการ</td>
                    <td><button type="button" className="btn btn-report " onClick={ShowdetailClose} style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-search-plus" style={{ fontSize: 15 }} /><label className="mx-2">ดูรายละเอียด</label> </button></td>
                    <td><i className="fas fa-check" style={{ color: '#41B949' }} /><label className="mx-2" style={{ color: '#41B949' }}>อนุมัติ</label> </td>
                  </tr>
                  <tr className="table-name-report ">
                    <th scope="row">2</th>
                    <td>นายพาสุข แสนสุข</td>
                    <td><label className="class-room">1</label> </td>
                    <td>3 รายการ</td>
                    <td><button type="button" className="btn btn-report " style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-search-plus" style={{ fontSize: 15 }} /><label className="mx-2">ดูรายละเอียด</label> </button></td>
                    <td><i className="fas fa-check" style={{ color: '#41B949' }} /><label className="mx-2" style={{ color: '#41B949' }}>อนุมัติ</label> </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="panel" id="two-panel">
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 110 }}> <span>ORDER ID</span> </th>
                    <th className="headname-th" scope="col" width="5%" style={{ minWidth: 280 }}><span> ชื่อ-นามสกุล</span></th>
                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 100 }}><span>ชั้นปี</span> </th>
                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 150 }} />
                    <th className="headname-th" scope="col" width="5%" style={{ minWidth: 200 }} />
                    <th className="headname-th" scope="col" width="5%" style={{ minWidth: 200 }} />
                  </tr>
                </thead>
                <tbody style={{ height: '12rem', verticalAlign: 'middle' }}>
                  <tr className="table-name-report ">
                    <th scope="row">1</th>
                    <td>นาย ภวิษย์พร ขันธพร</td>
                    <td><label className="class-room">1</label> </td>
                    <td>3 รายการ</td>
                    <td><button type="button" onClick={detailEmi} className="btn btn-report " style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-search-plus" style={{ fontSize: 15 }} /><label className="mx-2">ดูรายละเอียด</label> </button></td>
                    <td><i className="fas fa-check" style={{ color: '#41B949' }} /><label className="mx-2" style={{ color: '#41B949' }}>อนุมัติ</label> </td>
                  </tr>
                  <tr className="table-name-report ">
                    <th scope="row">2</th>
                    <td>นาย ภวิษย์พร ขันธพร</td>
                    <td><label className="class-room">1</label> </td>
                    <td>5 รายการ</td>
                    <td><button type="button" onClick={detailEmi} className="btn btn-report " style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-search-plus" style={{ fontSize: 15 }} /><label className="mx-2">ดูรายละเอียด</label> </button></td>
                    <td><i className="fas fa-check" style={{ color: '#41B949' }} /><label className="mx-2" style={{ color: '#41B949' }}>อนุมัติ</label> </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showDetail}
        onHide={detailCloseStd}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>ดูรายละเอียด : เบิกใช้สารเคมี
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">รายการ</th>
                <th scope="col">จำนวน</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"> Acarbose</th>
                <td>2 mL</td>

              </tr>
              <tr>
                <th scope="row"> Acetaminophe</th>
                <td>1 mL</td>

              </tr>
              <tr>
                <th scope="row"> Acetic</th>
                <td>2 g</td>

              </tr>
            </tbody>
          </table>
          <div className='row'>
            <div className='col-6' style={{ textAlign: 'center' }} >
              <i className="fas fa-check" style={{ color: '#41B949' }} />
              <label className="mx-2" style={{ color: '#41B949' }}>อนุมัติ : โดย ดร.วันรดาย์ แพงสุข </label>
            </div>
            <div className='col-6' style={{ textAlign: 'center' }}>
              <label>เวลาเบิก : 22/11/2021
                16.30 น.
              </label>
            </div>
          </div>
        </Modal.Body>

      </Modal>

      <Modal
        show={showDetaileMei}
        onHide={detailCloseEmi}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>ดูรายละเอียด : ยืมอุปกรณ์
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">รายการ</th>
                <th scope="col">ขนาด</th>
                <th scope="col">จำนวน</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"> Test Tube</th>
                <td>250 mL</td>
                <td>4 หลอด</td>

              </tr>
              <tr>
                <th scope="row">Glass Rod</th>
                <td>250 mL</td>
                <td>4 แท่ง</td>

              </tr>
              <tr>
                <th scope="row">Dropper</th>
                <td>250 mL</td>
                <td>2 หลอด</td>

              </tr>
            </tbody>
          </table>
          <div className='row'>
            <div className='col-4' style={{ textAlign: 'start' }} >
              {/* <i className="fas fa-check" style={{ color: '#41B949' }} /> */}
              <label className="mx-2" style={{ color: '#41B949' }}>อนุมัติ : โดย ดร.วันรดาย์ แพงสุข </label>
            </div>
            <div className='col-4'>
              <label>เวลาเบิก : 22/11/2021
                16.30 น.
              </label>
            </div>
            <div className='col-4' >
              <label>เวลาคืน : 29/11/2021
                16.30 น.
              </label>
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </>
  )
}
