import React, { Component } from 'react'
import style from '../styles/Contact.module.scss'

class componentName extends Component {
  state = { email: null, message: null }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  canSubmit() {
    return this.state.email && this.state.message
  }

  render() {
    return (
      <form action="https://jumprock.co/mail/brxckcontact" method="post">
        <input type="text" name="trapit" value="" style={{ display: 'none' }} />

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
          Send
        </button>
      </form>
    )
  }
}

export default componentName
