"use client";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { app } from "../../../../firebase/FirebaseConfig";
import React from "react";
import { useThemeContext } from "../../context/theme";
import { useSession } from "next-auth/react";

const UrlItems = ({ url }) => {
  const db = getFirestore(app);
  const { showToast, setShowToast } = useThemeContext();

  console.log(`url: ${url}`);

  const { data: session, status } = useSession();

  const deleteUrl = async (url) => {
    if (url.createdBy === session.user.email) {
      await deleteDoc(doc(db, "Urls", url.id.toString())).then((resp) => {
        setShowToast("Resource Deleted!!!");
      });
    } else {
      setShowToast("User Error, Resource Can't be deleted");
    }
  };

  return (
    <div className="flex gap-5 md:gap-8 rounded-lg pl-5 p-3 items-center border-[#6AC7EBF0] border-b-4 w-full text-[#6AC7EBF0]">
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
          d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
        />
      </svg>
      <a
        href={`${url?.link}`}
        target="_blank"
        className="no-underline hover:underline hover:underline-offset-3 decoration-sky-100 text-gray-300"
      >
        {url?.title}
      </a>
      <div
        className="ml-auto mr-2 hover:scale-105 transition-all hover:text-red-400"
        onClick={() => deleteUrl(url)}
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

export default UrlItems;
