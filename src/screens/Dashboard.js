import React from 'react'
import '../css/dashboard.css'
import { useState, useEffect, useMemo } from 'react'
import { Modal, Button, ModalFooter } from 'react-bootstrap'
import Axios from 'axios'
import moment from 'moment'
import Pagination from '../Components/Paginations/Pagination';
import Swal from 'sweetalert2'



export default function Dashboard() {
 
  //-------------------------------------------------- ยืมอุปกรณ์ ------------------------------------------------------------//
  const [pickListBor, setPickListBor] = useState([]);
  const pickList_bor = () => {
    Axios.get('http://203.158.109.144/bio-rmutt/pickingListBor_admin').then((Response) => {
      setPickListBor(Response.data);
    });
  }

  //-----------------------------------------------------------------------------------------------------------------------//

  const [detailPLBor, setDetailPLBor] = useState([]);
  const [showDetailPLBor, setShowDetailPLBor] = useState(false);
  const showDetailPLBorClose = () => setShowDetailPLBor(false);
  const showDetailPLBorShow = (id) => {
    Axios.get('http://203.158.109.144/bio-rmutt/detailPLBor_admin/' + id).then((response) => {
      setDetailPLBor(response.data);
      setBor_id(id)
      setShowDetailPLBor(true)
    })

  }
  //-------------------- เบิกสารเคมี ---------------------------------------------------------------------------------------//
  const [showDetailPLDis, setShowDetailPLDis] = useState(false);
  const showDetailPLDisClose = () => setShowDetailPLDis(false);
  const [detailPLDis, setDetailPLDis] = useState([]);
  const showDetailPLDisShow = (id) => {
    Axios.get('http://203.158.109.144/bio-rmutt/detailPLDis_admin/' + id).then((response) => {
      setDetailPLDis(response.data);
      setShowDetailPLDis(true)
    })

  };

  //-----------------------------------------------------------------------------------------------------------------------//
  const [pickListDis, setPickListDis] = useState([]);
  const pickList = () => {
    Axios.get('http://203.158.109.144/bio-rmutt/pickingListDis_admin').then((Response) => {
      setPickListDis(Response.data);
    });
  }

  //-----------------------------------------------------------------------------------------------------------------------//
  const Returned = (e, key, obj) => {
    console.log(obj.o_bor_returned);
    if (obj.o_bor_returned === 0) {
      Swal.fire({
        title: 'ยืนยันการคืนอุปกรณ์ ?',
        text: "Order ID : " + obj.o_bor_id,
        icon: 'warning',
        timer: 10000,
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'ยกเลิก',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          pickListBor[key].o_bor_returned = 1;
          setPickListBor([...pickListBor])
          Axios.put(`http://203.158.109.144/bio-rmutt/PLBor_returned/${obj.o_bor_id}`, obj)
            .then(function (response) {
              Swal.fire(
                "ยืนยันการคืนอุปกรณ์เเล้ว",
                "Order ID : " + obj.o_bor_id,
                'success'
              )

            })
            .catch(function (error) {
              Swal.fire(
                'ไม่สามารถยืนยันข้อมมูลได้!',
                'ไม่สามารถยืนยันข้อมูลได้เนืองจาก :' + error,
                'error'
              )
            })
        } else {
          pickListBor[key].o_bor_returned = 0;
          setPickListBor([...pickListBor])
          console.log(pickListBor[key]);
        }
      })
    } else if (obj.o_bor_returned === 1) {
      Swal.fire({
        title: 'ยกเลิกการคืนอุปกรณ์ ?',
        text: " Order ID : " + obj.o_bor_id,
        icon: 'warning',
        timer: 10000,
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'ยกเลิก',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          pickListBor[key].o_bor_returned = 0;
          setPickListBor([...pickListBor])
          Axios.put(`http://203.158.109.144/bio-rmutt/PLBor_returned/${obj.o_bor_id}`, obj)
            .then(function (response) {

              Swal.fire(
                'ยกเลิกการคืนอุปกรณ์เเล้ว',
                'Order ID :' + obj.o_bor_id,
                'success'
              )

            })
            .catch(function (error) {
              Swal.fire(
                'ไม่สามารถลบข้อมมูลได้!',
                'ไม่สามารถลบข้อมมูลได้เนืองจาก :' + error,
                'error'
              )
            })
        } else {
          pickListBor[key].o_bor_returned = 1;
          setPickListBor([...pickListBor])
          console.log(pickListBor[key]);
        }
      })
    }

  }


  //-----------------------------------------------------------------------------------------------------------------------//
  const [bor_id, setBor_id] = useState();
  const [BorDescription, setBorDescription] = useState();
  const o_bor_description = () => {
    console.log();
    Axios.put(`http://203.158.109.144/bio-rmutt/o_bor_description`, {
      des: BorDescription,
      id: bor_id
    }).then(res => {
      if (res.status === 200) {
        Swal.fire("เพิ่มข้อมูลสำเร็จ", "เพิ่มข้อมูลแล้ว", "success")
        showDetailPLBorClose();
        console.log(res);
      }
    }).catch(e => {
      console.log(e);
    })
  }
  useEffect(() => {
    console.log(BorDescription);
  }, [BorDescription])

  useEffect(() => {
    pickList();
    pickList_bor();
  }, []);

  useEffect(() => {
    console.log(pickListDis);
  }, [setPickListDis]);

  //-----------------------------------------------------------------------------------------------------------------------//
  let PageSizeDis = 3;
  const [currentPageDis, setCurrentPageDis] = useState(1);
  const currentPickListDisTableData = useMemo(() => {
    const firstPageIndex = (currentPageDis - 1) * PageSizeDis;
    const lastPageIndex = firstPageIndex + PageSizeDis;
    return pickListDis.slice(firstPageIndex, lastPageIndex);
  }, [currentPageDis, pickListDis]);

  //-----------------------------------------------------------------------------------------------------------------------//
  const [currentPage, setCurrentPage] = useState(1);
  let PageSize = 3;
  const currentPickListBorTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return pickListBor.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pickListBor]);

  //-----------------------------------------------------------------------------------------------------------------------//
  useState(() => { console.log(pickListBor); }, [pickListBor])
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <>
      <div>
        <div className="col-9 col-lg-9 col-xl-9 col-mb-9 col-xs-9" >
          <div className="row" style={{ width: '77rem', marginLeft: '-6rem' }}>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link active report-name" aria-current="page" href="#">เบิกใช้</a>
              </li>
            </ul>
            <div className="row">
              <div className="card cardsidebar">
                <div className="card-body">
                  <table className="table ">
                    <thead>
                      <tr>
                        <th className="headname-th" width="3%" style={{ minWidth: 95 }}> <span>ORDER ID</span> </th>
                        <th className="headname-th" width="10%" style={{ minWidth: 200 }}><span> ชื่อ-นามสกุล</span></th>
                        <th className="class-room" width="3%" style={{ minWidth: 49 }}><span>ชั้นปี</span> </th>
                        <th className="headname-th" width="10%" style={{ minWidth: 300 }}><span >เพื่อ</span></th>
                        <th className="class-room" width="3%" style={{ minWidth: 70 }}><span>รายการ</span></th>
                        <th className="headname-th" width="10%" style={{ minWidth: 90 }} ><span>เวลาที่เบิก</span></th>
                        <th className="headname-th" width="10%" style={{ minWidth: 160 }} />
                        <th className="headname-th" width="5%" style={{ minWidth: 150 }} ><span>สถานะ</span></th>
                      </tr>
                    </thead>
                    <tbody style={{ height: '12rem', verticalAlign: 'middle' }}>
                      {currentPickListDisTableData
                        .filter((val) => {
                          if (searchTerm == "") {
                            return val
                          } else if (val.o_dis_descrip.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val
                          } else if (val.std_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val
                          }
                        }).map((val, key) => {
                          return (
                            <tr className="table-name-report">
                              <th className='order-id'>{val.o_dis_id}</th>
                              <td>{val.std_name}</td>
                              <td className='class-room'><label className="class-room">{val.std_level}</label> </td>
                              <td><label className="class-room">{val.o_dis_descrip}</label> </td>
                              <td className='class-room'>{val.o_dis_item_amount}</td>
                              <td>{moment(val.o_dis_date).format('L')}</td>
                              <td><button type="button" className="btn btn-report " onClick={() => (showDetailPLDisShow(val.o_dis_id))} style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-search-plus" style={{ fontSize: 15 }} /><label className="mx-2">ดูรายละเอียด</label> </button></td>

                              <td><label className="mx-2" >
                                {val.o_dis_status == 1 ? <><i class="fas fa-ellipsis-h iconellipsis-name mx-2"></i><label className='iconellipsis-name'> รอการอนุมัติ</label> </>
                                  : val.o_dis_status == 2 ? <><i className="fas fa-check iconcheck-name mx-2" /> <label className='iconcheck-name' >อนุมัติ</label></>
                                    : <><i class="fas fa-times iconcheck-times mx-2"></i> <label className='iconcheck-times'>ไม่อนุมัติ</label></>}</label> </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPageDis}
                    totalCount={pickListDis.length}
                    pageSize={PageSizeDis}
                    onPageChange={page => setCurrentPageDis(page)} />
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={{ marginTop: '0.5rem', width: '77rem', marginLeft: '-6rem' }}>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link active report-name" aria-current="page" href="#">ยืมอุปกรณ์</a>
              </li>
            </ul>
            <div className="row">
              <div className="card cardsidebar">
                <div className="card-body">
                  <table className="table ">
                    <thead>
                      <tr>
                        <th className="class-room" scope="col" width="3%" style={{ minWidth: 95 }}> <span>ORDER ID</span> </th>
                        <th className="headname-th" scope="col" width="10%" style={{ minWidth: 200 }}><span> ชื่อ-นามสกุล</span></th>
                        <th className="class-room" scope="col" width="3%" style={{ minWidth: 49 }}><span>ชั้นปี</span> </th>
                        <th className="headname-th" scope="col" width="10%" style={{ minWidth: 300 }}><span>เพื่อ</span> </th>
                        <th className="class-room" scope="col" width="3%" style={{ minWidth: 100 }}><span>รายการ</span></th>
                        <th className="headname-th" scope="col" width="10%" style={{ minWidth: 165 }} />
                        <th className="headname-th" scope="col" width="5%" style={{ minWidth: 150 }} ><span>สถานะ</span></th>
                        <th className="headname-th" scope="col" width="5%" style={{ minWidth: 120 }}>
                          <label className="mx-2">คืนอุปกรณ์</label>
                        </th>
                      </tr>
                    </thead>
                    <tbody style={{ height: '12rem', verticalAlign: 'middle' }}>
                      {currentPickListBorTableData.filter((val) => {
                        if (searchTerm == "") {
                          return val
                        } else if (val.o_bor_descrip.toLowerCase().includes(searchTerm.toLowerCase())) {
                          return val
                        } else if (val.std_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                          return val
                        }
                      }).map((val, key) => {
                        return (
                          <tr className="table-name-report ">
                            <th className='order-id'>{val.o_bor_id}</th>
                            <td>{val.std_name}</td>
                            <td className='class-room'><label className="">{val.std_level}</label> </td>
                            <td className=''>{val.o_bor_descrip}</td>
                            <td className='class-room'>{val.o_bor_item_amount}</td>
                            <td><button type="button" onClick={() => { showDetailPLBorShow(val.o_bor_id) }} className="btn btn-report " style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-search-plus" style={{ fontSize: 15 }} /><label className="mx-2">ดูรายละเอียด</label> </button></td>
                            <td><label className="mx-2" >{val.o_bor_status == 1 ? <><i class="fas fa-ellipsis-h iconellipsis-name mx-2"></i><label className='iconellipsis-name'>รอการอนุมัติ</label>  </>
                              : val.o_bor_status == 2 ? <><i className="fas fa-check iconcheck-name mx-2" /> <label className='iconcheck-name'>อนุมัติ</label></>
                                : <><i class="fas fa-times iconcheck-times mx-2"></i><label className='iconcheck-times'>ไม่อนุมัติ</label> </>}</label> </td>
                            <th style={{ textAlign: 'center' }}>
                              {/* <label> */}
                              <input type="checkbox" checked={val.o_bor_returned == 0 ? false : true} onChange={(e) => {
                                Returned(e, key, val);
                              }} />
                              {/* </label> */}
                            </th>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={pickListBor.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*      //-----------------------------------------------------modalเบิกใช้สารเคมี------------------------------------------------------------------// */}
      <Modal
        show={showDetailPLDis}
        onHide={showDetailPLDisClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>ดูรายละเอียด : {detailPLDis[0]?.o_dis_descrip} <br /> <span style={{ 'font-size': '1rem' }}>ผู้เบิก : {detailPLDis[0]?.std_name}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">รายการ</th>
                <th scope="col">ปริมาณ</th>
                <th scope="col">หน่วย</th>
              </tr>
            </thead>
            <tbody>
              {detailPLDis.map((val, key) => {
                return (
                  <tr>
                    <th scope="row"> {val.ch_name}</th>
                    <td>{val.dis_quantity}</td>
                    <td>{val.dis_unit == 1 ? 'g' : val.dis_unit == 2 ? 'mL' : val.dis_unit == 3 ? 'kg' : val.dis_unit == 4 ? 'mg' : 'L'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className='row'>
            <div className='col-8' style={{ textAlign: 'center' }} >
              <label className="mx-2" >{detailPLDis[0]?.o_dis_status == 1 ? <><i class="fas fa-ellipsis-h iconellipsis-name mx-2"></i> <label className='iconellipsis-name'>รอการอนุมัติ</label> </>
                : detailPLDis[0]?.o_dis_status == 2 ? <><i className="fas fa-check iconcheck-name mx-2" /> <label className='iconcheck-name'>อนุมัติ</label></>
                  : <><i class="fas fa-times iconcheck-times mx-2"></i> <label className='iconcheck-times'>ไม่อนุมัติ</label> </>} : โดย {detailPLDis[0]?.prof_name} </label>
            </div>
            <div className='col-3' style={{ textAlign: 'center' }}>
              <label>  เวลาเบิก : {moment(detailPLDis[0]?.o_dis_date).format('L')}
              </label>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/*      //-----------------------------------------------------modal ยืมอุปกรณ์------------------------------------------------------------------// */}
      <Modal
        show={showDetailPLBor}
        onHide={showDetailPLBorClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>ดูรายละเอียด : {detailPLBor[0]?.o_bor_descrip} <br /> <span style={{ 'font-size': '1rem' }}>ผู้เบิก : {detailPLBor[0]?.std_name}</span>
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
              {detailPLBor.map((val, key) => {
                return (
                  <tr>
                    <th scope="row">{val.tool_name}</th>
                    <td>{val.tool_size}</td>
                    <td>{val.o_tool_amount}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className='row mb-3'>
            <div className='col-6' style={{ textAlign: 'center' }}>
              <label>วันที่เบิก : {moment(detailPLBor[0]?.o_bor_date).format('L')}
              </label>
            </div>
            <div className='col-6' style={{ textAlign: 'center' }}>
              <label>วันที่คืน : {moment(detailPLBor[0]?.o_bor_returned_date).format('L')}
              </label>
            </div>
          </div>
          <div className="row mb-3">
            <div className='col-6 mt-3' style={{ textAlign: 'center' }} >
              <label className="mx-2">{detailPLBor[0]?.o_bor_status == 1 ? <><i class="fas fa-ellipsis-h iconellipsis-name"></i> <label className='iconellipsis-name'> รอการอนุมัติ</label></> : detailPLBor[0]?.o_bor_status == 2 ? <><i className="fas fa-check iconcheck-name mx-2" /><label className='iconcheck-name'>อนุมัติ</label></> : <><i class="fas fa-times iconcheck-times mx-2"></i><label className='iconcheck-times'>ไม่อนุมัติ</label></>} : โดย {detailPLBor[0]?.prof_name} </label>
            </div>
            <div className='col-6' style={{ textAlign: 'center' }} >
              <div className="input-group">
                <span className="input-group-text">หมายเหตุ</span>
                <textarea className="form-control" aria-label="With textarea" defaultValue={detailPLBor[0]?.o_bor_description}
                  onChange={(e) => {
                    setBorDescription(e.target.value)
                  }}
                />
              </div>
              <button type="submit" className="btn btn-add-modal mt-2 " style={{ color: '#fff' }} onClick={() => { o_bor_description() }} >
                <i aria-hidden="true" className="fas fa-check mx-2 " style={{ fontSize: 20 }} />บันทึก
              </button>
            </div>
          </div>
          <div className='row' style={{ justifyContent: 'center' }}>

          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
