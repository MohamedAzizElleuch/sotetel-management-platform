// server/utils/isTechnicianAuthorized.js
module.exports = function isTechnicianAuthorized(user, task) {
    return user.role === 'technician' && user._id.toString() === task.technician?._id.toString();
  };
  