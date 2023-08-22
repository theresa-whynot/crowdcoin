import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';


class FAQs extends Component {
    render() {

        return (
            <Layout>
                <div>
                    <h2>Frequently Asked Questions</h2>
                    <h5>What is Decentralized Crowdfunding?</h5>
                    <p>Decentralized crowdfunding, often referred to as crowdfunding on the blockchain, allows people to raise funds for various projects without relying on centralized intermediaries. In this model, smart contracts facilitate the funding process and ensure transparency and trust among participants.</p>
                    <h5>How Does Decentralized Crowdfunding Work?</h5>
                    <p>In a decentralized crowdfunding campaign, project creators define their funding goals, campaign details, and minimum contributions. Contributors can send ether directly to the campaign's smart contract, and funds are held until the campaign's criteria are met or the deadline is reached.</p>
                    <h5>What Is a Smart Contract?</h5>
                    <p>A smart contract is a self-executing contract with the terms directly written into code. It automatically executes actions when predefined conditions are met. In decentralized crowdfunding, smart contracts handle fund management and distribution.</p>
                    <h5>Do I Need a Wallet to Use this Application?</h5>
                    <p>Yes! We advise downloading Metamask. Metamask is a cryptocurrency wallet and browser extension that enables users to interact with Ethereum-based decentralized applications (DApps) directly from their browser. You can download Metamask <a href="https://metamask.io/download/"> here! </a></p>
                    <h5>What is Wei?</h5>
                    <p>Wei is the smallest denomination of Ether, the cryptocurrency used on the Ethereum blockchain. It's similar to cents in dollars or pence in pounds, but for Ethereum. Ether is divisible into many smaller units, and Wei is the smallest of these units. When dealing with transactions and balances on the Ethereum network, you'll often encounter Wei values. Go <a href="https://eth-converter.com">here</a> for a simple Eth to Wei converter.</p>
                    <h5>How Do I Participate in a Campaign?</h5>
                    <p>To participate in a campaign, first browse campaigns that interest or inspire you. When you find the campaign(s) you wish to support, contribute the minimum contribution or more. Ensure your contribution meets the campaign's minimum requirement. When you do this, you can become an approver for the campaign's requests.</p>
                    <h5>What is a Campaign request?</h5>
                    <p>Requests are sub-tasks set by the manager to ultimately accomplish the greater goal of the campaign. Requests include details on how much of the campaign balance the manager plans to spend, where the money is going, and what the money is for. If you feel the request is reasonable, you can approve it - if you have met the minimum campaign contribution. Once a request receives over 50% approval from all contributors, the request can be finalized by the manager.</p>
                    <h5>What Happens If a Campaign Fails to Reach Its Goal?</h5>
                    <p>If a campaign does not reach its minimum funding goal within the set deadline, contributed funds in the remaining balance are returned to the contributors. If money has been already spent on finalized requests, contributors will only receive their allotted percentage of the balance. For instance, if Sally originally contributed 200 wei to a 1000 total wei campaign...and the manager has already spent 500 wei on requests, Sally will receive 100 wei back given the campaign fails.<br></br><br></br>
                        Remaining Balance = Total Campaign Balance - Spent Amount
                        <br></br><br></br>
                        Sally's Allotted Percentage = Sally's Contribution / Total Contribution
                        <br></br><br></br>
                        Sally's Return Amount = Remaining Balance * Sally's Allotted Percentage
                        <br></br><br></br>

                        Total Campaign Balance = 1000 wei<br></br><br></br>
                        Spent Amount = 500 wei<br></br><br></br>
                        Remaining Balance = Total Campaign Balance - Spent Amount = 1000 wei - 500 wei = 500 wei<br></br><br></br>
                        Sally's Contribution = 200 wei<br></br><br></br>
                        Sally's Allotted Percentage = Sally's Contribution / Total Campaign Balance = 200 wei / 1000 wei = 0.2 (20%)<br></br><br></br>
                        Sally's Return Amount = Remaining Balance * Sally's Allotted Percentage = 500 wei * 0.2 = 100 wei <br></br><br></br>

                        So, Sally would receive 100 wei back as her return amount.

                    </p>
                    <h5>What Happens If a Campaign Succeeds in Reaching Its Goal?</h5>
                    <p>If a campaign reaches its minimum funding goal within the set deadline, the campaign will remain open for further contributions and requests. Contributors will not receive any funds back.</p>

                    <br></br><br></br>
                </div>
            </Layout>
        );
    }
}

export default FAQs;
