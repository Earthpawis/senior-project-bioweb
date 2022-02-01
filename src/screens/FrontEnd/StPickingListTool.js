import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import moment from 'moment'
import { Modal, Button, ModalFooter } from 'react-bootstrap'
const StPickingListTool = () => {


    const [detailPL, setDetailPL] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const closeShowDetail = () => setShowDetail(false);
    const showDetailPLTool = (id) => {
      axios.get(`http://localhost:3307/detailPLTool/` + id).then((response) => {
        setDetailPL(response.data);
      })
      setShowDetail(true)
    };

    const [pickingList, setPickingList] = useState([]);
    const getPickingListTool = () => {
        axios.get("http://localhost:3307/pickingListTool").then((response) => {
            setPickingList(response.data);
        })
    }

    useEffect(() => {
        getPickingListTool();
    }, []);

    useEffect(() => {
        console.log(detailPL);
      }, [detailPL]);

    return (<div className="container">
        <div className="card" style={{ marginTop: '5rem', borderRadius: 15, boxShadow: '0 30px 50px rgb(0 0 0 / 20%)' }}>
            <div className="card-body">
                <h3>รายการเบิกอุปกรณ์</h3>
                <div className="table-responsive">
                    <table className="table bg-white table-bordered">
                        <thead className="bg-dark text-light">
                            <tr>
                                <th width="10%" style={{ minWidth: 100 }}>ORDER ID</th>
                                <th width="30%" style={{ minWidth: 170 }}>เพื่อ</th>
                                <th width="10%" style={{ minWidth: 100 }}>จำนวน</th>
                                <th width="15%" style={{ minWidth: 180 }} />
                                <th width="22%" style={{ minWidth: 250 }}>รายชื่ออาจารย์ที่อนุมัติ</th>
                                <th width="10%" style={{ minWidth: 180 }}>วันที่เบิก</th>
                                <th width="15%" style={{ minWidth: 180 }}>สถานะ</th>
                            </tr>
                        </thead>
                        <tbody style={{ verticalAlign: 'middle' }}>
                            {pickingList.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td data-title="ID">{val.o_bor_id}</td>
                                        <td data-title>{val.o_bor_descrip}</td>
                                        <td data-title="Number">{val.o_bor_item_amount}</td>
                                        <td data-title="button"> <button type="button" className="btn btn-report" onClick={() => { showDetailPLTool(val.o_bor_id) }} style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-search-plus" style={{ fontSize: 15 }} /><label className="mx-2">ดูรายละเอียด</label> </button></td>
                                        <td data-title="Email">{val.prof_name}</td>
                                        <td data-title="date">{moment(val.o_bor_date).format('L')}</td>
                                        <td data-title="status"><label className="iconcheck-name mx-2">{val.o_bor_status == 1 ? <><i class="fas fa-ellipsis-h"></i> รอการอนุมัติ </> : val.o_bor_status == 2 ? <><i className="fas fa-check iconcheck-name mx-2" />อนุมัติ</> : <><i class="fas fa-times"></i> ไม่อนุมัติ</>}</label> </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
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
          <Modal.Title>ดูรายละเอียด : {detailPL[0]?.o_bor_descrip} </Modal.Title>
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
            <div className='col-6' style={{ textAlign: 'center' }}>
              <label>วันที่เบิก : {moment(detailPL[0]?.o_bor_date).format('L')}
              </label>
            </div>
            <div className='col-6' style={{ textAlign: 'center' }}>
              <label>วันที่คืน : {moment(detailPL[0]?.o_bor_returned_date).format('L')}
              </label>
            </div>
          </div>
          <div className="row">
          <div className='col-6' style={{ textAlign: 'center' }} >
              <label className="mx-2" style={{ color: '#41B949' }}>{detailPL[0]?.o_bor_status == 1 ? <><i class="fas fa-ellipsis-h"></i> รอการอนุมัติ</> : detailPL[0]?.o_bor_status == 2 ?  <><i className="fas fa-check iconcheck-name mx-2" />อนุมัติ</> : <><i class="fas fa-times"></i> ไม่อนุมัติ</> } : โดย {detailPL[0]?.prof_name} </label>
            </div>
          </div>
        </Modal.Body>

      </Modal>                   

    </div>

    );
};

export default StPickingListTool;
