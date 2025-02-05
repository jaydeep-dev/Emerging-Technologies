import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

import './ListGames.css'
import CreateArticle from './CreateArticle';

//
// this component is used to list all articles
function ListArticles(props) {
  let navigate = useNavigate();
  //
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "api/api/articles";

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {

      const resp = await axios.get('/api/welcome');
      console.log('Response of welcome', resp);

      await axios.get(apiUrl, { signal: abortController.signal })
        .then(result => {
          console.log('result.data:', result.data)
          //check if the user has logged in
          if (result.data.screen !== 'auth') {
            console.log('data in if:', result.data)
            setData(result.data);
            setShowLoading(false);
          }
        }).catch((error) => {
          console.log('error in fetchData:', error)
        });
    };
    fetchData();

    return () => abortController.abort();
  }, []);

  const showDetail = (id) => {
    navigate('/showarticle/' + id);
  }

  const [createGame, setCreateGame] = useState(false);

  return (
    <div>
      {data.length !== 0
        ? createGame ? <CreateArticle /> : <div className='MyLibraryList'>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>}
          <ListGroup className="MyCustomGrid">
            {data.map((item, idx) => (
              <ListGroup.Item className="Item" key={idx} action onClick={() => showDetail(item._id)}>
                {item.title}
              </ListGroup.Item>
            ))}

            <ListGroup.Item className="Item AddGame" action onClick={() => setCreateGame(true)}>
              Add Game
            </ListGroup.Item>
          </ListGroup>
        </div>
        : < Login />
      }
    </div>

  );
}
//
export default ListArticles;
