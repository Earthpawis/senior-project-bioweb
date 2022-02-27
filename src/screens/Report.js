import React from "react";
import "../css/report.css";
import ReactExport from "react-data-export";
import { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import { rChemicalList, rToolsList } from "../route/BackRoute";
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

  useEffect(() => {
    getChemical();
    getEquipment();
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
                        filename="Chemical List"
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
                    <td>รายงานยอดคงเหลือสารเคมี</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-report "
                        style={{ backgroundColor: "#63B0C0", color: "#fff" }}
                      >
                        <i
                          aria-hidden="true"
                          className="fas fa-print"
                          style={{ fontSize: 15 }}
                        />{" "}
                        ดาวน์โหลด
                      </button>
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
                    <td>รายงานการเบิกใช้อุปกรณ์</td>
                    {/* <td></td> */}
                    <td>
                    <ExcelFile
                        filename="Tool List"
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
                    <td>รายงานยอดคงเหลืออุปกรณ์</td>
                    {/* <td></td> */}
                    <td>
                      <button
                        type="button"
                        className="btn btn-report "
                        style={{ backgroundColor: "#63B0C0", color: "#fff" }}
                      >
                        <i
                          aria-hidden="true"
                          className="fas fa-print"
                          style={{ fontSize: 15 }}
                        />{" "}
                        ดาวน์โหลด
                      </button>
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
