import React from 'react'
import '../css/dashboard.css'
import { useState, useEffect , useMemo} from 'react'
import { Modal, Button, ModalFooter } from 'react-bootstrap'
import Axios from 'axios'
import moment from 'moment'
import Pagination from '../Components/Paginations/Pagination';

let PageSize = 2;

export default function Dashboard() {

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

  const [currentPage, setCurrentPage] = useState(1);

  const currentPickListDisTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return pickListDis.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pickListDis]);

  const currentPickListBorTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return pickListBor.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pickListBor]);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div>
        <div className="col-9 col-lg-9 col-xl-9 col-mb-9 col-xs-9" >
          <div className="row" style={{  width: '77rem', marginLeft: '-6rem' }}>
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
                }).map((val,key)=>{
                  return(
                    <tr className="table-name-report">
                    <th className='order-id'>{val.o_dis_id}</th>
                    <td>{val.std_name}</td>
                    <td className='class-room'><label className="class-room">{val.std_level}</label> </td>
                    <td><label className="class-room">{val.o_dis_descrip}</label> </td>
                    <td className='class-room'>{val.o_dis_item_amount}</td>
                    <td>{moment(detailPLDis[0]?.o_dis_date).format('L')}</td>
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
                currentPage={currentPage}
                totalCount={pickListDis.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)} />
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginTop: '0.5rem', width: '77rem', marginLeft: '-6rem'  }}>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link active report-name" aria-current="page" href="#">ยืมอุปกรณ์</a>
              </li>
            </ul>
            <div className="row">
              <div className="card cardsidebar">
                <div className="card-body">
                  <table className="table">
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
                        <th>
                          <label>
                            <input type="checkbox" value={val.o_bor_returned == 0 ? false : true} onChange={(e) => {
                              pickListBor[key].o_bor_returned = e.target.checked ? 1 : 0;
                              setPickListBor(pickListBor)
                              
                            }} />
                          </label>
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

      <Modal
        show={showDetailPLDis}
        onHide={showDetailPLDisClose}
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
                <td>50 mL</td>
                <td>4 หลอด</td>

              </tr>
              <tr>
                <th scope="row">Glass Rod</th>
                <td>250 mL</td>
                <td>4 แท่ง</td>

              </tr>
              <tr>
                <th scope="row">Dropper</th>
                <td>20 mL</td>
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
