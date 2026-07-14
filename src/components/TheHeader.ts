import { Component } from '../core/core';

interface State {
  [key: string]: unknown;
  menus: {
    name: string;
    href: string;
  }[];
}

export class TheHeader extends Component {
  public state!: State;
  constructor() {
    super({
      tagName: 'header',
      state: {
        menus: [
          { name: 'Search', href: '#/' },
          { name: 'Movie', href: '#/movie?id=tt4520988' },
          { name: 'About', href: '#/about' },
        ],
      },
    });

    window.addEventListener('popstate', () => {
      this.render();
    });
  }

  render() {
    this.el.innerHTML = `
      <a href='#/' class="logo"><span>OMDbAPI</span>.COM</a>
      <nav>
        <ul>
          ${this.state.menus
            .map((menu) => {
              const href = menu.href.split('?')[0];
              const hash = location.hash.split('?')[0];
              const isActive = href === hash;

              return `
            <li>
              <a class="${isActive ? 'active' : ''}" href="${menu.href}">${menu.name}</a>
            </li>
            `;
            })
            .join('')}
        </ul>
      </nav>
      <a href='#/about' class="user">
        <img src="https://heropy.blog/css/images/logo.png" alt="User" />
      </a>
    `;
  }
}
