import React, { useEffect, useState } from "react";
import getForeignUser from "../services/getForeignUser.js";

const ProfileShow = (props) => {
  const [profile, setProfile] = useState({
    image: "",
    username: "",
    weight: "",
    description: "",
  });
  const [buttonVisible, setButtonVisible] = useState(true);
  const [chatExists, setChatExists] = useState(false);

  const profileId = props.computedMatch.params.id;

  useEffect(() => {
    getForeignUser(profileId).then((parseProfileData) => {
      setProfile(parseProfileData);
      // Check if a chat exists between current user and profile being viewed
      checkChatRelation(props.user.id, profileId);
    });
  }, []);

  const checkChatRelation = async (currentUserId, viewedProfileId) => {
    try {
      const response = await fetch(
        `/api/v1/chats/exists?senderId=${currentUserId}&receiverId=${viewedProfileId}`
      );
      const { exists } = await response.json();

      setChatExists(true);
      // If a chat relation exists, hide the button
      if (exists) {
        setButtonVisible(false);
      }
    } catch (error) {
      console.error(`Error checking chat relation: ${error.message}`);
    }
  };

  const createNewChat = async (newChat) => {
    try {
      const response = await fetch(`/api/v1/chats`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ ...newChat }),
      });
      if (response.ok) {
        // Hide the button after successful chat creation
        setButtonVisible(false);
      } else if (!response.ok) {
        if (response.status === 422) {
          const errorBody = await response.json();
          const newErrors = translateServerErrors(errorBody.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const deleteCurrentChat = async (deleteChat) => {
    try {
      const response = await fetch(`/api/v1/chats`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...deleteChat }),
      });

      if (response.ok) {
        setButtonVisible(true); // Show the button again after successful deletion
        setChatExists(false); // Update chatExists state to indicate chat deletion
      } else {
        // Handle other response scenarios here
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const onInviteClickHandler = (event) => {
    event.preventDefault();

    const newChat = {
      senderId: props.user.id,
      receiverId: profile.id,
    };

    createNewChat(newChat);
  };

  const onDeleteClickHandler = (event) => {
    event.preventDefault();
    const prompt = window.confirm("Are you sure you want to delete this partner?");

    if (prompt) {
      const deleteChat = {
        senderId: props.user.id,
        receiverId: profile.id,
      };

      deleteCurrentChat(deleteChat);
    }
  };

  return (
    <div>
      <img className="profile-pic" src={profile.image}></img>
      <h3>{profile.username}</h3>
      <h4>Weight: {profile.weight}</h4>
      <p>description: {profile.description}</p>

      {buttonVisible ? (
        <button className="button" onClick={onInviteClickHandler}>
          Invite
        </button>
      ) : (
        <div>
          <button className="button">Message</button>
          <button className="button" onClick={onDeleteClickHandler}>
            Delete Partner
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileShow;
