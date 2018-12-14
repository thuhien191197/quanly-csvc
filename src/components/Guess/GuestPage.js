import React, { Component } from 'react';
import {Header,Footer} from './Layouts';
import Exercises from './Exercises/';

class GuestPage extends Component {
  render() {
    return (
      <div>
        <Header/>

          <Exercises/>

        <Footer/>
      </div>
    );
  }
}

export default GuestPage;
