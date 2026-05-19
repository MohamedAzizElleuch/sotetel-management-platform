module.exports = function requireRole(...roles) {
  return (req, res, next) => {
    console.log('🔥 requireRole middleware hit');
    console.log('User role from request:', req.user?.role);
    console.log('Allowed roles:', roles);

    if (!req.user || !roles.map(r => r.toLowerCase()).includes(req.user.role.toLowerCase())) {
      return res.status(403).json({ message: `Access denied: Only ${roles.join(', ')} allowed` });
    }

    console.log('✅ Access granted');
    next();
  };
};
