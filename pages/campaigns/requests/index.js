import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from'../../../components/RequestRow'



class RequestIndex extends Component {

    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const requestCountNumber = Number(requestCount);
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call()
            })
        );

        return {
            address,
            requests,
            requestCount,
            requestCountNumber,
            approversCount
        };
    }

    renderRows() {

        return this.props.requests.map((request, index) => {
            return <RequestRow
                key={index}
                id={index}
                request={request}
                address={this.props.address}
                approversCount={ this.props.approversCount }
            />;
        })
        
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;

        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}`}>
                    <a>Back</a>
                </Link>

                <h3>Requests</h3>

                        <Link route={`/campaigns/${this.props.address}/requests/new`}>
                             <a>
                        <Button color='green' floated="right" style={{marginBottom:10}}>Add Request</Button>
                            </a>
                        </Link>

                    <Table>
                    <Header>
                        <Row>

                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount (wei)</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                            <HeaderCell>Note</HeaderCell>
                        </Row>
                    </Header>

                    <Body>
                        {this.renderRows()}

                    </Body>
                    </Table>
                    
                <div>Found {this.props.requestCountNumber} request(s). </div>

            </Layout>
        );
    }
}

export default RequestIndex;
