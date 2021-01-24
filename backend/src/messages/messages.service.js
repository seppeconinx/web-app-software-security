/**
 * Service Methods
 */

const getPublicMessage = () => {
    return {
      message: "The API doesn't require an access token to share this message.",
    };
  };
  
  const getProtectedMessage = () => {
    return {
      message: "The API successfully validated your access token.",
    };
  };

  const getRolesMessage = () => {
    return {
      message: "The API successfully validated your role and token.",
    };
  };
  
  module.exports = {
    getPublicMessage,
    getProtectedMessage,
    getRolesMessage
  };