import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ContactListItem.module.css';

const ContactListItem = props => {
  /**
   * Returns a formatted name with the key name in bold
   * @param {[Contacts]} names
   */
  const formatNames = names => {
    return names.map(
      (name, index) =>
        index === names.length - 1 ? (
          <span key={index} className={styles.bold}>
            {name}
          </span>
        ) : (
          <span key={index}>{name}</span>
        )
    );
  };
  return (
    <div className={styles.item}>
      <Link className={styles.title} to={`/view/${props.contact._id}`}>
        {formatNames(props.contact.names)}
      </Link>
    </div>
  );
};

export default ContactListItem;
