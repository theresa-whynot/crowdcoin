import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button, Progress, Statistic, Message } from 'semantic-ui-react';
import ContributeForm from '../../components/ContributionForm';
import ContributeReturnButton from '../../components/ContributeReturnButton'
import { Link } from '../../routes';


function formatTimestampToDateString(unixTimestamp) {
    const date = new Date(Number(unixTimestamp) * 1000);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

class CampaignShow extends Component {

    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        const campaignTitle = await campaign.methods.campaignTitle().call();
        const campaignDescription = await campaign.methods.campaignDescription().call();
        const targetDeadline = Number(summary[7]);
        return {
            address: props.query.address,
            campaignTitle,
            campaignDescription,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            sumContribution: summary[5],
            minimumBalance: summary[6],
            targetDeadline
        };


    }

    state = {
        contributionReturned: false
    };

    handleContributionReturned = () => {
        this.setState({ contributionReturned: true });
    };

    renderCards() {

        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount,
            campaignTitle,
            campaignDescription
        } = this.props;



        const items = [
            {
                header: String(campaignTitle),
                meta: 'Description of Campaign',
                description: `${campaignDescription}`,
                style: { overflowWrap: 'break-word' }
            },
            {
                header: String(manager),
                meta: 'Address of Manager',
                description: 'The Manager created this campaign and can create requests to withdraw money.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: String(minimumContribution),
                meta: 'Minimum Contribution (wei)',
                description: `You must contribute at least ${minimumContribution} wei to become an approver. Approvers can approve the manager's requests.`

            },
            {
                header: String(requestsCount),
                meta: 'Number of Requests',
                description: `A request tries to withdraw money from the campaign balance for specific purposes. Requests must be approved by approvers.`
            },
            {
                header: String(approversCount),
                meta: 'Number of Approvers',
                description: 'The number of people who have already donated to this campaign and can approve requests.'
            },
            {
                header: String(balance),
                meta: 'Campaign Balance (wei)',
                description: 'The balance is how much money the campaign has left to spend.'
            }
        ];

        return <Card.Group items={items} />;
    };

    renderProgress() {
        const { sumContribution, minimumBalance } = this.props;

        return (
            <Progress
                style={{ marginTop: 20 }}
                value={Number(sumContribution)}
                total={Number(minimumBalance)}
                progress="percent"
            >The campign has received {Number(sumContribution)} wei of the desired {Number(minimumBalance)} wei for project success.
            </Progress>
        );
    }


    render() {
        const { minimumBalance, targetDeadline, sumContribution } = this.props;
        const targetDeadlineTimestamp = formatTimestampToDateString(targetDeadline);
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const campaignNotFunded = currentTimestamp > targetDeadline && sumContribution < minimumBalance;
        const campaignFunded = sumContribution >= minimumBalance

        return (
            <Layout>
                <h3>Campaign Details</h3>
                <Grid>
                    <Grid.Column width={10}>
                        {this.renderCards()}
                    </Grid.Column>

                    <Grid.Column width={6}>
                        {campaignNotFunded ? (
                            <Message warning>
                                <Message.Header>The campaign has not met its funding goals.</Message.Header>
                                <p>The manager of the campaign can now return the remaining balance back to the contributors.</p>
                            </Message>
                        ) : (
                            <>
                                    <ContributeForm address={this.props.address} />
                                </>
                                 )}
                                {this.renderProgress()}
                                <Statistic.Group horizontal style={{ marginTop: 50, marginBottom: 50, textAlign: 'left' }}>
                            <Statistic>
                                <Statistic.Value>{Number(minimumBalance)}</Statistic.Value>
                                <Statistic.Label>Wei Needed for Campaign to Succeed</Statistic.Label>
                                    </Statistic>
                                    <Statistic>
                                        <Statistic.Value>{targetDeadlineTimestamp}</Statistic.Value>
                                        <Statistic.Label>Campaign Deadline</Statistic.Label>
                                    </Statistic>
                                </Statistic.Group>
                                <Link route={`/campaigns/${this.props.address}/requests`}>
                                    <a>
                                <Button color='green'>View Requests</Button>
                                    </a>
                        </Link>
                        {campaignNotFunded && !this.state.contributionReturned ? (
                            <ContributeReturnButton
                                address={this.props.address}
                                onContributionReturned={this.handleContributionReturned}
                            />
                        ) : (campaignNotFunded && this.state.contributionReturned) ? (
                            <Message success>
                                <Message.Header>The remaining campaign balance has been returned to the contributors.</Message.Header>
                            </Message>
                        ) : null}

                        {campaignFunded ? (
                        <Message success>
                                <Message.Header>The campaign has met its goal! The campaign will remaing open for further contributions and requests.</Message.Header>
                        </Message>
                        ) : null}
                           
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    };

};

export default CampaignShow;

