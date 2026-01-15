// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {Pixelate} from "../src/Pixelate.sol";

contract PixelateScript is Script {
    function run() public {
        vm.startBroadcast();
        Pixelate pixelate = new Pixelate();
        console.log("Pixelate deployed at:", address(pixelate));
        vm.stopBroadcast();
    }
}

