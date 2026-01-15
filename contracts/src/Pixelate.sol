// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Pixelate {
    uint256 public constant WIDTH = 64;
    uint256 public constant HEIGHT = 64;
    uint256 public constant COOLDOWN = 60 seconds;
    uint8 public constant PALETTE_SIZE = 16;

    struct Pixel {
        uint8 color;
        address lastPlacer;
        uint40 lastPlacedAt;
    }

    mapping(uint256 => Pixel) public pixels;
    mapping(address => uint256) public lastActionTime;

    error XOutOfBounds(uint256 x, uint256 max);
    error YOutOfBounds(uint256 y, uint256 max);
    error InvalidColor(uint8 color, uint8 maxColors);
    error CooldownActive(uint256 remainingSeconds);

    event PixelPlaced(
        uint256 indexed pixelId,
        uint8 color,
        address indexed placer,
        uint256 timestamp
    );

    function placePixel(uint256 x, uint256 y, uint8 color) external {
        if (x >= WIDTH) revert XOutOfBounds(x, WIDTH);
        if (y >= HEIGHT) revert YOutOfBounds(y, HEIGHT);
        if (color >= PALETTE_SIZE) revert InvalidColor(color, PALETTE_SIZE);

        uint256 lastAction = lastActionTime[msg.sender];
        if (lastAction != 0 && block.timestamp < lastAction + COOLDOWN) {
            revert CooldownActive(lastAction + COOLDOWN - block.timestamp);
        }

        uint256 pixelId = y * WIDTH + x;

        pixels[pixelId] = Pixel({
            color: color,
            lastPlacer: msg.sender,
            lastPlacedAt: uint40(block.timestamp)
        });

        lastActionTime[msg.sender] = block.timestamp;

        emit PixelPlaced(pixelId, color, msg.sender, block.timestamp);
    }

    function getPixel(uint256 x, uint256 y) external view returns (Pixel memory) {
        return pixels[y * WIDTH + x];
    }

    function canPlace(address user) external view returns (bool) {
        uint256 lastAction = lastActionTime[user];
        return lastAction == 0 || block.timestamp >= lastAction + COOLDOWN;
    }
}
