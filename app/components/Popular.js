import React from 'react';
import PropTypes from 'prop-types'
import {FaUser, FaStar, FaCodeBranch, FaExclamationTriangle} from 'react-icons/fa'
import Loading from './Loading';
import {fetchPopularRepos} from '../services/api'
import Card from './Card'

function LanguageNav({selectedLanguage, setLanguage}) {
  const list = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Phython'];

  return (
    <ul className="flex-center">
      {
        list.map(language => {
        return (
          <li key={language} >
            <button 
            className='btn-clear nav-link'
            style={selectedLanguage === language ?  {color: 'rgb(187, 46, 31)'} : null}
            onClick={() => {setLanguage(language)}}>
              {language}
            </button>
          </li>
        )
      })
    }
    </ul>
  )
}

function ResposGrid({repos}) {
  return (
    <ul className="grid space-around">
      {
        repos.map((repo, index) => {
          const {name, owner, html_url, stargazers_count, forks, open_issues} = repo
          const {login, avatar_url} = repo.owner

          return (
            <li key={html_url} className='repo bg-light'>
              <Card
                header={index + 1} 
                avatar_url={avatar_url}
                login={login}
                html_url={html_url}
              />
              <ul className='card-list'>
                <li>
                  <FaUser color="rgb(255, 191, 116)" size={22}/>
                  {login}
                </li>
                <li>
                  <FaExclamationTriangle color='rgb(241, 138, 147)' size={22}/>
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaStar color="rgb(129, 195, 245)" size={22}/>
                  {forks.toLocaleString()} forks 
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(241, 138, 147)" size={22}/>
                  {open_issues.toLocaleString()} open
                </li>
              </ul>
            </li>
          )
        })
      }
    </ul>
  )
}

LanguageNav.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All',
      repos: null
    }

    this.setLanguage = this.setLanguage.bind(this);
  }
  async componentDidMount() {
    const { selectedLanguage } = this.state;

    const repos = await fetchPopularRepos(selectedLanguage);

    this.setState({
      repos
    });
  }
  async componentDidUpdate(prevProp, prevState) {
    const {selectedLanguage} = prevState;

    if(selectedLanguage !== this.state.selectedLanguage) {
      const repos = await fetchPopularRepos(this.state.selectedLanguage);
      this.setState({
        repos
      });
    }
  }
  isLoading() {
    return this.state.repos === null;
  }
  setLanguage(language) {
    this.setState({
      repos: null,
      selectedLanguage: language 
    });
  }
  render() {
    const {selectedLanguage, repos} = this.state;

    return ( 
      <React.Fragment>
        <LanguageNav 
          selectedLanguage={this.state.selectedLanguage} 
          setLanguage={this.setLanguage} 
        />

        {this.isLoading() && <div><Loading text="Fetching repos"/></div>}

        {repos && <ResposGrid repos={repos.items} />}
      </React.Fragment>
    )
  }
}