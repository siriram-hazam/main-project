import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const EditModal = ({ show, onClose }) => {
  return (
    <>
      {/* Modal Edit Activities */}
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-11/12 h-5/6">
            {/* เนื้อหาของโมเดล */}
            <div className="flex justify-between items-center mb-2">
              <p></p>
              <IoCloseOutline
                className="w-8 h-8 cursor-pointer"
                onClick={onClose}
              />
            </div>
            <div>แก้ไข</div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;
