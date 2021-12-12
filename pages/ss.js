import React, { Component } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect } from 'react'
// import { stat } from "fs-extra";

import web3 from '../ethereum/web3'

import  Parking from '../ethereum/Parking.js'

import { withRouter } from 'next/router'
import styles from './css/signUp.module.css';

var uid =1;
    class Signup extends Component {
      constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
      }    
      state = {
        userAddress:'',
        rate:0,
        locAddress:'',
        availableSpots:0,
        password:'',
        carNo:'',
        mobileNumber:'',
        
      }
    handleChange = event => {
      this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = async e => {
      e.preventDefault();
      console.log(this.state)
      const account = await web3.eth.getAccounts();
        console.log(account[0])
        if (this.props.router.query.person === "User"){
          await Parking.methods.registerNewUser(this.state.carNo,this.state.mobileNumber,"123","123",this.state.password).send({
            from : account[0],
            gas: 10000000
        });
        const tem = await Parking.methods.checkAlreadyRegisteredUser().call({
          from : account[0]
        });
        console.log(tem);
        } else if(this.props.router.query.person === "spotOwner"){
             await Parking.methods.registerNewParkingSpot(this.state.rate,"123","123",this.state.locAddress,this.state.availableSpots,uid,this.state.password).send({
            from : account[0],
            gas: 10000000
        });
        uid = uid +1;
        }
    }
  // console.log()
  render() {
    return (

    <div className={styles.SignUpPage}>
        <div className={styles.box}>
          <div className={styles.header}>
              <Link id={styles.login} className={styles.active} href="#login">login</Link>
              <Link id={styles.signup} href="#signup">signup</Link>
          </div>
          <div className={styles.content}>
            <form className={styles.login} name="loginForm" >
                  <input type="text" name="name" className={styles.inputField} placeholder="User Address"></input>
                  <input type="password" name="password" className={styles.inputField} placeholder="Password"></input>
                  <br/><br/>
                  <input className={styles.submitButton} type="submit" value="Login"></input>
            </form>
          <div>{this.props.router.query.person === "spotOwner" ? (
            <form className={styles.signup} name="signupForm"onSubmit={ this.handleSubmit }>
            <h1>Create Account</h1>
            <input type="text" name="userAddress" className={styles.inputField} placeholder="User Address"></input>
            <input type="number" name="rate" className={styles.inputField} placeholder="Rate per hour in Rs."></input>
            <input type="text" name="locAddress" className={styles.inputField} placeholder="Location Address"></input>
            <input type="number" name="availableSpots" className={styles.inputField} placeholder="Available Spots"></input>
            <input type="password" name="password" className={styles.inputField} placeholder="Password"></input>
            <br/>
            <input className={styles.submitButton} type="submit" value="SignUp"></input>
            </form>
         ) : (
            <form className={styles.signup} name="signupForm"onSubmit={ this.handleSubmit }>
            <h1>Create User Account</h1>
              <h1>Create User account</h1>
              <input type="text" name="userAddress" className={styles.inputField}  placeholder="User Address" onChange = {this.handleChange}></input>
              <input type="text" name="carNo" className={styles.inputField}  placeholder="Car Number" onChange = {this.handleChange}></input>
            <input type="text" name="mobileNumber" className={styles.inputField} placeholder="Mobile Number" onChange = {this.handleChange}></input>
            <input type="password" name="password" className={styles.inputField}  placeholder="Password" onChange = {this.handleChange}></input>
            <button className={styles.submitButton} type="submit" value="SignUp"></button>
            </form>
          ) }
          </div>
        </div>
      </div>  
      </div>    
    );
  }
}

export default withRouter(Signup)

{/* export default function SignInSignUp() { */}

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

// // export default SignInSignUp;