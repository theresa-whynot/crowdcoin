import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class RequestForm extends Component {
    state = {
        description: '',
        value: '',
        recipient: '',
        errorMessage: '',
        loading: false
    }


    onSubmit = async (event) => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);
        const { description, value, recipient } = this.state;
        this.setState({ loading: true, errorMessage: '' });


        try {
            const accounts = await web3.eth.getAccounts();

            await campaign.methods
                .createRequest(description, value, recipient)
                .send({
                    from: accounts[0],
                });

            Router.pushRoute(`/campaigns/${this.props.address}/requests`);

        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false, value: '' });

    };


    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

                <Form.Field>
                    <label>Request Description</label>
                    <Input
                        value={this.state.description}
                        onChange={event => this.setState({ description: event.target.value })}
                        labelPosition="right"
                    />
                </Form.Field>

                <Form.Field>
                    <label>Amount of Wei Requested</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })}
                        labelPosition="right"
                        label="wei"
                    />
                </Form.Field>

                <Form.Field>
                    <label>Address of Recipeient</label>
                    <Input
                        value={this.state.recipient}
                        onChange={event => this.setState({ recipient: event.target.value })}
                        labelPosition="right"
                    />
                </Form.Field>

                <Message error header="Oops!!" content={this.state.errorMessage} />

                <Button loading={this.state.loading} color='green'>Submit Request</Button>


            </Form>
        )
    }
}

export default RequestForm;

