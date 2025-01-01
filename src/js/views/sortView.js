import Views from './view.js';

import icon from 'url:../../img/icons.svg';

class SortView extends Views {
  _parentElement = document.querySelector('.search-results');
  _data;

  _generateMarkup() {
    return ` <label data-sort="${false}" class="btn--inline ">
                <svg class="icon">
                    <use href="${icon}#icon-sort"></use>
                </svg>
                <span>Sort</span>
             </label>
             <select> 
             <option> Cooking Time</option> 
             <option> No of Ingrident's</option>
             </select>
             `;
  }
}

export default new SortView();
