import React, { Component } from 'react';
import { Col, ProgressBar } from 'react-materialize';
import Chart from './Component/Chart';
import TopNav from './Component/TopNav';
import BottomNav from './Component/BottomNav';
import FetchData from './FetchData';

class User extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          year: '2017'
        };
      }

    login() {
        this.props.auth.login();
    }
    
    render() {
        const { isAuthenticated } = this.props.auth;

        return (
            <div>
                <TopNav {...this.props} />

                {
                    isAuthenticated() && (
                        <h6>
                            You are logged in!
                        </h6>
                    )
                }
                {
                    !isAuthenticated() && (
                        <h6>
                            You are not logged in! please{' '}
                            <a
                                style={{ cursor: 'pointer' }}
                                onClick={this.login.bind(this)}
                            >
                                Log In
                            </a>
                            {' '}to continue.
                        </h6>
                    )
                }
                
                { this.props.error && (<p>{this.props.error.message}</p>) }
        
                { this.props.isLoading && (<Col s={12}><ProgressBar /></Col>) }  
                
                { this.props.data.length > 0
                    && (<Chart data={this.props.data} year={this.state.year} />) }

                <BottomNav {...this.props} />
            </div>
        );
    }
}

export default FetchData('/states/alldata')(User);
