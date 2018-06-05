import React, { Component } from 'react';
import { Button, Dropdown, Modal, Navbar, NavItem, Icon, SideNav, SideNavItem } from 'react-materialize';
import { makeMainRoutes } from '../routes';
const routes = makeMainRoutes();

class TopNav extends Component {
    render() {
        return (
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
                    trigger={<Button>SIDE NAV</Button>}
                    options={{ closeOnClick: true }}
                >
                    <SideNavItem userView
                    user={{
                        background: '#',
                        image: '#',
                        name: 'Zhenzhen',
                        email: 'zhenzyou@gmail.com'
                    }}
                    />
                    <SideNavItem href='#!icon' icon='cloud'>First Link With Icon</SideNavItem>
                    <SideNavItem href='#!second'>Second Link</SideNavItem>
                    <SideNavItem divider />
                    <SideNavItem subheader>Subheader</SideNavItem>
                    <SideNavItem waves href='#!third'>Third Link With Waves</SideNavItem>
                </SideNav>
                {/* <Modal
                    header='Welcome!'
                    trigger={<Button>Login</Button>}>
                    {routes}
                </Modal> */}
            </Navbar>
        );
    }
}

export default TopNav;
