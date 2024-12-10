const getCurrentUser = () => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      console.log("Retrieved user:", JSON.parse(user));
      return JSON.parse(user);
    } else {
      console.log("No current user found.");
      return null;
    }
  };
  

export default  getCurrentUser;