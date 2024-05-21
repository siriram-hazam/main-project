import React, { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const CreateActivityModal = ({ show, onClose }) => {
  const activityRef = useRef(null);
  const categoryRef = useRef(null);
  const departmentRef = useRef(null);

  const [poiRelationsCount, setPoiRelationsCount] = useState(1);
  const [fieldRefs, setFieldRefs] = useState({
    info_stored_period: [null],
    info_placed: [null],
    info_allowed_ps: [null],
    info_allowed_ps_condition: [null],
    info_access: [null],
    info_access_condition: [null],
    info_ps_usedbyrole_inside: [null],
    info_ps_sendto_outside: [null],
    info_ps_destroying: [null],
    info_ps_destroyer: [null],
  });

  // State to force re-render
  const [, setForceRender] = useState(false);

  const poiRelationsRefs = useRef([
    {
      info: null,
      poi_info_owner: null,
      poi_info_from: null,
      poi_info_format: null,
      poi_info_type: null,
      poi_info_objective: null,
      poi_info_lawbase: [null],
    },
  ]);

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
      setPoiRelationsCount(1);
      poiRelationsRefs.current = [
        {
          info: null,
          poi_info_owner: null,
          poi_info_from: null,
          poi_info_format: null,
          poi_info_type: null,
          poi_info_objective: null,
          poi_info_lawbase: [null],
        },
      ];
      setFieldRefs({
        info_stored_period: [null],
        info_placed: [null],
        info_allowed_ps: [null],
        info_allowed_ps_condition: [null],
        info_access: [null],
        info_access_condition: [null],
        info_ps_usedbyrole_inside: [null],
        info_ps_sendto_outside: [null],
        info_ps_destroying: [null],
        info_ps_destroyer: [null],
      });
    }
  }, [show]);

  const handleSubmit = () => {
    const poi_relations = poiRelationsRefs.current.map((ref) => ({
      info: ref.info.value,
      poi_info_owner: ref.poi_info_owner.value,
      poi_info_from: ref.poi_info_from.value,
      poi_info_format: ref.poi_info_format.value,
      poi_info_type: ref.poi_info_type.value,
      poi_info_objective: ref.poi_info_objective.value,
      poi_info_lawbase: ref.poi_info_lawbase.map(
        (lawbaseRef) => lawbaseRef.value
      ),
    }));

    const formData = {
      activity: activityRef.current.value,
      status: "pending",
      createBy: 1,
      company_id: 1,
      category: categoryRef.current.value,
      department_id: departmentRef.current.value,
      poi_relations,
      info_stored_period: fieldRefs.info_stored_period.map((ref) => ref.value),
      info_placed: fieldRefs.info_placed.map((ref) => ref.value),
      info_allowed_ps: fieldRefs.info_allowed_ps.map((ref) => ref.value),
      info_allowed_ps_condition: fieldRefs.info_allowed_ps_condition.map(
        (ref) => ref.value
      ),
      info_access: fieldRefs.info_access.map((ref) => ref.value),
      info_access_condition: fieldRefs.info_access_condition.map(
        (ref) => ref.value
      ),
      info_ps_usedbyrole_inside: fieldRefs.info_ps_usedbyrole_inside.map(
        (ref) => ref.value
      ),
      info_ps_sendto_outside: fieldRefs.info_ps_sendto_outside.map(
        (ref) => ref.value
      ),
      info_ps_destroying: fieldRefs.info_ps_destroying.map((ref) => ref.value),
      info_ps_destroyer: fieldRefs.info_ps_destroyer.map((ref) => ref.value),
    };

    console.log(JSON.stringify(formData));
  };

  const handleAddPoiRelation = () => {
    setPoiRelationsCount(poiRelationsCount + 1);
    poiRelationsRefs.current.push({
      info: null,
      poi_info_owner: null,
      poi_info_from: null,
      poi_info_format: null,
      poi_info_type: null,
      poi_info_objective: null,
      poi_info_lawbase: [null],
    });
    setForceRender((prev) => !prev); // Force re-render
  };

  const handleAddField = (field) => {
    setFieldRefs((prevRefs) => ({
      ...prevRefs,
      [field]: [...prevRefs[field], null],
    }));
  };

  const handleAddPoiInfoLawbase = (index) => {
    const newRefs = [...poiRelationsRefs.current];
    newRefs[index].poi_info_lawbase.push(null);
    poiRelationsRefs.current = newRefs;
    setForceRender((prev) => !prev); // Force re-render
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
                ref={activityRef}
                className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                type="text"
                placeholder="กรอกข้อมูล"
                style={{ minWidth: "200px", maxWidth: "75%" }}
              />
            </div>
            <div className="mb-1">
              หน่วยงานที่บันทึกรายการ :
              <input
                ref={departmentRef}
                className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                type="text"
                placeholder="กรอกข้อมูล"
                style={{ minWidth: "200px", maxWidth: "75%" }}
              />
            </div>
            <div className="mb-1">
              ประเภทงาน :
              <input
                ref={categoryRef}
                className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                type="text"
                placeholder="กรอกข้อมูล"
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
                <div className="table-row-group">
                  {Array.from({ length: poiRelationsCount }).map((_, index) => (
                    <div className="table-row" key={index}>
                      {Object.keys(poiRelationsRefs.current[index]).map(
                        (key) =>
                          key !== "poi_info_lawbase" && (
                            <div className="table-cell p-2 border" key={key}>
                              <input
                                ref={(el) =>
                                  (poiRelationsRefs.current[index][key] = el)
                                }
                                className="placeholder-gray-500 border rounded-md px-3 pl-2 py-0.5 box-border mt-2 mr-2 w-full"
                                type="text"
                                placeholder="กรอกข้อมูล"
                              />
                            </div>
                          )
                      )}
                      <div className="table-cell p-2 border">
                        {poiRelationsRefs.current[index].poi_info_lawbase.map(
                          (_, idx) => (
                            <input
                              key={idx}
                              ref={(el) =>
                                (poiRelationsRefs.current[
                                  index
                                ].poi_info_lawbase[idx] = el)
                              }
                              className="placeholder-gray-500 border rounded-md px-3 pl-2 py-0.5 box-border mt-2 mr-2 w-full block"
                              type="text"
                              placeholder="กรอกข้อมูล"
                            />
                          )
                        )}
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
                  {fieldRefs[field].map((_, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (fieldRefs[field][idx] = el)}
                      className="placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border"
                      type="text"
                      placeholder="กรอกข้อมูล"
                      style={{ minWidth: "200px", maxWidth: "75%" }}
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
