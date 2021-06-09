import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const validate = function(history) {

    // const is_logged_in = !!window.localStorage.getItem("uid");
    // if (!is_logged_in && history.location.pathname != "/login") {
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