import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/contact');
      if (response.data.success) {
        setContacts(response.data.contacts);
      } else {
        setError('Failed to fetch contacts');
      }
    } catch (error) {
      console.log(error);
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5050/api/contact',
        formData
      );
      if (response.data.success) {
        setIsModalOpen(false);
        setFormData({ name: '', email: '', phone: '', address: '' });
        fetchContacts();
      }
    } catch (error) {
      console.log(error);

      alert('Error submitting contact');
    }
  };

  const handleDelete = async (email) => {
    try {
      const response = await axios.delete(
        'http://localhost:5050/api/contact?email=' + email
      );
      if (response.data.success) {
        fetchContacts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="container">
      <h2 className="title">Contact List</h2>
      <button className="add-button" onClick={() => setIsModalOpen(true)}>
        Add Contact
      </button>
      <div className="grid">
        {contacts.map((contact, index) => (
          <div key={index} className="card">
            <h3 className="card-title">{contact.name}</h3>
            <p className="card-text">📧 {contact.email}</p>
            <p className="card-text">📞 {contact.phone}</p>
            <p className="card-text">🏠 {contact.address}</p>

            <p
              className="card-delete"
              onClick={() => {
                handleDelete(contact.email);
              }}
            >
              Delete
            </p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="modal-title">Add New Contact</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
              <div className="modal-buttons">
                <button type="submit" className="submit-button">
                  Submit
                </button>
                <button
                  type="button"
                  className="close-button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
