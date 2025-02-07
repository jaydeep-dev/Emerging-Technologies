import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import MeshRenderer from './MeshRenderer'
import { useNavigate, useParams } from 'react-router-dom';
//
// this component is used to show a single article
function ShowArticle(props) {
  let navigate = useNavigate()
  let { id } = useParams();
  //
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/api/articles/" + id;

  useEffect(() => {
    setShowLoading(true)
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log('results from articles', result.data);

      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editArticle = (id) => {
    navigate('/editarticle/' + id);

  };

  const deleteArticle = (id) => {
    setShowLoading(true);
    const article = { title: data.title, content: data.content };
    //
    axios.delete(apiUrl, article)
      .then((result) => {
        setShowLoading(false);
        navigate('/library')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>}
      <h1>Title: {data.title}</h1>
      <p>Genre: {data.genre}</p>
      <p>Platform: {data.platform}</p>
      <p>Release year: {data.releaseYear}</p>
      <p>Developer: {data.developer}</p>
      <p>Rating: {data.rating}</p>
      <p>Description: {data.description}</p>

      <p>
        <Button type="button" variant="primary" onClick={() => { editArticle(data._id) }}>Edit</Button>&nbsp;
        <Button type="button" variant="danger" onClick={() => { deleteArticle(data._id) }}>Delete</Button>
      </p>
      
      <MeshRenderer />
    </div>
  );
}

export default ShowArticle;
