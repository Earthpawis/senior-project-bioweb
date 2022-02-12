import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { getUserData } from "../../functions/cartItem";
import moment from "moment";
import { Modal, Button, ModalFooter } from "react-bootstrap";
import Swal from "sweetalert2";
//------------------------------------search-------------------------------------
//const [searchMie, setSearchMie] = useState("");

const StPickingListTool = () => {
  const dissubmit = (id) => {
    axios
      .put(`http://localhost:3307/AJ_disSubmitPLChemical/` + id)
      .then(function (response) {
        console.log(response);
        Swal.fire("ยกเลิกอนุมัติรายการสำเร็จ", "", "success");
        closeShowDetail();
        getPickingListChemical(user_id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const submit = (id) => {
    axios
      .put(`http://localhost:3307/AJ_submitPLChemical/` + id)
      .then(function (response) {
        console.log(response);
        Swal.fire("อนุมัติรายการสำเร็จ", "", "success");
        closeShowDetail();
        getPickingListChemical(user_id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [detailPL, setDetailPL] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const closeShowDetail = () => setShowDetail(false);
  const showDetailPLChemical = (id) => {
    axios
      .get(`http://localhost:3307/AJ_detailPLChemical/` + id)
      .then((response) => {
        setDetailPL(response.data);
      });
    setShowDetail(true);
  };

  const i = getUserData();
  const [user_id, setUser_id] = useState(i.prof_id);
  const [pickingList, setPickingList] = useState([]);
  const getPickingListChemical = (id) => {
    axios
      .get("http://localhost:3307/AJ_pickingListChemical/" + id)
      .then((response) => {
        setPickingList(response.data);
      });
  };
  useEffect(() => {
    getPickingListChemical(user_id);
  }, []);
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
              <h3>รายการนักศึกษาเบิกสารเคมี</h3>
            </div>
            <div className="col-6 col-xl-4 col-md-6 col-lg-6 ">
              <input
                type="text"
                className="form-control"
                placeholder="ค้นหารายชื่อนักศึกษาเบิกสารเคมี"
                /*  onChange={(event) => {
                                    setSearchMie(event.target.value);
                                }} */
              />
            </div>
          </div>

          <div className="table-responsive mt-3">
            <table className="table table-bordered">
              <thead className="">
                <tr>
                  <th width="5%" style={{ minWidth: 100 }}>
                    {" "}
                    ORDER ID
                  </th>
                  <th width="35%" style={{ minWidth: 250 }}>
                    เพื่อ
                  </th>
                  <th width="20%" style={{ minWidth: 250 }}>
                    ผู้เบิก
                  </th>
                  <th width="5%" style={{ minWidth: 10 }}>
                    จำนวน
                  </th>
                  <th width="10%" style={{ minWidth: 165 }} />
                  <th width="10%" style={{ minWidth: 170 }}>
                    เวลาที่เบิก
                  </th>
                  <th width="15%" style={{ minWidth: 180 }}>
                    สถานะ
                  </th>
                </tr>
              </thead>
              <tbody style={{ verticalAlign: "middle" }}>
                {pickingList.map((val, key) => {
                  return (
                    <tr>
                      <td data-title="ID">{val.o_dis_id}</td>
                      <td data-title>{val.o_dis_descrip}</td>
                      <td data-title="Aj">{val.std_name}</td>
                      <td data-title="Number">{val.o_dis_item_amount}</td>
                      <td data-title="button">
                        <button
                          type="button"
                          className="btn btn-report"
                          style={{ backgroundColor: "#63B0C0", color: "#fff" }}
                          onClick={() => {
                            showDetailPLChemical(val.o_dis_id);
                          }}
                        >
                          <i
                            aria-hidden="true"
                            className="fas fa-search-plus"
                            style={{ fontSize: 15 }}
                          />
                          <label className="mx-2">ดูรายละเอียด</label>
                        </button>
                      </td>

                      <td>{moment(val.o_dis_date).format("L")}</td>
                      <td data-title="status">
                        <label className=" mx-2">
                          {val.o_dis_status == 1 ? (
                            <>
                              <i class="fas fa-ellipsis-h iconellipsis-name mx-2"></i>
                              <label className="iconellipsis-name">
                                {" "}
                                รอการอนุมัติ
                              </label>{" "}
                            </>
                          ) : val.o_dis_status == 2 ? (
                            <>
                              <i className="fas fa-check iconcheck-name mx-2" />
                              <label className="iconcheck-name">อนุมัติ</label>
                            </>
                          ) : (
                            <>
                              <i class="fas fa-times mx-2 iconcheck-times"></i>{" "}
                              <label className=" iconcheck-times">
                                ไม่อนุมัติ
                              </label>
                            </>
                          )}
                        </label>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
          <Modal.Title>ดูรายละเอียด : {detailPL[0]?.o_dis_descrip} <br /> <span style={{ 'font-size': '1rem' }}>ผู้เบิก : {detailPL[0]?.std_name} </span>
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
              {detailPL.map((val, key) => {
                return (
                  <tr key={key}>
                    <th scope="row"> {val.ch_name}</th>
                    <td>{val.dis_quantity}</td>
                    <td>{val.dis_unit == 1 ? "g" : "mL"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="row">
            <div className="col-8" style={{ textAlign: "center" }}>
              <label className="mx-2">
                {" "}
                {detailPL[0]?.o_dis_status == 1 ? (
                  <>
                    <i class="fas fa-ellipsis-h iconellipsis-name mx-2"></i>
                    <label className="iconellipsis-name"> รอการอนุมัติ</label>
                  </>
                ) : detailPL[0]?.o_dis_status == 2 ? (
                  <>
                    <i className="fas fa-check iconcheck-name mx-2" />{" "}
                    <label className="iconcheck-name">อนุมัติ</label>
                  </>
                ) : (
                  <>
                    <i class="fas fa-times iconcheck-times mx-2"></i>{" "}
                    <label className="iconcheck-times"> ไม่อนุมัติ</label>
                  </>
                )}{" "}
                : โดย {detailPL[0]?.prof_name}{" "}
              </label>
            </div>
            <div className="col-4" style={{ textAlign: "center" }}>
              <label>
                เวลาเบิก : {moment(detailPL[0]?.o_dis_date).format("L")}
              </label>
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
                onClick={() => submit(detailPL[0]?.o_dis_id)}
                disabled={2 == detailPL[0]?.o_dis_status}
              >
                <i
                  aria-hidden="true"
                  className="fas fa-check mx-3"
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
                onClick={() => dissubmit(detailPL[0]?.o_dis_id)}
                disabled={3 == detailPL[0]?.o_dis_status}
              >
                <i
                  aria-hidden="true"
                  className="fas fa-times mx-3"
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
