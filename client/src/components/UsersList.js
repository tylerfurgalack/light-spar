import React, { useEffect, useState, useRef } from "react";
import ProfileTile from "./ProfileTile";
import Filter from "./Filter";

import googlePlacesAPIFilter from "../services/googlePacesAPIFilter";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [weightClass, setWeightClass] = useState("");
  const [filteredProfileList, setFilteredProfileList] = useState([]);

  const getUsersData = async () => {
    try {
      const response = await fetch(`/api/v1/users`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setUsers(body.newUsers);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // Filter users based on location and weightClass
    const filteredUsers = users.filter((profile) => {
      const locationMatch =
        locationFilter === "" ||
        profile.location.toLowerCase().includes(locationFilter.toLowerCase());

      const weightClassRange = {
        flyweight: [105, 114],
        bantamweight: [115, 121],
        featherweight: [122, 129],
        lightweight: [130, 139],
        welterweight: [140, 153],
        middleweight: [154, 167],
        lightheavyweight: [168, 199],
        heavyweight: [200, Infinity],
      };

      const weightClassMatch =
        weightClass === "" ||
        (profile.weight >= weightClassRange[weightClass][0] &&
          profile.weight <= weightClassRange[weightClass][1]);

      return locationMatch && weightClassMatch;
    });

    setFilteredProfileList(filteredUsers);
  };

  const onInputChange = (event) => {
    setLocationFilter(event.currentTarget.value);
  };

  const onWeightChange = (event) => {
    setWeightClass(event.currentTarget.value);
  };

  const autoCompleteRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    googlePlacesAPIFilter(inputRef, autoCompleteRef, setLocationFilter, locationFilter);
    getUsersData();
  }, []);

  const usersProfileList = users.map((profile) => {
    return <ProfileTile key={profile.id} profile={profile} />;
  });
  const filterList = filteredProfileList.map((profile) => {
    return <ProfileTile key={profile.id} profile={profile} />;
  });

  return (
    <div>
      <Filter
        onSubmit={onSubmit}
        onInputChange={onInputChange}
        onWeightChange={onWeightChange}
        inputRef={inputRef}
        setLocationFilter={setLocationFilter}
        setWeightFilter={setWeightClass}
      />
      <div className="grid-container">
        {locationFilter !== "" || weightClass !== "" ? (
          <div className="grid-x grid-margin-x">{filterList}</div>
        ) : (
          <div className="grid-x grid-margin-x">{usersProfileList}</div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
