import Button from '../forms/Button';
import './styles.scss';
import google from './../../assets/google.png'
import fb from './../../assets/fb.jpg';
import  {signInWithGoogle, auth}  from './../../firebase/utlis';
import { signInWithFacebook } from './../../firebase/utlis';
import React, { Component } from 'react';

import FormInput from './../forms/FormInput';

const initialState = {
    email: '',
    password: ''
}

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = { ...initialState };
        this.handelChange = this.handelChange.bind(this);
    }

    handelSubmit = async e => {
        e.preventDefault();

        const {email,password} = this.state;

        try {
                await auth.signInWithEmailAndPassword(email,password);
                this.setState({...initialState});
        } catch (err) {
            console.log(err);
            
        }
    }

    handelChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
             }
        )
    }
    render() {
        const { email, password } = this.state;
        return (
            <div className="singin">
                <div className="wrap">
                    <h2>Singin</h2>

                    <div className="formWrap">
                        <form onSubmit={this.handelSubmit}>

                            <FormInput
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Email"
                                onChange={this.handelChange}
                            />

                            <FormInput
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                onChange={this.handelChange}
                            />

                            <Button className="btn" type="submit">Login</Button>

                            <div className="socialSingin">
                                <div className="row">

                                    <Button onClick={signInWithGoogle}>
                                        <img className="icon" style={{ width: "25px", height: "25px" }} src={google} alt="google"></img>
                                        Login with Google
                                    </Button>
                                </div>

                                <div className="row">
                                    <Button onClick={signInWithFacebook}>
                                        <img className="icon" style={{ width: "25px", height: "25px" }} src={fb} alt="fb"></img>
                                        Login with Facebook
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        )
    }



}

export default SignIn;