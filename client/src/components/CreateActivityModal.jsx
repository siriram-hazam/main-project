import React, { useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import UseAutoResizeInput from "./UseAutoResizeInput.jsx";
import UseDynamicInputs from "./UseDynamicInputs.jsx";

const CreateActivityModal = ({ show, onClose }) => {
  const { inputRef: inputRef1, resizeInput: resizeInput1 } =
    UseAutoResizeInput();
  const { inputRef: inputRef2, resizeInput: resizeInput2 } =
    UseAutoResizeInput();
  const { inputRef: inputRef3, resizeInput: resizeInput3 } =
    UseAutoResizeInput();
  const { inputRef: inputRef4, resizeInput: resizeInput4 } =
    UseAutoResizeInput();
  const { inputRef: inputRef5, resizeInput: resizeInput5 } =
    UseAutoResizeInput();
  const { inputRef: inputRef6, resizeInput: resizeInput6 } =
    UseAutoResizeInput();
  const { inputRef: inputRef7, resizeInput: resizeInput7 } =
    UseAutoResizeInput();
  const { inputRef: inputRef8, resizeInput: resizeInput8 } =
    UseAutoResizeInput();
  const { inputRef: inputRef9, resizeInput: resizeInput9 } =
    UseAutoResizeInput();
  const { inputRef: inputRef10, resizeInput: resizeInput10 } =
    UseAutoResizeInput();
  const { inputRef: inputRef11, resizeInput: resizeInput11 } =
    UseAutoResizeInput();
  const { inputRef: inputRef12, resizeInput: resizeInput12 } =
    UseAutoResizeInput();
  const { inputRef: inputRef13, resizeInput: resizeInput13 } =
    UseAutoResizeInput();

  const { containerRef: containerRef1, addInput: addInput1 } =
    UseDynamicInputs();
  const { containerRef: containerRef2, addInput: addInput2 } =
    UseDynamicInputs();
  const { containerRef: containerRef3, addInput: addInput3 } =
    UseDynamicInputs();
  const { containerRef: containerRef4, addInput: addInput4 } =
    UseDynamicInputs();
  const { containerRef: containerRef5, addInput: addInput5 } =
    UseDynamicInputs();
  const { containerRef: containerRef6, addInput: addInput6 } =
    UseDynamicInputs();
  const { containerRef: containerRef7, addInput: addInput7 } =
    UseDynamicInputs();
  const { containerRef: containerRef8, addInput: addInput8 } =
    UseDynamicInputs();
  const { containerRef: containerRef9, addInput: addInput9 } =
    UseDynamicInputs();
  const { containerRef: containerRef10, addInput: addInput10 } =
    UseDynamicInputs();

  const tableBodyRef = useRef(null);

  // const [formData, setFormData] = useState({
  //   activity: "",
  //   status: "pending",
  //   createBy: "",
  //   company_id: "",
  //   category: "",
  //   department_id: "",
  //   poi_relations: [
  //     {
  //       info: "",
  //       poi_info_owner: "",
  //       poi_info_from: "",
  //       poi_info_format: "",
  //       poi_info_type: "",
  //       poi_info_objective: "",
  //       poi_info_lawbase: [],
  //     },
  //   ],
  //   info_stored_period: [],
  //   info_placed: [],
  //   info_allowed_ps: [],
  //   info_allowed_ps_condition: [],
  //   info_access: [],
  //   info_access_condition: [],
  //   info_ps_usedbyrole_inside: [],
  //   info_ps_sendto_outside: [],
  //   info_ps_destroying: [],
  //   info_ps_destroyer: [],
  // });

  const handleAddRow = () => {
    const newRow = document.createElement("div");
    newRow.className = "table-row";

    const fields = [
      "info",
      "poi_info_owner",
      "poi_info_from",
      "poi_info_format",
      "poi_info_type",
      "poi_info_objective",
      "poi_info_lawbase",
    ];
    fields.forEach(() => {
      const newCell = document.createElement("div");
      newCell.className = "table-cell p-2 border";
      const newInput = document.createElement("input");
      newInput.className =
        "placeholder-gray-500 border rounded-md px-3 pl-2 py-0.5 box-border mt-2 mr-2 w-full";
      newInput.type = "text";
      newCell.appendChild(newInput);
      newRow.appendChild(newCell);
    });

    tableBodyRef.current.appendChild(newRow);
  };

  return (
    <>
      {/* Modal Create Activities */}
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-11/12 w-11/12 max-h-dvh text-sm overflow-auto">
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
              {/* <select
                id="cars"
                name="cars"
                className="ml-1 shadow-sm border w-60"
              >
                <option value="volvo">Volvo</option>
                <option value="saab">Saabaaaaaaaaa</option>
                <option value="fiat">Fiataaaaa</option>
                <option value="audi">Audi</option>
              </select> */}
              <input
                ref={inputRef2}
                className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                type="text"
                placeholder="กรอกข้อมูล"
                onChange={resizeInput2}
                style={{ minWidth: "200px", maxWidth: "75%" }}
              />
            </div>
            <div className="mb-1">
              ประเภทงาน :
              <input
                ref={inputRef3}
                className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                type="text"
                placeholder="กรอกข้อมูล"
                onChange={resizeInput3}
                style={{ minWidth: "200px", maxWidth: "75%" }}
              />
            </div>
            <div className="w-full h-full overflow-auto hover:overflow-auto p-2 pb-3 mt-2">
              <div className="table w-fit border-collapse">
                <div className="table-header-group bg-gray-200">
                  <div className="table-row">
                    <div className="table-cell p-2 border">
                      ข้อมูลที่ประมวลผล
                    </div>
                    <div className="table-cell p-2 border">
                      เจ้าของข้อมูลส่วนบุคคล
                    </div>
                    <div className="table-cell p-2 border">
                      ได้รับข้อมูลมาจาก
                    </div>
                    <div className="table-cell p-2 border">รูปแบบของข้อมูล</div>
                    <div className="table-cell p-2 border">ประเภทของข้อมูล</div>
                    <div className="table-cell p-2 border">
                      วัตถุประสงค์ของการเก็บรวมรวมข้อมูล
                    </div>
                    <div className="table-cell p-2 border">
                      ฐานทางกฏหมายสำหรับการประมวลผลข้อมูลส่วนบุคคล
                    </div>
                  </div>
                </div>
                <div className="table-row-group" ref={tableBodyRef}>
                  <div className="table-row">
                    <div className="table-cell p-2 border">
                      <input
                        className="placeholder-gray-500 border rounded-md px-3 pl-2 py-0.5 box-border mt-2 mr-2 w-full"
                        type="text"
                      />
                    </div>
                    <div className="table-cell p-2 border">
                      <input
                        className="placeholder-gray-500 border rounded-md px-3 pl-2 py-0.5 box-border mt-2 mr-2 w-full"
                        type="text"
                      />
                    </div>
                    <div className="table-cell p-2 border">
                      <input
                        className="placeholder-gray-500 border rounded-md px-3 pl-2 py-0.5 box-border mt-2 mr-2 w-full"
                        type="text"
                      />
                    </div>
                    <div className="table-cell p-2 border">
                      <input
                        className="placeholder-gray-500 border rounded-md px-3 pl-2 py-0.5 box-border mt-2 mr-2 w-full"
                        type="text"
                      />
                    </div>
                    <div className="table-cell p-2 border">
                      <input
                        className="placeholder-gray-500 border rounded-md px-3 pl-2 py-0.5 box-border mt-2 mr-2 w-full"
                        type="text"
                      />
                    </div>
                    <div className="table-cell p-2 border">
                      <input
                        className="placeholder-gray-500 border rounded-md px-3 pl-2 py-0.5 box-border mt-2 mr-2 w-full"
                        type="text"
                      />
                    </div>
                    <div className="table-cell p-2 border">
                      <input
                        className="placeholder-gray-500 border rounded-md px-3 pl-2 py-0.5 box-border mt-2 mr-2 w-full"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="mt-2 px-3 py-2 bg-blue-500 text-black rounded hover:text-neutral-400"
                onClick={handleAddRow}
              >
                เพิ่มข้อมูลที่ประมวลผล
              </button>
            </div>

            <div className="flex max-w-full">
              <div className="mb-1" ref={containerRef1}>
                ระยะเวลาการจัดเก็บ (ปี/นับจาก) :
                <input
                  ref={inputRef4}
                  className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                  type="text"
                  placeholder="กรอกข้อมูล"
                  onChange={resizeInput4}
                  style={{ minWidth: "200px", maxWidth: "75%" }}
                />
              </div>
              <button
                className="ml-3 px-2 py-1 bg-blue-500 text-black rounded hover:text-neutral-400"
                onClick={addInput1}
              >
                +
              </button>
            </div>

            <div className="flex max-w-full">
              <div className="mb-1" ref={containerRef2}>
                แหล่งจัดเก็บข้อมูลส่วนบุคคล :
                <input
                  ref={inputRef5}
                  className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                  type="text"
                  placeholder="กรอกข้อมูล"
                  onChange={resizeInput5}
                  style={{ minWidth: "200px", maxWidth: "75%" }}
                />
              </div>
              <button
                className="ml-3 px-2 py-1 bg-blue-500 text-black rounded hover:text-neutral-400"
                onClick={addInput2}
              >
                +
              </button>
            </div>

            <div className="flex max-w-full">
              <div className="mb-1" ref={containerRef3}>
                บุคคลที่มีสิทธิเข้าถึงข้อมูล :
                <input
                  ref={inputRef6}
                  className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                  type="text"
                  placeholder="กรอกข้อมูล"
                  onChange={resizeInput6}
                  style={{ minWidth: "200px", maxWidth: "75%" }}
                />
              </div>
              <button
                className="ml-3 px-2 py-1 bg-blue-500 text-black rounded hover:text-neutral-400"
                onClick={addInput3}
              >
                +
              </button>
            </div>

            <div className="flex max-w-full">
              <div className="mb-1" ref={containerRef4}>
                เงื่อนไขเกี่ยวกับบุคคลที่มีสิทธิเข้าถึงข้อมูล :
                <input
                  ref={inputRef7}
                  className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                  type="text"
                  placeholder="กรอกข้อมูล"
                  onChange={resizeInput7}
                  style={{ minWidth: "200px", maxWidth: "75%" }}
                />
              </div>
              <button
                className="ml-3 px-2 py-1 bg-blue-500 text-black rounded hover:text-neutral-400"
                onClick={addInput4}
              >
                +
              </button>
            </div>

            <div className="flex max-w-full">
              <div className="mb-1" ref={containerRef5}>
                วิธีการเข้าถึงข้อมูล :
                <input
                  ref={inputRef8}
                  className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                  type="text"
                  placeholder="กรอกข้อมูล"
                  onChange={resizeInput8}
                  style={{ minWidth: "200px", maxWidth: "75%" }}
                />
              </div>
              <button
                className="ml-3 px-2 py-1 bg-blue-500 text-black rounded hover:text-neutral-400"
                onClick={addInput5}
              >
                +
              </button>
            </div>

            <div className="flex max-w-full">
              <div className="mb-1" ref={containerRef6}>
                เงื่อนไขในการเข้าถึงข้อมูล :
                <input
                  ref={inputRef9}
                  className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                  type="text"
                  placeholder="กรอกข้อมูล"
                  onChange={resizeInput9}
                  style={{ minWidth: "200px", maxWidth: "75%" }}
                />
              </div>
              <button
                className="ml-3 px-2 py-1 bg-blue-500 text-black rounded hover:text-neutral-400"
                onClick={addInput6}
              >
                +
              </button>
            </div>

            <div className="flex max-w-full">
              <div className="mb-1" ref={containerRef7}>
                ข้อมูลส่วนบุคคลถูกใช้โดยตำแหน่งใดบ้าง (ภายในองค์กร) :
                <input
                  ref={inputRef10}
                  className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                  type="text"
                  placeholder="กรอกข้อมูล"
                  onChange={resizeInput10}
                  style={{ minWidth: "200px", maxWidth: "75%" }}
                />
              </div>
              <button
                className="ml-3 px-2 py-1 bg-blue-500 text-black rounded hover:text-neutral-400"
                onClick={addInput7}
              >
                +
              </button>
            </div>

            <div className="flex max-w-full">
              <div className="mb-1" ref={containerRef8}>
                ข้อมูลส่วนบุคคลถูกส่งต่อ/เปิดเภยให้ใครบ้าง (ภายนอกองค์กร) :
                <input
                  ref={inputRef11}
                  className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                  type="text"
                  placeholder="กรอกข้อมูล"
                  onChange={resizeInput11}
                  style={{ minWidth: "200px", maxWidth: "75%" }}
                />
              </div>
              <button
                className="ml-3 px-2 py-1 bg-blue-500 text-black rounded hover:text-neutral-400"
                onClick={addInput8}
              >
                +
              </button>
            </div>

            <div className="flex max-w-full">
              <div className="mb-1" ref={containerRef9}>
                วิธีการทำลายข้อมูลส่วนบุคคล :
                <input
                  ref={inputRef12}
                  className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                  type="text"
                  placeholder="กรอกข้อมูล"
                  onChange={resizeInput12}
                  style={{ minWidth: "200px", maxWidth: "75%" }}
                />
              </div>
              <button
                className="ml-3 px-2 py-1 bg-blue-500 text-black rounded hover:text-neutral-400"
                onClick={addInput9}
              >
                +
              </button>
            </div>

            <div className="flex max-w-full">
              <div className="mb-1" ref={containerRef10}>
                ผู้อนุมัติการทำลายข้อมูลส่วนบุคคล :
                <input
                  ref={inputRef13}
                  className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                  type="text"
                  placeholder="กรอกข้อมูล"
                  onChange={resizeInput13}
                  style={{ minWidth: "200px", maxWidth: "75%" }}
                />
              </div>
              <button
                className="ml-3 px-2 py-1 bg-blue-500 text-black rounded hover:text-neutral-400"
                onClick={addInput10}
              >
                +
              </button>
            </div>

            <div className="flex justify-between mt-3">
              <p></p>
              <button className="px-2 py-1 text-black rounded hover:text-neutral-400">
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
