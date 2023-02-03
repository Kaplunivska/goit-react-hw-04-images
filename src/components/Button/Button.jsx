import css from './Button.module.css';

export default function Button({ onClick, children }) {
  return (
    <button className={css.button} type="button" onClick={onClick}>
      {children}
    </button>
  );
}