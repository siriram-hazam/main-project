import React, { useState } from "react";

import InfoActivityModal from "../InfoActivityModal.jsx";
import EditActivityModal from "../EditActivityModal.jsx";
import CreateActivityModal from "../CreateActivityModal.jsx";

export default function ActivitiesPage() {
  const [showInfoActivityModal, setShowInfoActivityModal] = useState(false);
  const toggleInfoActivityModal = () => {
    setShowInfoActivityModal(!showInfoActivityModal);
  };
  const [showCreateactivityModal, setShowCreateactivityModal] = useState(false);
  const toggleCreateactivityModal = () => {
    setShowCreateactivityModal(!showCreateactivityModal);
  };
  const [showEditactivityModal, setShowEditactivityModal] = useState(false);
  const toggleEditactivityModal = () => {
    setShowEditactivityModal(!showEditactivityModal);
  };
  return (
    <>
      <div className="flex mb-5">
        <div className="ml-auto space-x-2 flex-nowrap text-sm">
          <button
            className="bg-neutral-300 p-2 rounded-3xl px-3 text-gray-700"
            onClick={() => setShowCreateactivityModal(!showCreateactivityModal)}
          >
            Add Activities
          </button>
          <button className="bg-neutral-300 p-2 rounded-3xl px-3 text-gray-700">
            Delete Activities
          </button>
        </div>
      </div>

      <div className="table w-full text-sm">
        <div className="table-header-group bg-neutral-200 font-semibold text-neutral-800">
          <div className="table-row">
            <div className="table-cell py-1 px-2 border-b-2 border-neutral-300">
              กิจกรรมงานที่บันทึก
            </div>
            <div className="table-cell py-1 px-2 border-b-2 border-neutral-300">
              แผนก
            </div>
            <div className="table-cell py-1 px-2 border-b-2 border-neutral-300">
              สถานะการตรวจสอบ
            </div>
            <div className="table-cell py-1 px-2 border-b-2 border-neutral-300">
              เวลาที่บันทึก
            </div>
            <div className="table-cell py-1 px-2 border-b-2 border-neutral-300">
              ผู้บันทึก
            </div>
            <div className="table-cell py-1 px-2 border-b-2 border-neutral-300"></div>
            <div className="table-cell py-1 px-2 border-b-2 border-neutral-300"></div>
            <div className="table-cell py-1 px-2 border-b-2 border-neutral-300"></div>
          </div>
        </div>
        <div className="table-row-group hover:bg-gray-100 cursor-pointer text-neutral-600">
          <div className="table-row">
            <div className="table-cell py-2 px-2 border-b-2 border-neutral-300">
              ข้อมูลกิจกรรม 1
            </div>
            <div className="table-cell py-2 px-2 border-b-2 border-neutral-300">
              ข้อมูลแผนก 1
            </div>
            <div className="table-cell py-2 px-2 border-b-2 border-neutral-300">
              ข้อมูลสถานะ 1
            </div>
            <div className="table-cell py-2 px-2 border-b-2 border-neutral-300">
              ข้อมูลเวลา 1
            </div>
            <div className="table-cell py-2 px-2 border-b-2 border-neutral-300">
              ข้อมูลผู้บันทึก 1
            </div>
            <div className="table-cell py-2 px-2 border-b-2 border-neutral-300">
              <button
                className="text-neutral-500 hover:text-black"
                onClick={toggleInfoActivityModal}
              >
                ดู
              </button>
            </div>
            <div className="table-cell py-2 px-2 border-b-2 border-neutral-300">
              <button
                className="text-neutral-500 hover:text-black"
                onClick={toggleEditactivityModal}
              >
                แก้ไข
              </button>
            </div>
            <div className="table-cell py-2 px-2 border-b-2 border-neutral-300">
              <input type="checkbox" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
