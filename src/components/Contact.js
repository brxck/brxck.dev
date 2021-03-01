import React, { useState } from 'react'

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const Contact = () => {
  const initialFormState = { email: '', subject: '', message: '' }
  const [state, setState] = useState({ sent: false, ...initialFormState })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    const body = encode({
      'form-name': form.getAttribute('name'),
      ...state,
    })
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body,
      })
    } catch (error) {
      alert('Something went wrong? ' + error.toString())
    }
    setState({ sent: true, ...initialFormState })
  }

  return (
    <form
      name="contact"
      method="post"
      action="/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
      <input type="hidden" name="form-name" value="contact" />{' '}
      <div hidden>
        <label>
          Don’t fill this out:{' '}
          <input name="bot-field" onChange={handleChange} />
        </label>
      </div>
      <div className="flex gap-2 mb-3">
        <div>
          <label htmlFor="email">Your Email</label>
          <input
            className="w-full border-indigo-500 rounded-xl dark:bg-gray-900 dark:border-green-500"
            type="email"
            id="email"
            name="email"
            placeholder="email@example.io"
            onChange={handleChange}
            value={state.email}
            required
          />
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <input
            className="w-full border-indigo-500 rounded-xl dark:bg-gray-900 dark:border-green-500"
            type="text"
            id="subject"
            name="subject"
            placeholder="Re: Nigerian Prince"
            onChange={handleChange}
            value={state.subject}
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          className="w-full border-indigo-500 rounded-xl dark:bg-gray-900 dark:border-green-500"
          name="message"
          id="message"
          cols={50}
          rows={7}
          placeholder="What's up?"
          onChange={handleChange}
          value={state.message}
          required
        />
      </div>
      <button
        className="flex items-center justify-center w-full py-2 mt-3 font-semibold text-white bg-indigo-700 rounded-xl dark:bg-green-700 hover:bg-indigo-600 dark:hover:bg-green-600"
        type="submit"
        disabled={!!state.sent}
        aria-label="submit"
      >
        Send
      </button>
    </form>
  )
}

export default Contact
