// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;
import '../common/Common.sol';

contract Members is Common {
    address owner;
    
   
    
    mapping(address => Member) public members;
    address[] memberAddresses;

    event memberAdded(Member member);   

    modifier onlyOwner() { // Modifier
        require(
            msg.sender == owner,
            "Only NPCI can add members."
        );
        _;
    }

   constructor() public {
      owner = msg.sender;
   }

function addMember(Member memory _member) public onlyOwner returns(Member memory) {   
       
        require(validateMemberType(_member.memberType) == true);            
        members[_member.memberAddress] = _member;        
        memberAddresses.push(_member.memberAddress);
        emit memberAdded(members[_member.memberAddress]);
        return members[_member.memberAddress];
    }

function getMembers() public view returns (Member[] memory){
      Member[] memory allMembers = new Member[](memberAddresses.length);
      for (uint i = 0; i < memberAddresses.length; i++) {
          address ma = memberAddresses[i];  
          Member storage m = members[ma];
          allMembers[i] = m;
      }
      return allMembers;
}


}