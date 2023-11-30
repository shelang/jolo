const rules = {
  admin: {
    routes: ['/dashboard', '/workspaces'],
    static: [
     
      'workspaces:list',
      'workspaces:create',
      'workspaces:create-with-role',
      'workspaces:add-user',
      'workspaces:delete-user',
      'workspaces:details',
      'workspaces:plan-details',
     
    ],
    // dynamic: {
    //   'posts:edit': ({ userId, postOwnerId }) => {
    //     if (!userId || !postOwnerId) return false;
    //     return userId === postOwnerId;
    //   }
    // }
  },
  boss: {
    routes: ['/dashboard'],
    static: [
      'dashboard:read',
      'users:list',
      'users:create',
      'users:create-with-role',
      'users:edit',
      'users:delete',
      'users:details',
      'users:plan-details',
      'payments:list',
      'payments:details',
      'plans:list',
      'plans:details',
      'plans:create',
      'feedbacks:list',
      'jobs:list',
      'profile:read',
    ],
    // dynamic: {
    //   'posts:edit': ({ userId, postOwnerId }) => {
    //     if (!userId || !postOwnerId) return false;
    //     return userId === postOwnerId;
    //   }
    // }
  },
}

export default rules
