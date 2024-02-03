/* eslint-disable react/prop-types */
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
} from "react-icons/md";

export default function Pagination({
  totalPage,
  currentPage,
  handlePageClick,
  backSingle,
  forwardSingle,
  backToFirst,
  forwardToLast,
}) {
  const isSingleBackDisabled = currentPage === 1;
  const isBackToFirstDisabled = isSingleBackDisabled;
  const isSingleForwardDisabled = currentPage === totalPage;
  const isForwardToLastDisabled = isSingleForwardDisabled;

  return (
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
          onClick={() => handlePageClick(idx)}
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
  );
}
