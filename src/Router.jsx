import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./components/Details";
import Error from "./components/Error";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import View from "./components/View";
import Add from "./components/Add";
//for routing elements using paths
export default function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/view" element={<View />} />
          <Route exact path="/view/add" element={<Add />} />
          <Route exact path="/details" element={<Details />} />
          <Route exact path="*" element={<Error />} />{" "}
          {/* if user give improper path Error will show  */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
