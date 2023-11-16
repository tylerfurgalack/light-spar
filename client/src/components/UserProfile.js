import React from "react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import getProfileImage from "../services/getProfileImage";

const UserProfile = (props) => {
  const [imageData, setImageData] = useState({
    image: {},
  });

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

  return (
    <div>
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
        <input className="submit-pic-button" type="submit"></input>
      </form>
      <h3>{props.user.username}</h3>
      <h4>Weight: {props.user.weight}lbs</h4>
      <p>{props.user.email}</p>
      <p>{props.user.description}</p>
    </div>
  );
};

export default UserProfile;
