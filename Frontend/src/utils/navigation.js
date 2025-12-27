export const getDashboardRoute = (role) => {
  const dashboardRoutes = {
    admin: '/admin',
    vendor: '/vendor',
    user: '/dashboard'
  };
  
  return dashboardRoutes[role] || '/dashboard';
};

export const navigateToRoleDashboard = (user, navigate) => {
  if (!user || !user.role) {
    navigate('/login');
    return;
  }
  
  const dashboardRoute = getDashboardRoute(user.role);
  navigate(dashboardRoute, { replace: true });
};