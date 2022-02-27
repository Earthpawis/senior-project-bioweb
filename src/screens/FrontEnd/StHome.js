import React from 'react';
import { useState, useEffect, useMemo } from 'react'
import ajj from '../FrontEnd/img/ลักษณะของสามเหลี่ยม และสี่เหลี่ยม.jpg'
import ajjj from '../FrontEnd/img/www.webdesigner.co.th.png'
import ajjjj from '../FrontEnd/img/ajjj.jpg'
import chemical from '../FrontEnd/img/pngegg.png'
import tool from '../FrontEnd/img/mie.png'
import cq5dam from '../FrontEnd/img/cq5dam.web.1280.1280.png'
import '../FrontEnd/css/home.css'
/* import { Modal, Button, Carousel, CarouselItem } from 'react-bootstrap' */
import { Modal, Button, Form, Card, CarouselItem, CarouselProps, CarouselItemProps, Carousel } from 'react-bootstrap'
import { getCartItem, setCartItem , getUserData} from '../../functions/cartItem';
import { rChemicalList,rReadChe,rCh_img } from '../../route/FrontRoute';
import Axios from 'axios'
import Pagination from '../../Components/Paginations/Pagination';

const Home = () => {
  const i = getUserData();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  //----------------
  const [chemicalList, setChemicalList] = useState([]);
  const getChemical = () => {
    Axios.get(`${rChemicalList}`).then((response) => {
      setChemicalList(response.data);
    });
  }
  const [readChe, setreadChe] = useState([{}])
  const [showDetail, setShowDetail] = useState(false);
  const detailClose = () => setShowDetail(false);
  const detailShow = (id) => {
    Axios.get(`${rReadChe}` + id).then((Response) => {
      setreadChe(Response.data);
      console.log(Response.data)
      setShowDetail(true)
    }
    );
  }
  const itemInCart = getCartItem();
  const [cart, setCart] = useState([]);
  const addToCart = (val) => {
    val.unit = '1';
    setCart([...cart, val])
    let item = getCartItem();
    if (item) {
      setCartItem([...item, val])
    } else {
      setCartItem([val])
    }
  }
 //------------------------------------search-------------------------------------
 const [searchMie, setSearchMie] = useState("");

 //-----------------------------------PageSize-----------------------------------
 const [currentPage, setCurrentPage] = useState(1);
 let PageSize = 3;

 const currentChemicalListTableData = useMemo(() => {
   const firstPageIndex = (currentPage - 1) * PageSize;
   const lastPageIndex = firstPageIndex + PageSize;
   return chemicalList.slice(firstPageIndex, lastPageIndex);
 }, [currentPage, chemicalList]);

 useEffect(() => {
  getChemical();
}, []);
  return (
    <>
      <div className=' mt-3'>
        <div className=' sild-home'>
          <div className='slide-page'>
            <Carousel className='' activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <img
                  className=" d-block w-100"
                  src={ajjj}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="w-100"
                  src={ajjj}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={ajjj}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>


        <div className="card" style={{ marginTop: '5rem', borderRadius: 15, boxShadow: '0 30px 50px rgb(0 0 0 / 20%)' }}>
          <div className="card-body">
            <div className="row">
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-8'><h2>สารเคมี  {i.std_id &&  <span className='itemCart'><i class="fas fa-shopping-cart"></i>{itemInCart.length} </span>}</h2></div>
             
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <input type='text' className='form-control' placeholder='ค้นหาสารเคมี'
                  onChange={(event) => {
                    setSearchMie(event.target.value);
                  }}
                />
              </div>
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
                    <div className="card cardChemical " style={{ width: '22rem', borderRadius: 15, boxShadow: '0 30px 50px rgb(0 0 0 / 20%)' }}>
                      <img src={`${rCh_img}` + val.ch_img} className="card-img-top card-img-bottom" alt="..." height={200} style={{ width: '15rem', margin: 'auto' }} />
                      <div className="card-body">
                        <h5 className="card-title mb-2">{val.ch_id}. {val.ch_name}</h5>
                        <div className="row">
                          
                          <div className="col-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <button type="button" className="btn btn-success" disabled={cart.find(item=>item.ch_id==val.ch_id ) || !!i.prof_id } onClick={() => { addToCart(val) }} ><i className="fas fa-plus p-1" /><span className="NameCrub">เพิ่มลงตะกร้า</span> </button>
                        </div>
                          
                          
                          <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <button type="button" className="btn btn-secondary" onClick={() => { detailShow(val.ch_id) }}><i className="fas fa-search p-1" /><span className="NameCrub">ดูรายละเอียด</span></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                )
              })}
            </div>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={chemicalList.length}
              pageSize={PageSize}
              onPageChange={page => setCurrentPage(page)}
            />
          </div>
        </div>

      </div>
      

{/*       <div className='container'>
        <div className='row  mb-3'>
          <div className='col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12 d-flex justify-content-end'  >
            <div className='card' style={{ marginTop: '1rem', borderRadius: 15, boxShadow: '0 30px 50px rgb(0 0 0 / 20%)' , width:'10rem' , height:'12rem'}} >
              <img
                className="card-img-top"
                src={chemical}
              />
              <h5 className='p-1'>เบิกสารเคมี</h5>
  
            </div>
          </div>
          <div className='col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12'>
          <div className='card' style={{ marginTop: '1rem', borderRadius: 15, boxShadow: '0 30px 50px rgb(0 0 0 / 20%)' , width:'10rem' , height:'12rem'}} >
              <img
                className="card-img-top"
                src={tool}
              />
              <h5 className='p-1'>ยืมอุปกรณ์</h5>
 
            </div>
          </div>
        </div>
      </div> */}
      {/*       <div className='container'>
        <div className='row  mb-3'>
          <div className='col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12 d-flex justify-content-end'  >
            <div className='card cradhome'>
              <div className="card-body">

                <img
                  className="d-block w-100"
                  src={chemical}
                />
                <h5>เบิกสารเคมี</h5>
              </div>
            </div>
          </div>
          <div className='col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12'>
            <div className='card cradhome'>
              <div className="card-body">
                <img
                  className="d-block w-100"
                  src={tool}
                />
                <h5 >ยืมอุปกรณ์</h5>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className='container-fulid'>

        {/*         <div className='row'>
          <div className='col-12 col-xl-3 col-lg-3 col-md-3 col-sm-12 mb-3'>
            <div className='card '>
              <div className="card-body">
                <img
                  className="d-block w-100"
                  src={cq5dam}
                />

              </div>
            </div>
          </div>
          <div className='col-12 col-xl-3 col-lg-3 col-md-3 col-sm-12 mb-3'>
            <div className='card '>
              <div className="card-body">
                <img
                  className="d-block w-100"
                  src={cq5dam}
                />

              </div>
            </div>
          </div>
          <div className='col-12 col-xl-3 col-lg-3 col-md-3 col-sm-12 mb-3'>
            <div className='card '>
              <div className="card-body">
                <img
                  className="d-block w-100"
                  src={cq5dam}
                />

              </div>
            </div>
          </div>
          <div className='col-12 col-xl-3 col-lg-3 col-md-3 col-sm-12 mb-3'>
            <div className='card '>
              <div className="card-body">
                <img
                  className="d-block w-100"
                  src={cq5dam}
                />

              </div>
            </div>
          </div>
        </div> */}
      </div>

      <div className='container'>
        {/*   <div className='row'>
          <div className='col-12 col-xl-3 col-lg-3 col-md-3 col-sm-12 mb-3'>
            <div className='card '>
              <div className="card-body">
                <img
                  className="d-block w-100"
                  src={cq5dam}
                />

              </div>
            </div>
          </div>
          <div className='col-12 col-xl-3 col-lg-3 col-md-3 col-sm-12 mb-3'>
            <div className='card '>
              <div className="card-body">
                <img
                  className="d-block w-100"
                  src={cq5dam}
                />

              </div>
            </div>
          </div>
          <div className='col-12 col-xl-3 col-lg-3 col-md-3 col-sm-12 mb-3'>
            <div className='card '>
              <div className="card-body">
                <img
                  className="d-block w-100"
                  src={cq5dam}
                />

              </div>
            </div>
          </div>
          <div className='col-12 col-xl-3 col-lg-3 col-md-3 col-sm-12 mb-3'>
            <div className='card '>
              <div className="card-body">
                <img
                  className="d-block w-100"
                  src={cq5dam}
                />

              </div>
            </div>
          </div>
        </div> */}
      </div>

    </>
  );

};

export default Home;
