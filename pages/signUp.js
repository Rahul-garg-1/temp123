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

  handleAutoCompleteChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.setState({
          latitude: latLng.lat,
          longitude: latLng.lng,
        });
        console.log(this.state);
      })
      .catch((error) => console.error("Error", error));
  };

  state = {
    userAddress: "",
    rate: 0,
    latitude: 0,
    longitude: 0,
    locAddress: "",
    address: "",
    availableSpots: 0,
    password: "",
    carNo: "",
    mobileNumber: "",
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
  // console.log()
  render() {
    return (
      <div className={styles.outer}>
        {this.props.router.query.person === "spotOwner" ? (
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <h2>Sign Up</h2>
            <div className={styles.input}>
              <div className={styles.inputBox}>
                <label for="userAddress">User Address</label>
                <input
                  type="text"
                  name="userAddress"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className={styles.inputBox}>
                <label for="rate">Rate</label>
                <input
                  type="number"
                  name="rate"
                  onChange={this.handleChange}
                ></input>
              </div>
              <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleAutoCompleteChange}
                onSelect={this.handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div className={styles.inputBox}>
                    <label for="locAddress">Location Address</label>
                    <input
                      {...getInputProps({
                        placeholder: "Search Places ...",
                        name: "locAddress",
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? {
                              backgroundColor: "#fafafa",
                              cursor: "pointer",
                            }
                          : {
                              backgroundColor: "#ffffff",
                              cursor: "pointer",
                            };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              ;
              <div className={styles.inputBox}>
                <label for="availableSpots">Available Spots</label>
                <input
                  type="number"
                  name="availableSpots"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className={styles.inputBox}>
                <label for="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className={styles.inputBox}>
                <input
                  type="submit"
                  name="submit"
                  value="Sign Up"
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
          </form>
        ) : (
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <h2>Sign Up</h2>
            <div className={styles.input}>
              <div className={styles.inputBox}>
                <label for="userAddress">User Address</label>
                <input
                  type="text"
                  name="userAddress"
                  onChange={this.handleChange}
                ></input>
              </div>

              <div className={styles.inputBox}>
                <label for="carNo">Car Number</label>
                <input
                  type="text"
                  name="carNo"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className={styles.inputBox}>
                <label for="mobileNo"> Mobile Number</label>
                <input
                  type="text"
                  name="mobileNumber"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className={styles.inputBox}>
                <label for="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                ></input>
              </div>

              <div className={styles.inputBox}>
                <input
                  type="submit"
                  name="submit"
                  value="Sign Up"
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default withRouter(
  GoogleApiWrapper({
    apiKey: "AIzaSyBUubDA69b60fcLydMGlX67mcSxbZZT1Pg",
  })(Signup)
);
