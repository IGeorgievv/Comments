import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      header: this.props.data
    }

  }

  setActive = (e) => {

    const header = this.state.header;
    const href = e ? e.target.getAttribute("href") : window.location.pathname;
    
    let index = header.length;
    let it = {};
    if (header && index >= 1) {
      while ( --index >= 0 ) {
        it = header[index];

        if ( it['link'] == href && it['current'] == " active" )
          return;

        if ( it['current'] == " active" )
          it['current'] = "";
        else if ( it['link'] == href )
          it['current'] = " active";
      }
    }

    this.setState({header: header});
  }

  componentDidMount() {
    this.setActive();
  }

  render() {
    const headerNavigation = this.state.header;
    let thisList = {};
    if (headerNavigation && headerNavigation.length >= 1) {
      thisList = headerNavigation.map((thisEl, id) => 
        <li key={id} className="nav-item">
          <Link to={thisEl.link} className={"nav-link"+ (thisEl.current ? thisEl.current : "") } onMouseDown={ this.setActive }>{thisEl.title}</Link>
        </li>
      );
    }
    
    return (
      <header className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container d-flex justify-content-between">
          <div className="collapse navbar-collapse">
            <Link to="/" className="navbar-brand d-flex align-items-center" onMouseDown={ this.setActive }>
              <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 1792 1792" fill="currentColor" className="mr-2"><path d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45v-480q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6zm223-69l-62 74q-8 9-21 11h-3q-13 0-21-7l-692-577-692 577q-12 8-24 7-13-2-21-11l-62-74q-8-10-7-23.5t11-21.5l719-599q32-26 76-26t76 26l244 204v-195q0-14 9-23t23-9h192q14 0 23 9t9 23v408l219 182q10 8 11 21.5t-7 23.5z"/></svg>
            </Link>
            <ul className="navbar-nav">
              {headerNavigation && headerNavigation.length >= 1 && thisList}
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;