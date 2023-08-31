# CrowdCoin

CrowdCoin is a Decentralized Ethereum-Based Crowd Funding App.

## Getting Started

Follow these steps to set up and run CrowdCoin on your local machine:

### Prerequisites

Before you begin, ensure you have the following software installed on your computer:

- Node.js: [Download and install Node.JS](https://nodejs.org/)
- MetaMask: [Download and install MetaMask](https://metamask.io/download/) (Note that CrowdCoin can still operate in read-only mode without MetaMask. The application links to an Ethereum blockchain node endpoint when MetaMask is not in use)

### Installation

1. Download the project repository by either [downloading the zip file](https://github.com/theresa-whynot/crowdcoin/archive/main.zip) or using Git to [clone the repository](https://github.com/theresa-whynot/crowdcoin.git) (green "<>Code" button > Clone with HTTPS, SSH or GitHub CLI)
2. Navigate to the project directory in your terminal: **cd crowdcoin-main**
3. IMPORTANT!!! ENSURE TO INCLUDE '--legacy-peer-deps'. The next-routes package, and enrtire application, cannot successfully work without it.
   Install the project dependencies: **npm install --legacy-peer-deps**
   
### Running the App

1. After installing the dependencies, start the app: **npm run dev**
2. Open your web browser and go to: [http://localhost:3000](http://localhost:3000)

### Usage

Explore the CrowdCoin app and its features. Using Ether from your MetaMask wallet, you can create a new campaign, contribute to existing campaigns, and more!

## Contributing

If you'd like to contribute to this project, feel free to fork the repository, make your changes, and submit a pull request.

---

Happy crowdfunding with CrowdCoin!
