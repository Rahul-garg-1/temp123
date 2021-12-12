import React, { Component } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";

import web3 from "../ethereum/web3";
import GoogleMap from "./GoogleMap";
import Parking from "../ethereum/Parking.js";
import axios from "axios";
import { withRouter } from "next/router";
import styles from "./css/login.module.css";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

var uid = 1;
class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    userAddress: "",
    password: "",
    routeQuery: ""
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // In render function

  handleSubmit = async (e) => {
    console.log(this.router.query);
    e.preventDefault();
    e.preventDefault();
    console.log(this.state);
    const account = await web3.eth.getAccounts();
    console.log(account[0]);
    // if (this.props.router.query.person === "User") {
    //   await Parking.methods
    //     .registerNewUser(
    //       this.state.carNo,
    //       this.state.mobileNumber,
    //       "123",
    //       "123",
    //       this.state.password
    //     )
    //     .send({
    //       from: account[0],
    //       gas: 10000000,
    //     });
    //   const tem = await Parking.methods.checkAlreadyRegisteredUser().call({
    //     from: account[0],
    //   });
    //   console.log(tem);
    // } else if (this.props.router.query.person === "spotOwner") {
    //   await Parking.methods
    //     .registerNewParkingSpot(
    //       this.state.rate,
    //       "123",
    //       "123",
    //       this.state.locAddress,
    //       this.state.availableSpots,
    //       uid,
    //       this.state.password
    //     )
    //     .send({
    //       from: account[0],
    //       gas: 10000000,
    //     });
    //   uid = uid + 1;
    // }
  };
  render() {
    return (
      <div className={styles.outer}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <h2>Login</h2>
          <div className={styles.input}>
            <div className={styles.inputBox}>
              <label>Username</label>
              <input type="text" onChange={this.handleChange} />
            </div>
            <div className={styles.inputBox}>
              <label>Password</label>
              <input type="password" onChange={this.handleChange} />
            </div>
            <div className={styles.inputBox}>
              <input type="submit" name="" value="Sign In" />
            </div>
          </div>
          <p className={styles.forgot}>
            Don't have an account <Link href={`/signUp?person=${this.props.router.query.person}`}>Sign Up</Link>
          </p>
          {/* <p className={styles.inputBox}>
              {this.props.router.query.person}
          </p> */}
        </form>
      </div>
    );
  }
}

export default withRouter(
  GoogleApiWrapper({
    apiKey: "AIzaSyBUubDA69b60fcLydMGlX67mcSxbZZT1Pg",
  })(Signup)
);
