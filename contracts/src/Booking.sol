// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

library Booking {
    struct Info {
        bool isOpen;
        uint data;
        uint commitmentHash;
        bytes32[] entry;
    }

    /// @param commitmentHash 랜덤에 사용할 seed 값을 keccak256으로 해시한 값
    function open(
        mapping(uint => Booking.Info) storage self,
        uint id,
        bool isOpen,
        uint data,
        uint commitmentHash
    ) internal {
        self[id] = Info({
            isOpen: isOpen,
            data: data,
            commitmentHash: commitmentHash,
            entry: new bytes32[](0)
        });
    }

    function close(
        mapping(uint => Booking.Info) storage self,
        uint id
    ) internal {
        self[id].isOpen = false;
    }

    function register(
        mapping(uint => Booking.Info) storage self,
        uint id,
        bytes32 userHash
    ) internal {
        self[id].entry.push(userHash);
    }

    function cancel(
        mapping(uint => Booking.Info) storage self,
        uint id,
        uint idx,
        bytes32 userHash
    ) internal {
        require(self[id].entry[idx] == userHash, "invalid user hash");
        uint lastIndex = self[id].entry.length - 1;
        self[id].entry[idx] = self[id].entry[lastIndex];
        self[id].entry.pop();
    }

    /// @param seed commitmentHash 계산에 사용된 값
    function draw(
        mapping(uint => Booking.Info) storage self,
        uint id,
        address[] memory users,
        uint[] memory bonuses,
        uint seed
    ) internal view returns (address user) {
        uint256 seedHash = uint256(keccak256(abi.encodePacked(seed)));
        require(
            seedHash == self[id].commitmentHash,
            "seed is not valid with commitmentHash"
        );
        uint256 rand = random(seed, users.length) % bonuses[bonuses.length - 1];
        uint256 left = 0;
        uint256 right = users.length;
        while (right > left) {
            uint idx = (left + right) / 2;
            if (bonuses[idx] > rand) right = idx;
            else left = idx + 1;
        }
        user = (left >= users.length) ? user = users[0] : user = users[left];
    }

    // Chainlink VRF로 업데이트 해야됨.
    function random(uint seed, uint help) private view returns (uint newSeed) {
        newSeed = uint(
            keccak256(abi.encodePacked(blockhash(block.number), seed, help))
        );
    }
}
