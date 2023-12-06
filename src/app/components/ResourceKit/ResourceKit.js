import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import React from "react";
import { app } from "../../../../firebase/FirebaseConfig";
import { useThemeContext } from "../../context/theme";

const ResourceKit = ({ kit, onResourceClick, activeIndex }) => {
  const { showToast, setShowToast } = useThemeContext();

  const db = getFirestore(app);

  const deleteResource = async (e, kit) => {
    e.stopPropagation();

    await deleteDoc(doc(db, "Resources", kit.id.toString())).then((resp) => {
      setShowToast("Resource Deleted!!!");
    });
  };

  return (
    <div
      className="w-full flex justify-between items-center"
      onClick={() => {
        onResourceClick(kit);
      }}
    >
      <div
        className={`w-full h-auto shadow-md flex  p-2 pl-4 gap-5 rounded-xl text-black hover:text-white hover:bg-[#275A6EC2] transition-all ${
          activeIndex === kit.id ? `bg-[#275A6EC2]` : ""
        }`}
      >
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
            d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
          />
        </svg>

        <h3 style={{ color: "currentcolor" }}>{kit.name}</h3>
      </div>

      <div
        className="ml-auto mr-2 hover:scale-110 transition-all hover:text-red-400"
        onClick={(e) => deleteResource(e, kit)}
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
  );
};

export default ResourceKit;
