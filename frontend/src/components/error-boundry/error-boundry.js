import React, { Component } from 'react';

import ErrorIndicator from '../error-indicator/error-indicator';

export default class ErrorBoundry extends Component {


  state = {
    hasError: false//наличие ошибки
  };

  
  componentDidCatch(error, info) {//error - ошибка, info - указывает на дочерний компонент в котором ошибка
    debugger;

    this.setState({
      hasError: true
    });
  }


  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    return this.props.children;
  }
}
