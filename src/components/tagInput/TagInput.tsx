import React, { useState } from 'react';
import { Badge, Form } from 'react-bootstrap';

import styles from './TagInput.module.scss';

export default function TagInput(props: any) {
  const [tagInput, setTagInput] = useState('');
  const tags = props.tags;

  /**
   * To add tags as a list
   * @param value tag title
   * @param e event which trigger while users press enter
   */
  const addTag = (value: any, e: any) => {
    e.preventDefault();
    if (value) {
      tags.push(value);
      props.onTagChange(tags);
      setTagInput('');
    }
  };

  /**
   * To remove specific tag based on index
   * @param index
   */
  const onDeleteTag = (index: any) => {
    tags.splice(index, 1);
    props.onTagChange(tags);
  };

  const onValueChange = (event: any) => {
    setTagInput(event.target.value);
  };

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Tags</Form.Label>
        <Form.Control
          type="text"
          name="tag"
          value={tagInput}
          placeholder="Add tags"
          onChange={onValueChange}
          onKeyDown={(e: any) => {
            e.key === 'Enter' && addTag(e.target.value, e);
          }}
        />
        <div className="pt-2">
          {tags &&
            tags.map((tag: string, index: any) => {
              return (
                <Badge
                  variant="secondary"
                  className="p-2 mr-2 mb-2"
                  key={index}
                >
                  {tag}{' '}
                  <span
                    className={`${styles.close} pl-1`}
                    onClick={() => onDeleteTag(index)}
                  >
                    x
                  </span>
                </Badge>
              );
            })}
        </div>
      </Form.Group>
    </div>
  );
}
