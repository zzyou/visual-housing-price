import React, { Component } from 'react';
import { Card, CardTitle, Col } from 'react-materialize';
import './Profile.css';

class Profile extends Component {
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  render() {
    const { profile } = this.state;
    return (
        <Col m={12} s={12}>
            <Card 
                className='small'
                header={<CardTitle image={profile.picture}>{profile.name}</CardTitle>} 
                textClassName='white-text' 
                title={profile.name}
                actions={[<a href='#'>This is a link</a>]} >
                {profile.nickname} 
            </Card>
            {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
        </Col>
    );
  }
}

export default Profile;
