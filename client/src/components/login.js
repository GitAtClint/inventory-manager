import { useState, useEffect } from 'react';
import '../styles/HomePage.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [login, setLogin] = useState({ username: "", password: "" })
    const navigate = useNavigate();

    const clickLogin = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: login.username,
                password: login.password
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.message === "logged in") {
                    alert("You are logged in.");
                    navigate("/inventory", {state: {username: login.username}});
                    //loggedIn = true;
                    //this.goToMain();
                } else {
                    alert(result.message);
                    //alert("Please check your login info.");
                }
            });
    }
    const handleNameInput = (e) => {
        setLogin({ ...login, username: e.target.value });
    }
    const handlePwInput = (e) => {
        setLogin({ ...login, password: e.target.value });
    }

    return (
        <form className="login-form">
            <label for="username">username:</label>
            <input className="login-form" onChange={handleNameInput} type="text" id="username" required />
            <br />
            <label for="password">password:</label>
            <input className="login-form" onChange={handlePwInput} type="text" id="password" required />
            <br />
            <button className="login-button" id="loginButton" type="submit" onClick={clickLogin}>Login</button>
            <button onClick={() => navigate("/")}>home</button>
        </form>
    );
}



// import React from 'react'
// import {
//     ThemeProvider,
//     theme,
//     ColorModeProvider,
//     CSSReset,
//     Box,
//     Flex,
//     IconButton,
//     useColorMode
// } from '@chakra-ui/react'

// export default function login() {
//     return (
//         <ThemeProvider theme={theme}>
//             <ColorModeProvider>
//                 <CSSReset />
//                 <LoginArea />
//             </ColorModeProvider>
//         </ThemeProvider>
//     );
// }

// const LoginArea = () => {
//     return (
//         <Flex>
//             <Box>
//                 <ThemeSelector />

//             </Box>
//         </Flex>
//     )
// }

// const ThemeSelector = () => {
//     const {colorMode, toggleColorMode } = useColorMode()
//     return (
//         <Box>
//             <IconButton icon='sun' />
//         </Box>
//     )
// }



















