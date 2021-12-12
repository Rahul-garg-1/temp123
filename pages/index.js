import React, { Component } from "react";
import parking from "../ethereum/Parking";
// import "./css/Index.css";
import Link from "next/link";
// import { Link } from 'react-router-dom';
import Router from "next/router";

import web3 from "../ethereum/web3";

import Parking from "../ethereum/Parking.js";

// import {
//     BrowserRouter as Router,
//     Route,
//     Link,
// } from "react-router-dom";
// import { Button } from 'react-native'

class ParkingIndex extends Component {
  static async getInitialProps() {
    //our backend code
    // return { blahblah: blah blah}

    return {};
  }

  //   async componentDidMount() {
  // //     const account = await web3.eth.getAccounts();
  // //     console.log(account[0])
  // //     const flag = await Parking.methods.checkAlreadyRegisteredUser().call({
  // //       from : account[0]
  // //   });
  // //     console.log(flag);
  //   }

  render() {
    return (
      <div className="outer">
        <div className="header">
          <h2>DECENTRALIZED PARKING SYSTEM</h2>
        </div>
        <div className="split left">
          <h1>You are a DRIVER?</h1>
          <a href="/login?person=User" className="button">
            Sign In
          </a>
        </div>
        <div className="split right">
          <h1>You are a OWNER?</h1>
          <a href="/login?person=spotOwner" className="button">
            Sign In
          </a>
        </div>
      </div>
    );
  }
}

export default ParkingIndex;
