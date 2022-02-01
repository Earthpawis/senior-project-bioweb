import React from 'react'
import '../css/Bor.css'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import { Modal, Button, ModalFooter } from 'react-bootstrap'
import moment from 'moment'

export default function Bor() {

//-------------------- ยืมอุปกรณ์ ------------------------------
const [pickListBor, setPickListBor] = useState([]);
const pickList_bor = () => {
    Axios.get('http://localhost:3307/pickingListBor_admin').then((Response) => {
      setPickListBor(Response.data);
    });
}

  const [detailPLBor,setDetailPLBor] = useState([]);
  const [showDetailPLBor, setShowDetailPLBor] = useState(false);
  const showDetailPLBorClose = () => setShowDetailPLBor(false);
  const showDetailPLBorShow = (id) => {
    Axios.get('http://localhost:3307/detailPLBor_admin/'+ id).then((response) => {
      setDetailPLBor(response.data);
    })
    setShowDetailPLBor(true)
  }


  //-------------------- เบิกสารเคมี ------------------------------
  const [showDetailPLDis, setShowDetailPLDis] = useState(false);
  const showDetailPLDisClose = () => setShowDetailPLDis(false);
  const [detailPLDis,setDetailPLDis] = useState([]);
  const showDetailPLDisShow = (id) => {
    Axios.get('http://localhost:3307/detailPLDis_admin/'+ id).then((response) => {
      setDetailPLDis(response.data);
    })
    setShowDetailPLDis(true)
  };
  const [pickListDis, setPickListDis] = useState([]);
  const pickList = () => {
      Axios.get('http://localhost:3307/pickingListDis_admin').then((Response) => {
        setPickListDis(Response.data);
      });
  }

  useEffect(() => {
    pickList();
    pickList_bor();
  }, []);

  useEffect(() => {
    console.log(detailPLBor);
  }, [detailPLBor]);

  return (
    <>
      <div className="col-9 " style={{ marginRight: '5rem', marginTop: '5rem' }}>
        <div className="warpper">
          <input className="radio" id="one" name="group" type="radio" defaultChecked />
          <input className="radio" id="two" name="group" type="radio" />
          <div className="tabs row">
            <div className='col-6'>
              <label className="tab" id="one-tab" htmlFor="one">เบิกใช้</label>
              <label className="tab" id="two-tab" htmlFor="two">ยืมอุปกรณ์</label>
            </div>
            <div className='col-6'>
              <input type='text' className='form-control' placeholder='ค้นหาชื่อรายชื่อเบิกใช้สารเคมี ยืมอุปกรณ์' style={{ marginLeft: '8.5rem' }}
              />
            </div>
          </div>
          <div className="panels">
            <div className="panel" id="one-panel">
              <table className="table table-responsive">
                <thead>
                  <tr>

                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 110 }}> <span>ORDER ID</span> </th>
                    <th className="headname-th" scope="col" width="5%" style={{ minWidth: 280 }}><span> ชื่อ-นามสกุล</span></th>
                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 100 }}><span>ชั้นปี</span> </th>
                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 150 }}></th>
                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 150 }}><span>รายการ</span></th>
                    <th className="headname-th" scope="col" width="5%" style={{ minWidth: 200 }} />
                    <th className="headname-th" scope="col" width="5%" style={{ minWidth: 200 }} />
                  </tr>
                </thead>
                <tbody style={{ height: '12rem', verticalAlign: 'middle' }}>

                {pickListDis.map((val,key)=>{
                  return(
                    <tr className="table-name-report">
                    <th scope="row">{val.o_dis_id}</th>
                    <td>{val.std_name}</td>
                    <td><label className="class-room">{val.std_level}</label> </td>
                    <td><label className="class-room">{val.o_dis_descrip}</label> </td>
                    <td>{val.o_dis_item_amount}</td>
                    <td><button type="button" className="btn btn-report " onClick={() => (showDetailPLDisShow(val.o_dis_id))} style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-search-plus" style={{ fontSize: 15 }} /><label className="mx-2">ดูรายละเอียด</label> </button></td>
                    <td><label className="mx-2" style={{ color: '#41B949' }}>{val.o_dis_status == 1 ? <><i class="fas fa-ellipsis-h"></i> รอการอนุมัติ </> : val.o_dis_status == 2 ? <><i className="fas fa-check iconcheck-name mx-2" />อนุมัติ</> : <><i class="fas fa-times"></i> ไม่อนุมัติ</>}</label> </td>
                  </tr>
                  )
                })}
              
                </tbody>
              </table>
              <div className='row' >
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end">
                    <li className="page-item disabled">
                      <a class="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li className="page-item">
                      <a class="page-link" href="#">Next</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="panel" id="two-panel">
              <table className="table table-responsive">
                <thead>
                  <tr>
                    
                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 100 }}> <span>ORDER ID</span> </th>
                    <th className="headname-th" scope="col" width="5%" style={{ minWidth: 250 }}><span> ชื่อ-นามสกุล</span></th>
                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 80 }}><span>ชั้นปี</span> </th>
                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 80 }}><span></span> </th>
                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 120 }}><span>รายการ</span></th>
                    <th className="headname-th" scope="col" width="5%" style={{ minWidth: 165 }} />
                    <th className="headname-th" scope="col" width="5%" style={{ minWidth: 160 }} />
                    <th className="headname-th" scope="col" width="5%"  style={{ minWidth: 170 }}>
                        <label className="mx-2">คืนอุปกรณ์</label> 
                    </th>
                  </tr>
                </thead>
                <tbody style={{ height: '12rem', verticalAlign: 'middle' }}>
                {pickListBor.map((val,key)=>{
                  return(
                  <tr className="table-name-report ">
                  <th scope="row">{val.o_bor_id}</th>
                  <td>{val.std_name}</td>
                  <td><label className="class-room">{val.std_level}</label> </td>
                  <td>{val.o_bor_descrip}</td>
                  <td>{val.o_bor_item_amount}</td>
                  <td><button type="button" onClick={() => {showDetailPLBorShow(val.o_bor_id)}} className="btn btn-report " style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-search-plus" style={{ fontSize: 15 }} /><label className="mx-2">ดูรายละเอียด</label> </button></td>
                  <td><label className="mx-2" >{val.o_bor_status == 1 ? <><i class="fas fa-ellipsis-h"></i> รอการอนุมัติ </> : val.o_bor_status == 2 ? <><i className="fas fa-check iconcheck-name mx-2" />อนุมัติ</> : <><i class="fas fa-times"></i> ไม่อนุมัติ</>}</label> </td>
                  <th>
                    <label>
                      <input type="checkbox" /> 
                    </label>
                  </th>
                </tr>
                  )
                })}

                </tbody>
              </table>
              <div className='row' >
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end">
                    <li className="page-item disabled">
                      <a class="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li className="page-item">
                      <a class="page-link" href="#">Next</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showDetailPLDis}
        onHide={showDetailPLDisClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>ดูรายละเอียด : {detailPLDis[0]?.o_dis_descrip}  ผู้เบิก : {detailPLDis[0]?.std_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">รายการ</th>
                <th scope="col">จำนวน</th>
                <th scope="col">หน่วย</th>
              </tr>
            </thead>
            <tbody>
           {detailPLDis.map((val,key)=>{
             return(
              <tr>
                    <th scope="row"> {val.ch_name}</th>
                    <td>{val.dis_quantity}</td>
                    <td>{val.dis_unit == 1 ? 'g' : 'mL'}</td>
            </tr>
             )
           })}
            </tbody>
          </table>
          <div className='row'>
            <div className='col-6' style={{ textAlign: 'center' }} >
              <label className="mx-2" style={{ color: '#41B949' }}>{detailPLDis[0]?.o_dis_status == 1 ? <><i class="fas fa-ellipsis-h"></i> รอการอนุมัติ</> : detailPLDis[0]?.o_dis_status == 2 ?  <><i className="fas fa-check iconcheck-name mx-2" />อนุมัติ</> : <><i class="fas fa-times"></i> ไม่อนุมัติ</> } : โดย {detailPLDis[0]?.prof_name} </label>
            </div>
            <div className='col-6' style={{ textAlign: 'center' }}>
              <label>  เวลาเบิก : {moment(detailPLDis[0]?.o_dis_date).format('L')}
              </label>
            </div>
          </div>
        </Modal.Body>

      </Modal>

      <Modal
        show={showDetailPLBor}
        onHide={showDetailPLBorClose}
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
