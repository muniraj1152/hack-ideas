import React from 'react';

import styles from './Upvote.module.scss';

export default function Upvote(props: any) {
  const onChangeVote = () => {
    props.onChangeVote(props.ideaIndex);
  };

  return (
    <div className="row h-100">
      <div
        className={`${styles.heart} ${
          props.isUpVoted ? styles.activeHeart : ''
        } col-12 align-self-center cursor-pointer`}
        onClick={onChangeVote}
      ></div>
      <div className="col-12 ml-1">{props.count}</div>
    </div>
  );
}
