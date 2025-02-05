import React, { useState } from 'react'; 
//
const App = () => {

    const [count, setCount] = useState(0)
    //
    const onClick = () => {
  
      console.log('clicked', count)
      // update the count
      setCount(count + 1)
  
    }
  
    console.log('rendered', count) 
  
    return (
    <div>
      <h2> counter={count}</h2>
    <Title onClick={onClick} />
    </div>
    )
  
  }
  // this function component passes onClick as props
  const Title = ({ onClick }) => {
    // calls onClick on the parent - hence lifting the state up
    return <button onClick={onClick}>+</button>
  
  }
  //
  export default App;