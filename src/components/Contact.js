import React, { Component } from 'react'
import Icon from '@mdi/react'
import { mdiSend } from '@mdi/js'
import style from '../styles/Contact.module.scss'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Contact extends Component {
  initialFormState = { email: '', subject: '', message: '' }
  state = { sent: false, ...this.initialFormState }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => {
        this.setState({ sent: true, ...this.initialFormState })
      })
      .catch(error => alert(error))
  }

  render(state) {
    return (
      <form
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={this.handleSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="contact" />{' '}
        <div hidden>
          <label>
            Don’t fill this out:{' '}
            <input name="bot-field" onChange={this.handleChange} />
          </label>
        </div>
        <div className={style.group}>
          <div className={style.field}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@example.io"
              onChange={this.handleChange}
              value={this.state.email}
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
              onChange={this.handleChange}
              value={this.state.subject}
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
            onChange={this.handleChange}
            value={this.state.message}
            required
          />
        </div>
        <button
          type="submit"
          className={style.submit}
          disabled={!!this.state.sent}
        >
          <Icon
            path={mdiSend}
            size={0.75}
            color={'currentColor'}
            rotate={-20}
          />
          <span />
        </button>
      </form>
    )
  }
}
