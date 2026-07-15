import { Component } from '../core/core';
import chatStore, { sendMessages } from '../store/chatbot';
import movieStore, { searchMovies } from '../store/movie';

export default class Chatbot extends Component {
  constructor() {
    super();
    chatStore.subscribe('messages', () => {
      this.render();
    });
    chatStore.subscribe('loading', () => {
      this.render();
    });
  }

  render() {
    this.el.classList.add('chatbot');
    this.el.innerHTML = `
      <div class="chats">
        <ul>
          ${chatStore.state.messages
            .map(
              (msg) =>
                `<li class="${msg.role}">
        ${
          msg.role === 'assistant'
            ? `<div class="photo">
                  <span class="material-symbols-outlined">smart_toy</span>
               </div>`
            : ''
        }
        ${
          typeof msg.content === 'string'
            ? msg.content.replace(
                /{{(.*?)\/\/(.*?)}}/g,
                (match, ko, en) => `
         <span class="movie-title" data-movie-title="${en}">${ko}</span>
         `,
              )
            : ''
        }
       </li>`,
            )
            .join('')}
           ${
             chatStore.state.loading
               ? `
          <li class="assistant"> 
            <div class="photo">
              <span class="material-symbols-outlined">smart_toy</span>
            </div>
            <div class="the-loader"></div>
          </li>
          `
               : ''
           }
        </ul>
        <div class="input">
          <input />
          <button class="btn btn-primary">
            <span class="material-symbols-outlined">send</span>
          </button>  
        </div>
      </div>
      <div class="btn btn-circle chat-starter">
        <span class="material-symbols-outlined icon--open">chat</span>
        <span class="material-symbols-outlined icon--close">close</span>
      </div>
    `;

    const inputEl = this.el.querySelector('input');
    inputEl?.addEventListener('input', () => {
      chatStore.state.chatText = inputEl.value;
    });
    inputEl?.addEventListener('keydown', (event: Event) => {
      if (
        event instanceof KeyboardEvent &&
        event.key === 'Enter' &&
        !event.isComposing
      ) {
        sendMessages();
      }
    });

    const btnEl = this.el.querySelector('.input .btn');
    btnEl?.addEventListener('click', () => {
      sendMessages();
    });

    const chatStarterEl = this.el.querySelector('.chat-starter');
    chatStarterEl?.addEventListener('click', (event: Event) => {
      event.stopPropagation();
      this.el.classList.toggle('chatbot--on');

      const offChats = () => this.el.classList.remove('chatbot--on');

      if (this.el.classList.contains('chatbot--on')) {
        window.addEventListener('click', offChats);
        setTimeout(() => {
          inputEl?.focus();
        }, 300);
      } else {
        window.removeEventListener('click', offChats);
      }
    });

    const chatsEl = this.el.querySelector('.chats');
    chatsEl?.addEventListener('click', (event: Event) => {
      event.stopPropagation();
    });

    const messageListEl = this.el.querySelector('.chats ul');
    messageListEl?.scrollTo(0, messageListEl.scrollHeight || 0);

    inputEl?.focus();

    const movieTitleEls = this.el.querySelectorAll<HTMLElement>('.movie-title');
    movieTitleEls.forEach((movieTitleEl) => {
      movieTitleEl.addEventListener('click', () => {
        const searchInputEl =
          document.querySelector<HTMLInputElement>('.search input');
        if (!searchInputEl) return;
        const title = movieTitleEl.dataset.movieTitle || '';
        searchInputEl.value = title;
        movieStore.state.searchText = title;
        searchMovies(1);
      });
    });
  }
}
