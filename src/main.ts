import "./style.css";
import { Scene, Game, GameObjects } from "phaser";
import { getMapspaceBuildings } from "./geojson";

class MainScene extends Scene {
  private textbox: GameObjects.Text | undefined;

  async create() {
    let buildings = await getMapspaceBuildings();
    for (let polygon of buildings) {
      this.add.polygon(0, 0, polygon, "0x6666ff");
    }

    this.cursors = this.input.keyboard.createCursorKeys();
    this.zoom_in = this.input.keyboard.addKey("Q");
    this.zoom_out = this.input.keyboard.addKey("W");
  }

  update(_time: number, _delta: number) {
    if (!this.cursors || !this.zoom_in || !this.zoom_out) {
      return;
    }

    // https://github.com/photonstorm/phaser3-examples/blob/master/public/src/camera/follow%20zoom.js might be better
    if (this.cursors.left.isDown) {
      this.cameras.main.scrollX -= 5;
    } else if (this.cursors.right.isDown) {
      this.cameras.main.scrollX += 5;
    }

    if (this.cursors.up.isDown) {
      this.cameras.main.scrollY -= 5;
    } else if (this.cursors.down.isDown) {
      this.cameras.main.scrollY += 5;
    }

    if (this.zoom_in.isDown) {
      this.cameras.main.zoom += 0.1;
    }
    if (this.zoom_out.isDown) {
      this.cameras.main.zoom -= 0.1;
    }
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: MainScene,
};

new Game(config);
