import React from 'react';
import './App.css';
//
const DataDisplay = ({data}) => data ? 
          <h2>{data}</h2>
          :<h2>There was no result!</h2> 
          
//
const TernaryStatementTest = () => {
    //initialize the stateful value and a function to return it
    const [loading, setLoading] = React.useState('true');
    const [data, setData] = React.useState("");    
      //
      return (
     
          <div>
                <h1>Data Loader!</h1>
                
                { loading ? 
                    <h2>It is Loading.</h2>
                    : <DataDisplay data={data}/>
                }
                
                <button onClick={() => {
                        setLoading(false )
                    }}>Data Failed </button>
                <button onClick={() => {
                        setLoading(false);
                        setData("Some data" );
                    }}>Load Data </button>
            </div>
      );


};
   
export default TernaryStatementTest;
/*
    Another option is to do an inline JSX functional component:
    <h1>Data Loader!</h1>
            { 
                () => {
                    if (loading) { 
                        return (<h2>It is Loading.</h2>)
                    } else {
                        if (data) { 
                            return (<h2>{data}</h2>)
                        } else {
                            return <h2>There was no result!</h2> 
                        }
                    }
                }
            }
*/