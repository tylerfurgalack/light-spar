import React, { useEffect, useState } from "react";
import getForeignUser from "../services/getForeignUser.js";

const ProfileShow = (props) => {
  const [profile, setProfile] = useState({
    image: "",
    username: "",
    weight: "",
    description: "",
  });

  const profileId = props.match.params.id;

  useEffect(() => {
    getForeignUser(profileId).then((parseProfileData) => {
      setProfile(parseProfileData);
    });
  }, []);

  return (
    <div>
      <img className="profile-pic"></img>
      <h3>{profile.username}</h3>
      <h4>Weight: {profile.weight}</h4>
      <p>description: {profile.description}</p>
    </div>
  );
};

export default ProfileShow;
