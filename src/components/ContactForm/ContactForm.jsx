import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = formData;

    onSubmit({ name, number });
    setFormData({ name: '', number: '' });
  };

  const { name, number } = formData;

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.input} htmlFor="name">
        Name
      </label>
      <input
        className={css.form}
        id="name"
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        required
      />

      <label className={css.label} htmlFor="tel">
        Number
      </label>
      <input
        className={css.input}
        id="tel"
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        required
      />

      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
