import React from 'react';
import './App.css';
//
const FunctReservationFormApp = () => {

//initialize the stateful value and a function to return it
const [isGoing, setIsGoing] = React.useState(true);
const [numberOfGuests, setNumberOfGuests] = React.useState(2);
//
const showInputs = e => {
  e.preventDefault();
  alert(isGoing);
};
//
const handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if(target.type === 'checkbox')
    
        setIsGoing(target.checked);
    else
        setNumberOfGuests(target.value)
    //    
    console.log('name=',name)
    console.log('value=',value)
    console.log('[name]=',[name])

    //
    //setName({ [name]: value });
    //this.setState({ [name]: value });
  }
  //
  return (
    <form onSubmit={showInputs}>
      <label>
        Is going:
        <input
          name="chkIsGoing"
          type="checkbox"
          checked={isGoing}
          onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Number of guests:
        <input
          name="nrOfGuests"
          type="number"
          value={numberOfGuests}
          onChange={handleInputChange} />
      </label>
      <br />
      <button>Submit</button>

    </form>

  );

};
   
export default FunctReservationFormApp;