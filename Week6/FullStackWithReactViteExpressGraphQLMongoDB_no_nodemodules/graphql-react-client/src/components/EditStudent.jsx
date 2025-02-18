
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// 
const GET_STUDENT = gql`
  query GetStudent($id: String!) {
    student(id: $id) {
      firstName
      lastName
      email
      college
      program
      startingYear

    }
  }
`;
//
const UPDATE_STUDENT = gql`
  mutation UpdateStudent($id: String!, $firstName: String!, $lastName: String!, 
    $email: String!, $college: String!, $program: String!, $startingYear: Int!) {
    updateStudent(id: $id, firstName: $firstName, lastName: $lastName, 
        email: $email, college: $college, program: $program, startingYear: $startingYear ) {
        id
        firstName
        lastName
        email
        college
        program
        startingYear
        
    }
  }
`;


//
function EditStudent(props) {
  let navigate = useNavigate();
  const { id } = useParams(); // Get the id parameter from the URL
  console.log('in EditStudent, id=', id);
  //
  const { loading, error, data } = useQuery(GET_STUDENT, {
    variables: { id },
    onCompleted: (data) => {
      const { firstName: currentFirstName, lastName: currentLastName,
        email: currentEmail, college: currentCollege, program: currentProgram,
        startingYear: currentStartingYear } = data.student;
      console.log('onCompleted data.student: ', data.student)
      //
      setStudent({
        id, firstName: currentFirstName, lastName: currentLastName,
        email: currentEmail, college: currentCollege, program: currentProgram,
        startingYear: currentStartingYear
      });

    },
  });
  // print error
  if (error) { console.log('error=', error); }
  //print data
  if (data) { console.log('data=', data); }

  //
  const [updateStudent, { data: mutationData, error: mutationError }] = useMutation(UPDATE_STUDENT);


  const [student, setStudent] = useState({
    id: '', firstName: '', lastName: '', email: '',
    college: '', program: '', startingYear: 0
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  //
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('in handleSubmit, student=', student);
    try {
      const { data } = await updateStudent({ variables: { id, ...student } });
      console.log('Mutation Response:', data);
      navigate('/studentlist');
    } catch (error) {
      console.error('Mutation Error:', error);
    }
  };
  //
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: name === "startingYear" ? parseInt(value, 10) : value,
    }));
  };


  //
  return (
    <div>
      <h1>Edit Student</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={student.firstName || data.student.firstName}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formLasttName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={student.lastName || data.student.lastName}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Enter email"
            value={student.email || data.student.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formCollege">
          <Form.Label>College</Form.Label>
          <Form.Control
            type="text"
            name="college"
            placeholder="Enter college"
            value={student.college || data.student.college}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formProgram">
          <Form.Label>Program</Form.Label>
          <Form.Control
            type="text"
            name="program"
            placeholder="Enter program"
            value={student.program || data.student.program}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formStartingYear">
          <Form.Label>Starting Year</Form.Label>
          <Form.Control
            type="number"
            name="startingYear"
            placeholder="Enter starting year"
            value={student.startingYear || data?.student?.startingYear}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );

}

export default EditStudent;