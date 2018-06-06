import React, { Component } from 'react';
import Chart from './Component/Chart';
import TopNav from './Component/TopNav';
import BottomNav from './Component/BottomNav';

class User extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          year: '2017'
        };
    
        this.getData = this.getData.bind(this);
      }

    login() {
        this.props.auth.login();
    }
    
    getData() {
        fetch('/states/alldata')
            .then(res => res.json())
            .then(res => {
                const data = JSON.parse(JSON.stringify(res));
                return this.setState({
                    data: data
                });
            })
            .catch(err => {
                console.error(err.toString());
            })
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
                        <h4>
                            You are logged in!
                        </h4>
                    )
                }
                {
                    !isAuthenticated() && (
                        <h4>
                            You are not logged in! please{' '}
                            <a
                                style={{ cursor: 'pointer' }}
                                onClick={this.login.bind(this)}
                            >
                                Log In
                            </a>
                            {' '}to continue.
                        </h4>
                    )
                }
                <Chart data={this.state.data} year={this.state.year} />

                <BottomNav {...this.props} />
            </div>
        );
    }
}

export default User;
