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

  const handleImageUpload = (acceptedImage) => {
    setImageData({
      ...imageData,
      image: acceptedImage[0],
    });
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
      <img className="profile-pic" src={props.user.image}></img>
      <form onSubmit={addProfileImage}>
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

        <label className="form-labels">
          Username:
          <input
            className="form-input"
            type="text"
            name="username"
            placeholder={props.user.username}
          ></input>
          <label className="form-labels">
            Location:
            <input
              className="form-input"
              type="text"
              name="location"
              onChange={onInputChange}
              placeholder={props.user.location}
              ref={inputRef}
            ></input>
          </label>
        </label>
        <label className="form-labels">
          Weight:
          <input
            className="form-input"
            type="number"
            name="weight"
            placeholder={props.user.weight}
          ></input>
        </label>
        <label className="form-labels">
          Email:
          <input
            className="form-input"
            type="text"
            name="email"
            placeholder={props.user.email}
          ></input>
        </label>
        <label className="form-labels">
          Description:
          <input
            className="form-input"
            type="text"
            name="description"
            placeholder={props.user.description}
          ></input>
        </label>

        <input className="button" type="submit" value="Save Changes"></input>
      </form>
    </div>
  );
};

export default UserProfile;
