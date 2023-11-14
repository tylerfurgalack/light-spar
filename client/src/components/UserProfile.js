import React from "react";

const UserProfile = (props) => {
  return (
    <div>
      <img className="profile-pic" scr={props.user.image}></img>
      <h3>{props.user.username}</h3>
      <h4>Weight: {props.user.weight}lbs</h4>
      <p>{props.user.email}</p>
      <p>{props.user.description}</p>
    </div>
  );
};

export default UserProfile;
