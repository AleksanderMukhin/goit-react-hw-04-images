import { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    input: '',
  };
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value.trim() });
  };
  submitSearchImg = async evt => {
    evt.preventDefault();
    if (!this.state.input) {
      alert('Enter data to search!');
      return;
    }
    await this.props.resetState();
    this.props.getImages(this.state.input);
    this.setState({ input: '' });
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.submitSearchImg}>
          <button type="submit" className={css.searchForm_button}>
            <span className={css.searchForm_button_label}>Search</span>
          </button>

          <input
            className={css.searchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.input}
            name="input"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  getImages: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
};
