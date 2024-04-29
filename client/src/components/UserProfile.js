import React from "react";
import { useState, useEffect, useRef } from "react";
import Dropzone from "react-dropzone";
import getProfileImage from "../services/getProfileImage";
import googlePlacesAPI from "../services/googlePlacesAPI";

const UserProfile = (props) => {
  const [userPayload, setUserPayload] = useState({
    username: props.user.username,
    weight: props.user.weight,
    location: props.user.location,
    email: props.user.email,
    description: props.user.description,
    image: props.user.image,
  });

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleImageUpload = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      // Only process file if it's JPEG or PNG
      if (!file.type.includes("image/jpeg") && !file.type.includes("image/png")) {
        alert(`${file.name} is not a valid image file (JPEG or PNG only).`);
      }

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        setImageData({
          ...imageData,
          image: acceptedFiles[0],
        });
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFormSubmit = async (event) => {
    // Create a function to handle form submission
    event.preventDefault();
    try {
      const response = await fetch(`/api/v1/user-sessions/current`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userPayload),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addProfileImage = async (event) => {
    event.preventDefault();
    const newImageBody = new FormData();
    newImageBody.append("image", imageData.image);
    const profilePic = await getProfileImage(props.user.id, newImageBody);
    props.setCurrentUser({
      ...props.user,
      image: profilePic,
    });
  };

  const autoCompleteRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    googlePlacesAPI(inputRef, autoCompleteRef, setUserPayload, userPayload);
  }, []);
  const [imageData, setImageData] = useState({
    image: {},
  });

  return (
    <div className="grid-container form-container">
      <form className="dropzone-form" onSubmit={addProfileImage}>
        <img className="profile-pic" src={props.user.image}></img>
        <div className="dropzone">
          <Dropzone onDrop={handleImageUpload}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="drag-n-drop">
                    <p>Upload A Picture - drag 'n' drop or click to upload</p>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <input className="button" type="submit" value="Save Image"></input>
      </form>
      <form onSubmit={handleFormSubmit}>
        <label className="form-labels">
          Username:
          <input
            className="form-input"
            type="text"
            name="username"
            value={userPayload.username}
            onChange={onInputChange}
          ></input>
          <label className="form-labels">
            Location:
            <input
              className="form-input"
              type="text"
              name="location"
              onChange={onInputChange}
              ref={inputRef}
              value={userPayload.location}
            ></input>
          </label>
        </label>
        <label className="form-labels">
          Weight:
          <input
            className="form-input"
            type="number"
            name="weight"
            onChange={onInputChange}
            value={userPayload.weight}
          ></input>
        </label>
        <label className="form-labels">
          Email:
          <input
            className="form-input"
            type="text"
            name="email"
            onChange={onInputChange}
            value={userPayload.email}
          ></input>
        </label>
        <label className="form-labels">
          Description:
          <input
            className="form-input"
            type="text"
            name="description"
            onChange={onInputChange}
            value={userPayload.description}
          ></input>
        </label>

        <input className="button" type="submit" value="Save Changes"></input>
      </form>
    </div>
  );
};

export default UserProfile;
