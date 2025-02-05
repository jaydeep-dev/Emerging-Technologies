import React, { useState } from 'react'; 
//
const App = () => {
    const [count, setCount] = useState(0)
    //
    const onClick = () => {
        console.log('clicked', count)
        setCount(count + 1)
    }
    console.log('rendered', count) 

    //
    return (
    <>
    <Title onClick={onClick} />
    <Content count={count} />

    </>
    )
}

const Title = ({ onClick }) => {

    const [count, setCount] = useState(0)
  
    //return <button>+</button>
    return <button onClick={onClick}>+</button>

  
  }
  
  const Content = ({count}) => {
    console.log({count})
  
    return <>{count}</>
  
  }

  export default App;