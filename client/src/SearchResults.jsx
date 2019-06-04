import React, {Component} from 'react';
import "./main.css";

class SearchResult extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(e) {
    const productClickEvent = new CustomEvent('productClickEvent', { detail: { sku: e.target.id } })
    window.dispatchEvent(productClickEvent);
    document.querySelector('#searchDrop').setAttribute('style', 'display: none;');
  }

  render() {
    return (
      <div className="searchItem" id={this.props.searchResult.sku} onClick={this.handleClick}>
        <img className="searchImg" id={this.props.searchResult.sku} src={this.props.searchResult.images[0]}></img>
        <div className="shoeStats" id={this.props.searchResult.sku}>
          <div className="shoeStat" id={this.props.searchResult.sku}>{this.props.searchResult.productName}</div>
          <div className="shoeStat1" id={this.props.searchResult.sku}>${this.props.searchResult.price}</div>
          <div className="shoeStat1" id={this.props.searchResult.sku}>{this.props.searchResult.brand}</div>
        </div>
      </div>
    );
  }
}

export default SearchResult;