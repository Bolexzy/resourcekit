"use client";
import UploadFileButton from "@/app/components/File/UploadFileButton";
import UploadUrlItem from "@/app/components/Urls/UploadUrlItem";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useThemeContext } from "../../context/theme";
import { app } from "../../../../firebase/FirebaseConfig";

import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import UrlItems from "@/app/components/Urls/UrlItems";
import FileItems from "@/app/components/File/FileItems";

const KitDetails = ({ params }) => {
  const searchParams = useSearchParams();
  const [fileList, setFileList] = useState([]);
  const [urlList, setUrlList] = useState([]);
  const { showToast, setShowToast } = useThemeContext();

  const id = params.kitId;

  const db = getFirestore(app);

  const { data: session, status } = useSession();

  useLayoutEffect(() => {
    if (session) {
      getUrlList();
      getFileList();
      console.log(session.user.email);
    } else {
      redirect("/api/auth/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, showToast]);

  //   fetch firebase and get files of the resource and user
  const getFileList = async () => {
    try {
      new Promise((resolve, reject) => {
        setFileList([]);
        const q = query(
          collection(db, "files"),
          where("resourceId", "==", id),
          where("createdBy", "==", session.user.email)
        );

        getDocs(q)
          .then(async (querySnapshot) => {
            const fileList = [];

            querySnapshot.forEach((doc) => {
              fileList.push(doc.data());
            });

            resolve(fileList);
          })
          .catch(reject);
      }).then((fileList) => {
        setFileList(fileList);
      });
    } catch (e) {
      console.error("Error reading document: ", e);
    }
  };

  //   fetch firebase and get urls of the resource and user
  const getUrlList = async () => {
    try {
      new Promise((resolve, reject) => {
        setUrlList([]);
        const q = query(
          collection(db, "Urls"),
          where("resourceId", "==", id),
          where("createdBy", "==", session.user.email)
        );

        getDocs(q)
          .then(async (querySnapshot) => {
            const urlList = [];

            querySnapshot.forEach((doc) => {
              urlList.push(doc.data());
            });

            resolve(urlList);
          })
          .catch(reject);
      }).then((urlList) => {
        setUrlList(urlList);
      });
    } catch (e) {
      console.error("Error reading document: ", e);
    }
  };

  const name = searchParams.get("name");

  //   const urlElements = urlList.map((url) => <UrlItems url={url} key={url.id} />);

  const fileElements = fileList.map((file) => (
    <FileList file={file} key={file.id} />
  ));

  //   console.log(`after urlList: ${JSON.stringify(urlList)}`);

  return (
    <div className="w-full h-full col-span-2 p-8 bg-[#043547] sticky top-0 z-10">
      <div className="flex justify-around items-center mb-10">
        <h3 className="text-lg text-white">{name}</h3>
        <UploadFileButton resourceId={params.kitId} />
      </div>

      <div className="flex flex-col gap-4">
        <UploadUrlItem resourceId={params.kitId} />
      </div>

      <div className=" justify-around items-center mt-12">
        {/* simple link */}
        <div className="flex flex-col gap-4 mb-4">
          {urlList.map((url, index) => (
            <UrlItems url={url} key={index} />
          ))}
        </div>

        <div className="flex flex-col gap-4 text-left mt-12 text-gray-200">
          <h3 className="text-lg">Files</h3>
          {fileList.map((file, index) => (
            <FileItems file={file} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KitDetails;
