// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {Pixelate} from "../src/Pixelate.sol";

contract PixelateTest is Test {
    Pixelate public pixelate;
    address public alice = address(0x1);
    address public bob = address(0x2);

    function setUp() public {
        pixelate = new Pixelate();
    }

    function test_PlacePixel() public {
        vm.prank(alice);
        pixelate.placePixel(0, 0, 5);

        Pixelate.Pixel memory pixel = pixelate.getPixel(0, 0);
        assertEq(pixel.color, 5);
        assertEq(pixel.lastPlacer, alice);
    }

    function test_PlacePixel_EmitsEvent() public {
        vm.prank(alice);
        vm.expectEmit(true, true, false, true);
        emit Pixelate.PixelPlaced(0, 5, alice, block.timestamp);
        pixelate.placePixel(0, 0, 5);
    }

    function test_CooldownEnforced() public {
        vm.prank(alice);
        pixelate.placePixel(0, 0, 5);

        vm.prank(alice);
        vm.expectRevert(abi.encodeWithSelector(Pixelate.CooldownActive.selector, 60));
        pixelate.placePixel(1, 1, 3);
    }

    function test_CooldownExpires() public {
        vm.prank(alice);
        pixelate.placePixel(0, 0, 5);

        vm.warp(block.timestamp + 60);

        vm.prank(alice);
        pixelate.placePixel(1, 1, 3);

        Pixelate.Pixel memory pixel = pixelate.getPixel(1, 1);
        assertEq(pixel.color, 3);
    }

    function test_DifferentUsersNoCooldown() public {
        vm.prank(alice);
        pixelate.placePixel(0, 0, 5);

        vm.prank(bob);
        pixelate.placePixel(1, 1, 3);

        Pixelate.Pixel memory pixel = pixelate.getPixel(1, 1);
        assertEq(pixel.color, 3);
        assertEq(pixel.lastPlacer, bob);
    }

    function test_OverwritePixel() public {
        vm.prank(alice);
        pixelate.placePixel(5, 5, 1);

        vm.prank(bob);
        pixelate.placePixel(5, 5, 9);

        Pixelate.Pixel memory pixel = pixelate.getPixel(5, 5);
        assertEq(pixel.color, 9);
        assertEq(pixel.lastPlacer, bob);
    }

    function test_RevertOnInvalidX() public {
        vm.prank(alice);
        vm.expectRevert(abi.encodeWithSelector(Pixelate.XOutOfBounds.selector, 64, 64));
        pixelate.placePixel(64, 0, 1);
    }

    function test_RevertOnInvalidY() public {
        vm.prank(alice);
        vm.expectRevert(abi.encodeWithSelector(Pixelate.YOutOfBounds.selector, 64, 64));
        pixelate.placePixel(0, 64, 1);
    }

    function test_RevertOnInvalidColor() public {
        vm.prank(alice);
        vm.expectRevert(abi.encodeWithSelector(Pixelate.InvalidColor.selector, 16, 16));
        pixelate.placePixel(0, 0, 16);
    }

    function test_CanPlace() public {
        assertTrue(pixelate.canPlace(alice));

        vm.prank(alice);
        pixelate.placePixel(0, 0, 1);

        assertFalse(pixelate.canPlace(alice));

        vm.warp(block.timestamp + 60);
        assertTrue(pixelate.canPlace(alice));
    }
}
