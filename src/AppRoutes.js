import {Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePageWithTabs";
import {LoginPage} from "./components/dialogs/LoginPage";
import {SignUpPage} from "./components/dialogs/SignUpPage";
import {PasswordSetupPage} from "./components/dialogs/PasswordSetupPage";
import React from "react";

export const AppRoutes = () => {
    return <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/signup/password" element={<PasswordSetupPage/>}/>
    </Routes>
}