import React from 'react'
import '../css/dashboard.css'

export default function Dashboard() {
  return (
    <div>
    <div className="col-9 col-lg-9 col-xl-9 col-mb-9 col-xs-9" >
      <div className="row" style={{ marginTop: '3rem', width: '70rem' , marginLeft:'-6rem' }}>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active report-name" aria-current="page" href="#">เบิกใช้</a>
          </li>
        </ul>
        <div className="row">
          <div className="card">
            <div className="card-body">
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
                    <td>ภวิษย์พร ขันธพร</td>
                    <td><label className="class-room">4</label></td>
                    <td>5 รายการ</td>
                    <td><button type="button" className="btn btn-report "><i aria-hidden="true" className="fas fa-search-plus btn-report" style={{ fontSize: 15 }} /><label className="mx-2 btn-report">ดูรายละเอียด</label> </button></td>
                    <td><i className="fas fa-check iconcheck-name" /><label className=" iconcheck-name mx-2">อนุมัติ</label> </td>
                  </tr>
                  <tr className="table-name-report ">
                    <th scope="row">2</th>
                    <td>พรนภา โกลากุล</td>
                    <td><label className="class-room">1</label> </td>
                    <td>6 รายการ</td>
                    <td><button type="button" className="btn btn-report "><i aria-hidden="true" className="fas fa-search-plus btn-report" style={{ fontSize: 15 }} /><label className="mx-2 btn-report">ดูรายละเอียด</label> </button></td>
                    <td><i className="fas fa-check iconcheck-name" /><label className=" iconcheck-name mx-2">อนุมัติ</label> </td>
                  </tr>
                  <tr className="table-name-report ">
                    <th scope="row">3</th>
                    <td>ปัญญา สุขเสมอ</td>
                    <td><label className="class-room">1</label> </td>
                    <td>2 รายการ</td>
                    <td><button type="button" className="btn btn-report "><i aria-hidden="true" className="fas fa-search-plus btn-report" style={{ fontSize: 15 }} /><label className="mx-2 btn-report">ดูรายละเอียด</label> </button></td>
                    <td><i className="fas fa-check iconcheck-name" /><label className=" iconcheck-name mx-2">อนุมัติ</label> </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: '1rem', width: '70rem' ,marginLeft:'-6rem' }}>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active report-name" aria-current="page" href="#">ยืมอุปกรณ์</a>
          </li>
        </ul>
        <div className="row">
          <div className="card ">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th className="headname-th" scope="col" /* width="3%"  */style={{ minWidth: 110 }}> <span>ORDER ID</span> </th>
                    <th className="headname-th" scope="col" /* width="5%" */ style={{ minWidth: 280 }}><span> ชื่อ-นามสกุล</span></th>
                    <th className="headname-th" scope="col" /* width="3%" */ style={{ minWidth: 100 }}><span>ชั้นปี</span> </th>
                    <th className="headname-th" scope="col" /* width="3%" */ style={{ minWidth: 150 }} />
                    <th className="headname-th" scope="col" /* width="5%" */ style={{ minWidth: 200 }} />
                    <th className="headname-th" scope="col" /* width="5%" */ style={{ minWidth: 200 }} />
                  </tr>
                </thead>
                <tbody style={{ height: '12rem', verticalAlign: 'middle' }}>
                  <tr className="table-name-report ">
                    <th scope="row">1</th>
                    <td>ภวิษย์พร ขันธพร</td>
                    <td><label className="class-room">4</label></td>
                    <td>2 รายการ</td>
                    <td><button type="button" className="btn btn-report "><i aria-hidden="true" className="fas fa-search-plus btn-report" style={{ fontSize: 15 }} /><label className="mx-2 btn-report">ดูรายละเอียด</label> </button></td>
                    <td><i className="fas fa-check iconcheck-name" /><label className=" iconcheck-name mx-2">อนุมัติ</label> </td>
                  </tr>
                  <tr className="table-name-report ">
                    <th scope="row">2</th>
                    <td>พรนภา โกลากุล</td>
                    <td><label className="class-room">1</label> </td>
                    <td>8 รายการ</td>
                    <td><button type="button" className="btn btn-report "><i aria-hidden="true" className="fas fa-search-plus btn-report" style={{ fontSize: 15 }} /><label className="mx-2 btn-report">ดูรายละเอียด</label> </button></td>
                    <td><i className="fas fa-check iconcheck-name" /><label className=" iconcheck-name mx-2">อนุมัติ</label> </td>
                  </tr>
                  <tr className="table-name-report ">
                    <th scope="row">3</th>
                    <td>ปัญญา สุขเสมอ</td>
                    <td><label className="class-room">1</label> </td>
                    <td>10 รายการ</td>
                    <td><button type="button" className="btn btn-report "><i aria-hidden="true" className="fas fa-search-plus btn-report" style={{ fontSize: 15 }} /><label className="mx-2 btn-report">ดูรายละเอียด</label> </button></td>
                    <td><i className="fas fa-check iconcheck-name" /><label className=" iconcheck-name mx-2">อนุมัติ</label> </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
