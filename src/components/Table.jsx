/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import SingleRow from "./SingleRow";

export default function Table({ usersDataList, setUsersDataList }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);

  const filteredData = usersDataList?.filter((item) => {
    if (searchText !== "") {
      return (
        item?.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.email.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.role.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return true;
  });

  const currentPageList = filteredData?.slice(
    10 * (currentPage - 1),
    10 * currentPage
  );

  useEffect(() => {
    let pages = Math.ceil(filteredData?.length / 10);
    setTotalPage(pages);
  }, [filteredData?.length]);

  const backSingle = () => {
    isSelectAllChecked && selectAll();
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const forwardSingle = () => {
    isSelectAllChecked && selectAll();
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const backToFirst = () => {
    isSelectAllChecked && selectAll();
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const forwardToLast = () => {
    isSelectAllChecked && selectAll();
    if (currentPage !== totalPage) {
      setCurrentPage(totalPage);
    }
  };

  const handlePageClick = (idx) => {
    isSelectAllChecked && selectAll();
    setCurrentPage(idx + 1);
  };

  const deleteRow = (id) => {
    console.log(id, usersDataList?.length);
    setUsersDataList(usersDataList.filter((item) => id !== item.id));
  };

  const selectAll = () => {
    let array = currentPageList.reduce((acc, obj) => {
      acc.push(obj.id);
      return acc;
    }, []);
    setUsersDataList(
      usersDataList?.map((item) => {
        return array.includes(item.id)
          ? { ...item, checked: !isSelectAllChecked ? true : false }
          : item;
      })
    );
    setIsSelectAllChecked((prev) => !prev);
  };

  const checkRow = (id) => {
    setUsersDataList(
      usersDataList?.map((item) => {
        return item.id === id
          ? { ...item, checked: item.checked ? false : true }
          : item;
      })
    );
  };

  const deleteSelected = () => {
    setIsSelectAllChecked(false);
    setUsersDataList(usersDataList?.filter((item) => item.checked === false));
  };

  const handleEnter = (event) => {
    if (event.code === "Enter") setSearchText(event.target.value);
  };

  return (
    <div className="container sm:h-[735px] sm:w-[1650px] h-full w-full flex flex-col">
      <SearchBar handleEnter={handleEnter} />
      <table className="table-fixed w-full text-left">
        <thead className="border-b-[1px] border-gray-400">
          <tr>
            <th className="p-4">
              <input
                type="checkbox"
                className="size-4 text-xl"
                checked={isSelectAllChecked}
                onChange={selectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPageList?.length > 0 &&
            currentPageList.map((item, idx) => (
              <SingleRow
                key={item?.id}
                index={idx}
                item={item}
                deleteRow={deleteRow}
                checkRow={checkRow}
              />
            ))}
        </tbody>
      </table>
      <div className="h-full flex-1">
        {currentPageList?.length === 0 && (
          <div className="text-center mt-10">No Records Found</div>
        )}
      </div>
      <div className="flex w-full p-4 sm:flex-row flex-col">
        <button
          className="rounded-3xl bg-[#FF5071] text-white py-1 px-4"
          onClick={deleteSelected}
        >
          Delete Selected
        </button>
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
          backSingle={backSingle}
          forwardSingle={forwardSingle}
          backToFirst={backToFirst}
          forwardToLast={forwardToLast}
        />
      </div>
    </div>
  );
}
