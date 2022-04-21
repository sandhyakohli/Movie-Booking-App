import  "./Header.css";
import React from "react";

class Header extends React.Component {
    render() {
      return (
        <div className="HeaderStyle">
          <img
            src="https://cdn.upgrad.com/uploads/production/286e1f11-1897-4d0c-ab0f-6b2bfc1ce642/logo.svg"
            alt="logo"
            className="logo"
          />
        </div>
      );
    }
  }
  
  export default Header;