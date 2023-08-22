import React from 'react';
import { Menu, Header, Icon } from 'semantic-ui-react';
import { Link } from '../routes';

const HeaderCC = () => {
    const menuStyle = {
        marginTop: '10px',
        marginBottom: '20px',
        backgroundColor: '#f8f8f8',
    };

    const headerStyle = {
        marginTop: '20px',
        textAlign: 'center',
    };

    const headerContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
    };


    return (
        <div>
        <div style={headerContainerStyle}>
            <Link route="/">
                <a>
                    <Header as='h2' style={headerStyle}>
                        <Icon color='green' name='ethereum' />
                            <Header.Content>
                                CrowdCoin
                                <Header.Subheader>Ethereum-Based Decentralized Crowd Funding</Header.Subheader>
                            </Header.Content>

                    </Header>
                </a>
            </Link>
            </div>
          <Menu style={menuStyle}>

                <Menu.Menu position="left">

                    <Link route="/">
                        <a className = 'item'>
                            CrowdCoin
                        </a>
                    </Link>

                    <Link route="/campaigns/new">
                        <a className='item'>
                            Create Campaign
                        </a>
                    </Link>

                </Menu.Menu>

            <Menu.Menu position="right">

                    <Link route="/campaigns/open">
                    <a className='item'>
                        Open Campaigns
                    </a>
                </Link>

                <Link route="/campaigns/inactive">
                    <a className='item'>
                        Closed Campaigns
                    </a>
                 </Link>

                    <Link route="/campaigns/frequentlyasked">
                        <a className='item'>
                            FAQs
                        </a>
                    </Link>
         

            </Menu.Menu>

        </Menu>
            
        </div>
    )
}


export default HeaderCC;
