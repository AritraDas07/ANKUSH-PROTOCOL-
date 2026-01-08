// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@account-abstraction/contracts/interfaces/PackedUserOperation.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract AnkushValidator {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    struct SessionPolicy {
        address allowedVendor;
        uint256 valueLimit;
        uint48 validUntil;
    }

    // User (Owner) => AI Agent => Policy
    mapping(address => mapping(address => SessionPolicy)) public policies;

    function enableSession(address aiAgent, address vendor, uint256 limit, uint48 expiry) external {
        policies[msg.sender][aiAgent] = SessionPolicy(vendor, limit, expiry);
    }

    function validateUserOp(PackedUserOperation calldata userOp, bytes32 userOpHash) external view returns (uint256) {
        // 1. Recover the signer (Agent)
        address recoveredSigner = userOpHash.toEthSignedMessageHash().recover(userOp.signature);
        
        // 2. Get policy for this Agent calling on behalf of Sender (User)
        SessionPolicy memory policy = policies[userOp.sender][recoveredSigner];

        // 3. Logic: Check Time
        if (block.timestamp > policy.validUntil) {
            return 1; // SIG_VALIDATION_FAILED (Expired)
        }

        // 4. Logic: Parse CallData to Check Vendor & Value
        // Assumptions:
        // - calldata structure is `execute(address target, uint256 value, bytes data)`
        // - selector for execute is usually 0xb61d27f6 (or similar standard)
        // - For simplicity in this v0, we assume offset 4 is target, offset 36 is value.
        // NOTE: In production, use strict decoding for your specific Account implementation.
        
        if (userOp.callData.length >= 68) {
            address target;
            uint256 value;
            bytes calldata callData = userOp.callData;
            
            assembly {
                // skip selector (4 bytes)
                target := calldataload(add(callData.offset, 4))
                value := calldataload(add(callData.offset, 36))
            }

            // Check Vendor
            if (target != policy.allowedVendor) {
                return 1; // Invalid Vendor
            }

            // Check Value
            if (value > policy.valueLimit) {
                return 1; // Limit Exceeded
            }
        }

        // If checks pass
        return 0; // SIG_VALIDATION_SUCCESS
    }
}
