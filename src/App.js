import {LoginPage} from './components/Dialogs/LoginPage';
import {createGlobalStyle} from 'styled-components';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import {SignUpPage} from "./components/Dialogs/SignUpPage";
import {PasswordSetupPage} from "./components/Dialogs/PasswordSetupPage";
import HomePage from "./components/HomePageWithTabs";

const GlobalStyle = createGlobalStyle`
    :root {
        --army-green: #3b5d3a;
        --army-green-dark: #2f4a2e;
        --olive: #6b8f5b;
        --khaki: #a89f7b;
        --sand: #d2c29d;
        --black-80: rgba(0, 0, 0, 0.8);
        --black-60: rgba(0, 0, 0, 0.6);
        --accent: #c7d36f;
        --accent-2: #e8f2a9;
        --danger: #ff6b6b;
    }
`;


function App() {
    return <BrowserRouter>
        <GlobalStyle/>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/signup/password" element={<PasswordSetupPage/>}/>
        </Routes>
    </BrowserRouter>
}

export default App;
