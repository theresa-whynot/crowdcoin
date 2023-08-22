import React, { Component } from 'react';
import { Form, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

class ContributeReturnButton extends Component {
    state = {
        errorMessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();

            await campaign.methods
                .contributionReturn()
                .send({
                    from: accounts[0],
                });

            this.props.onContributionReturned();

        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false, value: '' });

    };


    render() {
        return (
            <div style={{ marginTop: '25px' }}>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Button loading={this.state.loading} color='green'>
                        Return Contributions to Contributors
                    </Button>
                    <Message error header="Oops!!" content={this.state.errorMessage} />

                </Form>
             </div>
        )
    }
}

export default ContributeReturnButton;

