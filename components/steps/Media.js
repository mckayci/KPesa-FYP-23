import { useStepperContext } from "../../context/StepperContext.js";
import { getDownloadURL, getStorage } from "firebase/storage";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

function Media() {
  const { userData, setUserData } = useStepperContext();
  const storage = getStorage();
  const { db } = useAuth;

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];

    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          setUserData({ ...userData, ["campaignPhoto"]: downloadURL });
        });
      }
    );
  };

  return (
    <div className="flex flex-col ">
      <form className="w-full mx-2 flex-1" onSubmit={handleSubmit}>
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Please upload a picture for your campaign
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            name="campaignPic"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
        <button type="submit" className="bg-grey-900">
          Upload Image
        </button>
        {!imgUrl && (
          <div className="outerbar">
            <div className="innerbar" style={{ width: `${progresspercent}%` }}>
              {progresspercent}%
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
export default Media;
