pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign (uint minimum, string campaignTitle, string campaignDescription, uint minimumBalance, uint targetDeadline) public {
        address newCampaign = new Campaign(msg.sender, minimum, campaignTitle, campaignDescription, minimumBalance, targetDeadline);
        require(minimumBalance >= minimum);
        require(now < targetDeadline);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }

}

contract Campaign {

    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping (address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    string public campaignTitle;
    string public campaignDescription;
    uint public minimumBalance;
    uint public targetDeadline;
    mapping (address => bool) public approvers;
    address [] public approversAddressList;
    mapping(address => uint) public contributions;
    Request[] public requests;
    uint public approversCount;
    uint public sumContribution;


    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    modifier activeCampaign() {
        require (now <= targetDeadline || sumContribution >= minimumBalance);
        _;
    }

    modifier inactiveCampaign() {
        require(now > targetDeadline && sumContribution < minimumBalance);
        _;
    }

    function Campaign (address creator, uint minimum, string memory title, string memory description, uint minBalance, uint deadline) public{
        manager = creator;
        minimumContribution = minimum;
        campaignTitle = title;
        campaignDescription = description;
        minimumBalance = minBalance;
        targetDeadline = deadline;
    }

    function contribute() public payable activeCampaign {
        require (msg.value >= minimumContribution);

        sumContribution = sumContribution + msg.value;

        contributions[msg.sender] += msg.value;

       if (!approvers[msg.sender]) {
        approvers[msg.sender] = true;
        approversCount++;
        approversAddressList.push(msg.sender);
        }
    }

    function createRequest(string description, uint value, address recipient) public restricted activeCampaign  {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public activeCampaign  {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(msg.sender != manager);
        require(msg.sender != request.recipient);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;

    }


    function finalizeRequest(uint index) public restricted activeCampaign  {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function contributionReturn() public restricted inactiveCampaign {
        for (uint i = 0; i < approversAddressList.length; i++) {
        address approverAddress = approversAddressList[i];
        uint approverContribution = contributions[approverAddress];
        uint approverPercentage = approverContribution / sumContribution;
        uint amountToReturnToApprover = this.balance * approverPercentage;

        approverAddress.transfer(amountToReturnToApprover);
        }
    }

    function getSummary() public view returns (uint, uint, uint, uint, address, uint, uint, uint) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager,
            sumContribution,
            minimumBalance,
            targetDeadline
            );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}

