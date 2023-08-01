// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {DaGotChiSBT} from "./DaGotChiSBT.sol";
import {Booking} from "./Booking.sol";

contract TruePublicBooking {
    using Booking for mapping(uint => Booking.Info);

    DaGotChiSBT public sbt;
    uint public bookingCnt;
    mapping(address => bool) owners;
    mapping(uint => Booking.Info) public bookings;

    constructor() {
        owners[msg.sender] = true;
        sbt = new DaGotChiSBT(address(this));
    }

    modifier onlyOwner() {
        require(owners[msg.sender], "onlyOwner!");
        _;
    }

    function open(uint data, uint commitmentHash) external onlyOwner {
        bookings.open(bookingCnt++, true, data, commitmentHash);
    }

    function update(
        uint id,
        uint data,
        uint commitmentHash
    ) external onlyOwner {
        bool isOpen = bookings[id].isOpen;
        bookings.open(id, isOpen, data, commitmentHash);
    }

    function close(
        uint id,
        address[] memory users,
        uint[] memory reveals,
        uint seed
    ) external onlyOwner {
        uint[] memory bonuses = new uint[](users.length);
        Booking.Info memory info = bookings[id];
        for (uint idx; idx < users.length; idx++) {
            address user = users[idx];
            bytes32 tempHash = keccak256(abi.encodePacked(user, reveals[idx]));
            require(tempHash == info.entry[idx], "invalid user hash");
            uint tokenId = sbt.ownedOf(user);
            if (tokenId == 0) {
                sbt.mint(user);
                bonuses[idx] = 1;
            } else {
                bonuses[idx] = sbt.getBonus(user, id) + 1;
            }
        }
        bonuses = cumulativeSum(bonuses);
        address winner = bookings.draw(id, users, bonuses, seed);
        for (uint idx; idx < users.length; idx++) {
            address user = users[idx];
            if (user == winner) sbt.resetBonus(user, id);
            else sbt.addBonus(user, id);
        }
        bookings.close(id);
    }

    function register(uint id, bytes32 userHash) external onlyOwner {
        bookings.register(id, userHash);
    }

    function cancel(uint id, uint idx, bytes32 userHash) external onlyOwner {
        bookings.cancel(id, idx, userHash);
    }

    function getBook(uint id) external view returns (Booking.Info memory info) {
        info = bookings[id];
    }

    function cumulativeSum(
        uint[] memory bonuses
    ) private pure returns (uint[] memory newBonuses) {
        newBonuses = new uint[](bonuses.length);
        newBonuses[0] = bonuses[0];
        for (uint i = 1; i < bonuses.length; i++)
            newBonuses[i] = newBonuses[i - 1] + bonuses[i];
    }
}
