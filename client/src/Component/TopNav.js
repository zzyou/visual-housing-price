import React, { Component } from 'react';
import { Button, Dropdown, Navbar, NavItem, Icon, SideNav, SideNavItem } from 'react-materialize';

class TopNav extends Component {
    render() {
        return (
            <div>
                <Navbar brand='Visual Housing Price' right>
                    <NavItem href='get-started.html'><Icon>search</Icon></NavItem>
                    <NavItem href='get-started.html'><Icon>view_module</Icon></NavItem>
                    <NavItem href='get-started.html'><Icon>refresh</Icon></NavItem>
                    <NavItem href='get-started.html'><Icon>more_vert</Icon></NavItem>

                    <Dropdown trigger={
                        <Button>Drop me!</Button>
                    }>
                        <NavItem>one</NavItem>
                        <NavItem>two</NavItem>
                        <NavItem divider />
                        <NavItem>three</NavItem>
                    </Dropdown>

                    <SideNav
                        trigger={<Button>SIDE NAV DEMO</Button>}
                        options={{ closeOnClick: true }}
                    >
                        <SideNavItem userView
                        user={{
                            background: '#',
                            image: '#',
                            name: 'John Doe',
                            email: 'jdandturk@gmail.com'
                        }}
                        />
                        <SideNavItem href='#!icon' icon='cloud'>First Link With Icon</SideNavItem>
                        <SideNavItem href='#!second'>Second Link</SideNavItem>
                        <SideNavItem divider />
                        <SideNavItem subheader>Subheader</SideNavItem>
                        <SideNavItem waves href='#!third'>Third Link With Waves</SideNavItem>
                    </SideNav>
                </Navbar>
            </div>
        );
    }
}

export default TopNav;
