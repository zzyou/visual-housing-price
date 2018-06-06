import React, { Component } from 'react';
import { Col, ProgressBar } from 'react-materialize';
import Chart from './Component/Chart';
import TopNav from './Component/TopNav';
import BottomNav from './Component/BottomNav';

class User extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          year: '2017',
          isLoading: false
        };
    
        this.getData = this.getData.bind(this);
      }

    login() {
        this.props.auth.login();
    }
    
    getData() {
        this.setState({
            isLoading: true
        });

        fetch('/states/alldata')
            .then(res => res.json())
            .then(res => {
                const data = JSON.parse(JSON.stringify(res));
                return this.setState({
                    data: data,
                    isLoading: false
                });
            })
            .catch(err => {
                console.error(err.toString());
            });
    }

    componentDidMount() {
        this.getData();
    }

    // componentDidUpdate() {
    //     this.getData();
    // }

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
                
                { this.state.isLoading ? 
                    (<Col s={12}><ProgressBar /></Col>) :
                    (<Chart data={this.state.data} year={this.state.year} />)
                }

                <BottomNav {...this.props} />
            </div>
        );
    }
}

export default User;
