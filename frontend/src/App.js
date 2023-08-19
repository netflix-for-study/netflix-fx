import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./pages/SignIn";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import TvShows from "./pages/TvShows";
import Movies from "./pages/Movies";
import Latest from "./pages/Latest";
import MyLists from "./pages/MyLists";

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/TvShows" element={<TvShows />} />
        <Route exact path="/Movies" element={<Movies />} />
        <Route exact path="/Latest" element={<Latest />} />
        <Route exact path="/MyLists" element={<MyLists />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
