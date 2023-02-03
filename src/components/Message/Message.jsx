import css from './Message.module.css';
import { MessagePropTypes } from './Message.types';

export default function Message({ title, color = 'black' }) {
  return (
    <h2 className={css.message} style={{ color }}>
      {title}
    </h2>
  );
}

Message.propTypes = MessagePropTypes;
