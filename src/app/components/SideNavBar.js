"use client";
import React, { useEffect, useState } from "react";
import ResourceKit from "./ResourceKit/ResourceKit";
import CreateResourceModal from "./ResourceKit/CreateResourceModal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useThemeContext } from "../context/theme";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../../firebase/FirebaseConfig";
import Toast from "./Toast";

const SideNavBar = ({}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resourceKits, setResourceKits] = useState([]);
  const [publicResource, setPublicResource] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const { showToast, setShowToast } = useThemeContext();

  const handleTabChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const db = getFirestore(app);

  // fetch data on session state
  useEffect(() => {
    if (session) {
      getResourceKits();
      getPublicResource();
      console.log(session.user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, showToast]);

  //   fetch resource kits from firebase for render
  const getResourceKits = async () => {
    // clear previous state
    try {
      new Promise((resolve, reject) => {
        setResourceKits([]);
        const q = query(
          collection(db, "Resources"),
          where("createdBy", "==", session.user.email)
        );

        getDocs(q)
          .then(async (querySnapshot) => {
            const resourceKits = [];

            querySnapshot.forEach((doc) => {
              resourceKits.push(doc.data());
            });

            resolve(resourceKits);
          })
          .catch(reject);
      }).then((resourceKits) => {
        setResourceKits(resourceKits);
      });
    } catch (e) {
      console.error("Error reading document: ", e);
    }
  };

  //   fetch public resource kits from firebase for render
  const getPublicResource = async () => {
    try {
      new Promise((resolve, reject) => {
        setPublicResource([]);
        const q = query(
          collection(db, "Resources"),
          where("private", "==", false)
        );

        getDocs(q)
          .then(async (querySnapshot) => {
            const publicResource = [];

            querySnapshot.forEach((doc) => {
              publicResource.push(doc.data());
            });

            resolve(publicResource);
          })
          .catch(reject);
      }).then((publicResource) => {
        setPublicResource(publicResource);
      });
    } catch (e) {
      console.error("Error reading document: ", e);
    }
  };

  //   set activeIndex and route to resource
  const onResourceClick = (kit) => {
    setActiveIndex(kit.id);
    router.push(`/resource/${kit.id}?name=${kit.name}`);
  };

  const kitElements = resourceKits.map((kit) => (
    <ResourceKit
      kit={kit}
      key={kit.id}
      onResourceClick={onResourceClick}
      activeIndex={activeIndex}
    />
  ));

  const publicKitElements = publicResource.map((kit) => (
    <ResourceKit
      kit={kit}
      key={kit.id}
      onResourceClick={onResourceClick}
      activeIndex={activeIndex}
    />
  ));

  return (
    <div className="w-full md:col-span-1  rounded-t-[1.75rem] md:rounded-r-[1.75rem] p-4  bg-[#e9eff1cc]  z-10 shadow-gray-300 shadow-md">
      <div className="flex justify-around items-center mb-10">
        <h3 className="text-xl text-black">Resources</h3>
        <button
          className="btn btn-sm text-white text-sm"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          New Kit
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

        <dialog id="my_modal_2" className="modal">
          <CreateResourceModal />
        </dialog>
      </div>
      <div role="tablist" className="tabs tabs-bordered text-md text-black">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab text-lg text-black"
          aria-label="Private"
          checked={isChecked}
          onChange={handleTabChange}
        />
        <div role="tabpanel" className="tab-content p-5">
          <div className="flex flex-col gap-4 justify-around">
            {kitElements}
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab text-lg text-black"
          aria-label="Public"
          checked={isChecked}
          onChange={handleTabChange}
        />
        <div role="tabpanel" className="tab-content p-10">
          <div className="flex flex-col gap-4 justify-around">
            {publicKitElements}
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col justify-between gap-8">{kitElements}</div> */}
      {showToast && <Toast msg={showToast} />}
    </div>
  );
};

export default SideNavBar;
