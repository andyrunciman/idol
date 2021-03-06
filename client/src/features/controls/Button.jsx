import React from 'react';
import styles from './Button.module.css';

export default function Button({ link, secondary, warning, ...props }) {
  return (
    <button
      className={styleBuilder({
        link: link,
        secondary: secondary,
        warning: warning
      })}
      {...props}
    >
      {props.content}
      {props.children}
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
  if (options.warning) {
    styleList.push(styles.warning);
  }
  return styleList.join(' ');
};
