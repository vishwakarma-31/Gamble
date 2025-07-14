// import AnimatedSprite from "../../components/animatedSprite/AnimatedSprite";
import Sprite from "../../components/sprite/Sprite";
import Container from "../../components/Container";
import IDarkScreenConfig from "../interface/IDarkScreenConfig";

export default class DarkScreenView {
    config: IDarkScreenConfig
    sprite: Sprite 
  constructor(config: IDarkScreenConfig, scene: Container) {//@ts-ignorets
    this.scene = scene
    this.config = config
    this.sprite = this.createSprite()
  }

  private createSprite(): Sprite {
    const spriteConfig = this.config.view.sprite;
    const sprite = new Sprite(spriteConfig);
    //@ts-ignore
    this.scene.addChild(sprite);
    return sprite;
  }
  

}