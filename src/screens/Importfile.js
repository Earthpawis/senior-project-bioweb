import React from 'react'
import '../css/importfile.css'

export default function Importfile() {
    return (
       <div className="col-9 col-lg-9 col-xl-9 col-mb-9 col-xs-9" style={{width: '80rem' , marginLeft:'-5rem'}}>
  <div className="row mt-5" >
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a className="nav-link active  " aria-current="page" href="#"> <span className="head-name-file" style={{fontFamily: '"Prompt", sans-serif'}}> เพิ่มข้อมูลไฟล์ </span></a>
      </li>
    </ul>
    <div className="row"  style={{width: '90.5%' }} >
      <div className="card" style={{height: '38rem'}}>
        <div className="card-body">
          <div className="row">
            <div className="dotted" style={{marginTop: '3rem', borderStyle: 'solid', height: '25rem', borderRadius: 20, width: '55rem', marginLeft: 'auto', marginRight: 'auto', color: '#707070'}}>
              <div className="row" style={{marginTop: '7rem'}}>
                <i className="fas fa-file-upload icon-import " />
              </div>
              <div className="row">
                <span className="fornt-upload-import ">Upload</span>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6" style={{textAlign: '-webkit-right'}}>
              <button type="button" className="btn btn-upload " style={{backgroundColor: '#1E6E66', color: '#fff', width: '10rem', height: '4rem', borderRadius: 20}}><i aria-hidden="true" className="fas fa-check" style={{fontSize: 25}} /><label className="mx-3 " style={{fontSize: 25, fontFamily: '"Prompt", sans-serif', textAlign: 'center'}}>ยืนยัน</label>
              </button>
            </div>
            <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6">
              <button type="button" className="btn btn-upload " style={{backgroundColor: '#D12E2E', color: '#fff', width: '10rem', height: '4rem', borderRadius: 20}}><i aria-hidden="true" className="fas fa-times" style={{fontSize: 25}} /><label className="mx-3" style={{fontSize: 25, fontFamily: '"Prompt", sans-serif', textAlign: 'center'}}>ยกเลิก</label>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}
