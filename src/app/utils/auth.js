import React, { Component } from "react"
import { withRouter } from "react-router-dom"

// const validate = function(history) {
//     const is_logged_in = !!window.localStorage.getItem("id")
//     if (!is_logged_in && history.location.pathname != "/createStatus") {
//       if (history.location.pathname !== "/createStatus") {
//         history.replace("/createStatus");
//     }
//   }
// };

export default function authHOC(BaseComponent) {
    class Restricted extends Component {
      // componentWillMount() {
      //   this.checkAuthentication(this.props)
      // }
      // componentWillReceiveProps(nextProps) {
      //   if (nextProps.location !== this.props.location) {
      //     this.checkAuthentication(nextProps)
      //   }
      // }
      // checkAuthentication(params) {
      //   const { history } = params
      //   validate(history)
      // }
      render() {
        return <BaseComponent {...this.props} />
      }
    }
    return withRouter(Restricted);
  }