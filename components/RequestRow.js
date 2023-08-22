import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3'

class RequestRow extends Component {

    onApprove = async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();

        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        });
    };


    onFinalize = async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();

        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        });


    }


    render() {

        const { Row, Cell } = Table;
        const { id, request, approversCount } = this.props;

        const approvalCount = parseInt(request.approvalCount.toString());
        const totalCount = parseInt(approversCount.toString());
        const weiValue = parseInt(request.value.toString());

        const readyToFinalize = approvalCount > totalCount / 2;


        return (
            <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{weiValue}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{approvalCount}/{totalCount}</Cell>
                <Cell>
                    {request.complete ? null : (

                        <Button color="green" basic onClick={this.onApprove}>
                            Approve
                        </Button> 
                    )}
                </Cell>
                <Cell>
                    {request.complete || !readyToFinalize ? null : (
                        <Button color="teal" basic onClick={this.onFinalize}>
                            Finalize
                        </Button>
                    )}
                </Cell>
                {request.complete ? "The request is complete and has been transferred to the specified recipient." : null}
                {readyToFinalize && !request.complete ? "The request is ready for the manager to finalize." : null}
                {!readyToFinalize && !request.complete ? "The request cannot yet be finalized by the manager. It must meet over 50% approvals." : null}
                <Cell>

                </Cell>
            </Row>
        );
    }
}

export default RequestRow;
