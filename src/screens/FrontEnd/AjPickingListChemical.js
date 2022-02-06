import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserData } from '../../functions/cartItem';
import moment from 'moment';

//------------------------------------search-------------------------------------
//const [searchMie, setSearchMie] = useState("");

const StPickingListTool = () => {
const i = getUserData();
const [user_id , setUser_id] = useState(i.prof_id)
    const [pickingList, setPickingList] = useState([]);
  const getPickingListChemical = (id) => {
    axios.get("http://localhost:3307/AJ_pickingListChemical/" + id).then((response) => {
      setPickingList(response.data);
    })
  }
  useEffect(() => {
    getPickingListChemical(user_id);
  }, []);
    return (
        <div className="container">
            <div className="card" style={{ marginTop: '5rem', borderRadius: 15, boxShadow: '0 30px 50px rgb(0 0 0 / 20%)' }}>
                <div className="card-body">
                    <div className='row'>
                        <div className='col-6 col-xl-8 col-md-6 col-lg-6 '>
                            <h3>รายการนักศึกษาเบิกสารเคมี</h3>
                        </div>
                        <div className='col-6 col-xl-4 col-md-6 col-lg-6 ' >
                            <input type='text' className='form-control' placeholder='ค้นหารายชื่อนักศึกษาเบิกสารเคมี'
                               /*  onChange={(event) => {
                                    setSearchMie(event.target.value);
                                }} */
                            />
                        </div>
                    </div>

                    <div className='table-responsive mt-3'>
                        <table className="table table-bordered">
                            <thead className="">
                            <tr>
                <th width="5%" style={{ minWidth: 100 }}> ORDER ID</th>
                <th width="35%" style={{ minWidth: 250 }}>เพื่อ</th>
                <th width="5%" style={{ minWidth: 10 }}>จำนวน</th>
                <th width="10%" style={{ minWidth: 165 }} />
                <th width="20%" style={{ minWidth: 250 }}>รายชื่ออาจารย์ที่อนุมัติ</th>
                <th  width="10%" style={{ minWidth: 170 }}>เวลาที่เบิก</th>
                <th  width="15%" style={{ minWidth: 180 }}>สถานะ</th>
              </tr>
                            </thead>
                            <tbody style={{ verticalAlign: 'middle' }}>
                                
                              {pickingList.map((val,key) => {
                                  return(
                                    <tr>
                                     <td data-title="ID">{val.o_dis_id}</td>
                    <td data-title>{val.o_dis_descrip}</td>
                    <td data-title="Number">{val.o_dis_item_amount}</td>
                    <td data-title="button">
                      {" "}
                      <button type="button" className="btn btn-report"  style={{ backgroundColor: "#63B0C0", color: "#fff" }}>
                        <i aria-hidden="true" className="fas fa-search-plus" style={{ fontSize: 15 }} />
                        <label className="mx-2" >ดูรายละเอียด</label>{" "}
                      </button>
                    </td>
                    <td data-title="Aj">{val.prof_name}</td>
                    <td>{moment(val.o_dis_date).format('L')}</td>
                    <td data-title="status">
                      <label className=" mx-2">
                        {val.o_dis_status == 1 ? <><i class="fas fa-ellipsis-h iconellipsis-name mx-2"></i><label className="iconellipsis-name"> รอการอนุมัติ</label> </> 
                        : val.o_dis_status == 2 ? <><i className="fas fa-check iconcheck-name mx-2" /><label className="iconcheck-name">อนุมัติ</label></> 
                        : <><i class="fas fa-times mx-2 iconcheck-times"></i> <label className=" iconcheck-times">ไม่อนุมัติ</label></>}</label>

                    </td>
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
};

export default StPickingListTool;
