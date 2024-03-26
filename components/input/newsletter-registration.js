import { useContext, useRef } from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const notificationCts = useContext(NotificationContext);
  const emailInput = useRef();
  function registrationHandler(event) {
    event.preventDefault();

    notificationCts.showNotification({
      title: 'Signin up',
      message: 'Regestering for newsletter...',
      status : 'pending'
    })

    const entredEmail = emailInput.current.value

    const reqBody = {
      email : entredEmail
    }

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(reqBody),
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
    })
    .then(data =>   {notificationCts.showNotification({
      title: 'Success',
      message: 'Successfuly registred for newsletter',
      status : 'success'
    })})
    .catch(error => {
        notificationCts.showNotification({
          title: 'Regestring Failed!',
          message: error.message || 'Something went wrong',
          status : 'error'
        })
    })


    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInput}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
