import { NextRouter, useRouter } from "next/router";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Popup from "reactjs-popup";
import { IActionButtonProps } from "~/interfaces";
import { LoadingSpinner } from "../Spinner";

const ActionButtons = ({
  id,
  loading,
  open,
  setOpen,
  handleDelete,
}: IActionButtonProps) => {
  const router: NextRouter = useRouter();
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-4 bg-gray-800 bg-opacity-70 opacity-0 transition duration-300 hover:opacity-100">
      <FaEdit
        size={30}
        color="white"
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          router.push({
            pathname: `/product/${id}`,
            query: { edit: true },
          });
        }}
      />
      <MdDelete
        size={30}
        color="red"
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      />
      <Popup
        open={open}
        modal
        overlayStyle={{
          background: "rgba(0, 0, 0, 0.5)",
        }}
        closeOnDocumentClick={false}
        nested
        contentStyle={{
          textAlign: "center",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
          border: 0,
          width: "fit-content",
          overflow: "hidden",
          height: "fit-content",
        }}
      >
        <div className="flex flex-col items-center justify-center py-6">
          <p className="mb-6 min-w-[400px] text-[16px] font-semibold">
            Delete Product
          </p>
          <p className="text-grey-text md-w-[350px] mb-11 text-center text-[16px]">
            Are you sure you want to delete this product?
          </p>
          <div className="flex w-full items-start justify-between gap-4 self-start px-3 md:px-12">
            <div
              className="text-primary cursor-pointer rounded-xl border border-button bg-white px-3 py-2"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </div>
            <div
              className="cursor-pointer rounded-xl bg-button px-3 py-2 text-white "
              onClick={() => handleDelete(id)}
            >
              {loading ? <LoadingSpinner /> : "Delete Product"}
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default ActionButtons;
