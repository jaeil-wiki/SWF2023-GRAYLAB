// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

/// @title PrivateSoulMinter
/// @author Enrico Bottazzi
/// @notice Barebones contract to mint ZK SBT

contract DagotChiSBT {
    address immutable lottery;

    /// @notice Thrown when trying to transfer a Soulbound token
    error Soulbound();

    /// @notice Emitted when minting a ZK SBT
    /// @param from Who the token comes from. Will always be address(0)
    /// @param to The token recipient
    /// @param id The ID of the minted token
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed id
    );

    /// @notice The symbol for the token
    string public constant symbol = "DCH";

    /// @notice The name for the token
    string public constant name = "DagotChi SBT";

    /// @notice Get the owner of a certain tokenID
    mapping(address => uint256) public ownedOf;

    /// @dev Counter for the next tokenID, defaults to 1 for better gas on first mint
    uint256 internal nextTokenId = 1;

    constructor(address _lottery) {
        lottery = _lottery;
    }

    struct Winning {
        uint256 timestamp;
        uint256 round;
    }

    // TOKEN_ID => ITEM_ID
    mapping(uint256 => mapping(uint256 => Winning[])) winnings;

    modifier onlyLottery() {
        require(msg.sender == lottery, "only Lottery");
        _;
    }

    /// @notice This function was disabled to make the token Soulbound. Calling it will revert
    function approve(address, uint256) public virtual {
        revert Soulbound();
    }

    /// @notice This function was disabled to make the token Soulbound. Calling it will revert
    function isApprovedForAll(address, address) public pure {
        revert Soulbound();
    }

    /// @notice This function was disabled to make the token Soulbound. Calling it will revert
    function getApproved(uint256) public pure {
        revert Soulbound();
    }

    /// @notice This function was disabled to make the token Soulbound. Calling it will revert
    function setApprovalForAll(address, bool) public virtual {
        revert Soulbound();
    }

    /// @notice This function was disabled to make the token Soulbound. Calling it will revert
    function transferFrom(address, address, uint256) public virtual {
        revert Soulbound();
    }

    /// @notice This function was disabled to make the token Soulbound. Calling it will revert
    function safeTransferFrom(address, address, uint256) public virtual {
        revert Soulbound();
    }

    /// @notice This function was disabled to make the token Soulbound. Calling it will revert
    function safeTransferFrom(
        address,
        address,
        uint256,
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

    /// @notice Mint a new Soulbound NFT to `to`
    /// @param to The recipient of the NFT
    function mint(address to) public onlyLottery {
        require(
            ownedOf[to] == 0,
            "You can only have one token associated to your soul"
        );

        ownedOf[to] = nextTokenId;

        emit Transfer(address(0), to, nextTokenId++);
    }

    function addWinning(
        address winner,
        uint256 itemId,
        uint256 round,
        uint256 timestamp
    ) public onlyLottery {
        uint256 tokenId = ownedOf[winner];
        winnings[tokenId][itemId].push(Winning(timestamp, round));
    }

    function winningUntil(uint256 timestamp) public view returns (uint256) {}
}
