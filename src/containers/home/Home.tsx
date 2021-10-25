import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { Form, Badge } from 'react-bootstrap';

import styles from './Home.module.scss';

import {
  addIdea,
  getIdeaList,
  getIdeasByTitle,
} from '../../store/ideas/actions';
import { getIdeaListSelector } from '../../store/ideas/selectors';
import { IIdea } from '../../store/ideas/types';

import TagInput from '../../components/tagInput/TagInput';

const ideaInitialState: IIdea = {
  id: 0,
  title: '',
  tags: ['tech', 'future'],
  description: '',
  employeeId: '',
};

const Home = () => {
  const [validated, setValidated] = useState(false);
  const ideaList = useSelector(getIdeaListSelector);

  const [idea, setIdea] = useState(ideaInitialState);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setIdea((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIdeaList());
  }, [dispatch]);

  /**
   * To create new idea
   */
  const saveIdea = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    dispatch(addIdea(idea));
    setIsOpen(false);
    setIdea(ideaInitialState);
  };

  /**
   * Get idea list based on idea title
   * @param event
   */
  const searchIdea = (event: any) => {
    const searchValue = event.target.value;
    dispatch(getIdeasByTitle(searchValue.toLowerCase()));
  };

  const onTagChange = (value: any) => {
    console.log('val----', value);
    setIdea({
      ...idea,
      tags: value,
    });
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`${styles.container} col-sm-12 col-md-7 col-xl-6 px-5 mx-auto`}
    >
      <div className="row justify-content-between mx-0 px-2 pt-5">
        <label className={styles.mainTitle}>Ideas</label>
        <button
          type="button"
          className={`btn ${styles.btnPrimaryLight} border-0`}
          onClick={openModal}
        >
          Add Idea
        </button>
      </div>
      <div className="p-2">
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search idea by title"
              onChange={searchIdea}
            />
          </Form.Group>
        </Form>
      </div>

      {/* List of Notes content , every note display as card with specific title, description and category*/}
      <div className={styles.cardContainer}>
        {ideaList &&
          ideaList.map((idea: any, index: any) => {
            return (
              <div className="card mx-2 mb-3" key={index}>
                <div className="card-body">
                  <h5 className="card-title">{idea.title}</h5>
                  <p className="card-text">{idea.description}</p>
                  <div className="border-bottom mb-3">
                    <label>Tags</label>
                    <div className="mb-3">
                      {idea.tags &&
                        idea.tags.map((tag: string, index: any) => {
                          return (
                            <Badge
                              variant="secondary"
                              className="p-2 mr-2"
                              key={index}
                            >
                              {tag}
                            </Badge>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {/* Modal component consists of add new idea functionality */}
      <div>
        <Modal show={isOpen} onHide={hideModal} animation={false}>
          <Modal.Header>
            <Modal.Title>Add Idea</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={validated} onSubmit={saveIdea}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  defaultValue={idea.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <TagInput tags={idea.tags} onTagChange={onTagChange}></TagInput>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={3}
                  defaultValue={idea.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Form>
            <div></div>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={hideModal} className="btn btn-secondary">
              Cancel
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={saveIdea}
            >
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
