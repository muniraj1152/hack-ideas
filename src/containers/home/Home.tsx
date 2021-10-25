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
import Upvote from '../../components/upvote/Upvote';
import UserIcon from '../../assets/person.png';

const ideaInitialState: IIdea = {
  id: '0',
  title: '',
  tags: ['tech', 'future'],
  description: '',
  employeeId: '0',
  upVoteList: [],
};

const Home = () => {
  const [validated, setValidated] = useState(false);
  const ideaList = useSelector(getIdeaListSelector);

  const [idea, setIdea] = useState(ideaInitialState);

  const userString: any = localStorage.getItem('loggedInUser');
  const loggedInUser = JSON.parse(userString);
  const employeeId = loggedInUser && loggedInUser.id ? loggedInUser.id : '0';

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
      setValidated(true);
    } else {
      setValidated(false);
      dispatch(addIdea(idea));
      setIsOpen(false);
      setIdea(ideaInitialState);
    }
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

  const onChangeVote = (index: any) => {
    console.log(ideaList[index]);
    const idea = ideaList[index];
    if (idea.upVoteList && idea.upVoteList.includes(employeeId)) {
      const index = idea.upVoteList.indexOf(employeeId);
      if (index > -1) {
        idea.upVoteList.splice(index, 1);
      }
    } else {
      idea.upVoteList.push(employeeId);
    }
    dispatch(addIdea(idea));
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
                <div className="card-body row">
                  <div className="col-1">
                    <Upvote
                      ideaIndex={index}
                      count={idea.upVoteList ? idea.upVoteList.length : 0}
                      isUpVoted={
                        idea.upVoteList && idea.upVoteList.includes(employeeId)
                      }
                      onChangeVote={onChangeVote}
                    ></Upvote>
                  </div>
                  <div className="col-11">
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
                                className="p-2 mr-2 mb-2"
                                key={index}
                              >
                                {tag}
                              </Badge>
                            );
                          })}
                      </div>
                    </div>
                    <div>
                      <span>
                        <img src={UserIcon} className="image" />
                      </span>
                      <span className="pl-3 text-secondary">
                        Created by Employee of Id : {employeeId}
                      </span>
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
          <Form noValidate validated={validated} onSubmit={saveIdea}>
            <Modal.Header>
              <Modal.Title>Add Idea</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
              <div></div>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={hideModal} className="btn btn-secondary">
                Cancel
              </button>
              <button className="btn btn-primary" type="submit">
                {/* onClick={saveIdea} */}
                Save
              </button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
