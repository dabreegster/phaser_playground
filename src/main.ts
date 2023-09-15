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
  }

  /*update(_time: number, delta: number) {
    if (!this.textbox) {
      return;
    }

    this.textbox.rotation += 0.005 * delta;
  }*/
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: MainScene,
};

new Game(config);
