import "./style.css";
import { Scene, Game, GameObjects } from "phaser";

class MainScene extends Scene {
  private textbox: GameObjects.Text | undefined;

  create() {
    this.textbox = this.add.text(
      window.innerWidth / 2,
      window.innerHeight / 2,
      "Hello",
      {
        color: "red",
        fontSize: "50px",
      },
    );

    this.textbox.setOrigin(0.5, 0.5);
  }

  update(_time: number, delta: number) {
    if (!this.textbox) {
      return;
    }

    this.textbox.rotation += 0.005 * delta;
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: MainScene,
};

new Game(config);
