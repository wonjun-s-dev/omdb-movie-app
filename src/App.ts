import { Component } from './core/core';
import { TheHeader } from './components/TheHeader';

export default class App extends Component {
  render() {
    // HEADER
    const theHeader = new TheHeader().el;

    // ROUTER
    const routerView = document.createElement('router-view');

    // FOOTER

    this.el.append(theHeader, routerView);
  }
}
