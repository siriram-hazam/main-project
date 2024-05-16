import React from "react";
import { IoCloseOutline } from "react-icons/io5";

import UseAutoResizeInput from "./UseAutoResizeInput.jsx";

const CreateActivityModal = ({ show, onClose }) => {
  const { inputRef: inputRef1, resizeInput: resizeInput1 } =
    UseAutoResizeInput();

  return (
    <>
      {/* Modal Create Activities */}
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-11/12 w-11/12 h-5/6">
            {/* เนื้อหาของโมเดล */}
            <div className="flex justify-between items-center mb-3 pb-3 border-b-4">
              <p className="text-xl font-semibold">สร้างกิจกรรมงาน</p>
              <IoCloseOutline
                className="w-8 h-8 cursor-pointer"
                onClick={onClose}
              />
            </div>
            <div className="mb-1">
              กิจกรรมงานที่บันทึกรายการ :
              <input
                className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                ref={inputRef1}
                type="text"
                placeholder="กรอกข้อมูล"
                onChange={resizeInput1}
                style={{ minWidth: "200px", maxWidth: "75%" }}
              />
            </div>
            <div className="mb-1">
              หน่วยงานที่บันทึกรายการ :
              {/* <input className="ml-1 shadow-sm min-w-60 border" type="text" /> */}
              <select
                id="cars"
                name="cars"
                className="ml-1 shadow-sm border w-60"
              >
                <option value="volvo">Volvo</option>
                <option value="saab">Saabaaaaaaaaa</option>
                <option value="fiat">Fiataaaaa</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <div className="w-full overflow-auto hover:overflow-auto pb-3 mt-2">
              <div className="table w-fit text-md">
                <div className="table-header-group">
                  <div className="table-row">
                    <div className="table-cell whitespace-nowrap">asd</div>
                    <div className="table-cell whitespace-nowrap">asd</div>
                    <div className="table-cell whitespace-nowrap">asd</div>
                    <div className="table-cell whitespace-nowrap">asd</div>
                  </div>
                </div>
                <div className="table-row-group">
                  <div className="table-row">
                    <div className="table-cell whitespace-nowrap">
                      <input type="text" />
                    </div>
                    <div className="table-cell whitespace-nowrap">asd</div>
                    <div className="table-cell whitespace-nowrap">asd</div>
                    <div className="table-cell whitespace-nowrap">asd</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <p></p>
              <button className="border-2 px-2 py-1 rounded-xl text-neutral-500 bg-neutral-200 border-neutral-300 hover:bg-neutral-800 hover:text-neutral-300 hover:border-neutral-300">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateActivityModal;
