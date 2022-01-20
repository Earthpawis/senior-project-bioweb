import React from 'react'

const StBorrow = () => {
    return (
      
   <div className="container">
  <div className="card" style={{marginTop: '5rem', borderRadius: 15, boxShadow: '0 30px 50px rgb(0 0 0 / 20%)'}}>
    <div className="card-body">
      <h3>เบิกสารเคมี</h3>
      <div className>
        <table className=" table table-bordered ">
          <thead className=" ">
            <tr>
              <th width="10%" style={{minWidth: 100}}>ID</th>
              <th width="30%" style={{minWidth: 170}}>รายการ</th>
              <th width="10%" style={{minWidth: 100}}>จำนวน</th>
              <th width="5%" style={{minWidth: 100}}>หน่วย</th>
              <th width="2%" style={{minWidth: 20}} />
            </tr>
          </thead>
          <tbody style={{verticalAlign: 'middle'}}>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td><input className="form-control form-control-sm" type="text" aria-label=".form-control-sm example" /></td>
              <td>mL.</td>
              <td style={{textAlign: 'center'}}><i className="far fa-trash-alt" style={{color: '#E91919', textAlign: 'center'}} /></td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Mark</td>
              <td><input className="form-control form-control-sm" type="text" aria-label=".form-control-sm example" /></td>
              <td>mL.</td>
              <td style={{textAlign: 'center'}}><i className="far fa-trash-alt" style={{color: '#E91919', textAlign: 'center'}} /></td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Mark</td>
              <td><input className="form-control form-control-sm" type="text" aria-label=".form-control-sm example" /></td>
              <td>g.</td>
              <td style={{textAlign: 'center'}}><i className="far fa-trash-alt" style={{color: '#E91919', textAlign: 'center'}} /></td>
            </tr>
          </tbody>
        </table>
        <div className="row">
          <div className="col-xl-6 col-sm-12 col-md-6 col-lg-6 col-12 ">
            <div className="dropdown text-end mt-2">
              <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" style={{width: '100%'}} data-bs-toggle="dropdown" aria-expanded="false">
                กรุณาเลือกชื่ออาจารย์อนุมัติ
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>
          </div>
          <div className="col-xl-6 col-sm-12 col-md-6 col-lg-6 col-12 ">
            <div className="input-group">
              <span className="input-group-text">เพื่อ</span>
              <textarea className="form-control" aria-label="With textarea" defaultValue={""} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}

export default StBorrow
