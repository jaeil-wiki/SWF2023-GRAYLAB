// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

contract DaGotChiSBT {
    address private immutable TPB;
    error Soulbound();
    event Transfer(address indexed to, uint indexed id);
    string public constant symbol = "DGC";
    string public constant name = "DaGotChi SBT";
    mapping(address => uint) public ownedOf;
    uint internal nextTokenId = 1;
    mapping(uint => mapping(uint => uint)) bonuses;

    constructor(address TPB_) {
        TPB = TPB_;
    }

    modifier onlyTPB() {
        require(msg.sender == TPB, "only TPB");
        _;
    }

    function approve(address, uint) public virtual {
        revert Soulbound();
    }

    function isApprovedForAll(address, address) public pure {
        revert Soulbound();
    }

    function getApproved(uint) public pure {
        revert Soulbound();
    }

    function setApprovalForAll(address, bool) public virtual {
        revert Soulbound();
    }

    function transferFrom(address, address, uint) public virtual {
        revert Soulbound();
    }

    function safeTransferFrom(address, address, uint) public virtual {
        revert Soulbound();
    }

    function safeTransferFrom(
        address,
        address,
        uint,
        bytes calldata
    ) public virtual {
        revert Soulbound();
    }

    function supportsInterface(bytes4 interfaceId) public pure returns (bool) {
        return
            interfaceId == 0x01ffc9a7 || // ERC165 Interface ID for ERC165
            interfaceId == 0x80ac58cd || // ERC165 Interface ID for ERC721
            interfaceId == 0x5b5e139f; // ERC165 Interface ID for ERC721Metadata
    }

    function mint(address to) public onlyTPB {
        require(
            ownedOf[to] == 0,
            "You can only have one token associated to your soul"
        );
        ownedOf[to] = nextTokenId;
        emit Transfer(to, nextTokenId++);
    }

    function addBonus(address user, uint bookingId) external onlyTPB {
        uint tokenId = ownedOf[user];
        unchecked {
            bonuses[tokenId][bookingId]++;
        }
    }

    function resetBonus(address user, uint bookingId) external onlyTPB {
        uint tokenId = ownedOf[user];
        bonuses[tokenId][bookingId] = 0;
    }

    function getBonus(
        address user,
        uint bookingId
    ) external view onlyTPB returns (uint bonus) {
        uint tokenId = ownedOf[user];
        bonus = bonuses[tokenId][bookingId];
    }
}
