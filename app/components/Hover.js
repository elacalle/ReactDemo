import React from 'react';

export default class Hover extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
    }

    this.toggle = this.toggle.bind(this);
  }
  toggle(visible) {
    this.setState({
      visible: visible
    })
  }
  render() {
    const {visible} = this.state;

    return (
      <div
        onMouseOver={() => {this.toggle(true)}}
        onMouseLeave={() => {this.toggle(false)}}
      >
        {this.props.children(visible)}
      </div>
    )
  }
}