import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import React from "react";
import { app } from "../../../../firebase/FirebaseConfig";
import { useThemeContext } from "../../context/theme";
import moment from "moment";

const FileItems = ({ file }) => {
  const { showToast, setShowToast } = useThemeContext();

  const db = getFirestore(app);

  const image = "/" + file.type + ".png";
  //   const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext);
  //   const deleteFile = async (file) => {
  //     await deleteDoc(doc(db, "files", file.id.toString())).then((resp) => {
  //       setShowToastMsg("File Deleted!!!");
  //     });
  //   };

  const deleteFile = async (file) => {
    await deleteDoc(doc(db, "files", file.id.toString())).then((resp) => {
      setShowToast("File Deleted!!!");
    });
  };

  return (
    <div>
      <div className="flex justify-between gap-5 pl-5 rounded-lg p-3 items-center bg-[#114559] w-full text-white overflow-auto">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
            />
          </svg>
        </div>
        <div>
          <a
            href={`${file.imageUrl}`}
            target="_blank"
            className="no-underline text-sm hover:underline hover:underline-offset-3 decoration-sky-100 "
          >
            {file.name}
          </a>
        </div>
        <div>
          <h2 className="text-sm w-[5px]">
            {/* {moment(file.modifiedAt).format("MMMM DD, YYYY")} */}
            {moment(file.modifiedAt).format("MMMM DD, YYYY")}
          </h2>
        </div>
        <div
          className="hover:scale-105 transition-all hover:text-red-400"
          onClick={() => deleteFile(file)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FileItems;
