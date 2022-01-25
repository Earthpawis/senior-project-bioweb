import React from 'react';

const StPickingListTool = () => {
    return <div className="container">
        <div className="card" style={{ marginTop: '5rem', borderRadius: 15, boxShadow: '0 30px 50px rgb(0 0 0 / 20%)' }}>
            <div className="card-body">
                <h3>รายการเบิกอุปกรณ์</h3>
                <table className="table bg-white table-bordered">
                    <thead className="bg-secondary text-light">
                        <tr>
                            <th width="10%" style={{ minWidth: 100 }}>ORDER ID</th>
                            <th width="30%" style={{ minWidth: 170 }}>เพื่อ</th>
                            <th width="10%" style={{ minWidth: 100 }}>จำนวน</th>
                            <th width="15%" style={{ minWidth: 100 }} />
                            <th width="22%" style={{ minWidth: 100 }}>รายชื่ออาจารย์ที่อนุมัติ</th>
                            <th>สถานะ</th>
                        </tr>
                    </thead>
                    <tbody style={{ verticalAlign: 'middle' }}>
                        <tr>
                            <td data-title="ID">001</td>
                            <td data-title>แลปจุลลินทรีย์ </td>
                            <td data-title="Number">20 รายการ</td>
                            <td data-title="button"> <button type="button"  className="btn btn-report " style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-search-plus" style={{ fontSize: 15 }} /><label className="mx-2">ดูรายละเอียด</label> </button></td>
                            <td data-title="Email">อาจารย์ ประเจต อำนาจนาน</td>
                            <td data-title="status"><i className="fas fa-check iconcheck-name" /><label className="iconcheck-name mx-2">อนุมัติ</label> </td>
                        </tr>
                        <tr>
                            <td data-title="ID">002</td>
                            <td data-title>แลปจุลลินทรีย์ </td>
                            <td data-title="Number">20 รายการ</td>
                            <td data-title="button"> <button type="button"  className="btn btn-report " style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-search-plus" style={{ fontSize: 15 }} /><label className="mx-2">ดูรายละเอียด</label> </button></td>
                            <td data-title="Email">อาจารย์ ประเจต อำนาจนาน</td>
                            <td data-title="status"><i className="fas fa-check iconcheck-name" /><label className="iconcheck-name mx-2">อนุมัติ</label> </td>
                        </tr>
                        <tr>
                            <td data-title="ID">003</td>
                            <td data-title>แลปจุลลินทรีย์ </td>
                            <td data-title="Number">20 รายการ</td>
                            <td data-title="button"> <button type="button"  className="btn btn-report " style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-search-plus" style={{ fontSize: 15 }} /><label className="mx-2">ดูรายละเอียด</label> </button></td>
                            <td data-title="Email">อาจารย์ ประเจต อำนาจนาน</td>
                            <td data-title="status"><i className="fas fa-times iconcheck-times" /><label className="mx-2 iconcheck-times">ไม่อนุมัติ</label> </td>
                        </tr>
                        <tr>
                            <td data-title="ID">004</td>
                            <td data-title>แลปจุลลินทรีย์ </td>
                            <td data-title="Number">20 รายการ</td>
                            <td data-title="button"> <button type="button"  className="btn btn-report " style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-search-plus" style={{ fontSize: 15 }} /><label className="mx-2">ดูรายละเอียด</label> </button></td>
                            <td data-title="Email">อาจารย์ ประเจต อำนาจนาน</td>
                            <td data-title="status"><i className="fas fa-ellipsis-h iconellipsis-name" /><label className="iconellipsis-name mx-2">รอการอนุมัติ</label> </td>
                        </tr>
                        <tr>
                            <td data-title="ID">005</td>
                            <td data-title>แลปจุลลินทรีย์ </td>
                            <td data-title="Number">20 รายการ</td>
                            <td data-title="button"> <button type="button"  className="btn btn-report " style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-search-plus" style={{ fontSize: 15 }} /><label className="mx-2">ดูรายละเอียด</label> </button></td>
                            <td data-title="Email">อาจารย์ ประเจต อำนาจนาน</td>
                            <td data-title="status"><i className="fas fa-times iconcheck-times" /><label className="mx-2 iconcheck-times">ไม่อนุมัติ</label> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>


        ;};

export default StPickingListTool;
