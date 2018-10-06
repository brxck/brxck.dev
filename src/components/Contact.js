import React, { Component } from 'react'
import style from '../styles/Contact.module.scss'

class componentName extends Component {
  render() {
    return (
      <form action="https://jumprock.co/mail/brxckcontact" method="post">
        <input type="text" name="trapit" value="" style={{ display: 'none' }} />

        <div className={style.field}>
          <label htmlFor="email">Your Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email Address"
          />
        </div>

        <div className={style.field}>
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" cols="50" rows="7" />
        </div>
        <button type="submit" className={style.submit}>
          Send
        </button>
      </form>
    )
  }
}

export default componentName
