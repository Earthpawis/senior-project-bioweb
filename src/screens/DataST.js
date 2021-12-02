import React from 'react'
import '../css/Bor.css'
/* import '../css/MIE.css' */
import Axios from 'axios'
import { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'



export default function DataST() {

    // --------- Modal Std ----------
    const [showAddStd, setshowAddStd] = useState(false);
    const addCloseStd = () => setshowAddStd(false);
    const addShowStd = () => setshowAddStd(true);

    //--------- Modal passwordStd ----------

    const [showEditStd, setshowEditStd] = useState(false);
    const editCloseStd = () => setshowEditStd(false);
    const editShowStd = () => setshowEditStd(true);

    const updatePassword = (std_id) => {
        console.log(std_id)
        Axios.put('http://localhost:3307/dataStudentupdate', { std_password: newstd_password, std_id: std_id }).then((response) => {
            setStudentList(
                studentList.map((val) => {
                    return val.std_id == std_id ? {
                        std_id: val.std_id,
                        std_name: val.std_name,
                        std_level: val.std_level,
                        std_tel: val.std_tel,
                        std_password: newstd_password
                    } : val;
                })
            )

        })
    }
    //--------- Modal editStd ----------

    const [showEditDataStd, setshowEditDataStd] = useState(false);
    const [readuser, setreaduser] = useState([{}])
    const editCloseDataStd = () => setshowEditDataStd(false);
    const editShowDataStd = (id) => {
        setshowEditDataStd(true);
        //console.log(id)
        Axios.get(`http://localhost:3307/readStudent/` + id).then((Response) => {
            setreaduser(Response.data);
            console.log(readuser)

        });
    }


    // --------- Modal Aj ----------
    const [showAddDataAj, setshowAddDataAj] = useState(false);
    const AddCloseDataAj = () => setshowAddDataAj(false);
    const addShowAj = () => setshowAddDataAj(true);

    const [showEditDataAj, setshowEditDataAj] = useState(false);
    const editPassAj = () => setshowEditDataAj(false);
    const EditShowAj = () => setshowEditDataAj(true);

    const [showEditAj, setshowEditAj] = useState(false);
    const editCloseDataAj = () => setshowEditAj(false);
    const EditDataShowAj = () => setshowEditAj(true);


    // --------- Modal Addstd ----------

    const [std_id, setstd_id] = useState("");
    const [std_name, setstd_name] = useState("");
    const [std_password, setstd_password] = useState("");
    const [std_level, setstd_level] = useState("");
    const [std_tel, setstd_tel] = useState("");
    const [newstd_password, setnewstd_password] = useState("");

    const addStudent = () => {
        Axios.post('http://localhost:3307/dataStudentcreate', {
            std_id: std_id,
            std_name: std_name,
            std_level: std_level,
            std_password: std_password,
            std_tel: std_tel
        }).then(() => {
            setStudentList([
                ...studentList, {
                    std_id: std_id,
                    std_name: std_name,
                    std_level: std_level,
                    std_password: std_password,
                    std_tel: std_tel
                }
            ])

        })

    }


    // --------- Modal AdddataAj ----------
    const [prof_id, setprof_id] = useState("");
    const [prof_name, setprof_name] = useState("");
    const [prof_password, setprof_password] = useState("");
    const [prof_username, setprof_username] = useState("");
    const [prof_tel, setprof_tel] = useState("");

    const addProfesser = () => {
        Axios.post('http://localhost:3307/dataProfessercreate', {
            prof_id: prof_id,
            prof_name: prof_name,
            prof_password: prof_password,
            prof_username: prof_username,
            prof_tel: prof_tel
        }).then(() => {
            setProfesserList([
                ...professerList, {
                    prof_id: prof_id,
                    prof_name: prof_name,
                    prof_password: prof_password,
                    prof_username: prof_username,
                    prof_tel: prof_tel
                }
            ])

        })

    }

    // --------- Modal  ----------

    const [studentList, setStudentList] = useState([]);
    const getStudent = () => {
        Axios.get('http://localhost:3307/dataStudent').then((Response) => {
            setStudentList(Response.data);
        });
    }

    const [professerList, setProfesserList] = useState([]);
    const getProfesser = () => {
        Axios.get('http://localhost:3307/dataProfesser').then((Response) => {
            setProfesserList(Response.data);
        });
    }



    useEffect(() => {
        getStudent()
        getProfesser()
    }, []);

    return (
        <>
            <div className="col-9 " style={{ marginRight: '5rem', marginTop: '5rem' }}>
                <div className="warpper">
                    <input className="radio" id="one" name="group" type="radio" defaultChecked />
                    <input className="radio" id="two" name="group" type="radio" />
                    <div className="tabs row">
                        <div className="col-6">
                            <label className="tab" id="one-tab" htmlFor="one">นักศึกษา</label>
                            <label className="tab" id="two-tab" htmlFor="two">อาจารย์</label>
                        </div>
                        {/*   <div className='col-6' >
                            <input type='text' className='form-control' placeholder='ค้นหา'
                            />
                        </div> */}
                    </div>
                    <div className="panels">
                        <div className="panel" id="one-panel">
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th className="headname-th" scope="col" width="3%" style={{ minWidth: 200 }}> <span>รหัสนักศึกษา</span> </th>
                                        <th className="headname-th" scope="col" width="5%" style={{ minWidth: 250 }}><span>ชื่อ-นามสกุล</span></th>
                                        <th className="headname-th" scope="col" width="3%" style={{ minWidth: 100 }}><span>ชั้นปี</span> </th>
                                        <th className="headname-th" scope="col" width="3%" style={{ minWidth: 200 }}><span>เบอร์โทร</span> </th>
                                        <th className="headname-th" scope="col" width="5%" style={{ minWidth: 200 }} />
                                        {/*       <th ></th> */}
                                        <th className="headname-th" scope="col" width="5%">
                                            <button type="button" className="btn btn-report " onClick={addShowStd} style={{ backgroundColor: '#5DD480', borderRadius: 4, width: 95, color: '#fff' }}><i aria-hidden="true" className="fas fa-plus" style={{ fontSize: 15 }} /><label className="mx-2">เพิ่ม</label> </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody style={{ height: '12rem', verticalAlign: 'middle' }}>

                                    {studentList.map((val) => {
                                        return (<tr className="table-name-report ">
                                            <th scope="row">{val.std_id}</th>
                                            <td>{val.std_name}</td>
                                            <td><label className="class-room">{val.std_level}</label></td>
                                            <td>{val.std_tel}</td>
                                            <td>
                                                <button type="button" className="btn btn-report " onClick={() => editShowStd(val.std_id)} style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-key" style={{ fontSize: 15 }} /><label className="mx-2">เปลี่ยนรหัสผ่าน</label> </button>
                                            </td>
                                            <td><button type="button" className="btn btn-report " onClick={() => editShowDataStd(val.std_id)} style={{ backgroundColor: '#958F8F', color: '#fff' }}><i aria-hidden="true" className="far fa-edit" style={{ fontSize: 15 }} /><label className="mx-2">แก้ไข</label> </button></td>
                                        </tr>)
                                    })}


                                </tbody>
                            </table>
                        </div>
                        <div className="panel" id="two-panel">
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th className="headname-th" scope="col" width="3%" style={{ minWidth: 150 }}> <span>รหัสอาจารย์</span> </th>
                                        <th className="headname-th" scope="col" width="5%" style={{ minWidth: 350 }}><span>ชื่อ-นามสกุล </span></th>
                                        <th className="headname-th" scope="col" width="3%" style={{ minWidth: 250 }}><span>เบอร์โทร</span> </th>
                                        <th className="headname-th" scope="col" width="3%" style={{ minWidth: 250 }} />
                                        <th style={{ minWidth: 100 }}>
                                            <button type="button" className="btn btn-report " onClick={addShowAj} style={{ backgroundColor: '#5DD480', borderRadius: 4, width: 95, color: '#fff' }}><i aria-hidden="true" className="fas fa-plus" style={{ fontSize: 15 }} /><label className="mx-2">เพิ่ม</label> </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody style={{ height: '12rem', verticalAlign: 'middle' }}>

                                    {professerList.map((val) => {
                                        return (
                                            <tr className="table-name-report ">
                                                <th scope="row">{val.prof_id}</th>
                                                <td>{val.prof_name}</td>
                                                <td>{val.prof_tel}</td>
                                                <td>
                                                    <button type="button" className="btn btn-report " onClick={EditShowAj} style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-key" style={{ fontSize: 15 }} /><label className="mx-2">เปลี่ยนรหัสผ่าน</label> </button>
                                                </td>
                                                <td><button type="button" className="btn btn-report " onClick={EditDataShowAj} style={{ backgroundColor: '#958F8F', color: '#fff' }}><i aria-hidden="true" className="far fa-edit" style={{ fontSize: 15 }} /><label className="mx-2">แก้ไข</label> </button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* ---------- AddStd ------------ */}
            <Modal
                show={showAddStd}
                onHide={addCloseStd}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>เพิ่มข้อมูลนักศึกษา</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">ชื่อ :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                    onChange={(event) => {
                                        setstd_name(event.target.value)
                                    }}
                                />
                            </div>
                        </div>.
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">เบอร์โทรศัพท์ฺ :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                    onChange={(event) => {
                                        setstd_tel(event.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสนักศึกษา :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                    onChange={(event) => {
                                        setstd_id(event.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">ชั้นปี :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                    onChange={(event) => {
                                        setstd_level(event.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสผ่าน :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                    onChange={(event) => {
                                        setstd_password(event.target.value)
                                    }} />
                            </div>
                        </div>
                        <div className="row mt-3 ">
                            <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6 " style={{ textAlign: '-webkit-right', textAlign: "end" }}>
                                <button type="submit" className="btn btn-add-modal " onClick={addStudent} style={{ color: '#fff' }}>
                                    <i aria-hidden="true" className="fas fa-check mx-3" style={{ fontSize: 20 }} />ยืนยัน
                                </button>
                            </div>
                            <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6">
                                <button type="button" className="btn  btn-add-cancal" style={{ color: '#fff' }}>
                                    <i aria-hidden="true" className="fas fa-times mx-3" style={{ fontSize: 20 }} />
                                    ยกเลิก
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {/* ---------- EditpassStd ------------ */}
            <Modal
                show={showEditStd}
                onHide={editCloseStd}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>เปลี่ยนรหัสผ่าน : นักศึกษา</Modal.Title>

                </Modal.Header>
                <Modal.Body>

                    <div className="row">
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">ชื่อ :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                                พรนภา โกลากุล
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">เบอร์โทรศัพท์ฺ :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                                0955268402
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสนักศึกษา :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                                116110905137-4
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">ชั้นปี :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                                4
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสผ่าน :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                                1234
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสผ่านใหม่ :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control "
                                    /* defaultValue={val.std_id} */
                                    onChange={(event) => {
                                        setnewstd_password(event.target.value)

                                    }}
                                />
                            </div>
                        </div>
                        <div className="row mt-3 ">
                            <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6 " style={{ textAlign: '-webkit-right', textAlign: "end" }}>
                                <button type="submit" className="btn btn-add-modal " onClick={() => { updatePassword() }} style={{ color: '#fff' }}>
                                    <i aria-hidden="true" className="fas fa-check mx-3" style={{ fontSize: 20 }} />ยืนยัน
                                </button>
                            </div>
                            <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6">
                                <button type="button" className="btn  btn-add-cancal" style={{ color: '#fff' }}>
                                    <i aria-hidden="true" className="fas fa-times mx-3" style={{ fontSize: 20 }} />
                                    ยกเลิก
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {/* ---------- editStd ------------ */}
            <Modal
                show={showEditDataStd}
                onHide={editCloseDataStd}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>แก้ไขข้อมูลส่วนตัว : นักศึกษา</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {readuser.map((val, key) => {
                        return (
                            <div className="row" key={val.std_id}>
                                <div className="form-group row mb-3">
                                    <label htmlFor=""
                                        className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">ชื่อ : </label>
                                    <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                        <input type="text" className="input-text form-control " defaultValue={val.std_name} id formcontrolname onChange={(event) => {
                                            setreaduser([{
                                                ...readuser[0], std_name: event.target.value
                                            }])
                                        }} />
                                    </div>
                                </div>.
                                <div className="form-group row mb-3">
                                    <label htmlFor=""
                                        className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">เบอร์โทรศัพท์ฺ :</label>
                                    <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                        <input type="text" className="input-text form-control " defaultValue={val.std_tel} onChange={(event) => {
                                            setreaduser([{
                                                ...readuser[0], std_tel: event.target.value
                                            }])
                                        }} />
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <label htmlFor=""
                                        className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสนักศึกษา :</label>
                                    <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                        <input type="text" className="input-text form-control " defaultValue={val.std_id} onChange={(event) => {
                                            setreaduser([{
                                                ...readuser[0], std_id: event.target.value
                                            }])
                                        }} />
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <label htmlFor=""
                                        className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">ชั้นปี :</label>
                                    <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                        <input type="text" className="input-text form-control " defaultValue={val.std_level} onChange={(event) => {
                                            setreaduser([{
                                                ...readuser[0], std_level: event.target.value
                                            }])
                                        }} />
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <label htmlFor=""
                                        className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสผ่าน :</label>
                                    <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                        <input type="text" className="input-text form-control " defaultValue={val.std_password} onChange={(event) => {
                                            setreaduser([{
                                                ...readuser[0], std_password: event.target.value
                                            }])
                                        }} />
                                    </div>
                                </div>
                                <div className="row mt-3 ">
                                    <div className="col-4 col-lg-4 col-xl-4 col-mb-4 col-xs-4 " style={{ textAlign: "end" }}>
                                        <button type="submit" className="btn btn-add-modal " style={{ color: '#fff' }}>
                                            <i aria-hidden="true" className="fas fa-check mx-3" style={{ fontSize: 20 }} />ยืนยัน
                                        </button>
                                    </div>
                                    <div className="col-4 col-lg-4 col-xl-4 col-mb-4 col-xs-4" style={{ textAlign: "center" }}>
                                        <button type="button" className="btn  btn-add-cancal" style={{ color: '#fff' }}>
                                            <i aria-hidden="true" className="fas fa-times mx-3" style={{ fontSize: 20 }} />
                                            ยกเลิก
                                        </button>
                                    </div>
                                    <div className="col-4 col-lg-4 col-xl-4 col-mb-4 col-xs-4" >
                                        <button type="button" className="btn  btn-add-edit" style={{ color: '#fff' }}>
                                            <i aria-hidden="true" className="fas fa-trash mx-3" style={{ fontSize: 20 }} />
                                            ลบข้อมูล
                                        </button>
                                    </div>
                                </div>
                            </div>

                        )
                    })}

                </Modal.Body>
            </Modal>

            {/* ---------- AddAj------------ */}
            <Modal
                show={showAddDataAj}
                onHide={AddCloseDataAj}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>เพิ่มข้อมูลอาจารย์</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">ชื่อ :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                    onChange={(event) => {
                                        setprof_name(event.target.value)
                                    }}
                                />
                            </div>
                        </div>.
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">เบอร์โทรศัพท์ฺ :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                    onChange={(event) => {
                                        setprof_tel(event.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสอาจารย์ :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                    onChange={(event) => {
                                        setprof_id(event.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">Username :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                    onChange={(event) => {
                                        setprof_username(event.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสผ่าน :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname
                                    onChange={(event) => {
                                        setprof_password(event.target.value)
                                    }}
                                />

                            </div>
                        </div>
                        <div className="row mt-3 ">
                            <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6 " style={{ textAlign: "end" }}>
                                <button type="submit" onClick={addProfesser} className="btn btn-add-modal " style={{ color: '#fff' }}>
                                    <i aria-hidden="true" className="fas fa-check mx-3" style={{ fontSize: 20 }} />ยืนยัน
                                </button>
                            </div>
                            <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6">
                                <button type="button" className="btn  btn-add-cancal" style={{ color: '#fff' }}>
                                    <i aria-hidden="true" className="fas fa-times mx-3" style={{ fontSize: 20 }} />
                                    ยกเลิก
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* ---------- editpasswordAj------------ */}
            <Modal
                show={showEditDataAj}
                onHide={editPassAj}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>เปลี่ยนรหัสผ่าน : อาจารย์</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">ชื่อ :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                                ดร.ประเจต อำนาจนาน
                            </div>
                        </div>.
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">เบอร์โทรศัพท์ฺ :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                                0809383891
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสอาจารย์ :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                                1
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">Username :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                                Narath
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสผ่าน :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                                1234
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสผ่านใหม่ :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname />
                            </div>
                        </div>
                        <div className="row mt-3 ">
                            <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6 " style={{ textAlign: '-webkit-right', textAlign: "end" }}>
                                <button type="submit" className="btn btn-add-modal " style={{ color: '#fff' }}>
                                    <i aria-hidden="true" className="fas fa-check mx-3" style={{ fontSize: 20 }} />ยืนยัน
                                </button>
                            </div>
                            <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6">
                                <button type="button" className="btn  btn-add-cancal" style={{ color: '#fff' }}>
                                    <i aria-hidden="true" className="fas fa-times mx-3" style={{ fontSize: 20 }} />
                                    ยกเลิก
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
                    <Modal.Title>แก้ไขข้อมูลส่วนตัว : อาจารย์</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">ชื่อ :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname />
                            </div>
                        </div>.
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">เบอร์โทรศัพท์ฺ :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสอาจารย์ :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสผ่าน :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                                1234
                            </div>
                        </div>
                        <div className="row mt-3 ">
                            <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6 " style={{ textAlign: '-webkit-right', textAlign: "end" }}>
                                <button type="submit" className="btn btn-add-modal " style={{ color: '#fff' }}>
                                    <i aria-hidden="true" className="fas fa-check mx-3" style={{ fontSize: 20 }} />ยืนยัน
                                </button>
                            </div>
                            <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6">
                                <button type="button" className="btn  btn-add-cancal" style={{ color: '#fff' }}>
                                    <i aria-hidden="true" className="fas fa-times mx-3" style={{ fontSize: 20 }} />
                                    ยกเลิก
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>

    )

}
