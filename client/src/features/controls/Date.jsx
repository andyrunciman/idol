import React from 'react';
import styles from './Date.module.css';
import moment from 'moment';

export default class Date extends React.Component {
  state = {
    d: 1,
    m: 1,
    y: 1980
  };
  createOptions = (from, to) => {
    const options = [];
    for (let i = from; i <= to; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  onChangeHandler = event => {
    console.log(event.target);
    const { name, value } = data;
    this.setState({ [name]: value }, () => {
      this.props.onChange({
        name: this.props.name,
        value: moment(
          `${this.state.d}/${this.state.m}/${this.state.y}`,
          'dd/mm/yyyy'
        ).toDate()
      });
    });
  };

  render() {
    const d = this.props.value ? moment(this.props.value).day() + 1 : 1;
    const m = this.props.value ? moment(this.props.value).month() + 1 : 1;
    const y = this.props.value ? moment(this.props.value).year() + 1 : 1990;
    return (
      <div>
        <select>
          name="d" onChange=
          {this.onChangeHandler}
          className=
          {styles.select}
          value=
          {d}
          {this.createOptions(1, 31)}
        </select>
        <select
          name="m"
          onSelect={this.onChangeHandler}
          className={styles.select}
        >
          {this.createOptions(1, 12)}
        </select>
        <select
          name="y"
          onSelect={this.onChangeHandler}
          className={styles.select}
        >
          {this.createOptions(1920, 2018)}
        </select>

        {this.props.error ? (
          <p className={styles.errorText}>{this.props.error}</p>
        ) : (
          undefined
        )}
      </div>
    );
  }
}
