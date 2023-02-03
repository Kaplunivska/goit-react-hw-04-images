import css from './Searchbar.module.css';
import { SearchbarPropTypes } from './Searchbar.types';

export default function Searchbar({ onSubmit }) {
  const submitHandler = evt => {
    evt.preventDefault();

    const { target } = evt;
    const { query } = target.elements;
    const value = query.value.trim();

    if (!value.length) return;

    onSubmit(query.value);
    target.reset();
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={submitHandler}>
        <button
          type="submit"
          className={css.searchFormButton}
          aria-label="search button"
        >
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = SearchbarPropTypes;