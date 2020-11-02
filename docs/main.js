// Generated by Haxe 4.1.4
(function ($hx_exports, $global) { "use strict";
class NodeCursor {
	constructor(settings) {
		this.node_height = .0;
		this.node_width = .0;
		this.cursor_height = .0;
		this.cursor_width = .0;
		this.node_yp = .0;
		this.node_xp = .0;
		this.cursor_yp = .0;
		this.cursor_xp = .0;
		this.playing = false;
		this.options = { cursor : true, node : true, cursor_velocity : 1, node_velocity : 0.35, native_cursor : "default", element_to_hover : "disable", cursor_class_hover : "disable", node_class_hover : "disable", hide_mode : true, hide_timing : 3000};
		$global.console.log("new (" + Std.string(settings) + ")");
		if(settings != null) {
			this.options = settings;
		}
		$global.console.log(settings);
		if(this.options.cursor == true) {
			this.innerCursor = window.document.querySelector("#cursor");
		}
		if(this.options.node == true) {
			this.innerNode = window.document.querySelector("#node");
		}
		if(this.options.cursor == true) {
			this.cursor_width = this.innerCursor.offsetWidth / 2;
		}
		if(this.options.cursor == true) {
			this.cursor_height = this.innerCursor.offsetHeight / 2;
		}
		if(this.options.node == true) {
			this.node_width = this.innerNode.offsetHeight / 2;
		}
		if(this.options.node == true) {
			this.node_height = this.innerNode.offsetHeight / 2;
		}
		window.document.body.style.cursor = this.options.native_cursor;
		window.requestAnimationFrame($bind(this,this.render));
		this.init();
	}
	mouseStopped() {
		this.playing = false;
	}
	init() {
		this.initCursor();
	}
	render(id) {
		if(this.playing == true) {
			if(this.options.cursor == true) {
				this.innerCursor.classList.add("moving");
			}
			if(this.options.node == true) {
				this.innerNode.classList.add("moving");
			}
		} else {
			if(this.options.cursor == true) {
				this.innerCursor.classList.remove("moving");
			}
			if(this.options.node == true) {
				this.innerNode.classList.remove("moving");
			}
		}
		if(this.options.cursor == true) {
			this.innerCursor.style.transform = "translate3d(" + this.cursor_xp + "px," + this.cursor_yp + "px, 0)";
		}
		if(this.options.node == true) {
			this.innerNode.style.transform = "translate3d(" + this.node_xp + "px," + this.node_yp + "px, 0)";
		}
		let _gthis = this;
		if(this.options.element_to_hover != "disable") {
			let nodes = window.document.querySelectorAll(this.options.element_to_hover);
			if(this.options.node_class_hover != "disable") {
				let _g = 0;
				let _g1 = nodes.length;
				while(_g < _g1) {
					let node = nodes[_g++];
					node.addEventListener("mouseover",function() {
						if(_gthis.options.cursor == true) {
							_gthis.innerCursor.classList.add(_gthis.options.cursor_class_hover);
						}
						if(_gthis.options.node == true) {
							_gthis.innerNode.classList.add(_gthis.options.node_class_hover);
						}
					});
					node.addEventListener("mouseleave",function() {
						if(_gthis.options.cursor == true) {
							_gthis.innerCursor.classList.remove(_gthis.options.cursor_class_hover);
						}
						if(_gthis.options.node == true) {
							_gthis.innerNode.classList.remove(_gthis.options.node_class_hover);
						}
					});
				}
			}
		}
		this.request = window.requestAnimationFrame($bind(this,this.render));
	}
	initCursor() {
		let _gthis = this;
		window.document.addEventListener("mousemove",function(e) {
			_gthis.clientX = e.clientX;
			_gthis.clientY = e.clientY;
			_gthis.playing = true;
			if(_gthis.options.hide_mode == true) {
				_gthis.hide_cursor();
			}
			if(_gthis.options.cursor == true) {
				_gthis.cursor_xp += (_gthis.clientX - _gthis.cursor_width - _gthis.cursor_xp) * _gthis.options.cursor_velocity;
				_gthis.cursor_yp += (_gthis.clientY - _gthis.cursor_height - _gthis.cursor_yp) * _gthis.options.cursor_velocity;
			}
			if(_gthis.options.node == true) {
				_gthis.node_xp += (_gthis.clientX - _gthis.node_width - _gthis.node_xp) * _gthis.options.node_velocity;
				_gthis.node_yp += (_gthis.clientY - _gthis.node_height - _gthis.node_yp) * _gthis.options.node_velocity;
			}
		});
	}
	hide_cursor() {
		window.clearTimeout(this.timer);
		this.timer = window.setTimeout($bind(this,this.mouseStopped),this.options.hide_timing);
	}
	static main() {
		$global.console.log("Main");
	}
}
$hx_exports["NodeCursor"] = NodeCursor;
NodeCursor.__name__ = true;
Math.__name__ = true;
class Std {
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
}
Std.__name__ = true;
class haxe_iterators_ArrayIterator {
	constructor(array) {
		this.current = 0;
		this.array = array;
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return this.array[this.current++];
	}
}
haxe_iterators_ArrayIterator.__name__ = true;
class js_Boot {
	static __string_rec(o,s) {
		if(o == null) {
			return "null";
		}
		if(s.length >= 5) {
			return "<...>";
		}
		let t = typeof(o);
		if(t == "function" && (o.__name__ || o.__ename__)) {
			t = "object";
		}
		switch(t) {
		case "function":
			return "<function>";
		case "object":
			if(((o) instanceof Array)) {
				let str = "[";
				s += "\t";
				let _g = 0;
				let _g1 = o.length;
				while(_g < _g1) {
					let i = _g++;
					str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
				}
				str += "]";
				return str;
			}
			let tostr;
			try {
				tostr = o.toString;
			} catch( _g ) {
				return "???";
			}
			if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
				let s2 = o.toString();
				if(s2 != "[object Object]") {
					return s2;
				}
			}
			let str = "{\n";
			s += "\t";
			let hasp = o.hasOwnProperty != null;
			let k = null;
			for( k in o ) {
			if(hasp && !o.hasOwnProperty(k)) {
				continue;
			}
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
				continue;
			}
			if(str.length != 2) {
				str += ", \n";
			}
			str += s + k + " : " + js_Boot.__string_rec(o[k],s);
			}
			s = s.substring(1);
			str += "\n" + s + "}";
			return str;
		case "string":
			return o;
		default:
			return String(o);
		}
	}
}
js_Boot.__name__ = true;
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
String.__name__ = true;
Array.__name__ = true;
js_Boot.__toStr = ({ }).toString;
NodeCursor.main();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
