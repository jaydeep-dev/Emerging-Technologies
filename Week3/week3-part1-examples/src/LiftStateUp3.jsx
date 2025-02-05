import React, { useState } from 'react';

// Parent component that holds the state
const App = () => {
  const [userName, setUserName] = useState('John Doe');

  return (
    <div>
      <EditUserName userName={userName} setUserName={setUserName} />
      <DisplayUserName userName={userName} />
    </div>
  );
};

// Child component for editing the user's name
const EditUserName = ({ userName, setUserName }) => {
  return (
    <input
      type="text"
      value={userName}
      onChange={(e) => setUserName(e.target.value)}
      placeholder="Edit name..."
    />
  );
};

// Child component for displaying the user's name
const DisplayUserName = ({ userName }) => {
  return <h1>Welcome, {userName}!</h1>;
};

export default App;
