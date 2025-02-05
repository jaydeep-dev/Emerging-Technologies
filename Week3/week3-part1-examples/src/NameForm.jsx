import React from 'react';
import './App.css';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    //initialize the property value
    this.state = {value: ''};
    // a must for class components
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //update the state with new value coming from input field
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //display the current value
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault(); //prevent a browser reload/refresh
  }
  //build the form here
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default NameForm;
