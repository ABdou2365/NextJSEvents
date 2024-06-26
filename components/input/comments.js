import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext)

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsFetching(true);
      fetch(`/api/comments/${eventId}`)
        .then(response => response.json())
        .then(data => {
         // console.log("Fetched comments:", data.message);
          setIsFetching(false);
          setComments(data.message)
        })
    }
  },[showComments])

  

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {

    notificationCtx.showNotification({
      title : 'Pending ...',
      message: 'Adding the comment',
      status : 'pending'
    })
    // send data to API
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }

      return response.json().then(data => {
        throw new Error( data.message || 'Something went wrong');
      })
    }
    )
      .then(data => {
        notificationCtx.showNotification({
          title : 'Success',
          message: 'Comment added successfully',
          status : 'success'
        })
      })
      .catch(error => {
        notificationCtx.showNotification({
          title : 'Error',
          message: 'Comment failed to be added',
          status : 'error'
        })
    })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetching && <CommentList items={comments } />}
      {showComments && isFetching && <p>Loading ...</p>}
    </section>
  );
}

export default Comments;
