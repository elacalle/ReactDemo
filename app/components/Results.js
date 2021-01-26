import React from 'react'
import {battle} from './../services/api.js' 
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'
import { withRouter } from "react-router";
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'

function ProfileList({name, location, company, followers, following}) {
  return (
    <ul className='card-list'>
        <Tooltip text="test">
          <li>
            <FaUser color='rgb(239, 115, 115)' size={22} />
            {name}
          </li>
        </Tooltip>
      {location && (
        <li>
          <FaCompass color='rgb(144, 115, 255)' size={22} />
          {location}
        </li>
      )}
      {company && (
        <li>
          <FaBriefcase color='#795548' size={22} />
          {company}
        </li>
      )}
      <li>
        <FaUsers color='rgb(129, 195, 245)' size={22} />
        {followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color='rgb(64, 183, 95)' size={22} />
        {following.toLocaleString()} following
      </li>
    </ul>
  )
}

const battleComponent = class Battle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    }
  }
  async componentDidMount() {
    const url = new URLSearchParams(this.props.location.search)

    try{
      const [winner, loser] = await battle(url.get('player1'), url.get('player2'))

      this.setState({
        winner,
        loser,
        loading: false 
      })
    } catch (error) {
      this.setState({
        error,
      })
    }
  }
  render() {
    const {loading, winner, loser, error} = this.state;

    if(loading) {
      return (
        <div>
          <Loading />
        </div>
      )
    }

    if(error) {
      return (
        <p>{error}</p>
      )
    }

    return (
      <React.Fragment>
        <div className='grid space-around container-sm'>
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Winner'} 
            avatar_url={winner.profile.avatar_url}
            login={winner.profile.login}
            html_url={winner.profile.html_url}
            score={winner.score}
          >
            <ProfileList {...winner.profile}/>
          </Card>
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Loser'} 
            avatar_url={loser.profile.avatar_url}
            login={loser.profile.login}
            html_url={loser.profile.html_url}
            score={loser.score}
          >
            <ProfileList {...loser.profile}/>
          </Card>
        </div>
      </React.Fragment>
    )   
  }
}

export default withRouter(battleComponent);