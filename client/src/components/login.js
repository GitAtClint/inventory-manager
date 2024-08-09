import { useState, useEffect } from 'react';
import '../styles/HomePage.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [login, setLogin] = useState({ username: "", password: "" })
    const [registerUser, setRegisterUser] = useState({ first_name: "", last_name: "", username: "", password: "" })
    const [isRegistering, setIsRegistering] = useState(false)
    const navigate = useNavigate();

    const clickedRegister = () => {
        setIsRegistering(true);
    }
    const clickedCreateAccount = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/createAccount', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...registerUser }),
        })
            .then((response) => response.json())
            .then((registration) => {
                if (registration.message === "Account Created, Please Log in") {
                    alert(registration.message);
                    setRegisterUser({ first_name: "", last_name: "", username: "", password: "" });
                    window.location.reload();
                } else {
                    alert(registration.message);
                }
            });
    }

    const clickedLogin = (e) => {
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
                    navigate("/inventory", { state: { username: login.username } });
                    //loggedIn = true;
                    //this.goToMain();
                } else {
                    alert(result.message);
                    //alert("Please check your login info.");
                }
            });
    }
    const handleNameInput = (e) => {
        isRegistering ?
            setRegisterUser({ ...registerUser, username: e.target.value }) :
            setLogin({ ...login, username: e.target.value });
    }
    const handlePwInput = (e) => {
        isRegistering ?
            setRegisterUser({ ...registerUser, password: e.target.value }) :
            setLogin({ ...login, password: e.target.value });
    }
    const handleFirstNameInput = (e) => {
        setRegisterUser({ ...registerUser, first_name: e.target.value })
    }
    const handleLastNameInput = (e) => {
        setRegisterUser({ ...registerUser, last_name: e.target.value })
    }
    // app.post("/createAccount", async (req, res) => {
    //     const { first_name, last_name, username, password } = req.body;
    return (
        <>
        <button onClick={() => navigate("/")}>home</button>
        <div className="login-register">
            {isRegistering ?
                <form className="login-form">
                    <label for="first_name">first name:</label>
                    <input onChange={handleFirstNameInput} type="text" id="first_name" required />
                    <br />
                    <label for="last_name">last name:</label>
                    <input onChange={handleLastNameInput} type="text" id="last_name" required />
                    <br />
                    <label for="username">username:</label>
                    <input onChange={handleNameInput} type="text" id="username" required />
                    <br />
                    <label for="password">password:</label>
                    <input onChange={handlePwInput} type="text" id="password" required />
                    <br />
                    <button className="create-button" id="createAccountButton" type="submit" onClick={clickedCreateAccount}>Create Account</button>
                </form>
                :
                <form className="login-form">
                    <label for="username">username:</label>
                    <input onChange={handleNameInput} type="text" id="username" required />
                    <br />
                    <label for="password">password:</label>
                    <input onChange={handlePwInput} type="text" id="password" required />
                    <br />
                    <button className="login-button" id="loginButton" type="submit" onClick={clickedLogin}>Login</button>
                    <button className="register-button" id="registerButton" type="submit" onClick={clickedRegister}>Register</button>
                </form>
            }
        </div>
        </>
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



















