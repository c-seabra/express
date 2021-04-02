import React from 'react'

const NewEvent = ({ starts_at }) => (
  <form className='form'>
    <label htmlFor='form.title'>title: </label><br />
    <input id='form.title' type='text' /><br />

    <label htmlFor='form.date'>begins at: </label><br />
    <input id='form.date' type='text' placeholder={starts_at} /><br />

    <label htmlFor='form.location'>location: </label><br />
    <input id='form.location' type='text' /><br />

    <label htmlFor='form.description'>description: </label><br />
    <input id='form.description' type='text' /><br />

  </form>
)

export default NewEvent
