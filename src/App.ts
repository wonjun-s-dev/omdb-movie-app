import { Component } from './core/core';

export default class App extends Component {
  render() {
    // HEADER

    // ROUTER
    const routerView = document.createElement('router-view');

    // FOOTER

    this.el.append(routerView);
  }
}
