import React from 'react';
import classes from './comment-list.module.css';

function CommentList(props) {
  const { items } = props;
  
  //console.log(items);
  return (
    <ul className={classes.comments}>
      {
        items.map(comment => (
          <li key={comment._id}>
            <p>{comment.text}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default CommentList;
