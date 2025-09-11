import {Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePageWithTabs";
import {LoginPage} from "./components/Dialogs/LoginPage";
import {SignUpPage} from "./components/Dialogs/SignUpPage";
import {PasswordSetupPage} from "./components/Dialogs/PasswordSetupPage";
import React from "react";
import {UserContext, useUser} from "./userContext";

export const AppRoutes = () => {
    const {login} = useUser(UserContext);

    return <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage login={login}/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/signup/password" element={<PasswordSetupPage login={login}/>}/>
    </Routes>

}