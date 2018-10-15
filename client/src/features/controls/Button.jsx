import React from 'react';
import styles from './Button.module.css';

export default function Button({ link, secondary, ...props }) {
  return (
    <button
      className={styleBuilder({
        link: link,
        secondary: secondary
      })}
      {...props}
    >
      {props.content}
    </button>
  );
}

/**
 * Builds a style based on the supplied props
 * @param {Object} options
 * @returns styles
 */
const styleBuilder = options => {
  const styleList = [styles.button];
  if (options.link) {
    styleList.push(styles.link);
  }
  if (options.secondary) {
    styleList.push(styles.secondary);
  }
  return styleList.join(' ');
};
