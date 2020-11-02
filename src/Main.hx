package;

import js.html.DivElement;
import js.Browser.*;

@:native('NodeCursor')
@:expose
class Main {
	/**
		cursor : true, // enable cursor
		node : true, // enable node
		cursor_velocity : 1, // cursor velocity : 1 = default w1 = slower, >1 = faster
		node_velocity : 0.35, // cursor velocity : 1 = default w1 = slower, >1 = faster
		native_cursor : 'none', // default,  grab, pointer ( all cursor's css properties)
		element_to_hover : '.nodeHover', // // element that will trigger cursor anime on hover :  'disable', or any element : 'a', '.class', '#id'
		cursor_class_hover : 'disable', // 'disable', or any class name (without dot) - ex : expand, reduce relative to your css
		node_class_hover : 'expand', // 'disable', or any class name  (without dot) - ex : expand, reduce relative to your css
		hide_mode : true, // hide node and cursor if inactive
		hide_timing : 2000, // hide timing if inactive
	 */
	var options:Options = {
		cursor: true,
		node: true,
		cursor_velocity: 1,
		node_velocity: 0.35,
		native_cursor: 'default',
		element_to_hover: 'disable', // .nodeHover
		cursor_class_hover: 'disable',
		node_class_hover: 'disable',
		hide_mode: true,
		hide_timing: 3000,
	};

	// variables
	var innerCursor:DivElement;
	var innerNode:DivElement;
	var playing:Bool = false;
	var clientX:Float;
	var clientY:Float;
	var timer:Int;
	var request:Dynamic;

	var cursor_xp = .0;
	var cursor_yp = .0;
	var node_xp = .0;
	var node_yp = .0;
	var cursor_width = .0;
	var cursor_height = .0;
	var node_width = .0;
	var node_height = .0;

	public function new(?settings:Options) {
		console.log('new (${settings})');

		if (settings != null)
			options = settings;

		console.log(settings);

		// select elements
		(options.cursor == true) ? innerCursor = cast document.querySelector("#cursor") : null;
		(options.node == true) ? innerNode = cast document.querySelector("#node") : null;

		// if cursor enable > get size
		(options.cursor == true) ? cursor_width = innerCursor.offsetWidth / 2 : null;
		(options.cursor == true) ? cursor_height = innerCursor.offsetHeight / 2 : null;

		// if node enable > get size
		(options.node == true) ? node_width = innerNode.offsetHeight / 2 : null;
		(options.node == true) ? node_height = innerNode.offsetHeight / 2 : null;

		// enable native cursor option
		document.body.style.cursor = options.native_cursor;

		window.requestAnimationFrame(this.render);

		this.init();
	}

	function mouseStopped() {
		playing = false;
	};

	function init() {
		this.initCursor();
	};

	function render(?id:Float):Void {
		if ((playing == true)) {
			// add class moving = show cursor / node
			(options.cursor == true) ? innerCursor.classList.add("moving") : null;
			(options.node == true) ? innerNode.classList.add("moving") : null;
		} else {
			(options.cursor == true) ? innerCursor.classList.remove("moving") : null;
			(options.node == true) ? innerNode.classList.remove("moving") : null;
			// stop the animation
			// cancelAnimationFrame(request);
		}
		// if cursor enable
		if (options.cursor == true) {
			// animate
			innerCursor.style.transform = 'translate3d(' + cursor_xp + 'px,' + cursor_yp + 'px, 0)';
		}
		//  if node enable
		if (options.node == true) {
			// animate
			innerNode.style.transform = 'translate3d(' + node_xp + 'px,' + node_yp + 'px, 0)';
		}
		// if hovering is not disable = element class is set
		if (options.element_to_hover != 'disable') {
			var nodes = document.querySelectorAll(options.element_to_hover);

			// node effect on hover
			if (options.node_class_hover != 'disable') {
				for (i in 0...nodes.length) {
					var node = nodes[i];
					// on mouse over set custom class
					node.addEventListener('mouseover', function hover() {
						(options.cursor == true) ? innerCursor.classList.add(options.cursor_class_hover) : null;
						(options.node == true) ? innerNode.classList.add(options.node_class_hover) : null;
					});
					// on mouse leave remove custom class
					node.addEventListener('mouseleave', function leave() {
						(options.cursor == true) ? innerCursor.classList.remove(options.cursor_class_hover) : null;
						(options.node == true) ? innerNode.classList.remove(options.node_class_hover) : null;
					});
				}
			}
		}
		request = window.requestAnimationFrame(this.render);
	};

	function initCursor() {
		// add listener to track the current mouse position
		document.addEventListener("mousemove", (e) -> {
			clientX = e.clientX;
			clientY = e.clientY;
			playing = true;
			options.hide_mode == true ? hide_cursor() : null;
			if (options.cursor == true) {
				cursor_xp += ((clientX - cursor_width) - cursor_xp) * options.cursor_velocity;
				cursor_yp += ((clientY - cursor_height) - cursor_yp) * options.cursor_velocity;
			}
			if (options.node == true) {
				node_xp += ((clientX - node_width) - node_xp) * options.node_velocity;
				node_yp += ((clientY - node_height) - node_yp) * options.node_velocity;
			}
		});
	};

	function hide_cursor() {
		window.clearTimeout(timer);
		timer = window.setTimeout(this.mouseStopped, options.hide_timing);
	}

	static public function main() {
		console.log('Main');
		// var app = new Main();
	}
}

typedef Options = {
	// var _id:String;
	@:optional var cursor:Bool; // = true;
	@:optional var node:Bool; // = true;
	@:optional var cursor_velocity:Float; // = 1;
	@:optional var node_velocity:Float; // = 0.35;
	@:optional var native_cursor:String; // = 'default';
	@:optional var element_to_hover:String; // = 'disable';
	@:optional var cursor_class_hover:String; // = 'disable';
	@:optional var node_class_hover:String; // = 'disable';
	@:optional var hide_mode:Bool; // = true;
	@:optional var hide_timing:Int; // = 3000;
}
