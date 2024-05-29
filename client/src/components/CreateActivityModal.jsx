import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const CreateActivityModal = ({ show, onClose }) => {
  const [activity, setActivity] = useState("");
  const [category, setCategory] = useState("");

  const [department, setDepartment] = useState("");
  const [showOptionsDepartment, setShowOptionsDepartment] = useState(false);
  const [filteredOptionsDepartment, setFilteredOptionsDepartment] = useState(
    []
  );
  const jsonOptionsDepartment = [
    { id: 1, name: "IT" },
    { id: 2, name: "HR" },
    { id: 3, name: "Finance" },
    { id: 4, name: "Marketing" },
  ];
  useEffect(() => {
    setFilteredOptionsDepartment(
      department
        ? jsonOptionsDepartment.filter((option) =>
            option.name.toLowerCase().includes(department.toLowerCase())
          )
        : jsonOptionsDepartment
    );
  }, [department, jsonOptionsDepartment]);
  const handleInputFocusDepartment = () => {
    setShowOptionsDepartment(true);
  };
  const handleOptionClickDepartment = (option) => {
    setDepartment(option.name);
    setShowOptionsDepartment(false);
  };

  const [poiRelations, setPoiRelations] = useState([
    {
      info: "",
      poi_info_owner: "",
      poi_info_from: "",
      poi_info_format: "",
      poi_info_type: "",
      poi_info_objective: "",
      poi_info_lawbase: [""],
    },
  ]);

  const [fieldRefs, setFieldRefs] = useState({
    info_stored_period: [""],
    info_placed: [""],
    info_allowed_ps: [""],
    info_allowed_ps_condition: [""],
    info_access: [""],
    info_access_condition: [""],
    info_ps_usedbyrole_inside: [""],
    info_ps_sendto_outside: [""],
    info_ps_destroying: [""],
    info_ps_destroyer: [""],
  });

  const labels = {
    info_stored_period: "ระยะเวลาที่จัดเก็บข้อมูล",
    info_placed: "สถานที่จัดเก็บข้อมูล",
    info_allowed_ps: "ผู้ที่สามารถเข้าถึงข้อมูล",
    info_allowed_ps_condition: "เงื่อนไขการเข้าถึงข้อมูล",
    info_access: "การเข้าถึงข้อมูล",
    info_access_condition: "เงื่อนไขการเข้าถึงข้อมูล",
    info_ps_usedbyrole_inside: "การใช้ข้อมูลภายในองค์กร",
    info_ps_sendto_outside: "การส่งข้อมูลไปภายนอก",
    info_ps_destroying: "การทำลายข้อมูล",
    info_ps_destroyer: "ผู้ทำลายข้อมูล",
  };

  useEffect(() => {
    if (show) {
      setActivity("");
      setCategory("");
      setDepartment("");
      setPoiRelations([
        {
          info: "",
          poi_info_owner: "",
          poi_info_from: "",
          poi_info_format: "",
          poi_info_type: "",
          poi_info_objective: "",
          poi_info_lawbase: [""],
        },
      ]);
      setFieldRefs({
        info_stored_period: [""],
        info_placed: [""],
        info_allowed_ps: [""],
        info_allowed_ps_condition: [""],
        info_access: [""],
        info_access_condition: [""],
        info_ps_usedbyrole_inside: [""],
        info_ps_sendto_outside: [""],
        info_ps_destroying: [""],
        info_ps_destroyer: [""],
      });
    }
  }, [show]);

  const handleSubmit = () => {
    const formData = {
      activity,
      status: "pending",
      createBy: 1,
      company_id: 1,
      category,
      department_id: department,
      poi_relations: poiRelations,
      info_stored_period: fieldRefs.info_stored_period,
      info_placed: fieldRefs.info_placed,
      info_allowed_ps: fieldRefs.info_allowed_ps,
      info_allowed_ps_condition: fieldRefs.info_allowed_ps_condition,
      info_access: fieldRefs.info_access,
      info_access_condition: fieldRefs.info_access_condition,
      info_ps_usedbyrole_inside: fieldRefs.info_ps_usedbyrole_inside,
      info_ps_sendto_outside: fieldRefs.info_ps_sendto_outside,
      info_ps_destroying: fieldRefs.info_ps_destroying,
      info_ps_destroyer: fieldRefs.info_ps_destroyer,
    };

    console.log(JSON.stringify(formData));
  };

  const handleAddPoiRelation = () => {
    setPoiRelations([
      ...poiRelations,
      {
        info: "",
        poi_info_owner: "",
        poi_info_from: "",
        poi_info_format: "",
        poi_info_type: "",
        poi_info_objective: "",
        poi_info_lawbase: [""],
      },
    ]);
  };

  const handleAddField = (field) => {
    setFieldRefs((prevRefs) => ({
      ...prevRefs,
      [field]: [...prevRefs[field], ""],
    }));
  };

  const handleAddPoiInfoLawbase = (index) => {
    const newRelations = [...poiRelations];
    newRelations[index].poi_info_lawbase.push("");
    setPoiRelations(newRelations);
  };

  const handlePoiRelationChange = (index, key, value) => {
    const newRelations = [...poiRelations];
    newRelations[index][key] = value;
    setPoiRelations(newRelations);
  };

  const handlePoiInfoLawbaseChange = (index, idx, value) => {
    const newRelations = [...poiRelations];
    newRelations[index].poi_info_lawbase[idx] = value;
    setPoiRelations(newRelations);
  };

  const handleFieldChange = (field, idx, value) => {
    const newFields = { ...fieldRefs };
    newFields[field][idx] = value;
    setFieldRefs(newFields);
  };

  return (
    <>
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-11/12 w-11/12 max-h-dvh text-sm overflow-auto">
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
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                type="text"
                placeholder="กรอกข้อมูล"
                style={{ minWidth: "200px", maxWidth: "75%" }}
              />
            </div>
            <div className="relative mb-1">
              หน่วยงานที่บันทึกรายการ :
              <input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                onFocus={handleInputFocusDepartment}
                className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                type="text"
                placeholder="กรอกข้อมูล"
                style={{ minWidth: "200px", maxWidth: "75%" }}
              />
              {showOptionsDepartment && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  {filteredOptionsDepartment.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => handleOptionClickDepartment(option)}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                    >
                      {option.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mb-1">
              ประเภทงาน :
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                type="text"
                placeholder="กรอกข้อมูล"
                style={{ minWidth: "200px", maxWidth: "75%" }}
              />
            </div>
            <div className="w-full h-full overflow-auto p-2 pb-3 mt-2">
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
                <div className="table-row-group">
                  {poiRelations.map((relation, index) => (
                    <div className="table-row" key={index}>
                      {Object.keys(relation).map(
                        (key) =>
                          key !== "poi_info_lawbase" && (
                            <div key={key} className="table-cell p-2 border">
                              <input
                                className="placeholder-gray-500 border rounded-md px-3 pl-2 py-0.5 box-border mt-2 mr-2 w-full"
                                type="text"
                                placeholder="กรอกข้อมูล"
                                value={relation[key]}
                                onChange={(e) =>
                                  handlePoiRelationChange(
                                    index,
                                    key,
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          )
                      )}
                      <div className="table-cell p-2 border">
                        {relation.poi_info_lawbase.map((lawbase, idx) => (
                          <input
                            key={idx}
                            className="placeholder-gray-500 border rounded-md px-3 pl-2 py-0.5 box-border mt-2 mr-2 w-full block"
                            type="text"
                            placeholder="กรอกข้อมูล"
                            value={lawbase}
                            onChange={(e) =>
                              handlePoiInfoLawbaseChange(
                                index,
                                idx,
                                e.target.value
                              )
                            }
                          />
                        ))}
                        <button
                          className="mt-2 px-3 py-2 bg-blue-500 text-black rounded hover:text-neutral-400"
                          onClick={() => handleAddPoiInfoLawbase(index)}
                        >
                          เพิ่มฐานทางกฏหมาย
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="mt-2 px-3 py-2 bg-blue-500 text-black rounded hover:text-neutral-400"
                onClick={handleAddPoiRelation}
              >
                เพิ่มข้อมูลที่ประมวลผล
              </button>
            </div>

            {Object.keys(fieldRefs).map((field, index) => (
              <div className="flex max-w-full" key={index}>
                <div className="mb-1">
                  {labels[field]}:
                  {fieldRefs[field].map((fieldValue, idx) => (
                    <input
                      key={idx}
                      className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                      type="text"
                      placeholder="กรอกข้อมูล"
                      style={{ minWidth: "200px", maxWidth: "75%" }}
                      value={fieldValue}
                      onChange={(e) =>
                        handleFieldChange(field, idx, e.target.value)
                      }
                    />
                  ))}
                </div>
                <button
                  className="ml-3 px-2 py-1 bg-blue-500 text-black rounded hover:text-neutral-400"
                  onClick={() => handleAddField(field)}
                >
                  เพิ่ม
                </button>
              </div>
            ))}

            <div className="flex justify-between mt-3">
              <p></p>
              <button
                className="px-2 py-1 text-black rounded hover:text-neutral-400"
                onClick={handleSubmit}
              >
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
