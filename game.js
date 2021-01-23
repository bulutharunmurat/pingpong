(function () {
    var CSS = {
        arena: {
            width: 900,
            height: 600,
            background: '#62247B',
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: '999',
            transform: 'translate(-50%, -50%)'
        },
        ball: {
            width: 15,
            height: 15,
            position: 'absolute',
            top: 0,
            left: 350,
            borderRadius: 50,
            background: '#C6A62F'
        },
        line: {
            width: 0,
            height: 600,
            borderLeft: '2px dashed #C6A62F',
            position: 'absolute',
            top: 0,
            left: '50%'
        },
        stick: {
            width: 12,
            height: 85,
            position: 'absolute',
            background: '#C6A62F'
        },
        stick1: {
            left: 0,
            top: 257.5
        },
        stick2: {
            left: 888,
            top: 257.5
        },
        score: {
            color: "#ffffff",
            position: "absolute", 
        },
        score1: {
            left:400,
            top:100
        },
        score2: {
            left:500,
            top:100
        }
    };

    var CONSTS = {
    	gameSpeed: 12,
        score1: 0,
        score2: 0,
        stick1Speed: 7,
        stick2Speed: 7,
        ballTopSpeed: 10,
        ballLeftSpeed: 100
    };
    
    function start() {
        draw();
        setEvents();
        roll();
        loop();
    }

    function draw() {
        $('<div/>', {id: 'pong-game'}).css(CSS.arena).appendTo('body');
        $('<div/>', {id: 'pong-line'}).css(CSS.line).appendTo('#pong-game');
        $('<div/>', {id: 'pong-ball'}).css(CSS.ball).appendTo('#pong-game');
        $('<div/>', {id: 'stick-1'}).css($.extend(CSS.stick1, CSS.stick)).appendTo('#pong-game');
        $('<div/>', {id: 'stick-2'}).css($.extend(CSS.stick2, CSS.stick)).appendTo('#pong-game');
        $('<div/>', {id: 'score-1'}).css($.extend(CSS.score1, CSS.score)).appendTo('#pong-game');
        $('<div/>', {id: 'score-2'}).css($.extend(CSS.score2, CSS.score)).appendTo('#pong-game');
        $("#score-1")[0].innerHTML = CONSTS.score1; 
        $("#score-2")[0].innerHTML = CONSTS.score2;  
    }
    
    var controllerArray = [];
  
    function setEvents() {
      
        $(document).keydown(function (e) {
            if(!controllerArray.includes(e.keyCode)){
                controllerArray.push(e.keyCode);
            }
        });
        $(document).keyup(function (e) {
            if(controllerArray.includes(e.keyCode)){
                controllerArray.splice(controllerArray.indexOf(e.keyCode), 1);
            }
        })    
    }

    function loop() {
        window.pongLoop = setInterval(function () {
                        
            if (controllerArray.includes (87) && CSS.stick1.top > 0) {  
                //Key w and preventing racket to go outside of gameboard
                CSS.stick1.top -= CONSTS.stick1Speed;                                                       
                $('#stick-1').css("top",CSS.stick1.top); 
            } 
            if (controllerArray.includes (83) && CSS.stick1.top < CSS.arena.height - CSS.stick.height -CONSTS.stick1Speed ) {   
            //Key s and preventing racket to go outside of gameboard
                CSS.stick1.top += CONSTS.stick1Speed;
                $('#stick-1').css("top", (CSS.stick1.top + CONSTS.stick1Speed));                         
            }
            if (controllerArray.includes (38) && CSS.stick2.top -CONSTS.stick1Speed > 0) {                                      
            //Up Arrow and preventing racket to go outside of gameboard
                CSS.stick2.top -= CONSTS.stick1Speed;
                $('#stick-2').css("top", CSS.stick2.top - CONSTS.stick2Speed);                            
            }
            if (controllerArray.includes (40) && CSS.stick2.top < CSS.arena.height - CSS.stick.height ) {   
            //Down Arrow and preventing racket to go outside of gameboard
                CSS.stick2.top += CONSTS.stick1Speed;             
                $('#stick-2').css("top", CSS.stick2.top);                             
            }
           
            CSS.ball.top += CONSTS.ballTopSpeed;
            CSS.ball.left += CONSTS.ballLeftSpeed;

            if (CSS.ball.top <= 0 || CSS.ball.top >= CSS.arena.height - CSS.ball.height) {          
            //Upper and lower border crash check
                CONSTS.ballTopSpeed = CONSTS.ballTopSpeed * -1;                                     
                // changing ball direction
            }

            $('#pong-ball').css({top: CSS.ball.top,left: CSS.ball.left});

            if (CSS.ball.left <= CSS.stick.width 
                && CSS.ball.top > CSS.stick1.top 
                && CSS.ball.top < CSS.stick1.top + CSS.stick.height) {                                      
            //left stick crask control
            	CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1;
            }
            if (CSS.ball.left >= CSS.arena.width - CSS.ball.width - CSS.stick.width 
                && CSS.ball.top > CSS.stick2.top 
                && CSS.ball.top < CSS.stick2.top + CSS.stick.height) {   
            //rigth stick crash control
                CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1;
            }
 
            if ( CSS.ball.left + CSS.ball.width > CSS.arena.width ) {
                CONSTS.score1++;
                $("#score-1")[0].innerHTML = (CONSTS.score1);
                if (CONSTS.score1 >= 5){
                    alert(`Stick 1 Win!
Press "OK" to restart the Game.`);
                    restartGame();               
                }
                roll();
            }
 
            if ( CSS.ball.left <= 0 ) { 
                CONSTS.score2++;
                $("#score-2")[0].innerHTML = (CONSTS.score2);
                if (CONSTS.score2 >= 5){
                    alert(`Stick 2 Win!
Press "OK" to restart the Game.`);
                    restartGame(); 
                }
                roll();
            }

        }, CONSTS.gameSpeed);
    }

    function roll() {
        CSS.ball.top = 250;
        CSS.ball.left = 350;
        
        var side = -1;

        if (Math.random() < 0.5) {
            side = 1;
        }

        CONSTS.ballTopSpeed = Math.random() * -2 - 3;
        CONSTS.ballLeftSpeed = side * (Math.random() * 2 + 3);
    }

    function restartGame(){
        CONSTS.score2 = 0;
        CONSTS.score1 = 0;
        clearInterval(pongLoop);
        $("#pong-game").remove();
        start();
    }

    start();
    
})();