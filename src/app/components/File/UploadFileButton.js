import { useSession } from "next-auth/react";
import { app } from "../../../../firebase/FirebaseConfig";
import React from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useThemeContext } from "../../context/theme";

const UploadFileButton = ({ resourceId }) => {
  const { data: session } = useSession();
  const { showToast, setShowToast } = useThemeContext();

  const db = getFirestore(app);
  const storage = getStorage(app);
  const docId = Date.now();

  // store file in storage and create new file collections
  const onFileUpload = async (file) => {
    if (file) {
      if (file?.size > 1000000) {
        console.log("File is too large");
        return;
      }
      const storageRef = ref(storage, "file/" + file.name);

      uploadBytes(storageRef, file)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!");
        })
        .then((resp) => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            await setDoc(doc(db, "files", docId.toString()), {
              name: file.name,
              type: file.name.split(".")[1],
              size: file.size,
              modifiedAt: file.lastModified,
              createdBy: session.user.email,
              imageUrl: downloadURL,
              resourceId: resourceId,
              id: docId,
            });
            console.log("File Uploaded Successfully!");
            setShowToast("File Uploaded Successfully!");
          });
        });
    }
  };

  return (
    <div>
      <input
        type="file"
        className="file-input file-input-bordered file-input-sm w-48 md:w-full max-w-xs"
        onChange={(e) => onFileUpload(e.target.files[0])}
        onKeyDown={(e) => e.key == "Enter" && onFileUpload(e.target.files[0])}
      />
    </div>
  );
};

export default UploadFileButton;
