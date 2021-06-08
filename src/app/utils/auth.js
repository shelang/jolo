import React, { Component } from "react";
import { withRouter } from "react-router-dom";


const validate = function(history) {
    // const isLoggedIn = !!window.localStorage.getItem("uid");
    // if (!isLoggedIn && history.location.pathname != "/login") {
    //   if (history.location.pathname !== "/create") {
    //     history.replace("/create");
    // }
  };

export default function authHOC(BaseComponent) {
    class Restricted extends Component {
      componentWillMount() {
        this.checkAuthentication(this.props);
      }
      componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
          this.checkAuthentication(nextProps);
        }
      }
      checkAuthentication(params) {

        const { history } = params;
        validate(history)
      }
      render() {
        return <BaseComponent {...this.props} />;
      }
    }
    return withRouter(Restricted);
  }