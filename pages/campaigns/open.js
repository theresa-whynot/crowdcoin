import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout';
import { Link } from '../../routes';
import Campaign from '../../ethereum/campaign';

class CampaignOpen extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns };
    }

    async fetchCampaignDetails(address) {
        const campaign = Campaign(address);
        const campaignTitle = await campaign.methods.campaignTitle().call();
        const campaignDescription = await campaign.methods.campaignDescription().call();
        const summary = await campaign.methods.getSummary().call();
        const sumContribution = summary[5];
        const minimumBalance = summary[6];
        const targetDeadline = Number(summary[7]);
        return { address, campaignTitle, campaignDescription, targetDeadline, minimumBalance, sumContribution };
    }

    async componentDidMount() {
        const campaignDetails = await Promise.all(this.props.campaigns.map(this.fetchCampaignDetails));
        this.setState({ campaignDetails });
    }

    renderCampaigns() {
        if (!this.state || !this.state.campaignDetails) {
            return <div>Loading...</div>;
        }


        const activeCampaigns = this.state.campaignDetails.filter(({ targetDeadline, sumContribution, minimumBalance }) => {
            const currentTimestamp = Math.floor(Date.now() / 1000);
            return (currentTimestamp <= targetDeadline || sumContribution >= minimumBalance)
        });


        const items = activeCampaigns.map(({ address, campaignTitle, campaignDescription }) => {
            return {
                header: campaignTitle,
                meta: address,
                description: (
                    <div>
                        {campaignDescription} <br></br>
                        <Link route={`/campaigns/${address}`}>
                            <a>View Campaign</a>
                        </Link>
                    </div>
                ),
                fluid: true,
            };
        });

        return <Card.Group items={items} />;
    };


    render() {

        return (
            <Layout>
                <div>
                    <h3>Open Campaigns</h3>
                    <Link route="/campaigns/new">
                        <a>
                            <Button color='green' floated="right" content="Create Campaign" icon="add circle" />
                        </a>
                    </Link>
                    {this.renderCampaigns()}
                </div>
            </Layout>
        );
    }
}

export default CampaignOpen;
