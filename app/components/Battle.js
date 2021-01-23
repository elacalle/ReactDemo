import React from 'react';
import PropTypes from 'prop-types';
import Results from './Results';
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'


function Instructions() {
  return (
    <div className='instructions-container'>
      <h1 className='center-text header-lg'>
        Instructions
      </h1>
      <ol className='container-sm grid center-text battle-instructions'>
        <li>
          <h3 className='header-sm'>Enter two Github users</h3>
          <FaUserFriends className='bg-light' color='rgb(255, 191, 116)' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>Battle</h3>
          <FaFighterJet className='bg-light' color='#727272' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>See the winners</h3>
          <FaTrophy className='bg-light' color='rgb(255, 215, 0)' size={140} />
        </li>
      </ol>
    </div>
  )
}

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '' 
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  submitForm(event) {
    event.preventDefault();

    this.props.onSubmit(this.state.username);

    this.setState({
      username: ''
    })
  }
  updateUsername(event) {
    this.setState({
      username: event.target.value
    })
  }
  render() {
    const {username} = this.state;
    const {label} = this.props;

    return (
      <form className='column player' onSubmit={this.submitForm}>
        <label htmlFor='username' className='player-label'>
          { label }
        </label>
        <div className='row player-inputs'>
          <input
            type='text'
            id='username'
            className='input-light'
            placeholder='github username'
            autoComplete='off'
            value={username}
            onChange={this.updateUsername}
          />
          <button
            className='btn dark-btn'
            type='submit'
            disabled={!username}
          >
            Submit
          </button>
        </div>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

function PlayerPreview({username, onReset, label}) {
  return (
    <div className='column player'>
      <h3 className='player-label'>{label}</h3>
      <div className='row bg-light'>
        <div className='player-info'>
          <img
            className='avatar-small'
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
          />
          <a
            href={`https://github.com/${username}`}
            className='link'>
              {username}
          </a>
        </div>
        <button className='btn-clear flex-center' onClick={onReset}>
          <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
        </button>
      </div>
    </div>
  )
}

export default class Battle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      battle: false,
      player1: null,
      player2: null 
    }

    this.submitPlayer = this.submitPlayer.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  submitPlayer(player, value) {
    this.setState({
      [player]: value
    });
  }
  handleReset(player) {
    this.setState({
      [player]:  null
    });
  }
  render() {
    const {player1, player2, battle} = this.state;

    if(battle) {
      return (
        <Results 
          player1={player1}
          player2={player2}
        />
      )
    }

    return (
      <React.Fragment>
        <Instructions/>
        <div className='players-container'>
          <h1 className='center-text header-lg'>Players</h1>
          <div className='row space-around'>
        {
          player1 === null ? <PlayerInput 
                              label="Player 1"
                              onSubmit={(value) => { this.submitPlayer('player1', value) }}
                              /> :
                              <PlayerPreview 
                                username={player1}
                                label="Player one"
                                onReset={() => { this.handleReset('player1')}}
                              /> 
        }

        {
          player2 === null ? <PlayerInput 
                              label="Player 2" 
                              onSubmit={(value) => { this.submitPlayer('player2', value) }}
                              /> :
                              <PlayerPreview 
                                username={player2}
                                label="Player two"
                                onReset={() => { this.handleReset('player2')}}
                              /> 

        }

        {player1 && player2 && (
          <button 
          className='btn dark-btn btn-space' onClick={() => {
            this.setState({
              battle: true,
            })
          }}>
            Battle
          </button>
        )}
        </div>
        </div>
      </React.Fragment>
    )
  }
}