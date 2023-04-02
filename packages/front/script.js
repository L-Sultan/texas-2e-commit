import { PokerTable } from "./tableScene.js";

window.onload = function () {
    let config = {
        // width: 1280,
        // height: 720,
        backgroundColor: 0x4488aa,
        // Sets game scaling
        scale: {
            // Fit to window
            mode: Phaser.Scale.FIT,
            // Center vertically and horizontally
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: PokerTable
    }

    let game = new Phaser.Game(config);

    window.focus();
}