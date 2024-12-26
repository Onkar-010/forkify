import Views from './view';
import icon from '../../img/icons.svg';
console.log(icon); // This should log the resolved URL

class ResultView extends Views {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No Recipe's found for your query, Please try Again!`;
  _message = ``;

  _generateMarkup() {
    return this._data.map(this._generatePreview).join('');
  }

  _generatePreview(res) {
    return `<li class="preview">
            <a class="preview__link" href="#${res.id}">
              <figure class="preview__fig">
                <img src="${res.image}" alt="${res.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${res.title}</h4>
                <p class="preview__publisher">${res.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icon}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`;
  }
}

export default new ResultView();
