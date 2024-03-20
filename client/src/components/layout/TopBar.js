import React from "react";

import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li className="top-bar-font" key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li className="top-bar-font" key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li className="top-bar-font" key="partners">
      <Link to="/chats">Partners</Link>
    </li>,
    <li className="top-bar-font" key="profile">
      <Link to="/profile">Your Profile</Link>
    </li>,
    <li className="top-bar-font" key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="dropdown menu" data-dropdown-menu>
          <li id="menu-text">Light-Spar</li>
          <li className="top-bar-font">
            <Link to="/">New Fighters</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
