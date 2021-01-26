import React from 'react'
import ReactDOM from 'react-dom'
import Loading from './components/Loading'
import Nav from './components/Nav'
const Popular = React.lazy(() => {  return import('./components/Popular'); })
const Battle = React.lazy(() => { return import('./components/Battle'); });
const Results = React.lazy(() => { return import('./components/Results'); });
import {ThemeProvider} from './contexts/theme'
import './index.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({theme}) => ({
          theme: theme === 'light' ? 'dark' : 'light'
        }))
      }
    }
  }
  render() {
    return (
        <ThemeProvider value={this.state}>
          <React.Suspense fallback={<Loading/>}>
            <Router>
              <div className={this.state.theme}>
                <div className="container">
                  <Nav />
                  <Switch>
                    <Route exact path="/">
                      <Popular/>
                    </Route>
                    <Route path="/battle">
                      <Battle/>
                    </Route>
                    <Route path="/results">
                      <Results />
                    </Route>
                  </Switch>
                </div>
              </div>
            </Router>
          </React.Suspense>
        </ThemeProvider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById("app"));