import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../Firebase";
import {
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  signOutFailed,
  signOutStart,
  signOutSuccess,
  updateUserFailed,
  updateUserStart,
  updateUserSuccess,
} from "../Redux/user/userSlice";

// firebase storage ---
// allow read;
// allow write:
// request.resource.size < 2 * 1024 * 1024 &&
// request.resource.contentType.matches('image/.*')

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const disptach = useDispatch();
  // console.log(formData);
  // console.log(currentUser);
  // console.log(filePerc);
  // console.log(fileUploadError);
  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);
  // console.log(file)
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, photo: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      disptach(updateUserStart());
      const result = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await result.json();
      if (data.success === false) {
        disptach(updateUserFailed(data.message));
        return;
      }
      disptach(updateUserSuccess(data));
      setUpdateSuccess(true);
      // console.log(data);
    } catch (error) {
      disptach(updateUserFailed(error.message));
    }
  };

  const handleDelete = async () =>{
    try {
      disptach(deleteUserStart());
      const result = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE'
      });
      const data = await result.json();

      if(data.success === false){
        disptach(deleteUserFailed(data.message));
        return;
      }
      disptach(deleteUserSuccess(data));

    } catch (error) {
      disptach(deleteUserFailed(error.message));
    }
  };

  const handleSignout =async()=>{
    try {
      disptach(signOutStart());
      const result = await fetch('/api/auth/signout');
      const data = await result.json();

      if(data.success === false){
        disptach(signOutFailed(data.message));
        return;
      }
      disptach(signOutSuccess(data));

    } catch (error) {
      disptach(signOutFailed(error.message));
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <img
          src={formData.photo || currentUser.photo}
          alt="avatar"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={handleDelete}>Delete account</span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignout}>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error :''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
    </div>
  );
};

export default Profile;
