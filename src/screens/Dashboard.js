import React from 'react'
import '../css/dashboard.css'

export default function Dashboard() {
    return (
        <div className="col-9 col-lg-9 col-xl-9 col-mb-9 col-xs-9" style={{width: '79.5%'}}>
  <div className="row" style={{marginTop: '3rem', width: '75rem'}}>
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
              <tr className="table-name-report ">
                <th scope="row">2</th>
                <td>นายนารัตน์ พักลม</td>
                <td><label className="class-room">1</label> </td>
                <td>5 รายการ</td>
                <td><button type="button" className="btn btn-report " style={{backgroundColor: '#63B0C0', color: '#fff'}}><i aria-hidden="true" className="fas fa-search-plus" style={{fontSize: 15}} /><label className="mx-2">ดูรายละเอียด</label> </button></td>
                <td><i className="fas fa-check" style={{color: '#41B949'}} /><label className="mx-2" style={{color: '#41B949'}}>อนุมัติ</label> </td>
              </tr>
              <tr className="table-name-report ">
                <th scope="row">3</th>
                <td>นายนารัตน์ พักลม</td>
                <td><label className="class-room">1</label> </td>
                <td>5 รายการ</td>
                <td><button type="button" className="btn btn-report " style={{backgroundColor: '#63B0C0', color: '#fff'}}><i aria-hidden="true" className="fas fa-search-plus" style={{fontSize: 15}} /><label className="mx-2">ดูรายละเอียด</label> </button></td>
                <td><i className="fas fa-check" style={{color: '#41B949'}} /><label className="mx-2" style={{color: '#41B949'}}>อนุมัติ</label> </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div className="row" style={{marginTop: '1rem', width: '75rem'}}>
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
              <tr className="table-name-report ">
                <th scope="row">2</th>
                <td>นายนารัตน์ พักลม</td>
                <td><label className="class-room">1</label> </td>
                <td>5 รายการ</td>
                <td><button type="button" className="btn btn-report " style={{backgroundColor: '#63B0C0', color: '#fff'}}><i aria-hidden="true" className="fas fa-search-plus" style={{fontSize: 15}} /><label className="mx-2">ดูรายละเอียด</label> </button></td>
                <td><i className="fas fa-check" style={{color: '#41B949'}} /><label className="mx-2" style={{color: '#41B949'}}>อนุมัติ</label> </td>
              </tr>
              <tr className="table-name-report ">
                <th scope="row">3</th>
                <td>นายนารัตน์ พักลม</td>
                <td><label className="class-room">1</label> </td>
                <td>5 รายการ</td>
                <td><button type="button" className="btn btn-report " style={{backgroundColor: '#63B0C0', color: '#fff'}}><i aria-hidden="true" className="fas fa-search-plus" style={{fontSize: 15}} /><label className="mx-2">ดูรายละเอียด</label> </button></td>
                <td><i className="fas fa-check" style={{color: '#41B949'}} /><label className="mx-2" style={{color: '#41B949'}}>อนุมัติ</label> </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className=" modal-dialog modal-dialog-centered ">
            <div className="modal-content">
              <div className="modal-header modal-title-name">
                <h5 className="modal-title " id="exampleModalLabel">ดูรายละเอียด : เบิกใช้สารเคมี</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="crad">
                    <div className="card-body">
                      <div className="dotted">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th scope="col">รายการ</th>
                              <th scope="col">จำนวน</th>
                            </tr>
                          </thead>
                          <tbody style={{verticalAlign: 'middle'}}>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}
