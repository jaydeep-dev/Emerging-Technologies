import React from 'react';
import { gql, useQuery, useMutation } from "@apollo/client";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
//import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
//
//
// To parse the GraphQL operations, we use a special function
// called a tagged template literal to allow us to express them
// as JavaScript strings. This function is named gql
//
// note the backquotes here
const GET_STUDENTS = gql`
{
    students{
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

const DELETE_TASK = gql`
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

//
const StudentList = () => {

    const { loading, error, data, refetch } = useQuery(GET_STUDENTS);

    //Delete Task
    const [deleteTask] = useMutation(DELETE_TASK);

    const handleDelete = (id) => {
        deleteTask({ variables: { id } });
        refetch();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (

        <div>

            <Table >
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>email</th>
                        <th>college</th>
                        <th>program</th>
                        <th>startingYear</th>
                        <th></th>

                    </tr>
                    {data.students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.id}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.email}</td>
                            <td>{student.college}</td>

                            <td>{student.program}</td>
                            <td>{student.startingYear}</td>

                            <td>
                                <Link to={`/editstudent/${student.id}`}>Edit</Link>
                                {' | '}
                                <button onClick={() => handleDelete(student.id)}>Delete</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="center">
                <button className="center" onClick={() => refetch()}>Refetch</button>
            </div>

        </div>

    );
}

export default StudentList

