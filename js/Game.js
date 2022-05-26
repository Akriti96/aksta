class Game {
  constructor() { }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  // gameState =0
  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
    fuels = new Group()
    powerCoins = new Group()

    // fules
    this.addSprites(fuels,30,fuelImage,0.02)
    
    // powerCoins
    this.addSprites(powerCoins,40,powerCoinImage, 0.09)

  }



  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  // gameState =1
  play() {
    this.handleElements();

    Player.getPlayersInfo();
    // !== undefined  means cars varibels is defined and cars are created

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      // index of the player
      var index = 0

      // i is indiviual players in allplayers variable
      for (var i in allPlayers) {
      
        // index 1=car1     index 2= car2

        // /use data form the database to display the cars in x and y direction
        var x = allPlayers[i].positionX;
        var y = height - allPlayers[i].positionY;

        index = index + 1
        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        //  adding circle to identify the which car is active in cuurent window
        if (index === player.index) {
          stroke("blue")
          fill("red")
          ellipse(x, y, 80, 80)
          //change the camera position
          camera.position.x = cars[index - 1].position.x
          camera.position.y = cars[index - 1].position.y

        }
      }
      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10
        player.update()
      }


      drawSprites();
      this.handlePlayerControls()
    }

  }

  addSprites(spriteGroup,nuumberOfSprites, spritImage, scale){
    for(var i=0; i<nuumberOfSprites; i+=1){
      var x,y
      x= random(width/2-150, width/2+150)
      y= random(-height*5,height-400)
      var sprite= createSprite(x,y)
      sprite.addImage(spritImage)

      sprite.scale=scale
      spriteGroup.add(sprite)
    }
  }


  handlePlayerControls(){
    if(keyIsDown(UP_ARROW)){
      player.positionY+=10
      player.update()
    }


    if(keyIsDown(LEFT_ARROW)){
     player.positionX-=10
     player.update()
    }

    if(keyIsDown(RIGHT_ARROW)){
      player.positionX+=10
      player.update()
    }

  }
}
