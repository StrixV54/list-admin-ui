/* eslint-disable react/prop-types */
import { LiaEdit } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import { useRef, useState } from "react";
import { IoSaveOutline } from "react-icons/io5";

export default function SingleRow({ item, index, checkRow, deleteRow }) {
  const [toggleToSave, setToggleToSave] = useState(false);
  const nameDataRef = useRef();
  const emailDataRef = useRef();
  const roleDataRef = useRef();

  const handleSave = () => {
    if (
      !nameDataRef.current.value ||
      !emailDataRef.current.value ||
      !roleDataRef.current.value
    ) {
      alert("Enter some value");
      return;
    }

    item.name = nameDataRef.current.value;
    item.email = emailDataRef.current.value;
    item.role = roleDataRef.current.value;
    setToggleToSave(false);
  };

  const handleEdit = () => {
    if (toggleToSave) {
      nameDataRef.current.value = item.name;
      emailDataRef.current.value = item.email;
      roleDataRef.current.value = item.role;
    }
    setToggleToSave((prev) => !prev);
  };

  const deleteTab = () => {
    setToggleToSave(false);
    deleteRow(item?.id);
  };

  const checkTab = () => {
    checkRow(item?.id);
  };

  return (
    <>
      <tr
        key={index}
        className={`border-b-[1px] border-gray-400 ${
          item.checked ? "bg-gray-300" : ""
        }`}
      >
        <td className="py-4">
          <input
            type="checkbox"
            className="size-4 ml-4"
            checked={item?.checked}
            onChange={checkTab}
          />
        </td>
        <td>
          <input
            defaultValue={item?.name}
            ref={nameDataRef}
            name={item?.name}
            id={item?.name}
            disabled={!toggleToSave}
            className="py-1 rounded-sm disabled:outline-none outline outline-slate-300 outline-1 focus:ring-1 bg-transparent"
          />
        </td>
        <td>
          <input
            defaultValue={item?.email}
            ref={emailDataRef}
            name={item?.email}
            id={item?.email}
            disabled={!toggleToSave}
            className="py-1 rounded-sm disabled:outline-none outline outline-slate-300 outline-1 focus:ring-1 bg-transparent"
          />
        </td>
        <td>
          <input
            defaultValue={item?.role}
            ref={roleDataRef}
            name={item?.role}
            id={item?.role}
            disabled={!toggleToSave}
            className="py-1 rounded-sm disabled:outline-none outline outline-slate-300 outline-1 focus:ring-1 bg-transparent"
          />
        </td>
        <td className="gap-4 flex items-center py-4">
          <LiaEdit
            className="edit text-2xl cursor-pointer"
            onClick={handleEdit}
          />
          {toggleToSave && (
            <IoSaveOutline
              className="save text-2xl text-green-600 cursor-pointer"
              onClick={handleSave}
            />
          )}
          <AiOutlineDelete
            className="delete text-2xl text-red-600 cursor-pointer"
            onClick={deleteTab}
          />
        </td>
      </tr>
    </>
  );
}
