import React from "react";
import "../css/report.css";
import ReactExport from "react-data-export";
import { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import { rChemicalList, rToolsList ,rPickingListDis_admin,rPickingListBor_admin,rReportDis,rReportBor} from "../route/BackRoute";
import moment from "moment";

export default function Report() {
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

  const [chemicalList, setChemicalList] = useState([]);
  const getChemical = () => {
    Axios.get(`${rChemicalList}`).then((response) => {
      setChemicalList(response.data);
    });
  };
  const [equipmentList, setEquipmentList] = useState([]);
  const getEquipment = () => {
    Axios.get(`${rToolsList}`).then((response) => {
      setEquipmentList(response.data);
    });
  };
  const [pickListDis, setPickListDis] = useState([]);
  const pickList = () => {
    Axios.get(`${rReportDis}`).then((Response) => {
      setPickListDis(Response.data);
    });
  }
  const [pickListBor, setPickListBor] = useState([]);
  const pickList_bor = () => {
    Axios.get(`${rReportBor}`).then((Response) => {
      setPickListBor(Response.data);
    });
  }


  useEffect(() => {
    getChemical();
    getEquipment();
    pickList();
    pickList_bor();
  }, []);

  const DataChSet = [
    {
      columns: [
        {
          title: "",
          width: { wch: 10 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "รหัสสารเคมี",
          width: { wch: 20 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "ชื่อสารเคมี",
          width: { wch: 20 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "สูตรโมเลกุล",
          width: { wch: 20 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "CAS No.",
          width: { wch: 20 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "จำนวน",
          width: { wch: 20 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "ขนาดความจุ",
          width: { wch: 20 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "สถานที่เก็บ",
          width: { wch: 20 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "สถานะ",
          width: { wch: 20 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "วันหมดอายุ",
          width: { wch: 20 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "ผู้ผลิต",
          width: { wch: 20 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
      ],
      data: chemicalList.map((val, key) => [
        { value: val.ch_id, style: { font: { sz: "12" } } },
        { value: val.ch_code, style: { font: { sz: "12" } } },
        { value: val.ch_name, style: { font: { sz: "12" } } },
        { value: val.ch_formula, style: { font: { sz: "12" } } },
        { value: val.ch_cas_no, style: { font: { sz: "12" } } },
        { value: val.ch_amount, style: { font: { sz: "12" } } },
        { value: val.ch_quantity, style: { font: { sz: "12" } } },
        { value: val.ch_storage, style: { font: { sz: "12" } } },
        {
          value:
            val.ch_status == 1
              ? "Solids"
              : val.ch_status == 2
              ? "Liquids"
              : "Gas",
          style: { font: { sz: "12" } },
        },
        {
          value: moment(val.ch_exp).format("DD/MM/YYYY"),
          style: { font: { sz: "12" } },
        },
        { value: val.ch_manufacturer, style: { font: { sz: "12" } } },
      ]),
    },
  ];

  const DataToolSet = [
    {
      columns: [
        {
          title: "",
          width: { wch: 10 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "ชื่อ",
          width: { wch: 20 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "อุปกรณ์",
          width: { wch: 20 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "จำนวน",
          width: { wch: 20 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "สถานที่เก็บ",
          width: { wch: 20 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
      ],
      data: equipmentList.map((val, key) => [
        { value: val.tool_id, style: { font: { sz: "12" } } },
        { value: val.tool_name, style: { font: { sz: "12" } } },
        { value: val.tool_size, style: { font: { sz: "12" } } },
        { value: val.tool_amount, style: { font: { sz: "12" } } },
        { value: val.tool_storage, style: { font: { sz: "12" } } },
      ]),
    },
  ];

  const DataDisSet = [
    {
      columns: [
        {
          title: "ORDER ID",
          width: { wch: 10 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "วันที่เบิก",
          width: { wch: 15 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "ชื่อ-นามสกุล",
          width: { wch: 25 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "รหัสนักศึกษา",
          width: { wch: 20 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "ชั้นปี",
          width: { wch: 10 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "เบอร์โทรศัพท์",
          width: { wch: 20 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "เพื่อ",
          width: { wch: 30 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "จำนวน",
          width: { wch: 10 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "อาจารย์ผู้อนุมัติ",
          width: { wch: 30 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "สถานะ",
          width: { wch: 15 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
      ],
      data: pickListDis.map((val, key) => [
        { value: val.o_dis_id, style: { font: { sz: "12" } } },
        { value: moment(val.o_dis_date).format("DD/MM/YYYY"), style: { font: { sz: "12" } } },
        { value: val.std_name, style: { font: { sz: "12" } } },
        { value: val.std_id, style: { font: { sz: "12" } } },
        { value: val.std_level, style: { font: { sz: "12" } } },
        { value: val.std_tel, style: { font: { sz: "12" } } },
        { value: val.o_dis_descrip, style: { font: { sz: "12" } } },
        { value: val.o_dis_item_amount, style: { font: { sz: "12" } } },
        { value: val.prof_name, style: { font: { sz: "12" } } },
        { value: val.o_dis_status == 1 ? 'รอการอนุมัติ ': val.o_dis_status == 2 ? 'อนุมัติ' : 'ไม่อนุมัติ', style: { font: { sz: "12" } } },
      ]),
    },
  ];

  const DataBorSet = [
    {
      columns: [
        {
          title: "ORDER ID",
          width: { wch: 10 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "วันที่เบิก",
          width: { wch: 15 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "ชื่อ-นามสกุล",
          width: { wch: 25 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "รหัสนักศึกษา",
          width: { wch: 20 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "ชั้นปี",
          width: { wch: 10 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "เบอร์โทรศัพท์",
          width: { wch: 20 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "เพื่อ",
          width: { wch: 30 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "จำนวน",
          width: { wch: 10 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "อาจารย์ผู้อนุมัติ",
          width: { wch: 30 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "สถานะ",
          width: { wch: 15 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "วันที่คืน",
          width: { wch: 15 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
        {
          title: "",
          width: { wch: 15 },
          style: {
            font: { sz: "12", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
      ],
      data: pickListBor.map((val, key) => [
        { value: val.o_bor_id, style: { font: { sz: "12" } } },
        { value: moment(val.o_bor_date).format("DD/MM/YYYY"), style: { font: { sz: "12" } } },
        { value: val.std_name, style: { font: { sz: "12" } } },
        { value: val.std_id, style: { font: { sz: "12" } } },
        { value: val.std_level, style: { font: { sz: "12" } } },
        { value: val.std_tel, style: { font: { sz: "12" } } },
        { value: val.o_bor_descrip, style: { font: { sz: "12" } } },
        { value: val.o_bor_item_amount, style: { font: { sz: "12" } } },
        { value: val.prof_name, style: { font: { sz: "12" } } },
        { value: val.o_bor_status == 1 ? 'รอการอนุมัติ ': val.o_bor_status == 2 ? 'อนุมัติ' : 'ไม่อนุมัติ', style: { font: { sz: "12" } } },
        { value: moment(val.o_bor_returned_date).format("DD/MM/YYYY"), style: { font: { sz: "12" } } },
        { value: val.o_bor_returned == 1 ? 'คืนเเล้ว':'ยังไม่คืน', style: { font: { sz: "12" } } },

      ]),
    },
  ];

  return (
    <div
      className="col-9 col-lg-9 col-xl-9 col-mb-9 col-xs-9"
      style={{ width: "79.5%" }}
    >
      <div
        className="row"
        style={{ marginTop: "3rem", width: "70rem", marginLeft: "-6rem" }}
      >
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className="nav-link active report-name"
              aria-current="page"
              href="#"
            >
              สารเคมี
            </a>
          </li>
        </ul>
        <div className="row">
          <div className="card cardsidebar">
            <div className="card-body">
              <table className="table " style={{ marginTop: 10 }}>
                <tbody style={{ height: "14rem", verticalAlign: "middle" }}>
                  <tr className="table-name-report ">
                    <th scope="row">1</th>
                    <td>รายงานสารเคมี</td>
                    <td>
                      <ExcelFile
                        filename="รายงานรายการสารเคมี"
                        element={
                          <button type="button" className="btn btn-report">
                              <i
                          aria-hidden="true"
                          className="fas fa-print"
                          style={{ fontSize: 15 }}
                        />{" "}
                        
                            Export Excel
                          </button>
                        }
                      >
                        <ExcelSheet dataSet={DataChSet} name="Chemical" />
                      </ExcelFile>
                    </td>
                  </tr>
                  <tr className="table-name-report">
                    <th scope="row">2</th>
                    <td>รายงานเบิกใช้สารเคมี</td>
                    <td>
                    <ExcelFile
                        filename="รายงานการเบิกสารเคมี"
                        element={
                          <button type="button" className="btn btn-report">
                              <i
                          aria-hidden="true"
                          className="fas fa-print"
                          style={{ fontSize: 15 }}
                        />{" "}
                            Export Excel
                          </button>
                        }
                      >
                        <ExcelSheet dataSet={DataDisSet} name="รายงานการเบิกสารเคมี" />
                      </ExcelFile>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row"
        style={{ marginTop: "1rem", width: "70rem", marginLeft: "-6rem" }}
      >
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className="nav-link active report-name"
              aria-current="page"
              href="#"
            >
              อุปกรณ์
            </a>
          </li>
        </ul>
        <div className="row">
          <div className="card cardsidebar">
            <div className="card-body">
              <table className="table" style={{ marginTop: 10 }}>
                <tbody style={{ height: "14rem", verticalAlign: "middle" }}>
                  <tr className="table-name-report ">
                    <th scope="row">1</th>
                    <td>รายการอุปกรณ์</td>
                    {/* <td></td> */}
                    <td>
                    <ExcelFile
                        filename="รายงานรายการอุปกรณ์"
                        element={
                          <button type="button" className="btn btn-report">
                              <i
                          aria-hidden="true"
                          className="fas fa-print"
                          style={{ fontSize: 15 }}
                        />{" "}
                        
                            Export Excel
                          </button>
                        }
                      >
                        <ExcelSheet dataSet={DataToolSet} name="Chemical" />
                      </ExcelFile>
                    </td>
                  </tr>
                  <tr className="table-name-report">
                    <th scope="row">2</th>
                    <td>รายงานการเบิกใช้อุปกรณ์</td>
                    {/* <td></td> */}
                    <td>
                    <ExcelFile
                        filename="รายงานการเบิกใช้อุปกรณ์ "
                        element={
                          <button type="button" className="btn btn-report">
                              <i
                          aria-hidden="true"
                          className="fas fa-print"
                          style={{ fontSize: 15 }}
                        />{" "}
                        
                            Export Excel
                          </button>
                        }
                      >
                        <ExcelSheet dataSet={DataBorSet} name="Chemical" />
                      </ExcelFile>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
