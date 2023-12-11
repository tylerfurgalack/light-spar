import React, { useEffect, useState } from "react";

import ProfileTile from "./ProfileTile";

const ChatsList = () => {
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    getUsersForChats();
  }, []);

  const usersProfileChatsList = users.map((profile) => {
    return <ProfileTile key={profile.id} profile={profile} />;
  });
  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">{usersProfileChatsList}</div>
    </div>
  );
};

export default ChatsList;
