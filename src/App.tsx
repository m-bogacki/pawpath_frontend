import React from "react";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dogs from "./pages/Dogs";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <>
      <NavigationBar />
      <div className="flex wrapper w-screen h-screen">
        <div className="flex flex-col flex-auto w-full h-full pt-[80px] bg-background">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/dogs" element={<Dogs />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
