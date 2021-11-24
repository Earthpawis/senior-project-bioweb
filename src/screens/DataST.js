import React from 'react'
import '../css/Bor.css'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'


export default function DataST() {

    // --------- Modal Std ----------
    const [showAddStd, setshowAddStd] = useState(false);
    const addCloseStd = () => setshowAddStd(false);
    const addShowStd = () => setshowAddStd(true);

    const [showEditStd, setshowEditStd] = useState(false);
    const editCloseStd = () => setshowEditStd(false);
    const editShowStd = () => setshowEditStd(true);

    const [showEditDataStd, setshowEditDataStd] = useState(false);
    const editCloseDataStd = () => setshowEditDataStd(false);
    const editShowDataStd = () => setshowEditDataStd(true);

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

    // --------- Modal Aj ----------

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
                    <div className="tabs">
                        <label className="tab" id="one-tab" htmlFor="one">นักศึกษา</label>
                        <label className="tab" id="two-tab" htmlFor="two">อาจารย์</label>
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
                                                <button type="button" className="btn btn-report " onClick={editShowStd} style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-key" style={{ fontSize: 15 }} /><label className="mx-2">เปลี่ยนรหัสผ่าน</label> </button>
                                            </td>
                                            <td><button type="button" className="btn btn-report " onClick={editShowDataStd} style={{ backgroundColor: '#958F8F', color: '#fff' }}><i aria-hidden="true" className="far fa-edit" style={{ fontSize: 15 }} /><label className="mx-2">แก้ไข</label> </button></td>
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
                                                    <button type="button" className="btn btn-report "  onClick={EditShowAj}  style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-key" style={{ fontSize: 15 }} /><label className="mx-2">เปลี่ยนรหัสผ่าน</label> </button>
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
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสนักศึกษา :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">ชั้นปี :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสผ่าน :</label>
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
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                พรนภา โกลากุล
                            </div>
                        </div>.
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">เบอร์โทรศัพท์ฺ :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                0955268402
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสนักศึกษา :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                116110905137-4
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">ชั้นปี :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                4
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสผ่าน :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
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
                    <Modal.Title>เพิ่มข้อมูลนักศึกษา</Modal.Title>

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
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสนักศึกษา :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">ชั้นปี :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสผ่าน :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสผ่าน :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                                1234
                                {/*  <input type="text" className="input-text form-control " id formcontrolname /> */}
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
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">Username :</label>
                            <div className="col-xl-8 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                                <input type="text" className="input-text form-control " id formcontrolname />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor=""
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name name-Aj-std">รหัสผ่าน :</label>
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
