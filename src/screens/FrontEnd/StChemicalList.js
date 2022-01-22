import React from 'react';
import { useState, useEffect, useMemo } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { Modal, Button, Form } from 'react-bootstrap'
import Pagination from '../../Components/Paginations/Pagination';



const StChemicalList = () => {
  
  useEffect(() => {
    getChemical();
  }, []);

const [chemicalList, setChemicalList] = useState([]);
const getChemical = () => {
  Axios.get('http://localhost:3307/chemicalList').then((response) => {
    setChemicalList(response.data);
  });
}

//------------------------------------search-------------------------------------
const [searchMie, setSearchMie] = useState("");
 //-----------------------------------PageSize-----------------------------------
 const [currentPage, setCurrentPage] = useState(1);
 let PageSize = 4;

 const currentChemicalListTableData = useMemo(() => {
 const firstPageIndex = (currentPage - 1) * PageSize;
 const lastPageIndex = firstPageIndex + PageSize;
  return chemicalList.slice(firstPageIndex, lastPageIndex);
}, [currentPage, chemicalList]);


  return (
  <div className="container-fluid">
    <div className="card" style={{marginTop: '5rem', borderRadius: 15, boxShadow: '0 30px 50px rgb(0 0 0 / 20%)'}}>
      <div className="card-body">
        <div className="row">
          <h2>สารเคมี</h2>
        </div>
        <div className="row ">

        {currentChemicalListTableData.filter((val) => {
                    if (searchMie == "") {
                      return val
                    } else if (val.ch_name.toLowerCase().includes(searchMie.toLowerCase())) {
                      return val
                    } else if (val.ch_code.toLowerCase().includes(searchMie.toLowerCase())) {
                      return val
                    }
                  }).map((val, key) => {
                    return (
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 p-3">
                      <div className="card cardChemical" style={{width: '20rem'}}>
                        <img src={"http://localhost:3307/imgChemical/" + val.ch_img} className="card-img-top" alt="..." style={{ width: '10rem',  }} />
                        <div className="card-body">
                          <h5 className="card-title">{val.ch_id} | {val.ch_name}</h5>
                          <div className='row'>
                            <div className='col-12'></div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <button type="button" className="btn btn-success"><i className="fas fa-plus p-1" /><span className="NameCrub">เพิ่มลงตะกร้า</span> </button>
                            </div>
                            <div className="col-6">
                              <button type="button" className="btn btn-secondary"><i className="fas fa-search p-1" /><span className="NameCrub">ดูรายละเอียด</span></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                   
                    ) })}
        </div>
      </div>
    </div>
  </div>
  )};

export default StChemicalList;
