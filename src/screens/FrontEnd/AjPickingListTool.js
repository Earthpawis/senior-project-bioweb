import React from "react";
import { useState, useEffect , useMemo} from "react";
import axios from "axios";
import { getUserData } from "../../functions/cartItem";
import moment from "moment";
import { Modal, Button, ModalFooter } from "react-bootstrap";
import Swal from "sweetalert2";
import Pagination from '../../Components/Paginations/Pagination';

const StPickingListTool = () => {
  const i = getUserData();
  const [user_id, setUser_id] = useState(i.prof_id);

  const disSubmit = (id) => {
    axios
      .put(`http://203.158.109.144/bio-rmutt/AJ_disSubmitPLTool/` + id)
      .then(function (response) {
        console.log(response);
        Swal.fire("ยกเลิกอนุมัติรายการสำเร็จ", "", "success");
        closeShowDetail();
        getPickingListTool(user_id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const submit = (id) => {
    axios
      .put(`http://203.158.109.144/bio-rmutt/AJ_submitPLTool/` + id)
      .then(function (response) {
        console.log(response);
        Swal.fire("อนุมัติรายการสำเร็จ", "", "success");
        closeShowDetail();
        getPickingListTool(user_id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [detailPL, setDetailPL] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const closeShowDetail = () => setShowDetail(false);
  const showDetailPLTool = (id) => {
    axios.get(`http://203.158.109.144/bio-rmutt/AJ_detailPLTool/` + id).then((response) => {
      setDetailPL(response.data);
    })
    setShowDetail(true)
  };

  const [pickingList, setPickingList] = useState([]);
  const getPickingListTool = (id) => {
    axios
      .get("http://203.158.109.144/bio-rmutt/AJ_pickingListTool/" + id)
      .then((response) => {
        setPickingList(response.data);
      });
  };
  useEffect(() => {
    getPickingListTool(user_id);
  }, []);

   //------------------------------------search-----------------------------------------------------------------------------//
   const [searchMieAjTool, setSearchMieAjTool] = useState("");

    //-----------------------------------PageSize------------------------------------------------------------------------------//
    const [currentPageAjTool, setCurrentPageAjTool] = useState(1);
    let PageSize = 8;
    const currentAjToolListTableData = useMemo(() => {
      const firstPageIndex = (currentPageAjTool - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return pickingList.slice(firstPageIndex, lastPageIndex);
    }, [currentPageAjTool, pickingList]); 

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
          <div className="row">
            <div className="col-6 col-xl-8 col-md-6 col-lg-6 ">
              <h3>รายการนักศึกษาเบิกอุปกรณ์</h3>
            </div>
            <div className="col-6 col-xl-4 col-md-6 col-lg-6 ">
              <input
                type="text"
                className="form-control"
                placeholder="ค้นหารายชื่อนักศึกษาเบิกอุปกรณ์"
                 onChange={(event) => {
                                 setSearchMieAjTool(event.target.value);
                             }}
              />
            </div>
          </div>

          <div className="table-responsive mt-3">
            <table className="table  table-bordered">
              <thead className="">
                <tr>
                  <th width="10%" style={{ minWidth: 100 }}>
                    ORDER ID
                  </th>
                  <th width="30%" style={{ minWidth: 170 }}>
                    เพื่อ
                  </th>
                  <th width="22%" style={{ minWidth: 250 }}>
                    ผู้เบิก
                  </th>
                  <th width="10%" style={{ minWidth: 100 }}>
                    จำนวน
                  </th>
                  <th width="15%" style={{ minWidth: 180 }} />
                  <th width="10%" style={{ minWidth: 180 }}>
                    วันที่เบิก
                  </th>
                  <th width="15%" style={{ minWidth: 180 }}>
                    สถานะ
                  </th>
                </tr>
              </thead>
              <tbody style={{ verticalAlign: "middle" }}>
                {currentAjToolListTableData.filter((val)=> {
                   if (searchMieAjTool == "") {
                    return val
                  } else if (val.std_name.toLowerCase().includes(searchMieAjTool.toLowerCase())) {
                    return val
                  } else if (val.o_bor_descrip.toLowerCase().includes(searchMieAjTool.toLowerCase())) {
                    return val
                  }
                }).map((val, key) => {
                  return (
                    <tr key={key}>
                      <td data-title="ID">{val.o_bor_id}</td>
                      <td data-title>{val.o_bor_descrip}</td>
                      <td data-title="Email">{val.std_name}</td>
                      <td data-title="Number">{val.o_bor_item_amount}</td>
                      <td data-title="button">
                        {" "}
                        <button
                          type="button"
                          className="btn btn-report"
                          style={{ backgroundColor: "#63B0C0", color: "#fff" }}
                          onClick={() => {
                            showDetailPLTool(val.o_bor_id)
                          }}
                        >
                          <i
                            aria-hidden="true"
                            className="fas fa-search-plus"
                            style={{ fontSize: 15 }}
                          />
                          <label className="mx-2">ดูรายละเอียด</label>{" "}
                        </button>
                      </td>
                      <td data-title="date">
                        {moment(val.o_bor_date).format("L")}
                      </td>
                      <td data-title="status">
                        <label className=" mx-2">
                          {val.o_bor_status == 1 ? (
                            <>
                              <i class="fas fa-ellipsis-h iconellipsis-name mx-2"></i>{" "}
                              <label className="iconellipsis-name">
                                รอการอนุมัติ
                              </label>{" "}
                            </>
                          ) : val.o_bor_status == 2 ? (
                            <>
                              <i className="fas fa-check iconcheck-name mx-2" />{" "}
                              <label className="iconcheck-name">อนุมัติ</label>
                            </>
                          ) : (
                            <>
                              <i class="fas fa-times iconcheck-times mx-2"></i>{" "}
                              <label className="iconcheck-times">
                                ไม่อนุมัติ
                              </label>{" "}
                            </>
                          )}
                        </label>{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              className="pagination-bar"
              currentPageAjChemical={currentPageAjTool}
              totalCount={pickingList.length}
              pageSize={PageSize}
              onPageChange={page => setCurrentPageAjTool(page)}
            />
          </div>
        </div>
      </div>

      <Modal
      show={showDetail}
      onHide={closeShowDetail}
      backdrop="static"
      keyboard={false}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>ดูรายละเอียด : {detailPL[0]?.o_bor_descrip}<br /> <span style={{ 'font-size': '1rem' }}>ผู้เบิก : {detailPL[0]?.std_name} </span>
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
            {detailPL.map((val, key) => {
              return (
                <tr key={key} >
                  <th scope="row">{val.tool_name}</th>
                  <td>{val.tool_size}</td>
                  <td>{val.o_tool_amount}</td>

                </tr>
              )
            })}
          </tbody>
        </table>
        <div className='row'>
          <div className='col-6 ' style={{ textAlign: 'center' }}>
            <label>วันที่เบิก : {moment(detailPL[0]?.o_bor_date).format('L')}
            </label>
          </div>
          <div className='col-6 mb-3' style={{ textAlign: 'center' }}>
            <label>วันที่คืน : {moment(detailPL[0]?.o_bor_returned_date).format('L')}
            </label>
          </div>
        </div>
        <div className="row">
          <div className='col-xl-12' style={{ textAlign: 'center' }} >
            <label className="mx-2" >{detailPL[0]?.o_bor_status == 1 ? <><i class="fas fa-ellipsis-h iconellipsis-name mx-2"></i> <label className="iconellipsis-name">รอการอนุมัติ</label></>
              : detailPL[0]?.o_bor_status == 2 ? <><i className="fas fa-check iconcheck-name mx-2" /><label className="iconcheck-name">อนุมัติ</label></> : <><i class="fas fa-times iconcheck-times mx-2"></i> <label className="iconcheck-times">ไม่อนุมัติ</label></>} : โดย {detailPL[0]?.prof_name} </label>
          </div>
        </div>
        <div className="row mt-3 ">
            <div
              className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6 "
              style={{ textAlign: "-webkit-right", textAlign: "end" }}
            >
              <button
                type="submit"
                className="btn btn-add-modal "
                style={{ color: "#fff" }}
                onClick={() => submit(detailPL[0]?.o_bor_id)}
                disabled={2 == detailPL[0]?.o_bor_status}
              >
                <i
                  aria-hidden="true"
                  className="fas fa-check mx-1"
                  style={{ fontSize: 20 }}
                />{" "}
                อนุมัติ
              </button>
            </div>
            <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6">
              <button
                type="button"
                className="btn  btn-add-cancal"
                style={{ color: "#fff" }}
                onClick={() => disSubmit(detailPL[0]?.o_bor_id)}
                disabled={3 == detailPL[0]?.o_bor_status}
              >
                <i
                  aria-hidden="true"
                  className="fas fa-times mx-1"
                  style={{ fontSize: 20 }}
                />{" "}
                ไม่อนุมัติ
              </button>
            </div>
          </div>
      </Modal.Body>
    </Modal>
    </div>
  );
};

export default StPickingListTool;
