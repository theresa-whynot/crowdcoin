import React, { Component } from 'react';
import { Form, Button, Input, Message, TextArea } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';


class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        campaignTitle: '',
        campaignDescription: '',
        minimumBalance: '',
        targetDeadline:'',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });
        const { campaignTitle, campaignDescription, minimumContribution, minimumBalance, targetDeadline } = this.state;

        try {
            const accounts = await web3.eth.getAccounts();

            const [year, month, day] = targetDeadline.split('-');
            const targetDate = new Date(Number(year), Number(month) - 1, Number(day)); 
            targetDate.setUTCHours(4, 0, 0);
            const currentDate = new Date();


            if (targetDate < currentDate) {
                throw new Error('Please select a date in the future for the campaign deadline.');
            };

            const unixTimestamp = Math.floor(targetDate.getTime() / 1000);

            const minCont = Number(minimumContribution)
            const minBal = Number(minimumBalance)


            console.log(minCont, minBal);

            if (minBal < minCont) {
                throw new Error('Please ensure Minimum Contribution is less than or equal to the Minimum Balance');
            };


            await factory.methods
                .createCampaign(minimumContribution, campaignTitle, campaignDescription, minimumBalance, unixTimestamp)
                .send({
                    from: accounts[0]
                });



            Router.pushRoute('/');
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });

    };


    render() {
        return (
            <Layout>
                <h3> Create a Campaign</h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

                    <Form.Field>
                        <label>Campaign Title</label>
                        <Input
                            value={this.state.campaignTitle}
                            onChange={event =>
                                this.setState({ campaignTitle: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Campaign Description</label>
                        <TextArea
                            value={this.state.campaignDescription}
                            onChange={event =>
                                this.setState({ campaignDescription: event.target.value })}
                            style={{ height: "100px" }}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            label="wei"
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={event =>
                                this.setState({ minimumContribution: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Minimum Balance Needed for Campaign to Succeed</label>
                        <Input
                            label="wei"
                            labelPosition="right"
                            value={this.state.minimumBalance}
                            onChange={event =>
                                this.setState({ minimumBalance: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Deadline for the Campaign to Succeed (Minimum Balance to be met)</label>
                        <Input
                            type="date"
                            label="date"
                            labelPosition="right"
                            value={this.state.targetDeadline }
                            onChange={event =>
                                this.setState({ targetDeadline: event.target.value })}
                        />
                    </Form.Field>



                    <Message error header="Oops!!" content={this.state.errorMessage} />

                    <Button loading={this.state.loading} color = 'green'>Create!</Button>

                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;
