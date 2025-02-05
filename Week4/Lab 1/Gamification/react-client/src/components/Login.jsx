import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login.css'
import axios from 'axios';
import ListArticles from './ListArticles';
import { useNavigate } from 'react-router-dom';

function Login({ setAuthStatus }) {

  let navigation = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = "/api/signin";

  const authenticateUser = async () => {
    console.log('calling auth')
    console.log(username)
    try {
      const loginData = { auth: { username, password } }
      const res = await axios.post(apiUrl, loginData);

      if (res.data.screen !== 'auth') {
        console.log(res.data.screen);
        console.log("Games", res.data.games);
        setAuthStatus(true)
        navigation('/library')
      }
    } catch (e) {
      console.log(e);
      setAuthStatus(false)
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    const readCookie = async () => {
      try {
        console.log('--- in readCookie function ---');

        //
        const res = await axios.get('/api/read_cookie', { signal: abortController.signal });
        // 
        if (res.data.screen !== 'auth') {
          setAuthStatus && setAuthStatus(true)
          navigation('/library')
        }
      } catch (e) {
        console.log(e);
        setAuthStatus && setAuthStatus(false)
      }
    };

    readCookie();

    return () => abortController.abort();
  }, []);

  return (
    <div className="App">
      <div>
        <Form >
          <Form.Group size="lg" >
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" name="username" id="username" placeholder="Enter user name" onChange={e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group size="lg" >
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" name="password" id="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <Button size="lg" variant="primary" type="Button" onClick={authenticateUser}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
//
export default Login;

