import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import '../css/_main.scss';
import '../css/main.css';

import Header from '../components/navigations/Header';
import Home from '../components/home/Home';
import Comments from '../components/comments/Comments';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      header: [
        { id: 1, name: 'Comments', link: '/comments', title: 'Comments', type: 'comments' }
      ]
    };
  }

  // componentDidMount() {

  //   fetch('/data/get/navigations')
  //   .then(res => res.json())
  //   .then(
  //     (result) => {
  //       if (result && result.header) this.setState({ header: result.header })
  //     },
  //     (error) => {}
  //   )
  // }

  render() {
    const headerData = this.state.header;
    let routeComponents = {};
    const dynamicComponents = {
      'home':     Home,
      'comments': Comments
    }

    if (headerData.length >= 1) {
      routeComponents = headerData.map(
        (thisEl) => {
          const ComponentName = dynamicComponents[thisEl.type];
          return <Route path={thisEl.link}
                    exact component={ComponentName}
                    key={thisEl.link}
                  />
        }
      );
    }
    
    return (
      <div className='App'>
        <Header data={headerData} location={this.props.location} />
        <Route path='/'
          exact component={Home}
          key="home"
        />
        {headerData.length >= 1 && routeComponents}
      </div>
    );
  }
}

export default App;
