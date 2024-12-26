import Views from './view.js';

import icon from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';

class PaginationView extends Views {
  _parentElement = document.querySelector('.pagination');

  addHandlerclcik(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest(`.btn--inline`);
      const goto = +btn.dataset.goto;
      handler(goto);
    });
  }

  _generateMarkup() {
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    const curPage = this._data.page;

    // Page 1 and other Page's
    if (numPage > 1 && curPage === 1) {
      return this._generateNextBtnMarkup(curPage);
    }

    // Page 1 and No other Page
    if (numPage === 1 && curPage === 1) {
      return ` `;
    }

    // Last Page
    if (numPage > 1 && curPage === numPage) {
      return this._generatePrevBtnMarkup(curPage);
    }

    // second Pageand other Pages
    if (numPage > 1 && curPage > 1 && curPage < numPage) {
      return (
        this._generatePrevBtnMarkup(curPage) +
        this._generateNextBtnMarkup(curPage)
      );
    }
  }

  _generatePrevBtnMarkup(curPage) {
    return `<button data-goTo="${
      curPage - 1
    }"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`;
  }

  _generateNextBtnMarkup(curPage) {
    return `
           <button data-goTo="${
             curPage + 1
           }"class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
  }
}

export default new PaginationView();
