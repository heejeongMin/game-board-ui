import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import CreateDashboard from "./Pages/CreateDashboard";

import React from "react";
import { AuthProvider, RequireAuth } from "react-auth-kit";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<CreateDashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </React.StrictMode>
    // <React.StrictMode>
    //   <AuthProvider
    //     authType={"cookie"}
    //     authName={"_auth"}
    //     cookieDomain={window.location.hostname}
    //     cookieSecure
    //   >
    //     <BrowserRouter>
    //       <div className="App">
    //         <Routes>
    //           <Route
    //             path="/"
    //             element={
    //               <RequireAuth loginPath="/login">
    //                 <Home />
    //               </RequireAuth>
    //             }
    //           />
    //           <Route path="/login" element={<Login />}></Route>
    //           <Route path="/" element={<Home />}></Route>
    //           <Route path="/dashboard" element={<Dashboard />} />
    //           <Route path="/create" element={<CreateDashboard />} />
    //         </Routes>
    //       </div>
    //     </BrowserRouter>
    //   </AuthProvider>
    // </React.StrictMode>
  );
}

export default App;
