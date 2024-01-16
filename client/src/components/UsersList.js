import React, { useEffect, useState, useRef } from "react";
import ProfileTile from "./ProfileTile";

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
        flyweight: [108, 114],
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
    getUsersData();
    const loadScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDLGIItpnt5wyW2QbJxY3PIHDMxm-bRSg4&libraries=places&callback=initMap`;
      document.body.appendChild(script);
      script.onload = () => initMap();
    };

    const initMap = () => {
      const options = {
        types: ["(cities)"],
      };

      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );
      autoCompleteRef.current.addListener("place_changed", () => {
        const selectedPlace = autoCompleteRef.current.getPlace();
      });
    };

    loadScript();
  }, []);

  const usersProfileList = filteredProfileList.map((profile) => {
    return <ProfileTile key={profile.id} profile={profile} />;
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Location:</label>
        <input type="text" name="location" onChange={onInputChange} ref={inputRef}></input>
        <label>Weight:</label>
        <select name="Weight-Class" onChange={onWeightChange}>
          <option value="">Weight Class</option>
          <option value="flyweight">Flyweight (108-114lbs)</option>
          <option value="bantamweight">Bantamweight (115-121lbs)</option>
          <option value="featherweight">Featherweight (122-129lbs)</option>
          <option value="lightweight">Lightweight (130-139lbs)</option>
          <option value="welterweight">Welterweight (140-153lbs)</option>
          <option value="middleweight">Middleweight (154-167lbs)</option>
          <option value="lightheavyweight">Light Heavyweight (168-199lbs)</option>
          <option value="heavyweight">Heavyweight (200lbs or more)</option>
        </select>
        <div>
          <input type="submit" className="button" value="Filter" />
        </div>
      </form>
      <div className="grid-container">
        <div className="grid-x grid-margin-x">{usersProfileList}</div>
      </div>
    </div>
  );
};

export default UsersList;
