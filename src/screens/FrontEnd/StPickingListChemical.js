import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import moment from 'moment'
import { Modal, Button, ModalFooter } from 'react-bootstrap'
import Pagination from '../../Components/Paginations/Pagination';
import { rStDetailPLChemical, rStPickingListChemical } from "../../route/FrontRoute";


const PickingListChemical = () => {

  const i = JSON.parse(localStorage.getItem("user"));
  const [user_id, setUser_id] = useState(i.std_id)

  //--------------------------------------------------------------------------------------------------------------//
  const [detailPL, setDetailPL] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const closeShowDetail = () => setShowDetail(false);
  const showDetailPLChemical = (id) => {
    axios.get(`${rStDetailPLChemical}` + id).then((response) => {
      setDetailPL(response.data);
    }
    )
    setShowDetail(true)
  };

  //--------------------------------------------------------------------------------------------------------------//
  const [pickingList, setPickingList] = useState([]);
  const getPickingListChemical = (id) => {
    axios.get(`${rStPickingListChemical}` + id).then((response) => {
      setPickingList(response.data);
    })
  }
  //--------------------------------------------------------------------------------------------------------------//
  const [currentPage, setCurrentPage] = useState(1); 
  let PageSize = 8;

    const pickingListCheData  = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return pickingList.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, pickingList]);

  //--------------------------------------------------------------------------------------------------------------//
  useEffect(() => {
    getPickingListChemical(user_id);
  }, []);

  useEffect(() => {
    console.log(detailPL);
  }, [detailPL]);


  return (
    <div className="container">
      <div
        className="card"
        style={{
          marginTop: "5rem",
          borderRadius: 15,
          boxShadow: "0 30px 50px rgb(0 0 0 / 20%)",
        }}
      >
        <div className="card-body">
          <h3>รายการเบิกสารเคมี</h3>
          <div className="table-responsive">
            <table className="table bg-white  table-bordered ">
              <thead className="bg-dark text-light">
                <tr>
                  <th width="5%" style={{ minWidth: 100 }}> ORDER ID</th>
                  <th width="35%" style={{ minWidth: 250 }}>เพื่อ</th>
                  <th width="5%" style={{ minWidth: 10 }}>จำนวน</th>
                  <th width="10%" style={{ minWidth: 165 }} />
                  <th width="20%" style={{ minWidth: 250 }}>รายชื่ออาจารย์ที่อนุมัติ</th>
                  <th width="10%" style={{ minWidth: 170 }}>เวลาที่เบิก</th>
                  <th width="15%" style={{ minWidth: 180 }}>สถานะ</th>
                </tr>
              </thead>
              <tbody style={{ verticalAlign: "middle" }}>
                {pickingListCheData.map((val, key) => {
                  return (<tr key={key}>
                    <td data-title="ID">{val.o_dis_id}</td>
                    <td data-title>{val.o_dis_descrip}</td>
                    <td data-title="Number">{val.o_dis_item_amount}</td>
                    <td data-title="button">
                      {" "}
                      <button type="button" className="btn btn-report" onClick={() => { showDetailPLChemical(val.o_dis_id) }} style={{ backgroundColor: "#63B0C0", color: "#fff" }}>
                        <i aria-hidden="true" className="fas fa-search-plus" style={{ fontSize: 15 }} />
                        <label className="mx-2" >ดูรายละเอียด</label>{" "}
                      </button>
                    </td>
                    <td data-title="Aj">{val.prof_name}</td>
                    <td>{moment(val.o_dis_date).format('DD/MM/YYYY')}</td>
                    <td data-title="status">
                      <label className=" mx-2">
                        {val.o_dis_status == 1 ? <><i class="fas fa-ellipsis-h iconellipsis-name mx-2"></i><label className="iconellipsis-name"> รอการอนุมัติ</label> </>
                          : val.o_dis_status == 2 ? <><i className="fas fa-check iconcheck-name mx-2" /><label className="iconcheck-name">อนุมัติ</label></>
                            : <><i class="fas fa-times mx-2 iconcheck-times"></i> <label className=" iconcheck-times">ไม่อนุมัติ</label></>}</label>

                    </td>
                  </tr>)
                })}
              </tbody>
            </table>
             <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={pickingList.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)} />
          </div>
        </div>
      </div>

      {/*  //--------------------------------------------------------------------Modal ดูรายละเอียด------------------------------------------------------------------------------// */}
      <Modal
        show={showDetail}
        onHide={closeShowDetail}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>ดูรายละเอียด : {detailPL[0]?.o_dis_descrip}</Modal.Title>
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
              {detailPL.map((val, key) => {
                return (
                  <tr key={key} >
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
              <label className="mx-2" > {detailPL[0]?.o_dis_status == 1 ? <><i class="fas fa-ellipsis-h iconellipsis-name mx-2"></i><label className="iconellipsis-name"> รอการอนุมัติ</label></>
                : detailPL[0]?.o_dis_status == 2 ? <><i className="fas fa-check iconcheck-name mx-2" /> <label className="iconcheck-name">อนุมัติ</label></>
                  : <><i class="fas fa-times iconcheck-times mx-2"></i> <label className="iconcheck-times"> ไม่อนุมัติ</label></>} : โดย {detailPL[0]?.prof_name} </label>
            </div>
            <div className='col-4' style={{ textAlign: 'center' }}>
              <label>เวลาเบิก : {moment(detailPL[0]?.o_dis_date).format('DD/MM/YYYY')}
              </label>
            </div>
          </div>

        </Modal.Body>

      </Modal>

    </div>


  );
};

export default PickingListChemical;