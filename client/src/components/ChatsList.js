import React, { useEffect, useState, useRef } from "react";

import Filter from "./Filter";

import ProfileTile from "./ProfileTile";
import googlePlacesAPIFilter from "../services/googlePacesAPIFilter";

const ChatsList = () => {
  const [users, setUsers] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [weightClass, setWeightClass] = useState("");
  const [filteredProfileList, setFilteredProfileList] = useState([]);

  const getUsersForChats = async () => {
    try {
      const response = await fetch(`/api/v1/chats`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setUsers(body.pairedUsers);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
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
    getUsersForChats();
  }, []);

  const usersProfileChatsList = users.map((profile) => {
    return <ProfileTile key={profile.id} profile={profile} />;
  });

  const filterChatsList = filteredProfileList.map((profile) => {
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
        {filterChatsList.length === 0 ? (
          <div className="grid-x grid-margin-x">{usersProfileChatsList}</div>
        ) : (
          <div className="grid-x grid-margin-x">{filterChatsList}</div>
        )}
      </div>
    </div>
  );
};

export default ChatsList;
