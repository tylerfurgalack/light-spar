import React from "react";
import { Link } from "react-router-dom";

const ProfileTile = ({ profile }) => {
  return (
    <div className="card profile-card-style cell small-12 medium-4">
      <div className="image-container">
        <img className="rounded-image" src={profile.image}></img>
      </div>
      <div className="text-center">
        <div>{profile.username}</div>
        <p>Weight:{profile.weight}</p>
        <p>Location:{profile.location}</p>
        <Link to={`/users/${profile.id}`}>
          <div className="button">View Profile</div>
        </Link>
      </div>
    </div>
  );
};

export default ProfileTile;
