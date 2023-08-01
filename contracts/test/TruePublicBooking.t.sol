// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Test, console2} from "forge-std/Test.sol";
import {TruePublicBooking} from "../src/TruePublicBooking.sol";
import {DaGotChiSBT} from "../src/DaGotChiSBT.sol";
import {Booking} from "../src/Booking.sol";

contract CounterTest is Test {
    TruePublicBooking public tpb;
    DaGotChiSBT public sbt;

    function setUp() public {
        tpb = new TruePublicBooking();
        sbt = tpb.sbt();
    }

    function test() public {
        address[] memory users = new address[](3);
        users[0] = address(0x1);
        users[1] = address(0x2);
        users[2] = address(0x3);
        uint[] memory secrets = new uint[](3);
        secrets[0] = 1;
        secrets[1] = 2;
        secrets[2] = 3;

        uint commitmentHash = uint256(
            keccak256(abi.encodePacked(uint256(0x1000000001)))
        );
        tpb.open(1, commitmentHash);

        for (uint idx; idx < users.length; idx++) {
            bytes32 userHash = keccak256(
                abi.encodePacked(users[idx], secrets[idx])
            );
            tpb.register(0, userHash);
        }

        tpb.close(0, users, secrets, 0x1000000001);

        Booking.Info memory info = tpb.getBook(0);
        console2.log(uint(info.entry.length));
    }
}
