import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    this.setState({
      contacts: Array.isArray(storedContacts) ? storedContacts : [],
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      this.updateLocalStorage();
    }
  }

  updateLocalStorage = () => {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  };

  handleFilter = e => {
    this.setState({ filter: e.target.value });
  };

  handleSubmit = contact => {
    console.log('contact :>> ', contact);
    const { name } = contact;
    const { contacts } = this.state;

    const isDuplicate = contacts.some(
      existingContact =>
        existingContact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${name} is already in contacts!`);
    } else {
      this.setState(
        prevState => ({
          contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
        }),
        () => {
          this.updateLocalStorage();
        }
      );
    }
  };

  handleDeleteContact = id => {
    this.setState(
      prevState => ({
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      }),
      () => {
        this.updateLocalStorage();
      }
    );
  };

  render() {
    const { filter, contacts } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={css.container}>
        <h1 className={css.titleFirst}>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />
        <h2 className={css.titleFSecond}>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
};
