import React, { useEffect, useState } from "react";

import authUtils from "../../hooks/useAuth";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await authUtils.checkUser();
        setCheckUser(user);
        // console.log(user);
      } catch (error) {
        console.error("Error Activities checkUser : ", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const loadUser = async () => {
      try {
        const user = await authUtils.userProfile();
        setUser(user);
        // console.log(user.data.users.id);
        console.log("User Data : ", user);
      } catch (error) {
        console.error("Error Activities loadUser : ", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !checkUser) {
    return <div>Initializing load user data...</div>;
  }

  return <div>editProfile</div>;
};

export default EditProfile;
