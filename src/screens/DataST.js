import React from 'react'
import '../css/Bor.css'
import Swal from 'sweetalert2'
import Axios from 'axios'
import { useState, useEffect, useMemo } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Pagination from '../Components/Paginations/Pagination';
import { rDataProfesserCreate, rReadStudent ,rUpdateEditStudent,rDeleteDataStudent,rReadProfesser,rUpdateEditProfesser ,
    rDeleteDataProfesser ,rDataStudentcreate ,rDataStudent,rDataProfesser} from '../route/BackRoute'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';



export default function DataST() {

    // const schema = yup.object().shape({
    //   std_name: yup.string().required,
    //   std_tel: yup.string().required

    // })
    const {register,handleSubmit,formState: { errors }} = useForm({mode:"all"})

    // --------------------------------------  Modal Std ------------------------------------------------ //
    const [showAddStd, setshowAddStd] = useState(false);
    const addCloseStd = () => setshowAddStd(false);
    const addShowStd = () => setshowAddStd(true);

    //---------------------------- -------------------  Modal editStd -------------------------------------//
    const [showEditDataStd, setshowEditDataStd] = useState(false);
    const [readuser, setreaduser] = useState([{}])
    const editCloseDataStd = () => setshowEditDataStd(false);
    const editShowDataStd = (id) => {
        setshowEditDataStd(true);
        //console.log(id)
        Axios.get(`${rReadStudent}` + id).then((Response) => {
            setreaduser(Response.data);
        });
    }

    const updateEditstd = (id) => {
        console.log(readuser);
        Axios.put(`${rUpdateEditStudent}`, {
            std_id: readuser[0].std_id,
            std_name: readuser[0].std_name,
            std_level: readuser[0].std_level,
            std_password: readuser[0].std_password,
            std_tel: readuser[0].std_tel
        })
            .then(function (response) {
                console.log(response);
                //searchuser(Search, type , typeuser)
                //handleClose();
                Swal.fire("???????????????????????????????????????????????????", "????????????????????????????????????????????????????????????????????????", "success")
                editCloseDataStd();
                getStudent();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //-----------------------------------------------  Modal deleteStd -------------------------------------//

    const deleteStudent = (id) => {
        Swal.fire({
            title: '???????????????????????????????????????????????????????????????????????????????????? ?',
            text: "??????????????????????????????????????????????????????????????? " + id,
            icon: 'warning',
            timer: 10000,
            showCancelButton: true,
            confirmButtonText: '????????????',
            confirmButtonColor: '#3085d6',
            cancelButtonText: '??????????????????',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`${rDeleteDataStudent}` + id)
                    .then(function (response) {
                        console.log(response);
                        Swal.fire(
                            '?????????????????????????????????????????? !',
                            '????????????????????????????????????????????????????????????????????????',
                            'success'
                        )
                        getStudent()

                    })
                    .catch(function (error) {
                        console.log(error);
                        Swal.fire(
                            '???????????????????????????????????????????????????????????????!',
                            '??????????????????????????????????????????????????????????????????????????????????????? :' + error,
                            'error'
                        )
                    })
            }
        })
    }

    //---------------------------- -------------------  Modal AJ-------------------------------------//
    const [showAddDataAj, setshowAddDataAj] = useState(false);
    const AddCloseDataAj = () => setshowAddDataAj(false);
    const addShowAj = () => setshowAddDataAj(true);


    const [showEditAj, setshowEditAj] = useState(false);
    const [readprof, setreadprof] = useState([{}])
    const editCloseDataAj = () => setshowEditAj(false);
    const EditDataShowAj = (id) => {
        setshowEditAj(true);
        console.log(id)
        Axios.get(`${rReadProfesser}` + id).then((Response) => {
            setreadprof(Response.data);
            console.log(readprof)

        });
    }

    const updateEditdataProfesser = (id) => {
        console.log(readprof);
        Axios.put(`${rUpdateEditProfesser}`, {
            prof_id: readprof[0].prof_id,
            prof_name: readprof[0].prof_name,
            prof_password: readprof[0].prof_password,
            prof_tel: readprof[0].prof_tel,
            prof_username: readprof[0].prof_username,
            prof_email: readprof[0].prof_email
        })
            .then(function (response) {
                console.log(response);
                //searchuser(Search, type , typeuser)
                //handleClose();
                Swal.fire("???????????????????????????????????????????????????", "????????????????????????????????????????????????????????????????????????", "success")
                editCloseDataAj();
                getProfesser();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const deleteProfesser = (id) => {
        Swal.fire({
            title: '???????????????????????????????????????????????????????????????????????????????????? ?',
            text: "??????????????????????????????????????????????????????????????? " + id,
            icon: 'warning',
            timer: 10000,
            showCancelButton: true,
            confirmButtonText: '????????????',
            confirmButtonColor: '#3085d6',
            cancelButtonText: '??????????????????',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`${rDeleteDataProfesser}` + id)
                    .then(function (response) {
                        console.log(response);
                        Swal.fire(
                            '?????????????????????????????????????????? !',
                            '????????????????????????????????????????????????????????????????????????',
                            'success'
                        )
                        getProfesser()
                    })
                    .catch(function (error) {
                        console.log(error);
                        Swal.fire(
                            '???????????????????????????????????????????????????????????????!',
                            '??????????????????????????????????????????????????????????????????????????????????????? :' + error,
                            'error'
                        )
                    })
            }
        })
    }

    //------------------------------------------------------------------ Modal AddStd -------------------------------------//

    const [std_id, setstd_id] = useState("");
    const [std_name, setstd_name] = useState("");
    const [std_password, setstd_password] = useState("");
    const [std_level, setstd_level] = useState("");
    const [std_tel, setstd_tel] = useState("");


    const addStudent = () => {
        
        Axios.post(`${rDataStudentcreate}`, {
            std_id: std_id,
            std_name: std_name,
            std_level: std_level,
            std_password: std_password,
            std_tel: std_tel
        }).then(res => {
            if (res.status === 200) {
                Swal.fire("???????????????????????????????????????????????????", "?????????????????????????????????????????????", "success")
                addCloseStd()
                getStudent()
            }
        }).catch(e => {
            console.log(e);
        })

    }

    // ---------------------------------------------- -------------------Modal AdddataAj------------------------------------//
    const [prof_id, setprof_id] = useState("");
    const [prof_name, setprof_name] = useState("");
    const [prof_password, setprof_password] = useState("");
    const [prof_username, setprof_username] = useState("");
    const [prof_tel, setprof_tel] = useState("");
    const [prof_email,setProf_email] = useState("")

    const addProfesser = () => {
        console.log("5555");
        Axios.post(`${rDataProfesserCreate}`, {
            prof_id: prof_id,
            prof_name: prof_name,
            prof_password: prof_password,
            prof_username: prof_username,
            prof_tel: prof_tel,
            prof_email : prof_email
        }).then(res => {
            if (res.status === 200) {
                Swal.fire("???????????????????????????????????????????????????", "?????????????????????????????????????????????", "success")
                AddCloseDataAj()
                getProfesser()
            }
        }).catch(e => {
            console.log(e);
        })
    }


    //---------------------------- -------------------  Modal  -------------------------------------//

    const [studentList, setStudentList] = useState([]);
    const getStudent = () => {
        Axios.get(`${rDataStudent}`).then((Response) => {
            setStudentList(Response.data);
        });
    }

    const [professerList, setProfesserList] = useState([]);

    const getProfesser = () => {
        Axios.get(`${rDataProfesser}`).then((Response) => {
            setProfesserList(Response.data);
        });
    }

    //---------------------------- ------------------- serach -------------------------------------//
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getStudent()
        console.log(studentList);
        getProfesser()
    }, []);

    //---------------------------- -------------------page-------------------------------------//
    let PageSizeAj = 8;
    const [currentPageAj, setCurrentPageAJ] = useState(1);

    
    const [currentPage, setCurrentPage] = useState(1);

    const currentProfesserListTableData = useMemo(() => {
        const firstPageIndex = (currentPageAj - 1) * PageSizeAj;
        const lastPageIndex = firstPageIndex + PageSizeAj;
        return professerList.slice(firstPageIndex, lastPageIndex);
    }, [currentPageAj, professerList]);

    let PageSize = 8;
    const currentStudentListTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return studentList.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, studentList]);

    return (
        <>
            <div className="col-9 " style={{ marginRight: '5rem', marginTop: '5rem' }}>
                <div className="warpper">
                    <input className="radio" id="one" name="group" type="radio" defaultChecked />
                    <input className="radio" id="two" name="group" type="radio" />
                    <div className="tabs row">
                        <div className="col-6" style={{ justifyContent: 'flex-start' }}>
                            <label className="tab" id="one-tab" htmlFor="one">????????????????????????</label>
                            <label className="tab" id="two-tab" htmlFor="two">?????????????????????</label>
                        </div>
                        <div className='col-6' style={{ alignContent: 'flex-end' }}  >
                            <input type='text' className='form-control' placeholder='?????????????????????????????????????????????????????? ????????????????????????' style={{ marginLeft: '6.8rem' }}
                                onChange={(event) => {
                                    setSearchTerm(event.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="panels">
                        <div className="panel" id="one-panel">
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th className="headname-th" scope="col" width="3%" style={{ minWidth: 200 }}> <span>????????????????????????????????????</span> </th>
                                        <th className="headname-th" scope="col" width="5%" style={{ minWidth: 250 }}><span>????????????-?????????????????????</span></th>
                                        <th className="headname-th" scope="col" width="3%" style={{ minWidth: 100 }}><span>??????????????????</span> </th>
                                        <th className="headname-th" scope="col" width="3%" style={{ minWidth: 200 }}><span>????????????????????????</span> </th>
                                        <th className="headname-th" scope="col" width="5%" style={{ minWidth: 150 }} />
                                        <th className="headname-th" scope="col" width="5%">
                                            <button type="button" className="btn btn-report " onClick={addShowStd} style={{ backgroundColor: '#5DD480', borderRadius: 4, width: 95, color: '#fff' }}>
                                                <i aria-hidden="true" className="fas fa-plus" style={{ fontSize: 15 }} /><label className="mx-2">???????????????</label> </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody style={{ height: '12rem', verticalAlign: 'middle' }}>

                                    {currentStudentListTableData
                                        .filter((val) => {
                                            if (searchTerm == "") {
                                                return val
                                            } else if (val.std_id.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                return val
                                            } else if (val.std_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                return val
                                            }
                                        }).map((val, key) => {
                                            return (<tr className="table-name-report " key={key}>
                                                <th scope="row">{val.std_id}</th>
                                                <td>{val.std_name}</td>
                                                <td><label className="class-room">{val.std_level}</label></td>
                                                <td>{val.std_tel}</td>
                                                <td>
                                                    <button type="button" className="btn btn-report " onClick={() => editShowDataStd(val.std_id)}
                                                        style={{ backgroundColor: '#958F8F', color: '#fff' }}><i aria-hidden="true" className="far fa-edit"
                                                            style={{ fontSize: 15 }} /><label className="mx-2">???????????????</label> </button>

                                                </td>
                                                <td>
                                                    <button type="button" className="btn btn-report " onClick={() => {
                                                        deleteStudent(val.std_id);
                                                    }}
                                                        style={{ backgroundColor: '#D12E2E', color: '#fff', width: '90px' }}>
                                                        <i aria-hidden="true" className="fas fa-trash" style={{ fontSize: 15 }} /><label className="mx-2">??????</label> </button>
                                                </td>
                                            </tr>)
                                        })}
                                </tbody>
                            </table>
                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={studentList.length}
                                pageSize={PageSize}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                        <div className="panel" id="two-panel">
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th className="headname-th" scope="col" width="3%" style={{ minWidth: 150 }}> <span>?????????????????????????????????</span> </th>
                                        <th className="headname-th" scope="col" width="5%" style={{ minWidth: 350 }}><span>????????????-????????????????????? </span></th>
                                        <th className="headname-th" scope="col" width="3%" style={{ minWidth: 200 }}><span>????????????????????????</span> </th>
                                        <th className="headname-th" scope="col" width="3%" style={{ minWidth: 200 }} />
                                        <th style={{ minWidth: 100 }}>
                                            <button type="button" className="btn btn-report " onClick={addShowAj} style={{ backgroundColor: '#5DD480', borderRadius: 4, width: 95, color: '#fff' }}><i aria-hidden="true" className="fas fa-plus" style={{ fontSize: 15 }} /><label className="mx-2">???????????????</label> </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody style={{ height: '12rem', verticalAlign: 'middle' }}>

                                    {currentProfesserListTableData
                                        .filter((val) => {
                                            if (searchTerm == "") {
                                                return val
                                            } else if (val.prof_id.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                return val
                                            } else if (val.prof_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                return val
                                            }
                                        })
                                        .map((val, key) => {
                                            return (
                                                <tr className="table-name-report " key={key}>
                                                    <th scope="row">{val.prof_id}</th>
                                                    <td>{val.prof_name}</td>
                                                    <td>{val.prof_tel}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-report "
                                                            onClick={() => EditDataShowAj(val.prof_id)}
                                                            style={{ backgroundColor: '#958F8F', width: '93px', color: '#fff' }}>
                                                            <i aria-hidden="true" className="far fa-edit" style={{ fontSize: 15 }} /><label className="mx-2">???????????????</label>
                                                        </button>
                                                    </td>

                                                    <td>
                                                        <button type="button" className="btn btn-report "
                                                            onClick={() => { deleteProfesser(val.prof_id); }}
                                                            style={{ backgroundColor: '#D12E2E', width: '93px', color: '#fff' }}>
                                                            <i aria-hidden="true" className="fas fa-trash" style={{ fontSize: 15 }} /><label className="mx-2">??????</label> </button></td>
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPageAj}
                                totalCount={professerList.length}
                                pageSize={PageSizeAj}
                                onPageChange={page => setCurrentPageAJ(page)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* ---------------------------------------------------------------------- AddStd ------------------------------------------------------------------------------------------------ */}
            <Modal
                show={showAddStd}
                onHide={addCloseStd}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>?????????????????????????????????????????????????????????</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="form-group row mb-3">
                            
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">???????????? :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                name='std_name'
                                {...register("std_name",{required:true,maxLength: 100})}
                                    onChange={(event) => {
                                        setstd_name(event.target.value)
                                    }}
                                />
                                {errors.std_name?.type === 'required' && <p style={{color:"red",marginTop:"2px"}}>*?????????????????????????????????????????????</p> }
                                {errors.std_name?.type === 'pattern' && <p style={{color:"red",marginTop:"2px"}}>*???????????????????????????????????????????????????????????????????????????</p> }
                                {errors.std_name?.type === 'maxLength' && <p style={{color:"red",marginTop:"2px"}}>*???????????????????????????????????????????????????????????????????????????</p> }
                                
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">?????????????????????????????????????????? :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                name='std_tel'
                                {...register("std_tel",{required:true})}
                                    onChange={(event) => {
                                        setstd_tel(event.target.value)
                                    }}
                                />
                                {errors.std_tel?.type === 'required' && <p style={{color:"red",marginTop:"2px"}}>*?????????????????????????????????????????????</p> }
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">???????????????????????????????????? :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                name='std_id'
                                {...register("std_id",{required:true})}
                                    onChange={(event) => {
                                        setstd_id(event.target.value)
                                    }}
                                />
                                {errors.std_id?.type === 'required' && <p style={{color:"red",marginTop:"2px"}}>*?????????????????????????????????????????????</p> }
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">?????????????????? :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                    name='std_level'
                                    {...register("std_level",{required:true})}
                                    onChange={(event) => {
                                        setstd_level(event.target.value)
                                    }}
                                />
                                {errors.std_level?.type === 'required' && <p style={{color:"red",marginTop:"2px"}}>*?????????????????????????????????????????????</p> }
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">???????????????????????? :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                    name='std_password'
                                    {...register("std_password",{required:true})}
                                    onChange={(event) => {
                                        setstd_password(event.target.value)
                                    }} />
                                    {errors.std_password?.type === 'required' && <p style={{color:"red",marginTop:"2px"}}>*?????????????????????????????????????????????</p> }
                            </div>
                        </div>
                        <div className="row mt-3 ">
                            <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6 " style={{ textAlign: '-webkit-right', textAlign: "end" }}>
                                <button type="submit" className="btn btn-add-modal " onClick={handleSubmit(addStudent)} style={{ color: '#fff' }}>
                                    <i aria-hidden="true" className="fas fa-check mx-3" style={{ fontSize: 20 }} />??????????????????
                                </button>
                            </div>
                            <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6">
                                <button type="button" className="btn  btn-add-cancal" onClick={addCloseStd} style={{ color: '#fff' }}>
                                    <i aria-hidden="true" className="fas fa-times mx-3" style={{ fontSize: 20 }} />
                                    ??????????????????
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* ---------------------------------------------------------------------- editStd ------------------------------------------------------------------------------------------------ */}
            <Modal
                show={showEditDataStd}
                onHide={editCloseDataStd}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>?????????????????????????????????????????????????????? : ????????????????????????</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {readuser.map((val, key) => {
                        return (
                            <div className="row" key={val.std_id}>
                                <div className="form-group row mb-3">
                                    <label htmlFor=""
                                        className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">???????????? : </label>
                                    <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                        <input type="text" className="input-text form-control " defaultValue={val.std_name}
                                            name='std_name'
                                            onChange={(event) => {
                                                setreaduser([{
                                                    ...readuser[0], std_name: event.target.value
                                                }])
                                            }} />
                                            
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <label htmlFor=""
                                        className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">?????????????????????????????????????????? :</label>
                                    <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                        <input type="text" className="input-text form-control " defaultValue={val.std_tel}
                                            onChange={(event) => {
                                                setreaduser([{
                                                    ...readuser[0], std_tel: event.target.value
                                                }])
                                            }} />
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <label htmlFor=""
                                        className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">???????????????????????????????????? :</label>
                                    <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                        <input type="text" className="input-text form-control " disabled defaultValue={val.std_id}
                                            onChange={(event) => {
                                                setreaduser([{
                                                    ...readuser[0], std_id: event.target.value
                                                }])
                                            }} />
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <label htmlFor=""
                                        className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">?????????????????? :</label>
                                    <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                        <input type="text" className="input-text form-control " defaultValue={val.std_level}
                                            onChange={(event) => {
                                                setreaduser([{
                                                    ...readuser[0], std_level: event.target.value
                                                }])
                                            }} />
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <label htmlFor=""
                                        className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">???????????????????????? :</label>
                                    <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                        <input type="text" className="input-text form-control " defaultValue={val.std_password} onChange={(event) => {
                                            setreaduser([{
                                                ...readuser[0], std_password: event.target.value
                                            }])
                                        }} />
                                    </div>
                                </div>
                                <div className="row mt-3 ">
                                    <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6 " style={{ textAlign: "end" }}>
                                        <button type="submit" className="btn btn-add-modal " onClick={() => updateEditstd(val.std_id)} style={{ color: '#fff' }}>
                                            <i aria-hidden="true" className="fas fa-check mx-3" style={{ fontSize: 20 }} />??????????????????
                                        </button>
                                    </div>
                                    <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6" style={{ textAlign: "start" }}>
                                        <button type="button" className="btn  btn-add-cancal" style={{ color: '#fff' }} onClick={editCloseDataStd} >
                                            <i aria-hidden="true" className="fas fa-times mx-3" style={{ fontSize: 20 }} />
                                            ??????????????????
                                        </button>
                                    </div>
                                </div>
                            </div>

                        )
                    })}
                </Modal.Body>
            </Modal>

            {/* ---------------------------------------------------------------------------------- AddAj------------------------------------------------------------------------ */}
            <Modal
                show={showAddDataAj}
                onHide={AddCloseDataAj}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>??????????????????????????????????????????????????????</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">???????????? :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                name='prof_name'
                                {...register("prof_name",{required:true,maxLength: 100})}
                                    onChange={(event) => {
                                        setprof_name(event.target.value)
                                    }}
                                />
                                {errors.prof_name?.type === 'required' && <p style={{color:"red",marginTop:"2px"}}>*?????????????????????????????????????????????</p> }
                            </div>
                        </div>.
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">?????????????????????????????????????????? :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                name='prof_tel'
                                {...register("prof_tel",{required:true,maxLength: 100})}
                                    onChange={(event) => {
                                        setprof_tel(event.target.value)
                                    }}
                                />
                                {errors.prof_tel?.type === 'required' && <p style={{color:"red",marginTop:"2px"}}>*?????????????????????????????????????????????</p> }
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">????????????????????????????????? :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                name='prof_id'
                                {...register("prof_id",{required:true,maxLength: 100})}
                                    onChange={(event) => {
                                        setprof_id(event.target.value)
                                    }}
                                />
                                {errors.prof_id?.type === 'required' && <p style={{color:"red",marginTop:"2px"}}>*?????????????????????????????????????????????</p> }
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">Username :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                name='prof_username'
                                {...register("prof_username",{required:true,maxLength: 100})}
                                    onChange={(event) => {
                                        setprof_username(event.target.value)
                                    }}
                                />
                                {errors.prof_username?.type === 'required' && <p style={{color:"red",marginTop:"2px"}}>*?????????????????????????????????????????????</p> }
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">???????????????????????? :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                name='prof_password'
                                {...register("prof_password",{required:true,maxLength: 100})}
                                    onChange={(event) => {
                                        setprof_password(event.target.value)
                                    }}
                                />
                                {errors.prof_password?.type === 'required' && <p style={{color:"red",marginTop:"2px"}}>*?????????????????????????????????????????????</p> }
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">E-mail :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                name='prof_email'
                                
                                    onChange={(event) => {
                                        setProf_email(event.target.value)
                                    }}
                                />
                               
                            </div>
                        </div>
                        <div className="row mt-3 ">
                            <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6 " style={{ textAlign: "end" }}>
                                <button type="submit" onClick={addProfesser} className="btn btn-add-modal " style={{ color: '#fff' }}>
                                    <i aria-hidden="true" className="fas fa-check mx-3" style={{ fontSize: 20 }} />??????????????????
                                </button>
                            </div>
                            <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6">
                                <button type="button" className="btn  btn-add-cancal" style={{ color: '#fff' }} onClick={AddCloseDataAj}>
                                    <i aria-hidden="true" className="fas fa-times mx-3" style={{ fontSize: 20 }} />
                                    ??????????????????
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>



            {/* ---------- editAj------------ */}
            <Modal
                show={showEditAj}
                onHide={editCloseDataAj}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>?????????????????????????????????????????????????????? : ?????????????????????</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {readprof.map((val, key) => {
                        return (
                            <div className="row" key={val.prof_id}>
                                <div className="form-group row mb-3">
                                    <label htmlFor=""
                                        className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">???????????? :</label>
                                    <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                        <input type="text" className="input-text form-control " defaultValue={val.prof_name} onChange={(event) => {
                                            setreadprof([{
                                                ...readprof[0], prof_name: event.target.value
                                            }])
                                        }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <label htmlFor=""
                                        className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">?????????????????????????????????????????? : </label>
                                    <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                        <input type="text" className="input-text form-control " defaultValue={val.prof_tel} onChange={(event) => {
                                            setreadprof([{
                                                ...readprof[0], prof_tel: event.target.value
                                            }])
                                        }} />
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <label htmlFor=""
                                        className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">????????????????????????????????? :</label>
                                    <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                        <input type="text" className="input-text form-control " disabled id formcontrolname
                                            defaultValue={val.prof_id} onChange={(event) => {
                                                setreadprof([{
                                                    ...readprof[0], prof_id: event.target.value
                                                }])
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <label htmlFor=""
                                        className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">Username :</label>
                                    <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                                        <input type="text" className="input-text form-control " id formcontrolname
                                            defaultValue={val.prof_username} onChange={(event) => {
                                                setreadprof([{
                                                    ...readprof[0], prof_username: event.target.value
                                                }])
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <label htmlFor=""
                                        className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">???????????????????????? :</label>
                                    <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                                        <input type="text" className="input-text form-control " id formcontrolname
                                            defaultValue={val.prof_password} onChange={(event) => {
                                                setreadprof([{
                                                    ...readprof[0], prof_password: event.target.value
                                                }])
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <label htmlFor=""
                                        className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">E-mail :</label>
                                    <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                                        <input type="text" className="input-text form-control " id formcontrolname
                                            defaultValue={val.prof_email} onChange={(event) => {
                                                setreadprof([{
                                                    ...readprof[0], prof_email: event.target.value
                                                }])
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3 ">
                                    <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6 " style={{ textAlign: "end" }}>
                                        <button type="submit" className="btn btn-add-modal " onClick={() => updateEditdataProfesser(val.prof_id)} style={{ color: '#fff' }}>
                                            <i aria-hidden="true" className="fas fa-check mx-3" style={{ fontSize: 20 }} />??????????????????
                                        </button>
                                    </div>
                                    <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6">
                                        <button type="button" className="btn  btn-add-cancal" style={{ color: '#fff' }} onClick={editCloseDataAj}>
                                            <i aria-hidden="true" className="fas fa-times mx-3" style={{ fontSize: 20 }} />
                                            ??????????????????
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </Modal.Body>
            </Modal>
        </>

    )

}
