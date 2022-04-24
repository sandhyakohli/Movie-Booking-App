import  "./Header.css";
import React from "react";
import Button from '@material-ui/core/Button';

class Header extends React.Component {
    render() {
      return (
        <div className="HeaderStyle">
          <img
            src="https://cdn.upgrad.com/uploads/production/286e1f11-1897-4d0c-ab0f-6b2bfc1ce642/logo.svg"
            alt="logo"
            className="logo"
          />
             
             {this.props.showBookShowButton === "true" ?
          <div className="bookshow-button">
              <Button variant="contained" color="primary" >
                  Book Show
              </Button>
          </div>
          : ""}
        </div>
      

        

      );
  
    }
  }
  
  export default Header;