import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;

    this.props.onSubmit({ name, number });
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label className={css.input} htmlFor="name">
          Name
        </label>
        <input
          className={css.form}
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
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
          onChange={this.handleChange}
          required
        />

        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
