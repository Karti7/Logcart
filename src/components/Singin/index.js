import Button from '../forms/Button';
import './styles.scss';
import google from './../../assets/google.png'
import fb   from './../../assets/fb.jpg';
import {signInWithGoogle} from './../../firebase/utlis';
import React, { Component } from 'react';

class SignIn extends Component  {

    handelSubmit = async e =>{
        e.preventDefault();
    }
      
    render(){
        return (
            <div className="singin">
                <div className="wrap">
                    <h2>Singin</h2>
    
                    <div className="formWrap">
                        <form onSubmit={this.handelSubmit}>
                            <div className="socialSingin">
                                <div className="row">
                                
                                    <Button onClick={signInWithGoogle}>
                                    <img className="icon" style={{ width: "25px", height: "25px" }} src={google} alt="google"></img>
                                        Login with Google
                                    </Button>
                                </div>
    
                                <div className="row">
                                    <Button>
                                    <img className="icon" style={{ width: "25px", height: "25px"}} src={fb} alt="fb"></img>
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