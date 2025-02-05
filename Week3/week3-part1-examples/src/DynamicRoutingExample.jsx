import React from "react";
import ReactDOM from "react-dom";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./styles.css";

const courses = [
  {
    name: 'Emerging Technologies'
  },
  {
    name: 'Deep Learning'
  },
  {
    name: 'Natural Language Processing'
  }
];
// HomePage component
const HomePage = () => {
  return <h3>Home Page</h3>;
};
// AboutPage component
const AboutPage = () => {
  return <h3>About Page</h3>;
};
// CoursesPage component
const CoursesPage = () => {
  return (
    <>
      {/* The map method calls the callback function
          one time for each element in the array */}
      {courses.map((course, index) => (
        <h5 key={index}>
          <Link to={`/course/${index}`}>{course.name}'s Page</Link>
        </h5>
      ))}
    </>
  );
};
// CoursePage component
const CoursePage = () => {
  // Returns an object of key/value pairs of the dynamic params from the current URL
  //  that were matched by the route path.
  const { index } = useParams();

  return (
    <> { /* JSX needs a parent element */}
      <p>
        <strong>Course Id: </strong>
        {index}
      </p>
      <p>
        <strong>Course Name: </strong>
        {courses[index].name}
      </p>
    </>
  );
};

// main component App
const App = () => {
  return (
    <section className="App">
      <Router>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/courses">Courses</Link>

        <Routes>
          
          <Route  path="/" element={<HomePage/>} > </Route>
          <Route  path="/courses" element={<CoursesPage/>} > </Route>
          <Route  path="/course/:index" element={<CoursePage/>} > </Route>
          <Route  path="/about" element={<AboutPage/>} > </Route>

        </Routes>
        
      </Router>
    </section>
  );
};

export default App;
