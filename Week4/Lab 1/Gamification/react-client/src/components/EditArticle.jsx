import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
// this component is used to edit an article
function EditArticle(props) {
  //
  let navigate = useNavigate();
  // Get the userId param from the URL.
  let { id } = useParams();
  console.log(id)
  //
  const [article, setArticle] = useState({ _id: '', title: '', genre: '', platform: '', releaseYear: 0, developer: '', rating: 0, description: '' });
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/api/articles/" + id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setArticle(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateArticle = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { title: article.title, genre: article.genre, platform: article.platform, releaseYear: article.releaseYear, developer: article.developer, rating: article.rating, description: article.description };
    //mimicks very much REST calls
    axios.put(apiUrl, data)
      .then((result) => {
        console.log('after calling put to update', result.data)
        setShowLoading(false);
        navigate('/showarticle/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    setArticle({ ...article, [e.target.name]: e.target.value });
  }

  return (
    <div>
      {showLoading &&
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      }
      <Form onSubmit={updateArticle}>
        <Form.Group>
          <Form.Label> Title</Form.Label>
          <Form.Control type="text" name="title" id="title" placeholder="Enter title" value={article.title} onChange={onChange} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label> Genre</Form.Label>
          <Form.Control type="text" name="genre" id="genre" placeholder="Enter genre" value={article.genre} onChange={onChange} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label> Platform</Form.Label>
          <Form.Control type="text" name="platform" id="platform" placeholder="Enter platform" value={article.platform} onChange={onChange} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label> Release Year</Form.Label>
          <Form.Control type="number" name="releaseYear" id="releaseYear" placeholder="Enter release year" value={article.releaseYear} onChange={onChange} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label> Developer</Form.Label>
          <Form.Control type="text" name="developer" id="developer" placeholder="Enter developer company/name" value={article.developer} onChange={onChange} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label> Rating</Form.Label>
          <Form.Control class="form-range" min="0" max="5" step="0.5" type='range' name="rating" id="rating" placeholder="Enter rating" value={article.rating} onChange={onChange} />
        </Form.Group>
        <br></br>
        <Form.Group>
          <Form.Label> Description</Form.Label>
          <Form.Control as="textarea" rows="3" name="description" id="description" placeholder="Enter description" value={article.description} onChange={onChange} />
        </Form.Group>
        <br />



        <Button variant="primary" type="submit">
          Update Article
        </Button>
      </Form>
    </div>
  );
}
//
export default EditArticle;
