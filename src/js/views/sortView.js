import Views from './view';
// import previewView from './previewView.js';
import icon from '../../img/icons.svg';

class SortView extends Views {
  _parentElement = document.querySelector('.sortBtnCont');
  _data;
  _errorMessage = `Unable to render Sort Button`;
  _message = ``;

  addHandlerSortBtn(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const sortBtn = e.target.closest('.btn-Sort');

      // Guard Caluse
      if (!sortBtn) return;

      //Btn
      console.log(`element intial sort-sate:${sortBtn.dataset.sort}`);
      const sortstate = sortBtn.dataset.sort === 'false' ? false : true;
      console.log(sortstate);
      //   Update the dataset
      sortBtn.dataset.sort = `${!sortstate}`;
      console.log(`element after sort-sate:${sortBtn.dataset.sort}`);

      //   call Handler
      handler(!sortstate);
    });
  }

  _generateMarkup() {
    return `<button class="btn--inline btn-Sort" data-sort="${
      !this._data.sort ? false : true
    }">
                <span>Sort</span>
                <svg class="search__icon">
                <use href="${icon}#icon-arrow-right"></use>
                </svg>
            </button>`;
  }
}

export default new SortView();
