import React, { useState } from 'react';
import './contact-form.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        comments: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Send form data to the server or handle form submission here
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label>
                Name:
                <input className="input" type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <br />
            <label>
                Email:
                <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <br />
            <label>
                Comments:
                <textarea className="textarea" name="comments" value={formData.comments} onChange={handleChange} required />
            </label>
            <br />
            <button className="submit-button" type="submit">Submit</button>
        </form>
    );
};

export default ContactForm;
