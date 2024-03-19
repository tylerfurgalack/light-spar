import React, { Fragment } from "react";
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
    <div>
      {/* <div className="title-bar" data-responsive-toggle="responsive-menu" data-hide-for="medium">
        <button className="menu-icon" type="button" data-toggle="responsive-menu"></button>
        <div className="title-bar-title">Menu</div>
      </div> */}
      <div className="top-bar" id="responsive-menu">
        <div className="top-bar-left">
          <ul className="dropdown menu" data-dropdown-menu>
            <li className="menu-text">Light-Spar</li>
            <li className="top-bar-font">
              <Link to="/">New Fighters</Link>
            </li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
