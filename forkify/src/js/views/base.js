export const elements = {
  searchInput: document.querySelector('.search__field'),
  searchForm: document.querySelector('.search'),
  searchResultsContainer: document.querySelector('.results__list'),
  searchResultsWrapper: document.querySelector('.results')
};

export const elementClasses = {
  loader: 'loader'
}

export const renderLoader = parent => {
  const loader = /*html*/`
    <div class="${elementClasses.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;

  parent.insertAdjacentHTML('afterbegin', loader);
}

export const removeLoader = () => {
  const loader = document.querySelector(`.${elementClasses.loader}`);

  if (loader) loader.parentElement.removeChild(loader);
}