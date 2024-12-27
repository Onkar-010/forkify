import Views from './view';
import previewView from './previewView.js';
import icon from '../../img/icons.svg';

class ResultView extends Views {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No Recipe's found for your query, Please try Again!`;
  _message = ``;

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(res => previewView.render(res, false)).join('');
  }
}

export default new ResultView();
