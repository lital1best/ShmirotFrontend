import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePageWithTabs";
import {LoginPage} from "./pages/Auth/LoginPage";
import {SignUpPage} from "./pages/Auth/SignUp/SignUpPage";
import {PasswordSetupPage} from "./pages/Auth/SignUp/PasswordSetupPage";
import React from "react";

export const AppRoutes = () => {
    return <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/signup/password" element={<PasswordSetupPage/>}/>
    </Routes>
}