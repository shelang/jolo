import rules from '../../rules';

const check = (rules, action, data, depth) => {
  // const user = JSON.parse(window.localStorage.getItem('user'));
  // const userRole =
  //   user && user.roles[0] && user.roles[0].toLowerCase().replace('role_', '');
  // const permissions = rules[userRole];
  // if (!permissions) {
  //   // role is not present in the rules
  //   return false;
  // }

  // switch (depth) {
  //   case 0:
  //     return checkRoutePermission(permissions);
  //   case 1:
  //     return (
  //       checkRoutePermission(permissions) &&
  //       checkStaticPermission(action, permissions)
  //     );
  //   case 2:
  //     return (
  //       checkRoutePermission(permissions) &&
  //       checkStaticPermission(action, permissions) &&
  //       checkDynamicPermission(action, permissions, data)
  //     );
  //   default:
  //     return false;
  // }
  return true;
};

const checkRoutePermission = (permissions) => {
  const routesPermissions = permissions.routes;
  if (routesPermissions) {
    for (const routesPermission of routesPermissions) {
      if (window.location.pathname.startsWith(routesPermission)) return true;
    }
  }
};
const checkStaticPermission = (action, permissions) => {
  const staticPermissions = permissions.static;

  return staticPermissions && staticPermissions.includes(action);
};
const checkDynamicPermission = (action, permissions, data) => {
  const dynamicPermissions = permissions.dynamic;

  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action];
    if (!permissionCondition) {
      // dynamic rule not provided for action
      return false;
    }

    return permissionCondition(data);
  }
};

const Can = (props) => {
  return check(rules, props.perform, props.data, props.depth)
    ? props.yes(props)
    : props.no();
};

Can.defaultProps = {
  yes: () => null,
  no: () => null,
  depth: 0,
};

export default Can;
