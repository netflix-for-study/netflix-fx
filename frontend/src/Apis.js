import React, { useEffect, useState } from "react";
import { API_PATHS } from "./utils/constants";
import { handleFetch } from "./utils/functions";

const Apis = () => {
  const [loading, setLoding] = useState(true);
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useState([]);
  const [movies, setMovies] = useState([]);
  const [profile, setProfile] = useState([]);
  const [oauth, setOauth] = useState([]);

  const getApis = async () => {
    handleFetch(API_PATHS.MOVIES, (data) => {
      setMovies(data);

      console.log(`movies: ${data}`);
    });

    handleFetch(API_PATHS.USERS, (data) => {
      setUsers(data);

      console.log(`users: ${data}`);
    });

    handleFetch(API_PATHS.AUTH, (data) => {
      setAuth(data);

      console.log(`auth: ${data}`);
    });

    handleFetch(API_PATHS.PROFILE, (data) => {
      setProfile(data);

      console.log(`profile: ${data}`);
    });

    handleFetch(API_PATHS.OAUTH, (data) => {
      setOauth(data);

      console.log(`oauth: ${data}`);
    });

    setLoding(false);
  };

  useEffect(() => {
    getApis();
  }, []);

  return <div></div>;
};

export default Apis;
