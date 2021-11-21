import React from 'react'
import '../css/Bor.css'

export default function Bor() {
    return (
        <div className="col-9 " style={{marginRight: '5rem', marginTop: '5rem'}}>
  <div className="warpper">
    <input className="radio" id="one" name="group" type="radio" defaultChecked />
    <input className="radio" id="two" name="group" type="radio" />
    <div className="tabs">
      <label className="tab" id="one-tab" htmlFor="one">เบิกใช้</label>
      <label className="tab" id="two-tab" htmlFor="two">ยืมอุปกรณ์</label>
    </div>
    <div className="panels">
      <div className="panel" id="one-panel">
        <table className="table table-responsive">
          <thead>
            <tr>
              <th className="headname-th" scope="col" width="3%" style={{minWidth: 110}}> <span>ORDER ID</span> </th>
              <th className="headname-th" scope="col" width="5%" style={{minWidth: 280}}><span> ชื่อ-นามสกุล</span></th>
              <th className="headname-th" scope="col" width="3%" style={{minWidth: 100}}><span>ชั้นปี</span> </th>
              <th className="headname-th" scope="col" width="3%" style={{minWidth: 150}} />
              <th className="headname-th" scope="col" width="5%" style={{minWidth: 200}} />
              <th className="headname-th" scope="col" width="5%" style={{minWidth: 200}} />
            </tr>
          </thead>
          <tbody style={{height: '12rem', verticalAlign: 'middle'}}>
            <tr className="table-name-report ">
              <th scope="row">1</th>
              <td>นายนารัตน์ พักลม</td>
              <td><label className="class-room">1</label> </td>
              <td>5 รายการ</td>
              <td><button type="button" className="btn btn-report " data-bs-toggle="modal" data-bs-target="#exampleModal" style={{backgroundColor: '#63B0C0', color: '#fff'}}><i aria-hidden="true" className="fas fa-search-plus" style={{fontSize: 15}} /><label className="mx-2">ดูรายละเอียด</label> </button></td>
              <td><i className="fas fa-check" style={{color: '#41B949'}} /><label className="mx-2" style={{color: '#41B949'}}>อนุมัติ</label> </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="panel" id="two-panel">
        <table className="table table-responsive">
          <thead>
            <tr>
              <th className="headname-th" scope="col" width="3%" style={{minWidth: 110}}> <span>ORDER ID</span> </th>
              <th className="headname-th" scope="col" width="5%" style={{minWidth: 280}}><span> ชื่อ-นามสกุล</span></th>
              <th className="headname-th" scope="col" width="3%" style={{minWidth: 100}}><span>ชั้นปี</span> </th>
              <th className="headname-th" scope="col" width="3%" style={{minWidth: 150}} />
              <th className="headname-th" scope="col" width="5%" style={{minWidth: 200}} />
              <th className="headname-th" scope="col" width="5%" style={{minWidth: 200}} />
            </tr>
          </thead>
          <tbody style={{height: '12rem', verticalAlign: 'middle'}}>
            <tr className="table-name-report ">
              <th scope="row">1</th>
              <td>นายนารัตน์ พักลม</td>
              <td><label className="class-room">1</label> </td>
              <td>5 รายการ</td>
              <td><button type="button" className="btn btn-report " data-bs-toggle="modal" data-bs-target="#exampleModal" style={{backgroundColor: '#63B0C0', color: '#fff'}}><i aria-hidden="true" className="fas fa-search-plus" style={{fontSize: 15}} /><label className="mx-2">ดูรายละเอียด</label> </button></td>
              <td><i className="fas fa-check" style={{color: '#41B949'}} /><label className="mx-2" style={{color: '#41B949'}}>อนุมัติ</label> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

    )
}
