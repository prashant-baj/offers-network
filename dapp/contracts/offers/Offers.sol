// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;
import '../common/Common.sol';
import '../onboarding/Members.sol';



contract Offers is Common {

    address owner;    
    Members members;
    

    mapping(address => Offer[]) public memberOffers; // memberAddress and offers proposed by members
    address[] memberAddresses;   

    event offerProposed(        
        string message,
        Offer offer,
        SubventionShare[] subventionScheme
        );

    event offerAccepted(        
        string message,        
        Offer offer       
        );

      /*
    Subvention share is share in the overall benefit value.
     If 5% discount is offered, and the value of discount is 100, 
     and contributed by OEM, Intrument issuer like bank and merchant in the ratio of 
     60, 20, 20 then there will be three SubventionShare 
    */ 
    struct SubventionShare{       
        string memberType;
        uint percentShare;
    }

    //   modifier onlyMember() { // Modifier      
    //     require(
    //         members.members[msg.sender].memberAddress == msg.sender,
    //         "Only Members are allowed to perform the operation"
    //     );
    //     _;
    // }

    constructor(address _memberContract) public {
      owner = msg.sender;     
      members = Members(_memberContract);
   }

    function offerProposal(Offer memory _offer) public {   
        require (_offer.subventionScheme[0].length == _offer.subventionScheme[1].length);
        memberOffers[msg.sender].push(_offer);
        uint size = _offer.subventionScheme[0].length;
        SubventionShare[] memory subvention = new SubventionShare[](size);
        for (uint i = 0; i < _offer.subventionScheme[0].length; i++) {
          SubventionShare memory s;
          MemberType mtype = MemberType(_offer.subventionScheme[0][i]);
          s.memberType = getMemberTypeByValue(mtype);
          s.percentShare = _offer.subventionScheme[1][i];       
          subvention[i] = s;  
        }

        emit offerProposed("OfferProposal", _offer, subvention);
    
    }

    function getOffersByMember(address _memberAddress ) public returns (Offer[] memory){
        return memberOffers[_memberAddress];
    }

    function getOfferByMemberAndOfferId(address _memberAddress, string memory _offerId ) public returns (Offer memory){
        Offer[] memory offers = getOffersByMember(_memberAddress);
        Offer memory offer;
        for (uint i = 0; i < offers.length; i++) {
          Offer memory o = offers[i];  
          if (keccak256(abi.encodePacked(o.offerId)) == keccak256(abi.encodePacked(_offerId))){
            offer = o;
          }
          break;
      }
      return offer;
    }

    function acceptOffer(address _offerBy, string memory _offerId ) public returns (bool){
        //require onlyMember();
        bool success = false;
        //Offer storage offer = getOfferByMemberAndOfferId(_offerBy, _offerId);
        Offer[] storage offers = memberOffers[_offerBy];
               
        for (uint i = 0; i < offers.length; i++) {
          Offer storage o = offers[i];  
          
          if (keccak256(abi.encodePacked(o.offerId)) == keccak256(abi.encodePacked(_offerId))){
            bool exists = false;
            for (uint i = 0; i < o.acceptedBy.length; i++) {
                if (o.acceptedBy[i] == msg.sender){
                    exists = true;
                    emit offerAccepted("Re-attempt OfferAcceptance", o);
                }
            }
            if(exists == false){
                o.acceptedBy.push(msg.sender);
                emit offerAccepted("OfferAcceptance", o);
            }           
          }          
          break;
        }       
        //TODO - Acceptance can be a data strcture with more details around acceptance such as time stamp
        //address[] storage acceptedAddresses = offer.acceptedBy;
       
        success = true;
        return success;
    }

}