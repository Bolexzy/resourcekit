"use client";

import React, { useState } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../../../../firebase/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useThemeContext } from "../../context/theme";
import Toast from "../Toast";

const CreateResourceModal = () => {
  const [resourceKit, setResourceKit] = useState();
  const { showToast, setShowToast } = useThemeContext();

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  const docId = Date.now();

  const { data: session } = useSession();

  // upload and create new resource
  const onCreate = async () => {
    try {
      const docRef = await setDoc(doc(db, "Resources", docId.toString()), {
        name: resourceKit,
        private: true,
        id: docId.toString(),
        createdBy: session.user.email,
      });

      setShowToast("ResourceKit created Successfully!");
      console.log("Document written with ID: ", docRef.id);
      setShowToast("ResourceKit created Successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <form method="dialog" className="modal-box p-9 items-center bg-white">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <div
          className="w-full items-center 
        flex flex-col justify-center gap-3"
        >
          <input
            type="text"
            placeholder="Kit Name"
            className="p-2 border-[1px] outline-none
              rounded-md bg-gray-100 text-black "
            onChange={(e) => setResourceKit(e.target.value)}
          />
          <button
            className="bg-blue-500
        text-white rounded-md p-2 px-3 w-full"
            onClick={() => onCreate()}
          >
            Create
          </button>
        </div>
      </form>
      {showToast && <Toast msg={showToast} />}
    </div>
  );
};

export default CreateResourceModal;
