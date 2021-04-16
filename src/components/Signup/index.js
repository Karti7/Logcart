import React, { Component } from 'react'
import './styles.scss';
import FormInput from './../forms/FormInput';

import {auth, firestore, handleUserProfile} from './../../firebase/utlis';

const initialState = {
    displayName: '',
    email: '',
    password: '',
    reEnterPassword: '',
    errors:[]
}

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };

        this.handelChange = this.handelChange.bind(this);
    }

    handelChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handelFormSubmit = async event =>{
        event.preventDefault();
        const{displayName,email,password,reEnterPassword} = this.state;

        //password validation
        if(password != reEnterPassword){
            const err = ['password doesnot match...!'];
            this.setState({
                errors:err
            });
            return;
        }

        //FullName validation
        if(displayName == ''){
            const err = ['FullName should not be empty...!'];
            this.setState({
                errors:err
            });
            return;
        }

        //Email validation
        if(email == ''){
            const err = ['Enter valid Email ID...!'];
            this.setState({
                errors:err
            });
            return;
        }


        try{
            const {user} = await auth.createUserWithEmailAndPassword(email,password);
            await handleUserProfile (user,{displayName});

            this.setState({...initialState});

        }catch(err){
            console.log(err);
        }
    }



    render() {

        const { displayName, email, password, reEnterpassword, errors } = this.state;

        return (
            <div className="signup">
                <div className="wrap">
                    <h2>Sign Up </h2>

                        {errors.length >0 && (
                            <ul>
                                {errors.map((err, index)=>{
                                    return(
                                        <li key="index">
                                            {err}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    <div className="formWrap">

                        <form onSubmit={this.handelFormSubmit}>
                            <FormInput
                                type="text"
                                name="displayName"
                                value={displayName}
                                placeholder="Full Name"
                                onChange={this.handelChange}
                            />

                            <FormInput
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Email Adderss"
                                onChange={this.handelChange}
                            />

                            <FormInput
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                onChange={this.handelChange}
                            />

                            <FormInput
                                type="password"
                                name="reEnterPassword"
                                value={reEnterpassword}
                                placeholder="ReEnter Password"
                                onChange={this.handelChange}
                            />

                            <button className="btn ">Register</button>
                        </form>

                    </div>

                </div> 

            </div>
        );
    }
}
