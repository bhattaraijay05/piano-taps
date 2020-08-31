import React from "react";
import Home from "./Screens/Screen/Home";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <Home />
      <StatusBar hidden />
    </>
  );
}
