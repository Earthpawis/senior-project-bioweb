import React from 'react'
import '../css/Bor.css'
import Axios from 'axios'
import { useState, useEffect } from 'react'

export default function DataST() {
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
                                        <button type="button" className="btn btn-report " data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: '#5DD480', borderRadius: 4, width: 95, color: '#fff' }}><i aria-hidden="true" className="fas fa-plus" style={{ fontSize: 15 }} /><label className="mx-2">เพิ่ม</label> </button>
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
                                            <button type="button" className="btn btn-report " data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-key" style={{ fontSize: 15 }} /><label className="mx-2">เปลี่ยนรหัสผ่าน</label> </button>
                                        </td>
                                        <td><button type="button" className="btn btn-report " data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: '#958F8F', color: '#fff' }}><i aria-hidden="true" className="far fa-edit" style={{ fontSize: 15 }} /><label className="mx-2">แก้ไข</label> </button></td>
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
                                    <th className="headname-th" scope="col" width="5%" style={{ minWidth: 300 }}><span>ชื่อ-นามสกุล </span></th>
                                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 250 }}><span>เบอร์โทร</span> </th>
                                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 250 }} />
                                    <th style={{ minWidth: 100 }}>
                                        <button type="button" className="btn btn-report " data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: '#5DD480', borderRadius: 4, width: 95, color: '#fff' }}><i aria-hidden="true" className="fas fa-plus" style={{ fontSize: 15 }} /><label className="mx-2">เพิ่ม</label> </button>
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
                                                <button type="button" className="btn btn-report " data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-key" style={{ fontSize: 15 }} /><label className="mx-2">เปลี่ยนรหัสผ่าน</label> </button>
                                            </td>
                                            <td><button type="button" className="btn btn-report " data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: '#958F8F', color: '#fff' }}><i aria-hidden="true" className="far fa-edit" style={{ fontSize: 15 }} /><label className="mx-2">แก้ไข</label> </button></td>
                                        </tr>
                                    )
                                })}



                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}
