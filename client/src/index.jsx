import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchResult from "./SearchResults.jsx";
import "./main.css";
import axios from 'axios';
import nikeSwoosh from './swoosh.png';
import searchIcon from './searchIcon.png';
import usFlag from './flag.png';
import cart from './cart.png';
import redX from './redX.png';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchResults: [],
      cart: []
    }

    this.handleRemove = this.handleRemove.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    window.addEventListener(
      "onCartClick",
      event => {
        axios.get(`http://ec2-18-221-123-158.us-east-2.compute.amazonaws.com/nameIMG/${event.detail.sku}`)
          .then(response => {
            response.data.color = event.detail.color;
            response.data.size = event.detail.size;
            const joined = this.state.cart.concat(response.data);
            this.setState({ cart: joined });
          })
          .catch(err => console.log('err in client', err));
      },
      false
    );
    window.onload = function(){
      document.onclick = function(e){
        if (e.target.className !== "cartContain" && e.target.className && "itemContain" && e.target.className !== "cartImg" && e.target.className !== "cartItems" && e.target.className !== "cart cursorChange") {
          document.querySelector('.cartContain').setAttribute('style', 'display: none;');
        }
        if (e.target.className !== "searchRes" && e.target.className && "searchPreview" && e.target.className !== "searchPrvTitle" && e.target.className !== "rowContain" && e.target.className !== "searchRow" && e.target.className !== "resDisplay" && e.target.className !== "resRow" && e.target.className !== "searchItem" && e.target.className !== "searchImg" && e.target.className !== "shoeStats" && e.target.className !== "shoeStat" && e.target.className !== "shoeStat1" && e.target.className !== "firstText" && e.target.className !== "secondText") {
          document.querySelector('#searchDrop').setAttribute('style', 'display: none;');
        }
      };
      window.scrollTo(0,1);
    };
    window.addEventListener('scroll', function(e) {
      if(window.scrollY == 0){
        window.scrollTo(0,1);
      }
    });
  }

  //for title
  handleEnter(event) {
    if(event.target.className === 'storeLink0') {
      document.querySelector('.release-dropdown').setAttribute('style', 'display: flex; position: sticky;');
    } else if(event.target.className === 'storeLink1') {
      document.querySelector('.release-dropdown1').setAttribute('style', 'display: flex; position: sticky;');
    } else if(event.target.className === 'storeLink2') {
      document.querySelector('.release-dropdown2').setAttribute('style', 'display: flex; position: sticky;');
    } else if(event.target.className === 'storeLink3') {
      document.querySelector('.release-dropdown3').setAttribute('style', 'display: flex; position: sticky;');
    } else if(event.target.className === 'storeLink4') {
      document.querySelector('.release-dropdown4').setAttribute('style', 'display: flex; position: sticky;');
    }
  }

  //for titlle
  handleMainLeave(){
    console.log('left title')
    document.querySelector('.release-dropdown').setAttribute('style', 'display: none;');
    document.querySelector('.release-dropdown1').setAttribute('style', 'display: none;');
    document.querySelector('.release-dropdown2').setAttribute('style', 'display: none;');
    document.querySelector('.release-dropdown3').setAttribute('style', 'display: none;');
    document.querySelector('.release-dropdown4').setAttribute('style', 'display: none;');
  }

  //for menu
  handleStay(event) {
    console.log(event.target.className)
    if(event.target.className === 'release-holder') {
      document.querySelector('.storeLink0').setAttribute('style', 'padding-top: 25px; padding-bottom: 24px; border-top: 1px solid #e4e4e4; border-bottom: 1.5px solid black;');
      document.querySelector('.release-dropdown').setAttribute('style', 'display: flex; position: sticky;');
    } else if(event.target.className === 'release-holder1') {
      document.querySelector('.storeLink1').setAttribute('style', 'padding-top: 25px; padding-bottom: 24px; border-top: 1px solid #e4e4e4; border-bottom: 1.5px solid black;');
      document.querySelector('.release-dropdown1').setAttribute('style', 'display: flex; position: sticky;');
    } else if(event.target.className === 'release-holder2') {
      document.querySelector('.storeLink2').setAttribute('style', 'padding-top: 25px; padding-bottom: 24px; border-top: 1px solid #e4e4e4; border-bottom: 1.5px solid black;');
      document.querySelector('.release-dropdown2').setAttribute('style', 'display: flex; position: sticky;');
    } else if(event.target.className === 'release-holder3') {
      document.querySelector('.storeLink3').setAttribute('style', 'padding-top: 25px; padding-bottom: 24px; border-top: 1px solid #e4e4e4; border-bottom: 1.5px solid black;');
      document.querySelector('.release-dropdown3').setAttribute('style', 'display: flex; position: sticky;');
    } else if(event.target.className === 'release-holder4') {
      document.querySelector('.storeLink4').setAttribute('style', 'padding-top: 25px; padding-bottom: 24px; border-top: 1px solid #e4e4e4; border-bottom: 1.5px solid black;');
      document.querySelector('.release-dropdown4').setAttribute('style', 'display: flex; position: sticky;');
    }
  }

  //for menu
  handleLeave() {
    document.querySelector('.storeLink0').setAttribute('style', 'padding-top: 24px; padding-bottom: 24px; boarder: none;');
    document.querySelector('.storeLink1').setAttribute('style', 'padding-top: 24px; padding-bottom: 24px; boarder: none;');
    document.querySelector('.storeLink2').setAttribute('style', 'padding-top: 24px; padding-bottom: 24px; boarder: none;');
    document.querySelector('.storeLink3').setAttribute('style', 'padding-top: 24px; padding-bottom: 24px; boarder: none;');
    document.querySelector('.storeLink4').setAttribute('style', 'padding-top: 24px; padding-bottom: 24px; boarder: none;');
    document.querySelector('.release-dropdown').setAttribute('style', 'display: none;');
    document.querySelector('.release-dropdown1').setAttribute('style', 'display: none;');
    document.querySelector('.release-dropdown2').setAttribute('style', 'display: none;');
    document.querySelector('.release-dropdown3').setAttribute('style', 'display: none;');
    document.querySelector('.release-dropdown4').setAttribute('style', 'display: none;');
  }

  // 

  handleInput(event) {
    if (event.target.value.length > 2){
      axios.get(`http://ec2-18-221-123-158.us-east-2.compute.amazonaws.com/search/${event.target.value}`)
      .then(response => {
        this.setState({ searchResults: response.data });
      })
      .then(document.querySelector('#searchDrop').setAttribute('style', 'display: block; position: sticky;'))
      .catch(err => console.log('err in client', err));
    } else {
      document.querySelector('#searchDrop').setAttribute('style', 'display: none;');
    }
    //http://ec2-18-221-123-158.us-east-2.compute.amazonaws.com
    
  }

  handleFocus(e) {
    console.log("leave")
    if (e.target.value.length > 2){
      document.querySelector('#searchDrop').setAttribute('style', 'display: block; position: sticky;');
    }
  }

  // handleFocus1() {
  //   console.log("leave")
  //   document.querySelector('#searchDrop').setAttribute('style', 'display: none;');
  // }

  handleCart() {
    const style = window.getComputedStyle(document.getElementsByClassName('cartContain')[0]);
    if (style.display == "block") {
      document.querySelector('.cartContain').setAttribute('style', 'display: none;');
    } else {
      document.querySelector('.cartContain').setAttribute('style', 'display: block;');
    }
  }

  handleItemClick(e) {
    const productClickEvent = new CustomEvent('productClickEvent', { detail: { sku: e.target.id } })
    window.dispatchEvent(productClickEvent);
  }

  handleRemove(e) {
    const newRemoval = this.state.cart;
    for(var x = 0; x < this.state.cart.length; x++){
      if(this.state.cart[x].sku === e.target.id){
        newRemoval.splice(x, 1);
        this.setState({ cart: newRemoval });
        x = this.state.cart.length;
      }
    }
  }

  //in future if adding axios requests you have to use your amazon aws url!!!

  //adding two class names to element breaks query selector!!!!!!!!!!!!!

  render () {
    window.onload = function(){
      document.onclick = function(e){
        if (e.target.className !== "cartContain" && e.target.className && "itemContain" && e.target.className !== "cartImg" && e.target.className !== "cartItems" && e.target.className !== "cart cursorChange") {
          document.querySelector('.cartContain').setAttribute('style', 'display: none;');
        }
        if (e.target.className !== "searchRes" && e.target.className && "searchPreview" && e.target.className !== "searchPrvTitle" && e.target.className !== "rowContain" && e.target.className !== "searchRow" && e.target.className !== "resDisplay" && e.target.className !== "resRow" && e.target.className !== "searchItem" && e.target.className !== "searchImg" && e.target.className !== "shoeStats" && e.target.className !== "shoeStat" && e.target.className !== "shoeStat1" && e.target.className !== "firstText" && e.target.className !== "secondText") {
          document.querySelector('#searchDrop').setAttribute('style', 'display: none;');
        }
      };
    };
    window.addEventListener('scroll', function(e) {
      if(window.scrollY == 0){
        window.scrollTo(0,1);
      }
    });
    return (
      <div id="mainContain">
        <div className="firstBar">
          <div className={["brand", "cursorChange"].join(' ')}>NikePlus</div>
          <div className={["brand", "cursorChange"].join(' ')}>Jordan</div>
          <div className={["brand", "cursorChange"].join(' ')}>Hurley</div>
          <div className={["brand1", "cursorChange"].join(' ')}>Converse</div>
          <div className={["userLink", "cursorChange"].join(' ')}>Join/Log In To NikePlus Account</div>
          <div className={["userLink", "cursorChange"].join(' ')}>Help</div>
          <img className={["cart", "cursorChange"].join(' ')} src={"http://ec2-18-221-123-158.us-east-2.compute.amazonaws.com/186266c7bbf10d0a2a25bb3e1fd444f5.png"} onClick={this.handleCart}></img>
          {this.state.cart.length > 0 && 
            <div className="cartCount">
              {this.state.cart.length}
            </div>
          }
          <div className="cartContain">
            <div>Your Cart</div>
            {this.state.cart.length == 0 &&
              <div>Is Empty!?</div>
            }
            {this.state.cart.length > 0 &&
              <div>Has {this.state.cart.length} Items</div>
            }
            {this.state.cart.length > 0 &&
              this.state.cart.map((listItem) => 
                <div className="itemContain" id={listItem.sku} onClick={this.handleItemClick}>
                  <img className="cartImg" id={listItem.sku} onClick={this.handleItemClick} src={listItem.images[0]}></img>
                  <div className="cartItems" id={listItem.sku}>
                    <div id={listItem.sku}>{listItem.productName}</div>
                    <div id={listItem.sku}>{listItem.color}</div>
                    <div id={listItem.sku}>{listItem.size} M</div>
                    <div id={listItem.sku}>${listItem.price}</div>
                  </div>
                  <img className="redRemove" id={listItem.sku} value={listItem.size} src="http://ec2-18-221-123-158.us-east-2.compute.amazonaws.com/b5b22e1fb368e51b84d0c1ffea51a17d.png" onClick={this.handleRemove}></img>
                </div>
              )
            }
          </div>
          <img className={["flag", "cursorChange"].join(' ')} src={"http://ec2-18-221-123-158.us-east-2.compute.amazonaws.com/ee737f621fec479e4d11b83d1187465b.png"}></img>
        </div>
        <div className="secondBar">
          <img className="swoosh" onClick={this.handleClick} src={"http://ec2-18-221-123-158.us-east-2.compute.amazonaws.com/061ab828bf837d51f854cd9c1a6558da.png"}></img>
          <div className="storeLink0" onMouseEnter={this.handleEnter} onMouseLeave={this.handleMainLeave}>NEW RELEASES</div>
          <div className="storeLink1" onMouseEnter={this.handleEnter} onMouseLeave={this.handleMainLeave}>MEN</div>
          <div className="storeLink2" onMouseEnter={this.handleEnter} onMouseLeave={this.handleMainLeave}>WOMEN</div>
          <div className="storeLink3" onMouseEnter={this.handleEnter} onMouseLeave={this.handleMainLeave}>KIDS</div>
          <div className="storeLink4" onMouseEnter={this.handleEnter} onMouseLeave={this.handleMainLeave}>CUSTOMIZE</div>
          <div className="searchDiv">
            <form id="search">
              <input className="searchInput" type="text" size="45" placeholder="Search" onChange={this.handleInput} onBlur={this.handleFocus1} onFocus={this.handleFocus}></input>
            </form>
          </div>
          <div className="filler"></div>
        </div>
        <div id="searchDrop">
          <div className="searchPreview">
            <div className="searchPrvTitle">TOP SUGGESTIONS
              {this.state.searchResults.length > 0 &&
                <div className="rowContain">
                  <div className="searchRow">
                      <SearchResult searchResult={this.state.searchResults[0]}/>
                      <SearchResult searchResult={this.state.searchResults[1]}/>
                    </div>
                    <div className="searchRow">
                      <SearchResult searchResult={this.state.searchResults[2]}/>
                      <SearchResult searchResult={this.state.searchResults[3]}/>
                    </div>
                    <div className="searchRow">
                      <SearchResult searchResult={this.state.searchResults[4]}/>
                      <SearchResult searchResult={this.state.searchResults[5]}/>
                    </div>
                </div>
              }
            </div>
            <div className="searchRes">
                {this.state.searchResults.length > 0 &&
                  <div className="resDisplay">
                    <div className="resRow">
                      <div className="firstText">{document.querySelector('.searchInput').value}</div>
                      <div className="secondText">{this.state.searchResults[0].productName.substr(document.querySelector('.searchInput').value.length+1)}</div>
                    </div>
                    <div className="resRow">
                      <div className="firstText">{document.querySelector('.searchInput').value}</div>
                      <div className="secondText">{this.state.searchResults[1].productName.substr(document.querySelector('.searchInput').value.length+1)}</div>
                    </div>
                    <div className="resRow">
                      <div className="firstText">{document.querySelector('.searchInput').value}</div>
                      <div className="secondText">{this.state.searchResults[2].productName.substr(document.querySelector('.searchInput').value.length+1)}</div>
                    </div>
                    <div className="resRow">
                      <div className="firstText">{document.querySelector('.searchInput').value}</div>
                      <div className="secondText">{this.state.searchResults[3].productName.substr(document.querySelector('.searchInput').value.length+1)}</div>
                    </div>
                  </div>
                }
            </div>
          </div>
        </div>
        <div className="release-dropdown" onMouseEnter={this.handleStay} onMouseLeave={this.handleLeave}>
          <div className="release-holder">
            <div className="dropContainMain0">
              <div className="cursorChange">SNKRS LAUNCH CALENDAR</div>
              <div className="cursorChange">JUST IN</div>
              <div className="cursorChange">NEW TO SALE</div>
              <div className="cursorChange">SHOP ALL NEW ARRIVALS</div>
            </div>
            <div className="dropContainMain1">
              <div className="cursorChange">NEW FOR MEN</div>
              <ul className="dropList">
                <li>Shoes</li>
                <li>Clothing</li>
                <li>Equipment</li>
                <li>Shop All New</li>
              </ul>
            </div>
            <div className="dropContainMain2">
              <div className="cursorChange">NEW FOR WOMEN</div>
              <ul className="dropList">
                <li>Shoes</li>
                <li>Clothing</li>
                <li>Equipment</li>
                <li>Shop All New</li>
              </ul>
            </div>
            <div className="dropContainMain3">
              <div className="cursorChange">NEW FOR KIDS</div>
              <ul className="dropList">
                <li>Boys Shoes</li>
                <li>Boys Clothing</li>
                <li>Girls Shoes</li>
                <li>Girls Clothing</li>
                <li>Shop All New</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="release-dropdown1" onMouseEnter={this.handleStay} onMouseLeave={this.handleLeave}>
          <div className="release-holder1">
            <div className="dropContainMain0">
              <div className="cursorChange">ITS DIFFERENT!!</div>
              <div className="cursorChange">JUST IN</div>
              <div className="cursorChange">NEW TO SALE</div>
              <div className="cursorChange">SHOP ALL NEW ARRIVALS</div>
            </div>
            <div className="dropContainMain1">
              <div className="cursorChange">NEW FOR MEN</div>
              <ul className="dropList">
                <li>Shoes</li>
                <li>Clothing</li>
                <li>Equipment</li>
                <li>Shop All New</li>
              </ul>
            </div>
            <div className="dropContainMain2">
              <div className="cursorChange">NEW FOR WOMEN</div>
              <ul className="dropList">
                <li>Shoes</li>
                <li>Clothing</li>
                <li>Equipment</li>
                <li>Shop All New</li>
              </ul>
            </div>
            <div className="dropContainMain3">
              <div className="cursorChange">NEW FOR KIDS</div>
              <ul className="dropList">
                <li>Boys Shoes</li>
                <li>Boys Clothing</li>
                <li>Girls Shoes</li>
                <li>Girls Clothing</li>
                <li>Shop All New</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="release-dropdown2" onMouseEnter={this.handleStay} onMouseLeave={this.handleLeave}>
          <div className="release-holder2">
            <div className="dropContainMain0">
              <div className="cursorChange">SNKRS LAUNCH CALENDAR</div>
              <div className="cursorChange">JUST IN</div>
              <div className="cursorChange">NEW TO SALE</div>
              <div className="cursorChange">EVEN MORE DIFFERENT!!</div>
            </div>
            <div className="dropContainMain1">
              <div className="cursorChange">NEW FOR MEN</div>
              <ul className="dropList">
                <li>Shoes</li>
                <li>Clothing</li>
                <li>Equipment</li>
                <li>Shop All New</li>
              </ul>
            </div>
            <div className="dropContainMain2">
              <div className="cursorChange">NEW FOR WOMEN</div>
              <ul className="dropList">
                <li>Shoes</li>
                <li>Clothing</li>
                <li>Equipment</li>
                <li>Shop All New</li>
              </ul>
            </div>
            <div className="dropContainMain3">
              <div className="cursorChange">NEW FOR KIDS</div>
              <ul className="dropList">
                <li>Boys Shoes</li>
                <li>Boys Clothing</li>
                <li>Girls Shoes</li>
                <li>Girls Clothing</li>
                <li>Shop All New</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="release-dropdown3" onMouseEnter={this.handleStay} onMouseLeave={this.handleLeave}>
          <div className="release-holder3">
            <div className="dropContainMain0">
              <div className="cursorChange">SNKRS LAUNCH CALENDAR</div>
              <div className="cursorChange">JUST IN</div>
              <div className="cursorChange">Different</div>
              <div className="cursorChange">SHOP ALL NEW ARRIVALS</div>
            </div>
            <div className="dropContainMain1">
              <div className="cursorChange">NEW FOR MEN</div>
              <ul className="dropList">
                <li>Shoes</li>
                <li>Clothing</li>
                <li>Equipment</li>
                <li>Shop All New</li>
              </ul>
            </div>
            <div className="dropContainMain2">
              <div className="cursorChange">NEW FOR WOMEN</div>
              <ul className="dropList">
                <li>Shoes</li>
                <li>Clothing</li>
                <li>Equipment</li>
                <li>Shop All New</li>
              </ul>
            </div>
            <div className="dropContainMain3">
              <div className="cursorChange">NEW FOR KIDS</div>
              <ul className="dropList">
                <li>Boys Shoes</li>
                <li>Boys Clothing</li>
                <li>Girls Shoes</li>
                <li>Girls Clothing</li>
                <li>Shop All New</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="release-dropdown4" onMouseEnter={this.handleStay} onMouseLeave={this.handleLeave}>
          <div className="release-holder4">
            <div className="dropContainMain0">
              <div className="cursorChange">SNKRS LAUNCH CALENDAR</div>
              <div className="cursorChange">STUFFF COMES IN</div>
              <div className="cursorChange">NEW TO SALE</div>
              <div className="cursorChange">SHOP ALL NEW ARRIVALS</div>
            </div>
            <div className="dropContainMain1">
              <div className="cursorChange">NEW FOR MEN</div>
              <ul className="dropList">
                <li>Shoes</li>
                <li>Clothing</li>
                <li>Equipment</li>
                <li>Shop All New</li>
              </ul>
            </div>
            <div className="dropContainMain2">
              <div className="cursorChange">NEW FOR WOMEN</div>
              <ul className="dropList">
                <li>Shoes</li>
                <li>Clothing</li>
                <li>Equipment</li>
                <li>Shop All New</li>
              </ul>
            </div>
            <div className="dropContainMain3">
              <div className="cursorChange">NEW FOR KIDS</div>
              <ul className="dropList">
                <li>Boys Shoes</li>
                <li>Boys Clothing</li>
                <li>Girls Shoes</li>
                <li>Girls Clothing</li>
                <li>Shop All New</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

window.Navbar = Navbar;
ReactDOM.render(<Navbar />, document.getElementById('navbar'));
