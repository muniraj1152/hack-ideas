import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './Login.module.scss';

import logo from '../../assets/images/logo.png';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

export default function Login() {
  const [empId, setEmpId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    empId: '',
  });

  const getLastUserId = () => {
    return Number(localStorage.getItem('lastUserId')) || 0;
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onLogin = () => {
    let isLoginSuccess = false;
    const users = getUsers();
    users &&
      users.map((user: any) => {
        if (user.empId === empId) {
          isLoginSuccess = true;
          return;
        }
      });
    if (isLoginSuccess) {
      history.push('home');
      localStorage.setItem('loggedInUserId', empId);
      setEmpId('');
    } else {
      alert('Please enter valid employee ID');
    }
  };

  const getUsers = () => {
    const userStr: any = localStorage.getItem('users');
    const users: any = JSON.parse(userStr) || [];
    return users;
  };

  /**
   * To create new user
   */
  const onRegister = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setIsOpen(false);
      const users: any = getUsers();
      users.push({ ...user, empId: `SB-${getLastUserId() + 1}` });
      localStorage.setItem('lastUserId', `${getLastUserId() + 1}`);
      localStorage.setItem('users', JSON.stringify(users));
      setEmpId('');
    }
  };

  const openModal = () => {
    setIsOpen(true);
    setUser({
      firstName: '',
      lastName: '',
      empId: '',
    });
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={`${styles.loginContainer} row`}>
      <div className="m-auto row justify-content-center">
        <div className={`${styles.loginForm} p-4 bg-white`}>
          <div>
            <img src={logo} className="w-50" />
          </div>
          <div>
            <label className="title pt-4 pb-3">
              Login with your Employee ID
            </label>
            <input
              type="text"
              className="form-control"
              value={empId}
              onChange={(e: any) => setEmpId(e.target.value)}
            ></input>
            <button
              type="button"
              className="btn btn-primary w-100 my-3"
              onClick={onLogin}
            >
              Login
            </button>
            <div className="bg-primary-5 font-15 py-3 text-center title">
              Don’t have an account?
              <span
                className="cursor-pointer  text-primary pl-2"
                onClick={openModal}
              >
                Register
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Register form */}
      <div>
        <Modal show={isOpen} onHide={hideModal} animation={false}>
          <Form onSubmit={onRegister}>
            <Modal.Header>
              <Modal.Title>Add Idea</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  defaultValue={user.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  defaultValue={user.lastName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label> Your Employee ID</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  defaultValue={`SB-${getLastUserId() + 1}`}
                />
              </Form.Group>
              <span className="pt-2 text-success font-15">
                Please save you employee ID
              </span>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={hideModal} className="btn btn-secondary">
                Cancel
              </button>
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
