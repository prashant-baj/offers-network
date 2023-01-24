// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

enum MemberType { Network, Merchant, Acquirer, CCIssuer, DCIssuer, UPIIssuer, PSP, OEM, PG, Aggregator, OfferAggregator, WalletProvider, Bank } // Enum
enum MemberStatus { Active, Inactive, Suspended} 
enum Instruments {CreditCard, DebitCard, UPI, EMI, BNPL, Points, Wallet, RBI_CBDC, NFT}
enum OfferTypes {FlatDiscount, PercentDiscount, FlatCashback, PercentCashback, Benefits}

contract Common{
    struct Member {
        string nodeName;         
        address memberAddress;
        string entityName;
        string privacyAddress;
        string memberType;          
        string memberStatus;                      
    }

   
   
    /*
    When any participant Member, accepts an Offer product, will submit OfferAcceptance in a signed transaction
    */
    struct OfferAcceptance{
        address acceptedBy;
        
        // address of the member who will settle on behalf of the acquring party
        // settlement party needs to be aware of the offer terms, subvention scheme
        address settlementBy;         
        uint timeStamp;        
    }

    struct Offer {         
        address proposerAddress; // address of Member
        string offerName;
        string offerId; // proposar's refernce Id
        string[] instruments; // any, upi, credit card etc
        string[] features;
        string[] termsnconditions;
        string offerType; // Flat-discount, Percent-Discount, Flat-cashback, percent-cashback, benefits
        uint startDate; 
        uint endDate;
        string offerStatus;
        uint maxOfferCount; // how many times this offer can be availed across users
        string couponCode;
        uint maxBenefitAmount;
        //address subventionScheme; // address of the subvention scheme contract
        // This is a work around for SubventionScheme struct.
        // First array is MemberType and second is percentage share in subvention amount.
        uint[][] subventionScheme; 
        string[] sku; // SKU of product
        uint minOrderValue;
        uint minQtyValue;         
        /*
         Member will send an Acceptance along with the settlement party address where applicable
         for example, when a Merchant sends an Acceptance, it can add its Acquring bank as 
        settlement party. Settlement party address can be optional if its not a Member yet.
        TODO for future
        */
        address[] acceptedBy;
                             
    }

    function getMemberTypeByValue(MemberType mt) internal pure returns (string memory) {
        
     // Error handling for input
     //require(uint8(mt) <= 4);
        
     // Loop through possible options
     if (MemberType.Network == mt) return "Network";
     if (MemberType.Merchant == mt) return "Merchant";
     if (MemberType.Acquirer == mt) return "Acquirer";
     if (MemberType.CCIssuer == mt) return "Credit Card Issuer";
     if (MemberType.DCIssuer == mt) return "Debit Card Issuer";
     if (MemberType.UPIIssuer == mt) return "UPI Issuer";
     if (MemberType.PSP == mt) return "Payment Service Provider";
     if (MemberType.OEM == mt) return "Manufacturer";
     if (MemberType.PG == mt) return "Payment Gateway";
     if (MemberType.Aggregator == mt) return "Aggregator";
     if (MemberType.OfferAggregator == mt) return "Offer Aggregator";
     
}

function validateMemberType (string memory _mt) internal pure returns (bool) {
        
        // keccak256() only accept bytes as arguments, so we need explicit conversion
        bytes memory mt = bytes(_mt);
        bytes32 Hash = keccak256(mt);
        
        // Loop to check
        if (Hash == keccak256("Network") 
            || Hash == keccak256("Merchant") 
            || Hash == keccak256("Acquirer")
            || Hash == keccak256("CCIssuer")
            || Hash == keccak256("DCIssuer")
            || Hash == keccak256("UPIIssuer")
            || Hash == keccak256("PSP")
            || Hash == keccak256("OEM")
            || Hash == keccak256("Aggregator")
            || Hash == keccak256("OfferAggregator")
            || Hash == keccak256("WalletProvider")
            || Hash == keccak256("Bank")
            || Hash == keccak256("PG"))  return true;
        else return false;
       
    }
}