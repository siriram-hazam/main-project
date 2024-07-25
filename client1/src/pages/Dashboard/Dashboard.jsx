import React, { useEffect, useState } from "react";

// hooks
import authUtils from "../../hooks/useAuth";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await authUtils.checkUser();
        setCheckUser(user);
      } catch (error) {
        console.error("Error Dashboard checkUser : ", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const loadUser = async () => {
      try {
        const user = await authUtils.userProfile();
        setUser(user);
        // console.log(user);
      } catch (error) {
        console.error("Error Dashboard loadUser : ", error);
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
    return <div>Failed to load user data</div>;
  }

  return (
    <>
      {/* <a>{user.data.status}</a> */}
      {/* {user ? user.data.role : "Loading..."}. */}
      {checkUser.data.role} <br />
      {user.data.users.username} <br />
      {user.data.users.company_relation.companyName}
    </>
  );
};

export default Dashboard;
