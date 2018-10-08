import React, { Component } from 'react'
import Icon from '@mdi/react'
import { mdiSend } from '@mdi/js'
import style from '../styles/Contact.module.scss'

class componentName extends Component {
  render() {
    return (
      <form action="https://jumprock.co/mail/brxckcontact" method="post">
        <input type="hidden" name="after" value="https://brockmcelroy.com" />
        <input type="text" name="trapit" style={{ display: 'none' }} />

        <div className={style.group}>
          <div className={style.field}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@example.io"
              required
            />
          </div>

          <div className={style.field}>
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Re: Nigerian Prince"
              required
            />
          </div>
        </div>

        <div className={style.field}>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            cols="50"
            rows="7"
            placeholder="What's up?"
            required
          />
        </div>
        <button
          type="submit"
          className={style.submit}
        >
          <Icon
            path={mdiSend}
            size={0.75}
            color={'currentColor'}
            rotate={-20}
          />
          <span>send</span>
        </button>
      </form>
    )
  }
}

export default componentName
