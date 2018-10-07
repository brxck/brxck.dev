import React, { Component } from 'react'
import Icon from '@mdi/react'
import { mdiSend } from '@mdi/js'
import style from '../styles/Contact.module.scss'

class componentName extends Component {
  state = { email: null, message: null, subject: null }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  canSubmit() {
    return this.state.email && this.state.message && this.state.subject
  }

  render() {
    return (
      <form action="https://jumprock.co/mail/brxckcontact" method="post">
        <input type="text" name="trapit" value="" style={{ display: 'none' }} />

        <div className={style.group}>
          <div className={style.field}>
            <label htmlFor="email">Your Email</label>
            <input
              value={this.state.email}
              type="text"
              id="email"
              name="email"
              placeholder="email@example.io"
              onChange={e => this.handleChange(e)}
            />
          </div>

          <div className={style.field}>
            <label htmlFor="subject">Subject</label>
            <input
              value={this.state.subject}
              type="text"
              id="subject"
              name="subject"
              placeholder="Re: Nigerian Prince"
              onChange={e => this.handleChange(e)}
            />
          </div>
        </div>

        <div className={style.field}>
          <label htmlFor="message">Message</label>
          <textarea
            value={this.state.message}
            name="message"
            id="message"
            cols="50"
            rows="7"
            placeholder="What's up?"
            onChange={e => this.handleChange(e)}
          />
        </div>
        <button
          type="submit"
          className={style.submit}
          disabled={!this.canSubmit()}
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
