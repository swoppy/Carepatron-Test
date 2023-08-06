import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import DataProvider from "./store/DataProvider";
import Clients from "./pages/Clients";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#335FFF",
    },
  },
});

export default function App() {
  return (
    <div className="App">
      <DataProvider>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Clients />} />
            <Route path="/Clients" element={<Clients />} />
          </Routes>
        </ThemeProvider>
      </DataProvider>
    </div>
  );
}
