// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {WeightedLottery} from "./WeightedLottery.sol";
import {DagotChiSBT} from "./DagotChiSBT.sol";

contract LotteryController {
    address _nft;

    mapping(bytes32 => address[]) participants;
    mapping(bytes32 => mapping(address => bool)) alreadyParticipated;
    mapping(bytes32 => mapping(address => uint256)) participantsIndex;
    mapping(uint256 => mapping(uint256 => address)) winners;

    event Enter(
        address indexed addr,
        uint256 indexed itemId,
        uint256 indexed round
    );

    bytes32 seed;

    constructor(address nft) {
        _nft = nft;
    }

    /// @notice poor-random
    function random(
        bytes32 key,
        uint256 itemId,
        uint256 round
    ) public returns (uint256) {
        bytes32 r = keccak256(
            abi.encodePacked(
                blockhash(block.number),
                participants[key],
                itemId,
                round,
                seed
            )
        );

        seed = r;

        return uint256(r);
    }

    function userIdToAddress(bytes32 userId) public pure returns (address) {
        return address(uint160(uint256(userId)));
    }

    /// @param itemId 예약 대상 아이템
    /// @param round 예약 시간 같은 예약 식별에 필요한 추가값
    /// @param userId 사용자 ID의 해시값
    function enter(uint256 itemId, uint256 round, bytes32 userId) public {
        address addr = userIdToAddress(userId);

        uint256 tokenId = DagotChiSBT(_nft).ownedOf(addr);
        if (tokenId == 0) {
            DagotChiSBT(_nft).mint(addr);
        }

        bytes32 key = keccak256(abi.encodePacked(itemId, round));
        require(
            alreadyParticipated[key][addr] == false,
            "already participated"
        );
        participants[key].push(addr);
        participantsIndex[key][addr] = participants[key].length - 1;
        alreadyParticipated[key][addr] = true;

        emit Enter(addr, itemId, round);
    }

    function draw(uint256 itemId, uint256 round) public {
        bytes32 key = keccak256(abi.encodePacked(itemId, round));
        uint256 r = random(key, itemId, round);

        // lotteryTotalWeight()
    }

    /// @param userId 사용자 ID의 해시값
    function cancel(uint256 itemId, uint256 round, bytes32 userId) public {
        address addr = userIdToAddress(userId);

        bytes32 key = keccak256(abi.encodePacked(itemId, round));
        require(alreadyParticipated[key][addr] == false, "not participated");

        uint256 targetIndex = participantsIndex[key][addr];
        uint256 lastIndex = participants[key].length - 1;

        participants[key][targetIndex] = participants[key][lastIndex];
        participants[key].pop();

        alreadyParticipated[key][addr] = false;
    }

    function winnerOf(
        uint256 itemId,
        uint256 round
    ) public view returns (address) {
        return winners[itemId][round];
    }
}
