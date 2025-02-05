import React from 'react';
import './App.css';
import './simple_form.css'
//
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//
const FunctNamingFormApp = () => {
    //initialize the stateful value and a function to return it
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [middleName, setMiddleName] = React.useState('');
    // a variable to store the state of the student number
    const [studentNumber, setStudentNumber] = React.useState('');

    // handle onChange event for student number
    const handleChangeStudentNumber = event => { 
      //update name with what's coming from input field 
      setStudentNumber(event.target.value);
    };

    // handle onChange event for first name
    const handleChange1 = event => {
        //update name with what's coming from input field
        setFirstName(event.target.value);

    };
    // handle onChange event for last name
    const handleChange2 = event => {
      //update name with what's coming from input field
      setLastName(event.target.value);

  };
  // handle onChange event for middle name
  const handleChangeMiddleName = event => {

    setMiddleName(event.target.value)
  }
  
  
  //handle onSubmit event
    const handleSubmit = event => {
      if (firstName) {
        //display the current value
        alert('A name was submitted from functional form: '
         + firstName + ', ' + lastName + ', ' 
         + studentNumber + ',' + middleName);
      }
      //initialize the stateful value
      setFirstName('');
      setLastName('');
      setStudentNumber('');
      //prevent a browser reload/refresh
      event.preventDefault();
    };
   
    return (
      <div className='simple_form'>
        <h1> You entered: {firstName} </h1>
        
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label> First Name:</Form.Label>
            <Form.Control type="text"  value={firstName} onChange={handleChange1} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Last Name:</Form.Label>
            <Form.Control type="text"  value={lastName} onChange={handleChange2} />
          </Form.Group>

          <Form.Group>
            <Form.Label> Middle Name:</Form.Label>
            <Form.Control type="text"  value={middleName} onChange={handleChangeMiddleName} />
          </Form.Group>


          <Form.Group>
            <Form.Label> Student Number:</Form.Label>
            <Form.Control type="text"  value={studentNumber} onChange={handleChangeStudentNumber} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Display Name
          </Button>

        </Form>
   
        
      </div>
    );
  };
   
  export default FunctNamingFormApp;
  