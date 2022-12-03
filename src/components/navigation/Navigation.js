import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Navigation({ darkMode, setDarkMode }) {
  return (
    <>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Topbar />
    </>
  );
}
