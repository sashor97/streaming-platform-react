import React, {Component} from 'react';
import {signIn,signOut} from './actions';
import {connect} from 'react-redux';
class GoogleAuth extends Component {

    componentDidMount() {
        const CLIENT_ID = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId: CLIENT_ID,
                scope:'email'
            }).then(()=>{
                this.auth=window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        });
    }
    onSignInClick=()=>{
        this.auth.signIn();
    }
    onSignOutClick=()=>{
        this.auth.signOut();
    }
    onAuthChange=(isSignedIn)=>{
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }
        else{
            this.props.signOut(this.auth.currentUser.get().getId());
        }
    }
    renderAuthButton(){
        if(this.props.isSignedIn===null){
            return null;
        }
        else if(this.props.isSignedIn){
            return(
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign out
                </button>
            )
        }
        else{
            return(
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign in with Google
                </button>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return {isSignedIn:state.auth.isSignedIn}
}

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);
