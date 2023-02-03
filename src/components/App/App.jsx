import ImageGallery from 'components/ImageGallery';
import Searchbar from 'components/Searchbar';
import { Component } from 'react';
import css from './App.module.css';

export default class App extends Component {
  state = {
    searchQuery: '',
  };

  searchHandler = value => {
    this.setState({ searchQuery: value });
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.searchHandler} />
        <ImageGallery searchQuery={this.state.searchQuery} />
      </div>
    );
  }
}