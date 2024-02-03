import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import CreateListing from "./pages/CreateListing";
import Header from "./components/Header";
import Protected from "./components/Protected";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route element={<Protected />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
