import React, { Component } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";

import web3 from "../ethereum/web3";
import GoogleMap from "./GoogleMap";
import Parking from "../ethereum/Parking.js";
import axios from "axios";
import { withRouter } from "next/router";
import styles from "./css/signUp.module.css";
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

    // this.autocompleteInput = React.createRef();
    // this.autocomplete = null;
    // this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    // $(window).on("hashchange", function () {
    //   if (location.hash.slice(1) == "signup") {
    //     $(".page").addClass("extend");
    //     $("#login").removeClass("active");
    //     $("#signup").addClass("active");
    //   } else {
    //     $(".page").removeClass("extend");
    //     $("#login").addClass("active");
    //     $("#signup").removeClass("active");
    //   }
    // });
    // $(window).trigger("hashchange");
  }

  componentDidMount() {
    // axios.get("")
    // .then((response) => {
    //   this.setState({ googleMapsApiKey: response.data.key });
    // });
    {
      /* this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ["geocode"] }
    );

    this.autocomplete.addListener("place_changed", this.handlePlaceChanged); */
    }
  }

  handleChange = (address) => {
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
  // handleChange = (event) => {
  //   this.setState({ [event.target.name]: event.target.value });
  // };

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
      <div className={styles.SignUpPage}>
        <div className={styles.box}>
          <div className={styles.header}>
            <Link id={styles.login} className={styles.active} href="#">
              login
            </Link>
            <Link id={styles.signup} href="#">
              signup
            </Link>
          </div>
          <div className={styles.content}>
            <form className={styles.login} name="loginForm">
              <input
                type="text"
                name="name"
                className={styles.inputField}
                placeholder="User Address"
              ></input>
              <input
                type="password"
                name="password"
                className={styles.inputField}
                placeholder="Password"
              ></input>
              <button
                className={styles.submitButton}
                type="submit"
                value="Login"
              >
                Login
              </button>
            </form>
            {/* <h1>Create User Account</h1> */}
            <div>
              {this.props.router.query.person === "spotOwner" ? (
                <form
                  className={styles.signup}
                  name="signupForm"
                  // onSubmit={this.handleSubmit}
                >
                  <input
                    type="text"
                    name="userAddress"
                    className={styles.inputField}
                    placeholder="User Address"
                  ></input>
                  <input
                    type="number"
                    name="rate"
                    className={styles.inputField}
                    placeholder="Rate per hour in Rs."
                  ></input>
                  {/* <input
                    type="text"
                    name="locAddress"
                    className={styles.inputField}
                    ref={this.autocompleteInput}
                    id="autocomplete"
                    placeholder="Location Address"
                  ></input> */}
                  <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                    
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div>
                        <input
                        className={styles.inputField}
                          {...getInputProps({
                            placeholder: "Search Places ...",
                            // className: {styles.location_search_input},
                            
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
                  
                  <input
                    type="number"
                    name="availableSpots"
                    className={styles.inputField}
                    placeholder="Available Spots"
                  ></input>
                  <input
                    type="password"
                    name="password"
                    className={styles.inputField}
                    placeholder="Password"
                  ></input>
                  <button
                    className={styles.submitButton}
                    type="submit"
                    value="SignUp"
                  >
                    SignUp
                  </button>
                </form>
              ) : (
                <form
                  className={styles.signup}
                  name="signupForm"
                  // onSubmit={this.handleSubmit}
                >
                  <input
                    type="text"
                    name="userAddress"
                    className={styles.inputField}
                    placeholder="User Address"
                    onChange={this.handleChange}
                  ></input>
                  <input
                    type="text"
                    name="carNo"
                    className={styles.inputField}
                    placeholder="Car Number"
                    onChange={this.handleChange}
                  ></input>
                  <input
                    type="text"
                    name="mobileNumber"
                    className={styles.inputField}
                    placeholder="Mobile Number"
                    onChange={this.handleChange}
                  ></input>
                  <input
                    type="password"
                    name="password"
                    className={styles.inputField}
                    placeholder="Password"
                    onChange={this.handleChange}
                  ></input>
                  <button
                    className={styles.submitButton}
                    type="submit"
                    value="SignUp"
                  >
                    SignUp
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  GoogleApiWrapper({
    apiKey: "AIzaSyBUubDA69b60fcLydMGlX67mcSxbZZT1Pg",
  })(Signup)
);
// export{
//   withRouter(Signup);
//   GoogleApiWrapper({
//     apiKey: "AIzaSyBUubDA69b60fcLydMGlX67mcSxbZZT1Pg",
//   })(Signup);
// }

{
  /* export default function SignInSignUp() { */
}

//   const state = {
//     spotOwnerAddress: "",
//     // spotRate: "",
//     // locationAddress: "",
//     // availableSpots: "",
//     // spotOwnerPassword: "",
//     // driverAddress: "",
//     // carNo: "",
//     // mobNo: "",
//     // driverPassword: ""
//   };

//   const handleInputChanged = (event)=> {
//     // this.setState({
//     // spotOwnerAddress: event.target.value,
//     // spotRate: event.target.value,
//     // locationAddress: event.target.value,
//     // availableSpots: event.target.value,
//     // spotOwnerPassword: event.target.value,
//     // driverAddress: event.target.value,
//     // carNo: event.target.value,
//     // mobNo: event.target.value,
//     // driverPassword: event.target.value
//     // });
//     state.spotOwnerAddress = event.target.value;
//   }

//   const handleSubmitParkingSpotDetails = ()=> {
//     console.log(state);
//   }

//   // const router = useRouter();
//   // const params = router.query;
//   // if (!params.person) {
//   //   useEffect(() => {
//   //     router.push('/')
//   //   }, [])
//   //   return <h1>Page doesnot exist</h1>
//   // }

// // class SignInSignUp extends Component {
// //   componentDidMount() {
// //     console.log(router.query);
// //     console.log("hellow world")
// //     // console.log(queryString.parse(this.props));
// //   }

// // render() {
// //
// // };
// // }
