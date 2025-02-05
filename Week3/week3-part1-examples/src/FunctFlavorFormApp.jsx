import React from 'react';
import './App.css';
//
const FunctFlavorFormApp = () => {
    //initialize the stateful value and a function to return it
    const [flavorName, setFlavorName] = React.useState('lime');
    // handle onChange event
    const handleChange = event => {
        //update name with what's coming from input field
        setFlavorName(event.target.value);
    };
    //handle onSubmit event
    const handleSubmit = event => {
        if (flavorName) {
          //display the current value
          alert('A name was submitted: ' + flavorName);
        }
        //initialize the stateful value
        setFlavorName('coconut');
        //prevent a browser reload/refresh
        event.preventDefault();
      };
      //
      return (
     
          <form onSubmit={handleSubmit}>
                <h1> You selected: {flavorName}</h1>            
                <label>
                    Pick your favorite flavor:
                    <select value={flavorName} onChange={handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
            <button type="submit">Submit</button>
          </form>
      );


};
   
export default FunctFlavorFormApp;