
import React, { Component }  from 'react';
import ListArticles from "./ListArticles";
//
// this is the home page component
function Home(props)
{
    return (
        <div>
            <h2> Game Library: <b>Online</b> </h2>
            <p>A safe web-based solution to monitor all your games!</p>
            { <ListArticles /> }
        </div>
    );

}
// withRouter will pass updated match, location, and history props 
// to the wrapped component whenever it renders.
export default Home;