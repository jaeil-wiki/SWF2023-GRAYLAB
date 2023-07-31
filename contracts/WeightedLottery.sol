// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

library WeightedLottery {
    struct UsageLog {
        uint8 capacity;
        uint8 count;
        uint256[] logs;
    }

    function createUsageLog(
        uint8 capacity
    ) public pure returns (UsageLog memory) {
        return UsageLog(capacity, 0, new uint256[](capacity));
    }

    function appendLog(UsageLog storage self, uint256 log) public {
        self.logs[self.count] = log;
        self.count = (self.count + 1) % self.capacity;
    }

    /// @param targetRound 예약하려는 라운드
    /// @param cutoff temp
    function getUsageWeight(
        UsageLog storage self,
        uint256 targetRound,
        uint256 cutoff
    ) public view returns (uint256) {
        uint256 weight = 0;
        for (uint8 i = 0; i < self.capacity; i++) {
            require(self.logs[i] <= targetRound);
            uint256 w = targetRound - self.logs[i];
            weight += w > cutoff ? cutoff : w;
        }
        return weight;
    }

    struct LotteryPool {
        uint256[] ids;
        uint256[] weights;
    }

    function createLotteryPool() public pure returns (LotteryPool memory) {
        return LotteryPool(new uint256[](1), new uint256[](1));
    }

    function lotteryEnter(
        LotteryPool storage self,
        uint256 id,
        uint256 weight
    ) public {
        require(
            type(uint256).max - self.weights[self.weights.length - 1] >= weight
        );
        self.ids.push(id);
        self.weights.push(self.weights[self.weights.length - 1] + weight);
    }

    function lotteryCancel(LotteryPool storage self, uint256 id) public {
        for (uint256 i = 0; i < self.ids.length; i++) {
            if (self.ids[i] == id) {
                for (uint256 j = i; j < self.ids.length - 1; j++) {
                    self.ids[j] = self.ids[j + 1];
                    self.weights[j] =
                        self.weights[j + 1] -
                        self.weights[i] +
                        self.weights[i - 1];
                }
                return;
            }
        }
    }

    function lotteryTotalWeight(
        LotteryPool storage self
    ) public view returns (uint256) {
        return self.weights[self.weights.length - 1];
    }

    function lotteryDraw(
        LotteryPool storage self,
        uint256 random
    ) public view returns (uint256) {
        // Perform binary search
        uint256 left = 0;
        uint256 right = self.ids.length;
        while (right > left) {
            uint256 idx = (left + right) / 2;
            if (self.weights[idx] > random) {
                right = idx;
            } else {
                left = idx + 1;
            }
        }
        if (left >= self.ids.length) {
            return 0;
        } else {
            return self.ids[left];
        }
    }
}
