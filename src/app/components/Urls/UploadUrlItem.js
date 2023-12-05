"use client";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { app } from "../../../../firebase/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useThemeContext } from "../../context/theme";

const UploadUrlItem = ({ resourceId }) => {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const { showToast, setShowToast } = useThemeContext();

  const db = getFirestore(app);
  const docId = Date.now().toString();

  const onCreate = async (e) => {
    try {
      // // Prevent the page from refreshing
      e.preventDefault();
      console.log(title);

      const docRef = await setDoc(doc(db, "Urls", docId), {
        title: title,
        link: link,
        id: docId,
        createdBy: session.user.email,
        resourceId: resourceId,
      });
      setShowToast("Resource Added Successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <form className="flex flex-col px-3">
        <input
          type="text"
          placeholder="Title here"
          s
          className="p-2 border-[#275A6EC2] hover:border-[#768287E5] border-b-2 hover:outline-none  hover:border-b-3 w-full max-w-xs bg-transparent"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Paste resource link here"
          className="p-2 border-[#275A6EC2] hover:border-[#768287E5]  border-b-2 hover:outline-none  hover:border-b-3 w-full max-w-xs bg-transparent"
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          className="btn btn-sm w-32 text-gray-300 text-sm mt-4"
          onClick={(e) => onCreate(e)}
        >
          Add
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
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default UploadUrlItem;
