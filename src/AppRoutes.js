import {Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePageWithTabs";
import {LoginPage} from "./components/Dialogs/LoginPage";
import {SignUpPage} from "./components/Dialogs/SignUpPage";
import {PasswordSetupPage} from "./components/Dialogs/PasswordSetupPage";
import React from "react";

export const AppRoutes = () => {
    return <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/signup/password" element={<PasswordSetupPage/>}/>
    </Routes>
}