import React from 'react';
import styles from './Input.module.css';

export default function Input(props) {
  const classnames = [styles.input];
  if (props.error) classnames.push(styles.error);
  return (
    <div>
      <input className={classnames.join(' ')} {...props} />
      {props.error ? (
        <p className={styles.errorText}>{props.error}</p>
      ) : (
        undefined
      )}
    </div>
  );
}
