import Views from './view.js';
import icon from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';

class AddRecipeView extends Views {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was Successful Added! and Can be Viewed in Bookmark List ';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerOpenModel();
    this._addHandlerCloseModel();
    // this.togglewindow = this.togglewindow.bind(this);
  }

  togglewindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerOpenModel() {
    this._btnOpen.addEventListener('click', this.togglewindow.bind(this));
  }

  _addHandlerCloseModel() {
    this._btnClose.addEventListener('click', this.togglewindow.bind(this));
    this._overlay.addEventListener('click', this.togglewindow.bind(this));
  }

  _addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = Object.fromEntries([...new FormData(this)]);
      handler(data);
    });
  }
}

export default new AddRecipeView();
