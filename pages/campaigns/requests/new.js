import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import RequestForm from '../../../components/RequestForm';
import { Link } from '../../../routes';

class RequestPage extends Component {

    static async getInitialProps(props) {
        const { address } = props.query;
        return {
            address
        };
    }


    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>Back</a>
                </Link>
                <h3>Create a Request</h3>
                <RequestForm address={this.props.address} />
            </Layout>
        );
    }
}

export default RequestPage;

