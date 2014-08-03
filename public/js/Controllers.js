angular.module('Controllers', []).controller('MainController', function($scope, $location) {

	$scope.$on('$locationChangeSuccess', function($scope) {
		var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas', { preload: preload, create: create, update: update });
		var printf;
		var kitties;
		var bullets;
		var player;
		var score = 1;
		var scoreboard;
		var frame = 0;
		var framer;
		var gameover;
		var loader;

		function preload () {

			game.load.onLoadStart.add(loadStart, this);
			game.load.onFileComplete.add(fileComplete, this);
			game.load.onLoadComplete.add(loadComplete, this);


			game.physics.startSystem(Phaser.Physics.ARCADE);
			game.load.crossOrigin = "anonymous"
			game.load.image('kitty0', randurl());
			game.load.image('kitty1', randurl());
			game.load.image('kitty2', randurl());
			game.load.image('kitty3', randurl());
			game.load.image('kitty4', randurl());
			game.load.image('kitty5', randurl());
			game.load.image('kitty6', randurl());
			game.load.image('kitty7', randurl());
			game.load.image('kitty8', randurl());
			game.load.image('kitty9', randurl());
			game.load.image('kitty10', randurl());
			game.load.image('kitty11', randurl());
			game.load.image('kitty12', randurl());
			game.load.image('kitty13', randurl());
			game.load.image('kitty14', randurl());
			game.load.image('kitty15', randurl());
			game.load.image('kitty16', randurl());
			game.load.image('kitty17', randurl());
			game.load.image('kitty18', randurl());
			game.load.image('kitty19', randurl());
			game.load.image('printf', 'printf.png');
			game.load.image('0', '0.png');
			game.load.image('1', '1.png');

		}

		function create () {


			kitties = game.add.group();
			bullets = game.add.group();

			player = game.add.sprite(game.world.centerX, 550, 'printf');
			player.anchor.setTo(0.5, 0.5);
			game.physics.enable(player, Phaser.Physics.ARCADE);
			var style = { font: "20px Courier New", fill: "#ffffff", align: "center" };
			scoreboard = game.add.text(800, 10, String(score), style);
			scoreboard.anchor.setTo(1,0)
			framer = game.add.text(0, 10, '0', style);
			framer.anchor.setTo(0,0)
			console.log(game.input)
			game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(restart, self);
		}

		function update () {
			frame++;
			if (frame%30 <= Math.round(frame/150)) {
				var kitty = kitties.create(random(0,800), -250, 'kitty' + Math.round(random(0,19.5)));
				game.physics.enable(kitty, Phaser.Physics.ARCADE);
				kitty.body.gravity.y = random(75,125);
				kitty.anchor.setTo(0.5, 0.5);
				kitty.checkWorldBounds = true;
				kitty.events.onOutOfBounds.add(boundary, this);
			}
			player.x = game.input.position.x;
			game.physics.arcade.overlap(bullets, kitties, collisionHandler, null, this);
			game.physics.arcade.overlap(player, kitties, collisionHandlerP, null, this);
			scoreboard.setText(String(score));
			framer.setText(String(frame))
			game.input.mouse.mouseDownCallback = shoot
			if (score <= 0) {
				game.paused = true;
				kitties.destroy(true, true);
				bullets.destroy(true, true);
				gameover = game.add.text(game.world.centerX, game.world.centerY, 'GAME OVER\nyou dieded:(\npress space to restart\nscore: ' + frame, { font: "35px Courier New", fill: "#ffffff", align: "center" });

				gameover.anchor.setTo(0.5,0.5)
				game.input.mouse.mouseDownCallback = undefined;
			}
		}

		function shoot () {
			var type = Math.round(random(0,1));
			var bullet = bullets.create(game.input.position.x, 540, String(type));
			game.physics.enable(bullet, Phaser.Physics.ARCADE);
			bullet.body.gravity.y = -random(200,250);
			bullet.anchor.setTo(0.5, 0.5);
		}

		function collisionHandler (bullet, kitty) {
			score++;
			bullet.kill();
			kitty.kill();
		}

		function collisionHandlerP (player, kitty) {
			score -= 5;
			kitty.kill();
		}

		function boundary (k) {
			if (k.position.y > 600) {
				k.kill();
				score--
			}
		}


		// And finally the method that handels the pause menu
		function restart(event){
			// Only act if paused
			if(game.paused){
				gameover.destroy();
				score = 1;
				frame = 0;
				game.paused = false;
			}
		}


		function loadStart() {

			loader = game.add.text(game.world.centerX, game.world.centerY, 'Click to start load', { fill: '#ffffff' });
			loader.anchor.setTo(0.5,0.5)

			loader.setText("Loading ...");

		}

		//	This callback is sent the following parameters:
		function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {

			loader.setText("Loading " + totalLoaded + "/" + totalFiles);

		}

		function loadComplete() {

			loader.destroy();

		}

		function random (low, high) {
			return Math.random() * (high - low) + low;
		}

		function randurl () {
			return 'image/' + Math.round(random(1,100)) + '/rand.jpg';
		}

	})
});