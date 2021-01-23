import React from 'react';

export default function (Component) {
  return class WithHover extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        visible: false,
      }

      this.toggle = this.toggle.bind(this);
    }
    toggle(visible) {
      this.setState({
        visible: !visible
      })
    }
    render() {
      const {visible} = this.state;
      const props = this.props;

      return (
        <div
          onMouseOver={() => {this.toggle(visible)}}
        >
          <Component hovering={visible} {...props}/>
        </div>
      )
    }
  }
}