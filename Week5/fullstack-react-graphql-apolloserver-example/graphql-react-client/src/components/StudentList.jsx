// StudentList component is used to display the list of students
// in a table format.
import React from 'react';
import { gql, useQuery, useMutation } from "@apollo/client";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
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
//
const StudentList = () => {

    const { loading, error, data, refetch } = useQuery(GET_STUDENTS);

    const DELETE_STUDENT = gql`
mutation DeleteStudent($id: ID!) {
deleteStudent(id: $id) {
id
firstName
lastName
}
}
`;

  const [deleteStudent] = useMutation(DELETE_STUDENT);

    const handleDelete = async (id) => {
        try {
            await deleteStudent({ variables: { id } });
            refetch(); // Refresh the student list
        } catch (error) {
            console.error('Error deleting student:', error);
        }
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
                            </td>

                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(student.id)}>
                                    Delete
                                </Button>
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

