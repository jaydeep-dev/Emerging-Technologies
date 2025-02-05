import CreateArticle from './CreateArticle';
import ListArticles from './ListArticles';
import Button from 'react-bootstrap/Button';

import React, { useState } from 'react';
//
import axios from 'axios';
//
function View(props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [articleOperation, setArticleOperation] = useState('no-op');
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable 
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get('/api/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Verify Cookie button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyCookie = async () => {
    try {
      const res = await axios.get('/api/welcome');
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  //
  const listArticles = (username) => {

    console.log('in listArticles: ', username)

  }
  //
  const createArticle = () => {
    console.log('in createArticle')

  }
  //
  return (
    <div className="App">
      {
        (() => {
          switch (articleOperation) {
            case 'list':
              return <ListArticles />
            case 'create':
              return <CreateArticle screen={screen} setScreen={setScreen} />

            default:
              return <div>
                <h1><p>{screen}</p>
                <p>{data}</p></h1>
                <p>
                  {/* <Button onClick={verifyCookie}>Verify Cookie</Button> */}
                  <Button onClick={() => setArticleOperation('create')}>Add game</Button>
                  &nbsp;
                  <Button onClick={() => setArticleOperation('list')}>List games</Button>
                  &nbsp;
                  <Button onClick={deleteCookie}>Log out</Button>
                </p>
              </div>
          }
        })()

      }

    </div>
  );
}
//
export default View;