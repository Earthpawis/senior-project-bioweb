import React from 'react'
import '../css/MIE.css'
import Axios from 'axios'
import { useState, useEffect, useMemo } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import Pagination from '../Components/Paginations/Pagination';
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars"
import moment from 'moment'
import {
  rChemicalList, rReadChe, rAddChemical, rUpdateChe, rDelChe, rReadTool,
  rUpdateTool, rDelTool, rToolsList, rAddTool, rImgChemical, rImgTools
} from '../route/BackRoute'
import ReactExport from 'react-data-export'
import { useForm } from 'react-hook-form'



export default function MIE() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

  const [chemicalList, setChemicalList] = useState([]);
  const getChemical = () => {
    Axios.get(`${rChemicalList}`).then((response) => {
      setChemicalList(response.data);
    });
  }
  const [equipmentList, setEquipmentList] = useState([]);
  const getEquipment = () => {
    Axios.get(`${rToolsList}`).then((response) => {
      setEquipmentList(response.data);
    });
  }

  const DataChSet = [
    {
      columns: [
        { title: "", width: { wch: 10 }, style: { font: { sz: "12", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },
        { title: "รหัสสารเคมี", width: { wch: 20 }, style: { font: { sz: "12", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },
        { title: "ชื่อสารเคมี", width: { wch: 20 }, style: { font: { sz: "12", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },
        { title: "สูตรโมเลกุล", width: { wch: 20 }, style: { font: { sz: "12", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },
        { title: "CAS No.", width: { wch: 20 }, style: { font: { sz: "12", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },
        { title: "จำนวน", width: { wch: 20 }, style: { font: { sz: "12", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },
        { title: "ขนาดความจุ", width: { wch: 20 }, style: { font: { sz: "12", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },
        { title: "สถานที่เก็บ", width: { wch: 20 }, style: { font: { sz: "12", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },
        { title: "สถานะ", width: { wch: 20 }, style: { font: { sz: "12", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },
        { title: "วันหมดอายุ", width: { wch: 20 }, style: { font: { sz: "12", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },
        { title: "ผู้ผลิต", width: { wch: 20 }, style: { font: { sz: "12", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },
      ],
      data:
        chemicalList.map((val, key) => [
          { value: val.ch_id, style: { font: { sz: "12" } } },
          { value: val.ch_code, style: { font: { sz: "12" } } },
          { value: val.ch_name, style: { font: { sz: "12" } } },
          { value: val.ch_formula, style: { font: { sz: "12" } } },
          { value: val.ch_cas_no, style: { font: { sz: "12" } } },
          { value: val.ch_amount, style: { font: { sz: "12" } } },
          { value: val.ch_quantity, style: { font: { sz: "12" } } },
          { value: val.ch_storage, style: { font: { sz: "12" } } },
          { value: val.ch_status == 1 ? 'Solids' : val.ch_status == 2 ? 'Liquids' : 'Gas', style: { font: { sz: "12" } } },
          { value: moment(val.ch_exp).format('DD/MM/YYYY'), style: { font: { sz: "12" } } },
          { value: val.ch_manufacturer, style: { font: { sz: "12" } } }
        ])
    }
  ]

  const DataToolSet = [
    {
      columns: [
        { title: "", width: { wch: 10 }, style: { font: { sz: "12", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },
        { title: "ชื่อ", width: { wch: 20 }, style: { font: { sz: "12", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },
        { title: "อุปกรณ์", width: { wch: 20 }, style: { font: { sz: "12", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },
        { title: "จำนวน", width: { wch: 20 }, style: { font: { sz: "12", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },
        { title: "สถานที่เก็บ", width: { wch: 20 }, style: { font: { sz: "12", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } } } },

      ],
      data:
        equipmentList.map((val, key) => [
          { value: val.tool_id, style: { font: { sz: "12" } } },
          { value: val.tool_name, style: { font: { sz: "12" } } },
          { value: val.tool_size, style: { font: { sz: "12" } } },
          { value: val.tool_amount, style: { font: { sz: "12" } } },
          { value: val.tool_storage, style: { font: { sz: "12" } } },

        ])
    }
  ]

  //--------------------------------------------------- Chemical -----------------------------------------------//
  //------------------------------------------------------  GET  -----------------------------------------------//


  // -----------------------------------------------------Modal Che ------------------------------------------//
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

  //--------------------------------------------- AddChe ---------------------------------------------------------//
  const [showAdd, setShowAdd] = useState(false);
  const addClose = () => setShowAdd(false);
  const addShow = () => setShowAdd(true);

  const [CheName, setCheName] = useState("");
  const [CheCas, setCheCas] = useState("");
  const [CheFormular, setCheFormular] = useState("");
  const [CheCode, setCheCode] = useState("");
  const [CheManu, setCheManu] = useState("");
  const [CheQuan, setCheQuan] = useState("");
  const [CheAmount, setCheAmount] = useState("");
  const [CheExp, setCheExp] = useState("");
  const [CheStatus, setCheStatus] = useState(0);
  const [CheStorage, setCheStorage] = useState("");

  // ------------------------------------------------------- Edit ----------------------------------------------------------//
  const [readChe, setreadChe] = useState([{}])
  const [showEdit, setShowEdit] = useState(false);
  const editClose = () => setShowEdit(false);
  const editShow = (id) => {
    console.log(id)
    Axios.get(`${rReadChe}` + id).then((Response) => {
      setreadChe(Response.data);
      console.log(Response.data)
      setShowEdit(true)
    }
    );
  }

  //------------------------------------------------- AddChe --------------------------------------------------------------------//
  const [infoImg, setInfoImg] = useState({
    file: [],
  })

  const handleInputChange = (event) => {
    setInfoImg({
      ...infoImg,
      file: event.target.files[0],
    })
  }

  const submit = async () => {
    const formdata = new FormData();
    formdata.append('IMG', infoImg.file);
    formdata.append('CheName', CheName)
    formdata.append('CheCas', CheCas)
    formdata.append('CheFormular', CheFormular)
    formdata.append('CheCode', CheCode)
    formdata.append('CheManu', CheManu)
    formdata.append('CheQuan', CheQuan)
    formdata.append('CheAmount', CheAmount)
    formdata.append('CheStatus', CheStatus)
    formdata.append('CheStorage', CheStorage)
    formdata.append('CheExp', CheExp)

    axios.post(`${rAddChemical}`, formdata, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(res => {
      console.log(res)
      if (res.status === 200) {
        addClose();
        getChemical();
        Swal.fire("อัพโหลดข้อมูลสำเร็จ", "อัพโหลดข้อมูลแล้ว", "success")
      } else if (res.status === 400) {
        addClose();
        getChemical();
        Swal.fire("ไม่สามารถอัพโหลดข้อมูลได้", "เนื่องจากไม่ได้เเนบรูปภาพ", "error")
      }
    }).catch(e => {
      console.log(e);
    })

  }

  //---------------------------------------------------------- Update Che ---------------------------------------//
  const [updateInfoImgChe, setUpdateInfoImgChe] = useState({
    file: [],
  })
  const handleInputChange4 = (event) => {
    setUpdateInfoImgChe({
      ...updateInfoImgChe,
      file: event.target.files[0],
    })
  }

  const updateChe = () => {
    const formdata = new FormData();
    formdata.append('IMG', updateInfoImgChe.file);
    formdata.append('ch_id', readChe[0].ch_id);
    formdata.append('ch_cas_no', readChe[0].ch_cas_no)
    formdata.append('ch_formula', readChe[0].ch_formula)
    formdata.append('ch_code', readChe[0].ch_code)
    formdata.append('ch_manufacturer', readChe[0].ch_manufacturer)
    formdata.append('ch_quantity', readChe[0].ch_quantity)
    formdata.append('ch_amount', readChe[0].ch_amount)
    formdata.append('ch_status', readChe[0].ch_status)
    formdata.append('ch_storage', readChe[0].ch_storage)
    formdata.append('ch_name', readChe[0].ch_name)
    formdata.append('ch_exp', readChe[0].ch_exp)
    Axios.put(`${rUpdateChe}`, formdata, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(res => {
      if (res.status === 200) {
        Swal.fire("เเก้ไขข้อมูลสำเร็จ", "เเก้ไขข้อมูลแล้ว", "success")
        editClose()
        getChemical()
      }
    }).catch(e => {
      console.log(e);
    })
  }

  //-------------------------------------------------- delect Che -----------------------------------------------------------------//
  const delChe = (id) => {
    Swal.fire({
      title: 'คุณต้องการลบข้อมูลใช่หรือไม่ ?',
      text: "คุณต้องการลบข้อมูลของ " + id,
      icon: 'warning',
      timer: 10000,
      showCancelButton: true,
      confirmButtonText: 'ตกลง',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'ยกเลิก',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`${rDelChe}` + id)
          .then(function (response) {
            console.log(response);
            Swal.fire(
              'ลบข้อมูลสำเร็จ !',
              'ข้อมูลของคุณถูกลบออกแล้ว',
              'success'
            )
            setTimeout(() => {
              getChemical();
            }, 500);
            detailClose();

          })
          .catch(function (error) {
            console.log(error);
            Swal.fire(
              'ไม่สามารถลบข้อมมูลได้!',
              'ไม่สามารถลบข้อมมูลได้เนืองจาก :' + error,
              'error'
            )
          })
      }
    })
  }


  //---------------------------------------------------------------------------------------------------------------------------//
  //-------------------------------------------------------------------- Tool ------------------------------------------------//
  // ------------------------------------------------------------------ Modal Tools ------------------------------------------//
  const [readTool, setreadTool] = useState([{}])
  const [showAddTools, setShowAddTools] = useState(false);
  const addToolsClose = () => setShowAddTools(false);
  const addToolsShow = () => setShowAddTools(true);

  const [ToolAmount, setToolAmount] = useState("");
  const [ToolSize, setToolSize] = useState("");
  const [ToolStorage, setToolStorage] = useState("");
  const [ToolName, setToolName] = useState("");


  //------------------------------------------------------------------------------------------------------------------------------------//

  const [showDeatailTools, setshowDeatailTools] = useState(false);
  const DtailToolsClose = () => setshowDeatailTools(false);
  const detailToolsShow = (id) => {
    Axios.get(`${rReadTool}` + id).then((Response) => {
      setreadTool(Response.data);
      console.log(Response.data)
      setshowDeatailTools(true)
    });
  }

  //------------------------------------------------------------------------------------------------------------------------------------//
  const [showEditToolsShow, setshowEditToolsShow] = useState(false);
  const EditToolsClose = () => setshowEditToolsShow(false);
  const EditToolsShow = (id) => {
    Axios.get(`${rReadTool}` + id).then((Response) => {
      setreadTool(Response.data);
      console.log(Response.data)
      setshowEditToolsShow(true)
    });
  }

  //------------------------------------------------------------------------------------------------------------------------------------//
  const [infoUpdateTool, setInfoUpdateTool] = useState({ file: [], })

  const updatePhotoTool = (event) => {
    setInfoUpdateTool({
      ...infoUpdateTool,
      file: event.target.file[0],
    })
  }

  //------------------------------------------------------------------------------------------------------------------------------------//
  const [updateInfoImgTool, setUpdateInfoImgTool] = useState({
    file: [],
  })
  const handleInputChange3 = (event) => {
    setUpdateInfoImgTool({
      ...updateInfoImgTool,
      file: event.target.files[0],
    })
  }
  const submitUpdateTool = async () => {
    const formdata = new FormData();
    formdata.append('IMG', updateInfoImgTool.file);
    formdata.append('tool_id', readTool[0].tool_id);
    formdata.append('tool_name', readTool[0].tool_name);
    formdata.append('tool_storage', readTool[0].tool_storage);
    formdata.append('tool_size', readTool[0].tool_size);
    formdata.append('tool_amount', readTool[0].tool_amount);
    axios.put(`${rUpdateTool}`, formdata, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(res => {
      console.log(res)
      if (res.status === 200) {
        EditToolsClose();
        getEquipment();
        Swal.fire("แก้ไขข้อมูลสำเร็จ", "ข้อมูลของคุณถูกแก้ไขแล้ว", "success")
      } else if (res.status === 400) {
        console.log("555555555555555555555555555555")
        Swal.fire("ไม่สามารถอัพโหลดข้อมูลได้", "เนื่องจากไม่ได้เเนบรูปภาพ", "error")
      }

    }).catch(e => {
      console.log(e);
    })
  }


  //-------------------------------------------------------ลบอุปกรณ์-----------------------------------------------------------------------------//
  const delTool = (id) => {
    Swal.fire({
      title: 'คุณต้องการลบข้อมูลใช่หรือไม่ ?',
      text: "คุณต้องการลบข้อมูลของ " + id,
      icon: 'warning',
      timer: 10000,
      showCancelButton: true,
      confirmButtonText: 'ตกลง',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'ยกเลิก',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`${rDelTool}` + id)
          .then(function (response) {
            console.log(response);
            Swal.fire(
              'ลบข้อมูลสำเร็จ !',
              'ข้อมูลของคุณถูกลบออกแล้ว',
              'success'
            )
            DtailToolsClose();
            getEquipment();
          })
          .catch(function (error) {
            console.log(error);
            Swal.fire(
              'ไม่สามารถลบข้อมมูลได้!',
              'ไม่สามารถลบข้อมมูลได้เนืองจาก :' + error,
              'error'
            )
          })
      }
    })
  }

  //------------------------------------------------------------------  GET  ------------------------------------------------------//


  //------------------------------------------------------------------  POST  ------------------------------------------------------//
  //------------------------------------------------------------------- Addtool ----------------------------------------------------//
  const [infoImgTool, setInfoImgTool] = useState({
    file: [],
  })
  const handleInputChange2 = (event) => {
    setInfoImgTool({
      ...infoImgTool,
      file: event.target.files[0],
    })
  }

  const submitTool = async () => {
    const formdataTool = new FormData();
    formdataTool.append('IMG', infoImgTool.file);
    formdataTool.append('ToolAmount', ToolAmount)
    formdataTool.append('ToolSize', ToolSize)
    formdataTool.append('ToolStorage', ToolStorage)
    formdataTool.append('ToolName', ToolName)
    axios.post(`${rAddTool}`, formdataTool, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(res => {
      if (res.status === 200) {
        Swal.fire("อัพโหลดข้อมูลสำเร็จ", "อัพโหลดข้อมูลแล้ว", "success")
        addToolsClose();
        getEquipment();
      }
    }).catch(e => {
      console.log(e);
    })
  }

  //---------------------------------------------------------------------------
  const [searchMie, setSearchMie] = useState("");
  useEffect(() => {
    getChemical();
    getEquipment();
  }, []);

  //-----------------------------------PageSize-----------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  let PageSize = 8;

  const [currentPageCh, setCurrentPageCh] = useState(1);
  let PageSizeCh = 8;

  const currentchemicalListTableData = useMemo(() => {
    const firstPageIndex = (currentPageCh - 1) * PageSizeCh;
    const lastPageIndex = firstPageIndex + PageSizeCh;
    return chemicalList.slice(firstPageIndex, lastPageIndex);
  }, [currentPageCh, chemicalList]);


  const currentequipmentListTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return equipmentList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, equipmentList]);



  return (
    <>
      <div className="col-9 " style={{ marginRight: '20rem', marginTop: '5rem' }}>
        <div className="warpper" >
          <input className="radio" id="one" name="group" type="radio" defaultChecked />
          <input className="radio" id="two" name="group" type="radio" />
          <div className="tabs row">
            <div className='col-6 '>
              <label className="tab" id="one-tab" htmlFor="one">สารเคมี</label>
              <label className="tab" id="two-tab" htmlFor="two">อุปกรณ์</label>
            </div>
            <div className='col-6 ' >

              <input type='text' className='form-control' placeholder='ค้นหาชื่อสารเคมี อุปกรณ์' style={{ marginLeft: '14.8rem' }}
                onChange={(event) => {
                  setSearchMie(event.target.value);
                }}
              />

            </div>
          </div>
          <div className="panels">
            <div className="panel" id="one-panel">
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 100, textAlign: 'center' }}> <span>ลับดับ</span> </th>
                    <th className="headname-th" scope="col" width="5%" style={{ minWidth: 259 }}><span>ชื่อสารเคมี </span></th>
                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 150 }}><span>รหัสสารเคมี</span> </th>
                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 160, textAlign: 'center' }}><span>ยอดคงเหลือ</span> </th>
                    <th className="headname-th" scope="col" width="5%" style={{ minWidth: 160 }}><span>สถานที่เก็บ</span> </th>
                    <th className="headname-th" scope="col" width="5%" style={{ minWidth: 200 }} >
                      <ExcelFile
                        filename="รายงานรายการสารเคมี"
                        element={<button type="button" className="btn btn-success" > <i
                          aria-hidden="true"
                          className="fas fa-print"
                          style={{ fontSize: 15 }}
                        />{" "}Export Excel</button>}
                      >
                        <ExcelSheet dataSet={DataChSet} name="Chemical" />
                      </ExcelFile>
                    </th>
                    <th>
                      <button type="button" onClick={addShow} className="btn btn-report " data-bs-toggle="modal" data-bs-target="#exampleModal"
                        style={{ backgroundColor: '#5DD480', borderRadius: 4, width: 95, color: '#fff' }}><i aria-hidden="true" className="fas fa-plus"
                          style={{ fontSize: 15 }} /><label className="mx-2">เพิ่ม</label> </button>
                    </th>
                  </tr>
                </thead>
                <tbody style={{ height: '12rem', verticalAlign: 'middle' }}  >

                  {currentchemicalListTableData.filter((val) => {
                    if (searchMie == "") {
                      return val
                    } else if (val.ch_name.toLowerCase().includes(searchMie.toLowerCase())) {
                      return val
                    } else if (val.ch_code.toLowerCase().includes(searchMie.toLowerCase())) {
                      return val
                    }
                  }).map((val, key) => {
                    return (
                      <tr className="table-name-report" key={key}>
                        <th scope="row" style={{ textAlign: 'center' }}>{val.ch_id}</th>
                        <td>{val.ch_name}</td>
                        <td><label className="class-room">{val.ch_code}</label></td>
                        <td style={{ textAlign: 'center' }}>{val.ch_amount}</td>
                        <td>{val.ch_storage}</td>
                        <td>
                          <button type="button" onClick={() => { detailShow(val.ch_id) }} className="btn btn-report " style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-search-plus" style={{ fontSize: 15 }} /><label className="mx-2">ดูรายละเอียด</label> </button>
                        </td>
                        <td><button type="button" onClick={() => { editShow(val.ch_id) }} className="btn btn-report " style={{ backgroundColor: '#958F8F', color: '#fff' }}><i aria-hidden="true" className="far fa-edit" style={{ fontSize: 15 }} /><label className="mx-2">แก้ไข</label> </button></td>
                      </tr>)

                  })}
                </tbody>
              </table>
              <Pagination
                className="pagination-bar"
                currentPage={currentPageCh}
                totalCount={chemicalList.length}
                pageSize={PageSizeCh}
                onPageChange={page => setCurrentPageCh(page)}
              />
            </div>

            <div className="panel" id="two-panel">
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 100, textAlign: 'center' }}> <span>ชนิด</span> </th>
                    <th className="headname-th" scope="col" width="5%" style={{ minWidth: 259 }}><span>ชื่ออุปกรณ์ </span></th>
                    <th className="headname-th" scope="col" width="5%" style={{ minWidth: 150 }}><span>ขนาด </span></th>
                    <th className="headname-th" scope="col" width="3%" style={{ minWidth: 160, textAlign: 'center' }}><span>ยอดคงเหลือ</span> </th>
                    <th className="headname-th" scope="col" width="5%" style={{ minWidth: 160 }}><span>สถานที่เก็บ</span> </th>
                    <th className="headname-th" scope="col" width="5%" style={{ minWidth: 200 }} >
                      <ExcelFile
                        filename="รายงานรายการอุปกรณ์"
                        element={<button type="button" className="btn btn-success" ><i
                          aria-hidden="true"
                          className="fas fa-print"
                          style={{ fontSize: 15 }}
                        />{" "} Export Excel</button>}
                      >
                        <ExcelSheet dataSet={DataToolSet} name="Chemical" />
                      </ExcelFile>

                    </th>
                    <th>
                      <button type="button" onClick={addToolsShow} className="btn btn-report " style={{ backgroundColor: '#5DD480', borderRadius: 4, width: 95, color: '#fff' }}><i aria-hidden="true" className="fas fa-plus" style={{ fontSize: 15 }} /><label className="mx-2">เพิ่ม</label> </button>
                    </th>
                  </tr>
                </thead>
                <tbody style={{ height: '12rem', verticalAlign: 'middle' }}>
                  {currentequipmentListTableData.filter((val) => {
                    if (searchMie == "") {
                      return val
                    } else if (val.tool_name.toLowerCase().includes(searchMie.toLowerCase())) {
                      return val
                    }
                  }).map((val, key) => {
                    return (
                      <tr className="table-name-report " key={key}>
                        <th scope="row" style={{ textAlign: 'center' }}>{val.tool_id}</th>
                        <td>{val.tool_name}</td>
                        <td><label className="class-room" />{val.tool_size}</td>
                        <td style={{ textAlign: 'center' }}>{val.tool_amount}</td>
                        <td>{val.tool_storage}</td>
                        <td>
                          <button type="button" className="btn btn-report " onClick={() => { detailToolsShow(val.tool_id) }} style={{ backgroundColor: '#63B0C0', color: '#fff' }}><i aria-hidden="true" className="fas fa-search-plus" style={{ fontSize: 15 }} /><label className="mx-2">ดูรายละเอียด</label> </button>
                        </td>
                        <td><button type="button" className="btn btn-report " onClick={() => { EditToolsShow(val.tool_id) }} style={{ backgroundColor: '#958F8F', color: '#fff' }}><i aria-hidden="true" className="far fa-edit" style={{ fontSize: 15 }} /><label className="mx-2">แก้ไข</label> </button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={equipmentList.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>


      {/* ----------------------------------------------- addChe -------------------------------------------------------------------------*/}
      <Modal
        show={showAdd}
        onHide={addClose}
        backdrop="static"
        keyboard={false}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มข้อมูลสารเคมี</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-5 col-12 col-sm-12">
              <div className="row mb-3">
                <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">ชื่อสารเคมี
                  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 ">
                  <input type="text" className="input-text form-control "
                    name='CheName'
                    
                    onChange={(Event) => {
                      setCheName(Event.target.value)
                    }} />
                  
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">ชนิด
                </label>
                <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                  <input type="text" className="input-text form-control " id formcontrolname disabled />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name labal-name-mie">สูตรโมเลกุล
                
                </label>
                <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                  <input type="text" className="input-text form-control " name='CheCode'
              
                    onChange={(Event) => {
                      setCheFormular(Event.target.value)
                    }} />
                  
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name labal-name-mie">CAS No
                </label>
                <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                  <input type="text" className="input-text form-control "
                    onChange={(Event) => {
                      setCheCas(Event.target.value)
                    }}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name labal-name-mie">รหัสสารเคมี
                <span style={{ color: "red" }}>*</span> </label>
                <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                  <input type="text" className="input-text form-control "
                   name='CheCode'     
                              
                    onChange={(Event) => {
                      setCheCode(Event.target.value)
                    }} />
                   
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name labal-name-mie">จำนวน
                </label>
                <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                  <input type="text" className="input-text form-control "
                    onChange={(Event) => {
                      setCheAmount(Event.target.value)
                    }} />
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-5 col-12 col-sm-12">
              <div className="row mb-3">
                <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">สถานที่เก็บ
                </label>
                <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                  <input type="text" className="input-text form-control "
                    onChange={(Event) => {
                      setCheStorage(Event.target.value)
                    }} />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">ขนาดบรรจุ
                </label>
                <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                  <input type="text" className="input-text form-control "
                    onChange={(Event) => {
                      setCheQuan(Event.target.value)
                    }} />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">สถานะ
                </label>
                <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                  <Form.Select aria-label="Default select example" onChange={(Event) => {
                    setCheStatus(Event.target.value)
                  }}>
                    <option value="0">สถานะ</option>
                    <option value="1">Solids</option>
                    <option value="2">Liquids</option>
                    <option value="3">Gas</option>

                  </Form.Select>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">วันหมดอายุ
                </label>
                <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                  <DatePickerComponent
                    format='dd/MM/yyyy'
                    onChange={(Event) => {
                      if (Event.target.value) {
                        let newDate = new Date(Event.target.value);
                        var date = ((Event.target.value)).toISOString();
                        date = date.split("T")[0]
                        var dateArray = date.split("-");
                        setCheExp([dateArray[0], dateArray[1], newDate.getDate()].join('-'))
                      }
                    }} />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">ผู้ผลิต
                </label>
                <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                  <input type="text" className="input-text form-control "
                    onChange={(Event) => {
                      setCheManu(Event.target.value)
                    }} />
                </div>
              </div>
            </div>
            <div className="col-xl-3">
              <div className="form-group mb-3">
                <div className="image-upload">
                  <input type="file" name="upload_file" onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div className="row mt-3 ">
              <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6 " style={{ textAlign: '-webkit-right', textAlign: "end" }}>
                <button type="submit" className="btn btn-add-modal " style={{ color: '#fff' }} onClick={() =>{submit()}} >
                  <i aria-hidden="true" className="fas fa-check mx-3" style={{ fontSize: 20 }} />ยืนยัน
                </button>
              </div>
              <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6">
                <button type="button" className="btn  btn-add-cancal" onClick={addClose} style={{ color: '#fff' }}>
                  <i aria-hidden="true" className="fas fa-times mx-3" style={{ fontSize: 20 }} />
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* --------------------------------------------------------------------------- detailChe ----------------------------------------------- */}
      <Modal
        show={showDetail}
        onHide={detailClose}
        backdrop="static"
        keyboard={false}

        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดสารเคมี</Modal.Title>

        </Modal.Header>
        <Modal.Body>
          {readChe.map((val, key) => {
            return (
              <div className="row" key={key}>
                <div className="col-xl-4 col-lg-5 col-md-5 col-12 col-sm-12">
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">ชื่อสารเคมี :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.ch_name}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">ลำดับ
                      :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.ch_id}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name labal-name-mie">สูตรโมเลกุล
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
                    <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name labal-name-mie">รหัสสารเคมี
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.ch_code}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name labal-name-mie">จำนวน :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.ch_amount}
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-5 col-12 col-sm-12">
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">สถานที่เก็บ :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.ch_storage}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">ขนาดบรรจุ :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.ch_quantity}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">สถานะ
                      :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.ch_status == 1 ? 'Solids' : val.ch_status == 2 ? 'Liquids' : 'Gas'}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">วันหมดอายุ :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {moment(val.ch_exp).format('DD/MM/YYYY')}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">ผู้ผลิต :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.ch_manufacturer}
                    </div>
                  </div>
                </div>
                <div className="col-xl-3">
                  <div className="form-group mb-3">
                    <div className="image-upload">
                      <img src={`${rImgChemical}` + val.ch_img} alt style={{ width: '7rem', marginTop: '5rem' }} />
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12 col-lg-12 col-xl-12 col-mb-12 col-xs-12" style={{ textAlign: 'center' }}>
                    <button type="button" className="btn  btn-del" style={{ color: '#fff' }} onClick={() => delChe(val.ch_id)} >
                      <i aria-hidden="true" className="fas fa-trash mx-2" style={{ fontSize: 16 }} />
                      ลบข้อมูล
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </Modal.Body>
      </Modal>

      {/* ------------------------------------------------------------ editChe ------------------------------------------------------------------------ */}
      <Modal
        show={showEdit}
        onHide={editClose}
        backdrop="static"
        keyboard={false}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขข้อมูลสารเคมี</Modal.Title>

        </Modal.Header>
        <Modal.Body>
          {readChe.map((val, key) => {
            return (
              <div className="row" key={key}>
                <div className="col-xl-4 col-lg-5 col-md-5 col-12 col-sm-12">
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">ชื่อสารเคมี :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 ">
                      <input type="text" className="input-text form-control " id formcontrolname defaultValue={val.ch_name}
                        onChange={(event) => {
                          setreadChe([{
                            ...readChe[0], ch_name: event.target.value
                          }])
                        }}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">
                      ชนิด :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 ">
                      <input type="text" className="input-text form-control " id formcontrolname defaultValue={val.ch_id} disabled />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name labal-name-mie">สูตรโมเลกุล
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 ">
                      <input type="text" className="input-text form-control " id formcontrolname defaultValue={val.ch_formula}
                        onChange={(event) => {
                          setreadChe([{
                            ...readChe[0], ch_formula: event.target.value
                          }])
                        }} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name labal-name-mie">CAS No :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 ">
                      <input type="text" className="input-text form-control " id formcontrolname defaultValue={val.ch_cas_no}
                        onChange={(event) => {
                          setreadChe([{
                            ...readChe[0], ch_cas_no: event.target.value
                          }])
                        }}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name labal-name-mie">
                      รหัสสารเคมี

                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 ">
                      <input type="text" className="input-text form-control " id formcontrolname defaultValue={val.ch_code}
                        onChange={(event) => {
                          setreadChe([{
                            ...readChe[0], ch_code: event.target.value
                          }])
                        }}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name labal-name-mie">จำนวน :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 ">
                      <input type="text" className="input-text form-control " id formcontrolname defaultValue={val.ch_amount}
                        onChange={(event) => {
                          setreadChe([{
                            ...readChe[0], ch_amount: event.target.value
                          }])
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-5 col-12 col-sm-12">
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">สถานที่เก็บ :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 ">
                      <input type="text" className="input-text form-control " id formcontrolname defaultValue={val.ch_storage}
                        onChange={(event) => {
                          setreadChe([{
                            ...readChe[0], ch_storage: event.target.value
                          }])
                        }}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">ขนาดบรรจุ :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 ">
                      <input type="text" className="input-text form-control " id formcontrolname defaultValue={val.ch_quantity}
                        onChange={(event) => {
                          setreadChe([{
                            ...readChe[0], ch_quantity: event.target.value
                          }])
                        }}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">สถานะ
                      :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      <Form.Select type="text" className="input-text form-control " id formcontrolname defaultValue={val.ch_status}
                        onChange={(event) => {
                          setreadChe([{
                            ...readChe[0], ch_status: event.target.value
                          }])
                        }}>
                        <option value="0">สถานะ</option>
                        <option value="1">Solids</option>
                        <option value="2">Liquids</option>
                        <option value="3">Gas</option>
                      </Form.Select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">วันหมดอายุ :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8">
                      <DatePickerComponent
                        value={moment(readChe[0].ch_exp).format('DD/MM/YYYY')}
                        format='dd/MM/yyyy'
                        onChange={(Event) => {
                          if (Event.target.value) {
                            var date = (Event.target.value).toISOString();
                            date = date.split("T")[0]
                            var dateArray = date.split("-");
                            setreadChe([{
                              ...readChe[0], ch_exp: ([dateArray[0], dateArray[1], parseInt(dateArray[2]) + 1].join('-'))
                            }])
                          }
                        }} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie">ผู้ผลิต :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      <input type="text" className="input-text form-control " id formcontrolname defaultValue={val.ch_manufacturer}
                        onChange={(event) => {
                          setreadChe([{
                            ...readChe[0], ch_manufacturer: event.target.value
                          }])
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-3">
                  <div className="form-group mb-3">
                    <div className="image-upload">
                      <img src={`${rImgChemical}` + val.ch_img} alt style={{ width: '7rem', marginTop: '5rem' }} />
                      <input className=" mt-4" type="file" name="upload_file" onChange={handleInputChange4} />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6" style={{ textAlign: 'end' }}>
                    <button type="submit" className="btn btn-add-modal" style={{ color: '#fff' }} onClick={() => updateChe(val.ch_id)} >
                      <i aria-hidden="true" className="fas fa-check mx-2" style={{ fontSize: 16 }} />ยืนยัน
                    </button>
                  </div>
                  <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6">
                    <button type="button" className="btn  btn-add-cancal" style={{ color: '#fff' }} onClick={editClose} >
                      <i aria-hidden="true" className="fas fa-times mx-2" style={{ fontSize: 16 }} />
                      ยกเลิก
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </Modal.Body>
      </Modal>

      {/* ---------------------------------------------------------------------- addTools ------------------------------------------------------------------------ */}
      <Modal
        show={showAddTools}
        onHide={addToolsClose}
        backdrop="static"
        keyboard={false}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มข้อมูลอุปกรณ์</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-5 col-12 col-sm-12">
              <div className="row mb-3">
                <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie mt-2">ชื่ออุปกรณ์  
                <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                  <input type="text" className="input-text form-control "  name='ToolName'
                  {...register("ToolName",{required:true,maxLength: 100})}
                    onChange={(event) => {
                      setToolName(event.target.value)
                    }}
                  />
                   {errors.ToolName?.type === 'required' && <p style={{ color: "red", marginTop: "2px" }}>*กรุณากรอกข้อมูล</p>}
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie mt-2">ชนิด
                  :
                </label>
                <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                  <input type="text" className="input-text form-control " id formcontrolname disabled />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie mt-2">ยอดคงเหลือ

                </label>
                <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                  <input type="text" className="input-text form-control " id formcontrolname
                    onChange={(event) => {
                      setToolAmount(event.target.value)
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-5 col-12 col-sm-12">
              <div className="row mb-3">
                <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie mt-2">สถานที่เก็บ :
                </label>
                <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                  <input type="text" className="input-text form-control " id formcontrolname
                    onChange={(event) => {
                      setToolStorage(event.target.value)
                    }}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie mt-2">ขนาดบรรจุ :
                </label>
                <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                  <input type="text" className="input-text form-control " id formcontrolname
                    onChange={(event) => {
                      setToolSize(event.target.value)
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-3">
              <div className="form-group mb-3">
                <div className="image-upload">
                  <input className="" type="file" name="upload_file" onChange={handleInputChange2} /> 
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6" style={{ textAlign: 'end' }}>
                <button type="submit" className="btn btn-add-modal" style={{ color: '#fff' }} onClick={handleSubmit(submitTool)} >
                  <i aria-hidden="true" className="fas fa-check mx-2" style={{ fontSize: 16 }} />ยืนยัน
                </button>
              </div>
              <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6">
                <button type="button" className="btn  btn-add-cancal" style={{ color: '#fff' }} onClick={addToolsClose}>
                  <i aria-hidden="true" className="fas fa-times mx-2 " style={{ fontSize: 16 }} />
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* -------------------------------------------------------------------------------- detailTools --------------------------------------------------------------*/}
      <Modal
        show={showDeatailTools}
        onHide={DtailToolsClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดอุปกรณ์</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {readTool.map((val, key) => {
            return (
              <div className="row" key={key}>
                <div className="col-xl-4 col-lg-5 col-md-5 col-12 col-sm-12">
                  <div className="row mb-3">
                    <label htmlFor=""
                      className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name">ชื่ออุปกรณ์ :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.tool_name}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label for="" className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name">ชนิด :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.tool_id}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor=""
                      className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4  col-4 col-form-label form-name">ยอดคงเหลือ :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.tool_amount}
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-5 col-12 col-sm-12">
                  <div className="row mb-3">
                    <label htmlFor=""
                      className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name">สถานที่เก็บ :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2" >
                      {val.tool_storage}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor=""
                      className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name">ขนาดบรรจุ :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      {val.tool_size}
                    </div>
                  </div>
                </div>
                <div className="col-xl-3">
                  <div className="form-group mb-3">
                    <div className="image-upload">
                      <img src={`${rImgTools}` + val.tool_img} alt style={{ width: '7rem', marginTop: '5rem' }} />
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12 col-lg-12 col-xl-12 col-mb-12 col-xs-12" style={{ textAlign: 'center' }}>
                    <button type="button" className="btn  btn-del" style={{ color: '#fff' }} onClick={() => delTool(val.tool_id)} >
                      <i aria-hidden="true" className="fas fa-trash mx-2" style={{ fontSize: 16 }} />
                      ลบข้อมูล
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </Modal.Body>
      </Modal>

      {/* ----------------------------------------------------------------------------------editTools -----------------------------------------------------------------*/}
      <Modal
        show={showEditToolsShow}
        onHide={EditToolsClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขข้อมูลอุปกรณ์</Modal.Title>

        </Modal.Header>
        <Modal.Body>
          {readTool.map((val, key) => {
            return (
              <div className="row" key={key}>
                <div className="col-xl-4 col-lg-5 col-md-5 col-12 col-sm-12">
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie mt-2">ชื่ออุปกรณ์  :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      <input type="text" className="input-text form-control " id formcontrolname defaultValue={val.tool_name}
                        onChange={(event) => {
                          setreadTool([{
                            ...readTool[0], tool_name: event.target.value
                          }])
                        }} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie mt-2">ชนิด
                      :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      <input type="text" className="input-text form-control " id formcontrolname defaultValue={val.tool_id} disabled />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie mt-2">ยอดคงเหลือ

                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      <input type="text" className="input-text form-control " id formcontrolname defaultValue={val.tool_amount}
                        onChange={(event) => {
                          setreadTool([{
                            ...readTool[0], tool_amount: event.target.value
                          }])
                        }} />
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-5 col-12 col-sm-12">
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie mt-2">สถานที่เก็บ :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      <input type="text" className="input-text form-control " id formcontrolname defaultValue={val.tool_storage}
                        onChange={(event) => {
                          setreadTool([{
                            ...readTool[0], tool_storage: event.target.value
                          }])
                        }}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-xs-4  col-4 col-form-label form-name labal-name-mie mt-2">ขนาดบรรจุ :
                    </label>
                    <div className="col-xl-7 col-lg-9 col-md-9 col-sm-9 col-xs-8 col-8 mt-2">
                      <input type="text" className="input-text form-control " id formcontrolname defaultValue={val.tool_size}
                        onChange={(event) => {
                          setreadTool([{
                            ...readTool[0], tool_size: event.target.value
                          }])
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-3">
                  <div className="form-group mb-3">
                    <div className="image-upload">
                      <img src={`${rImgTools}` + val.tool_img} alt style={{ width: '7rem', marginTop: '5rem' }} />
                      <input className=" mt-4" type="file" name="upload_file" onChange={handleInputChange3} />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6" style={{ textAlign: "end" }}>
                    <button type="submit" className="btn btn-add-modal" style={{ color: '#fff' }} onClick={() => submitUpdateTool(val.tool_id)} >
                      <i aria-hidden="true" className="fas fa-check mx-2" style={{ fontSize: 16 }} />ยืนยัน
                    </button>
                  </div>
                  <div className="col-6 col-lg-6 col-xl-6 col-mb-6 col-xs-6">
                    <button type="button" className="btn  btn-add-cancal" style={{ color: '#fff' }} onClick={EditToolsClose}>
                      <i aria-hidden="true" className="fas fa-times mx-2 " style={{ fontSize: 16 }} />
                      ยกเลิก
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
