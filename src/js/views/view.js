import { mark } from 'regenerator-runtime';
import icon from 'url:../../img/icons.svg';

export default class Views {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage();

    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newDOM = document
      .createRange()
      .createContextualFragment(this._generateMarkup());

    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = curElement[i];
      // Update Changed Text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      // Update Changed DataSet
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderErrorMessage(message = this._errorMessage) {
    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icon}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icon}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Render Spinner Funciton
  renderspinner() {
    const spinner = `<div class="spinner">
            <svg>
              <use href="${icon}#icon-loader"></use>
            </svg>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', spinner);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
