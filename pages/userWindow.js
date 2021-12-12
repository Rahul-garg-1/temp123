import React, { Component } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import web3 from "../ethereum/web3";
import Parking from "../ethereum/Parking.js";
import { withRouter } from "next/router";
import $ from "jquery";
import styles from "./css/userLocation.module.css";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { position } from "dom-helpers";
// import LoadingScreen from "./loading";
// import { stat } from "fs-extra";
// import Geocoder from "react-native-geocoding";
// import Geolocation from "react-native-geolocation-service";
// import ReactDependentScript from 'react-dependent-script';
// <ReactDependentScript
//   scripts={["https://maps.googleapis.com/maps/api/js?key=AIzaSyBUubDA69b60fcLydMGlX67mcSxbZZT1Pg"]}
// >
// </ReactDependentScript>

class UserWindow extends Component {
  state = {
    latitude: 0,
    longitude: 0,
    address: "",
    isLoading: true,
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {},
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&censor=false&key=AIzaSyA50KK3_YkxIwvDfiU58RXo6lVksvQprD8`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(this);
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: data.results[0].formatted_address,
            isLoading: false,
          });
        })
        .catch((error) => alert(error));
      // console.log(this.state);
    });

    // this.fakeRequest().then(() => {
    //   const el = document.getElementsByClassName(".loader");
    //   if (el) {
    //     this.setState({ isLoading: false }); // showing the app
    //   }
    //   console.log(this.state);
    // });
  }
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  // fakeRequest = () => {
  //   return new Promise((resolve) => setTimeout(() => resolve(), 2500));
  // };

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <div class={styles.loader}></div>
        ) : (
          <div className={styles.userLocPage}>
            <div>
              <h1 className={styles.header}>Track Website user's Location </h1>
              <Map
                google={this.props.google}
                zoom={14}
                style={{ width: "100%", height: "100%" }}
                initialCenter={{
                  lat: this.state.latitude,
                  lng: this.state.longitude,
                }}
              >
                <Marker
                  onClick={this.onMarkerClick}
                  name={"Current Location"}
                />
                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onClose={this.onClose}
                >
                  <div className={styles.infoDetails}>
                    <h4>{this.state.address}</h4>
                  </div>
                </InfoWindow>
              </Map>
            </div>
            <button className={styles.parkingButton}>
              <span>Show Parking Spots</span>
            </button>
          </div>
        )}
      </div>
    );
  }
}
// export default UserWindow;
export default GoogleApiWrapper({
  apiKey: "AIzaSyBUubDA69b60fcLydMGlX67mcSxbZZT1Pg",
})(UserWindow);
