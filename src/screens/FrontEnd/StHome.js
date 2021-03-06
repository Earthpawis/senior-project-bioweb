import React from 'react';
import { useState, useEffect, useMemo } from 'react'
import BIOLOGY from '../FrontEnd/img/Kawalan Biology Google Classroom Banner.png'
import BIO1 from '../FrontEnd/img/BIO1.png'
import Rmutt1 from '../FrontEnd/img/Rmutt bio.png'
import '../FrontEnd/css/home.css'
/* import { Modal, Button, Carousel, CarouselItem } from 'react-bootstrap' */
import { Modal, Button, Form, Card, CarouselItem, CarouselProps, CarouselItemProps, Carousel } from 'react-bootstrap'
import { getCartItem, setCartItem , getUserData} from '../../functions/cartItem';
import { rChemicalList,rReadChe,rCh_img } from '../../route/FrontRoute';
import Axios from 'axios'
import Pagination from '../../Components/Paginations/Pagination';
import { rToolsList,rReadTool,rImgTools } from '../../route/FrontRoute';
import { getCartItemTool, setCartItemTool } from '../../functions/cartItem';
import moment from 'moment';


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

  const addToCartTool = (val) => {
    setCart([...cart, val])
    let item = getCartItemTool();
    if (item) {
      setCartItemTool([...item, val])
    } else {
      setCartItemTool([val])
    }
  }
  useEffect(() => {
    console.log(cart);

  }, [cart])
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

  const [currentPageTool, setCurrentPageTool] = useState(1);
   let PageSizeTool = 8;
 


 const [toolsList, setToolsList] = useState([]);
  const getToolsList = () => {
    Axios.get(`${rToolsList}`).then((response) => {
      setToolsList(response.data);
    });
  }
  const [readTool, setreadTool] = useState([{}])
  const [showDeatailTools, setShowDeatailTools] = useState(false);
  const DtailToolsClose = () => setShowDeatailTools(false);
  const detailToolsShow = (id) => {
    Axios.get(`${rReadTool}` + id).then((Response) => {
      setreadTool(Response.data);
      console.log(Response.data)
      setShowDeatailTools(true)
    });
  }
  const itemInCartTool = getCartItemTool();

   //------------------------------------search-------------------------------------
   const [searchMieTool, setSearchMieTool] = useState("");
   //-----------------------------------PageSize-----------------------------------
   const currentToolsListTableData = useMemo(() => {
    const firstPageIndex = (currentPageTool - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return toolsList.slice(firstPageIndex, lastPageIndex);
  }, [currentPageTool, toolsList]);

 useEffect(() => {
  getChemical();
  getToolsList();
}, []);
  return (
    <>
      <div className=' mt-4'>
        <div className=' sild-home'>
          <div className='slide-page'>
            <Carousel className='' activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <img
                  className=" d-block w-100"
                  src={Rmutt1}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="w-100"
                  src={BIO1}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={BIOLOGY}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
  </div>

  <div className=''>
  <div className="card" style={{ marginTop: '0.5rem', borderRadius: 15, boxShadow: '0 30px 50px rgb(0 0 0 / 20%)' }}>
          <div className="card-body">
            <div className="row">
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-8'><h2>?????????????????????  {i.std_id &&  <span className='itemCart'><i class="fas fa-shopping-cart"></i>{itemInCart.length} </span>}</h2></div>
             
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <input type='text' className='form-control' placeholder='????????????????????????????????????'
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
                          <button type="button" className="btn btn-success" disabled={cart.find(item=>item.ch_id==val.ch_id ) || !!i.prof_id } onClick={() => { addToCart(val) }} ><i className="fas fa-plus p-1" /><span className="NameCrub">???????????????????????????????????????</span> </button>
                        </div>
                          
                          
                          <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <button type="button" className="btn btn-secondary" onClick={() => { detailShow(val.ch_id) }}><i className="fas fa-search p-1" /><span className="NameCrub">????????????????????????????????????</span></button>
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
        <div className="card" style={{ marginTop: '0.5rem', borderRadius: 15, boxShadow: '0 30px 50px rgb(0 0 0 / 20%)' }}>
          <div className="card-body">
            <div className="row">
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-8'><h2>????????????????????? <span className='itemCart'> {i.std_id &&  <span className='itemCart'><i class="fas fa-shopping-cart"></i>{itemInCartTool.length} </span>}</span></h2></div>
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <input type='text' className='form-control' placeholder='????????????????????????????????????'
                  onChange={(event) => {
                    setSearchMieTool(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row ">

              {currentToolsListTableData.filter((val) => {
                if (searchMieTool == "") {
                  return val
                } else if (val.tool_name.toLowerCase().includes(searchMieTool.toLowerCase())) {
                  return val
                } 
              }).map((val, key) => {
                return (
                  <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 p-3">
                    <div className="card cardChemical" style={{ width: '22rem', borderRadius: 15, boxShadow: '0 30px 50px rgb(0 0 0 / 20%)' }}>
                      <img src={`${rImgTools}` + val.tool_img} className="card-img-top" alt="..." height={200} style={{ width: '10rem', margin: 'auto' }} />
                      <div className="card-body">
                        <h5 className="card-title">{val.tool_id}.  {val.tool_name} {val.tool_size}</h5>
                        <div className="row">
                          <div className="col-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <button type="button" className="btn btn-success" disabled={cart.find(item=>item.tool_id==val.tool_id) || !!i.prof_id } onClick={() => { addToCartTool(val) }}><i className="fas fa-plus p-1" /><span className="NameCrub">???????????????????????????????????????</span> </button>
                          </div>
                          <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <button type="button" className="btn btn-secondary" onClick={() => { detailToolsShow(val.tool_id) }}><i className="fas fa-search p-1" /><span className="NameCrub">????????????????????????????????????</span></button>
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
              currentPage={currentPageTool}
              totalCount={toolsList.length}
              pageSize={PageSize}
              onPageChange={page => setCurrentPageTool(page)}
            />
          </div>
        </div>
  </div>

  <Modal
        show={showDeatailTools}
        onHide={DtailToolsClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>???????????????????????????????????????????????????</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {readTool.map((val, key) => {
            return (
              <div className="row" key={key}>
                <div className="col-xl-4 col-lg-5 col-md-12 col-12 col-sm-12">
                  <div className="row mb-3">
                    <label htmlFor=""
                      className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name">????????????????????????????????? :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.tool_name}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label for="" className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name text-end">???????????? :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.tool_id}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor=""
                      className="col-xl-6 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name">?????????????????????????????? :
                    </label>
                    <div className="col-xl-4 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.tool_amount}
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-12 col-12 col-sm-12">
                  <div className="row mb-3">
                    <label htmlFor=""
                      className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name">????????????????????????????????? :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2" >
                      {val.tool_storage}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor=""
                      className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name">??????????????????????????? :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.tool_size}
                    </div>
                  </div>
                </div>
                <div className="col-xl-3">
                  <div className="form-group ">
                    <div className="image-upload">
                      <img src={`${rImgTools}` + val.tool_img} alt style={{ width: '7rem', }} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </Modal.Body>
      </Modal>
      <Modal
        show={showDetail}
        onHide={detailClose}
        backdrop="static"
        keyboard={false}

        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>???????????????????????????????????????????????????</Modal.Title>

        </Modal.Header>
        <Modal.Body>
          {readChe.map((val, key) => {
            return (
              <div className="row" key={key}>
                <div className="col-xl-4 col-lg-5 col-md-12 col-12 col-sm-12">
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-3  col-3 col-form-label form-name labal-name-mie">????????????????????????????????? :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-9 col-9 mt-2">
                      {val.ch_name}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-3  col-3  col-4 col-form-label form-name labal-name-mie">????????????
                      :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.ch_id}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name labal-name-mie">?????????????????????????????????
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.ch_formula}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name labal-name-mie">CAS No :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.ch_cas_no}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name labal-name-mie">?????????????????????????????????
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.ch_code}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name labal-name-mie">??????????????? :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.ch_amount}
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-12 col-12 col-sm-12">
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">????????????????????????????????? :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.ch_storage}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">??????????????????????????? :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.ch_quantity}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">????????????
                      :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.ch_status == 1 ? 'Solids' : val.ch_status == 2 ? 'Liquids' : 'Gas'}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">?????????????????????????????? :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {moment(val.ch_exp).format('DD/MM/YYYY')}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">????????????????????? :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.ch_manufacturer}
                    </div>
                  </div>
                </div>
                <div className="col-xl-3">
                  <div className="form-group ">
                    <div className="image-upload">
                      <img src={`${rCh_img}` + val.ch_img} alt style={{ width: '7rem', marginTop: '5rem' }} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </Modal.Body>
      </Modal>

    </>
  );

};

export default Home;
