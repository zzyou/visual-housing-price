import React, { Component } from 'react';
import { Col, ProgressBar } from 'react-materialize';
import Chart from './Component/Chart';
import TopNav from './Component/TopNav';
import BottomNav from './Component/BottomNav';
import FetchDataWrapper from './FetchDataWrapper';

class User extends Component {
    // login() {
    //     this.props.auth.login();
    // }
    
    render() {
        // const { isAuthenticated } = this.props.auth;

        return (
            <div>
                <TopNav {...this.props} />

                {/* {
                    isAuthenticated() && (
                        <h6>
                            Welcome!
                        </h6>
                    )
                }
                {
                    !isAuthenticated() && (
                        <h6>
                            You can also{' '}
                            <a
                                style={{ cursor: 'pointer' }}
                                onClick={this.login.bind(this)}
                            >
                                log in
                            </a>
                            {' '}to continue.
                        </h6>
                    )
                } */}
                
                { this.props.error && (<p>{this.props.error.message}</p>) }
        
                { this.props.isLoading && (<Col s={12}><ProgressBar /></Col>) }  
                
                { this.props.data.length > 0
                    && (<Chart data={this.props.data} />) }

                <BottomNav {...this.props} />
            </div>
        );
    }
}

export default FetchDataWrapper('/states/alldata')(User);
