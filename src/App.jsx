import { useEffect, useState } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
} from "react-icons/md";
import {} from "react-icons/md";
import TableDataRow from "./components/TableTab";

function App() {
  const [usersDataList, setUsersDataList] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  // const [searchedList, setSearchedList] = useState(null);
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

  const fetchData = async () => {
    const res = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    const result = await res.json();
    return result;
  };

  useEffect(() => {
    fetchData()
      .then((res) => {
        setUsersDataList(res?.map((item) => ({ checked: false, ...item })));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let pages = Math.ceil(filteredData?.length / 10);
    setTotalPage(pages);
  }, [filteredData?.length]);

  const isSingleBackDisabled = currentPage === 1;
  const isBackToFirstDisabled = isSingleBackDisabled;
  const isSingleForwardDisabled = currentPage === totalPage;
  console.log("first");
  const isForwardToLastDisabled = isSingleForwardDisabled;

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
    <div className="h-[100vh] w-[100vw] bg-slate-100 flex items-center justify-center">
      <div className="container h-[735px] w-[1650px] flex flex-col">
        <input
          type="text"
          placeholder="Search by name, email or role"
          onKeyDown={handleEnter}
          className="search border border-slate-300 p-2 w-full rounded-lg"
        />
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
                <TableDataRow
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
        <div className="flex w-full p-4">
          <button
            className="rounded-3xl bg-[#FF5071] text-white py-1 px-4"
            onClick={deleteSelected}
          >
            Delete Selected
          </button>
          <div className="mx-auto flex gap-9">
            <button
              className="first-page rounded-full h-[34px] aspect-square bg-blue-400 text-white disabled:bg-gray-400"
              onClick={backToFirst}
              disabled={isBackToFirstDisabled}
            >
              <MdKeyboardDoubleArrowLeft className="m-auto text-2xl" />
            </button>
            <button
              className="previous-page rounded-full h-[34px] aspect-square bg-blue-400 text-white disabled:bg-gray-400"
              onClick={backSingle}
              disabled={isSingleBackDisabled}
            >
              <MdKeyboardArrowLeft className="m-auto text-2xl" />
            </button>
            <div className="h-full w-[2px] bg-slate-300" />
            {Array.from({ length: totalPage }, (_item, idx) => (
              <button
                key={idx}
                className={`page-number rounded-full h-[34px] aspect-square ring-1 text-center ${
                  idx + 1 === currentPage
                    ? "bg-white text-blue-500"
                    : "bg-blue-400 text-white"
                }`}
                onClick={() => {
                  isSelectAllChecked && selectAll();
                  setCurrentPage(idx + 1);
                }}
              >
                {idx + 1}
              </button>
            ))}
            <div className="h-full w-[2px] bg-slate-300" />
            <button
              className="next-page rounded-full h-[34px] aspect-square bg-blue-400 text-white disabled:bg-gray-400"
              onClick={forwardSingle}
              disabled={isSingleForwardDisabled}
            >
              <MdKeyboardArrowRight className="m-auto text-2xl" />
            </button>
            <button
              className="last-page rounded-full h-[34px] aspect-square bg-blue-400 text-white disabled:bg-gray-400"
              onClick={forwardToLast}
              disabled={isForwardToLastDisabled}
            >
              <MdKeyboardDoubleArrowRight className="m-auto text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
