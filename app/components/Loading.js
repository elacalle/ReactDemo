import React from 'react'
import PropTypes from 'prop-types'


const stlye = {
  fontSize: '32px',
  fontWeight: 'bold'
}


export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    const {text} = this.props;

    this.state = {
      text,
    }
  }
  componentDidMount() {
    setInterval(() => {
      const {text} = this.props;

      if(this.state.text === `${text}...`) {
        this.setState({
          text
        })
      } else {
        this.setState((state) => ({
          text: `${state.text}.`
        }))
      }
    }, 100)
  }
  render() {
    const {text} = this.state;

    return (
      <React.Fragment>
        <div style={stlye}>
          {text}
        </div>
      </React.Fragment>
    )
  }
}

Loading.defaultProps = {
  text: 'Loading'
}