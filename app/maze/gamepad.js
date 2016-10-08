class Gamepad {
    constructor() {
        console.log('gamepad');
		this.gamepads = {};
		this.__speed = 0;
		var haveEvents = 'ongamepadconnected' in window;
		console.log("gamepadevents: "+haveEvents);
		var _this = this;
		window.addEventListener("gamepadconnected", function(e) {
			console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
				e.gamepad.index, e.gamepad.id,
				e.gamepad.buttons.length, e.gamepad.axes.length);
			_this.gamepads[e.gamepad.index] = navigator.getGamepads()[e.gamepad.index];
		});
		
		window.addEventListener("gamepaddisconnected", function(e) {
		  console.log("Gamepad disconnected from index %d: %s",
			e.gamepad.index, e.gamepad.id);
			delete(_this.gamepads[e.gamepad.index]);
		});
		setInterval(this.log_gamepad_state.bind(this), 20);
		if (!haveEvents) {
		  setInterval(this.scangamepads.bind(this), 500);
		}
		Object.defineProperty (this, 'speed', {
            set (value) {
                this.__speed = value;
                if (value && this.speedListener) {
                    this.speedListener (this.__speed);
                }
            },
            get () { return this.__speed; }
        });
    }
	onSpeedUpdate (listener) {
        this.speedListener = listener;
    }
	
	
	log_gamepad_state(){
		var pad_num = 0;
		
		var state = "";
		for(var i in this.gamepads){
			
			var pad = this.gamepads[i];
			
			state = pad_num + ": Buttons: ";

			for(var j in pad.axes){
				var a = pad.axes[j].toFixed(4);
				if (j==1){
					this.speed = a;
				}
				
				state = state + " "+ j + ": "+ a;
			}
		
			for(var j in pad.buttons){
				var b = pad.buttons[j];
				var pressed = b == 1.0;
				if (typeof(b) == "object") {
					pressed = b.pressed;
				}
				state = state + " "+ j + ": "+ pressed;

			}
			pad_num++;
		}
		
		//console.log(state);

	}
	scangamepads() {
	  var gamepads = navigator.getGamepads();

	  for (var i = 0; i < gamepads.length; i++) {
		if (gamepads[i]) {

		this.gamepads[gamepads[i].index] = gamepads[i];

		}
	  }
	}
}

function create(){
	let gamepad = new Gamepad();
	
	return gamepad;
}
export default {create};