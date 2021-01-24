
import * as React from 'react'

export default function Card({header, score, avatar_url, login, html_url, children}) {
  return (
    <div className='card bg-light'>
      <h4 className='header-lg center-text'>
        {header}
      </h4>
      <img
        className='avatar'
        src={avatar_url}
        alt={`Avatar for ${login}`}
      />
      {
        score && (
          <h4 className='center-text'>
            Score: {score.toLocaleString()}
          </h4>
        )
      }
      <h2 className='center-text'>
        <a className='link' href={html_url}>
          {login}
        </a>
      </h2>
      { children }
    </div>
  )
}