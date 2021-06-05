// import React, { Component } from "react";
// import { withRouter } from "react-router-dom";


// const validate = function(history) {
//   console.log("555555555")
//     // const isLoggedIn = !!window.localStorage.getItem("uid");
//     // if (!isLoggedIn && history.location.pathname != "/login") {
//       if (history.location.pathname !== "/login") {
//         history.replace("/login");
//     }
//   };

// export default function authHOC(BaseComponent) {
//     class Restricted extends Component {
//       componentWillMount() {
//         this.checkAuthentication(this.props);
//       }
//       componentWillReceiveProps(nextProps) {
//         if (nextProps.location !== this.props.location) {
//           this.checkAuthentication(nextProps);
//         }
//       }
//       checkAuthentication(params) {
//         console.log("3333333333333333333", params)
//         const { history } = params;
//         validate(history)
//       }
//       render() {
//         return <BaseComponent {...this.props} />;
//       }
//     }
//     return withRouter(Restricted);
//   }