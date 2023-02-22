/*
 Highcharts Gantt JS v10.3.2 (2022-11-29)

 (c) 2017-2021 Lars Cabrera, Torstein Honsi, Jon Arild Nygard & Oystein Moseng

 License: www.highcharts.com/license
*/
(function(X, I) {
	"object" === typeof module && module.exports ? (I["default"] = I, module.exports = X.document ? I(X) : I) :
		"function" === typeof define && define.amd ? define("highcharts/highcharts-gantt", function() {
			return I(X)
		}) : (X.Highcharts && X.Highcharts.error(16, !0), X.Highcharts = I(X))
})("undefined" !== typeof window ? window : this, function(X) {
	function I(d, g, z, B) {
		d.hasOwnProperty(g) || (d[g] = B.apply(null, z), "function" === typeof CustomEvent && X.dispatchEvent(
			new CustomEvent("HighchartsModuleLoaded", {
				detail: {
					path: g,
					module: d[g]
				}
			})))
	}
	var g = {};
	I(g, "Core/Globals.js", [], function() {
		var d;
		(function(d) {
			d.SVG_NS = "http://www.w3.org/2000/svg";
			d.product = "Highcharts";
			d.version = "10.3.2";
			d.win = "undefined" !== typeof X ? X : {};
			d.doc = d.win.document;
			d.svg = d.doc && d.doc.createElementNS && !!d.doc.createElementNS(d.SVG_NS, "svg")
				.createSVGRect;
			d.userAgent = d.win.navigator && d.win.navigator.userAgent || "";
			d.isChrome = -1 !== d.userAgent.indexOf("Chrome");
			d.isFirefox = -1 !== d.userAgent.indexOf("Firefox");
			d.isMS = /(edge|msie|trident)/i.test(d.userAgent) && !d.win.opera;
			d.isSafari = !d.isChrome && -1 !== d.userAgent.indexOf("Safari");
			d.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(d.userAgent);
			d.isWebKit = -1 !== d.userAgent.indexOf("AppleWebKit");
			d.deg2rad = 2 * Math.PI / 360;
			d.hasBidiBug = d.isFirefox && 4 > parseInt(d.userAgent.split("Firefox/")[1], 10);
			d.hasTouch = !!d.win.TouchEvent;
			d.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"];
			d.noop = function() {};
			d.supportsPassiveEvents = function() {
				var g = !1;
				if (!d.isMS) {
					var M = Object.defineProperty({}, "passive", {
						get: function() {
							g = !0
						}
					});
					d.win.addEventListener && d.win.removeEventListener && (d.win.addEventListener(
						"testPassive", d.noop, M), d.win.removeEventListener("testPassive",
						d.noop, M))
				}
				return g
			}();
			d.charts = [];
			d.dateFormats = {};
			d.seriesTypes = {};
			d.symbolSizes = {};
			d.chartCount = 0
		})(d || (d = {}));
		"";
		return d
	});
	I(g, "Core/Utilities.js", [g["Core/Globals.js"]], function(d) {
		function g(k, a, b, e) {
			var v = a ? "Highcharts error" : "Highcharts warning";
			32 === k && (k = "" + v + ": Deprecated member");
			var J = r(k),
				n = J ? "" + v + " #" + k + ": www.highcharts.com/errors/" + k + "/" :
				k.toString();
			if ("undefined" !== typeof e) {
				var F = "";
				J && (n += "?");
				H(e, function(k, a) {
					F += "\n - ".concat(a, ": ").concat(k);
					J && (n += encodeURI(a) + "=" + encodeURI(k))
				});
				n += F
			}
			w(d, "displayError", {
				chart: b,
				code: k,
				message: n,
				params: e
			}, function() {
				if (a) throw Error(n);
				m.console && -1 === g.messages.indexOf(n) && console.warn(n)
			});
			g.messages.push(n)
		}

		function z(k, a) {
			var b = {};
			H(k, function(v, e) {
				if (A(k[e], !0) && !k.nodeType && a[e]) v = z(k[e], a[e]), Object.keys(v).length &&
					(b[e] = v);
				else if (A(k[e]) || k[e] !== a[e] || e in k && !(e in a)) b[e] = k[e]
			});
			return b
		}

		function B(k, a) {
			return parseInt(k, a || 10)
		}

		function y(k) {
			return "string" === typeof k
		}

		function C(k) {
			k = Object.prototype.toString.call(k);
			return "[object Array]" === k || "[object Array Iterator]" === k
		}

		function A(k, a) {
			return !!k && "object" === typeof k && (!a || !C(k))
		}

		function x(k) {
			return A(k) && "number" === typeof k.nodeType
		}

		function t(k) {
			var a = k && k.constructor;
			return !(!A(k, !0) || x(k) || !a || !a.name || "Object" === a.name)
		}

		function r(k) {
			return "number" === typeof k && !isNaN(k) && Infinity > k && -Infinity < k
		}

		function h(k) {
			return "undefined" !==
				typeof k && null !== k
		}

		function l(k, a, b) {
			var v = y(a) && !h(b),
				e, m = function(a, b) {
					h(a) ? k.setAttribute(b, a) : v ? (e = k.getAttribute(b)) || "class" !== b || (e = k
						.getAttribute(b + "Name")) : k.removeAttribute(b)
				};
			y(a) ? m(b, a) : H(a, m);
			return e
		}

		function q(k, a) {
			var b;
			k || (k = {});
			for (b in a) k[b] = a[b];
			return k
		}

		function p() {
			for (var k = arguments, a = k.length, b = 0; b < a; b++) {
				var e = k[b];
				if ("undefined" !== typeof e && null !== e) return e
			}
		}

		function f(k, a) {
			d.isMS && !d.svg && a && h(a.opacity) && (a.filter = "alpha(opacity=".concat(100 * a.opacity,
				")"));
			q(k.style,
				a)
		}

		function c(k) {
			return Math.pow(10, Math.floor(Math.log(k) / Math.LN10))
		}

		function D(k, a) {
			return 1E14 < k ? k : parseFloat(k.toPrecision(a || 14))
		}

		function G(k, a, b) {
			var e = d.getStyle || G;
			if ("width" === a) return a = Math.min(k.offsetWidth, k.scrollWidth), b = k
				.getBoundingClientRect && k.getBoundingClientRect().width, b < a && b >= a - 1 && (a =
					Math.floor(b)), Math.max(0, a - (e(k, "padding-left", !0) || 0) - (e(k,
					"padding-right", !0) || 0));
			if ("height" === a) return Math.max(0, Math.min(k.offsetHeight, k.scrollHeight) - (e(k,
				"padding-top", !0) || 0) - (e(k,
				"padding-bottom", !0) || 0));
			m.getComputedStyle || g(27, !0);
			if (k = m.getComputedStyle(k, void 0)) {
				var v = k.getPropertyValue(a);
				p(b, "opacity" !== a) && (v = B(v))
			}
			return v
		}

		function H(k, a, b) {
			for (var e in k) Object.hasOwnProperty.call(k, e) && a.call(b || k[e], k[e], e, k)
		}

		function K(k, a, b) {
			function e(a, b) {
				var e = k.removeEventListener || d.removeEventListenerPolyfill;
				e && e.call(k, a, b, !1)
			}

			function v(b) {
				var E;
				if (k.nodeName) {
					if (a) {
						var v = {};
						v[a] = !0
					} else v = b;
					H(v, function(k, a) {
						if (b[a])
							for (E = b[a].length; E--;) e(a, b[a][E].fn)
					})
				}
			}
			var m =
				"function" === typeof k && k.prototype || k;
			if (Object.hasOwnProperty.call(m, "hcEvents")) {
				var n = m.hcEvents;
				a ? (m = n[a] || [], b ? (n[a] = m.filter(function(k) {
					return b !== k.fn
				}), e(a, b)) : (v(n), n[a] = [])) : (v(n), delete m.hcEvents)
			}
		}

		function w(k, a, b, e) {
			b = b || {};
			if (u.createEvent && (k.dispatchEvent || k.fireEvent && k !== d)) {
				var v = u.createEvent("Events");
				v.initEvent(a, !0, !0);
				b = q(v, b);
				k.dispatchEvent ? k.dispatchEvent(b) : k.fireEvent(a, b)
			} else if (k.hcEvents) {
				b.target || q(b, {
					preventDefault: function() {
						b.defaultPrevented = !0
					},
					target: k,
					type: a
				});
				v = [];
				for (var m = k, n = !1; m.hcEvents;) Object.hasOwnProperty.call(m, "hcEvents") && m
					.hcEvents[a] && (v.length && (n = !0), v.unshift.apply(v, m.hcEvents[a])), m = Object
					.getPrototypeOf(m);
				n && v.sort(function(k, a) {
					return k.order - a.order
				});
				v.forEach(function(a) {
					!1 === a.fn.call(k, b) && b.preventDefault()
				})
			}
			e && !b.defaultPrevented && e.call(k, b)
		}
		var n = d.charts,
			u = d.doc,
			m = d.win;
		(g || (g = {})).messages = [];
		Math.easeInOutSine = function(a) {
			return -.5 * (Math.cos(Math.PI * a) - 1)
		};
		var e = Array.prototype.find ? function(a, b) {
				return a.find(b)
			} :
			function(a, b) {
				var k, e = a.length;
				for (k = 0; k < e; k++)
					if (b(a[k], k)) return a[k]
			};
		H({
			map: "map",
			each: "forEach",
			grep: "filter",
			reduce: "reduce",
			some: "some"
		}, function(a, b) {
			d[b] = function(k) {
				var e;
				g(32, !1, void 0, (e = {}, e["Highcharts.".concat(b)] = "use Array.".concat(a),
					e));
				return Array.prototype[a].apply(k, [].slice.call(arguments, 1))
			}
		});
		var b, a = function() {
			var a = Math.random().toString(36).substring(2, 9) + "-",
				e = 0;
			return function() {
				return "highcharts-" + (b ? "" : a) + e++
			}
		}();
		m.jQuery && (m.jQuery.fn.highcharts = function() {
			var a = [].slice.call(arguments);
			if (this[0]) return a[0] ? (new(d[y(a[0]) ? a.shift() : "Chart"])(this[0], a[0], a[1]),
				this) : n[l(this[0], "data-highcharts-chart")]
		});
		e = {
			addEvent: function(a, b, e, m) {
				void 0 === m && (m = {});
				var k = "function" === typeof a && a.prototype || a;
				Object.hasOwnProperty.call(k, "hcEvents") || (k.hcEvents = {});
				k = k.hcEvents;
				d.Point && a instanceof d.Point && a.series && a.series.chart && (a.series.chart
					.runTrackerClick = !0);
				var v = a.addEventListener || d.addEventListenerPolyfill;
				v && v.call(a, b, e, d.supportsPassiveEvents ? {
					passive: void 0 ===
						m.passive ? -1 !== b.indexOf("touch") : m.passive,
					capture: !1
				} : !1);
				k[b] || (k[b] = []);
				k[b].push({
					fn: e,
					order: "number" === typeof m.order ? m.order : Infinity
				});
				k[b].sort(function(a, k) {
					return a.order - k.order
				});
				return function() {
					K(a, b, e)
				}
			},
			arrayMax: function(a) {
				for (var k = a.length, b = a[0]; k--;) a[k] > b && (b = a[k]);
				return b
			},
			arrayMin: function(a) {
				for (var b = a.length, k = a[0]; b--;) a[b] < k && (k = a[b]);
				return k
			},
			attr: l,
			clamp: function(a, b, e) {
				return a > b ? a < e ? a : e : b
			},
			cleanRecursively: z,
			clearTimeout: function(a) {
				h(a) && clearTimeout(a)
			},
			correctFloat: D,
			createElement: function(a, b, e, m, n) {
				a = u.createElement(a);
				b && q(a, b);
				n && f(a, {
					padding: "0",
					border: "none",
					margin: "0"
				});
				e && f(a, e);
				m && m.appendChild(a);
				return a
			},
			css: f,
			defined: h,
			destroyObjectProperties: function(a, b) {
				H(a, function(k, e) {
					k && k !== b && k.destroy && k.destroy();
					delete a[e]
				})
			},
			discardElement: function(a) {
				a && a.parentElement && a.parentElement.removeChild(a)
			},
			erase: function(a, b) {
				for (var k = a.length; k--;)
					if (a[k] === b) {
						a.splice(k, 1);
						break
					}
			},
			error: g,
			extend: q,
			extendClass: function(a, b) {
				var k = function() {};
				k.prototype =
					new a;
				q(k.prototype, b);
				return k
			},
			find: e,
			fireEvent: w,
			getMagnitude: c,
			getNestedProperty: function(a, b) {
				for (a = a.split("."); a.length && h(b);) {
					var k = a.shift();
					if ("undefined" === typeof k || "__proto__" === k) return;
					b = b[k];
					if (!h(b) || "function" === typeof b || "number" === typeof b.nodeType || b ===
						m) return
				}
				return b
			},
			getStyle: G,
			inArray: function(a, b, e) {
				g(32, !1, void 0, {
					"Highcharts.inArray": "use Array.indexOf"
				});
				return b.indexOf(a, e)
			},
			isArray: C,
			isClass: t,
			isDOMElement: x,
			isFunction: function(a) {
				return "function" === typeof a
			},
			isNumber: r,
			isObject: A,
			isString: y,
			keys: function(a) {
				g(32, !1, void 0, {
					"Highcharts.keys": "use Object.keys"
				});
				return Object.keys(a)
			},
			merge: function() {
				var a, b = arguments,
					e = {},
					m = function(a, b) {
						"object" !== typeof a && (a = {});
						H(b, function(k, e) {
							"__proto__" !== e && "constructor" !== e && (!A(k, !0) || t(
								k) || x(k) ? a[e] = b[e] : a[e] = m(a[e] || {}, k))
						});
						return a
					};
				!0 === b[0] && (e = b[1], b = Array.prototype.slice.call(b, 2));
				var n = b.length;
				for (a = 0; a < n; a++) e = m(e, b[a]);
				return e
			},
			normalizeTickInterval: function(a, b, e, m, n) {
				var k = a;
				e = p(e, c(a));
				var v = a / e;
				b || (b =
					n ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 ===
					m && (1 === e ? b = b.filter(function(a) {
						return 0 === a % 1
					}) : .1 >= e && (b = [1 / e])));
				for (m = 0; m < b.length && !(k = b[m], n && k * e >= a || !n && v <= (b[m] + (b[m +
						1] || b[m])) / 2); m++);
				return k = D(k * e, -Math.round(Math.log(.001) / Math.LN10))
			},
			objectEach: H,
			offset: function(a) {
				var b = u.documentElement;
				a = a.parentElement || a.parentNode ? a.getBoundingClientRect() : {
					top: 0,
					left: 0,
					width: 0,
					height: 0
				};
				return {
					top: a.top + (m.pageYOffset || b.scrollTop) - (b.clientTop || 0),
					left: a.left + (m.pageXOffset || b.scrollLeft) -
						(b.clientLeft || 0),
					width: a.width,
					height: a.height
				}
			},
			pad: function(a, b, e) {
				return Array((b || 2) + 1 - String(a).replace("-", "").length).join(e || "0") + a
			},
			pick: p,
			pInt: B,
			relativeLength: function(a, b, e) {
				return /%$/.test(a) ? b * parseFloat(a) / 100 + (e || 0) : parseFloat(a)
			},
			removeEvent: K,
			splat: function(a) {
				return C(a) ? a : [a]
			},
			stableSort: function(a, b) {
				var k = a.length,
					e, m;
				for (m = 0; m < k; m++) a[m].safeI = m;
				a.sort(function(a, k) {
					e = b(a, k);
					return 0 === e ? a.safeI - k.safeI : e
				});
				for (m = 0; m < k; m++) delete a[m].safeI
			},
			syncTimeout: function(a, b, e) {
				if (0 <
					b) return setTimeout(a, b, e);
				a.call(0, e);
				return -1
			},
			timeUnits: {
				millisecond: 1,
				second: 1E3,
				minute: 6E4,
				hour: 36E5,
				day: 864E5,
				week: 6048E5,
				month: 24192E5,
				year: 314496E5
			},
			uniqueKey: a,
			useSerialIds: function(a) {
				return b = p(a, b)
			},
			wrap: function(a, b, e) {
				var k = a[b];
				a[b] = function() {
					var a = arguments,
						b = this;
					return e.apply(this, [function() {
						return k.apply(b, arguments.length ? arguments : a)
					}].concat([].slice.call(arguments)))
				}
			}
		};
		"";
		return e
	});
	I(g, "Core/Chart/ChartDefaults.js", [], function() {
		return {
			alignThresholds: !1,
			panning: {
				enabled: !1,
				type: "x"
			},
			styledMode: !1,
			borderRadius: 0,
			colorCount: 10,
			allowMutatingData: !0,
			defaultSeriesType: "line",
			ignoreHiddenSeries: !0,
			spacing: [10, 10, 15, 10],
			resetZoomButton: {
				theme: {
					zIndex: 6
				},
				position: {
					align: "right",
					x: -10,
					y: 10
				}
			},
			zoomBySingleTouch: !1,
			zooming: {
				singleTouch: !1,
				resetButton: {
					theme: {
						zIndex: 6
					},
					position: {
						align: "right",
						x: -10,
						y: 10
					}
				}
			},
			width: null,
			height: null,
			borderColor: "#335cad",
			backgroundColor: "#ffffff",
			plotBorderColor: "#cccccc"
		}
	});
	I(g, "Core/Color/Color.js", [g["Core/Globals.js"], g["Core/Utilities.js"]], function(d,
		g) {
		var M = g.isNumber,
			B = g.merge,
			y = g.pInt;
		g = function() {
			function g(A) {
				this.rgba = [NaN, NaN, NaN, NaN];
				this.input = A;
				var x = d.Color;
				if (x && x !== g) return new x(A);
				if (!(this instanceof g)) return new g(A);
				this.init(A)
			}
			g.parse = function(d) {
				return d ? new g(d) : g.None
			};
			g.prototype.init = function(d) {
				var x;
				if ("object" === typeof d && "undefined" !== typeof d.stops) this.stops = d.stops
					.map(function(l) {
						return new g(l[1])
					});
				else if ("string" === typeof d) {
					this.input = d = g.names[d.toLowerCase()] || d;
					if ("#" === d.charAt(0)) {
						var t = d.length;
						var r =
							parseInt(d.substr(1), 16);
						7 === t ? x = [(r & 16711680) >> 16, (r & 65280) >> 8, r & 255, 1] : 4 ===
							t && (x = [(r & 3840) >> 4 | (r & 3840) >> 8, (r & 240) >> 4 | r & 240,
								(r & 15) << 4 | r & 15, 1
							])
					}
					if (!x)
						for (r = g.parsers.length; r-- && !x;) {
							var h = g.parsers[r];
							(t = h.regex.exec(d)) && (x = h.parse(t))
						}
				}
				x && (this.rgba = x)
			};
			g.prototype.get = function(d) {
				var x = this.input,
					t = this.rgba;
				if ("object" === typeof x && "undefined" !== typeof this.stops) {
					var r = B(x);
					r.stops = [].slice.call(r.stops);
					this.stops.forEach(function(h, l) {
						r.stops[l] = [r.stops[l][0], h.get(d)]
					});
					return r
				}
				return t &&
					M(t[0]) ? "rgb" === d || !d && 1 === t[3] ? "rgb(" + t[0] + "," + t[1] + "," +
					t[2] + ")" : "a" === d ? "".concat(t[3]) : "rgba(" + t.join(",") + ")" : x
			};
			g.prototype.brighten = function(d) {
				var x = this.rgba;
				if (this.stops) this.stops.forEach(function(r) {
					r.brighten(d)
				});
				else if (M(d) && 0 !== d)
					for (var t = 0; 3 > t; t++) x[t] += y(255 * d), 0 > x[t] && (x[t] = 0), 255 < x[
						t] && (x[t] = 255);
				return this
			};
			g.prototype.setOpacity = function(d) {
				this.rgba[3] = d;
				return this
			};
			g.prototype.tweenTo = function(d, x) {
				var t = this.rgba,
					r = d.rgba;
				if (!M(t[0]) || !M(r[0])) return d.input || "none";
				d =
					1 !== r[3] || 1 !== t[3];
				return (d ? "rgba(" : "rgb(") + Math.round(r[0] + (t[0] - r[0]) * (1 - x)) + "," +
					Math.round(r[1] + (t[1] - r[1]) * (1 - x)) + "," + Math.round(r[2] + (t[2] - r[
						2]) * (1 - x)) + (d ? "," + (r[3] + (t[3] - r[3]) * (1 - x)) : "") + ")"
			};
			g.names = {
				white: "#ffffff",
				black: "#000000"
			};
			g.parsers = [{
				regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
				parse: function(d) {
					return [y(d[1]), y(d[2]), y(d[3]), parseFloat(d[4], 10)]
				}
			}, {
				regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
				parse: function(d) {
					return [y(d[1]),
						y(d[2]), y(d[3]), 1
					]
				}
			}];
			g.None = new g("");
			return g
		}();
		"";
		return g
	});
	I(g, "Core/Color/Palettes.js", [], function() {
		return {
			colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(
				" ")
		}
	});
	I(g, "Core/Time.js", [g["Core/Globals.js"], g["Core/Utilities.js"]], function(d, g) {
		var M = d.win,
			B = g.defined,
			y = g.error,
			C = g.extend,
			A = g.isObject,
			x = g.merge,
			t = g.objectEach,
			r = g.pad,
			h = g.pick,
			l = g.splat,
			q = g.timeUnits,
			p = d.isSafari && M.Intl && M.Intl.DateTimeFormat.prototype.formatRange,
			f = d.isSafari &&
			M.Intl && !M.Intl.DateTimeFormat.prototype.formatRange;
		g = function() {
			function c(c) {
				this.options = {};
				this.variableTimezone = this.useUTC = !1;
				this.Date = M.Date;
				this.getTimezoneOffset = this.timezoneOffsetFunction();
				this.update(c)
			}
			c.prototype.get = function(c, f) {
				if (this.variableTimezone || this.timezoneOffset) {
					var D = f.getTime(),
						p = D - this.getTimezoneOffset(f);
					f.setTime(p);
					c = f["getUTC" + c]();
					f.setTime(D);
					return c
				}
				return this.useUTC ? f["getUTC" + c]() : f["get" + c]()
			};
			c.prototype.set = function(c, f, l) {
				if (this.variableTimezone ||
					this.timezoneOffset) {
					if ("Milliseconds" === c || "Seconds" === c || "Minutes" === c && 0 === this
						.getTimezoneOffset(f) % 36E5) return f["setUTC" + c](l);
					var D = this.getTimezoneOffset(f);
					D = f.getTime() - D;
					f.setTime(D);
					f["setUTC" + c](l);
					c = this.getTimezoneOffset(f);
					D = f.getTime() + c;
					return f.setTime(D)
				}
				return this.useUTC || p && "FullYear" === c ? f["setUTC" + c](l) : f["set" + c](l)
			};
			c.prototype.update = function(c) {
				void 0 === c && (c = {});
				var f = h(c.useUTC, !0);
				this.options = c = x(!0, this.options, c);
				this.Date = c.Date || M.Date || Date;
				this.timezoneOffset =
					(this.useUTC = f) && c.timezoneOffset || void 0;
				this.getTimezoneOffset = this.timezoneOffsetFunction();
				this.variableTimezone = f && !(!c.getTimezoneOffset && !c.timezone)
			};
			c.prototype.makeTime = function(c, p, l, q, w, n) {
				if (this.useUTC) {
					var u = this.Date.UTC.apply(0, arguments);
					var m = this.getTimezoneOffset(u);
					u += m;
					var e = this.getTimezoneOffset(u);
					m !== e ? u += e - m : m - 36E5 !== this.getTimezoneOffset(u - 36E5) || f || (
						u -= 36E5)
				} else u = (new this.Date(c, p, h(l, 1), h(q, 0), h(w, 0), h(n, 0))).getTime();
				return u
			};
			c.prototype.timezoneOffsetFunction =
				function() {
					var c = this,
						f = this.options,
						p = f.getTimezoneOffset,
						l = f.moment || M.moment;
					if (!this.useUTC) return function(c) {
						return 6E4 * (new Date(c.toString())).getTimezoneOffset()
					};
					if (f.timezone) {
						if (l) return function(c) {
							return 6E4 * -l.tz(c, f.timezone).utcOffset()
						};
						y(25)
					}
					return this.useUTC && p ? function(c) {
						return 6E4 * p(c.valueOf())
					} : function() {
						return 6E4 * (c.timezoneOffset || 0)
					}
				};
			c.prototype.dateFormat = function(c, f, p) {
				if (!B(f) || isNaN(f)) return d.defaultOptions.lang && d.defaultOptions.lang
					.invalidDate || "";
				c = h(c, "%Y-%m-%d %H:%M:%S");
				var D = this,
					w = new this.Date(f),
					n = this.get("Hours", w),
					u = this.get("Day", w),
					m = this.get("Date", w),
					e = this.get("Month", w),
					b = this.get("FullYear", w),
					a = d.defaultOptions.lang,
					k = a && a.weekdays,
					v = a && a.shortWeekdays;
				w = C({
					a: v ? v[u] : k[u].substr(0, 3),
					A: k[u],
					d: r(m),
					e: r(m, 2, " "),
					w: u,
					b: a.shortMonths[e],
					B: a.months[e],
					m: r(e + 1),
					o: e + 1,
					y: b.toString().substr(2, 2),
					Y: b,
					H: r(n),
					k: n,
					I: r(n % 12 || 12),
					l: n % 12 || 12,
					M: r(this.get("Minutes", w)),
					p: 12 > n ? "AM" : "PM",
					P: 12 > n ? "am" : "pm",
					S: r(w.getSeconds()),
					L: r(Math.floor(f % 1E3), 3)
				}, d.dateFormats);
				t(w,
					function(a, b) {
						for (; - 1 !== c.indexOf("%" + b);) c = c.replace("%" + b,
							"function" === typeof a ? a.call(D, f) : a)
					});
				return p ? c.substr(0, 1).toUpperCase() + c.substr(1) : c
			};
			c.prototype.resolveDTLFormat = function(c) {
				return A(c, !0) ? c : (c = l(c), {
					main: c[0],
					from: c[1],
					to: c[2]
				})
			};
			c.prototype.getTimeTicks = function(c, f, p, l) {
				var w = this,
					n = [],
					u = {},
					m = new w.Date(f),
					e = c.unitRange,
					b = c.count || 1,
					a;
				l = h(l, 1);
				if (B(f)) {
					w.set("Milliseconds", m, e >= q.second ? 0 : b * Math.floor(w.get(
						"Milliseconds", m) / b));
					e >= q.second && w.set("Seconds", m, e >= q.minute ? 0 : b *
						Math.floor(w.get("Seconds", m) / b));
					e >= q.minute && w.set("Minutes", m, e >= q.hour ? 0 : b * Math.floor(w.get(
						"Minutes", m) / b));
					e >= q.hour && w.set("Hours", m, e >= q.day ? 0 : b * Math.floor(w.get("Hours",
						m) / b));
					e >= q.day && w.set("Date", m, e >= q.month ? 1 : Math.max(1, b * Math.floor(w
						.get("Date", m) / b)));
					if (e >= q.month) {
						w.set("Month", m, e >= q.year ? 0 : b * Math.floor(w.get("Month", m) / b));
						var k = w.get("FullYear", m)
					}
					e >= q.year && w.set("FullYear", m, k - k % b);
					e === q.week && (k = w.get("Day", m), w.set("Date", m, w.get("Date", m) - k +
						l + (k < l ? -7 : 0)));
					k = w.get("FullYear",
						m);
					l = w.get("Month", m);
					var v = w.get("Date", m),
						F = w.get("Hours", m);
					f = m.getTime();
					!w.variableTimezone && w.useUTC || !B(p) || (a = p - f > 4 * q.month || w
						.getTimezoneOffset(f) !== w.getTimezoneOffset(p));
					f = m.getTime();
					for (m = 1; f < p;) n.push(f), f = e === q.year ? w.makeTime(k + m * b, 0) :
						e === q.month ? w.makeTime(k, l + m * b) : !a || e !== q.day && e !== q
						.week ? a && e === q.hour && 1 < b ? w.makeTime(k, l, v, F + m * b) : f +
						e * b : w.makeTime(k, l, v + m * b * (e === q.day ? 1 : 7)), m++;
					n.push(f);
					e <= q.hour && 1E4 > n.length && n.forEach(function(a) {
						0 === a % 18E5 && "000000000" === w.dateFormat("%H%M%S%L",
							a) && (u[a] = "day")
					})
				}
				n.info = C(c, {
					higherRanks: u,
					totalRange: e * b
				});
				return n
			};
			c.prototype.getDateFormat = function(c, f, p, l) {
				var w = this.dateFormat("%m-%d %H:%M:%S.%L", f),
					n = {
						millisecond: 15,
						second: 12,
						minute: 9,
						hour: 6,
						day: 3
					},
					u = "millisecond";
				for (m in q) {
					if (c === q.week && +this.dateFormat("%w", f) === p && "00:00:00.000" === w
						.substr(6)) {
						var m = "week";
						break
					}
					if (q[m] > c) {
						m = u;
						break
					}
					if (n[m] && w.substr(n[m]) !== "01-01 00:00:00.000".substr(n[m])) break;
					"week" !== m && (u = m)
				}
				return this.resolveDTLFormat(l[m]).main
			};
			return c
		}();
		"";
		return g
	});
	I(g, "Core/Defaults.js", [g["Core/Chart/ChartDefaults.js"], g["Core/Color/Color.js"], g["Core/Globals.js"], g[
		"Core/Color/Palettes.js"], g["Core/Time.js"], g["Core/Utilities.js"]], function(d, g, z, B, y, C) {
		g = g.parse;
		var A = C.merge,
			x = {
				colors: B.colors,
				symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
				lang: {
					loading: "Loading...",
					months: "January February March April May June July August September October November December"
						.split(" "),
					shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
					weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
					decimalPoint: ".",
					numericSymbols: "kMGTPE".split(""),
					resetZoom: "Reset zoom",
					resetZoomTitle: "Reset zoom level 1:1",
					thousandsSep: " "
				},
				global: {},
				time: {
					Date: void 0,
					getTimezoneOffset: void 0,
					timezone: void 0,
					timezoneOffset: 0,
					useUTC: !0
				},
				chart: d,
				title: {
					text: "Chart title",
					align: "center",
					margin: 15,
					widthAdjust: -44
				},
				subtitle: {
					text: "",
					align: "center",
					widthAdjust: -44
				},
				caption: {
					margin: 15,
					text: "",
					align: "left",
					verticalAlign: "bottom"
				},
				plotOptions: {},
				labels: {
					style: {
						position: "absolute",
						color: "#333333"
					}
				},
				legend: {
					enabled: !0,
					align: "center",
					alignColumns: !0,
					className: "highcharts-no-tooltip",
					layout: "horizontal",
					labelFormatter: function() {
						return this.name
					},
					borderColor: "#999999",
					borderRadius: 0,
					navigation: {
						activeColor: "#003399",
						inactiveColor: "#cccccc"
					},
					itemStyle: {
						color: "#333333",
						cursor: "pointer",
						fontSize: "12px",
						fontWeight: "bold",
						textOverflow: "ellipsis"
					},
					itemHoverStyle: {
						color: "#000000"
					},
					itemHiddenStyle: {
						color: "#cccccc"
					},
					shadow: !1,
					itemCheckboxStyle: {
						position: "absolute",
						width: "13px",
						height: "13px"
					},
					squareSymbol: !0,
					symbolPadding: 5,
					verticalAlign: "bottom",
					x: 0,
					y: 0,
					title: {
						style: {
							fontWeight: "bold"
						}
					}
				},
				loading: {
					labelStyle: {
						fontWeight: "bold",
						position: "relative",
						top: "45%"
					},
					style: {
						position: "absolute",
						backgroundColor: "#ffffff",
						opacity: .5,
						textAlign: "center"
					}
				},
				tooltip: {
					enabled: !0,
					animation: z.svg,
					borderRadius: 3,
					dateTimeLabelFormats: {
						millisecond: "%A, %b %e, %H:%M:%S.%L",
						second: "%A, %b %e, %H:%M:%S",
						minute: "%A, %b %e, %H:%M",
						hour: "%A, %b %e, %H:%M",
						day: "%A, %b %e, %Y",
						week: "Week from %A, %b %e, %Y",
						month: "%B %Y",
						year: "%Y"
					},
					footerFormat: "",
					headerShape: "callout",
					hideDelay: 500,
					padding: 8,
					shape: "callout",
					shared: !1,
					snap: z.isTouchDevice ? 25 : 10,
					headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
					pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
					backgroundColor: g("#f7f7f7").setOpacity(.85).get(),
					borderWidth: 1,
					shadow: !0,
					stickOnContact: !1,
					style: {
						color: "#333333",
						cursor: "default",
						fontSize: "12px",
						whiteSpace: "nowrap"
					},
					useHTML: !1
				},
				credits: {
					enabled: !0,
					href: "https://www.highcharts.com?credits",
					position: {
						align: "right",
						x: -10,
						verticalAlign: "bottom",
						y: -5
					},
					style: {
						cursor: "pointer",
						color: "#999999",
						fontSize: "9px"
					},
					text: "Highcharts.com"
				}
			};
		x.chart.styledMode = !1;
		"";
		var t = new y(A(x.global, x.time));
		d = {
			defaultOptions: x,
			defaultTime: t,
			getOptions: function() {
				return x
			},
			setOptions: function(r) {
				A(!0, x, r);
				if (r.time || r.global) z.time ? z.time.update(A(x.global, x.time, r.global, r
					.time)) : z.time = t;
				return x
			}
		};
		"";
		return d
	});
	I(g, "Core/Animation/Fx.js", [g["Core/Color/Color.js"],
		g["Core/Globals.js"], g["Core/Utilities.js"]
	], function(d, g, z) {
		var M = d.parse,
			y = g.win,
			C = z.isNumber,
			A = z.objectEach;
		return function() {
			function d(t, r, h) {
				this.pos = NaN;
				this.options = r;
				this.elem = t;
				this.prop = h
			}
			d.prototype.dSetter = function() {
				var t = this.paths,
					r = t && t[0];
				t = t && t[1];
				var h = this.now || 0,
					l = [];
				if (1 !== h && r && t)
					if (r.length === t.length && 1 > h)
						for (var q = 0; q < t.length; q++) {
							for (var p = r[q], f = t[q], c = [], D = 0; D < f.length; D++) {
								var G = p[D],
									d = f[D];
								C(G) && C(d) && ("A" !== f[0] || 4 !== D && 5 !== D) ? c[D] = G +
									h * (d - G) : c[D] = d
							}
							l.push(c)
						} else l =
							t;
					else l = this.toD || [];
				this.elem.attr("d", l, void 0, !0)
			};
			d.prototype.update = function() {
				var d = this.elem,
					r = this.prop,
					h = this.now,
					l = this.options.step;
				if (this[r + "Setter"]) this[r + "Setter"]();
				else d.attr ? d.element && d.attr(r, h, null, !0) : d.style[r] = h + this.unit;
				l && l.call(d, h, this)
			};
			d.prototype.run = function(t, r, h) {
				var l = this,
					q = l.options,
					p = function(c) {
						return p.stopped ? !1 : l.step(c)
					},
					f = y.requestAnimationFrame || function(c) {
						setTimeout(c, 13)
					},
					c = function() {
						for (var p = 0; p < d.timers.length; p++) d.timers[p]() || d.timers.splice(
							p--,
							1);
						d.timers.length && f(c)
					};
				t !== r || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date,
					this.start = t, this.end = r, this.unit = h, this.now = this.start, this
					.pos = 0, p.elem = this.elem, p.prop = this.prop, p() && 1 === d.timers
					.push(p) && f(c)) : (delete q.curAnim[this.prop], q.complete && 0 === Object
					.keys(q.curAnim).length && q.complete.call(this.elem))
			};
			d.prototype.step = function(d) {
				var r = +new Date,
					h = this.options,
					l = this.elem,
					q = h.complete,
					p = h.duration,
					f = h.curAnim;
				if (l.attr && !l.element) d = !1;
				else if (d || r >= p + this.startTime) {
					this.now =
						this.end;
					this.pos = 1;
					this.update();
					var c = f[this.prop] = !0;
					A(f, function(f) {
						!0 !== f && (c = !1)
					});
					c && q && q.call(l);
					d = !1
				} else this.pos = h.easing((r - this.startTime) / p), this.now = this.start + (this
					.end - this.start) * this.pos, this.update(), d = !0;
				return d
			};
			d.prototype.initPath = function(d, r, h) {
				function l(f, n) {
					for (; f.length < x;) {
						var u = f[0],
							m = n[x - f.length];
						m && "M" === u[0] && (f[0] = "C" === m[0] ? ["C", u[1], u[2], u[1], u[2], u[
							1], u[2]] : ["L", u[1], u[2]]);
						f.unshift(u);
						c && (u = f.pop(), f.push(f[f.length - 1], u))
					}
				}

				function q(f, n) {
					for (; f.length <
						x;)
						if (n = f[Math.floor(f.length / D) - 1].slice(), "C" === n[0] && (n[1] = n[
								5], n[2] = n[6]), c) {
							var u = f[Math.floor(f.length / D)].slice();
							f.splice(f.length / 2, 0, n, u)
						} else f.push(n)
				}
				var p = d.startX,
					f = d.endX;
				h = h.slice();
				var c = d.isArea,
					D = c ? 2 : 1;
				r = r && r.slice();
				if (!r) return [h, h];
				if (p && f && f.length) {
					for (d = 0; d < p.length; d++)
						if (p[d] === f[0]) {
							var G = d;
							break
						} else if (p[0] === f[f.length - p.length + d]) {
						G = d;
						var t = !0;
						break
					} else if (p[p.length - 1] === f[f.length - p.length + d]) {
						G = p.length - d;
						break
					}
					"undefined" === typeof G && (r = [])
				}
				if (r.length && C(G)) {
					var x =
						h.length + G * D;
					t ? (l(r, h), q(h, r)) : (l(h, r), q(r, h))
				}
				return [r, h]
			};
			d.prototype.fillSetter = function() {
				d.prototype.strokeSetter.apply(this, arguments)
			};
			d.prototype.strokeSetter = function() {
				this.elem.attr(this.prop, M(this.start).tweenTo(M(this.end), this.pos), void 0, !0)
			};
			d.timers = [];
			return d
		}()
	});
	I(g, "Core/Animation/AnimationUtilities.js", [g["Core/Animation/Fx.js"], g["Core/Utilities.js"]], function(d,
	g) {
		function M(l) {
			return t(l) ? r({
				duration: 500,
				defer: 0
			}, l) : {
				duration: l ? 500 : 0,
				defer: 0
			}
		}

		function B(l, p) {
			for (var f = d.timers.length; f--;) d.timers[f].elem !==
				l || p && p !== d.timers[f].prop || (d.timers[f].stopped = !0)
		}
		var y = g.defined,
			C = g.getStyle,
			A = g.isArray,
			x = g.isNumber,
			t = g.isObject,
			r = g.merge,
			h = g.objectEach,
			l = g.pick;
		return {
			animate: function(l, p, f) {
				var c, D = "",
					q, H;
				if (!t(f)) {
					var g = arguments;
					f = {
						duration: g[2],
						easing: g[3],
						complete: g[4]
					}
				}
				x(f.duration) || (f.duration = 400);
				f.easing = "function" === typeof f.easing ? f.easing : Math[f.easing] || Math
					.easeInOutSine;
				f.curAnim = r(p);
				h(p, function(w, n) {
					B(l, n);
					H = new d(l, f, n);
					q = void 0;
					"d" === n && A(p.d) ? (H.paths = H.initPath(l, l.pathArray, p.d),
						H.toD = p.d, c = 0, q = 1) : l.attr ? c = l.attr(n) : (c =
						parseFloat(C(l, n)) || 0, "opacity" !== n && (D = "px"));
					q || (q = w);
					"string" === typeof q && q.match("px") && (q = q.replace(/px/g, ""));
					H.run(c, q, D)
				})
			},
			animObject: M,
			getDeferredAnimation: function(l, p, f) {
				var c = M(p),
					D = 0,
					h = 0;
				(f ? [f] : l.series).forEach(function(f) {
					f = M(f.options.animation);
					D = p && y(p.defer) ? c.defer : Math.max(D, f.duration + f.defer);
					h = Math.min(c.duration, f.duration)
				});
				l.renderer.forExport && (D = 0);
				return {
					defer: Math.max(0, D - h),
					duration: Math.min(D, h)
				}
			},
			setAnimation: function(h,
				p) {
				p.renderer.globalAnimation = l(h, p.options.chart.animation, !0)
			},
			stop: B
		}
	});
	I(g, "Core/Renderer/HTML/AST.js", [g["Core/Globals.js"], g["Core/Utilities.js"]], function(d, g) {
		var M = d.SVG_NS,
			B = g.attr,
			y = g.createElement,
			C = g.css,
			A = g.error,
			x = g.isFunction,
			t = g.isString,
			r = g.objectEach,
			h = g.splat,
			l = (g = d.win.trustedTypes) && x(g.createPolicy) && g.createPolicy("highcharts", {
				createHTML: function(f) {
					return f
				}
			}),
			q = l ? l.createHTML("") : "";
		try {
			var p = !!(new DOMParser).parseFromString(q, "text/html")
		} catch (f) {
			p = !1
		}
		x = function() {
			function f(c) {
				this.nodes =
					"string" === typeof c ? this.parseMarkup(c) : c
			}
			f.filterUserAttributes = function(c) {
				r(c, function(p, l) {
					var h = !0; - 1 === f.allowedAttributes.indexOf(l) && (h = !1); - 1 !==
						["background", "dynsrc", "href", "lowsrc", "src"].indexOf(l) && (h =
							t(p) && f.allowedReferences.some(function(c) {
								return 0 === p.indexOf(c)
							}));
					h || (A(33, !1, void 0, {
						"Invalid attribute in config": "".concat(l)
					}), delete c[l]);
					t(p) && c[l] && (c[l] = p.replace(/</g, "&lt;"))
				});
				return c
			};
			f.parseStyle = function(c) {
				return c.split(";").reduce(function(c, f) {
					f = f.split(":").map(function(c) {
						return c.trim()
					});
					var p = f.shift();
					p && f.length && (c[p.replace(/-([a-z])/g, function(c) {
						return c[1].toUpperCase()
					})] = f.join(":"));
					return c
				}, {})
			};
			f.setElementHTML = function(c, p) {
				c.innerHTML = f.emptyHTML;
				p && (new f(p)).addToDOM(c)
			};
			f.prototype.addToDOM = function(c) {
				function p(c, l) {
					var D;
					h(c).forEach(function(c) {
						var n = c.tagName,
							u = c.textContent ? d.doc.createTextNode(c.textContent) :
							void 0,
							m = f.bypassHTMLFiltering;
						if (n)
							if ("#text" === n) var e = u;
							else if (-1 !== f.allowedTags.indexOf(n) || m) {
							n = d.doc.createElementNS("svg" === n ? M : l.namespaceURI ||
								M, n);
							var b = c.attributes || {};
							r(c, function(a, k) {
								"tagName" !== k && "attributes" !== k &&
									"children" !== k && "style" !== k &&
									"textContent" !== k && (b[k] = a)
							});
							B(n, m ? b : f.filterUserAttributes(b));
							c.style && C(n, c.style);
							u && n.appendChild(u);
							p(c.children || [], n);
							e = n
						} else A(33, !1, void 0, {
							"Invalid tagName in config": n
						});
						e && l.appendChild(e);
						D = e
					});
					return D
				}
				return p(this.nodes, c)
			};
			f.prototype.parseMarkup = function(c) {
				var h = [];
				c = c.trim().replace(/ style=(["'])/g, " data-style=$1");
				if (p) c = (new DOMParser).parseFromString(l ? l.createHTML(c) :
					c, "text/html");
				else {
					var q = y("div");
					q.innerHTML = c;
					c = {
						body: q
					}
				}
				var d = function(c, p) {
					var n = c.nodeName.toLowerCase(),
						u = {
							tagName: n
						};
					"#text" === n && (u.textContent = c.textContent || "");
					if (n = c.attributes) {
						var m = {};
						[].forEach.call(n, function(b) {
							"data-style" === b.name ? u.style = f.parseStyle(b.value) :
								m[b.name] = b.value
						});
						u.attributes = m
					}
					if (c.childNodes.length) {
						var e = [];
						[].forEach.call(c.childNodes, function(b) {
							d(b, e)
						});
						e.length && (u.children = e)
					}
					p.push(u)
				};
				[].forEach.call(c.body.childNodes, function(c) {
					return d(c, h)
				});
				return h
			};
			f.allowedAttributes =
				"aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align text-anchor textAnchor textLength title type valign width x x1 x2 xlink:href y y1 y2 zIndex"
				.split(" ");
			f.allowedReferences = "https:// http:// mailto: / ../ ./ #".split(" ");
			f.allowedTags =
				"a abbr b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text textPath thead title tbody tspan td th tr u ul #text"
				.split(" ");
			f.emptyHTML = q;
			f.bypassHTMLFiltering = !1;
			return f
		}();
		"";
		return x
	});
	I(g, "Core/FormatUtilities.js", [g["Core/Defaults.js"], g["Core/Utilities.js"]], function(d, g) {
		function M(d, h, l, q) {
			d = +d || 0;
			h = +h;
			var p = B.lang,
				f = (d.toString().split(".")[1] || "").split("e")[0].length,
				c = d.toString().split("e"),
				D = h;
			if (-1 === h) h = Math.min(f, 20);
			else if (!A(h)) h = 2;
			else if (h && c[1] && 0 > c[1]) {
				var G = h + +c[1];
				0 <= G ? (c[0] = (+c[0]).toExponential(G).split("e")[0], h = G) : (c[0] = c[0].split(".")[
					0] || 0, d = 20 > h ? (c[0] * Math.pow(10, c[1])).toFixed(h) : 0, c[1] = 0)
			}
			G = (Math.abs(c[1] ? c[0] : d) + Math.pow(10, -Math.max(h,
				f) - 1)).toFixed(h);
			f = String(t(G));
			var r = 3 < f.length ? f.length % 3 : 0;
			l = x(l, p.decimalPoint);
			q = x(q, p.thousandsSep);
			d = (0 > d ? "-" : "") + (r ? f.substr(0, r) + q : "");
			d = 0 > +c[1] && !D ? "0" : d + f.substr(r).replace(/(\d{3})(?=\d)/g, "$1" + q);
			h && (d += l + G.slice(-h));
			c[1] && 0 !== +d && (d += "e" + c[1]);
			return d
		}
		var B = d.defaultOptions,
			y = d.defaultTime,
			C = g.getNestedProperty,
			A = g.isNumber,
			x = g.pick,
			t = g.pInt;
		return {
			dateFormat: function(d, h, l) {
				return y.dateFormat(d, h, l)
			},
			format: function(d, h, l) {
				var q = "{",
					p = !1,
					f = /f$/,
					c = /\.([0-9])/,
					D = B.lang,
					G = l && l.time ||
					y;
				l = l && l.numberFormatter || M;
				for (var r = []; d;) {
					var t = d.indexOf(q);
					if (-1 === t) break;
					var w = d.slice(0, t);
					if (p) {
						w = w.split(":");
						q = C(w.shift() || "", h);
						if (w.length && "number" === typeof q)
							if (w = w.join(":"), f.test(w)) {
								var n = parseInt((w.match(c) || ["", "-1"])[1], 10);
								null !== q && (q = l(q, n, D.decimalPoint, -1 < w.indexOf(",") ? D
									.thousandsSep : ""))
							} else q = G.dateFormat(w, q);
						r.push(q)
					} else r.push(w);
					d = d.slice(t + 1);
					q = (p = !p) ? "}" : "{"
				}
				r.push(d);
				return r.join("")
			},
			numberFormat: M
		}
	});
	I(g, "Core/Renderer/RendererUtilities.js", [g["Core/Utilities.js"]],
		function(d) {
			var g = d.clamp,
				z = d.pick,
				B = d.stableSort,
				y;
			(function(d) {
				function A(d, t, r) {
					var h = d,
						l = h.reducedLen || t,
						q = function(c, f) {
							return (f.rank || 0) - (c.rank || 0)
						},
						p = function(c, f) {
							return c.target - f.target
						},
						f, c = !0,
						D = [],
						G = 0;
					for (f = d.length; f--;) G += d[f].size;
					if (G > l) {
						B(d, q);
						for (G = f = 0; G <= l;) G += d[f].size, f++;
						D = d.splice(f - 1, d.length)
					}
					B(d, p);
					for (d = d.map(function(c) {
							return {
								size: c.size,
								targets: [c.target],
								align: z(c.align, .5)
							}
						}); c;) {
						for (f = d.length; f--;) l = d[f], q = (Math.min.apply(0, l.targets) + Math.max
								.apply(0, l.targets)) /
							2, l.pos = g(q - l.size * l.align, 0, t - l.size);
						f = d.length;
						for (c = !1; f--;) 0 < f && d[f - 1].pos + d[f - 1].size > d[f].pos && (d[f - 1]
							.size += d[f].size, d[f - 1].targets = d[f - 1].targets.concat(d[f]
							.targets), d[f - 1].align = .5, d[f - 1].pos + d[f - 1].size > t && (d[f -
								1].pos = t - d[f - 1].size), d.splice(f, 1), c = !0)
					}
					h.push.apply(h, D);
					f = 0;
					d.some(function(c) {
						var p = 0;
						return (c.targets || []).some(function() {
							h[f].pos = c.pos + p;
							if ("undefined" !== typeof r && Math.abs(h[f].pos - h[f]
								.target) > r) return h.slice(0, f + 1).forEach(function(c) {
									return delete c.pos
								}), h.reducedLen =
								(h.reducedLen || t) - .1 * t, h.reducedLen > .1 * t &&
								A(h, t, r), !0;
							p += h[f].size;
							f++;
							return !1
						})
					});
					B(h, p);
					return h
				}
				d.distribute = A
			})(y || (y = {}));
			return y
		});
	I(g, "Core/Renderer/SVG/SVGElement.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/Color/Color.js"], g[
		"Core/Globals.js"], g["Core/Utilities.js"]], function(d, g, z, B) {
		var M = d.animate,
			C = d.animObject,
			A = d.stop,
			x = z.deg2rad,
			t = z.doc,
			r = z.svg,
			h = z.SVG_NS,
			l = z.win,
			q = B.addEvent,
			p = B.attr,
			f = B.createElement,
			c = B.css,
			D = B.defined,
			G = B.erase,
			H = B.extend,
			K = B.fireEvent,
			w = B.isArray,
			n = B.isFunction,
			u = B.isString,
			m = B.merge,
			e = B.objectEach,
			b = B.pick,
			a = B.pInt,
			k = B.syncTimeout,
			v = B.uniqueKey;
		d = function() {
			function F() {
				this.element = void 0;
				this.onEvents = {};
				this.opacity = 1;
				this.renderer = void 0;
				this.SVG_NS = h;
				this.symbolCustomAttribs = "x y width height r start end innerR anchorX anchorY rounded"
					.split(" ")
			}
			F.prototype._defaultGetter = function(a) {
				a = b(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) :
					null, 0);
				/^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
				return a
			};
			F.prototype._defaultSetter =
				function(a, b, k) {
					k.setAttribute(b, a)
				};
			F.prototype.add = function(a) {
				var b = this.renderer,
					k = this.element;
				a && (this.parentGroup = a);
				"undefined" !== typeof this.textStr && "text" === this.element.nodeName && b
					.buildText(this);
				this.added = !0;
				if (!a || a.handleZ || this.zIndex) var e = this.zIndexSetter();
				e || (a ? a.element : b.box).appendChild(k);
				if (this.onAdd) this.onAdd();
				return this
			};
			F.prototype.addClass = function(a, b) {
				var k = b ? "" : this.attr("class") || "";
				a = (a || "").split(/ /g).reduce(function(a, b) {
						-1 === k.indexOf(b) && a.push(b);
						return a
					},
					k ? [k] : []).join(" ");
				a !== k && this.attr("class", a);
				return this
			};
			F.prototype.afterSetters = function() {
				this.doTransform && (this.updateTransform(), this.doTransform = !1)
			};
			F.prototype.align = function(a, k, e) {
				var m = {},
					n = this.renderer,
					E = n.alignedObjects,
					v, c, J;
				if (a) {
					if (this.alignOptions = a, this.alignByTranslate = k, !e || u(e)) this.alignTo =
						v = e || "renderer", G(E, this), E.push(this), e = void 0
				} else a = this.alignOptions, k = this.alignByTranslate, v = this.alignTo;
				e = b(e, n[v], "scrollablePlotBox" === v ? n.plotBox : void 0, n);
				v = a.align;
				var f =
					a.verticalAlign;
				n = (e.x || 0) + (a.x || 0);
				E = (e.y || 0) + (a.y || 0);
				"right" === v ? c = 1 : "center" === v && (c = 2);
				c && (n += (e.width - (a.width || 0)) / c);
				m[k ? "translateX" : "x"] = Math.round(n);
				"bottom" === f ? J = 1 : "middle" === f && (J = 2);
				J && (E += (e.height - (a.height || 0)) / J);
				m[k ? "translateY" : "y"] = Math.round(E);
				this[this.placed ? "animate" : "attr"](m);
				this.placed = !0;
				this.alignAttr = m;
				return this
			};
			F.prototype.alignSetter = function(a) {
				var b = {
					left: "start",
					center: "middle",
					right: "end"
				};
				b[a] && (this.alignValue = a, this.element.setAttribute("text-anchor",
					b[a]))
			};
			F.prototype.animate = function(a, m, n) {
				var v = this,
					c = C(b(m, this.renderer.globalAnimation, !0));
				m = c.defer;
				b(t.hidden, t.msHidden, t.webkitHidden, !1) && (c.duration = 0);
				0 !== c.duration ? (n && (c.complete = n), k(function() {
					v.element && M(v, a, c)
				}, m)) : (this.attr(a, void 0, n || c.complete), e(a, function(a, b) {
					c.step && c.step.call(this, a, {
						prop: b,
						pos: 1,
						elem: this
					})
				}, this));
				return this
			};
			F.prototype.applyTextOutline = function(a) {
				var b = this.element; - 1 !== a.indexOf("contrast") && (a = a.replace(/contrast/g,
					this.renderer.getContrast(b.style.fill)));
				var k = a.split(" ");
				a = k[k.length - 1];
				if ((k = k[0]) && "none" !== k && z.svg) {
					this.fakeTS = !0;
					k = k.replace(/(^[\d\.]+)(.*?)$/g, function(a, b, k) {
						return 2 * Number(b) + k
					});
					this.removeTextOutline();
					var e = t.createElementNS(h, "tspan");
					p(e, {
						"class": "highcharts-text-outline",
						fill: a,
						stroke: a,
						"stroke-width": k,
						"stroke-linejoin": "round"
					});
					a = b.querySelector("textPath") || b;
					[].forEach.call(a.childNodes, function(a) {
						var b = a.cloneNode(!0);
						b.removeAttribute && ["fill", "stroke", "stroke-width", "stroke"]
							.forEach(function(a) {
								return b.removeAttribute(a)
							});
						e.appendChild(b)
					});
					var m = 0;
					[].forEach.call(a.querySelectorAll("text tspan"), function(a) {
						m += Number(a.getAttribute("dy"))
					});
					k = t.createElementNS(h, "tspan");
					k.textContent = "\u200b";
					p(k, {
						x: Number(b.getAttribute("x")),
						dy: -m
					});
					e.appendChild(k);
					a.insertBefore(e, a.firstChild)
				}
			};
			F.prototype.attr = function(a, b, k, m) {
				var n = this.element,
					E = this.symbolCustomAttribs,
					v, c = this,
					u, f;
				if ("string" === typeof a && "undefined" !== typeof b) {
					var J = a;
					a = {};
					a[J] = b
				}
				"string" === typeof a ? c = (this[a + "Getter"] || this._defaultGetter).call(this,
					a, n) : (e(a, function(b, k) {
					u = !1;
					m || A(this, k);
					this.symbolName && -1 !== E.indexOf(k) && (v || (this.symbolAttr(a),
						v = !0), u = !0);
					!this.rotation || "x" !== k && "y" !== k || (this.doTransform = !0);
					u || (f = this[k + "Setter"] || this._defaultSetter, f.call(this, b,
							k, n), !this.styledMode && this.shadows &&
						/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(
							k) && this.updateShadows(k, b, f))
				}, this), this.afterSetters());
				k && k.call(this);
				return c
			};
			F.prototype.clip = function(a) {
				return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id +
					")" : "none")
			};
			F.prototype.crisp = function(a, b) {
				b = b || a.strokeWidth || 0;
				var k = Math.round(b) % 2 / 2;
				a.x = Math.floor(a.x || this.x || 0) + k;
				a.y = Math.floor(a.y || this.y || 0) + k;
				a.width = Math.floor((a.width || this.width || 0) - 2 * k);
				a.height = Math.floor((a.height || this.height || 0) - 2 * k);
				D(a.strokeWidth) && (a.strokeWidth = b);
				return a
			};
			F.prototype.complexColor = function(a, b, k) {
				var n = this.renderer,
					c, E, N, u, f, J, P, F, p, l, h = [],
					q;
				K(this.renderer, "complexColor", {
					args: arguments
				}, function() {
					a.radialGradient ? E = "radialGradient" : a.linearGradient &&
						(E = "linearGradient");
					if (E) {
						N = a[E];
						f = n.gradients;
						J = a.stops;
						p = k.radialReference;
						w(N) && (a[E] = N = {
							x1: N[0],
							y1: N[1],
							x2: N[2],
							y2: N[3],
							gradientUnits: "userSpaceOnUse"
						});
						"radialGradient" === E && p && !D(N.gradientUnits) && (u = N, N = m(
							N, n.getRadialAttr(p, u), {
								gradientUnits: "userSpaceOnUse"
							}));
						e(N, function(a, b) {
							"id" !== b && h.push(b, a)
						});
						e(J, function(a) {
							h.push(a)
						});
						h = h.join(",");
						if (f[h]) l = f[h].attr("id");
						else {
							N.id = l = v();
							var L = f[h] = n.createElement(E).attr(N).add(n.defs);
							L.radAttr = u;
							L.stops = [];
							J.forEach(function(a) {
								0 === a[1].indexOf("rgba") ?
									(c = g.parse(a[1]), P = c.get("rgb"), F = c.get(
										"a")) : (P = a[1], F = 1);
								a = n.createElement("stop").attr({
									offset: a[0],
									"stop-color": P,
									"stop-opacity": F
								}).add(L);
								L.stops.push(a)
							})
						}
						q = "url(" + n.url + "#" + l + ")";
						k.setAttribute(b, q);
						k.gradient = h;
						a.toString = function() {
							return q
						}
					}
				})
			};
			F.prototype.css = function(b) {
				var k = this.styles,
					n = {},
					v = this.element,
					u = !k;
				b.color && (b.fill = b.color);
				k && e(b, function(a, b) {
					k && k[b] !== a && (n[b] = a, u = !0)
				});
				if (u) {
					k && (b = H(k, n));
					if (null === b.width || "auto" === b.width) delete this.textWidth;
					else if ("text" === v.nodeName.toLowerCase() &&
						b.width) var E = this.textWidth = a(b.width);
					this.styles = b;
					E && !r && this.renderer.forExport && delete b.width;
					var N = m(b);
					v.namespaceURI === this.SVG_NS && ["textOutline", "textOverflow", "width"]
						.forEach(function(a) {
							return N && delete N[a]
						});
					c(v, N);
					this.added && ("text" === this.element.nodeName && this.renderer.buildText(
						this), b.textOutline && this.applyTextOutline(b.textOutline))
				}
				return this
			};
			F.prototype.dashstyleSetter = function(k) {
				var e = this["stroke-width"];
				"inherit" === e && (e = 1);
				if (k = k && k.toLowerCase()) {
					var m = k.replace("shortdashdotdot",
							"3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot",
							"1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,")
						.replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(
							",");
					for (k = m.length; k--;) m[k] = "" + a(m[k]) * b(e, NaN);
					k = m.join(",").replace(/NaN/g, "none");
					this.element.setAttribute("stroke-dasharray", k)
				}
			};
			F.prototype.destroy = function() {
				var a = this,
					b = a.element || {},
					k = a.renderer,
					m = b.ownerSVGElement,
					n = k.isSVG && "SPAN" === b.nodeName && a.parentGroup || void 0;
				b.onclick = b.onmouseout =
					b.onmouseover = b.onmousemove = b.point = null;
				A(a);
				if (a.clipPath && m) {
					var E = a.clipPath;
					[].forEach.call(m.querySelectorAll("[clip-path],[CLIP-PATH]"), function(a) {
						-1 < a.getAttribute("clip-path").indexOf(E.element.id) && a
							.removeAttribute("clip-path")
					});
					a.clipPath = E.destroy()
				}
				if (a.stops) {
					for (m = 0; m < a.stops.length; m++) a.stops[m].destroy();
					a.stops.length = 0;
					a.stops = void 0
				}
				a.safeRemoveChild(b);
				for (k.styledMode || a.destroyShadows(); n && n.div && 0 === n.div.childNodes
					.length;) b = n.parentGroup, a.safeRemoveChild(n.div), delete n.div,
					n = b;
				a.alignTo && G(k.alignedObjects, a);
				e(a, function(b, k) {
					a[k] && a[k].parentGroup === a && a[k].destroy && a[k].destroy();
					delete a[k]
				})
			};
			F.prototype.destroyShadows = function() {
				(this.shadows || []).forEach(function(a) {
					this.safeRemoveChild(a)
				}, this);
				this.shadows = void 0
			};
			F.prototype.dSetter = function(a, b, k) {
				w(a) && ("string" === typeof a[0] && (a = this.renderer.pathToSegments(a)), this
					.pathArray = a, a = a.reduce(function(a, b, k) {
						return b && b.join ? (k ? a + " " : "") + b.join(" ") : (b || "")
							.toString()
					}, ""));
				/(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
				this[b] !== a && (k.setAttribute(b, a), this[b] = a)
			};
			F.prototype.fadeOut = function(a) {
				var k = this;
				k.animate({
					opacity: 0
				}, {
					duration: b(a, 150),
					complete: function() {
						k.hide()
					}
				})
			};
			F.prototype.fillSetter = function(a, b, k) {
				"string" === typeof a ? k.setAttribute(b, a) : a && this.complexColor(a, b, k)
			};
			F.prototype.getBBox = function(a, k) {
				var e = this.alignValue,
					m = this.element,
					v = this.renderer,
					E = this.styles,
					u = this.textStr,
					f = v.cache,
					p = v.cacheKeys,
					l = m.namespaceURI === this.SVG_NS;
				k = b(k, this.rotation, 0);
				var P = v.styledMode ? m && F.prototype.getStyle.call(m,
						"font-size") : E && E.fontSize,
					J;
				if (D(u)) {
					var w = u.toString(); - 1 === w.indexOf("<") && (w = w.replace(/[0-9]/g, "0"));
					w += ["", k, P, this.textWidth, e, E && E.textOverflow, E && E.fontWeight]
					.join()
				}
				w && !a && (J = f[w]);
				if (!J) {
					if (l || v.forExport) {
						try {
							var h = this.fakeTS && function(a) {
								var b = m.querySelector(".highcharts-text-outline");
								b && c(b, {
									display: a
								})
							};
							n(h) && h("none");
							J = m.getBBox ? H({}, m.getBBox()) : {
								width: m.offsetWidth,
								height: m.offsetHeight,
								x: 0,
								y: 0
							};
							n(h) && h("")
						} catch (V) {
							""
						}
						if (!J || 0 > J.width) J = {
							x: 0,
							y: 0,
							width: 0,
							height: 0
						}
					} else J = this.htmlGetBBox();
					if (v.isSVG && (v = J.width, a = J.height, l && (J.height = a = {
							"11px,17": 14,
							"13px,20": 16
						} ["" + (P || "") + ",".concat(Math.round(a))] || a), k)) {
						l = Number(m.getAttribute("y") || 0) - J.y;
						e = {
							right: 1,
							center: .5
						} [e || 0] || 0;
						E = k * x;
						P = (k - 90) * x;
						var q = v * Math.cos(E);
						k = v * Math.sin(E);
						h = Math.cos(P);
						E = Math.sin(P);
						v = J.x + e * (v - q) + l * h;
						P = v + q;
						h = P - a * h;
						q = h - q;
						l = J.y + l - e * k + l * E;
						e = l + k;
						a = e - a * E;
						k = a - k;
						J.x = Math.min(v, P, h, q);
						J.y = Math.min(l, e, a, k);
						J.width = Math.max(v, P, h, q) - J.x;
						J.height = Math.max(l, e, a, k) - J.y
					}
					if (w && ("" === u || 0 < J.height)) {
						for (; 250 < p.length;) delete f[p.shift()];
						f[w] || p.push(w);
						f[w] = J
					}
				}
				return J
			};
			F.prototype.getStyle = function(a) {
				return l.getComputedStyle(this.element || this, "").getPropertyValue(a)
			};
			F.prototype.hasClass = function(a) {
				return -1 !== ("" + this.attr("class")).split(" ").indexOf(a)
			};
			F.prototype.hide = function() {
				return this.attr({
					visibility: "hidden"
				})
			};
			F.prototype.htmlGetBBox = function() {
				return {
					height: 0,
					width: 0,
					x: 0,
					y: 0
				}
			};
			F.prototype.init = function(a, b) {
				this.element = "span" === b ? f(b) : t.createElementNS(this.SVG_NS, b);
				this.renderer = a;
				K(this, "afterInit")
			};
			F.prototype.on =
				function(a, b) {
					var k = this.onEvents;
					if (k[a]) k[a]();
					k[a] = q(this.element, a, b);
					return this
				};
			F.prototype.opacitySetter = function(a, b, k) {
				this.opacity = a = Number(Number(a).toFixed(3));
				k.setAttribute(b, a)
			};
			F.prototype.removeClass = function(a) {
				return this.attr("class", ("" + this.attr("class")).replace(u(a) ? new RegExp(
					"(^| )".concat(a, "( |$)")) : a, " ").replace(/ +/g, " ").trim())
			};
			F.prototype.removeTextOutline = function() {
				var a = this.element.querySelector("tspan.highcharts-text-outline");
				a && this.safeRemoveChild(a)
			};
			F.prototype.safeRemoveChild =
				function(a) {
					var b = a.parentNode;
					b && b.removeChild(a)
				};
			F.prototype.setRadialReference = function(a) {
				var b = this.element.gradient && this.renderer.gradients[this.element.gradient];
				this.element.radialReference = a;
				b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr));
				return this
			};
			F.prototype.setTextPath = function(a, b) {
				var k = this;
				b = m(!0, {
					enabled: !0,
					attributes: {
						dy: -5,
						startOffset: "50%",
						textAnchor: "middle"
					}
				}, b);
				var e = this.renderer.url,
					n = this.text || this,
					E = n.textPath,
					c = b.attributes,
					u = b.enabled;
				a = a || E && E.path;
				E && E.undo();
				a && u ? (b = q(n, "afterModifyTree", function(b) {
					if (a && u) {
						var m = a.attr("id");
						m || a.attr("id", m = v());
						var E = {
							x: 0,
							y: 0
						};
						D(c.dx) && (E.dx = c.dx, delete c.dx);
						D(c.dy) && (E.dy = c.dy, delete c.dy);
						n.attr(E);
						k.attr({
							transform: ""
						});
						k.box && (k.box = k.box.destroy());
						E = b.nodes.slice(0);
						b.nodes.length = 0;
						b.nodes[0] = {
							tagName: "textPath",
							attributes: H(c, {
								"text-anchor": c.textAnchor,
								href: "" + e + "#".concat(m)
							}),
							children: E
						}
					}
				}), n.textPath = {
					path: a,
					undo: b
				}) : (n.attr({
					dx: 0,
					dy: 0
				}), delete n.textPath);
				this.added && (n.textCache = "", this.renderer.buildText(n));
				return this
			};
			F.prototype.shadow = function(a, b, k) {
				var m = [],
					n = this.element,
					E = this.oldShadowOptions,
					v = this.parentGroup,
					c = v && 90 === v.rotation;
				v = {
					color: "#000000",
					offsetX: c ? -1 : 1,
					offsetY: c ? -1 : 1,
					opacity: .15,
					width: 3
				};
				var u = !1,
					f;
				!0 === a ? f = v : "object" === typeof a && (f = H(v, a));
				f && (f && E && e(f, function(a, b) {
					a !== E[b] && (u = !0)
				}), u && this.destroyShadows(), this.oldShadowOptions = f);
				if (!f) this.destroyShadows();
				else if (!this.shadows) {
					v = f.opacity / f.width;
					var F = c ? "translate(".concat(f.offsetY, ", ").concat(f.offsetX, ")") :
						"translate(".concat(f.offsetX,
							", ").concat(f.offsetY, ")");
					for (c = 1; c <= f.width; c++) {
						var l = n.cloneNode(!1);
						var w = 2 * f.width + 1 - 2 * c;
						p(l, {
							stroke: a.color || "#000000",
							"stroke-opacity": v * c,
							"stroke-width": w,
							transform: F,
							fill: "none"
						});
						l.setAttribute("class", (l.getAttribute("class") || "") +
							" highcharts-shadow");
						k && (p(l, "height", Math.max(p(l, "height") - w, 0)), l.cutHeight = w);
						b ? b.element.appendChild(l) : n.parentNode && n.parentNode.insertBefore(l,
							n);
						m.push(l)
					}
					this.shadows = m
				}
				return this
			};
			F.prototype.show = function(a) {
				void 0 === a && (a = !0);
				return this.attr({
					visibility: a ?
						"inherit" : "visible"
				})
			};
			F.prototype["stroke-widthSetter"] = function(a, b, k) {
				this[b] = a;
				k.setAttribute(b, a)
			};
			F.prototype.strokeWidth = function() {
				if (!this.renderer.styledMode) return this["stroke-width"] || 0;
				var b = this.getStyle("stroke-width"),
					k = 0;
				if (b.indexOf("px") === b.length - 2) k = a(b);
				else if ("" !== b) {
					var e = t.createElementNS(h, "rect");
					p(e, {
						width: b,
						"stroke-width": 0
					});
					this.element.parentNode.appendChild(e);
					k = e.getBBox().width;
					e.parentNode.removeChild(e)
				}
				return k
			};
			F.prototype.symbolAttr = function(a) {
				var k = this;
				"x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(
					function(e) {
						k[e] = b(a[e], k[e])
					});
				k.attr({
					d: k.renderer.symbols[k.symbolName](k.x, k.y, k.width, k.height, k)
				})
			};
			F.prototype.textSetter = function(a) {
				a !== this.textStr && (delete this.textPxLength, this.textStr = a, this.added &&
					this.renderer.buildText(this))
			};
			F.prototype.titleSetter = function(a) {
				var k = this.element,
					e = k.getElementsByTagName("title")[0] || t.createElementNS(this.SVG_NS,
						"title");
				k.insertBefore ? k.insertBefore(e, k.firstChild) :
					k.appendChild(e);
				e.textContent = String(b(a, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<")
					.replace(/&gt;/g, ">")
			};
			F.prototype.toFront = function() {
				var a = this.element;
				a.parentNode.appendChild(a);
				return this
			};
			F.prototype.translate = function(a, b) {
				return this.attr({
					translateX: a,
					translateY: b
				})
			};
			F.prototype.updateShadows = function(a, b, k) {
				var e = this.shadows;
				if (e)
					for (var m = e.length; m--;) k.call(e[m], "height" === a ? Math.max(b - (e[m]
						.cutHeight || 0), 0) : "d" === a ? this.d : b, a, e[m])
			};
			F.prototype.updateTransform = function() {
				var a =
					this.element,
					k = this.matrix,
					e = this.rotation;
				e = void 0 === e ? 0 : e;
				var m = this.scaleX,
					n = this.scaleY,
					E = this.translateX,
					v = this.translateY;
				E = ["translate(" + (void 0 === E ? 0 : E) + "," + (void 0 === v ? 0 : v) + ")"];
				D(k) && E.push("matrix(" + k.join(",") + ")");
				e && E.push("rotate(" + e + " " + b(this.rotationOriginX, a.getAttribute("x"), 0) +
					" " + b(this.rotationOriginY, a.getAttribute("y") || 0) + ")");
				(D(m) || D(n)) && E.push("scale(" + b(m, 1) + " " + b(n, 1) + ")");
				E.length && !(this.text || this).textPath && a.setAttribute("transform", E.join(
					" "))
			};
			F.prototype.visibilitySetter =
				function(a, b, k) {
					"inherit" === a ? k.removeAttribute(b) : this[b] !== a && k.setAttribute(b, a);
					this[b] = a
				};
			F.prototype.xGetter = function(a) {
				"circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a =
					"cy"));
				return this._defaultGetter(a)
			};
			F.prototype.zIndexSetter = function(b, k) {
				var e = this.renderer,
					m = this.parentGroup,
					n = (m || e).element || e.box,
					E = this.element;
				e = n === e.box;
				var v = !1;
				var c = this.added;
				var u;
				D(b) ? (E.setAttribute("data-z-index", b), b = +b, this[k] === b && (c = !1)) : D(
					this[k]) && E.removeAttribute("data-z-index");
				this[k] =
					b;
				if (c) {
					(b = this.zIndex) && m && (m.handleZ = !0);
					k = n.childNodes;
					for (u = k.length - 1; 0 <= u && !v; u--) {
						m = k[u];
						c = m.getAttribute("data-z-index");
						var f = !D(c);
						if (m !== E)
							if (0 > b && f && !e && !u) n.insertBefore(E, k[u]), v = !0;
							else if (a(c) <= b || f && (!D(b) || 0 <= b)) n.insertBefore(E, k[u +
							1] || null), v = !0
					}
					v || (n.insertBefore(E, k[e ? 3 : 0] || null), v = !0)
				}
				return v
			};
			return F
		}();
		d.prototype.strokeSetter = d.prototype.fillSetter;
		d.prototype.yGetter = d.prototype.xGetter;
		d.prototype.matrixSetter = d.prototype.rotationOriginXSetter = d.prototype.rotationOriginYSetter =
			d.prototype.rotationSetter = d.prototype.scaleXSetter = d.prototype.scaleYSetter = d.prototype
			.translateXSetter = d.prototype.translateYSetter = d.prototype.verticalAlignSetter = function(a,
				b) {
				this[b] = a;
				this.doTransform = !0
			};
		"";
		return d
	});
	I(g, "Core/Renderer/RendererRegistry.js", [g["Core/Globals.js"]], function(d) {
		var g;
		(function(g) {
			g.rendererTypes = {};
			var M;
			g.getRendererType = function(d) {
				void 0 === d && (d = M);
				return g.rendererTypes[d] || g.rendererTypes[M]
			};
			g.registerRendererType = function(z, C, A) {
				g.rendererTypes[z] = C;
				if (!M ||
					A) M = z, d.Renderer = C
			}
		})(g || (g = {}));
		return g
	});
	I(g, "Core/Renderer/SVG/SVGLabel.js", [g["Core/Renderer/SVG/SVGElement.js"], g["Core/Utilities.js"]], function(
		d, g) {
		var M = this && this.__extends || function() {
				var d = function(h, l) {
					d = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function(l, p) {
						l.__proto__ = p
					} || function(l, p) {
						for (var f in p) p.hasOwnProperty(f) && (l[f] = p[f])
					};
					return d(h, l)
				};
				return function(h, l) {
					function q() {
						this.constructor = h
					}
					d(h, l);
					h.prototype = null === l ? Object.create(l) : (q.prototype = l.prototype,
						new q)
				}
			}(),
			B = g.defined,
			y = g.extend,
			C = g.isNumber,
			A = g.merge,
			x = g.pick,
			t = g.removeEvent;
		return function(r) {
			function h(l, q, p, f, c, D, d, t, g, w) {
				var n = r.call(this) || this;
				n.paddingLeftSetter = n.paddingSetter;
				n.paddingRightSetter = n.paddingSetter;
				n.init(l, "g");
				n.textStr = q;
				n.x = p;
				n.y = f;
				n.anchorX = D;
				n.anchorY = d;
				n.baseline = g;
				n.className = w;
				n.addClass("button" === w ? "highcharts-no-tooltip" : "highcharts-label");
				w && n.addClass("highcharts-" + w);
				n.text = l.text(void 0, 0, 0, t).attr({
					zIndex: 1
				});
				var u;
				"string" === typeof c && ((u = /^url\((.*?)\)$/.test(c)) ||
					n.renderer.symbols[c]) && (n.symbolKey = c);
				n.bBox = h.emptyBBox;
				n.padding = 3;
				n.baselineOffset = 0;
				n.needsBox = l.styledMode || u;
				n.deferredAttr = {};
				n.alignFactor = 0;
				return n
			}
			M(h, r);
			h.prototype.alignSetter = function(l) {
				l = {
					left: 0,
					center: .5,
					right: 1
				} [l];
				l !== this.alignFactor && (this.alignFactor = l, this.bBox && C(this.xSetting) &&
					this.attr({
						x: this.xSetting
					}))
			};
			h.prototype.anchorXSetter = function(l, h) {
				this.anchorX = l;
				this.boxAttr(h, Math.round(l) - this.getCrispAdjust() - this.xSetting)
			};
			h.prototype.anchorYSetter = function(l, h) {
				this.anchorY =
					l;
				this.boxAttr(h, l - this.ySetting)
			};
			h.prototype.boxAttr = function(l, h) {
				this.box ? this.box.attr(l, h) : this.deferredAttr[l] = h
			};
			h.prototype.css = function(l) {
				if (l) {
					var q = {};
					l = A(l);
					h.textProps.forEach(function(f) {
						"undefined" !== typeof l[f] && (q[f] = l[f], delete l[f])
					});
					this.text.css(q);
					var p = "width" in q;
					"fontSize" in q || "fontWeight" in q ? this.updateTextPadding() : p && this
						.updateBoxSize()
				}
				return d.prototype.css.call(this, l)
			};
			h.prototype.destroy = function() {
				t(this.element, "mouseenter");
				t(this.element, "mouseleave");
				this.text &&
					this.text.destroy();
				this.box && (this.box = this.box.destroy());
				d.prototype.destroy.call(this)
			};
			h.prototype.fillSetter = function(l, h) {
				l && (this.needsBox = !0);
				this.fill = l;
				this.boxAttr(h, l)
			};
			h.prototype.getBBox = function() {
				this.textStr && 0 === this.bBox.width && 0 === this.bBox.height && this
					.updateBoxSize();
				var l = this.padding,
					h = x(this.paddingLeft, l);
				return {
					width: this.width,
					height: this.height,
					x: this.bBox.x - h,
					y: this.bBox.y - l
				}
			};
			h.prototype.getCrispAdjust = function() {
				return this.renderer.styledMode && this.box ? this.box.strokeWidth() %
					2 / 2 : (this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2 / 2
			};
			h.prototype.heightSetter = function(l) {
				this.heightSetting = l
			};
			h.prototype.onAdd = function() {
				this.text.add(this);
				this.attr({
					text: x(this.textStr, ""),
					x: this.x || 0,
					y: this.y || 0
				});
				this.box && B(this.anchorX) && this.attr({
					anchorX: this.anchorX,
					anchorY: this.anchorY
				})
			};
			h.prototype.paddingSetter = function(l, h) {
				C(l) ? l !== this[h] && (this[h] = l, this.updateTextPadding()) : this[h] = void 0
			};
			h.prototype.rSetter = function(l, h) {
				this.boxAttr(h, l)
			};
			h.prototype.shadow =
				function(l) {
					l && !this.renderer.styledMode && (this.updateBoxSize(), this.box && this.box
						.shadow(l));
					return this
				};
			h.prototype.strokeSetter = function(l, h) {
				this.stroke = l;
				this.boxAttr(h, l)
			};
			h.prototype["stroke-widthSetter"] = function(l, h) {
				l && (this.needsBox = !0);
				this["stroke-width"] = l;
				this.boxAttr(h, l)
			};
			h.prototype["text-alignSetter"] = function(l) {
				this.textAlign = l
			};
			h.prototype.textSetter = function(l) {
				"undefined" !== typeof l && this.text.attr({
					text: l
				});
				this.updateTextPadding()
			};
			h.prototype.updateBoxSize = function() {
				var l =
					this.text,
					q = l.element.style,
					p = {},
					f = this.padding,
					c = this.bBox = C(this.widthSetting) && C(this.heightSetting) && !this
					.textAlign || !B(l.textStr) ? h.emptyBBox : l.getBBox();
				this.width = this.getPaddedWidth();
				this.height = (this.heightSetting || c.height || 0) + 2 * f;
				q = this.renderer.fontMetrics(q && q.fontSize, l);
				this.baselineOffset = f + Math.min((this.text.firstLineMetrics || q).b, c.height ||
					Infinity);
				this.heightSetting && (this.baselineOffset += (this.heightSetting - q.h) / 2);
				this.needsBox && !l.textPath && (this.box || (l = this.box = this.symbolKey ?
						this.renderer.symbol(this.symbolKey) : this.renderer.rect(), l.addClass(
							("button" === this.className ? "" : "highcharts-label-box") + (this
								.className ? " highcharts-" + this.className + "-box" : "")), l
						.add(this)), l = this.getCrispAdjust(), p.x = l, p.y = (this.baseline ?
						-this.baselineOffset : 0) + l, p.width = Math.round(this.width), p
					.height = Math.round(this.height), this.box.attr(y(p, this.deferredAttr)),
					this.deferredAttr = {})
			};
			h.prototype.updateTextPadding = function() {
				var l = this.text;
				if (!l.textPath) {
					this.updateBoxSize();
					var h = this.baseline ?
						0 : this.baselineOffset,
						p = x(this.paddingLeft, this.padding);
					B(this.widthSetting) && this.bBox && ("center" === this.textAlign || "right" ===
						this.textAlign) && (p += {
						center: .5,
						right: 1
					} [this.textAlign] * (this.widthSetting - this.bBox.width));
					if (p !== l.x || h !== l.y) l.attr("x", p), l.hasBoxWidthChanged && (this.bBox =
						l.getBBox(!0)), "undefined" !== typeof h && l.attr("y", h);
					l.x = p;
					l.y = h
				}
			};
			h.prototype.widthSetter = function(l) {
				this.widthSetting = C(l) ? l : void 0
			};
			h.prototype.getPaddedWidth = function() {
				var l = this.padding,
					h = x(this.paddingLeft,
						l);
				l = x(this.paddingRight, l);
				return (this.widthSetting || this.bBox.width || 0) + h + l
			};
			h.prototype.xSetter = function(l) {
				this.x = l;
				this.alignFactor && (l -= this.alignFactor * this.getPaddedWidth(), this[
					"forceAnimate:x"] = !0);
				this.xSetting = Math.round(l);
				this.attr("translateX", this.xSetting)
			};
			h.prototype.ySetter = function(l) {
				this.ySetting = this.y = Math.round(l);
				this.attr("translateY", this.ySetting)
			};
			h.emptyBBox = {
				width: 0,
				height: 0,
				x: 0,
				y: 0
			};
			h.textProps =
				"color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width"
				.split(" ");
			return h
		}(d)
	});
	I(g, "Core/Renderer/SVG/Symbols.js", [g["Core/Utilities.js"]], function(d) {
		function g(d, g, r, h, l) {
			var q = [];
			if (l) {
				var p = l.start || 0,
					f = A(l.r, r);
				r = A(l.r, h || r);
				var c = (l.end || 0) - .001;
				h = l.innerR;
				var D = A(l.open, .001 > Math.abs((l.end || 0) - p - 2 * Math.PI)),
					G = Math.cos(p),
					t = Math.sin(p),
					x = Math.cos(c),
					w = Math.sin(c);
				p = A(l.longArc, .001 > c - p - Math.PI ? 0 : 1);
				q.push(["M", d + f * G, g + r * t], ["A", f, r, 0, p, A(l.clockwise, 1), d + f * x, g + r *
					w
				]);
				y(h) && q.push(D ? ["M", d + h * x, g + h * w] : ["L", d + h * x, g + h * w], ["A", h, h, 0,
					p, y(l.clockwise) ? 1 - l.clockwise :
					0, d + h * G, g + h * t
				]);
				D || q.push(["Z"])
			}
			return q
		}

		function z(d, g, r, h, l) {
			return l && l.r ? B(d, g, r, h, l) : [
				["M", d, g],
				["L", d + r, g],
				["L", d + r, g + h],
				["L", d, g + h],
				["Z"]
			]
		}

		function B(d, g, r, h, l) {
			l = l && l.r || 0;
			return [
				["M", d + l, g],
				["L", d + r - l, g],
				["C", d + r, g, d + r, g, d + r, g + l],
				["L", d + r, g + h - l],
				["C", d + r, g + h, d + r, g + h, d + r - l, g + h],
				["L", d + l, g + h],
				["C", d, g + h, d, g + h, d, g + h - l],
				["L", d, g + l],
				["C", d, g, d, g, d + l, g]
			]
		}
		var y = d.defined,
			C = d.isNumber,
			A = d.pick;
		return {
			arc: g,
			callout: function(d, g, r, h, l) {
				var q = Math.min(l && l.r || 0, r, h),
					p = q + 6,
					f = l && l.anchorX;
				l = l && l.anchorY ||
					0;
				var c = B(d, g, r, h, {
					r: q
				});
				if (!C(f)) return c;
				d + f >= r ? l > g + p && l < g + h - p ? c.splice(3, 1, ["L", d + r, l - 6], ["L", d +
						r + 6, l
					], ["L", d + r, l + 6], ["L", d + r, g + h - q]) : c.splice(3, 1, ["L", d + r, h /
						2], ["L", f, l], ["L", d + r, h / 2], ["L", d + r, g + h - q]) : 0 >= d + f ?
					l > g + p && l < g + h - p ? c.splice(7, 1, ["L", d, l + 6], ["L", d - 6, l], ["L",
						d, l - 6
					], ["L", d, g + q]) : c.splice(7, 1, ["L", d, h / 2], ["L", f, l], ["L", d, h / 2],
						["L", d, g + q]) : l && l > h && f > d + p && f < d + r - p ? c.splice(5, 1, [
						"L", f + 6, g + h
					], ["L", f, g + h + 6], ["L", f - 6, g + h], ["L", d + q, g + h]) : l && 0 > l &&
					f > d + p && f < d + r - p && c.splice(1, 1, ["L", f - 6, g], ["L", f, g - 6],
						["L", f + 6, g], ["L", r - q, g]);
				return c
			},
			circle: function(d, t, r, h) {
				return g(d + r / 2, t + h / 2, r / 2, h / 2, {
					start: .5 * Math.PI,
					end: 2.5 * Math.PI,
					open: !1
				})
			},
			diamond: function(d, g, r, h) {
				return [
					["M", d + r / 2, g],
					["L", d + r, g + h / 2],
					["L", d + r / 2, g + h],
					["L", d, g + h / 2],
					["Z"]
				]
			},
			rect: z,
			roundedRect: B,
			square: z,
			triangle: function(d, g, r, h) {
				return [
					["M", d + r / 2, g],
					["L", d + r, g + h],
					["L", d, g + h],
					["Z"]
				]
			},
			"triangle-down": function(d, g, r, h) {
				return [
					["M", d, g],
					["L", d + r, g],
					["L", d + r / 2, g + h],
					["Z"]
				]
			}
		}
	});
	I(g, "Core/Renderer/SVG/TextBuilder.js", [g["Core/Renderer/HTML/AST.js"],
		g["Core/Globals.js"], g["Core/Utilities.js"]
	], function(d, g, z) {
		var M = g.doc,
			y = g.SVG_NS,
			C = g.win,
			A = z.attr,
			x = z.extend,
			t = z.fireEvent,
			r = z.isString,
			h = z.objectEach,
			l = z.pick;
		return function() {
			function q(l) {
				var f = l.styles;
				this.renderer = l.renderer;
				this.svgElement = l;
				this.width = l.textWidth;
				this.textLineHeight = f && f.lineHeight;
				this.textOutline = f && f.textOutline;
				this.ellipsis = !(!f || "ellipsis" !== f.textOverflow);
				this.noWrap = !(!f || "nowrap" !== f.whiteSpace);
				this.fontSize = f && f.fontSize
			}
			q.prototype.buildSVG = function() {
				var p =
					this.svgElement,
					f = p.element,
					c = p.renderer,
					h = l(p.textStr, "").toString(),
					q = -1 !== h.indexOf("<"),
					g = f.childNodes;
				c = this.width && !p.added && c.box;
				var t = /<br.*?>/g,
					w = [h, this.ellipsis, this.noWrap, this.textLineHeight, this.textOutline, this
						.fontSize, this.width
					].join();
				if (w !== p.textCache) {
					p.textCache = w;
					delete p.actualWidth;
					for (w = g.length; w--;) f.removeChild(g[w]);
					q || this.ellipsis || this.width || p.textPath || -1 !== h.indexOf(" ") && (!
						this.noWrap || t.test(h)) ? "" !== h && (c && c.appendChild(f), h =
						new d(h), this.modifyTree(h.nodes),
						h.addToDOM(f), this.modifyDOM(), this.ellipsis && -1 !== (f
							.textContent || "").indexOf("\u2026") && p.attr("title", this
							.unescapeEntities(p.textStr || "", ["&lt;", "&gt;"])), c && c
						.removeChild(f)) : f.appendChild(M.createTextNode(this.unescapeEntities(
						h)));
					r(this.textOutline) && p.applyTextOutline && p.applyTextOutline(this
						.textOutline)
				}
			};
			q.prototype.modifyDOM = function() {
				var l = this,
					f = this.svgElement,
					c = A(f.element, "x");
				f.firstLineMetrics = void 0;
				for (var h; h = f.element.firstChild;)
					if (/^[\s\u200B]*$/.test(h.textContent || " ")) f.element.removeChild(h);
					else break;
				[].forEach.call(f.element.querySelectorAll("tspan.highcharts-br"), function(h, n) {
					h.nextSibling && h.previousSibling && (0 === n && 1 === h
						.previousSibling.nodeType && (f.firstLineMetrics = f.renderer
							.fontMetrics(void 0, h.previousSibling)), A(h, {
							dy: l.getLineHeight(h.nextSibling),
							x: c
						}))
				});
				var d = this.width || 0;
				if (d) {
					var q = function(h, n) {
							var u = h.textContent || "",
								m = u.replace(/([^\^])-/g, "$1- ").split(" "),
								e = !l.noWrap && (1 < m.length || 1 < f.element.childNodes.length),
								b = l.getLineHeight(n),
								a = 0,
								k = f.actualWidth;
							if (l.ellipsis) u &&
								l.truncate(h, u, void 0, 0, Math.max(0, d - parseInt(l.fontSize ||
									12, 10)), function(a, b) {
									return a.substring(0, b) + "\u2026"
								});
							else if (e) {
								u = [];
								for (e = []; n.firstChild && n.firstChild !== h;) e.push(n
									.firstChild), n.removeChild(n.firstChild);
								for (; m.length;) m.length && !l.noWrap && 0 < a && (u.push(h
										.textContent || ""), h.textContent = m.join(" ")
									.replace(/- /g, "-")), l.truncate(h, void 0, m, 0 === a ?
									k || 0 : 0, d,
									function(a, b) {
										return m.slice(0, b).join(" ").replace(/- /g, "-")
									}), k = f.actualWidth, a++;
								e.forEach(function(a) {
									n.insertBefore(a, h)
								});
								u.forEach(function(a) {
									n.insertBefore(M.createTextNode(a), h);
									a = M.createElementNS(y, "tspan");
									a.textContent = "\u200b";
									A(a, {
										dy: b,
										x: c
									});
									n.insertBefore(a, h)
								})
							}
						},
						g = function(c) {
							[].slice.call(c.childNodes).forEach(function(n) {
								n.nodeType === C.Node.TEXT_NODE ? q(n, c) : (-1 !== n
									.className.baseVal.indexOf("highcharts-br") && (f
										.actualWidth = 0), g(n))
							})
						};
					g(f.element)
				}
			};
			q.prototype.getLineHeight = function(l) {
				var f;
				l = l.nodeType === C.Node.TEXT_NODE ? l.parentElement : l;
				this.renderer.styledMode || (f = l && /(px|em)$/.test(l.style.fontSize) ?
					l.style.fontSize : this.fontSize || this.renderer.style.fontSize || 12);
				return this.textLineHeight ? parseInt(this.textLineHeight.toString(), 10) : this
					.renderer.fontMetrics(f, l || this.svgElement.element).h
			};
			q.prototype.modifyTree = function(l) {
				var f = this,
					c = function(h, p) {
						var d = h.attributes;
						d = void 0 === d ? {} : d;
						var q = h.children,
							w = h.style;
						w = void 0 === w ? {} : w;
						var n = h.tagName,
							u = f.renderer.styledMode;
						if ("b" === n || "strong" === n) u ? d["class"] = "highcharts-strong" : w
							.fontWeight = "bold";
						else if ("i" === n || "em" === n) u ? d["class"] = "highcharts-emphasized" :
							w.fontStyle = "italic";
						w && w.color && (w.fill = w.color);
						"br" === n ? (d["class"] = "highcharts-br", h.textContent = "\u200b", (p =
							l[p + 1]) && p.textContent && (p.textContent = p.textContent
							.replace(/^ +/gm, ""))) : "a" === n && q && q.some(function(m) {
							return "#text" === m.tagName
						}) && (h.children = [{
							children: q,
							tagName: "tspan"
						}]);
						"#text" !== n && "a" !== n && (h.tagName = "tspan");
						x(h, {
							attributes: d,
							style: w
						});
						q && q.filter(function(m) {
							return "#text" !== m.tagName
						}).forEach(c)
					};
				l.forEach(c);
				t(this.svgElement, "afterModifyTree", {
					nodes: l
				})
			};
			q.prototype.truncate =
				function(l, f, c, h, d, q) {
					var p = this.svgElement,
						w = p.renderer,
						n = p.rotation,
						u = [],
						m = c ? 1 : 0,
						e = (f || c || "").length,
						b = e,
						a, k = function(a, b) {
							b = b || a;
							var k = l.parentNode;
							if (k && "undefined" === typeof u[b])
								if (k.getSubStringLength) try {
									u[b] = h + k.getSubStringLength(0, c ? b + 1 : b)
								} catch (O) {
									""
								} else w.getSpanWidth && (l.textContent = q(f || c, a), u[b] = h + w
									.getSpanWidth(p, l));
							return u[b]
						};
					p.rotation = 0;
					var v = k(l.textContent.length);
					if (h + v > d) {
						for (; m <= e;) b = Math.ceil((m + e) / 2), c && (a = q(c, b)), v = k(b, a && a
							.length - 1), m === e ? m = e + 1 : v > d ? e = b - 1 : m = b;
						0 === e ?
							l.textContent = "" : f && e === f.length - 1 || (l.textContent = a || q(f ||
								c, b))
					}
					c && c.splice(0, b);
					p.actualWidth = v;
					p.rotation = n
				};
			q.prototype.unescapeEntities = function(l, f) {
				h(this.renderer.escapes, function(c, h) {
					f && -1 !== f.indexOf(c) || (l = l.toString().replace(new RegExp(c,
						"g"), h))
				});
				return l
			};
			return q
		}()
	});
	I(g, "Core/Renderer/SVG/SVGRenderer.js", [g["Core/Renderer/HTML/AST.js"], g["Core/Color/Color.js"], g[
			"Core/Globals.js"], g["Core/Renderer/RendererRegistry.js"], g[
		"Core/Renderer/SVG/SVGElement.js"], g["Core/Renderer/SVG/SVGLabel.js"],
		g["Core/Renderer/SVG/Symbols.js"], g["Core/Renderer/SVG/TextBuilder.js"], g["Core/Utilities.js"]
	], function(d, g, z, B, y, C, A, x, t) {
		var r = z.charts,
			h = z.deg2rad,
			l = z.doc,
			q = z.isFirefox,
			p = z.isMS,
			f = z.isWebKit,
			c = z.noop,
			D = z.SVG_NS,
			G = z.symbolSizes,
			H = z.win,
			K = t.addEvent,
			w = t.attr,
			n = t.createElement,
			u = t.css,
			m = t.defined,
			e = t.destroyObjectProperties,
			b = t.extend,
			a = t.isArray,
			k = t.isNumber,
			v = t.isObject,
			F = t.isString,
			J = t.merge,
			L = t.pick,
			O = t.pInt,
			Q = t.uniqueKey,
			T;
		z = function() {
			function E(a, b, k, e, m, n, E) {
				this.width = this.url = this.style =
					this.isSVG = this.imgCount = this.height = this.gradients = this.globalAnimation =
					this.defs = this.chartIndex = this.cacheKeys = this.cache = this.boxWrapper = this
					.box = this.alignedObjects = void 0;
				this.init(a, b, k, e, m, n, E)
			}
			E.prototype.init = function(a, b, k, e, m, n, E) {
				var v = this.createElement("svg").attr({
						version: "1.1",
						"class": "highcharts-root"
					}),
					c = v.element;
				E || v.css(this.getStyle(e));
				a.appendChild(c);
				w(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") && w(c, "xmlns", this
					.SVG_NS);
				this.isSVG = !0;
				this.box = c;
				this.boxWrapper = v;
				this.alignedObjects = [];
				this.url = this.getReferenceURL();
				this.createElement("desc").add().element.appendChild(l.createTextNode(
					"Created with Highcharts 10.3.2"));
				this.defs = this.createElement("defs").add();
				this.allowHTML = n;
				this.forExport = m;
				this.styledMode = E;
				this.gradients = {};
				this.cache = {};
				this.cacheKeys = [];
				this.imgCount = 0;
				this.setSize(b, k, !1);
				var f;
				q && a.getBoundingClientRect && (b = function() {
						u(a, {
							left: 0,
							top: 0
						});
						f = a.getBoundingClientRect();
						u(a, {
							left: Math.ceil(f.left) - f.left + "px",
							top: Math.ceil(f.top) - f.top + "px"
						})
					}, b(), this.unSubPixelFix =
					K(H, "resize", b))
			};
			E.prototype.definition = function(a) {
				return (new d([a])).addToDOM(this.defs.element)
			};
			E.prototype.getReferenceURL = function() {
				if ((q || f) && l.getElementsByTagName("base").length) {
					if (!m(T)) {
						var a = Q();
						a = (new d([{
							tagName: "svg",
							attributes: {
								width: 8,
								height: 8
							},
							children: [{
								tagName: "defs",
								children: [{
									tagName: "clipPath",
									attributes: {
										id: a
									},
									children: [{
										tagName: "rect",
										attributes: {
											width: 4,
											height: 4
										}
									}]
								}]
							}, {
								tagName: "rect",
								attributes: {
									id: "hitme",
									width: 8,
									height: 8,
									"clip-path": "url(#".concat(a, ")"),
									fill: "rgba(0,0,0,0.001)"
								}
							}]
						}])).addToDOM(l.body);
						u(a, {
							position: "fixed",
							top: 0,
							left: 0,
							zIndex: 9E5
						});
						var b = l.elementFromPoint(6, 6);
						T = "hitme" === (b && b.id);
						l.body.removeChild(a)
					}
					if (T) return H.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(
						/([\('\)])/g, "\\$1").replace(/ /g, "%20")
				}
				return ""
			};
			E.prototype.getStyle = function(a) {
				return this.style = b({
					fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
					fontSize: "12px"
				}, a)
			};
			E.prototype.setStyle = function(a) {
				this.boxWrapper.css(this.getStyle(a))
			};
			E.prototype.isHidden = function() {
				return !this.boxWrapper.getBBox().width
			};
			E.prototype.destroy = function() {
				var a = this.defs;
				this.box = null;
				this.boxWrapper = this.boxWrapper.destroy();
				e(this.gradients || {});
				this.gradients = null;
				a && (this.defs = a.destroy());
				this.unSubPixelFix && this.unSubPixelFix();
				return this.alignedObjects = null
			};
			E.prototype.createElement = function(a) {
				var b = new this.Element;
				b.init(this, a);
				return b
			};
			E.prototype.getRadialAttr = function(a, b) {
				return {
					cx: a[0] - a[2] / 2 + (b.cx || 0) * a[2],
					cy: a[1] - a[2] / 2 + (b.cy || 0) * a[2],
					r: (b.r || 0) * a[2]
				}
			};
			E.prototype.buildText = function(a) {
				(new x(a)).buildSVG()
			};
			E.prototype.getContrast = function(a) {
				a = g.parse(a).rgba.map(function(a) {
					a /= 255;
					return .03928 >= a ? a / 12.92 : Math.pow((a + .055) / 1.055, 2.4)
				});
				a = .2126 * a[0] + .7152 * a[1] + .0722 * a[2];
				return 1.05 / (a + .05) > (a + .05) / .05 ? "#FFFFFF" : "#000000"
			};
			E.prototype.button = function(a, k, e, m, n, E, c, u, f, l) {
				void 0 === n && (n = {});
				var h = this.label(a, k, e, f, void 0, void 0, l, void 0, "button"),
					F = this.styledMode;
				a = n.states || {};
				var N = 0;
				n = J(n);
				delete n.states;
				var P = J({
					color: "#333333",
					cursor: "pointer",
					fontWeight: "normal"
				}, n.style);
				delete n.style;
				var w =
					d.filterUserAttributes(n);
				h.attr(J({
					padding: 8,
					r: 2
				}, w));
				if (!F) {
					w = J({
						fill: "#f7f7f7",
						stroke: "#cccccc",
						"stroke-width": 1
					}, w);
					E = J(w, {
						fill: "#e6e6e6"
					}, d.filterUserAttributes(E || a.hover || {}));
					var q = E.style;
					delete E.style;
					c = J(w, {
						fill: "#e6ebf5",
						style: {
							color: "#000000",
							fontWeight: "bold"
						}
					}, d.filterUserAttributes(c || a.select || {}));
					var D = c.style;
					delete c.style;
					u = J(w, {
						style: {
							color: "#cccccc"
						}
					}, d.filterUserAttributes(u || a.disabled || {}));
					var g = u.style;
					delete u.style
				}
				K(h.element, p ? "mouseover" : "mouseenter", function() {
					3 !==
						N && h.setState(1)
				});
				K(h.element, p ? "mouseout" : "mouseleave", function() {
					3 !== N && h.setState(N)
				});
				h.setState = function(a) {
					1 !== a && (h.state = N = a);
					h.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass(
						"highcharts-button-" + ["normal", "hover", "pressed", "disabled"][
							a || 0
						]);
					F || (h.attr([w, E, c, u][a || 0]), a = [P, q, D, g][a || 0], v(a) && h.css(
						a))
				};
				F || (h.attr(w).css(b({
					cursor: "default"
				}, P)), l && h.text.css({
					pointerEvents: "none"
				}));
				return h.on("touchstart", function(a) {
					return a.stopPropagation()
				}).on("click",
					function(a) {
						3 !== N && m.call(h, a)
					})
			};
			E.prototype.crispLine = function(a, b, k) {
				void 0 === k && (k = "round");
				var e = a[0],
					n = a[1];
				m(e[1]) && e[1] === n[1] && (e[1] = n[1] = Math[k](e[1]) - b % 2 / 2);
				m(e[2]) && e[2] === n[2] && (e[2] = n[2] = Math[k](e[2]) + b % 2 / 2);
				return a
			};
			E.prototype.path = function(k) {
				var e = this.styledMode ? {} : {
					fill: "none"
				};
				a(k) ? e.d = k : v(k) && b(e, k);
				return this.createElement("path").attr(e)
			};
			E.prototype.circle = function(a, b, k) {
				a = v(a) ? a : "undefined" === typeof a ? {} : {
					x: a,
					y: b,
					r: k
				};
				b = this.createElement("circle");
				b.xSetter = b.ySetter =
					function(a, b, k) {
						k.setAttribute("c" + b, a)
					};
				return b.attr(a)
			};
			E.prototype.arc = function(a, b, k, e, m, n) {
				v(a) ? (e = a, b = e.y, k = e.r, a = e.x) : e = {
					innerR: e,
					start: m,
					end: n
				};
				a = this.symbol("arc", a, b, k, k, e);
				a.r = k;
				return a
			};
			E.prototype.rect = function(a, b, k, e, m, n) {
				m = v(a) ? a.r : m;
				var E = this.createElement("rect");
				a = v(a) ? a : "undefined" === typeof a ? {} : {
					x: a,
					y: b,
					width: Math.max(k, 0),
					height: Math.max(e, 0)
				};
				this.styledMode || ("undefined" !== typeof n && (a["stroke-width"] = n, a = E.crisp(
					a)), a.fill = "none");
				m && (a.r = m);
				E.rSetter = function(a, b, k) {
					E.r =
						a;
					w(k, {
						rx: a,
						ry: a
					})
				};
				E.rGetter = function() {
					return E.r || 0
				};
				return E.attr(a)
			};
			E.prototype.setSize = function(a, b, k) {
				this.width = a;
				this.height = b;
				this.boxWrapper.animate({
					width: a,
					height: b
				}, {
					step: function() {
						this.attr({
							viewBox: "0 0 " + this.attr("width") + " " + this
								.attr("height")
						})
					},
					duration: L(k, !0) ? void 0 : 0
				});
				this.alignElements()
			};
			E.prototype.g = function(a) {
				var b = this.createElement("g");
				return a ? b.attr({
					"class": "highcharts-" + a
				}) : b
			};
			E.prototype.image = function(a, b, e, m, n, E) {
				var v = {
						preserveAspectRatio: "none"
					},
					c = function(a,
						b) {
						a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href",
							b) : a.setAttribute("hc-svg-href", b)
					};
				k(b) && (v.x = b);
				k(e) && (v.y = e);
				k(m) && (v.width = m);
				k(n) && (v.height = n);
				var u = this.createElement("image").attr(v);
				b = function(b) {
					c(u.element, a);
					E.call(u, b)
				};
				E ? (c(u.element,
					"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
					), e = new H.Image, K(e, "load", b), e.src = a, e.complete && b({})) : c(u
					.element, a);
				return u
			};
			E.prototype.symbol = function(a, k, e, E, v, c) {
				var f = this,
					h = /^url\((.*?)\)$/,
					F = h.test(a),
					p = !F && (this.symbols[a] ? a : "circle"),
					P = p && this.symbols[p],
					d;
				if (P) {
					"number" === typeof k && (d = P.call(this.symbols, Math.round(k || 0), Math
						.round(e || 0), E || 0, v || 0, c));
					var N = this.path(d);
					f.styledMode || N.attr("fill", "none");
					b(N, {
						symbolName: p || void 0,
						x: k,
						y: e,
						width: E,
						height: v
					});
					c && b(N, c)
				} else if (F) {
					var q = a.match(h)[1];
					var D = N = this.image(q);
					D.imgwidth = L(G[q] && G[q].width, c && c.width);
					D.imgheight = L(G[q] && G[q].height, c && c.height);
					var J = function(a) {
						return a.attr({
							width: a.width,
							height: a.height
						})
					};
					["width",
						"height"
					].forEach(function(a) {
						D[a + "Setter"] = function(a, b) {
							this[b] = a;
							a = this.alignByTranslate;
							var k = this.element,
								e = this.width,
								n = this.height,
								E = this.imgwidth,
								v = this.imgheight,
								u = this["img" + b];
							if (m(u)) {
								var f = 1;
								c && "within" === c.backgroundSize && e && n ? (f = Math
									.min(e / E, n / v), u = Math.round(u * f), w(
									k, {
										width: Math.round(E * f),
										height: Math.round(v * f)
									})) : k && k.setAttribute(b, u);
								a || this.translate(((e || 0) - u * f) / 2, ((n || 0) -
									u * f) / 2)
							}
						}
					});
					m(k) && D.attr({
						x: k,
						y: e
					});
					D.isImg = !0;
					m(D.imgwidth) && m(D.imgheight) ? J(D) : (D.attr({
							width: 0,
							height: 0
						}),
						n("img", {
							onload: function() {
								var a = r[f.chartIndex];
								0 === this.width && (u(this, {
									position: "absolute",
									top: "-999em"
								}), l.body.appendChild(this));
								G[q] = {
									width: this.width,
									height: this.height
								};
								D.imgwidth = this.width;
								D.imgheight = this.height;
								D.element && J(D);
								this.parentNode && this.parentNode.removeChild(this);
								f.imgCount--;
								if (!f.imgCount && a && !a.hasLoaded) a.onload()
							},
							src: q
						}), this.imgCount++)
				}
				return N
			};
			E.prototype.clipRect = function(a, b, k, e) {
				var m = Q() + "-",
					n = this.createElement("clipPath").attr({
						id: m
					}).add(this.defs);
				a = this.rect(a,
					b, k, e, 0).add(n);
				a.id = m;
				a.clipPath = n;
				a.count = 0;
				return a
			};
			E.prototype.text = function(a, b, k, e) {
				var n = {};
				if (e && (this.allowHTML || !this.forExport)) return this.html(a, b, k);
				n.x = Math.round(b || 0);
				k && (n.y = Math.round(k));
				m(a) && (n.text = a);
				a = this.createElement("text").attr(n);
				if (!e || this.forExport && !this.allowHTML) a.xSetter = function(a, b, k) {
					for (var e = k.getElementsByTagName("tspan"), m = k.getAttribute(b), n = 0,
							E; n < e.length; n++) E = e[n], E.getAttribute(b) === m && E
						.setAttribute(b, a);
					k.setAttribute(b, a)
				};
				return a
			};
			E.prototype.fontMetrics =
				function(a, b) {
					a = !this.styledMode && /px/.test(a) || !H.getComputedStyle ? a || b && b.style && b
						.style.fontSize || this.style && this.style.fontSize : b && y.prototype.getStyle
						.call(b, "font-size");
					a = /px/.test(a) ? O(a) : 12;
					b = 24 > a ? a + 3 : Math.round(1.2 * a);
					return {
						h: b,
						b: Math.round(.8 * b),
						f: a
					}
				};
			E.prototype.rotCorr = function(a, b, k) {
				var e = a;
				b && k && (e = Math.max(e * Math.cos(b * h), 4));
				return {
					x: -a / 3 * Math.sin(b * h),
					y: e
				}
			};
			E.prototype.pathToSegments = function(a) {
				for (var b = [], e = [], m = {
						A: 8,
						C: 7,
						H: 2,
						L: 3,
						M: 3,
						Q: 5,
						S: 5,
						T: 3,
						V: 2
					}, n = 0; n < a.length; n++) F(e[0]) &&
					k(a[n]) && e.length === m[e[0].toUpperCase()] && a.splice(n, 0, e[0].replace(
						"M", "L").replace("m", "l")), "string" === typeof a[n] && (e.length && b
						.push(e.slice(0)), e.length = 0), e.push(a[n]);
				b.push(e.slice(0));
				return b
			};
			E.prototype.label = function(a, b, k, e, m, n, E, v, c) {
				return new C(this, a, b, k, e, m, n, E, v, c)
			};
			E.prototype.alignElements = function() {
				this.alignedObjects.forEach(function(a) {
					return a.align()
				})
			};
			return E
		}();
		b(z.prototype, {
			Element: y,
			SVG_NS: D,
			escapes: {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				"'": "&#39;",
				'"': "&quot;"
			},
			symbols: A,
			draw: c
		});
		B.registerRendererType("svg", z, !0);
		"";
		return z
	});
	I(g, "Core/Renderer/HTML/HTMLElement.js", [g["Core/Globals.js"], g["Core/Renderer/SVG/SVGElement.js"], g[
		"Core/Utilities.js"]], function(d, g, z) {
		var M = this && this.__extends || function() {
				var l = function(f, c) {
					l = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function(c, f) {
						c.__proto__ = f
					} || function(c, f) {
						for (var l in f) f.hasOwnProperty(l) && (c[l] = f[l])
					};
					return l(f, c)
				};
				return function(f, c) {
					function h() {
						this.constructor = f
					}
					l(f, c);
					f.prototype = null === c ?
						Object.create(c) : (h.prototype = c.prototype, new h)
				}
			}(),
			y = d.isFirefox,
			C = d.isMS,
			A = d.isWebKit,
			x = d.win,
			t = z.css,
			r = z.defined,
			h = z.extend,
			l = z.pick,
			q = z.pInt;
		return function(p) {
			function f() {
				return null !== p && p.apply(this, arguments) || this
			}
			M(f, p);
			f.compose = function(c) {
				if (-1 === f.composedClasses.indexOf(c)) {
					f.composedClasses.push(c);
					var l = f.prototype,
						h = c.prototype;
					h.getSpanCorrection = l.getSpanCorrection;
					h.htmlCss = l.htmlCss;
					h.htmlGetBBox = l.htmlGetBBox;
					h.htmlUpdateTransform = l.htmlUpdateTransform;
					h.setSpanRotation = l.setSpanRotation
				}
				return c
			};
			f.prototype.getSpanCorrection = function(c, f, l) {
				this.xCorr = -c * l;
				this.yCorr = -f
			};
			f.prototype.htmlCss = function(c) {
				var f = "SPAN" === this.element.tagName && c && "width" in c,
					p = l(f && c.width, void 0);
				if (f) {
					delete c.width;
					this.textWidth = p;
					var d = !0
				}
				c && "ellipsis" === c.textOverflow && (c.whiteSpace = "nowrap", c.overflow =
					"hidden");
				this.styles = h(this.styles, c);
				t(this.element, c);
				d && this.htmlUpdateTransform();
				return this
			};
			f.prototype.htmlGetBBox = function() {
				var c = this.element;
				return {
					x: c.offsetLeft,
					y: c.offsetTop,
					width: c.offsetWidth,
					height: c.offsetHeight
				}
			};
			f.prototype.htmlUpdateTransform = function() {
				if (this.added) {
					var c = this.renderer,
						f = this.element,
						l = this.translateX || 0,
						h = this.translateY || 0,
						p = this.x || 0,
						d = this.y || 0,
						n = this.textAlign || "left",
						u = {
							left: 0,
							center: .5,
							right: 1
						} [n],
						m = this.styles;
					m = m && m.whiteSpace;
					t(f, {
						marginLeft: l,
						marginTop: h
					});
					!c.styledMode && this.shadows && this.shadows.forEach(function(a) {
						t(a, {
							marginLeft: l + 1,
							marginTop: h + 1
						})
					});
					this.inverted && [].forEach.call(f.childNodes, function(a) {
						c.invertChild(a, f)
					});
					if ("SPAN" === f.tagName) {
						var e =
							this.rotation,
							b = this.textWidth && q(this.textWidth),
							a = [e, n, f.innerHTML, this.textWidth, this.textAlign].join(),
							k = void 0;
						k = !1;
						if (b !== this.oldTextWidth) {
							if (this.textPxLength) var v = this.textPxLength;
							else t(f, {
								width: "",
								whiteSpace: m || "nowrap"
							}), v = f.offsetWidth;
							(b > this.oldTextWidth || v > b) && (/[ \-]/.test(f.textContent || f
								.innerText) || "ellipsis" === f.style.textOverflow) && (t(f, {
								width: v > b || e ? b + "px" : "auto",
								display: "block",
								whiteSpace: m || "normal"
							}), this.oldTextWidth = b, k = !0)
						}
						this.hasBoxWidthChanged = k;
						a !== this.cTT && (k =
							c.fontMetrics(f.style.fontSize, f).b, !r(e) || e === (this
								.oldRotation || 0) && n === this.oldAlign || this
							.setSpanRotation(e, u, k), this.getSpanCorrection(!r(e) && this
								.textPxLength || f.offsetWidth, k, u, e, n));
						t(f, {
							left: p + (this.xCorr || 0) + "px",
							top: d + (this.yCorr || 0) + "px"
						});
						this.cTT = a;
						this.oldRotation = e;
						this.oldAlign = n
					}
				} else this.alignOnAdd = !0
			};
			f.prototype.setSpanRotation = function(c, f, l) {
				var h = {},
					p = C && !/Edge/.test(x.navigator.userAgent) ? "-ms-transform" : A ?
					"-webkit-transform" : y ? "MozTransform" : x.opera ? "-o-transform" : void 0;
				p && (h[p] = h.transform = "rotate(" + c + "deg)", h[p + (y ? "Origin" :
					"-origin")] = h.transformOrigin = 100 * f + "% " + l + "px", t(this.element,
						h))
			};
			f.composedClasses = [];
			return f
		}(g)
	});
	I(g, "Core/Renderer/HTML/HTMLRenderer.js", [g["Core/Renderer/HTML/AST.js"], g[
		"Core/Renderer/SVG/SVGElement.js"], g["Core/Renderer/SVG/SVGRenderer.js"], g["Core/Utilities.js"]
	], function(d, g, z, B) {
		var M = this && this.__extends || function() {
				var d = function(h, l) {
					d = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function(l, h) {
						l.__proto__ = h
					} || function(l,
						h) {
						for (var f in h) h.hasOwnProperty(f) && (l[f] = h[f])
					};
					return d(h, l)
				};
				return function(h, l) {
					function q() {
						this.constructor = h
					}
					d(h, l);
					h.prototype = null === l ? Object.create(l) : (q.prototype = l.prototype, new q)
				}
			}(),
			C = B.attr,
			A = B.createElement,
			x = B.extend,
			t = B.pick;
		return function(r) {
			function h() {
				return null !== r && r.apply(this, arguments) || this
			}
			M(h, r);
			h.compose = function(l) {
				-1 === h.composedClasses.indexOf(l) && (h.composedClasses.push(l), l.prototype
					.html = h.prototype.html);
				return l
			};
			h.prototype.html = function(l, h, p) {
				var f =
					this.createElement("span"),
					c = f.element,
					q = f.renderer,
					G = q.isSVG,
					r = function(c, f) {
						["opacity", "visibility"].forEach(function(n) {
							c[n + "Setter"] = function(u, m, e) {
								var b = c.div ? c.div.style : f;
								g.prototype[n + "Setter"].call(this, u, m, e);
								b && (b[m] = u)
							}
						});
						c.addedSetters = !0
					};
				f.textSetter = function(c) {
					c !== this.textStr && (delete this.bBox, delete this.oldTextWidth, d
						.setElementHTML(this.element, t(c, "")), this.textStr = c, f
						.doTransform = !0)
				};
				G && r(f, f.element.style);
				f.xSetter = f.ySetter = f.alignSetter = f.rotationSetter = function(c, l) {
					"align" ===
					l ? f.alignValue = f.textAlign = c : f[l] = c;
					f.doTransform = !0
				};
				f.afterSetters = function() {
					this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
				};
				f.attr({
					text: l,
					x: Math.round(h),
					y: Math.round(p)
				}).css({
					position: "absolute"
				});
				q.styledMode || f.css({
					fontFamily: this.style.fontFamily,
					fontSize: this.style.fontSize
				});
				c.style.whiteSpace = "nowrap";
				f.css = f.htmlCss;
				G && (f.add = function(l) {
					var h = q.box.parentNode,
						n = [];
					if (this.parentGroup = l) {
						var u = l.div;
						if (!u) {
							for (; l;) n.push(l), l = l.parentGroup;
							n.reverse().forEach(function(m) {
								function e(a,
									b) {
									m[b] = a;
									"translateX" === b ? k.left = a + "px" : k.top =
										a + "px";
									m.doTransform = !0
								}
								var b = C(m.element, "class"),
									a = m.styles || {};
								u = m.div = m.div || A("div", b ? {
									className: b
								} : void 0, {
									position: "absolute",
									left: (m.translateX || 0) + "px",
									top: (m.translateY || 0) + "px",
									display: m.display,
									opacity: m.opacity,
									cursor: a.cursor,
									pointerEvents: a.pointerEvents,
									visibility: m.visibility
								}, u || h);
								var k = u.style;
								x(m, {
									classSetter: function(a) {
										return function(b) {
											this.element
												.setAttribute(
													"class", b);
											a.className = b
										}
									}(u),
									on: function() {
										n[0].div && f.on.apply({
											element: n[0].div,
											onEvents: m.onEvents
										}, arguments);
										return m
									},
									translateXSetter: e,
									translateYSetter: e
								});
								m.addedSetters || r(m)
							})
						}
					} else u = h;
					u.appendChild(c);
					f.added = !0;
					f.alignOnAdd && f.htmlUpdateTransform();
					return f
				});
				return f
			};
			h.composedClasses = [];
			return h
		}(z)
	});
	I(g, "Core/Axis/AxisDefaults.js", [], function() {
		var d;
		(function(d) {
			d.defaultXAxisOptions = {
				alignTicks: !0,
				allowDecimals: void 0,
				panningEnabled: !0,
				zIndex: 2,
				zoomEnabled: !0,
				dateTimeLabelFormats: {
					millisecond: {
						main: "%H:%M:%S.%L",
						range: !1
					},
					second: {
						main: "%H:%M:%S",
						range: !1
					},
					minute: {
						main: "%H:%M",
						range: !1
					},
					hour: {
						main: "%H:%M",
						range: !1
					},
					day: {
						main: "%e. %b"
					},
					week: {
						main: "%e. %b"
					},
					month: {
						main: "%b '%y"
					},
					year: {
						main: "%Y"
					}
				},
				endOnTick: !1,
				gridLineDashStyle: "Solid",
				gridZIndex: 1,
				labels: {
					autoRotation: void 0,
					autoRotationLimit: 80,
					distance: void 0,
					enabled: !0,
					indentation: 10,
					overflow: "justify",
					padding: 5,
					reserveSpace: void 0,
					rotation: void 0,
					staggerLines: 0,
					step: 0,
					useHTML: !1,
					x: 0,
					zIndex: 7,
					style: {
						color: "#666666",
						cursor: "default",
						fontSize: "11px"
					}
				},
				maxPadding: .01,
				minorGridLineDashStyle: "Solid",
				minorTickLength: 2,
				minorTickPosition: "outside",
				minPadding: .01,
				offset: void 0,
				opposite: !1,
				reversed: void 0,
				reversedStacks: !1,
				showEmpty: !0,
				showFirstLabel: !0,
				showLastLabel: !0,
				startOfWeek: 1,
				startOnTick: !1,
				tickLength: 10,
				tickPixelInterval: 100,
				tickmarkPlacement: "between",
				tickPosition: "outside",
				title: {
					align: "middle",
					rotation: 0,
					useHTML: !1,
					x: 0,
					y: 0,
					style: {
						color: "#666666"
					}
				},
				type: "linear",
				uniqueNames: !0,
				visible: !0,
				minorGridLineColor: "#f2f2f2",
				minorGridLineWidth: 1,
				minorTickColor: "#999999",
				lineColor: "#ccd6eb",
				lineWidth: 1,
				gridLineColor: "#e6e6e6",
				gridLineWidth: void 0,
				tickColor: "#ccd6eb"
			};
			d.defaultYAxisOptions = {
				reversedStacks: !0,
				endOnTick: !0,
				maxPadding: .05,
				minPadding: .05,
				tickPixelInterval: 72,
				showLastLabel: !0,
				labels: {
					x: -8
				},
				startOnTick: !0,
				title: {
					rotation: 270,
					text: "Values"
				},
				stackLabels: {
					animation: {},
					allowOverlap: !1,
					enabled: !1,
					crop: !0,
					overflow: "justify",
					formatter: function() {
						var d = this.axis.chart.numberFormatter;
						return d(this.total || 0, -1)
					},
					style: {
						color: "#000000",
						fontSize: "11px",
						fontWeight: "bold",
						textOutline: "1px contrast"
					}
				},
				gridLineWidth: 1,
				lineWidth: 0
			};
			d.defaultLeftAxisOptions = {
				labels: {
					x: -15
				},
				title: {
					rotation: 270
				}
			};
			d.defaultRightAxisOptions = {
				labels: {
					x: 15
				},
				title: {
					rotation: 90
				}
			};
			d.defaultBottomAxisOptions = {
				labels: {
					autoRotation: [-45],
					x: 0
				},
				margin: 15,
				title: {
					rotation: 0
				}
			};
			d.defaultTopAxisOptions = {
				labels: {
					autoRotation: [-45],
					x: 0
				},
				margin: 15,
				title: {
					rotation: 0
				}
			}
		})(d || (d = {}));
		return d
	});
	I(g, "Core/Foundation.js", [g["Core/Utilities.js"]], function(d) {
		var g = d.addEvent,
			z = d.isFunction,
			B = d.objectEach,
			y = d.removeEvent,
			C;
		(function(d) {
			d.registerEventOptions = function(d, t) {
				d.eventOptions =
					d.eventOptions || {};
				B(t.events, function(r, h) {
					d.eventOptions[h] !== r && (d.eventOptions[h] && (y(d, h, d
						.eventOptions[h]), delete d.eventOptions[h]), z(r) && (d
						.eventOptions[h] = r, g(d, h, r)))
				})
			}
		})(C || (C = {}));
		return C
	});
	I(g, "Core/Axis/Tick.js", [g["Core/FormatUtilities.js"], g["Core/Globals.js"], g["Core/Utilities.js"]],
		function(d, g, z) {
			var M = g.deg2rad,
				y = z.clamp,
				C = z.correctFloat,
				A = z.defined,
				x = z.destroyObjectProperties,
				t = z.extend,
				r = z.fireEvent,
				h = z.isNumber,
				l = z.merge,
				q = z.objectEach,
				p = z.pick;
			g = function() {
				function f(c, f,
					l, h, d) {
					this.isNewLabel = this.isNew = !0;
					this.axis = c;
					this.pos = f;
					this.type = l || "";
					this.parameters = d || {};
					this.tickmarkOffset = this.parameters.tickmarkOffset;
					this.options = this.parameters.options;
					r(this, "init");
					l || h || this.addLabel()
				}
				f.prototype.addLabel = function() {
					var c = this,
						f = c.axis,
						l = f.options,
						q = f.chart,
						g = f.categories,
						w = f.logarithmic,
						n = f.names,
						u = c.pos,
						m = p(c.options && c.options.labels, l.labels),
						e = f.tickPositions,
						b = u === e[0],
						a = u === e[e.length - 1],
						k = (!m.step || 1 === m.step) && 1 === f.tickInterval;
					e = e.info;
					var v = c.label,
						F;
					g = this.parameters.category || (g ? p(g[u], n[u], u) : u);
					w && h(g) && (g = C(w.lin2log(g)));
					if (f.dateTime)
						if (e) {
							var J = q.time.resolveDTLFormat(l.dateTimeLabelFormats[!l.grid && e
								.higherRanks[u] || e.unitName]);
							var L = J.main
						} else h(g) && (L = f.dateTime.getXDateFormat(g, l.dateTimeLabelFormats || {}));
					c.isFirst = b;
					c.isLast = a;
					var O = {
						axis: f,
						chart: q,
						dateTimeLabelFormat: L,
						isFirst: b,
						isLast: a,
						pos: u,
						tick: c,
						tickPositionInfo: e,
						value: g
					};
					r(this, "labelFormat", O);
					var Q = function(a) {
						return m.formatter ? m.formatter.call(a, a) : m.format ? (a.text =
								f.defaultLabelFormatter.call(a, a), d.format(m.format, a, q)) : f
							.defaultLabelFormatter.call(a, a)
					};
					l = Q.call(O, O);
					var T = J && J.list;
					c.shortenLabel = T ? function() {
						for (F = 0; F < T.length; F++)
							if (t(O, {
									dateTimeLabelFormat: T[F]
								}), v.attr({
									text: Q.call(O, O)
								}), v.getBBox().width < f.getSlotWidth(c) - 2 * m.padding) return;
						v.attr({
							text: ""
						})
					} : void 0;
					k && f._addedPlotLB && c.moveLabel(l, m);
					A(v) || c.movedLabel ? v && v.textStr !== l && !k && (!v.textWidth || m.style
							.width || v.styles.width || v.css({
								width: null
							}), v.attr({
								text: l
							}), v.textPxLength = v.getBBox().width) :
						(c.label = v = c.createLabel({
							x: 0,
							y: 0
						}, l, m), c.rotation = 0)
				};
				f.prototype.createLabel = function(c, f, h) {
					var d = this.axis,
						p = d.chart;
					if (c = A(f) && h.enabled ? p.renderer.text(f, c.x, c.y, h.useHTML).add(d
							.labelGroup) : null) p.styledMode || c.css(l(h.style)), c.textPxLength = c
						.getBBox().width;
					return c
				};
				f.prototype.destroy = function() {
					x(this, this.axis)
				};
				f.prototype.getPosition = function(c, f, l, h) {
					var d = this.axis,
						p = d.chart,
						n = h && p.oldChartHeight || p.chartHeight;
					c = {
						x: c ? C(d.translate(f + l, void 0, void 0, h) + d.transB) : d.left + d
							.offset + (d.opposite ?
								(h && p.oldChartWidth || p.chartWidth) - d.right - d.left : 0),
						y: c ? n - d.bottom + d.offset - (d.opposite ? d.height : 0) : C(n - d
							.translate(f + l, void 0, void 0, h) - d.transB)
					};
					c.y = y(c.y, -1E5, 1E5);
					r(this, "afterGetPosition", {
						pos: c
					});
					return c
				};
				f.prototype.getLabelPosition = function(c, f, l, h, d, p, n, u) {
					var m = this.axis,
						e = m.transA,
						b = m.isLinked && m.linkedParent ? m.linkedParent.reversed : m.reversed,
						a = m.staggerLines,
						k = m.tickRotCorr || {
							x: 0,
							y: 0
						},
						v = h || m.reserveSpaceDefault ? 0 : -m.labelOffset * ("center" === m
							.labelAlign ? .5 : 1),
						F = {};
					l = 0 === m.side ? l.rotation ?
						-8 : -l.getBBox().height : 2 === m.side ? k.y + 8 : Math.cos(l.rotation * M) * (
							k.y - l.getBBox(!1, 0).height / 2);
					A(d.y) && (l = 0 === m.side && m.horiz ? d.y + l : d.y);
					c = c + d.x + v + k.x - (p && h ? p * e * (b ? -1 : 1) : 0);
					f = f + l - (p && !h ? p * e * (b ? 1 : -1) : 0);
					a && (h = n / (u || 1) % a, m.opposite && (h = a - h - 1), f += m.labelOffset / a *
						h);
					F.x = c;
					F.y = Math.round(f);
					r(this, "afterGetLabelPosition", {
						pos: F,
						tickmarkOffset: p,
						index: n
					});
					return F
				};
				f.prototype.getLabelSize = function() {
					return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
				};
				f.prototype.getMarkPath = function(c,
					f, l, h, d, p) {
					return p.crispLine([
						["M", c, f],
						["L", c + (d ? 0 : -l), f + (d ? l : 0)]
					], h)
				};
				f.prototype.handleOverflow = function(c) {
					var f = this.axis,
						l = f.options.labels,
						h = c.x,
						d = f.chart.chartWidth,
						w = f.chart.spacing,
						n = p(f.labelLeft, Math.min(f.pos, w[3]));
					w = p(f.labelRight, Math.max(f.isRadial ? 0 : f.pos + f.len, d - w[1]));
					var u = this.label,
						m = this.rotation,
						e = {
							left: 0,
							center: .5,
							right: 1
						} [f.labelAlign || u.attr("align")],
						b = u.getBBox().width,
						a = f.getSlotWidth(this),
						k = {},
						v = a,
						F = 1,
						q;
					if (m || "justify" !== l.overflow) 0 > m && h - e * b < n ? q = Math.round(h / Math
						.cos(m *
							M) - n) : 0 < m && h + e * b > w && (q = Math.round((d - h) / Math.cos(
						m * M)));
					else if (d = h + (1 - e) * b, h - e * b < n ? v = c.x + v * (1 - e) - n : d > w && (
							v = w - c.x + v * e, F = -1), v = Math.min(a, v), v < a && "center" === f
						.labelAlign && (c.x += F * (a - v - e * (a - Math.min(b, v)))), b > v || f
						.autoRotation && (u.styles || {}).width) q = v;
					q && (this.shortenLabel ? this.shortenLabel() : (k.width = Math.floor(q) + "px", (l
						.style || {}).textOverflow || (k.textOverflow = "ellipsis"), u.css(
						k)))
				};
				f.prototype.moveLabel = function(c, f) {
					var l = this,
						h = l.label,
						d = l.axis,
						p = d.reversed,
						n = !1;
					h && h.textStr === c ? (l.movedLabel =
						h, n = !0, delete l.label) : q(d.ticks, function(m) {
						n || m.isNew || m === l || !m.label || m.label.textStr !== c || (l
							.movedLabel = m.label, n = !0, m.labelPos = l.movedLabel.xy,
							delete m.label)
					});
					if (!n && (l.labelPos || h)) {
						var u = l.labelPos || h.xy;
						h = d.horiz ? p ? 0 : d.width + d.left : u.x;
						d = d.horiz ? u.y : p ? d.width + d.left : 0;
						l.movedLabel = l.createLabel({
							x: h,
							y: d
						}, c, f);
						l.movedLabel && l.movedLabel.attr({
							opacity: 0
						})
					}
				};
				f.prototype.render = function(c, f, l) {
					var h = this.axis,
						d = h.horiz,
						w = this.pos,
						n = p(this.tickmarkOffset, h.tickmarkOffset);
					w = this.getPosition(d,
						w, n, f);
					n = w.x;
					var u = w.y;
					h = d && n === h.pos + h.len || !d && u === h.pos ? -1 : 1;
					d = p(l, this.label && this.label.newOpacity, 1);
					l = p(l, 1);
					this.isActive = !0;
					this.renderGridLine(f, l, h);
					this.renderMark(w, l, h);
					this.renderLabel(w, f, d, c);
					this.isNew = !1;
					r(this, "afterRender")
				};
				f.prototype.renderGridLine = function(c, f, l) {
					var h = this.axis,
						d = h.options,
						w = {},
						n = this.pos,
						u = this.type,
						m = p(this.tickmarkOffset, h.tickmarkOffset),
						e = h.chart.renderer,
						b = this.gridLine,
						a = d.gridLineWidth,
						k = d.gridLineColor,
						v = d.gridLineDashStyle;
					"minor" === this.type &&
						(a = d.minorGridLineWidth, k = d.minorGridLineColor, v = d
							.minorGridLineDashStyle);
					b || (h.chart.styledMode || (w.stroke = k, w["stroke-width"] = a || 0, w.dashstyle =
							v), u || (w.zIndex = 1), c && (f = 0), this.gridLine = b = e.path()
						.attr(w).addClass("highcharts-" + (u ? u + "-" : "") + "grid-line").add(h
							.gridGroup));
					if (b && (l = h.getPlotLinePath({
							value: n + m,
							lineWidth: b.strokeWidth() * l,
							force: "pass",
							old: c
						}))) b[c || this.isNew ? "attr" : "animate"]({
						d: l,
						opacity: f
					})
				};
				f.prototype.renderMark = function(c, f, l) {
					var h = this.axis,
						d = h.options,
						w = h.chart.renderer,
						n =
						this.type,
						u = h.tickSize(n ? n + "Tick" : "tick"),
						m = c.x;
					c = c.y;
					var e = p(d["minor" !== n ? "tickWidth" : "minorTickWidth"], !n && h.isXAxis ? 1 :
						0);
					d = d["minor" !== n ? "tickColor" : "minorTickColor"];
					var b = this.mark,
						a = !b;
					u && (h.opposite && (u[0] = -u[0]), b || (this.mark = b = w.path().addClass(
							"highcharts-" + (n ? n + "-" : "") + "tick").add(h.axisGroup), h
						.chart.styledMode || b.attr({
							stroke: d,
							"stroke-width": e
						})), b[a ? "attr" : "animate"]({
						d: this.getMarkPath(m, c, u[0], b.strokeWidth() * l, h.horiz, w),
						opacity: f
					}))
				};
				f.prototype.renderLabel = function(c, f, l, d) {
					var q =
						this.axis,
						w = q.horiz,
						n = q.options,
						u = this.label,
						m = n.labels,
						e = m.step;
					q = p(this.tickmarkOffset, q.tickmarkOffset);
					var b = c.x;
					c = c.y;
					var a = !0;
					u && h(b) && (u.xy = c = this.getLabelPosition(b, c, u, w, m, q, d, e), this
						.isFirst && !this.isLast && !n.showFirstLabel || this.isLast && !this
						.isFirst && !n.showLastLabel ? a = !1 : !w || m.step || m.rotation || f ||
						0 === l || this.handleOverflow(c), e && d % e && (a = !1), a && h(c.y) ? (c
							.opacity = l, u[this.isNewLabel ? "attr" : "animate"](c).show(!0), this
							.isNewLabel = !1) : (u.hide(), this.isNewLabel = !0))
				};
				f.prototype.replaceMovedLabel =
					function() {
						var c = this.label,
							f = this.axis,
							l = f.reversed;
						if (c && !this.isNew) {
							var h = f.horiz ? l ? f.left : f.width + f.left : c.xy.x;
							l = f.horiz ? c.xy.y : l ? f.width + f.top : f.top;
							c.animate({
								x: h,
								y: l,
								opacity: 0
							}, void 0, c.destroy);
							delete this.label
						}
						f.isDirty = !0;
						this.label = this.movedLabel;
						delete this.movedLabel
					};
				return f
			}();
			"";
			return g
		});
	I(g, "Core/Axis/Axis.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/Axis/AxisDefaults.js"], g[
			"Core/Color/Color.js"], g["Core/Defaults.js"], g["Core/Foundation.js"], g["Core/Globals.js"],
		g["Core/Axis/Tick.js"], g["Core/Utilities.js"]
	], function(d, g, z, B, y, C, A, x) {
		var t = d.animObject,
			r = B.defaultOptions,
			h = y.registerEventOptions,
			l = C.deg2rad,
			q = x.arrayMax,
			p = x.arrayMin,
			f = x.clamp,
			c = x.correctFloat,
			D = x.defined,
			G = x.destroyObjectProperties,
			H = x.erase,
			K = x.error,
			w = x.extend,
			n = x.fireEvent,
			u = x.isArray,
			m = x.isNumber,
			e = x.isString,
			b = x.merge,
			a = x.normalizeTickInterval,
			k = x.objectEach,
			v = x.pick,
			F = x.relativeLength,
			J = x.removeEvent,
			L = x.splat,
			O = x.syncTimeout,
			Q = function(b, k) {
				return a(k, void 0, void 0, v(b.options.allowDecimals,
					.5 > k || void 0 !== b.tickAmount), !!b.tickAmount)
			};
		d = function() {
			function a(a, b) {
				this.zoomEnabled = this.width = this.visible = this.userOptions = this
					.translationSlope = this.transB = this.transA = this.top = this.ticks = this
					.tickRotCorr = this.tickPositions = this.tickmarkOffset = this.tickInterval = this
					.tickAmount = this.side = this.series = this.right = this.positiveValuesOnly = this
					.pos = this.pointRangePadding = this.pointRange = this.plotLinesAndBandsGroups =
					this.plotLinesAndBands = this.paddedTicks = this.overlap = this.options = this
					.offset =
					this.names = this.minPixelPadding = this.minorTicks = this.minorTickInterval = this
					.min = this.maxLabelLength = this.max = this.len = this.left = this.labelFormatter =
					this.labelEdge = this.isLinked = this.height = this.hasVisibleSeries = this
					.hasNames = this.eventOptions = this.coll = this.closestPointRange = this.chart =
					this.bottom = this.alternateBands = void 0;
				this.init(a, b)
			}
			a.prototype.init = function(a, b) {
				var k = b.isX;
				this.chart = a;
				this.horiz = a.inverted && !this.isZAxis ? !k : k;
				this.isXAxis = k;
				this.coll = this.coll || (k ? "xAxis" : "yAxis");
				n(this,
					"init", {
						userOptions: b
					});
				this.opposite = v(b.opposite, this.opposite);
				this.side = v(b.side, this.side, this.horiz ? this.opposite ? 0 : 2 : this
					.opposite ? 1 : 3);
				this.setOptions(b);
				var e = this.options,
					E = e.labels,
					c = e.type;
				this.userOptions = b;
				this.minPixelPadding = 0;
				this.reversed = v(e.reversed, this.reversed);
				this.visible = e.visible;
				this.zoomEnabled = e.zoomEnabled;
				this.hasNames = "category" === c || !0 === e.categories;
				this.categories = e.categories || (this.hasNames ? [] : void 0);
				this.names || (this.names = [], this.names.keys = {});
				this.plotLinesAndBandsGroups = {};
				this.positiveValuesOnly = !!this.logarithmic;
				this.isLinked = D(e.linkedTo);
				this.ticks = {};
				this.labelEdge = [];
				this.minorTicks = {};
				this.plotLinesAndBands = [];
				this.alternateBands = {};
				this.len = 0;
				this.minRange = this.userMinRange = e.minRange || e.maxZoom;
				this.range = e.range;
				this.offset = e.offset || 0;
				this.min = this.max = null;
				b = v(e.crosshair, L(a.options.tooltip.crosshairs)[k ? 0 : 1]);
				this.crosshair = !0 === b ? {} : b; - 1 === a.axes.indexOf(this) && (k ? a.axes
					.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(
						this));
				this.series =
					this.series || [];
				a.inverted && !this.isZAxis && k && "undefined" === typeof this.reversed && (this
					.reversed = !0);
				this.labelRotation = m(E.rotation) ? E.rotation : void 0;
				h(this, e);
				n(this, "afterInit")
			};
			a.prototype.setOptions = function(a) {
				this.options = b(g.defaultXAxisOptions, "yAxis" === this.coll && g
					.defaultYAxisOptions, [g.defaultTopAxisOptions, g.defaultRightAxisOptions, g
						.defaultBottomAxisOptions, g.defaultLeftAxisOptions
					][this.side], b(r[this.coll], a));
				n(this, "afterSetOptions", {
					userOptions: a
				})
			};
			a.prototype.defaultLabelFormatter =
				function(a) {
					var b = this.axis;
					a = this.chart.numberFormatter;
					var k = m(this.value) ? this.value : NaN,
						e = b.chart.time,
						n = this.dateTimeLabelFormat,
						E = r.lang,
						v = E.numericSymbols;
					E = E.numericSymbolMagnitude || 1E3;
					var c = b.logarithmic ? Math.abs(k) : b.tickInterval,
						f = v && v.length;
					if (b.categories) var l = "".concat(this.value);
					else if (n) l = e.dateFormat(n, k);
					else if (f && 1E3 <= c)
						for (; f-- && "undefined" === typeof l;) b = Math.pow(E, f + 1), c >= b && 0 ===
							10 * k % b && null !== v[f] && 0 !== k && (l = a(k / b, -1) + v[f]);
					"undefined" === typeof l && (l = 1E4 <= Math.abs(k) ? a(k,
						-1) : a(k, -1, void 0, ""));
					return l
				};
			a.prototype.getSeriesExtremes = function() {
				var a = this,
					b = a.chart,
					k;
				n(this, "getSeriesExtremes", null, function() {
					a.hasVisibleSeries = !1;
					a.dataMin = a.dataMax = a.threshold = null;
					a.softThreshold = !a.isXAxis;
					a.stacking && a.stacking.buildStacks();
					a.series.forEach(function(e) {
						if (e.visible || !b.options.chart.ignoreHiddenSeries) {
							var n = e.options,
								E = n.threshold;
							a.hasVisibleSeries = !0;
							a.positiveValuesOnly && 0 >= E && (E = null);
							if (a.isXAxis) {
								if (n = e.xData, n.length) {
									n = a.logarithmic ? n.filter(a
											.validatePositiveValue) :
										n;
									k = e.getXExtremes(n);
									var c = k.min;
									var f = k.max;
									m(c) || c instanceof Date || (n = n.filter(m),
										k = e.getXExtremes(n), c = k.min, f = k
										.max);
									n.length && (a.dataMin = Math.min(v(a.dataMin,
										c), c), a.dataMax = Math.max(v(a
										.dataMax, f), f))
								}
							} else if (e = e.applyExtremes(), m(e.dataMin) && (c = e
									.dataMin, a.dataMin = Math.min(v(a.dataMin, c),
										c)), m(e.dataMax) && (f = e.dataMax, a
									.dataMax = Math.max(v(a.dataMax, f), f)), D(
								E) && (a.threshold = E), !n.softThreshold || a
								.positiveValuesOnly) a.softThreshold = !1
						}
					})
				});
				n(this, "afterGetSeriesExtremes")
			};
			a.prototype.translate =
				function(a, b, k, e, n, v) {
					var E = this.linkedParent || this,
						f = e && E.old ? E.old.min : E.min;
					if (!m(f)) return NaN;
					var l = E.minPixelPadding;
					n = (E.isOrdinal || E.brokenAxis && E.brokenAxis.hasBreaks || E.logarithmic && n) &&
						E.lin2val;
					var h = 1,
						u = 0;
					e = e && E.old ? E.old.transA : E.transA;
					e || (e = E.transA);
					k && (h *= -1, u = E.len);
					E.reversed && (h *= -1, u -= h * (E.sector || E.len));
					b ? (v = (a * h + u - l) / e + f, n && (v = E.lin2val(v))) : (n && (a = E.val2lin(
						a)), a = h * (a - f) * e, v = (E.isRadial ? a : c(a)) + u + h * l + (m(
						v) ? e * v : 0));
					return v
				};
			a.prototype.toPixels = function(a, b) {
				return this.translate(a,
					!1, !this.horiz, void 0, !0) + (b ? 0 : this.pos)
			};
			a.prototype.toValue = function(a, b) {
				return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, void 0, !0)
			};
			a.prototype.getPlotLinePath = function(a) {
				function b(a, b, k) {
					if ("pass" !== w && a < b || a > k) w ? a = f(a, b, k) : r = !0;
					return a
				}
				var k = this,
					e = k.chart,
					c = k.left,
					E = k.top,
					l = a.old,
					h = a.value,
					u = a.lineWidth,
					d = l && e.oldChartHeight || e.chartHeight,
					F = l && e.oldChartWidth || e.chartWidth,
					p = k.transB,
					q = a.translatedValue,
					w = a.force,
					g, J, D, L, r;
				a = {
					value: h,
					lineWidth: u,
					old: l,
					force: w,
					acrossPanes: a.acrossPanes,
					translatedValue: q
				};
				n(this, "getPlotLinePath", a, function(a) {
					q = v(q, k.translate(h, void 0, void 0, l));
					q = f(q, -1E5, 1E5);
					g = D = Math.round(q + p);
					J = L = Math.round(d - q - p);
					m(q) ? k.horiz ? (J = E, L = d - k.bottom, g = D = b(g, c, c + k
						.width)) : (g = c, D = F - k.right, J = L = b(J, E, E + k.height)) :
						(r = !0, w = !1);
					a.path = r && !w ? null : e.renderer.crispLine([
						["M", g, J],
						["L", D, L]
					], u || 1)
				});
				return a.path
			};
			a.prototype.getLinearTickPositions = function(a, b, k) {
				var e = c(Math.floor(b / a) * a);
				k = c(Math.ceil(k / a) * a);
				var m = [],
					n;
				c(e + a) === e && (n = 20);
				if (this.single) return [b];
				for (b =
					e; b <= k;) {
					m.push(b);
					b = c(b + a, n);
					if (b === v) break;
					var v = b
				}
				return m
			};
			a.prototype.getMinorTickInterval = function() {
				var a = this.options;
				return !0 === a.minorTicks ? v(a.minorTickInterval, "auto") : !1 === a.minorTicks ?
					null : a.minorTickInterval
			};
			a.prototype.getMinorTickPositions = function() {
				var a = this.options,
					b = this.tickPositions,
					k = this.minorTickInterval,
					e = this.pointRangePadding || 0,
					m = this.min - e;
				e = this.max + e;
				var n = e - m,
					v = [];
				if (n && n / k < this.len / 3) {
					var c = this.logarithmic;
					if (c) this.paddedTicks.forEach(function(a, b, e) {
						b && v.push.apply(v,
							c.getLogTickPositions(k, e[b - 1], e[b], !0))
					});
					else if (this.dateTime && "auto" === this.getMinorTickInterval()) v = v.concat(
						this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(k), m, e, a
							.startOfWeek));
					else
						for (a = m + (b[0] - m) % k; a <= e && a !== v[0]; a += k) v.push(a)
				}
				0 !== v.length && this.trimTicks(v);
				return v
			};
			a.prototype.adjustForMinRange = function() {
				var a = this.options,
					b = this.logarithmic,
					k = this.min,
					e = this.max,
					m = 0,
					n, c, f, l;
				this.isXAxis && "undefined" === typeof this.minRange && !b && (D(a.min) || D(a
					.max) || D(a.floor) || D(a.ceiling) ?
					this.minRange = null : (this.series.forEach(function(a) {
						f = a.xData;
						l = a.xIncrement ? 1 : f.length - 1;
						if (1 < f.length)
							for (n = l; 0 < n; n--)
								if (c = f[n] - f[n - 1], !m || c < m) m = c
					}), this.minRange = Math.min(5 * m, this.dataMax - this.dataMin)));
				if (e - k < this.minRange) {
					var h = this.dataMax - this.dataMin >= this.minRange;
					var u = this.minRange;
					var d = (u - e + k) / 2;
					d = [k - d, v(a.min, k - d)];
					h && (d[2] = this.logarithmic ? this.logarithmic.log2lin(this.dataMin) : this
						.dataMin);
					k = q(d);
					e = [k + u, v(a.max, k + u)];
					h && (e[2] = b ? b.log2lin(this.dataMax) : this.dataMax);
					e = p(e);
					e - k < u &&
						(d[0] = e - u, d[1] = v(a.min, e - u), k = q(d))
				}
				this.min = k;
				this.max = e
			};
			a.prototype.getClosest = function() {
				var a;
				this.categories ? a = 1 : this.series.forEach(function(b) {
					var k = b.closestPointRange,
						e = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
					!b.noSharedTooltip && D(k) && e && (a = D(a) ? Math.min(a, k) : k)
				});
				return a
			};
			a.prototype.nameToX = function(a) {
				var b = u(this.options.categories),
					k = b ? this.categories : this.names,
					e = a.options.x;
				a.series.requireSorting = !1;
				D(e) || (e = this.options.uniqueNames && k ? b ? k.indexOf(a.name) : v(k.keys[a
						.name],
					-1) : a.series.autoIncrement());
				if (-1 === e) {
					if (!b && k) var m = k.length
				} else m = e;
				"undefined" !== typeof m ? (this.names[m] = a.name, this.names.keys[a.name] = m) : a
					.x && (m = a.x);
				return m
			};
			a.prototype.updateNames = function() {
				var a = this,
					b = this.names;
				0 < b.length && (Object.keys(b.keys).forEach(function(a) {
						delete b.keys[a]
					}), b.length = 0, this.minRange = this.userMinRange, (this.series || [])
					.forEach(function(b) {
						b.xIncrement = null;
						if (!b.points || b.isDirtyData) a.max = Math.max(a.max, b.xData
							.length - 1), b.processData(), b.generatePoints();
						b.data.forEach(function(k, e) {
							if (k && k.options && "undefined" !== typeof k.name) {
								var m = a.nameToX(k);
								"undefined" !== typeof m && m !== k.x && (k.x = m, b
									.xData[e] = m)
							}
						})
					}))
			};
			a.prototype.setAxisTranslation = function() {
				var a = this,
					b = a.max - a.min,
					k = a.linkedParent,
					m = !!a.categories,
					c = a.isXAxis,
					f = a.axisPointRange || 0,
					l = 0,
					h = 0,
					u = a.transA;
				if (c || m || f) {
					var d = a.getClosest();
					k ? (l = k.minPointOffset, h = k.pointRangePadding) : a.series.forEach(function(
						b) {
						var k = m ? 1 : c ? v(b.options.pointRange, d, 0) : a
							.axisPointRange || 0,
							n = b.options.pointPlacement;
						f = Math.max(f, k);
						if (!a.single || m) b = b.is("xrange") ? !c : c, l = Math.max(l,
							b && e(n) ? 0 : k / 2), h = Math.max(h, b && "on" === n ?
							0 : k)
					});
					k = a.ordinal && a.ordinal.slope && d ? a.ordinal.slope / d : 1;
					a.minPointOffset = l *= k;
					a.pointRangePadding = h *= k;
					a.pointRange = Math.min(f, a.single && m ? 1 : b);
					c && (a.closestPointRange = d)
				}
				a.translationSlope = a.transA = u = a.staticScale || a.len / (b + h || 1);
				a.transB = a.horiz ? a.left : a.bottom;
				a.minPixelPadding = u * l;
				n(this, "afterSetAxisTranslation")
			};
			a.prototype.minFromRange = function() {
				return this.max - this.range
			};
			a.prototype.setTickInterval =
				function(a) {
					var b = this.chart,
						k = this.logarithmic,
						e = this.options,
						f = this.isXAxis,
						l = this.isLinked,
						h = e.tickPixelInterval,
						E = this.categories,
						u = this.softThreshold,
						d = e.maxPadding,
						F = e.minPadding,
						p = m(e.tickInterval) && 0 <= e.tickInterval ? e.tickInterval : void 0,
						q = m(this.threshold) ? this.threshold : null;
					this.dateTime || E || l || this.getTickAmount();
					var w = v(this.userMin, e.min);
					var g = v(this.userMax, e.max);
					if (l) {
						this.linkedParent = b[this.coll][e.linkedTo];
						var J = this.linkedParent.getExtremes();
						this.min = v(J.min, J.dataMin);
						this.max =
							v(J.max, J.dataMax);
						e.type !== this.linkedParent.options.type && K(11, 1, b)
					} else {
						if (u && D(q))
							if (this.dataMin >= q) J = q, F = 0;
							else if (this.dataMax <= q) {
							var L = q;
							d = 0
						}
						this.min = v(w, J, this.dataMin);
						this.max = v(g, L, this.dataMax)
					}
					k && (this.positiveValuesOnly && !a && 0 >= Math.min(this.min, v(this.dataMin, this
							.min)) && K(10, 1, b), this.min = c(k.log2lin(this.min), 16), this.max =
						c(k.log2lin(this.max), 16));
					this.range && D(this.max) && (this.userMin = this.min = w = Math.max(this.dataMin,
						this.minFromRange()), this.userMax = g = this.max, this.range = null);
					n(this, "foundExtremes");
					this.beforePadding && this.beforePadding();
					this.adjustForMinRange();
					!(E || this.axisPointRange || this.stacking && this.stacking.usePercentage || l) &&
					D(this.min) && D(this.max) && (b = this.max - this.min) && (!D(w) && F && (this
						.min -= b * F), !D(g) && d && (this.max += b * d));
					m(this.userMin) || (m(e.softMin) && e.softMin < this.min && (this.min = w = e
						.softMin), m(e.floor) && (this.min = Math.max(this.min, e.floor)));
					m(this.userMax) || (m(e.softMax) && e.softMax > this.max && (this.max = g = e
						.softMax), m(e.ceiling) && (this.max = Math.min(this.max,
						e.ceiling)));
					u && D(this.dataMin) && (q = q || 0, !D(w) && this.min < q && this.dataMin >= q ?
						this.min = this.options.minRange ? Math.min(q, this.max - this.minRange) :
						q : !D(g) && this.max > q && this.dataMax <= q && (this.max = this.options
							.minRange ? Math.max(q, this.min + this.minRange) : q));
					m(this.min) && m(this.max) && !this.chart.polar && this.min > this.max && (D(this
						.options.min) ? this.max = this.min : D(this.options.max) && (this.min =
						this.max));
					this.tickInterval = this.min === this.max || "undefined" === typeof this.min ||
						"undefined" === typeof this.max ? 1 : l &&
						this.linkedParent && !p && h === this.linkedParent.options.tickPixelInterval ?
						p = this.linkedParent.tickInterval : v(p, this.tickAmount ? (this.max - this
							.min) / Math.max(this.tickAmount - 1, 1) : void 0, E ? 1 : (this.max -
							this.min) * h / Math.max(this.len, h));
					if (f && !a) {
						var r = this.min !== (this.old && this.old.min) || this.max !== (this.old &&
							this.old.max);
						this.series.forEach(function(a) {
							a.forceCrop = a.forceCropping && a.forceCropping();
							a.processData(r)
						});
						n(this, "postProcessData", {
							hasExtremesChanged: r
						})
					}
					this.setAxisTranslation();
					n(this, "initialAxisTranslation");
					this.pointRange && !p && (this.tickInterval = Math.max(this.pointRange, this
						.tickInterval));
					a = v(e.minTickInterval, this.dateTime && !this.series.some(function(a) {
						return a.noSharedTooltip
					}) ? this.closestPointRange : 0);
					!p && this.tickInterval < a && (this.tickInterval = a);
					this.dateTime || this.logarithmic || p || (this.tickInterval = Q(this, this
						.tickInterval));
					this.tickAmount || (this.tickInterval = this.unsquish());
					this.setTickPositions()
				};
			a.prototype.setTickPositions = function() {
				var a = this.options,
					b = a.tickPositions,
					k = a.tickPositioner,
					e = this.getMinorTickInterval(),
					v = this.hasVerticalPanning(),
					c = "colorAxis" === this.coll,
					f = (c || !v) && a.startOnTick;
				v = (c || !v) && a.endOnTick;
				c = [];
				var l;
				this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 ===
					this.tickInterval ? .5 : 0;
				this.minorTickInterval = "auto" === e && this.tickInterval ? this.tickInterval / 5 :
					e;
				this.single = this.min === this.max && D(this.min) && !this.tickAmount && (parseInt(
					this.min, 10) === this.min || !1 !== a.allowDecimals);
				if (b) c = b.slice();
				else if (m(this.min) && m(this.max)) {
					if (this.ordinal &&
						this.ordinal.positions || !((this.max - this.min) / this.tickInterval > Math
							.max(2 * this.len, 200)))
						if (this.dateTime) c = this.getTimeTicks(this.dateTime
							.normalizeTimeTickInterval(this.tickInterval, a.units), this.min,
							this.max, a.startOfWeek, this.ordinal && this.ordinal.positions,
							this.closestPointRange, !0);
						else if (this.logarithmic) c = this.logarithmic.getLogTickPositions(this
						.tickInterval, this.min, this.max);
					else
						for (e = a = this.tickInterval; e <= 2 * a;)
							if (c = this.getLinearTickPositions(this.tickInterval, this.min, this
									.max), this.tickAmount &&
								c.length > this.tickAmount) this.tickInterval = Q(this, e *= 1.1);
							else break;
					else c = [this.min, this.max], K(19, !1, this.chart);
					c.length > this.len && (c = [c[0], c[c.length - 1]], c[0] === c[1] && (c
						.length = 1));
					k && (this.tickPositions = c, (l = k.apply(this, [this.min, this.max])) && (c =
						l))
				}
				this.tickPositions = c;
				this.paddedTicks = c.slice(0);
				this.trimTicks(c, f, v);
				!this.isLinked && m(this.min) && m(this.max) && (this.single && 2 > c.length && !
					this.categories && !this.series.some(function(a) {
						return a.is("heatmap") && "between" === a.options.pointPlacement
					}) &&
					(this.min -= .5, this.max += .5), b || l || this.adjustTickAmount());
				n(this, "afterSetTickPositions")
			};
			a.prototype.trimTicks = function(a, b, k) {
				var e = a[0],
					m = a[a.length - 1],
					c = !this.isOrdinal && this.minPointOffset || 0;
				n(this, "trimTicks");
				if (!this.isLinked) {
					if (b && -Infinity !== e) this.min = e;
					else
						for (; this.min - c > a[0];) a.shift();
					if (k) this.max = m;
					else
						for (; this.max + c < a[a.length - 1];) a.pop();
					0 === a.length && D(e) && !this.options.tickPositions && a.push((m + e) / 2)
				}
			};
			a.prototype.alignToOthers = function() {
				var a = this,
					b = [this],
					k = a.options,
					e = "yAxis" === this.coll && this.chart.options.chart.alignThresholds,
					n = [],
					c;
				a.thresholdAlignment = void 0;
				if ((!1 !== this.chart.options.chart.alignTicks && k.alignTicks || e) && !1 !== k
					.startOnTick && !1 !== k.endOnTick && !a.logarithmic) {
					var v = function(a) {
							var b = a.options;
							return [a.horiz ? b.left : b.top, b.width, b.height, b.pane].join()
						},
						f = v(this);
					this.chart[this.coll].forEach(function(k) {
						var e = k.series;
						e.length && e.some(function(a) {
							return a.visible
						}) && k !== a && v(k) === f && (c = !0, b.push(k))
					})
				}
				if (c && e) {
					b.forEach(function(b) {
						b = b.getThresholdAlignment(a);
						m(b) && n.push(b)
					});
					var l = 1 < n.length ? n.reduce(function(a, b) {
						return a + b
					}, 0) / n.length : void 0;
					b.forEach(function(a) {
						a.thresholdAlignment = l
					})
				}
				return c
			};
			a.prototype.getThresholdAlignment = function(a) {
				(!m(this.dataMin) || this !== a && this.series.some(function(a) {
					return a.isDirty || a.isDirtyData
				})) && this.getSeriesExtremes();
				if (m(this.threshold)) return a = f((this.threshold - (this.dataMin || 0)) / ((this
					.dataMax || 0) - (this.dataMin || 0)), 0, 1), this.options.reversed && (
					a = 1 - a), a
			};
			a.prototype.getTickAmount = function() {
				var a = this.options,
					b = a.tickPixelInterval,
					k = a.tickAmount;
				!D(a.tickInterval) && !k && this.len < b && !this.isRadial && !this.logarithmic && a
					.startOnTick && a.endOnTick && (k = 2);
				!k && this.alignToOthers() && (k = Math.ceil(this.len / b) + 1);
				4 > k && (this.finalTickAmt = k, k = 5);
				this.tickAmount = k
			};
			a.prototype.adjustTickAmount = function() {
				var a = this,
					b = a.finalTickAmt,
					k = a.max,
					e = a.min,
					n = a.options,
					f = a.tickPositions,
					l = a.tickAmount,
					h = a.thresholdAlignment,
					u = f && f.length,
					d = v(a.threshold, a.softThreshold ? 0 : null);
				var p = a.tickInterval;
				if (m(h)) {
					var F = .5 > h ? Math.ceil(h *
						(l - 1)) : Math.floor(h * (l - 1));
					n.reversed && (F = l - 1 - F)
				}
				if (a.hasData() && m(e) && m(k)) {
					h = function() {
						a.transA *= (u - 1) / (l - 1);
						a.min = n.startOnTick ? f[0] : Math.min(e, f[0]);
						a.max = n.endOnTick ? f[f.length - 1] : Math.max(k, f[f.length - 1])
					};
					if (m(F) && m(a.threshold)) {
						for (; f[F] !== d || f.length !== l || f[0] > e || f[f.length - 1] < k;) {
							f.length = 0;
							for (f.push(a.threshold); f.length < l;) void 0 === f[F] || f[F] > a
								.threshold ? f.unshift(c(f[0] - p)) : f.push(c(f[f.length - 1] +
								p));
							if (p > 8 * a.tickInterval) break;
							p *= 2
						}
						h()
					} else if (u < l) {
						for (; f.length < l;) f.length % 2 || e ===
							d ? f.push(c(f[f.length - 1] + p)) : f.unshift(c(f[0] - p));
						h()
					}
					if (D(b)) {
						for (p = d = f.length; p--;)(3 === b && 1 === p % 2 || 2 >= b && 0 < p &&
							p < d - 1) && f.splice(p, 1);
						a.finalTickAmt = void 0
					}
				}
			};
			a.prototype.setScale = function() {
				var a = !1,
					b = !1;
				this.series.forEach(function(k) {
					a = a || k.isDirtyData || k.isDirty;
					b = b || k.xAxis && k.xAxis.isDirty || !1
				});
				this.setAxisSize();
				var k = this.len !== (this.old && this.old.len);
				k || a || b || this.isLinked || this.forceRedraw || this.userMin !== (this.old &&
						this.old.userMin) || this.userMax !== (this.old && this.old.userMax) || this
					.alignToOthers() ?
					(this.stacking && this.stacking.resetStacks(), this.forceRedraw = !1, this
						.getSeriesExtremes(), this.setTickInterval(), this.isDirty || (this
							.isDirty = k || this.min !== (this.old && this.old.min) || this.max !==
							(this.old && this.old.max))) : this.stacking && this.stacking
					.cleanStacks();
				a && this.panningState && (this.panningState.isDirty = !0);
				n(this, "afterSetScale")
			};
			a.prototype.setExtremes = function(a, b, k, e, m) {
				var c = this,
					f = c.chart;
				k = v(k, !0);
				c.series.forEach(function(a) {
					delete a.kdTree
				});
				m = w(m, {
					min: a,
					max: b
				});
				n(c, "setExtremes", m,
					function() {
						c.userMin = a;
						c.userMax = b;
						c.eventArgs = m;
						k && f.redraw(e)
					})
			};
			a.prototype.zoom = function(a, b) {
				var k = this,
					e = this.dataMin,
					m = this.dataMax,
					c = this.options,
					f = Math.min(e, v(c.min, e)),
					l = Math.max(m, v(c.max, m));
				a = {
					newMin: a,
					newMax: b
				};
				n(this, "zoom", a, function(a) {
					var b = a.newMin,
						n = a.newMax;
					if (b !== k.min || n !== k.max) k.allowZoomOutside || (D(e) && (b < f &&
							(b = f), b > l && (b = l)), D(m) && (n < f && (n = f), n >
							l && (n = l))), k.displayBtn = "undefined" !== typeof b ||
						"undefined" !== typeof n, k.setExtremes(b, n, !1, void 0, {
							trigger: "zoom"
						});
					a.zoomed = !0
				});
				return a.zoomed
			};
			a.prototype.setAxisSize = function() {
				var a = this.chart,
					b = this.options,
					k = b.offsets || [0, 0, 0, 0],
					e = this.horiz,
					m = this.width = Math.round(F(v(b.width, a.plotWidth - k[3] + k[1]), a
						.plotWidth)),
					n = this.height = Math.round(F(v(b.height, a.plotHeight - k[0] + k[2]), a
						.plotHeight)),
					c = this.top = Math.round(F(v(b.top, a.plotTop + k[0]), a.plotHeight, a
						.plotTop));
				b = this.left = Math.round(F(v(b.left, a.plotLeft + k[3]), a.plotWidth, a
				.plotLeft));
				this.bottom = a.chartHeight - n - c;
				this.right = a.chartWidth - m - b;
				this.len = Math.max(e ?
					m : n, 0);
				this.pos = e ? b : c
			};
			a.prototype.getExtremes = function() {
				var a = this.logarithmic;
				return {
					min: a ? c(a.lin2log(this.min)) : this.min,
					max: a ? c(a.lin2log(this.max)) : this.max,
					dataMin: this.dataMin,
					dataMax: this.dataMax,
					userMin: this.userMin,
					userMax: this.userMax
				}
			};
			a.prototype.getThreshold = function(a) {
				var b = this.logarithmic,
					k = b ? b.lin2log(this.min) : this.min;
				b = b ? b.lin2log(this.max) : this.max;
				null === a || -Infinity === a ? a = k : Infinity === a ? a = b : k > a ? a = k : b <
					a && (a = b);
				return this.translate(a, 0, 1, 0, 1)
			};
			a.prototype.autoLabelAlign =
				function(a) {
					var b = (v(a, 0) - 90 * this.side + 720) % 360;
					a = {
						align: "center"
					};
					n(this, "autoLabelAlign", a, function(a) {
						15 < b && 165 > b ? a.align = "right" : 195 < b && 345 > b && (a.align =
							"left")
					});
					return a.align
				};
			a.prototype.tickSize = function(a) {
				var b = this.options,
					k = v(b["tick" === a ? "tickWidth" : "minorTickWidth"], "tick" === a && this
						.isXAxis && !this.categories ? 1 : 0),
					e = b["tick" === a ? "tickLength" : "minorTickLength"];
				if (k && e) {
					"inside" === b[a + "Position"] && (e = -e);
					var m = [e, k]
				}
				a = {
					tickSize: m
				};
				n(this, "afterTickSize", a);
				return a.tickSize
			};
			a.prototype.labelMetrics =
				function() {
					var a = this.tickPositions && this.tickPositions[0] || 0;
					return this.chart.renderer.fontMetrics(this.options.labels.style.fontSize, this
						.ticks[a] && this.ticks[a].label)
				};
			a.prototype.unsquish = function() {
				var a = this.options.labels,
					b = this.horiz,
					k = this.tickInterval,
					e = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / k),
					n = a.rotation,
					f = this.labelMetrics(),
					h = Math.max(this.max - this.min, 0),
					u = function(a) {
						var b = a / (e || 1);
						b = 1 < b ? Math.ceil(b) : 1;
						b * k > h && Infinity !== a && Infinity !== e && h && (b = Math.ceil(h /
						k));
						return c(b *
							k)
					},
					d = k,
					p = Number.MAX_VALUE;
				if (b) {
					if (!a.staggerLines)
						if (m(n)) var F = [n];
						else e < a.autoRotationLimit && (F = a.autoRotation);
					if (F)
						for (var q = b = void 0, w = 0, g = F; w < g.length; w++) {
							var J = g[w];
							if (J === n || J && -90 <= J && 90 >= J)
								if (b = u(Math.abs(f.h / Math.sin(l * J))), q = b + Math.abs(J /
										360), q < p) {
									p = q;
									var D = J;
									d = b
								}
						}
				} else d = u(f.h);
				this.autoRotation = F;
				this.labelRotation = v(D, m(n) ? n : 0);
				return a.step ? k : d
			};
			a.prototype.getSlotWidth = function(a) {
				var b = this.chart,
					k = this.horiz,
					e = this.options.labels,
					n = Math.max(this.tickPositions.length - (this.categories ?
						0 : 1), 1),
					c = b.margin[3];
				if (a && m(a.slotWidth)) return a.slotWidth;
				if (k && 2 > e.step) return e.rotation ? 0 : (this.staggerLines || 1) * this.len /
				n;
				if (!k) {
					a = e.style.width;
					if (void 0 !== a) return parseInt(String(a), 10);
					if (c) return c - b.spacing[3]
				}
				return .33 * b.chartWidth
			};
			a.prototype.renderUnsquish = function() {
				var a = this.chart,
					b = a.renderer,
					k = this.tickPositions,
					m = this.ticks,
					n = this.options.labels,
					c = n.style,
					f = this.horiz,
					v = this.getSlotWidth(),
					l = Math.max(1, Math.round(v - 2 * n.padding)),
					h = {},
					u = this.labelMetrics(),
					d = c.textOverflow,
					p = 0;
				e(n.rotation) || (h.rotation = n.rotation || 0);
				k.forEach(function(a) {
					a = m[a];
					a.movedLabel && a.replaceMovedLabel();
					a && a.label && a.label.textPxLength > p && (p = a.label.textPxLength)
				});
				this.maxLabelLength = p;
				if (this.autoRotation) p > l && p > u.h ? h.rotation = this.labelRotation : this
					.labelRotation = 0;
				else if (v) {
					var F = l;
					if (!d) {
						var q = "clip";
						for (l = k.length; !f && l--;) {
							var w = k[l];
							if (w = m[w].label) w.styles && "ellipsis" === w.styles.textOverflow ? w
								.css({
									textOverflow: "clip"
								}) : w.textPxLength > v && w.css({
									width: v + "px"
								}), w.getBBox().height >
								this.len / k.length - (u.h - u.f) && (w.specificTextOverflow =
									"ellipsis")
						}
					}
				}
				h.rotation && (F = p > .5 * a.chartHeight ? .33 * a.chartHeight : p, d || (q =
					"ellipsis"));
				if (this.labelAlign = n.align || this.autoLabelAlign(this.labelRotation)) h.align =
					this.labelAlign;
				k.forEach(function(a) {
					var b = (a = m[a]) && a.label,
						k = c.width,
						e = {};
					b && (b.attr(h), a.shortenLabel ? a.shortenLabel() : F && !k &&
						"nowrap" !== c.whiteSpace && (F < b.textPxLength || "SPAN" === b
							.element.tagName) ? (e.width = F + "px", d || (e
							.textOverflow = b.specificTextOverflow || q), b.css(e)) : b
						.styles && b.styles.width &&
						!e.width && !k && b.css({
							width: null
						}), delete b.specificTextOverflow, a.rotation = h.rotation)
				}, this);
				this.tickRotCorr = b.rotCorr(u.b, this.labelRotation || 0, 0 !== this.side)
			};
			a.prototype.hasData = function() {
				return this.series.some(function(a) {
					return a.hasData()
				}) || this.options.showEmpty && D(this.min) && D(this.max)
			};
			a.prototype.addTitle = function(a) {
				var k = this.chart.renderer,
					e = this.horiz,
					m = this.opposite,
					n = this.options.title,
					c = this.chart.styledMode,
					f;
				this.axisTitle || ((f = n.textAlign) || (f = (e ? {
						low: "left",
						middle: "center",
						high: "right"
					} : {
						low: m ? "right" : "left",
						middle: "center",
						high: m ? "left" : "right"
					})[n.align]), this.axisTitle = k.text(n.text || "", 0, 0, n.useHTML).attr({
						zIndex: 7,
						rotation: n.rotation,
						align: f
					}).addClass("highcharts-axis-title"), c || this.axisTitle.css(b(n.style)),
					this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0);
				c || n.style.width || this.isRadial || this.axisTitle.css({
					width: this.len + "px"
				});
				this.axisTitle[a ? "show" : "hide"](a)
			};
			a.prototype.generateTick = function(a) {
				var b = this.ticks;
				b[a] ? b[a].addLabel() : b[a] = new A(this,
					a)
			};
			a.prototype.getOffset = function() {
				var a = this,
					b = this,
					e = b.chart,
					m = b.horiz,
					c = b.options,
					f = b.side,
					l = b.ticks,
					h = b.tickPositions,
					u = b.coll,
					d = b.axisParent,
					p = e.renderer,
					F = e.inverted && !b.isZAxis ? [1, 0, 3, 2][f] : f,
					q = b.hasData(),
					w = c.title,
					g = c.labels,
					J = e.axisOffset;
				e = e.clipOffset;
				var L = [-1, 1, 1, -1][f],
					r = c.className,
					O, t = 0,
					G = 0,
					Q = 0;
				b.showAxis = O = q || c.showEmpty;
				b.staggerLines = b.horiz && g.staggerLines || void 0;
				if (!b.axisGroup) {
					var x = function(b, k, e) {
						return p.g(b).attr({
							zIndex: e
						}).addClass("highcharts-".concat(u.toLowerCase()).concat(k,
							" ") + (a.isRadial ? "highcharts-radial-axis".concat(k,
							" ") : "") + (r || "")).add(d)
					};
					b.gridGroup = x("grid", "-grid", c.gridZIndex);
					b.axisGroup = x("axis", "", c.zIndex);
					b.labelGroup = x("axis-labels", "-labels", g.zIndex)
				}
				q || b.isLinked ? (h.forEach(function(a) {
						b.generateTick(a)
					}), b.renderUnsquish(), b.reserveSpaceDefault = 0 === f || 2 === f || {
						1: "left",
						3: "right"
					} [f] === b.labelAlign, v(g.reserveSpace, "center" === b.labelAlign ? !0 :
						null, b.reserveSpaceDefault) && h.forEach(function(a) {
						Q = Math.max(l[a].getLabelSize(), Q)
					}), b.staggerLines &&
					(Q *= b.staggerLines), b.labelOffset = Q * (b.opposite ? -1 : 1)) : k(l,
					function(a, b) {
						a.destroy();
						delete l[b]
					});
				if (w && w.text && !1 !== w.enabled && (b.addTitle(O), O && !1 !== w
					.reserveSpace)) {
					b.titleOffset = t = b.axisTitle.getBBox()[m ? "height" : "width"];
					var T = w.offset;
					G = D(T) ? 0 : v(w.margin, m ? 5 : 10)
				}
				b.renderLine();
				b.offset = L * v(c.offset, J[f] ? J[f] + (c.margin || 0) : 0);
				b.tickRotCorr = b.tickRotCorr || {
					x: 0,
					y: 0
				};
				w = 0 === f ? -b.labelMetrics().h : 2 === f ? b.tickRotCorr.y : 0;
				q = Math.abs(Q) + G;
				Q && (q = q - w + L * (m ? v(g.y, b.tickRotCorr.y + 8 * L) : g.x));
				b.axisTitleMargin =
					v(T, q);
				b.getMaxLabelDimensions && (b.maxLabelDimensions = b.getMaxLabelDimensions(l, h));
				"colorAxis" !== u && (m = this.tickSize("tick"), J[f] = Math.max(J[f], (b
							.axisTitleMargin || 0) + t + L * b.offset, q, h && h.length && m ?
						m[0] + L * b.offset : 0), c = !b.axisLine || c.offset ? 0 : 2 * Math
					.floor(b.axisLine.strokeWidth() / 2), e[F] = Math.max(e[F], c));
				n(this, "afterGetOffset")
			};
			a.prototype.getLinePath = function(a) {
				var b = this.chart,
					k = this.opposite,
					e = this.offset,
					m = this.horiz,
					n = this.left + (k ? this.width : 0) + e;
				e = b.chartHeight - this.bottom - (k ? this.height :
					0) + e;
				k && (a *= -1);
				return b.renderer.crispLine([
					["M", m ? this.left : n, m ? e : this.top],
					["L", m ? b.chartWidth - this.right : n, m ? e : b.chartHeight - this
						.bottom
					]
				], a)
			};
			a.prototype.renderLine = function() {
				this.axisLine || (this.axisLine = this.chart.renderer.path().addClass(
						"highcharts-axis-line").add(this.axisGroup), this.chart.styledMode ||
					this.axisLine.attr({
						stroke: this.options.lineColor,
						"stroke-width": this.options.lineWidth,
						zIndex: 7
					}))
			};
			a.prototype.getTitlePosition = function() {
				var a = this.horiz,
					b = this.left,
					k = this.top,
					e = this.len,
					m = this.options.title,
					c = a ? b : k,
					f = this.opposite,
					v = this.offset,
					l = m.x,
					h = m.y,
					u = this.axisTitle,
					d = this.chart.renderer.fontMetrics(m.style.fontSize, u);
				u = u ? Math.max(u.getBBox(!1, 0).height - d.h - 1, 0) : 0;
				e = {
					low: c + (a ? 0 : e),
					middle: c + e / 2,
					high: c + (a ? e : 0)
				} [m.align];
				b = (a ? k + this.height : b) + (a ? 1 : -1) * (f ? -1 : 1) * (this
					.axisTitleMargin || 0) + [-u, u, d.f, -u][this.side];
				a = {
					x: a ? e + l : b + (f ? this.width : 0) + v + l,
					y: a ? b + h - (f ? this.height : 0) + v : e + h
				};
				n(this, "afterGetTitlePosition", {
					titlePosition: a
				});
				return a
			};
			a.prototype.renderMinorTick = function(a,
				b) {
				var k = this.minorTicks;
				k[a] || (k[a] = new A(this, a, "minor"));
				b && k[a].isNew && k[a].render(null, !0);
				k[a].render(null, !1, 1)
			};
			a.prototype.renderTick = function(a, b, k) {
				var e = this.ticks;
				if (!this.isLinked || a >= this.min && a <= this.max || this.grid && this.grid
					.isColumn) e[a] || (e[a] = new A(this, a)), k && e[a].isNew && e[a].render(b, !
					0, -1), e[a].render(b)
			};
			a.prototype.render = function() {
				var a = this,
					b = a.chart,
					e = a.logarithmic,
					c = a.options,
					f = a.isLinked,
					v = a.tickPositions,
					l = a.axisTitle,
					h = a.ticks,
					u = a.minorTicks,
					d = a.alternateBands,
					p = c.stackLabels,
					F = c.alternateGridColor,
					q = a.tickmarkOffset,
					w = a.axisLine,
					g = a.showAxis,
					J = t(b.renderer.globalAnimation),
					L, D;
				a.labelEdge.length = 0;
				a.overlap = !1;
				[h, u, d].forEach(function(a) {
					k(a, function(a) {
						a.isActive = !1
					})
				});
				if (a.hasData() || f) {
					var r = a.chart.hasRendered && a.old && m(a.old.min);
					a.minorTickInterval && !a.categories && a.getMinorTickPositions().forEach(
						function(b) {
							a.renderMinorTick(b, r)
						});
					v.length && (v.forEach(function(b, k) {
						a.renderTick(b, k, r)
					}), q && (0 === a.min || a.single) && (h[-1] || (h[-1] = new A(a, -1,
						null, !0)), h[-1].render(-1)));
					F && v.forEach(function(k, m) {
						D = "undefined" !== typeof v[m + 1] ? v[m + 1] + q : a.max - q;
						0 === m % 2 && k < a.max && D <= a.max + (b.polar ? -q : q) && (d[
							k] || (d[k] = new C.PlotLineOrBand(a)), L = k + q, d[k]
							.options = {
								from: e ? e.lin2log(L) : L,
								to: e ? e.lin2log(D) : D,
								color: F,
								className: "highcharts-alternate-grid"
							}, d[k].render(), d[k].isActive = !0)
					});
					a._addedPlotLB || (a._addedPlotLB = !0, (c.plotLines || []).concat(c
						.plotBands || []).forEach(function(b) {
						a.addPlotBandOrLine(b)
					}))
				} [h, u, d].forEach(function(a) {
					var e = [],
						m = J.duration;
					k(a, function(a, b) {
						a.isActive ||
							(a.render(b, !1, 0), a.isActive = !1, e.push(b))
					});
					O(function() {
						for (var b = e.length; b--;) a[e[b]] && !a[e[b]].isActive &&
							(a[e[b]].destroy(), delete a[e[b]])
					}, a !== d && b.hasRendered && m ? m : 0)
				});
				w && (w[w.isPlaced ? "animate" : "attr"]({
					d: this.getLinePath(w.strokeWidth())
				}), w.isPlaced = !0, w[g ? "show" : "hide"](g));
				l && g && (c = a.getTitlePosition(), l[l.isNew ? "attr" : "animate"](c), l.isNew = !
					1);
				p && p.enabled && a.stacking && a.stacking.renderStackTotals();
				a.old = {
					len: a.len,
					max: a.max,
					min: a.min,
					transA: a.transA,
					userMax: a.userMax,
					userMin: a.userMin
				};
				a.isDirty = !1;
				n(this, "afterRender")
			};
			a.prototype.redraw = function() {
				this.visible && (this.render(), this.plotLinesAndBands.forEach(function(a) {
					a.render()
				}));
				this.series.forEach(function(a) {
					a.isDirty = !0
				})
			};
			a.prototype.getKeepProps = function() {
				return this.keepProps || a.keepProps
			};
			a.prototype.destroy = function(a) {
				var b = this,
					e = b.plotLinesAndBands,
					m = this.eventOptions;
				n(this, "destroy", {
					keepEvents: a
				});
				a || J(b);
				[b.ticks, b.minorTicks, b.alternateBands].forEach(function(a) {
					G(a)
				});
				if (e)
					for (a = e.length; a--;) e[a].destroy();
				"axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ")
					.forEach(function(a) {
						b[a] && (b[a] = b[a].destroy())
					});
				for (var c in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[c] = b
					.plotLinesAndBandsGroups[c].destroy();
				k(b, function(a, k) {
					-1 === b.getKeepProps().indexOf(k) && delete b[k]
				});
				this.eventOptions = m
			};
			a.prototype.drawCrosshair = function(a, b) {
				var k = this.crosshair,
					e = v(k && k.snap, !0),
					m = this.chart,
					c, f = this.cross;
				n(this, "drawCrosshair", {
					e: a,
					point: b
				});
				a || (a = this.cross && this.cross.e);
				if (k &&
					!1 !== (D(b) || !e)) {
					e ? D(b) && (c = v("colorAxis" !== this.coll ? b.crosshairPos : null, this
						.isXAxis ? b.plotX : this.len - b.plotY)) : c = a && (this.horiz ? a
						.chartX - this.pos : this.len - a.chartY + this.pos);
					if (D(c)) {
						var l = {
							value: b && (this.isXAxis ? b.x : v(b.stackY, b.y)),
							translatedValue: c
						};
						m.polar && w(l, {
							isCrosshair: !0,
							chartX: a && a.chartX,
							chartY: a && a.chartY,
							point: b
						});
						l = this.getPlotLinePath(l) || null
					}
					if (!D(l)) {
						this.hideCrosshair();
						return
					}
					e = this.categories && !this.isRadial;
					f || (this.cross = f = m.renderer.path().addClass(
						"highcharts-crosshair highcharts-crosshair-" +
						(e ? "category " : "thin ") + (k.className || "")).attr({
						zIndex: v(k.zIndex, 2)
					}).add(), m.styledMode || (f.attr({
						stroke: k.color || (e ? z.parse("#ccd6eb").setOpacity(.25)
							.get() : "#cccccc"),
						"stroke-width": v(k.width, 1)
					}).css({
						"pointer-events": "none"
					}), k.dashStyle && f.attr({
						dashstyle: k.dashStyle
					})));
					f.show().attr({
						d: l
					});
					e && !k.width && f.attr({
						"stroke-width": this.transA
					});
					this.cross.e = a
				} else this.hideCrosshair();
				n(this, "afterDrawCrosshair", {
					e: a,
					point: b
				})
			};
			a.prototype.hideCrosshair = function() {
				this.cross && this.cross.hide();
				n(this, "afterHideCrosshair")
			};
			a.prototype.hasVerticalPanning = function() {
				var a = this.chart.options.chart.panning;
				return !!(a && a.enabled && /y/.test(a.type))
			};
			a.prototype.validatePositiveValue = function(a) {
				return m(a) && 0 < a
			};
			a.prototype.update = function(a, k) {
				var e = this.chart;
				a = b(this.userOptions, a);
				this.destroy(!0);
				this.init(e, a);
				e.isDirtyBox = !0;
				v(k, !0) && e.redraw()
			};
			a.prototype.remove = function(a) {
				for (var b = this.chart, k = this.coll, e = this.series, m = e.length; m--;) e[m] &&
					e[m].remove(!1);
				H(b.axes, this);
				H(b[k], this);
				b[k].forEach(function(a, b) {
					a.options.index = a.userOptions.index = b
				});
				this.destroy();
				b.isDirtyBox = !0;
				v(a, !0) && b.redraw()
			};
			a.prototype.setTitle = function(a, b) {
				this.update({
					title: a
				}, b)
			};
			a.prototype.setCategories = function(a, b) {
				this.update({
					categories: a
				}, b)
			};
			a.defaultOptions = g.defaultXAxisOptions;
			a.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
			return a
		}();
		"";
		return d
	});
	I(g, "Core/Axis/DateTimeAxis.js", [g["Core/Utilities.js"]], function(d) {
		var g = d.addEvent,
			z = d.getMagnitude,
			B = d.normalizeTickInterval,
			y = d.timeUnits,
			C;
		(function(d) {
			function x() {
				return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
			}

			function t(l) {
				"datetime" !== l.userOptions.type ? this.dateTime = void 0 : this.dateTime || (this
					.dateTime = new h(this))
			}
			var r = [];
			d.compose = function(l) {
				-1 === r.indexOf(l) && (r.push(l), l.keepProps.push("dateTime"), l.prototype
					.getTimeTicks = x, g(l, "init", t));
				return l
			};
			var h = function() {
				function l(l) {
					this.axis = l
				}
				l.prototype.normalizeTimeTickInterval = function(l, h) {
					var f = h || [
						["millisecond", [1, 2, 5, 10, 20, 25, 50,
							100, 200, 500
						]],
						["second", [1, 2, 5, 10, 15, 30]],
						["minute", [1, 2, 5, 10, 15, 30]],
						["hour", [1, 2, 3, 4, 6, 8, 12]],
						["day", [1, 2]],
						["week", [1, 2]],
						["month", [1, 2, 3, 4, 6]],
						["year", null]
					];
					h = f[f.length - 1];
					var c = y[h[0]],
						d = h[1],
						p;
					for (p = 0; p < f.length && !(h = f[p], c = y[h[0]], d = h[1], f[p + 1] &&
							l <= (c * d[d.length - 1] + y[f[p + 1][0]]) / 2); p++);
					c === y.year && l < 5 * c && (d = [1, 2, 5]);
					l = B(l / c, d, "year" === h[0] ? Math.max(z(l / c), 1) : 1);
					return {
						unitRange: c,
						count: l,
						unitName: h[0]
					}
				};
				l.prototype.getXDateFormat = function(l, h) {
					var f = this.axis,
						c = f.chart.time;
					return f.closestPointRange ?
						c.getDateFormat(f.closestPointRange, l, f.options.startOfWeek, h) || c
						.resolveDTLFormat(h.year).main : c.resolveDTLFormat(h.day).main
				};
				return l
			}();
			d.Additions = h
		})(C || (C = {}));
		return C
	});
	I(g, "Core/Axis/LogarithmicAxis.js", [g["Core/Utilities.js"]], function(d) {
		var g = d.addEvent,
			z = d.normalizeTickInterval,
			B = d.pick,
			y;
		(function(d) {
			function A(h) {
				var l = this.logarithmic;
				"logarithmic" !== h.userOptions.type ? this.logarithmic = void 0 : l || (this
					.logarithmic = new r(this))
			}

			function x() {
				var h = this.logarithmic;
				h && (this.lin2val = function(l) {
						return h.lin2log(l)
					},
					this.val2lin = function(l) {
						return h.log2lin(l)
					})
			}
			var t = [];
			d.compose = function(h) {
				-1 === t.indexOf(h) && (t.push(h), h.keepProps.push("logarithmic"), g(h, "init", A),
					g(h, "afterInit", x));
				return h
			};
			var r = function() {
				function h(l) {
					this.axis = l
				}
				h.prototype.getLogTickPositions = function(l, h, d, f) {
					var c = this.axis,
						p = c.len,
						q = c.options,
						g = [];
					f || (this.minorAutoInterval = void 0);
					if (.5 <= l) l = Math.round(l), g = c.getLinearTickPositions(l, h, d);
					else if (.08 <= l) {
						var r = Math.floor(h),
							w, n = q = void 0;
						for (p = .3 < l ? [1, 2, 4] : .15 < l ? [1, 2, 4, 6, 8] : [1,
								2, 3, 4, 5, 6, 7, 8, 9
							]; r < d + 1 && !n; r++) {
							var u = p.length;
							for (w = 0; w < u && !n; w++) {
								var m = this.log2lin(this.lin2log(r) * p[w]);
								m > h && (!f || q <= d) && "undefined" !== typeof q && g.push(
								q);
								q > d && (n = !0);
								q = m
							}
						}
					} else h = this.lin2log(h), d = this.lin2log(d), l = f ? c
						.getMinorTickInterval() : q.tickInterval, l = B("auto" === l ? null : l,
							this.minorAutoInterval, q.tickPixelInterval / (f ? 5 : 1) * (d -
							h) / ((f ? p / c.tickPositions.length : p) || 1)), l = z(l), g = c
						.getLinearTickPositions(l, h, d).map(this.log2lin), f || (this
							.minorAutoInterval = l / 5);
					f || (c.tickInterval = l);
					return g
				};
				h.prototype.lin2log = function(l) {
					return Math.pow(10, l)
				};
				h.prototype.log2lin = function(l) {
					return Math.log(l) / Math.LN10
				};
				return h
			}();
			d.Additions = r
		})(y || (y = {}));
		return y
	});
	I(g, "Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js", [g["Core/Utilities.js"]], function(d) {
		var g = d.erase,
			z = d.extend,
			B = d.isNumber,
			y;
		(function(d) {
			var A = [],
				x;
			d.compose = function(d, h) {
				x || (x = d); - 1 === A.indexOf(h) && (A.push(h), z(h.prototype, t.prototype));
				return h
			};
			var t = function() {
				function d() {}
				d.prototype.getPlotBandPath = function(h, l, d) {
					void 0 ===
						d && (d = this.options);
					var p = this.getPlotLinePath({
							value: l,
							force: !0,
							acrossPanes: d.acrossPanes
						}),
						f = [],
						c = this.horiz;
					l = !B(this.min) || !B(this.max) || h < this.min && l < this.min || h > this
						.max && l > this.max;
					h = this.getPlotLinePath({
						value: h,
						force: !0,
						acrossPanes: d.acrossPanes
					});
					d = 1;
					if (h && p) {
						if (l) {
							var q = h.toString() === p.toString();
							d = 0
						}
						for (l = 0; l < h.length; l += 2) {
							var g = h[l],
								r = h[l + 1],
								t = p[l],
								w = p[l + 1];
							"M" !== g[0] && "L" !== g[0] || "M" !== r[0] && "L" !== r[0] ||
								"M" !== t[0] && "L" !== t[0] || "M" !== w[0] && "L" !== w[0] ||
								(c && t[1] === g[1] ? (t[1] += d, w[1] +=
										d) : c || t[2] !== g[2] || (t[2] += d, w[2] += d), f
									.push(["M", g[1], g[2]], ["L", r[1], r[2]], ["L", w[1], w[
										2]], ["L", t[1], t[2]], ["Z"]));
							f.isFlat = q
						}
					}
					return f
				};
				d.prototype.addPlotBand = function(h) {
					return this.addPlotBandOrLine(h, "plotBands")
				};
				d.prototype.addPlotLine = function(h) {
					return this.addPlotBandOrLine(h, "plotLines")
				};
				d.prototype.addPlotBandOrLine = function(h, l) {
					var d = this,
						p = this.userOptions,
						f = new x(this, h);
					this.visible && (f = f.render());
					if (f) {
						this._addedPlotLB || (this._addedPlotLB = !0, (p.plotLines || [])
							.concat(p.plotBands || []).forEach(function(c) {
								d.addPlotBandOrLine(c)
							}));
						if (l) {
							var c = p[l] || [];
							c.push(h);
							p[l] = c
						}
						this.plotLinesAndBands.push(f)
					}
					return f
				};
				d.prototype.removePlotBandOrLine = function(h) {
					var l = this.plotLinesAndBands,
						d = this.options,
						p = this.userOptions;
					if (l) {
						for (var f = l.length; f--;) l[f].id === h && l[f].destroy();
						[d.plotLines || [], p.plotLines || [], d.plotBands || [], p.plotBands ||
							[]
						].forEach(function(c) {
							for (f = c.length; f--;)(c[f] || {}).id === h && g(c, c[f])
						})
					}
				};
				d.prototype.removePlotBand = function(h) {
					this.removePlotBandOrLine(h)
				};
				d.prototype.removePlotLine = function(h) {
					this.removePlotBandOrLine(h)
				};
				return d
			}()
		})(y || (y = {}));
		return y
	});
	I(g, "Core/Axis/PlotLineOrBand/PlotLineOrBand.js", [g["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"], g[
		"Core/Utilities.js"]], function(d, g) {
		var z = g.arrayMax,
			M = g.arrayMin,
			y = g.defined,
			C = g.destroyObjectProperties,
			A = g.erase,
			x = g.fireEvent,
			t = g.merge,
			r = g.objectEach,
			h = g.pick;
		g = function() {
			function l(l, h) {
				this.axis = l;
				h && (this.options = h, this.id = h.id)
			}
			l.compose = function(h) {
				return d.compose(l, h)
			};
			l.prototype.render =
				function() {
					x(this, "render");
					var l = this,
						d = l.axis,
						f = d.horiz,
						c = d.logarithmic,
						g = l.options,
						G = g.color,
						H = h(g.zIndex, 0),
						A = g.events,
						w = {},
						n = d.chart.renderer,
						u = g.label,
						m = l.label,
						e = g.to,
						b = g.from,
						a = g.value,
						k = l.svgElem,
						v = [],
						F = y(b) && y(e);
					v = y(a);
					var J = !k,
						L = {
							"class": "highcharts-plot-" + (F ? "band " : "line ") + (g.className || "")
						},
						O = F ? "bands" : "lines";
					c && (b = c.log2lin(b), e = c.log2lin(e), a = c.log2lin(a));
					d.chart.styledMode || (v ? (L.stroke = G || "#999999", L["stroke-width"] = h(g
						.width, 1), g.dashStyle && (L.dashstyle = g.dashStyle)) : F && (L.fill =
						G || "#e6ebf5", g.borderWidth && (L.stroke = g.borderColor, L[
							"stroke-width"] = g.borderWidth)));
					w.zIndex = H;
					O += "-" + H;
					(c = d.plotLinesAndBandsGroups[O]) || (d.plotLinesAndBandsGroups[O] = c = n.g(
						"plot-" + O).attr(w).add());
					J && (l.svgElem = k = n.path().attr(L).add(c));
					if (v) v = d.getPlotLinePath({
						value: a,
						lineWidth: k.strokeWidth(),
						acrossPanes: g.acrossPanes
					});
					else if (F) v = d.getPlotBandPath(b, e, g);
					else return;
					!l.eventsAdded && A && (r(A, function(a, b) {
						k.on(b, function(a) {
							A[b].apply(l, [a])
						})
					}), l.eventsAdded = !0);
					(J || !k.d) && v && v.length ?
						k.attr({
							d: v
						}) : k && (v ? (k.show(), k.animate({
							d: v
						})) : k.d && (k.hide(), m && (l.label = m = m.destroy())));
					u && (y(u.text) || y(u.formatter)) && v && v.length && 0 < d.width && 0 < d
						.height && !v.isFlat ? (u = t({
							align: f && F && "center",
							x: f ? !F && 4 : 10,
							verticalAlign: !f && F && "middle",
							y: f ? F ? 16 : 10 : F ? 6 : -4,
							rotation: f && !F && 90
						}, u), this.renderLabel(u, v, F, H)) : m && m.hide();
					return l
				};
			l.prototype.renderLabel = function(l, h, f, c) {
				var d = this.axis,
					p = d.chart.renderer,
					g = this.label;
				g || (this.label = g = p.text(this.getLabelText(l), 0, 0, l.useHTML).attr({
					align: l.textAlign ||
						l.align,
					rotation: l.rotation,
					"class": "highcharts-plot-" + (f ? "band" : "line") + "-label " + (l
						.className || ""),
					zIndex: c
				}).add(), d.chart.styledMode || g.css(t({
					textOverflow: "ellipsis"
				}, l.style)));
				c = h.xBounds || [h[0][1], h[1][1], f ? h[2][1] : h[0][1]];
				h = h.yBounds || [h[0][2], h[1][2], f ? h[2][2] : h[0][2]];
				f = M(c);
				p = M(h);
				g.align(l, !1, {
					x: f,
					y: p,
					width: z(c) - f,
					height: z(h) - p
				});
				g.alignValue && "left" !== g.alignValue || g.css({
					width: (90 === g.rotation ? d.height - (g.alignAttr.y - d.top) : d
						.width - (g.alignAttr.x - d.left)) + "px"
				});
				g.show(!0)
			};
			l.prototype.getLabelText =
				function(l) {
					return y(l.formatter) ? l.formatter.call(this) : l.text
				};
			l.prototype.destroy = function() {
				A(this.axis.plotLinesAndBands, this);
				delete this.axis;
				C(this)
			};
			return l
		}();
		"";
		"";
		return g
	});
	I(g, "Core/Tooltip.js", [g["Core/FormatUtilities.js"], g["Core/Globals.js"], g[
		"Core/Renderer/RendererUtilities.js"], g["Core/Renderer/RendererRegistry.js"], g[
		"Core/Utilities.js"]], function(d, g, z, B, y) {
		var C = d.format,
			A = g.doc,
			x = z.distribute,
			t = y.clamp,
			r = y.css,
			h = y.discardElement,
			l = y.extend,
			q = y.fireEvent,
			p = y.isArray,
			f = y.isNumber,
			c = y.isString,
			D = y.merge,
			G = y.pick,
			H = y.splat,
			K = y.syncTimeout;
		d = function() {
			function d(n, c) {
				this.allowShared = !0;
				this.container = void 0;
				this.crosshairs = [];
				this.distance = 0;
				this.isHidden = !0;
				this.isSticky = !1;
				this.now = {};
				this.options = {};
				this.outside = !1;
				this.chart = n;
				this.init(n, c)
			}
			d.prototype.applyFilter = function() {
				var n = this.chart;
				n.renderer.definition({
					tagName: "filter",
					attributes: {
						id: "drop-shadow-" + n.index,
						opacity: .5
					},
					children: [{
						tagName: "feGaussianBlur",
						attributes: {
							"in": "SourceAlpha",
							stdDeviation: 1
						}
					}, {
						tagName: "feOffset",
						attributes: {
							dx: 1,
							dy: 1
						}
					}, {
						tagName: "feComponentTransfer",
						children: [{
							tagName: "feFuncA",
							attributes: {
								type: "linear",
								slope: .3
							}
						}]
					}, {
						tagName: "feMerge",
						children: [{
							tagName: "feMergeNode"
						}, {
							tagName: "feMergeNode",
							attributes: {
								"in": "SourceGraphic"
							}
						}]
					}]
				})
			};
			d.prototype.bodyFormatter = function(n) {
				return n.map(function(n) {
					var m = n.series.tooltipOptions;
					return (m[(n.point.formatPrefix || "point") + "Formatter"] || n.point
						.tooltipFormatter).call(n.point, m[(n.point.formatPrefix ||
						"point") + "Format"] || "")
				})
			};
			d.prototype.cleanSplit =
				function(n) {
					this.chart.series.forEach(function(c) {
						var m = c && c.tt;
						m && (!m.isActive || n ? c.tt = m.destroy() : m.isActive = !1)
					})
				};
			d.prototype.defaultFormatter = function(n) {
				var c = this.points || H(this);
				var m = [n.tooltipFooterHeaderFormatter(c[0])];
				m = m.concat(n.bodyFormatter(c));
				m.push(n.tooltipFooterHeaderFormatter(c[0], !0));
				return m
			};
			d.prototype.destroy = function() {
				this.label && (this.label = this.label.destroy());
				this.split && this.tt && (this.cleanSplit(!0), this.tt = this.tt.destroy());
				this.renderer && (this.renderer = this.renderer.destroy(),
					h(this.container));
				y.clearTimeout(this.hideTimer);
				y.clearTimeout(this.tooltipTimeout)
			};
			d.prototype.getAnchor = function(n, c) {
				var m = this.chart,
					e = m.pointer,
					b = m.inverted,
					a = m.plotTop,
					k = m.plotLeft,
					f, l, h = 0,
					d = 0;
				n = H(n);
				this.followPointer && c ? ("undefined" === typeof c.chartX && (c = e.normalize(c)),
						e = [c.chartX - k, c.chartY - a]) : n[0].tooltipPos ? e = n[0].tooltipPos :
					(n.forEach(function(e) {
						f = e.series.yAxis;
						l = e.series.xAxis;
						h += e.plotX || 0;
						d += e.plotLow ? (e.plotLow + (e.plotHigh || 0)) / 2 : e.plotY || 0;
						l && f && (b ? (h += a + m.plotHeight - l.len -
							l.pos, d += k + m.plotWidth - f.len - f.pos) : (h += l
							.pos - k, d += f.pos - a))
					}), h /= n.length, d /= n.length, e = [b ? m.plotWidth - d : h, b ? m
						.plotHeight - h : d
					], this.shared && 1 < n.length && c && (b ? e[0] = c.chartX - k : e[1] = c
						.chartY - a));
				return e.map(Math.round)
			};
			d.prototype.getClassName = function(n, f, m) {
				var e = n.series,
					b = e.options;
				return [this.options.className, "highcharts-label", m &&
					"highcharts-tooltip-header", f ? "highcharts-tooltip-box" :
					"highcharts-tooltip", !m && "highcharts-color-" + G(n.colorIndex, e
						.colorIndex), b && b.className
				].filter(c).join(" ")
			};
			d.prototype.getLabel = function() {
				var n = this,
					c = this.chart.styledMode,
					m = this.options,
					e = this.split && this.allowShared,
					b = m.style.pointerEvents || (this.shouldStickOnContact() ? "auto" : "none"),
					a, k = this.chart.renderer;
				if (n.label) {
					var f = !n.label.hasClass("highcharts-label");
					(e && !f || !e && f) && n.destroy()
				}
				if (!this.label) {
					if (this.outside) {
						f = this.chart.options.chart.style;
						var l = B.getRendererType();
						this.container = a = g.doc.createElement("div");
						a.className = "highcharts-tooltip-container";
						r(a, {
							position: "absolute",
							top: "1px",
							pointerEvents: b,
							zIndex: Math.max(this.options.style.zIndex || 0, (f && f
								.zIndex || 0) + 3)
						});
						g.doc.body.appendChild(a);
						this.renderer = k = new l(a, 0, 0, f, void 0, void 0, k.styledMode)
					}
					e ? this.label = k.g("tooltip") : (this.label = k.label("", 0, 0, m.shape,
						void 0, void 0, m.useHTML, void 0, "tooltip").attr({
						padding: m.padding,
						r: m.borderRadius
					}), c || this.label.attr({
						fill: m.backgroundColor,
						"stroke-width": m.borderWidth
					}).css(m.style).css({
						pointerEvents: b
					}).shadow(m.shadow));
					c && m.shadow && (this.applyFilter(), this.label.attr({
						filter: "url(#drop-shadow-" +
							this.chart.index + ")"
					}));
					if (n.outside && !n.split) {
						var h = this.label,
							d = h.xSetter,
							p = h.ySetter;
						h.xSetter = function(b) {
							d.call(h, n.distance);
							a.style.left = b + "px"
						};
						h.ySetter = function(b) {
							p.call(h, n.distance);
							a.style.top = b + "px"
						}
					}
					this.label.attr({
						zIndex: 8
					}).add()
				}
				return this.label
			};
			d.prototype.getPosition = function(n, c, m) {
				var e = this.chart,
					b = this.distance,
					a = {},
					k = e.inverted && m.h || 0,
					f = this.outside,
					l = f ? A.documentElement.clientWidth - 2 * b : e.chartWidth,
					h = f ? Math.max(A.body.scrollHeight, A.documentElement.scrollHeight, A.body
						.offsetHeight,
						A.documentElement.offsetHeight, A.documentElement.clientHeight) : e
					.chartHeight,
					d = e.pointer.getChartPosition(),
					u = function(a) {
						var k = "x" === a;
						return [a, k ? l : h, k ? n : c].concat(f ? [k ? n * d.scaleX : c * d
							.scaleY, k ? d.left - b + (m.plotX + e.plotLeft) * d.scaleX : d
							.top - b + (m.plotY + e.plotTop) * d.scaleY, 0, k ? l : h
						] : [k ? n : c, k ? m.plotX + e.plotLeft : m.plotY + e.plotTop, k ?
							e.plotLeft : e.plotTop, k ? e.plotLeft + e.plotWidth : e
							.plotTop + e.plotHeight
						])
					},
					p = u("y"),
					g = u("x"),
					w;
				u = !!m.negative;
				!e.polar && e.hoverSeries && e.hoverSeries.yAxis && e.hoverSeries.yAxis.reversed &&
					(u = !u);
				var q = !this.followPointer && G(m.ttBelow, !e.inverted === u),
					r = function(e, m, n, c, l, v, h) {
						var u = f ? "y" === e ? b * d.scaleY : b * d.scaleX : b,
							F = (n - c) / 2,
							p = c < l - b,
							g = l + b + c < m,
							w = l - u - n + F;
						l = l + u - F;
						if (q && g) a[e] = l;
						else if (!q && p) a[e] = w;
						else if (p) a[e] = Math.min(h - c, 0 > w - k ? w : w - k);
						else if (g) a[e] = Math.max(v, l + k + n > m ? l : l + k);
						else return !1
					},
					D = function(k, e, m, n, c) {
						var f;
						c < b || c > e - b ? f = !1 : a[k] = c < m / 2 ? 1 : c > e - n / 2 ? e - n -
							2 : c - m / 2;
						return f
					},
					t = function(a) {
						var b = p;
						p = g;
						g = b;
						w = a
					},
					P = function() {
						!1 !== r.apply(0, p) ? !1 !== D.apply(0, g) || w || (t(!0), P()) : w ? a.x =
							a.y = 0 : (t(!0), P())
					};
				(e.inverted || 1 < this.len) && t();
				P();
				return a
			};
			d.prototype.hide = function(n) {
				var c = this;
				y.clearTimeout(this.hideTimer);
				n = G(n, this.options.hideDelay);
				this.isHidden || (this.hideTimer = K(function() {
					c.getLabel().fadeOut(n ? void 0 : n);
					c.isHidden = !0
				}, n))
			};
			d.prototype.init = function(n, c) {
				this.chart = n;
				this.options = c;
				this.crosshairs = [];
				this.now = {
					x: 0,
					y: 0
				};
				this.isHidden = !0;
				this.split = c.split && !n.inverted && !n.polar;
				this.shared = c.shared || this.split;
				this.outside = G(c.outside, !(!n.scrollablePixelsX && !n.scrollablePixelsY))
			};
			d.prototype.shouldStickOnContact = function(n) {
				return !(this.followPointer || !this.options.stickOnContact || n && !this.chart
					.pointer.inClass(n.target, "highcharts-tooltip"))
			};
			d.prototype.move = function(n, c, m, e) {
				var b = this,
					a = b.now,
					k = !1 !== b.options.animation && !b.isHidden && (1 < Math.abs(n - a.x) || 1 <
						Math.abs(c - a.y)),
					f = b.followPointer || 1 < b.len;
				l(a, {
					x: k ? (2 * a.x + n) / 3 : n,
					y: k ? (a.y + c) / 2 : c,
					anchorX: f ? void 0 : k ? (2 * a.anchorX + m) / 3 : m,
					anchorY: f ? void 0 : k ? (a.anchorY + e) / 2 : e
				});
				b.getLabel().attr(a);
				b.drawTracker();
				k && (y.clearTimeout(this.tooltipTimeout),
					this.tooltipTimeout = setTimeout(function() {
						b && b.move(n, c, m, e)
					}, 32))
			};
			d.prototype.refresh = function(n, c) {
				var m = this.chart,
					e = this.options,
					b = m.pointer,
					a = H(n),
					k = a[0],
					f = [],
					l = e.formatter || this.defaultFormatter,
					h = this.shared,
					d = m.styledMode,
					u = {};
				if (e.enabled && k.series) {
					y.clearTimeout(this.hideTimer);
					this.allowShared = !(!p(n) && n.series && n.series.noSharedTooltip);
					this.followPointer = !this.split && k.series.tooltipOptions.followPointer;
					n = this.getAnchor(n, c);
					var g = n[0],
						w = n[1];
					h && this.allowShared ? (b.applyInactiveState(a),
						a.forEach(function(a) {
							a.setState("hover");
							f.push(a.getLabelConfig())
						}), u = {
							x: k.category,
							y: k.y
						}, u.points = f) : u = k.getLabelConfig();
					this.len = f.length;
					l = l.call(u, this);
					h = k.series;
					this.distance = G(h.tooltipOptions.distance, 16);
					if (!1 === l) this.hide();
					else {
						if (this.split && this.allowShared) this.renderSplit(l, a);
						else {
							var E = g,
								r = w;
							c && b.isDirectTouch && (E = c.chartX - m.plotLeft, r = c.chartY - m
								.plotTop);
							if (m.polar || !1 === h.options.clip || a.some(function(a) {
									return b.isDirectTouch || a.series.shouldShowTooltip(E, r)
								})) c = this.getLabel(),
								e.style.width && !d || c.css({
									width: m.spacingBox.width + "px"
								}), c.attr({
									text: l && l.join ? l.join("") : l
								}), c.addClass(this.getClassName(k), !0), d || c.attr({
									stroke: e.borderColor || k.color || h.color || "#666666"
								}), this.updatePosition({
									plotX: g,
									plotY: w,
									negative: k.negative,
									ttBelow: k.ttBelow,
									h: n[2] || 0
								});
							else {
								this.hide();
								return
							}
						}
						this.isHidden && this.label && this.label.attr({
							opacity: 1
						}).show();
						this.isHidden = !1
					}
					q(this, "refresh")
				}
			};
			d.prototype.renderSplit = function(n, f) {
				function m(a, b, k, m, n) {
					void 0 === n && (n = !0);
					k ? (b = z ? 0 : ba, a = t(a -
						m / 2, U.left, U.right - m - (e.outside ? y : 0))) : (b -= M, a = n ?
						a - m - H : a + H, a = t(a, n ? a : U.left, U.right));
					return {
						x: a,
						y: b
					}
				}
				var e = this,
					b = e.chart,
					a = e.chart,
					k = a.chartWidth,
					h = a.chartHeight,
					d = a.plotHeight,
					u = a.plotLeft,
					p = a.plotTop,
					g = a.pointer,
					w = a.scrollablePixelsY;
				w = void 0 === w ? 0 : w;
				var q = a.scrollablePixelsX,
					E = a.scrollingContainer;
				E = void 0 === E ? {
					scrollLeft: 0,
					scrollTop: 0
				} : E;
				var r = E.scrollLeft;
				E = E.scrollTop;
				var D = a.styledMode,
					H = e.distance,
					C = e.options,
					P = e.options.positioner,
					U = e.outside && "number" !== typeof q ? A.documentElement
					.getBoundingClientRect() : {
						left: r,
						right: r + k,
						top: E,
						bottom: E + h
					},
					aa = e.getLabel(),
					K = this.renderer || b.renderer,
					z = !(!b.xAxis[0] || !b.xAxis[0].opposite);
				b = g.getChartPosition();
				var y = b.left;
				b = b.top;
				var M = p + E,
					B = 0,
					ba = d - w;
				c(n) && (n = [!1, n]);
				n = n.slice(0, f.length + 1).reduce(function(a, b, k) {
					if (!1 !== b && "" !== b) {
						k = f[k - 1] || {
							isHeader: !0,
							plotX: f[0].plotX,
							plotY: d,
							series: {}
						};
						var n = k.isHeader,
							c = n ? e : k.series;
						b = b.toString();
						var l = c.tt,
							h = k.isHeader;
						var v = k.series;
						l || (l = {
								padding: C.padding,
								r: C.borderRadius
							}, D || (l.fill = C.backgroundColor, l["stroke-width"] =
								C.borderWidth), l = K.label("", 0, 0, C[h ?
								"headerShape" : "shape"], void 0, void 0, C.useHTML)
							.addClass(e.getClassName(k, !0, h)).attr(l).add(aa));
						l.isActive = !0;
						l.attr({
							text: b
						});
						D || l.css(C.style).shadow(C.shadow).attr({
							stroke: C.borderColor || k.color || v.color || "#333333"
						});
						c = c.tt = l;
						h = c.getBBox();
						b = h.width + c.strokeWidth();
						n && (B = h.height, ba += B, z && (M -= B));
						v = k.plotX;
						v = void 0 === v ? 0 : v;
						l = k.plotY;
						l = void 0 === l ? 0 : l;
						var F = k.series;
						if (k.isHeader) {
							v = u + v;
							var g = p + d / 2
						} else {
							var w = F.xAxis,
								q = F.yAxis;
							v = w.pos + t(v, -H, w.len + H);
							F.shouldShowTooltip(0,
								q.pos - p + l, {
									ignoreX: !0
								}) && (g = q.pos + l)
						}
						v = t(v, U.left - H, U.right + H);
						"number" === typeof g ? (h = h.height + 1, l = P ? P.call(e, b, h,
							k) : m(v, g, n, b), a.push({
							align: P ? 0 : void 0,
							anchorX: v,
							anchorY: g,
							boxWidth: b,
							point: k,
							rank: G(l.rank, n ? 1 : 0),
							size: h,
							target: l.y,
							tt: c,
							x: l.x
						})) : c.isActive = !1
					}
					return a
				}, []);
				!P && n.some(function(a) {
					var b = (e.outside ? y : 0) + a.anchorX;
					return b < U.left && b + a.boxWidth < U.right ? !0 : b < y - U.left + a
						.boxWidth && U.right - b > b
				}) && (n = n.map(function(a) {
					var b = m(a.anchorX, a.anchorY, a.point.isHeader, a.boxWidth, !1);
					return l(a, {
						target: b.y,
						x: b.x
					})
				}));
				e.cleanSplit();
				x(n, ba);
				var ca = y,
					I = y;
				n.forEach(function(a) {
					var b = a.x,
						k = a.boxWidth;
					a = a.isHeader;
					a || (e.outside && y + b < ca && (ca = y + b), !a && e.outside && ca +
						k > I && (I = y + b))
				});
				n.forEach(function(a) {
					var b = a.x,
						k = a.anchorX,
						m = a.pos,
						n = a.point.isHeader;
					m = {
						visibility: "undefined" === typeof m ? "hidden" : "inherit",
						x: b,
						y: (m || 0) + M,
						anchorX: k,
						anchorY: a.anchorY
					};
					if (e.outside && b < k) {
						var c = y - ca;
						0 < c && (n || (m.x = b + c, m.anchorX = k + c), n && (m.x = (I -
							ca) / 2, m.anchorX = k + c))
					}
					a.tt.attr(m)
				});
				n = e.container;
				w = e.renderer;
				e.outside && n && w && (a = aa.getBBox(),
					w.setSize(a.width + a.x, a.height + a.y, !1), n.style.left = ca + "px", n
					.style.top = b + "px")
			};
			d.prototype.drawTracker = function() {
				if (this.shouldStickOnContact()) {
					var n = this.chart,
						c = this.label,
						m = this.shared ? n.hoverPoints : n.hoverPoint;
					if (c && m) {
						var e = {
							x: 0,
							y: 0,
							width: 0,
							height: 0
						};
						m = this.getAnchor(m);
						var b = c.getBBox();
						m[0] += n.plotLeft - c.translateX;
						m[1] += n.plotTop - c.translateY;
						e.x = Math.min(0, m[0]);
						e.y = Math.min(0, m[1]);
						e.width = 0 > m[0] ? Math.max(Math.abs(m[0]), b.width - m[0]) : Math.max(
							Math.abs(m[0]), b.width);
						e.height = 0 > m[1] ?
							Math.max(Math.abs(m[1]), b.height - Math.abs(m[1])) : Math.max(Math.abs(
								m[1]), b.height);
						this.tracker ? this.tracker.attr(e) : (this.tracker = c.renderer.rect(e)
							.addClass("highcharts-tracker").add(c), n.styledMode || this.tracker
							.attr({
								fill: "rgba(0,0,0,0)"
							}))
					}
				} else this.tracker && this.tracker.destroy()
			};
			d.prototype.styledModeFormat = function(c) {
				return c.replace('style="font-size: 10px"', 'class="highcharts-header"').replace(
					/style="color:{(point|series)\.color}"/g,
					'class="highcharts-color-{$1.colorIndex} {series.options.className} {point.options.className}"'
					)
			};
			d.prototype.tooltipFooterHeaderFormatter = function(c, l) {
				var m = c.series,
					e = m.tooltipOptions,
					b = m.xAxis,
					a = b && b.dateTime;
				b = {
					isFooter: l,
					labelConfig: c
				};
				var k = e.xDateFormat,
					n = e[l ? "footerFormat" : "headerFormat"];
				q(this, "headerFormatter", b, function(b) {
					a && !k && f(c.key) && (k = a.getXDateFormat(c.key, e
						.dateTimeLabelFormats));
					a && k && (c.point && c.point.tooltipDateKeys || ["key"]).forEach(
						function(a) {
							n = n.replace("{point." + a + "}", "{point." + a + ":" + k +
								"}")
						});
					m.chart.styledMode && (n = this.styledModeFormat(n));
					b.text = C(n, {
							point: c,
							series: m
						},
						this.chart)
				});
				return b.text
			};
			d.prototype.update = function(c) {
				this.destroy();
				D(!0, this.chart.options.tooltip.userOptions, c);
				this.init(this.chart, D(!0, this.options, c))
			};
			d.prototype.updatePosition = function(c) {
				var n = this.chart,
					m = this.options,
					e = n.pointer,
					b = this.getLabel();
				e = e.getChartPosition();
				var a = (m.positioner || this.getPosition).call(this, b.width, b.height, c),
					k = c.plotX + n.plotLeft;
				c = c.plotY + n.plotTop;
				if (this.outside) {
					m = m.borderWidth + 2 * this.distance;
					this.renderer.setSize(b.width + m, b.height + m, !1);
					if (1 !==
						e.scaleX || 1 !== e.scaleY) r(this.container, {
						transform: "scale(".concat(e.scaleX, ", ").concat(e.scaleY, ")")
					}), k *= e.scaleX, c *= e.scaleY;
					k += e.left - a.x;
					c += e.top - a.y
				}
				this.move(Math.round(a.x), Math.round(a.y || 0), k, c)
			};
			return d
		}();
		"";
		return d
	});
	I(g, "Core/Series/Point.js", [g["Core/Renderer/HTML/AST.js"], g["Core/Animation/AnimationUtilities.js"], g[
		"Core/Defaults.js"], g["Core/FormatUtilities.js"], g["Core/Utilities.js"]], function(d, g, z, B,
	y) {
		var C = g.animObject,
			A = z.defaultOptions,
			x = B.format,
			t = y.addEvent,
			r = y.defined,
			h = y.erase,
			l = y.extend,
			q = y.fireEvent,
			p = y.getNestedProperty,
			f = y.isArray,
			c = y.isFunction,
			D = y.isNumber,
			G = y.isObject,
			H = y.merge,
			K = y.objectEach,
			w = y.pick,
			n = y.syncTimeout,
			u = y.removeEvent,
			m = y.uniqueKey;
		g = function() {
			function e() {
				this.category = void 0;
				this.formatPrefix = "point";
				this.id = void 0;
				this.isNull = !1;
				this.percentage = this.options = this.name = void 0;
				this.selected = !1;
				this.total = this.shapeArgs = this.series = void 0;
				this.visible = !0;
				this.x = void 0
			}
			e.prototype.animateBeforeDestroy = function() {
				var b = this,
					a = {
						x: b.startXPos,
						opacity: 0
					},
					k = b.getGraphicalProps();
				k.singular.forEach(function(k) {
					b[k] = b[k].animate("dataLabel" === k ? {
						x: b[k].startXPos,
						y: b[k].startYPos,
						opacity: 0
					} : a)
				});
				k.plural.forEach(function(a) {
					b[a].forEach(function(a) {
						a.element && a.animate(l({
							x: b.startXPos
						}, a.startYPos ? {
							x: a.startXPos,
							y: a.startYPos
						} : {}))
					})
				})
			};
			e.prototype.applyOptions = function(b, a) {
				var k = this.series,
					m = k.options.pointValKey || k.pointValKey;
				b = e.prototype.optionsToObject.call(this, b);
				l(this, b);
				this.options = this.options ? l(this.options, b) : b;
				b.group && delete this.group;
				b.dataLabels && delete this.dataLabels;
				m && (this.y = e.prototype.getNestedProperty.call(this, m));
				this.formatPrefix = (this.isNull = this.isValid && !this.isValid()) ? "null" :
					"point";
				this.selected && (this.state = "select");
				"name" in this && "undefined" === typeof a && k.xAxis && k.xAxis.hasNames && (this
					.x = k.xAxis.nameToX(this));
				"undefined" === typeof this.x && k ? this.x = "undefined" === typeof a ? k
					.autoIncrement() : a : D(b.x) && k.options.relativeXValue && (this.x = k
						.autoIncrement(b.x));
				return this
			};
			e.prototype.destroy = function() {
				function b() {
					if (a.graphic ||
						a.graphics || a.dataLabel || a.dataLabels) u(a), a.destroyElements();
					for (f in a) a[f] = null
				}
				var a = this,
					k = a.series,
					e = k.chart;
				k = k.options.dataSorting;
				var m = e.hoverPoints,
					c = C(a.series.chart.renderer.globalAnimation),
					f;
				a.legendItem && e.legend.destroyItem(a);
				m && (a.setState(), h(m, a), m.length || (e.hoverPoints = null));
				if (a === e.hoverPoint) a.onMouseOut();
				k && k.enabled ? (this.animateBeforeDestroy(), n(b, c.duration)) : b();
				e.pointCount--
			};
			e.prototype.destroyElements = function(b) {
				var a = this;
				b = a.getGraphicalProps(b);
				b.singular.forEach(function(b) {
					a[b] =
						a[b].destroy()
				});
				b.plural.forEach(function(b) {
					a[b].forEach(function(a) {
						a.element && a.destroy()
					});
					delete a[b]
				})
			};
			e.prototype.firePointEvent = function(b, a, k) {
				var e = this,
					m = this.series.options;
				(m.point.events[b] || e.options && e.options.events && e.options.events[b]) && e
					.importEvents();
				"click" === b && m.allowPointSelect && (k = function(a) {
					e.select && e.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
				});
				q(e, b, a, k)
			};
			e.prototype.getClassName = function() {
				return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") +
					(this.negative ? " highcharts-negative" : "") + (this.isNull ?
						" highcharts-null-point" : "") + ("undefined" !== typeof this.colorIndex ?
						" highcharts-color-" + this.colorIndex : "") + (this.options.className ?
						" " + this.options.className : "") + (this.zone && this.zone.className ?
						" " + this.zone.className.replace("highcharts-negative", "") : "")
			};
			e.prototype.getGraphicalProps = function(b) {
				var a = this,
					k = [],
					e = {
						singular: [],
						plural: []
					},
					m;
				b = b || {
					graphic: 1,
					dataLabel: 1
				};
				b.graphic && k.push("graphic", "shadowGroup");
				b.dataLabel && k.push("dataLabel",
					"dataLabelPath", "dataLabelUpper", "connector");
				for (m = k.length; m--;) {
					var c = k[m];
					a[c] && e.singular.push(c)
				} ["graphic", "dataLabel", "connector"].forEach(function(k) {
					var m = k + "s";
					b[k] && a[m] && e.plural.push(m)
				});
				return e
			};
			e.prototype.getLabelConfig = function() {
				return {
					x: this.category,
					y: this.y,
					color: this.color,
					colorIndex: this.colorIndex,
					key: this.name || this.category,
					series: this.series,
					point: this,
					percentage: this.percentage,
					total: this.total || this.stackTotal
				}
			};
			e.prototype.getNestedProperty = function(b) {
				if (b) return 0 ===
					b.indexOf("custom.") ? p(b, this.options) : this[b]
			};
			e.prototype.getZone = function() {
				var b = this.series,
					a = b.zones;
				b = b.zoneAxis || "y";
				var k, e = 0;
				for (k = a[e]; this[b] >= k.value;) k = a[++e];
				this.nonZonedColor || (this.nonZonedColor = this.color);
				this.color = k && k.color && !this.options.color ? k.color : this.nonZonedColor;
				return k
			};
			e.prototype.hasNewShapeType = function() {
				return (this.graphic && (this.graphic.symbolName || this.graphic.element
					.nodeName)) !== this.shapeType
			};
			e.prototype.init = function(b, a, k) {
				this.series = b;
				this.applyOptions(a,
					k);
				this.id = r(this.id) ? this.id : m();
				this.resolveColor();
				b.chart.pointCount++;
				q(this, "afterInit");
				return this
			};
			e.prototype.isValid = function() {
				return null !== this.x && D(this.y)
			};
			e.prototype.optionsToObject = function(b) {
				var a = this.series,
					k = a.options.keys,
					m = k || a.pointArrayMap || ["y"],
					c = m.length,
					n = {},
					l = 0,
					h = 0;
				if (D(b) || null === b) n[m[0]] = b;
				else if (f(b))
					for (!k && b.length > c && (a = typeof b[0], "string" === a ? n.name = b[0] :
							"number" === a && (n.x = b[0]), l++); h < c;) k && "undefined" ===
						typeof b[l] || (0 < m[h].indexOf(".") ? e.prototype.setNestedProperty(n,
							b[l], m[h]) : n[m[h]] = b[l]), l++, h++;
				else "object" === typeof b && (n = b, b.dataLabels && (a._hasPointLabels = !0), b
					.marker && (a._hasPointMarkers = !0));
				return n
			};
			e.prototype.resolveColor = function() {
				var b = this.series,
					a = b.chart.styledMode;
				var k = b.chart.options.chart.colorCount;
				delete this.nonZonedColor;
				if (b.options.colorByPoint) {
					if (!a) {
						k = b.options.colors || b.chart.options.colors;
						var e = k[b.colorCounter];
						k = k.length
					}
					a = b.colorCounter;
					b.colorCounter++;
					b.colorCounter === k && (b.colorCounter = 0)
				} else a || (e = b.color), a = b.colorIndex;
				this.colorIndex = w(this.options.colorIndex, a);
				this.color = w(this.options.color, e)
			};
			e.prototype.setNestedProperty = function(b, a, k) {
				k.split(".").reduce(function(b, k, e, m) {
					b[k] = m.length - 1 === e ? a : G(b[k], !0) ? b[k] : {};
					return b[k]
				}, b);
				return b
			};
			e.prototype.shouldDraw = function() {
				return !this.isNull
			};
			e.prototype.tooltipFormatter = function(b) {
				var a = this.series,
					k = a.tooltipOptions,
					e = w(k.valueDecimals, ""),
					m = k.valuePrefix || "",
					c = k.valueSuffix || "";
				a.chart.styledMode && (b = a.chart.tooltip.styledModeFormat(b));
				(a.pointArrayMap || ["y"]).forEach(function(a) {
					a = "{point." + a;
					if (m || c) b = b.replace(RegExp(a + "}", "g"), m + a + "}" + c);
					b = b.replace(RegExp(a + "}", "g"), a + ":,." + e + "f}")
				});
				return x(b, {
					point: this,
					series: this.series
				}, a.chart)
			};
			e.prototype.update = function(b, a, k, e) {
				function m() {
					c.applyOptions(b);
					var e = f && c.hasMockGraphic;
					e = null === c.y ? !e : e;
					f && e && (c.graphic = f.destroy(), delete c.hasMockGraphic);
					G(b, !0) && (f && f.element && b && b.marker && "undefined" !== typeof b.marker
						.symbol && (c.graphic = f.destroy()), b && b.dataLabels && c
						.dataLabel && (c.dataLabel = c.dataLabel.destroy()),
						c.connector && (c.connector = c.connector.destroy()));
					d = c.index;
					n.updateParallelArrays(c, d);
					h.data[d] = G(h.data[d], !0) || G(b, !0) ? c.options : w(b, h.data[d]);
					n.isDirty = n.isDirtyData = !0;
					!n.fixedBox && n.hasCartesianSeries && (l.isDirtyBox = !0);
					"point" === h.legendType && (l.isDirtyLegend = !0);
					a && l.redraw(k)
				}
				var c = this,
					n = c.series,
					f = c.graphic,
					l = n.chart,
					h = n.options,
					d;
				a = w(a, !0);
				!1 === e ? m() : c.firePointEvent("update", {
					options: b
				}, m)
			};
			e.prototype.remove = function(b, a) {
				this.series.removePoint(this.series.data.indexOf(this), b, a)
			};
			e.prototype.select = function(b, a) {
				var k = this,
					e = k.series,
					m = e.chart;
				this.selectedStaging = b = w(b, !k.selected);
				k.firePointEvent(b ? "select" : "unselect", {
					accumulate: a
				}, function() {
					k.selected = k.options.selected = b;
					e.options.data[e.data.indexOf(k)] = k.options;
					k.setState(b && "select");
					a || m.getSelectedPoints().forEach(function(a) {
						var b = a.series;
						a.selected && a !== k && (a.selected = a.options
							.selected = !1, b.options.data[b.data.indexOf(a)] =
							a.options, a.setState(m.hoverPoints && b.options
								.inactiveOtherPoints ? "inactive" : ""), a
							.firePointEvent("unselect"))
					})
				});
				delete this.selectedStaging
			};
			e.prototype.onMouseOver = function(b) {
				var a = this.series.chart,
					k = a.pointer;
				b = b ? k.normalize(b) : k.getChartCoordinatesFromPoint(this, a.inverted);
				k.runPointActions(b, this)
			};
			e.prototype.onMouseOut = function() {
				var b = this.series.chart;
				this.firePointEvent("mouseOut");
				this.series.options.inactiveOtherPoints || (b.hoverPoints || []).forEach(function(
				a) {
					a.setState()
				});
				b.hoverPoints = b.hoverPoint = null
			};
			e.prototype.importEvents = function() {
				if (!this.hasImportedEvents) {
					var b = this,
						a = H(b.series.options.point,
							b.options).events;
					b.events = a;
					K(a, function(a, e) {
						c(a) && t(b, e, a)
					});
					this.hasImportedEvents = !0
				}
			};
			e.prototype.setState = function(b, a) {
				var k = this.series,
					e = this.state,
					m = k.options.states[b || "normal"] || {},
					c = A.plotOptions[k.type].marker && k.options.marker,
					n = c && !1 === c.enabled,
					f = c && c.states && c.states[b || "normal"] || {},
					h = !1 === f.enabled,
					u = this.marker || {},
					p = k.chart,
					g = c && k.markerAttribs,
					r = k.halo,
					t, G = k.stateMarkerGraphic;
				b = b || "";
				if (!(b === this.state && !a || this.selected && "select" !== b || !1 === m
						.enabled || b && (h || n && !1 === f.enabled) ||
						b && u.states && u.states[b] && !1 === u.states[b].enabled)) {
					this.state = b;
					g && (t = k.markerAttribs(this, b));
					if (this.graphic && !this.hasMockGraphic) {
						e && this.graphic.removeClass("highcharts-point-" + e);
						b && this.graphic.addClass("highcharts-point-" + b);
						if (!p.styledMode) {
							e = k.pointAttribs(this, b);
							var P = w(p.options.chart.animation, m.animation);
							var U = e.opacity;
							k.options.inactiveOtherPoints && D(U) && ((this.dataLabels || [])
								.forEach(function(a) {
									a && !a.hasClass("highcharts-data-label-hidden") && a
										.animate({
											opacity: U
										}, P)
								}), this.connector &&
								this.connector.animate({
									opacity: U
								}, P));
							this.graphic.animate(e, P)
						}
						t && this.graphic.animate(t, w(p.options.chart.animation, f.animation, c
							.animation));
						G && G.hide()
					} else {
						if (b && f) {
							c = u.symbol || k.symbol;
							G && G.currentSymbol !== c && (G = G.destroy());
							if (t)
								if (G) G[a ? "animate" : "attr"]({
									x: t.x,
									y: t.y
								});
								else c && (k.stateMarkerGraphic = G = p.renderer.symbol(c, t.x, t.y,
										t.width, t.height).add(k.markerGroup), G.currentSymbol =
									c);
							!p.styledMode && G && "inactive" !== this.state && G.attr(k
								.pointAttribs(this, b))
						}
						G && (G[b && this.isInside ? "show" : "hide"](),
							G.element.point = this, G.addClass(this.getClassName(), !0))
					}
					m = m.halo;
					t = (G = this.graphic || G) && G.visibility || "inherit";
					m && m.size && G && "hidden" !== t && !this.isCluster ? (r || (k.halo = r = p
							.renderer.path().add(G.parentGroup)), r.show()[a ? "animate" :
							"attr"]({
							d: this.haloPath(m.size)
						}), r.attr({
							"class": "highcharts-halo highcharts-color-" + w(this
								.colorIndex, k.colorIndex) + (this.className ? " " +
								this.className : ""),
							visibility: t,
							zIndex: -1
						}), r.point = this, p.styledMode || r.attr(l({
								fill: this.color || k.color,
								"fill-opacity": m.opacity
							},
							d.filterUserAttributes(m.attributes || {})))) : r && r.point && r.point
						.haloPath && r.animate({
							d: r.point.haloPath(0)
						}, null, r.hide);
					q(this, "afterSetState", {
						state: b
					})
				}
			};
			e.prototype.haloPath = function(b) {
				return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - b, this
					.plotY - b, 2 * b, 2 * b)
			};
			return e
		}();
		"";
		return g
	});
	I(g, "Core/Pointer.js", [g["Core/Color/Color.js"], g["Core/Globals.js"], g["Core/Tooltip.js"], g[
		"Core/Utilities.js"]], function(d, g, z, B) {
		var y = d.parse,
			C = g.charts,
			A = g.noop,
			x = B.addEvent,
			t = B.attr,
			r = B.css,
			h = B.defined,
			l = B.extend,
			q = B.find,
			p = B.fireEvent,
			f = B.isNumber,
			c = B.isObject,
			D = B.objectEach,
			G = B.offset,
			H = B.pick,
			K = B.splat;
		d = function() {
			function d(c, f) {
				this.lastValidTouch = {};
				this.pinchDown = [];
				this.runChartClick = !1;
				this.eventsToUnbind = [];
				this.chart = c;
				this.hasDragged = !1;
				this.options = f;
				this.init(c, f)
			}
			d.prototype.applyInactiveState = function(c) {
				var n = [],
					m;
				(c || []).forEach(function(e) {
					m = e.series;
					n.push(m);
					m.linkedParent && n.push(m.linkedParent);
					m.linkedSeries && (n = n.concat(m.linkedSeries));
					m.navigatorSeries &&
						n.push(m.navigatorSeries)
				});
				this.chart.series.forEach(function(e) {
					-1 === n.indexOf(e) ? e.setState("inactive", !0) : e.options
						.inactiveOtherPoints && e.setAllPointsToState("inactive")
				})
			};
			d.prototype.destroy = function() {
				var c = this;
				this.eventsToUnbind.forEach(function(c) {
					return c()
				});
				this.eventsToUnbind = [];
				g.chartCount || (d.unbindDocumentMouseUp && (d.unbindDocumentMouseUp = d
					.unbindDocumentMouseUp()), d.unbindDocumentTouchEnd && (d
					.unbindDocumentTouchEnd = d.unbindDocumentTouchEnd()));
				clearInterval(c.tooltipTimeout);
				D(c, function(n, m) {
					c[m] = void 0
				})
			};
			d.prototype.getSelectionMarkerAttrs = function(c, f) {
				var m = this,
					e = {
						args: {
							chartX: c,
							chartY: f
						},
						attrs: {},
						shapeType: "rect"
					};
				p(this, "getSelectionMarkerAttrs", e, function(b) {
					var a = m.chart,
						k = m.mouseDownX;
					k = void 0 === k ? 0 : k;
					var e = m.mouseDownY;
					e = void 0 === e ? 0 : e;
					var n = m.zoomHor,
						l = m.zoomVert;
					b = b.attrs;
					b.x = a.plotLeft;
					b.y = a.plotTop;
					b.width = n ? 1 : a.plotWidth;
					b.height = l ? 1 : a.plotHeight;
					n && (a = c - k, b.width = Math.abs(a), b.x = (0 < a ? 0 : a) + k);
					l && (a = f - e, b.height = Math.abs(a), b.y = (0 < a ? 0 : a) + e)
				});
				return e
			};
			d.prototype.drag = function(n) {
				var f = this.chart,
					m = f.options.chart,
					e = f.plotLeft,
					b = f.plotTop,
					a = f.plotWidth,
					k = f.plotHeight,
					l = this.mouseDownX || 0,
					h = this.mouseDownY || 0,
					d = c(m.panning) ? m.panning && m.panning.enabled : m.panning,
					p = m.panKey && n[m.panKey + "Key"],
					g = n.chartX,
					q = n.chartY,
					w = this.selectionMarker;
				w && w.touch || (g < e ? g = e : g > e + a && (g = e + a), q < b ? q = b : q > b +
					k && (q = b + k), this.hasDragged = Math.sqrt(Math.pow(l - g, 2) + Math.pow(
						h - q, 2)), 10 < this.hasDragged && (e = f.isInsidePlot(l - e, h - b, {
							visiblePlotOnly: !0
						}), q = this.getSelectionMarkerAttrs(g,
							q), g = q.shapeType, q = q.attrs, !f.hasCartesianSeries && !f
						.mapView || !this.zoomX && !this.zoomY || !e || p || w || (this
							.selectionMarker = w = f.renderer[g](), w.attr({
								"class": "highcharts-selection-marker",
								zIndex: 7
							}).add(), f.styledMode || w.attr({
								fill: m.selectionMarkerFill || y("#335cad").setOpacity(.25)
									.get()
							})), w && w.attr(q), e && !w && d && f.pan(n, m.panning)))
			};
			d.prototype.dragStart = function(c) {
				var n = this.chart;
				n.mouseIsDown = c.type;
				n.cancelClick = !1;
				n.mouseDownX = this.mouseDownX = c.chartX;
				n.mouseDownY = this.mouseDownY = c.chartY
			};
			d.prototype.getSelectionBox =
				function(c) {
					var n = {
						args: {
							marker: c
						},
						result: {}
					};
					p(this, "getSelectionBox", n, function(m) {
						m.result = {
							x: c.attr ? +c.attr("x") : c.x,
							y: c.attr ? +c.attr("y") : c.y,
							width: c.attr ? c.attr("width") : c.width,
							height: c.attr ? c.attr("height") : c.height
						}
					});
					return n.result
				};
			d.prototype.drop = function(c) {
				var n = this,
					m = this.chart,
					e = this.hasPinched;
				if (this.selectionMarker) {
					var b = this.getSelectionBox(this.selectionMarker),
						a = b.x,
						k = b.y,
						d = b.width,
						g = b.height,
						q = {
							originalEvent: c,
							xAxis: [],
							yAxis: [],
							x: a,
							y: k,
							width: d,
							height: g
						},
						w = !!m.mapView;
					if (this.hasDragged ||
						e) m.axes.forEach(function(b) {
						if (b.zoomEnabled && h(b.min) && (e || n[{
								xAxis: "zoomX",
								yAxis: "zoomY"
							} [b.coll]]) && f(a) && f(k) && f(d) && f(g)) {
							var m = b.horiz,
								l = "touchend" === c.type ? b.minPixelPadding : 0,
								v = b.toValue((m ? a : k) + l);
							m = b.toValue((m ? a + d : k + g) - l);
							q[b.coll].push({
								axis: b,
								min: Math.min(v, m),
								max: Math.max(v, m)
							});
							w = !0
						}
					}), w && p(m, "selection", q, function(a) {
						m.zoom(l(a, e ? {
							animation: !1
						} : null))
					});
					f(m.index) && (this.selectionMarker = this.selectionMarker.destroy());
					e && this.scaleGroups()
				}
				m && f(m.index) && (r(m.container, {
						cursor: m._cursor
					}),
					m.cancelClick = 10 < this.hasDragged, m.mouseIsDown = this.hasDragged = this
					.hasPinched = !1, this.pinchDown = [])
			};
			d.prototype.findNearestKDPoint = function(n, f, m) {
				var e;
				n.forEach(function(b) {
					var a = !(b.noSharedTooltip && f) && 0 > b.options.findNearestPointBy
						.indexOf("y");
					b = b.searchPoint(m, a);
					if ((a = c(b, !0) && b.series) && !(a = !c(e, !0))) {
						a = e.distX - b.distX;
						var k = e.dist - b.dist,
							n = (b.series.group && b.series.group.zIndex) - (e.series
								.group && e.series.group.zIndex);
						a = 0 < (0 !== a && f ? a : 0 !== k ? k : 0 !== n ? n : e.series
							.index > b.series.index ? -1 : 1)
					}
					a &&
						(e = b)
				});
				return e
			};
			d.prototype.getChartCoordinatesFromPoint = function(c, l) {
				var m = c.series,
					e = m.xAxis;
				m = m.yAxis;
				var b = c.shapeArgs;
				if (e && m) {
					var a = H(c.clientX, c.plotX),
						k = c.plotY || 0;
					c.isNode && b && f(b.x) && f(b.y) && (a = b.x, k = b.y);
					return l ? {
						chartX: m.len + m.pos - k,
						chartY: e.len + e.pos - a
					} : {
						chartX: a + e.pos,
						chartY: k + m.pos
					}
				}
				if (b && b.x && b.y) return {
					chartX: b.x,
					chartY: b.y
				}
			};
			d.prototype.getChartPosition = function() {
				if (this.chartPosition) return this.chartPosition;
				var c = this.chart.container,
					f = G(c);
				this.chartPosition = {
					left: f.left,
					top: f.top,
					scaleX: 1,
					scaleY: 1
				};
				var m = c.offsetWidth;
				c = c.offsetHeight;
				2 < m && 2 < c && (this.chartPosition.scaleX = f.width / m, this.chartPosition
					.scaleY = f.height / c);
				return this.chartPosition
			};
			d.prototype.getCoordinates = function(c) {
				var n = {
					xAxis: [],
					yAxis: []
				};
				this.chart.axes.forEach(function(m) {
					n[m.isXAxis ? "xAxis" : "yAxis"].push({
						axis: m,
						value: m.toValue(c[m.horiz ? "chartX" : "chartY"])
					})
				});
				return n
			};
			d.prototype.getHoverData = function(n, f, m, e, b, a) {
				var k = [];
				e = !(!e || !n);
				var l = function(a) {
						return a.visible && !(!b && a.directTouch) &&
							H(a.options.enableMouseTracking, !0)
					},
					h = {
						chartX: a ? a.chartX : void 0,
						chartY: a ? a.chartY : void 0,
						shared: b
					};
				p(this, "beforeGetHoverData", h);
				var d = f && !f.stickyTracking ? [f] : m.filter(function(a) {
					return a.stickyTracking && (h.filter || l)(a)
				});
				var u = e || !a ? n : this.findNearestKDPoint(d, b, a);
				f = u && u.series;
				u && (b && !f.noSharedTooltip ? (d = m.filter(function(a) {
					return h.filter ? h.filter(a) : l(a) && !a.noSharedTooltip
				}), d.forEach(function(a) {
					var b = q(a.points, function(a) {
						return a.x === u.x && !a.isNull
					});
					c(b) && (a.boosted && a.boost && (b =
						a.boost.getPoint(b)), k.push(b))
				})) : k.push(u));
				h = {
					hoverPoint: u
				};
				p(this, "afterGetHoverData", h);
				return {
					hoverPoint: h.hoverPoint,
					hoverSeries: f,
					hoverPoints: k
				}
			};
			d.prototype.getPointFromEvent = function(c) {
				c = c.target;
				for (var f; c && !f;) f = c.point, c = c.parentNode;
				return f
			};
			d.prototype.onTrackerMouseOut = function(c) {
				c = c.relatedTarget || c.toElement;
				var f = this.chart.hoverSeries;
				this.isDirectTouch = !1;
				if (!(!f || !c || f.stickyTracking || this.inClass(c, "highcharts-tooltip") || this
						.inClass(c, "highcharts-series-" + f.index) && this.inClass(c,
							"highcharts-tracker"))) f.onMouseOut()
			};
			d.prototype.inClass = function(c, f) {
				for (var m; c;) {
					if (m = t(c, "class")) {
						if (-1 !== m.indexOf(f)) return !0;
						if (-1 !== m.indexOf("highcharts-container")) return !1
					}
					c = c.parentElement
				}
			};
			d.prototype.init = function(c, f) {
				this.options = f;
				this.chart = c;
				this.runChartClick = !(!f.chart.events || !f.chart.events.click);
				this.pinchDown = [];
				this.lastValidTouch = {};
				z && (c.tooltip = new z(c, f.tooltip));
				this.setDOMEvents()
			};
			d.prototype.normalize = function(c, f) {
				var m = c.touches,
					e = m ? m.length ? m.item(0) : H(m.changedTouches,
						c.changedTouches)[0] : c;
				f || (f = this.getChartPosition());
				m = e.pageX - f.left;
				e = e.pageY - f.top;
				m /= f.scaleX;
				e /= f.scaleY;
				return l(c, {
					chartX: Math.round(m),
					chartY: Math.round(e)
				})
			};
			d.prototype.onContainerClick = function(c) {
				var f = this.chart,
					m = f.hoverPoint;
				c = this.normalize(c);
				var e = f.plotLeft,
					b = f.plotTop;
				f.cancelClick || (m && this.inClass(c.target, "highcharts-tracker") ? (p(m.series,
					"click", l(c, {
						point: m
					})), f.hoverPoint && m.firePointEvent("click", c)) : (l(c, this
						.getCoordinates(c)), f.isInsidePlot(c.chartX - e, c.chartY - b, {
						visiblePlotOnly: !0
					}) &&
					p(f, "click", c)))
			};
			d.prototype.onContainerMouseDown = function(c) {
				var f = 1 === ((c.buttons || c.button) & 1);
				c = this.normalize(c);
				if (g.isFirefox && 0 !== c.button) this.onContainerMouseMove(c);
				if ("undefined" === typeof c.button || f) this.zoomOption(c), f && c
					.preventDefault && c.preventDefault(), this.dragStart(c)
			};
			d.prototype.onContainerMouseLeave = function(c) {
				var f = C[H(d.hoverChartIndex, -1)],
					m = this.chart.tooltip;
				c = this.normalize(c);
				f && (c.relatedTarget || c.toElement) && (f.pointer.reset(), f.pointer
					.chartPosition = void 0);
				m && !m.isHidden &&
					this.reset()
			};
			d.prototype.onContainerMouseEnter = function(c) {
				delete this.chartPosition
			};
			d.prototype.onContainerMouseMove = function(c) {
				var f = this.chart,
					m = f.tooltip;
				c = this.normalize(c);
				this.setHoverChartIndex();
				c.preventDefault || (c.returnValue = !1);
				("mousedown" === f.mouseIsDown || this.touchSelect(c)) && this.drag(c);
				f.openMenu || !this.inClass(c.target, "highcharts-tracker") && !f.isInsidePlot(c
					.chartX - f.plotLeft, c.chartY - f.plotTop, {
						visiblePlotOnly: !0
					}) || m && m.shouldStickOnContact(c) || (this.inClass(c.target,
						"highcharts-no-tooltip") ?
					this.reset(!1, 0) : this.runPointActions(c))
			};
			d.prototype.onDocumentTouchEnd = function(c) {
				var f = C[H(d.hoverChartIndex, -1)];
				f && f.pointer.drop(c)
			};
			d.prototype.onContainerTouchMove = function(c) {
				if (this.touchSelect(c)) this.onContainerMouseMove(c);
				else this.touch(c)
			};
			d.prototype.onContainerTouchStart = function(c) {
				if (this.touchSelect(c)) this.onContainerMouseDown(c);
				else this.zoomOption(c), this.touch(c, !0)
			};
			d.prototype.onDocumentMouseMove = function(c) {
				var f = this.chart,
					m = f.tooltip,
					e = this.chartPosition;
				c = this.normalize(c,
					e);
				!e || f.isInsidePlot(c.chartX - f.plotLeft, c.chartY - f.plotTop, {
					visiblePlotOnly: !0
				}) || m && m.shouldStickOnContact(c) || this.inClass(c.target,
					"highcharts-tracker") || this.reset()
			};
			d.prototype.onDocumentMouseUp = function(c) {
				var f = C[H(d.hoverChartIndex, -1)];
				f && f.pointer.drop(c)
			};
			d.prototype.pinch = function(c) {
				var f = this,
					m = f.chart,
					e = f.pinchDown,
					b = c.touches || [],
					a = b.length,
					k = f.lastValidTouch,
					n = f.hasZoom,
					h = {},
					d = 1 === a && (f.inClass(c.target, "highcharts-tracker") && m
						.runTrackerClick || f.runChartClick),
					g = {},
					q = f.chart.tooltip;
				q = 1 === a && H(q && q.options.followTouchMove, !0);
				var w = f.selectionMarker;
				1 < a ? f.initiated = !0 : q && (f.initiated = !1);
				n && f.initiated && !d && !1 !== c.cancelable && c.preventDefault();
				[].map.call(b, function(a) {
					return f.normalize(a)
				});
				"touchstart" === c.type ? ([].forEach.call(b, function(a, b) {
					e[b] = {
						chartX: a.chartX,
						chartY: a.chartY
					}
				}), k.x = [e[0].chartX, e[1] && e[1].chartX], k.y = [e[0].chartY, e[1] && e[
					1].chartY], m.axes.forEach(function(a) {
					if (a.zoomEnabled) {
						var b = m.bounds[a.horiz ? "h" : "v"],
							k = a.minPixelPadding,
							e = a.toPixels(Math.min(H(a.options.min,
								a.dataMin), a.dataMin)),
							c = a.toPixels(Math.max(H(a.options.max, a.dataMax), a
								.dataMax)),
							f = Math.max(e, c);
						b.min = Math.min(a.pos, Math.min(e, c) - k);
						b.max = Math.max(a.pos + a.len, f + k)
					}
				}), f.res = !0) : q ? this.runPointActions(f.normalize(c)) : e.length && (p(m,
					"touchpan", {
						originalEvent: c
					},
					function() {
						w || (f.selectionMarker = w = l({
							destroy: A,
							touch: !0
						}, m.plotBox));
						f.pinchTranslate(e, b, h, w, g, k);
						f.hasPinched = n;
						f.scaleGroups(h, g)
					}), f.res && (f.res = !1, this.reset(!1, 0)))
			};
			d.prototype.pinchTranslate = function(c, f, m, e, b, a) {
				this.zoomHor &&
					this.pinchTranslateDirection(!0, c, f, m, e, b, a);
				this.zoomVert && this.pinchTranslateDirection(!1, c, f, m, e, b, a)
			};
			d.prototype.pinchTranslateDirection = function(c, f, m, e, b, a, k, l) {
				var h = this.chart,
					n = c ? "x" : "y",
					d = c ? "X" : "Y",
					v = "chart" + d,
					p = c ? "width" : "height",
					g = h["plot" + (c ? "Left" : "Top")],
					u = h.inverted,
					q = h.bounds[c ? "h" : "v"],
					w = 1 === f.length,
					r = f[0][v],
					D = !w && f[1][v];
				f = function() {
					"number" === typeof H && 20 < Math.abs(r - D) && (G = l || Math.abs(x - H) /
						Math.abs(r - D));
					t = (g - x) / G + r;
					P = h["plot" + (c ? "Width" : "Height")] / G
				};
				var P, t, G = l || 1,
					x = m[0][v],
					H = !w && m[1][v];
				f();
				m = t;
				if (m < q.min) {
					m = q.min;
					var A = !0
				} else m + P > q.max && (m = q.max - P, A = !0);
				A ? (x -= .8 * (x - k[n][0]), "number" === typeof H && (H -= .8 * (H - k[n][1])),
				f()) : k[n] = [x, H];
				u || (a[n] = t - g, a[p] = P);
				a = u ? 1 / G : G;
				b[p] = P;
				b[n] = m;
				e[u ? c ? "scaleY" : "scaleX" : "scale" + d] = G;
				e["translate" + d] = a * g + (x - a * r)
			};
			d.prototype.reset = function(c, f) {
				var m = this.chart,
					e = m.hoverSeries,
					b = m.hoverPoint,
					a = m.hoverPoints,
					k = m.tooltip,
					l = k && k.shared ? a : b;
				c && l && K(l).forEach(function(a) {
					a.series.isCartesian && "undefined" === typeof a.plotX && (c = !1)
				});
				if (c) k && l &&
					K(l).length && (k.refresh(l), k.shared && a ? a.forEach(function(a) {
						a.setState(a.state, !0);
						a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis
							.drawCrosshair(null, a), a.series.yAxis.crosshair && a
							.series.yAxis.drawCrosshair(null, a))
					}) : b && (b.setState(b.state, !0), m.axes.forEach(function(a) {
						a.crosshair && b.series[a.coll] === a && a.drawCrosshair(null,
							b)
					})));
				else {
					if (b) b.onMouseOut();
					a && a.forEach(function(a) {
						a.setState()
					});
					if (e) e.onMouseOut();
					k && k.hide(f);
					this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
					m.axes.forEach(function(a) {
						a.hideCrosshair()
					});
					this.hoverX = m.hoverPoints = m.hoverPoint = null
				}
			};
			d.prototype.runPointActions = function(c, f, m) {
				var e = this.chart,
					b = e.tooltip && e.tooltip.options.enabled ? e.tooltip : void 0,
					a = b ? b.shared : !1,
					k = f || e.hoverPoint,
					l = k && k.series || e.hoverSeries;
				f = this.getHoverData(k, l, e.series, (!c || "touchmove" !== c.type) && (!!f || l &&
					l.directTouch && this.isDirectTouch), a, c);
				k = f.hoverPoint;
				l = f.hoverSeries;
				var h = f.hoverPoints;
				f = l && l.tooltipOptions.followPointer && !l.tooltipOptions.split;
				var n =
					a && l && !l.noSharedTooltip;
				if (k && (m || k !== e.hoverPoint || b && b.isHidden)) {
					(e.hoverPoints || []).forEach(function(a) {
						-1 === h.indexOf(a) && a.setState()
					});
					if (e.hoverSeries !== l) l.onMouseOver();
					this.applyInactiveState(h);
					(h || []).forEach(function(a) {
						a.setState("hover")
					});
					e.hoverPoint && e.hoverPoint.firePointEvent("mouseOut");
					if (!k.series) return;
					e.hoverPoints = h;
					e.hoverPoint = k;
					k.firePointEvent("mouseOver", void 0, function() {
						b && k && b.refresh(n ? h : k, c)
					})
				} else f && b && !b.isHidden && (m = b.getAnchor([{}], c), e.isInsidePlot(m[0],
					m[1], {
						visiblePlotOnly: !0
					}) && b.updatePosition({
					plotX: m[0],
					plotY: m[1]
				}));
				this.unDocMouseMove || (this.unDocMouseMove = x(e.container.ownerDocument,
					"mousemove",
					function(a) {
						var b = C[d.hoverChartIndex];
						if (b) b.pointer.onDocumentMouseMove(a)
					}), this.eventsToUnbind.push(this.unDocMouseMove));
				e.axes.forEach(function(a) {
					var b = H((a.crosshair || {}).snap, !0),
						k;
					b && ((k = e.hoverPoint) && k.series[a.coll] === a || (k = q(h,
						function(b) {
							return b.series && b.series[a.coll] === a
						})));
					k || !b ? a.drawCrosshair(c, k) : a.hideCrosshair()
				})
			};
			d.prototype.scaleGroups =
				function(c, f) {
					var m = this.chart;
					m.series.forEach(function(e) {
						var b = c || e.getPlotBox();
						e.group && (e.xAxis && e.xAxis.zoomEnabled || m.mapView) && (e.group
							.attr(b), e.markerGroup && (e.markerGroup.attr(b), e.markerGroup
								.clip(f ? m.clipRect : null)), e.dataLabelsGroup && e
							.dataLabelsGroup.attr(b))
					});
					m.clipRect.attr(f || m.clipBox)
				};
			d.prototype.setDOMEvents = function() {
				var c = this,
					f = this.chart.container,
					m = f.ownerDocument;
				f.onmousedown = this.onContainerMouseDown.bind(this);
				f.onmousemove = this.onContainerMouseMove.bind(this);
				f.onclick =
					this.onContainerClick.bind(this);
				this.eventsToUnbind.push(x(f, "mouseenter", this.onContainerMouseEnter.bind(this)));
				this.eventsToUnbind.push(x(f, "mouseleave", this.onContainerMouseLeave.bind(this)));
				d.unbindDocumentMouseUp || (d.unbindDocumentMouseUp = x(m, "mouseup", this
					.onDocumentMouseUp.bind(this)));
				for (var e = this.chart.renderTo.parentElement; e && "BODY" !== e.tagName;) this
					.eventsToUnbind.push(x(e, "scroll", function() {
						delete c.chartPosition
					})), e = e.parentElement;
				g.hasTouch && (this.eventsToUnbind.push(x(f, "touchstart",
					this.onContainerTouchStart.bind(this), {
						passive: !1
					})), this.eventsToUnbind.push(x(f, "touchmove", this
					.onContainerTouchMove.bind(this), {
						passive: !1
					})), d.unbindDocumentTouchEnd || (d.unbindDocumentTouchEnd = x(m,
					"touchend", this.onDocumentTouchEnd.bind(this), {
						passive: !1
					})))
			};
			d.prototype.setHoverChartIndex = function() {
				var c = this.chart,
					f = g.charts[H(d.hoverChartIndex, -1)];
				if (f && f !== c) f.pointer.onContainerMouseLeave({
					relatedTarget: c.container
				});
				f && f.mouseIsDown || (d.hoverChartIndex = c.index)
			};
			d.prototype.touch = function(c,
				f) {
				var m = this.chart,
					e;
				this.setHoverChartIndex();
				if (1 === c.touches.length)
					if (c = this.normalize(c), (e = m.isInsidePlot(c.chartX - m.plotLeft, c.chartY -
							m.plotTop, {
								visiblePlotOnly: !0
							})) && !m.openMenu) {
						f && this.runPointActions(c);
						if ("touchmove" === c.type) {
							f = this.pinchDown;
							var b = f[0] ? 4 <= Math.sqrt(Math.pow(f[0].chartX - c.chartX, 2) + Math
								.pow(f[0].chartY - c.chartY, 2)) : !1
						}
						H(b, !0) && this.pinch(c)
					} else f && this.reset();
				else 2 === c.touches.length && this.pinch(c)
			};
			d.prototype.touchSelect = function(c) {
				return !(!this.chart.options.chart.zooming.singleTouch ||
					!c.touches || 1 !== c.touches.length)
			};
			d.prototype.zoomOption = function(c) {
				var f = this.chart,
					m = f.options.chart;
				f = f.inverted;
				var e = m.zooming.type || "";
				/touch/.test(c.type) && (e = H(m.zooming.pinchType, e));
				this.zoomX = c = /x/.test(e);
				this.zoomY = m = /y/.test(e);
				this.zoomHor = c && !f || m && f;
				this.zoomVert = m && !f || c && f;
				this.hasZoom = c || m
			};
			return d
		}();
		"";
		return d
	});
	I(g, "Core/MSPointer.js", [g["Core/Globals.js"], g["Core/Pointer.js"], g["Core/Utilities.js"]], function(d, g,
		z) {
		function B() {
			var f = [];
			f.item = function(c) {
				return this[c]
			};
			q(c, function(c) {
				f.push({
					pageX: c.pageX,
					pageY: c.pageY,
					target: c.target
				})
			});
			return f
		}

		function y(c, f, l, h) {
			var d = A[g.hoverChartIndex || NaN];
			"touch" !== c.pointerType && c.pointerType !== c.MSPOINTER_TYPE_TOUCH || !d || (d = d.pointer,
				h(c), d[f]({
					type: l,
					target: c.currentTarget,
					preventDefault: t,
					touches: B()
				}))
		}
		var C = this && this.__extends || function() {
				var c = function(f, l) {
					c = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function(c, f) {
						c.__proto__ = f
					} || function(c, f) {
						for (var l in f) f.hasOwnProperty(l) && (c[l] = f[l])
					};
					return c(f,
						l)
				};
				return function(f, l) {
					function h() {
						this.constructor = f
					}
					c(f, l);
					f.prototype = null === l ? Object.create(l) : (h.prototype = l.prototype, new h)
				}
			}(),
			A = d.charts,
			x = d.doc,
			t = d.noop,
			r = d.win,
			h = z.addEvent,
			l = z.css,
			q = z.objectEach,
			p = z.pick,
			f = z.removeEvent,
			c = {},
			D = !!r.PointerEvent;
		return function(g) {
			function q() {
				return null !== g && g.apply(this, arguments) || this
			}
			C(q, g);
			q.isRequired = function() {
				return !(d.hasTouch || !r.PointerEvent && !r.MSPointerEvent)
			};
			q.prototype.batchMSEvents = function(c) {
				c(this.chart.container, D ? "pointerdown" :
					"MSPointerDown", this.onContainerPointerDown);
				c(this.chart.container, D ? "pointermove" : "MSPointerMove", this
					.onContainerPointerMove);
				c(x, D ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
			};
			q.prototype.destroy = function() {
				this.batchMSEvents(f);
				g.prototype.destroy.call(this)
			};
			q.prototype.init = function(c, f) {
				g.prototype.init.call(this, c, f);
				this.hasZoom && l(c.container, {
					"-ms-touch-action": "none",
					"touch-action": "none"
				})
			};
			q.prototype.onContainerPointerDown = function(f) {
				y(f, "onContainerTouchStart", "touchstart",
					function(f) {
						c[f.pointerId] = {
							pageX: f.pageX,
							pageY: f.pageY,
							target: f.currentTarget
						}
					})
			};
			q.prototype.onContainerPointerMove = function(f) {
				y(f, "onContainerTouchMove", "touchmove", function(f) {
					c[f.pointerId] = {
						pageX: f.pageX,
						pageY: f.pageY
					};
					c[f.pointerId].target || (c[f.pointerId].target = f.currentTarget)
				})
			};
			q.prototype.onDocumentPointerUp = function(f) {
				y(f, "onDocumentTouchEnd", "touchend", function(f) {
					delete c[f.pointerId]
				})
			};
			q.prototype.setDOMEvents = function() {
				var c = this.chart.tooltip;
				g.prototype.setDOMEvents.call(this);
				(this.hasZoom || p(c && c.options.followTouchMove, !0)) && this.batchMSEvents(h)
			};
			return q
		}(g)
	});
	I(g, "Core/Legend/Legend.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/FormatUtilities.js"], g[
		"Core/Globals.js"], g["Core/Series/Point.js"], g["Core/Renderer/RendererUtilities.js"], g[
		"Core/Utilities.js"]], function(d, g, z, B, y, C) {
		var A = d.animObject,
			x = d.setAnimation,
			t = g.format,
			r = z.marginNames,
			h = y.distribute,
			l = C.addEvent,
			q = C.createElement,
			p = C.css,
			f = C.defined,
			c = C.discardElement,
			D = C.find,
			G = C.fireEvent,
			H = C.isNumber,
			K = C.merge,
			w = C.pick,
			n = C.relativeLength,
			u = C.stableSort,
			m = C.syncTimeout;
		d = function() {
			function e(b, a) {
				this.allItems = [];
				this.contentGroup = this.box = void 0;
				this.display = !1;
				this.group = void 0;
				this.offsetWidth = this.maxLegendWidth = this.maxItemWidth = this.legendWidth = this
					.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX =
					this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY =
					0;
				this.options = void 0;
				this.padding = 0;
				this.pages = [];
				this.proximate = !1;
				this.scrollGroup = void 0;
				this.widthOption =
					this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0;
				this.chart = b;
				this.init(b, a)
			}
			e.prototype.init = function(b, a) {
				this.chart = b;
				this.setOptions(a);
				a.enabled && (this.render(), l(this.chart, "endResize", function() {
					this.legend.positionCheckboxes()
				}), this.proximate ? this.unchartrender = l(this.chart, "render",
			function() {
					this.legend.proximatePositions();
					this.legend.positionItems()
				}) : this.unchartrender && this.unchartrender())
			};
			e.prototype.setOptions = function(b) {
				var a = w(b.padding, 8);
				this.options =
					b;
				this.chart.styledMode || (this.itemStyle = b.itemStyle, this.itemHiddenStyle = K(
					this.itemStyle, b.itemHiddenStyle));
				this.itemMarginTop = b.itemMarginTop || 0;
				this.itemMarginBottom = b.itemMarginBottom || 0;
				this.padding = a;
				this.initialItemY = a - 5;
				this.symbolWidth = w(b.symbolWidth, 16);
				this.pages = [];
				this.proximate = "proximate" === b.layout && !this.chart.inverted;
				this.baseline = void 0
			};
			e.prototype.update = function(b, a) {
				var k = this.chart;
				this.setOptions(K(!0, this.options, b));
				this.destroy();
				k.isDirtyLegend = k.isDirtyBox = !0;
				w(a,
					!0) && k.redraw();
				G(this, "afterUpdate")
			};
			e.prototype.colorizeItem = function(b, a) {
				var k = b.legendItem || {},
					e = k.group,
					c = k.label,
					f = k.line;
				k = k.symbol;
				if (e) e[a ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
				if (!this.chart.styledMode) {
					var m = this.options;
					e = this.itemHiddenStyle.color;
					m = a ? m.itemStyle.color : e;
					var l = a ? b.color || e : e,
						h = b.options && b.options.marker,
						d = {
							fill: l
						};
					c && c.css({
						fill: m,
						color: m
					});
					f && f.attr({
						stroke: l
					});
					k && (h && k.isMarker && (d = b.pointAttribs(), a || (d.stroke = d.fill = e)), k
						.attr(d))
				}
				G(this, "afterColorizeItem", {
					item: b,
					visible: a
				})
			};
			e.prototype.positionItems = function() {
				this.allItems.forEach(this.positionItem, this);
				this.chart.isResizing || this.positionCheckboxes()
			};
			e.prototype.positionItem = function(b) {
				var a = this,
					k = b.legendItem || {},
					e = k.group,
					c = k.x;
				c = void 0 === c ? 0 : c;
				k = k.y;
				k = void 0 === k ? 0 : k;
				var m = this.options,
					l = m.symbolPadding,
					h = !m.rtl;
				m = b.checkbox;
				e && e.element && (l = {
					translateX: h ? c : this.legendWidth - c - 2 * l - 4,
					translateY: k
				}, e[f(e.translateY) ? "animate" : "attr"](l, void 0, function() {
					G(a, "afterPositionItem", {
						item: b
					})
				}));
				m && (m.x = c, m.y = k)
			};
			e.prototype.destroyItem = function(b) {
				for (var a = b.checkbox, k = b.legendItem || {}, e = 0, f = ["group", "label",
						"line", "symbol"
					]; e < f.length; e++) {
					var m = f[e];
					k[m] && (k[m] = k[m].destroy())
				}
				a && c(a);
				b.legendItem = void 0
			};
			e.prototype.destroy = function() {
				for (var b = 0, a = this.getAllItems(); b < a.length; b++) this.destroyItem(a[b]);
				b = 0;
				for (a = "clipRect up down pager nav box title group".split(" "); b < a
					.length; b++) {
					var k = a[b];
					this[k] && (this[k] = this[k].destroy())
				}
				this.display = null
			};
			e.prototype.positionCheckboxes = function() {
				var b =
					this.group && this.group.alignAttr,
					a = this.clipHeight || this.legendHeight,
					k = this.titleHeight;
				if (b) {
					var e = b.translateY;
					this.allItems.forEach(function(c) {
						var f = c.checkbox;
						if (f) {
							var m = e + k + f.y + (this.scrollOffset || 0) + 3;
							p(f, {
								left: b.translateX + c.checkboxOffset + f.x - 20 +
									"px",
								top: m + "px",
								display: this.proximate || m > e - 6 && m < e + a -
									6 ? "" : "none"
							})
						}
					}, this)
				}
			};
			e.prototype.renderTitle = function() {
				var b = this.options,
					a = this.padding,
					k = b.title,
					e = 0;
				k.text && (this.title || (this.title = this.chart.renderer.label(k.text, a - 3, a -
						4, void 0, void 0,
						void 0, b.useHTML, void 0, "legend-title").attr({
						zIndex: 1
					}), this.chart.styledMode || this.title.css(k.style), this.title.add(
						this.group)), k.width || this.title.css({
						width: this.maxLegendWidth + "px"
					}), b = this.title.getBBox(), e = b.height, this.offsetWidth = b.width, this
					.contentGroup.attr({
						translateY: e
					}));
				this.titleHeight = e
			};
			e.prototype.setText = function(b) {
				var a = this.options;
				b.legendItem.label.attr({
					text: a.labelFormat ? t(a.labelFormat, b, this.chart) : a.labelFormatter
						.call(b)
				})
			};
			e.prototype.renderItem = function(b) {
				var a =
					b.legendItem = b.legendItem || {},
					k = this.chart,
					e = k.renderer,
					c = this.options,
					f = this.symbolWidth,
					m = c.symbolPadding || 0,
					l = this.itemStyle,
					h = this.itemHiddenStyle,
					d = "horizontal" === c.layout ? w(c.itemDistance, 20) : 0,
					n = !c.rtl,
					p = !b.series,
					g = !p && b.series.drawLegendSymbol ? b.series : b,
					q = g.options,
					u = this.createCheckboxForItem && q && q.showCheckbox,
					r = c.useHTML,
					D = b.options.className,
					t = a.label;
				q = f + m + d + (u ? 20 : 0);
				t || (a.group = e.g("legend-item").addClass("highcharts-" + g.type +
						"-series highcharts-color-" + b.colorIndex + (D ? " " + D : "") + (p ?
							" highcharts-series-" + b.index : "")).attr({
						zIndex: 1
					}).add(this.scrollGroup), a.label = t = e.text("", n ? f + m : -m, this
						.baseline || 0, r), k.styledMode || t.css(K(b.visible ? l : h)), t
				.attr({
						align: n ? "left" : "right",
						zIndex: 2
					}).add(a.group), this.baseline || (this.fontMetrics = e.fontMetrics(k
							.styledMode ? 12 : l.fontSize, t), this.baseline = this.fontMetrics
						.f + 3 + this.itemMarginTop, t.attr("y", this.baseline), this
						.symbolHeight = c.symbolHeight || this.fontMetrics.f, c.squareSymbol &&
						(this.symbolWidth = w(c.symbolWidth, Math.max(this.symbolHeight,
							16)), q = this.symbolWidth + m + d + (u ? 20 : 0), n && t.attr(
							"x", this.symbolWidth + m))), g.drawLegendSymbol(this, b), this
					.setItemEvents && this.setItemEvents(b, t, r));
				u && !b.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(b);
				this.colorizeItem(b, b.visible);
				!k.styledMode && l.width || t.css({
					width: (c.itemWidth || this.widthOption || k.spacingBox.width) - q +
						"px"
				});
				this.setText(b);
				k = t.getBBox();
				e = this.fontMetrics && this.fontMetrics.h || 0;
				b.itemWidth = b.checkboxOffset = c.itemWidth || a.labelWidth || k.width + q;
				this.maxItemWidth =
					Math.max(this.maxItemWidth, b.itemWidth);
				this.totalItemWidth += b.itemWidth;
				this.itemHeight = b.itemHeight = Math.round(a.labelHeight || (k.height > 1.5 * e ? k
					.height : e))
			};
			e.prototype.layoutItem = function(b) {
				var a = this.options,
					k = this.padding,
					e = "horizontal" === a.layout,
					c = b.itemHeight,
					f = this.itemMarginBottom,
					m = this.itemMarginTop,
					l = e ? w(a.itemDistance, 20) : 0,
					h = this.maxLegendWidth;
				a = a.alignColumns && this.totalItemWidth > h ? this.maxItemWidth : b.itemWidth;
				var d = b.legendItem || {};
				e && this.itemX - k + a > h && (this.itemX = k, this.lastLineHeight &&
					(this.itemY += m + this.lastLineHeight + f), this.lastLineHeight = 0);
				this.lastItemY = m + this.itemY + f;
				this.lastLineHeight = Math.max(c, this.lastLineHeight);
				d.x = this.itemX;
				d.y = this.itemY;
				e ? this.itemX += a : (this.itemY += m + c + f, this.lastLineHeight = c);
				this.offsetWidth = this.widthOption || Math.max((e ? this.itemX - k - (b.checkbox ?
					0 : l) : a) + k, this.offsetWidth)
			};
			e.prototype.getAllItems = function() {
				var b = [];
				this.chart.series.forEach(function(a) {
					var k = a && a.options;
					a && w(k.showInLegend, f(k.linkedTo) ? !1 : void 0, !0) && (b = b
						.concat((a.legendItem || {}).labels || ("point" === k
							.legendType ? a.data : a)))
				});
				G(this, "afterGetAllItems", {
					allItems: b
				});
				return b
			};
			e.prototype.getAlignment = function() {
				var b = this.options;
				return this.proximate ? b.align.charAt(0) + "tv" : b.floating ? "" : b.align.charAt(
					0) + b.verticalAlign.charAt(0) + b.layout.charAt(0)
			};
			e.prototype.adjustMargins = function(b, a) {
				var k = this.chart,
					e = this.options,
					c = this.getAlignment();
				c && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(
					function(m, l) {
						m.test(c) && !f(b[l]) && (k[r[l]] = Math.max(k[r[l]],
							k.legend[(l + 1) % 2 ? "legendHeight" : "legendWidth"] + [1,
								-1, -1, 1
							][l] * e[l % 2 ? "x" : "y"] + w(e.margin, 12) + a[l] + (k
								.titleOffset[l] || 0)))
					})
			};
			e.prototype.proximatePositions = function() {
				var b = this.chart,
					a = [],
					k = "left" === this.options.align;
				this.allItems.forEach(function(e) {
					var c;
					var f = k;
					if (e.yAxis) {
						e.xAxis.options.reversed && (f = !f);
						e.points && (c = D(f ? e.points : e.points.slice(0).reverse(),
							function(a) {
								return H(a.plotY)
							}));
						f = this.itemMarginTop + e.legendItem.label.getBBox().height + this
							.itemMarginBottom;
						var m = e.yAxis.top - b.plotTop;
						e.visible ? (c = c ? c.plotY : e.yAxis.height, c += m - .3 * f) :
							c = m + e.yAxis.height;
						a.push({
							target: c,
							size: f,
							item: e
						})
					}
				}, this);
				for (var e, c = 0, f = h(a, b.plotHeight); c < f.length; c++) {
					var m = f[c];
					e = m.item.legendItem || {};
					m.pos && (e.y = b.plotTop - b.spacing[0] + m.pos)
				}
			};
			e.prototype.render = function() {
				var b = this.chart,
					a = b.renderer,
					k = this.options,
					e = this.padding,
					c = this.getAllItems(),
					f = this.group,
					m = this.box;
				this.itemX = e;
				this.itemY = this.initialItemY;
				this.lastItemY = this.offsetWidth = 0;
				this.widthOption = n(k.width, b.spacingBox.width - e);
				var l =
					b.spacingBox.width - 2 * e - k.x; - 1 < ["rm", "lm"].indexOf(this.getAlignment()
					.substring(0, 2)) && (l /= 2);
				this.maxLegendWidth = this.widthOption || l;
				f || (this.group = f = a.g("legend").addClass(k.className || "").attr({
					zIndex: 7
				}).add(), this.contentGroup = a.g().attr({
					zIndex: 1
				}).add(f), this.scrollGroup = a.g().add(this.contentGroup));
				this.renderTitle();
				u(c, function(a, b) {
					return (a.options && a.options.legendIndex || 0) - (b.options && b
						.options.legendIndex || 0)
				});
				k.reversed && c.reverse();
				this.allItems = c;
				this.display = l = !!c.length;
				this.itemHeight =
					this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
				c.forEach(this.renderItem, this);
				c.forEach(this.layoutItem, this);
				c = (this.widthOption || this.offsetWidth) + e;
				var h = this.lastItemY + this.lastLineHeight + this.titleHeight;
				h = this.handleOverflow(h);
				h += e;
				m || (this.box = m = a.rect().addClass("highcharts-legend-box").attr({
					r: k.borderRadius
				}).add(f));
				b.styledMode || m.attr({
					stroke: k.borderColor,
					"stroke-width": k.borderWidth || 0,
					fill: k.backgroundColor || "none"
				}).shadow(k.shadow);
				if (0 < c && 0 < h) m[m.placed ? "animate" :
					"attr"](m.crisp.call({}, {
					x: 0,
					y: 0,
					width: c,
					height: h
				}, m.strokeWidth()));
				f[l ? "show" : "hide"]();
				b.styledMode && "none" === f.getStyle("display") && (c = h = 0);
				this.legendWidth = c;
				this.legendHeight = h;
				l && this.align();
				this.proximate || this.positionItems();
				G(this, "afterRender")
			};
			e.prototype.align = function(b) {
				void 0 === b && (b = this.chart.spacingBox);
				var a = this.chart,
					k = this.options,
					e = b.y;
				/(lth|ct|rth)/.test(this.getAlignment()) && 0 < a.titleOffset[0] ? e += a
					.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < a.titleOffset[
						2] &&
					(e -= a.titleOffset[2]);
				e !== b.y && (b = K(b, {
					y: e
				}));
				a.hasRendered || (this.group.placed = !1);
				this.group.align(K(k, {
					width: this.legendWidth,
					height: this.legendHeight,
					verticalAlign: this.proximate ? "top" : k.verticalAlign
				}), !0, b)
			};
			e.prototype.handleOverflow = function(b) {
				var a = this,
					k = this.chart,
					e = k.renderer,
					c = this.options,
					f = c.y,
					m = "top" === c.verticalAlign,
					l = this.padding,
					h = c.maxHeight,
					d = c.navigation,
					n = w(d.animation, !0),
					p = d.arrowSize || 12,
					g = this.pages,
					q = this.allItems,
					u = function(b) {
						"number" === typeof b ? A.attr({
								height: b
							}) :
							A && (a.clipRect = A.destroy(), a.contentGroup.clip());
						a.contentGroup.div && (a.contentGroup.div.style.clip = b ? "rect(" + l +
							"px,9999px," + (l + b) + "px,0)" : "auto")
					},
					r = function(b) {
						a[b] = e.circle(0, 0, 1.3 * p).translate(p / 2, p / 2).add(x);
						k.styledMode || a[b].attr("fill", "rgba(0,0,0,0.0001)");
						return a[b]
					},
					D, t, G;
				f = k.spacingBox.height + (m ? -f : f) - l;
				var x = this.nav,
					A = this.clipRect;
				"horizontal" !== c.layout || "middle" === c.verticalAlign || c.floating || (f /= 2);
				h && (f = Math.min(f, h));
				g.length = 0;
				b && 0 < f && b > f && !1 !== d.enabled ? (this.clipHeight = D =
					Math.max(f - 20 - this.titleHeight - l, 0), this.currentPage = w(this
						.currentPage, 1), this.fullHeight = b, q.forEach(function(a, b) {
						G = a.legendItem || {};
						a = G.y || 0;
						var k = Math.round(G.label.getBBox().height),
							e = g.length;
						if (!e || a - g[e - 1] > D && (t || a) !== g[e - 1]) g.push(t || a),
							e++;
						G.pageIx = e - 1;
						t && ((q[b - 1].legendItem || {}).pageIx = e - 1);
						b === q.length - 1 && a + k - g[e - 1] > D && k <= D && (g.push(a),
							G.pageIx = e);
						a !== t && (t = a)
					}), A || (A = a.clipRect = e.clipRect(0, l, 9999, 0), a.contentGroup.clip(
						A)), u(D), x || (this.nav = x = e.g().attr({
							zIndex: 1
						}).add(this.group),
						this.up = e.symbol("triangle", 0, 0, p, p).add(x), r("upTracker").on(
							"click",
							function() {
								a.scroll(-1, n)
							}), this.pager = e.text("", 15, 10).addClass(
							"highcharts-legend-navigation"), !k.styledMode && d.style && this
						.pager.css(d.style), this.pager.add(x), this.down = e.symbol(
							"triangle-down", 0, 0, p, p).add(x), r("downTracker").on("click",
							function() {
								a.scroll(1, n)
							})), a.scroll(0), b = f) : x && (u(), this.nav = x.destroy(), this
					.scrollGroup.attr({
						translateY: 1
					}), this.clipHeight = 0);
				return b
			};
			e.prototype.scroll = function(b, a) {
				var k = this,
					e = this.chart,
					c = this.pages,
					f = c.length,
					l = this.clipHeight,
					h = this.options.navigation,
					d = this.pager,
					n = this.padding,
					p = this.currentPage + b;
				p > f && (p = f);
				0 < p && ("undefined" !== typeof a && x(a, e), this.nav.attr({
						translateX: n,
						translateY: l + this.padding + 7 + this.titleHeight,
						visibility: "inherit"
					}), [this.up, this.upTracker].forEach(function(a) {
						a.attr({
							"class": 1 === p ? "highcharts-legend-nav-inactive" :
								"highcharts-legend-nav-active"
						})
					}), d.attr({
						text: p + "/" + f
					}), [this.down, this.downTracker].forEach(function(a) {
						a.attr({
							x: 18 + this.pager.getBBox().width,
							"class": p === f ? "highcharts-legend-nav-inactive" :
								"highcharts-legend-nav-active"
						})
					}, this), e.styledMode || (this.up.attr({
						fill: 1 === p ? h.inactiveColor : h.activeColor
					}), this.upTracker.css({
						cursor: 1 === p ? "default" : "pointer"
					}), this.down.attr({
						fill: p === f ? h.inactiveColor : h.activeColor
					}), this.downTracker.css({
						cursor: p === f ? "default" : "pointer"
					})), this.scrollOffset = -c[p - 1] + this.initialItemY, this.scrollGroup
					.animate({
						translateY: this.scrollOffset
					}), this.currentPage = p, this.positionCheckboxes(), b = A(w(a, e.renderer
						.globalAnimation,
						!0)), m(function() {
						G(k, "afterScroll", {
							currentPage: p
						})
					}, b.duration))
			};
			e.prototype.setItemEvents = function(b, a, k) {
				var e = this,
					c = b.legendItem || {},
					f = e.chart.renderer.boxWrapper,
					m = b instanceof B,
					l = "highcharts-legend-" + (m ? "point" : "series") + "-active",
					h = e.chart.styledMode,
					d = function(a) {
						e.allItems.forEach(function(k) {
							b !== k && [k].concat(k.linkedSeries || []).forEach(function(
							b) {
								b.setState(a, !m)
							})
						})
					},
					n = 0;
				for (k = k ? [a, c.symbol] : [c.group]; n < k.length; n++)
					if (c = k[n]) c.on("mouseover", function() {
						b.visible && d("inactive");
						b.setState("hover");
						b.visible && f.addClass(l);
						h || a.css(e.options.itemHoverStyle)
					}).on("mouseout", function() {
						e.chart.styledMode || a.css(K(b.visible ? e.itemStyle : e
							.itemHiddenStyle));
						d("");
						f.removeClass(l);
						b.setState()
					}).on("click", function(a) {
						var k = function() {
							b.setVisible && b.setVisible();
							d(b.visible ? "inactive" : "")
						};
						f.removeClass(l);
						a = {
							browserEvent: a
						};
						b.firePointEvent ? b.firePointEvent("legendItemClick", a, k) : G(b,
							"legendItemClick", a, k)
					})
			};
			e.prototype.createCheckboxForItem = function(b) {
				b.checkbox = q("input", {
					type: "checkbox",
					className: "highcharts-legend-checkbox",
					checked: b.selected,
					defaultChecked: b.selected
				}, this.options.itemCheckboxStyle, this.chart.container);
				l(b.checkbox, "click", function(a) {
					G(b.series || b, "checkboxClick", {
						checked: a.target.checked,
						item: b
					}, function() {
						b.select()
					})
				})
			};
			return e
		}();
		"";
		return d
	});
	I(g, "Core/Series/SeriesRegistry.js", [g["Core/Globals.js"], g["Core/Defaults.js"], g["Core/Series/Point.js"],
		g["Core/Utilities.js"]
	], function(d, g, z, B) {
		var y = g.defaultOptions,
			C = B.extendClass,
			A = B.merge,
			x;
		(function(g) {
			function r(h, l) {
				var d = y.plotOptions || {},
					p = l.defaultOptions,
					f = l.prototype;
				f.type = h;
				f.pointClass || (f.pointClass = z);
				p && (d[h] = p);
				g.seriesTypes[h] = l
			}
			g.seriesTypes = d.seriesTypes;
			g.registerSeriesType = r;
			g.seriesType = function(h, l, d, p, f) {
				var c = y.plotOptions || {};
				l = l || "";
				c[h] = A(c[l], d);
				r(h, C(g.seriesTypes[l] || function() {}, p));
				g.seriesTypes[h].prototype.type = h;
				f && (g.seriesTypes[h].prototype.pointClass = C(z, f));
				return g.seriesTypes[h]
			}
		})(x || (x = {}));
		return x
	});
	I(g, "Core/Chart/Chart.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/Axis/Axis.js"],
		g["Core/Defaults.js"], g["Core/FormatUtilities.js"], g["Core/Foundation.js"], g["Core/Globals.js"],
		g["Core/Legend/Legend.js"], g["Core/MSPointer.js"], g["Core/Pointer.js"], g[
			"Core/Renderer/RendererRegistry.js"], g["Core/Series/SeriesRegistry.js"], g[
			"Core/Renderer/SVG/SVGRenderer.js"], g["Core/Time.js"], g["Core/Utilities.js"], g[
			"Core/Renderer/HTML/AST.js"]
	], function(d, g, z, B, y, C, A, x, t, r, h, l, q, p, f) {
		var c = d.animate,
			D = d.animObject,
			G = d.setAnimation,
			H = z.defaultOptions,
			K = z.defaultTime,
			w = B.numberFormat,
			n = y.registerEventOptions,
			u = C.charts,
			m = C.doc,
			e = C.marginNames,
			b = C.svg,
			a = C.win,
			k = h.seriesTypes,
			v = p.addEvent,
			F = p.attr,
			J = p.cleanRecursively,
			L = p.createElement,
			O = p.css,
			Q = p.defined,
			T = p.discardElement,
			E = p.erase,
			N = p.error,
			Z = p.extend,
			M = p.find,
			R = p.fireEvent,
			P = p.getStyle,
			U = p.isArray,
			aa = p.isNumber,
			da = p.isObject,
			W = p.isString,
			V = p.merge,
			Y = p.objectEach,
			S = p.pick,
			ba = p.pInt,
			I = p.relativeLength,
			fa = p.removeEvent,
			ea = p.splat,
			ha = p.syncTimeout,
			ia = p.uniqueKey;
		d = function() {
			function h(a, b, k) {
				this.series = this.renderTo = this.renderer = this.pointer = this.pointCount =
					this.plotWidth = this.plotTop = this.plotLeft = this.plotHeight = this.plotBox =
					this.options = this.numberFormatter = this.margin = this.legend = this
					.labelCollectors = this.isResizing = this.index = this.eventOptions = this
					.container = this.colorCounter = this.clipBox = this.chartWidth = this.chartHeight =
					this.bounds = this.axisOffset = this.axes = void 0;
				this.sharedClips = {};
				this.yAxis = this.xAxis = this.userOptions = this.titleOffset = this.time = this
					.symbolCounter = this.spacingBox = this.spacing = void 0;
				this.getArgs(a, b, k)
			}
			h.chart = function(a, b,
				k) {
				return new h(a, b, k)
			};
			h.prototype.getArgs = function(a, b, k) {
				W(a) || a.nodeName ? (this.renderTo = a, this.init(b, k)) : this.init(a, b)
			};
			h.prototype.init = function(a, b) {
				var k = a.plotOptions || {};
				R(this, "init", {
					args: arguments
				}, function() {
					var e = V(H, a),
						c = e.chart;
					Y(e.plotOptions, function(a, b) {
						da(a) && (a.tooltip = k[b] && V(k[b].tooltip) || void 0)
					});
					e.tooltip.userOptions = a.chart && a.chart.forExport && a.tooltip
						.userOptions || a.tooltip;
					this.userOptions = a;
					this.margin = [];
					this.spacing = [];
					this.bounds = {
						h: {},
						v: {}
					};
					this.labelCollectors = [];
					this.callback = b;
					this.isResizing = 0;
					var f = c.zooming = c.zooming || {};
					a.chart && !a.chart.zooming && (f.resetButton = c.resetZoomButton);
					f.key = S(f.key, c.zoomKey);
					f.pinchType = S(f.pinchType, c.pinchType);
					f.singleTouch = S(f.singleTouch, c.zoomBySingleTouch);
					f.type = S(f.type, c.zoomType);
					this.options = e;
					this.axes = [];
					this.series = [];
					this.time = a.time && Object.keys(a.time).length ? new q(a.time) : C
						.time;
					this.numberFormatter = c.numberFormatter || w;
					this.styledMode = c.styledMode;
					this.hasCartesianSeries = c.showAxes;
					this.index = u.length;
					u.push(this);
					C.chartCount++;
					n(this, c);
					this.xAxis = [];
					this.yAxis = [];
					this.pointCount = this.colorCounter = this.symbolCounter = 0;
					R(this, "afterInit");
					this.firstRender()
				})
			};
			h.prototype.initSeries = function(a) {
				var b = this.options.chart;
				b = a.type || b.type || b.defaultSeriesType;
				var e = k[b];
				e || N(17, !0, this, {
					missingModuleFor: b
				});
				b = new e;
				"function" === typeof b.init && b.init(this, a);
				return b
			};
			h.prototype.setSeriesData = function() {
				this.getSeriesOrderByLinks().forEach(function(a) {
					a.points || a.data || !a.enabledDataSorting || a.setData(a.options.data,
						!1)
				})
			};
			h.prototype.getSeriesOrderByLinks = function() {
				return this.series.concat().sort(function(a, b) {
					return a.linkedSeries.length || b.linkedSeries.length ? b.linkedSeries
						.length - a.linkedSeries.length : 0
				})
			};
			h.prototype.orderSeries = function(a) {
				var b = this.series;
				a = a || 0;
				for (var k = b.length; a < k; ++a) b[a] && (b[a].index = a, b[a].name = b[a]
					.getName())
			};
			h.prototype.isInsidePlot = function(a, b, k) {
				void 0 === k && (k = {});
				var e = this.inverted,
					c = this.plotBox,
					f = this.plotLeft,
					m = this.plotTop,
					l = this.scrollablePlotBox,
					h = 0;
				var d = 0;
				k.visiblePlotOnly &&
					this.scrollingContainer && (d = this.scrollingContainer, h = d.scrollLeft, d = d
						.scrollTop);
				var n = k.series;
				c = k.visiblePlotOnly && l || c;
				l = k.inverted ? b : a;
				b = k.inverted ? a : b;
				a = {
					x: l,
					y: b,
					isInsidePlot: !0,
					options: k
				};
				if (!k.ignoreX) {
					var v = n && (e && !this.polar ? n.yAxis : n.xAxis) || {
						pos: f,
						len: Infinity
					};
					l = k.paneCoordinates ? v.pos + l : f + l;
					l >= Math.max(h + f, v.pos) && l <= Math.min(h + f + c.width, v.pos + v.len) ||
						(a.isInsidePlot = !1)
				}!k.ignoreY && a.isInsidePlot && (e = k.axis && !k.axis.isXAxis && k.axis || n && (
						e ? n.xAxis : n.yAxis) || {
						pos: m,
						len: Infinity
					}, k = k.paneCoordinates ?
					e.pos + b : m + b, k >= Math.max(d + m, e.pos) && k <= Math.min(d + m + c
						.height, e.pos + e.len) || (a.isInsidePlot = !1));
				R(this, "afterIsInsidePlot", a);
				return a.isInsidePlot
			};
			h.prototype.redraw = function(a) {
				R(this, "beforeRedraw");
				var b = this.hasCartesianSeries ? this.axes : this.colorAxis || [],
					k = this.series,
					e = this.pointer,
					c = this.legend,
					f = this.userOptions.legend,
					m = this.renderer,
					l = m.isHidden(),
					h = [],
					d = this.isDirtyBox,
					n = this.isDirtyLegend;
				this.setResponsive && this.setResponsive(!1);
				G(this.hasRendered ? a : !1, this);
				l && this.temporaryDisplay();
				this.layOutTitles();
				for (a = k.length; a--;) {
					var v = k[a];
					if (v.options.stacking || v.options.centerInCategory) {
						var p = !0;
						if (v.isDirty) {
							var g = !0;
							break
						}
					}
				}
				if (g)
					for (a = k.length; a--;) v = k[a], v.options.stacking && (v.isDirty = !0);
				k.forEach(function(a) {
					a.isDirty && ("point" === a.options.legendType ? ("function" ===
						typeof a.updateTotals && a.updateTotals(), n = !0) : f && (f
						.labelFormatter || f.labelFormat) && (n = !0));
					a.isDirtyData && R(a, "updatedData")
				});
				n && c && c.options.enabled && (c.render(), this.isDirtyLegend = !1);
				p && this.getStacks();
				b.forEach(function(a) {
					a.updateNames();
					a.setScale()
				});
				this.getMargins();
				b.forEach(function(a) {
					a.isDirty && (d = !0)
				});
				b.forEach(function(a) {
					var b = a.min + "," + a.max;
					a.extKey !== b && (a.extKey = b, h.push(function() {
						R(a, "afterSetExtremes", Z(a.eventArgs, a
						.getExtremes()));
						delete a.eventArgs
					}));
					(d || p) && a.redraw()
				});
				d && this.drawChartBox();
				R(this, "predraw");
				k.forEach(function(a) {
					(d || a.isDirty) && a.visible && a.redraw();
					a.isDirtyData = !1
				});
				e && e.reset(!0);
				m.draw();
				R(this, "redraw");
				R(this, "render");
				l && this.temporaryDisplay(!0);
				h.forEach(function(a) {
					a.call()
				})
			};
			h.prototype.get = function(a) {
				function b(b) {
					return b.id === a || b.options && b.options.id === a
				}
				for (var k = this.series, e = M(this.axes, b) || M(this.series, b), c = 0; !e && c <
					k.length; c++) e = M(k[c].points || [], b);
				return e
			};
			h.prototype.getAxes = function() {
				var a = this,
					b = this.options,
					k = b.xAxis = ea(b.xAxis || {});
				b = b.yAxis = ea(b.yAxis || {});
				R(this, "getAxes");
				k.forEach(function(a, b) {
					a.index = b;
					a.isX = !0
				});
				b.forEach(function(a, b) {
					a.index = b
				});
				k.concat(b).forEach(function(b) {
					new g(a, b)
				});
				R(this, "afterGetAxes")
			};
			h.prototype.getSelectedPoints =
				function() {
					return this.series.reduce(function(a, b) {
						b.getPointsCollection().forEach(function(b) {
							S(b.selectedStaging, b.selected) && a.push(b)
						});
						return a
					}, [])
				};
			h.prototype.getSelectedSeries = function() {
				return this.series.filter(function(a) {
					return a.selected
				})
			};
			h.prototype.setTitle = function(a, b, k) {
				this.applyDescription("title", a);
				this.applyDescription("subtitle", b);
				this.applyDescription("caption", void 0);
				this.layOutTitles(k)
			};
			h.prototype.applyDescription = function(a, b) {
				var k = this,
					e = "title" === a ? {
						color: "#333333",
						fontSize: this.options.isStock ? "16px" : "18px"
					} : {
						color: "#666666"
					};
				e = this.options[a] = V(!this.styledMode && {
					style: e
				}, this.options[a], b);
				var c = this[a];
				c && b && (this[a] = c = c.destroy());
				e && !c && (c = this.renderer.text(e.text, 0, 0, e.useHTML).attr({
					align: e.align,
					"class": "highcharts-" + a,
					zIndex: e.zIndex || 4
				}).add(), c.update = function(b) {
					k[{
						title: "setTitle",
						subtitle: "setSubtitle",
						caption: "setCaption"
					} [a]](b)
				}, this.styledMode || c.css(e.style), this[a] = c)
			};
			h.prototype.layOutTitles = function(a) {
				var b = [0, 0, 0],
					k = this.renderer,
					e = this.spacingBox;
				["title", "subtitle", "caption"].forEach(function(a) {
					var c = this[a],
						f = this.options[a],
						m = f.verticalAlign || "top";
					a = "title" === a ? "top" === m ? -3 : 0 : "top" === m ? b[0] + 2 : 0;
					var l;
					if (c) {
						this.styledMode || (l = f.style && f.style.fontSize);
						l = k.fontMetrics(l, c).b;
						c.css({
							width: (f.width || e.width + (f.widthAdjust || 0)) +
								"px"
						});
						var h = Math.round(c.getBBox(f.useHTML).height);
						c.align(Z({
							y: "bottom" === m ? l : a + l,
							height: h
						}, f), !1, "spacingBox");
						f.floating || ("top" === m ? b[0] = Math.ceil(b[0] + h) :
							"bottom" === m && (b[2] = Math.ceil(b[2] +
								h)))
					}
				}, this);
				b[0] && "top" === (this.options.title.verticalAlign || "top") && (b[0] += this
					.options.title.margin);
				b[2] && "bottom" === this.options.caption.verticalAlign && (b[2] += this.options
					.caption.margin);
				var c = !this.titleOffset || this.titleOffset.join(",") !== b.join(",");
				this.titleOffset = b;
				R(this, "afterLayOutTitles");
				!this.isDirtyBox && c && (this.isDirtyBox = this.isDirtyLegend = c, this
					.hasRendered && S(a, !0) && this.isDirtyBox && this.redraw())
			};
			h.prototype.getChartSize = function() {
				var a = this.options.chart,
					b = a.width;
				a = a.height;
				var k = this.renderTo;
				Q(b) || (this.containerWidth = P(k, "width"));
				Q(a) || (this.containerHeight = P(k, "height"));
				this.chartWidth = Math.max(0, b || this.containerWidth || 600);
				this.chartHeight = Math.max(0, I(a, this.chartWidth) || (1 < this.containerHeight ?
					this.containerHeight : 400))
			};
			h.prototype.temporaryDisplay = function(a) {
				var b = this.renderTo;
				if (a)
					for (; b && b.style;) b.hcOrigStyle && (O(b, b.hcOrigStyle), delete b
						.hcOrigStyle), b.hcOrigDetached && (m.body.removeChild(b), b
						.hcOrigDetached = !1), b = b.parentNode;
				else
					for (; b && b.style;) {
						m.body.contains(b) ||
							b.parentNode || (b.hcOrigDetached = !0, m.body.appendChild(b));
						if ("none" === P(b, "display", !1) || b.hcOricDetached) b.hcOrigStyle = {
								display: b.style.display,
								height: b.style.height,
								overflow: b.style.overflow
							}, a = {
								display: "block",
								overflow: "hidden"
							}, b !== this.renderTo && (a.height = 0), O(b, a), b.offsetWidth || b
							.style.setProperty("display", "block", "important");
						b = b.parentNode;
						if (b === m.body) break
					}
			};
			h.prototype.setClassName = function(a) {
				this.container.className = "highcharts-container " + (a || "")
			};
			h.prototype.getContainer = function() {
				var a =
					this.options,
					k = a.chart,
					e = ia(),
					c, h = this.renderTo;
				h || (this.renderTo = h = k.renderTo);
				W(h) && (this.renderTo = h = m.getElementById(h));
				h || N(13, !0, this);
				var d = ba(F(h, "data-highcharts-chart"));
				aa(d) && u[d] && u[d].hasRendered && u[d].destroy();
				F(h, "data-highcharts-chart", this.index);
				h.innerHTML = f.emptyHTML;
				k.skipClone || h.offsetWidth || this.temporaryDisplay();
				this.getChartSize();
				d = this.chartWidth;
				var n = this.chartHeight;
				O(h, {
					overflow: "hidden"
				});
				this.styledMode || (c = Z({
					position: "relative",
					overflow: "hidden",
					width: d + "px",
					height: n + "px",
					textAlign: "left",
					lineHeight: "normal",
					zIndex: 0,
					"-webkit-tap-highlight-color": "rgba(0,0,0,0)",
					userSelect: "none",
					"touch-action": "manipulation",
					outline: "none"
				}, k.style || {}));
				this.container = e = L("div", {
					id: e
				}, c, h);
				this._cursor = e.style.cursor;
				this.renderer = new(k.renderer || !b ? r.getRendererType(k.renderer) : l)(e, d, n,
					void 0, k.forExport, a.exporting && a.exporting.allowHTML, this.styledMode);
				G(void 0, this);
				this.setClassName(k.className);
				if (this.styledMode)
					for (var v in a.defs) this.renderer.definition(a.defs[v]);
				else this.renderer.setStyle(k.style);
				this.renderer.chartIndex = this.index;
				R(this, "afterGetContainer")
			};
			h.prototype.getMargins = function(a) {
				var b = this.spacing,
					k = this.margin,
					e = this.titleOffset;
				this.resetMargins();
				e[0] && !Q(k[0]) && (this.plotTop = Math.max(this.plotTop, e[0] + b[0]));
				e[2] && !Q(k[2]) && (this.marginBottom = Math.max(this.marginBottom, e[2] + b[2]));
				this.legend && this.legend.display && this.legend.adjustMargins(k, b);
				R(this, "getMargins");
				a || this.getAxisMargins()
			};
			h.prototype.getAxisMargins = function() {
				var a =
					this,
					b = a.axisOffset = [0, 0, 0, 0],
					k = a.colorAxis,
					c = a.margin,
					f = function(a) {
						a.forEach(function(a) {
							a.visible && a.getOffset()
						})
					};
				a.hasCartesianSeries ? f(a.axes) : k && k.length && f(k);
				e.forEach(function(k, e) {
					Q(c[e]) || (a[k] += b[e])
				});
				a.setChartSize()
			};
			h.prototype.reflow = function(b) {
				var k = this,
					e = k.options.chart,
					c = k.renderTo,
					f = Q(e.width) && Q(e.height),
					l = e.width || P(c, "width");
				e = e.height || P(c, "height");
				c = b ? b.target : a;
				delete k.pointer.chartPosition;
				if (!f && !k.isPrinting && l && e && (c === a || c === m)) {
					if (l !== k.containerWidth || e !==
						k.containerHeight) p.clearTimeout(k.reflowTimeout), k.reflowTimeout = ha(
						function() {
							k.container && k.setSize(void 0, void 0, !1)
						}, b ? 100 : 0);
					k.containerWidth = l;
					k.containerHeight = e
				}
			};
			h.prototype.setReflow = function(b) {
				var k = this;
				!1 === b || this.unbindReflow ? !1 === b && this.unbindReflow && (this
					.unbindReflow = this.unbindReflow()) : (this.unbindReflow = v(a, "resize",
					function(a) {
						k.options && k.reflow(a)
					}), v(this, "destroy", this.unbindReflow))
			};
			h.prototype.setSize = function(a, b, k) {
				var e = this,
					f = e.renderer;
				e.isResizing += 1;
				G(k, e);
				k =
					f.globalAnimation;
				e.oldChartHeight = e.chartHeight;
				e.oldChartWidth = e.chartWidth;
				"undefined" !== typeof a && (e.options.chart.width = a);
				"undefined" !== typeof b && (e.options.chart.height = b);
				e.getChartSize();
				e.styledMode || (k ? c : O)(e.container, {
					width: e.chartWidth + "px",
					height: e.chartHeight + "px"
				}, k);
				e.setChartSize(!0);
				f.setSize(e.chartWidth, e.chartHeight, k);
				e.axes.forEach(function(a) {
					a.isDirty = !0;
					a.setScale()
				});
				e.isDirtyLegend = !0;
				e.isDirtyBox = !0;
				e.layOutTitles();
				e.getMargins();
				e.redraw(k);
				e.oldChartHeight = null;
				R(e,
					"resize");
				ha(function() {
					e && R(e, "endResize", null, function() {
						--e.isResizing
					})
				}, D(k).duration)
			};
			h.prototype.setChartSize = function(a) {
				var b = this.inverted,
					k = this.renderer,
					e = this.chartWidth,
					c = this.chartHeight,
					f = this.options.chart,
					m = this.spacing,
					l = this.clipOffset,
					h, d, n, v;
				this.plotLeft = h = Math.round(this.plotLeft);
				this.plotTop = d = Math.round(this.plotTop);
				this.plotWidth = n = Math.max(0, Math.round(e - h - this.marginRight));
				this.plotHeight = v = Math.max(0, Math.round(c - d - this.marginBottom));
				this.plotSizeX = b ? v : n;
				this.plotSizeY =
					b ? n : v;
				this.plotBorderWidth = f.plotBorderWidth || 0;
				this.spacingBox = k.spacingBox = {
					x: m[3],
					y: m[0],
					width: e - m[3] - m[1],
					height: c - m[0] - m[2]
				};
				this.plotBox = k.plotBox = {
					x: h,
					y: d,
					width: n,
					height: v
				};
				b = 2 * Math.floor(this.plotBorderWidth / 2);
				e = Math.ceil(Math.max(b, l[3]) / 2);
				c = Math.ceil(Math.max(b, l[0]) / 2);
				this.clipBox = {
					x: e,
					y: c,
					width: Math.floor(this.plotSizeX - Math.max(b, l[1]) / 2 - e),
					height: Math.max(0, Math.floor(this.plotSizeY - Math.max(b, l[2]) / 2 - c))
				};
				a || (this.axes.forEach(function(a) {
						a.setAxisSize();
						a.setAxisTranslation()
					}),
					k.alignElements());
				R(this, "afterSetChartSize", {
					skipAxes: a
				})
			};
			h.prototype.resetMargins = function() {
				R(this, "resetMargins");
				var a = this,
					b = a.options.chart;
				["margin", "spacing"].forEach(function(k) {
					var e = b[k],
						c = da(e) ? e : [e, e, e, e];
					["Top", "Right", "Bottom", "Left"].forEach(function(e, f) {
						a[k][f] = S(b[k + e], c[f])
					})
				});
				e.forEach(function(b, k) {
					a[b] = S(a.margin[k], a.spacing[k])
				});
				a.axisOffset = [0, 0, 0, 0];
				a.clipOffset = [0, 0, 0, 0]
			};
			h.prototype.drawChartBox = function() {
				var a = this.options.chart,
					b = this.renderer,
					k = this.chartWidth,
					e = this.chartHeight,
					c = this.styledMode,
					f = this.plotBGImage,
					m = a.backgroundColor,
					l = a.plotBackgroundColor,
					h = a.plotBackgroundImage,
					d = this.plotLeft,
					n = this.plotTop,
					v = this.plotWidth,
					p = this.plotHeight,
					g = this.plotBox,
					q = this.clipRect,
					u = this.clipBox,
					w = this.chartBackground,
					F = this.plotBackground,
					E = this.plotBorder,
					r, D = "animate";
				w || (this.chartBackground = w = b.rect().addClass("highcharts-background").add(),
					D = "attr");
				if (c) var P = r = w.strokeWidth();
				else {
					P = a.borderWidth || 0;
					r = P + (a.shadow ? 8 : 0);
					m = {
						fill: m || "none"
					};
					if (P || w["stroke-width"]) m.stroke =
						a.borderColor, m["stroke-width"] = P;
					w.attr(m).shadow(a.shadow)
				}
				w[D]({
					x: r / 2,
					y: r / 2,
					width: k - r - P % 2,
					height: e - r - P % 2,
					r: a.borderRadius
				});
				D = "animate";
				F || (D = "attr", this.plotBackground = F = b.rect().addClass(
					"highcharts-plot-background").add());
				F[D](g);
				c || (F.attr({
					fill: l || "none"
				}).shadow(a.plotShadow), h && (f ? (h !== f.attr("href") && f.attr("href",
					h), f.animate(g)) : this.plotBGImage = b.image(h, d, n, v, p).add()));
				q ? q.animate({
					width: u.width,
					height: u.height
				}) : this.clipRect = b.clipRect(u);
				D = "animate";
				E || (D = "attr", this.plotBorder =
					E = b.rect().addClass("highcharts-plot-border").attr({
						zIndex: 1
					}).add());
				c || E.attr({
					stroke: a.plotBorderColor,
					"stroke-width": a.plotBorderWidth || 0,
					fill: "none"
				});
				E[D](E.crisp({
					x: d,
					y: n,
					width: v,
					height: p
				}, -E.strokeWidth()));
				this.isDirtyBox = !1;
				R(this, "afterDrawChartBox")
			};
			h.prototype.propFromSeries = function() {
				var a = this,
					b = a.options.chart,
					e = a.options.series,
					c, f, m;
				["inverted", "angular", "polar"].forEach(function(l) {
					f = k[b.type || b.defaultSeriesType];
					m = b[l] || f && f.prototype[l];
					for (c = e && e.length; !m && c--;)(f = k[e[c].type]) &&
						f.prototype[l] && (m = !0);
					a[l] = m
				})
			};
			h.prototype.linkSeries = function() {
				var a = this,
					b = a.series;
				b.forEach(function(a) {
					a.linkedSeries.length = 0
				});
				b.forEach(function(b) {
					var k = b.options.linkedTo;
					W(k) && (k = ":previous" === k ? a.series[b.index - 1] : a.get(k)) && k
						.linkedParent !== b && (k.linkedSeries.push(b), b.linkedParent = k,
							k.enabledDataSorting && b.setDataSortingOptions(), b.visible =
							S(b.options.visible, k.options.visible, b.visible))
				});
				R(this, "afterLinkSeries")
			};
			h.prototype.renderSeries = function() {
				this.series.forEach(function(a) {
					a.translate();
					a.render()
				})
			};
			h.prototype.renderLabels = function() {
				var a = this,
					b = a.options.labels;
				b.items && b.items.forEach(function(k) {
					var e = Z(b.style, k.style),
						c = ba(e.left) + a.plotLeft,
						f = ba(e.top) + a.plotTop + 12;
					delete e.left;
					delete e.top;
					a.renderer.text(k.html, c, f).attr({
						zIndex: 2
					}).css(e).add()
				})
			};
			h.prototype.render = function() {
				var a = this.axes,
					b = this.colorAxis,
					k = this.renderer,
					e = this.options,
					c = function(a) {
						a.forEach(function(a) {
							a.visible && a.render()
						})
					},
					f = 0;
				this.setTitle();
				this.legend = new A(this, e.legend);
				this.getStacks &&
					this.getStacks();
				this.getMargins(!0);
				this.setChartSize();
				e = this.plotWidth;
				a.some(function(a) {
					if (a.horiz && a.visible && a.options.labels.enabled && a.series.length)
						return f = 21, !0
				});
				var m = this.plotHeight = Math.max(this.plotHeight - f, 0);
				a.forEach(function(a) {
					a.setScale()
				});
				this.getAxisMargins();
				var l = 1.1 < e / this.plotWidth,
					h = 1.05 < m / this.plotHeight;
				if (l || h) a.forEach(function(a) {
					(a.horiz && l || !a.horiz && h) && a.setTickInterval(!0)
				}), this.getMargins();
				this.drawChartBox();
				this.hasCartesianSeries ? c(a) : b && b.length && c(b);
				this.seriesGroup || (this.seriesGroup = k.g("series-group").attr({
					zIndex: 3
				}).add());
				this.renderSeries();
				this.renderLabels();
				this.addCredits();
				this.setResponsive && this.setResponsive();
				this.hasRendered = !0
			};
			h.prototype.addCredits = function(b) {
				var k = this,
					e = V(!0, this.options.credits, b);
				e.enabled && !this.credits && (this.credits = this.renderer.text(e.text + (this
						.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click",
						function() {
							e.href && (a.location.href = e.href)
						}).attr({
						align: e.position.align,
						zIndex: 8
					}), k.styledMode ||
					this.credits.css(e.style), this.credits.add().align(e.position), this
					.credits.update = function(a) {
						k.credits = k.credits.destroy();
						k.addCredits(a)
					})
			};
			h.prototype.destroy = function() {
				var a = this,
					b = a.axes,
					k = a.series,
					e = a.container,
					c = e && e.parentNode,
					m;
				R(a, "destroy");
				a.renderer.forExport ? E(u, a) : u[a.index] = void 0;
				C.chartCount--;
				a.renderTo.removeAttribute("data-highcharts-chart");
				fa(a);
				for (m = b.length; m--;) b[m] = b[m].destroy();
				this.scroller && this.scroller.destroy && this.scroller.destroy();
				for (m = k.length; m--;) k[m] =
					k[m].destroy();
				"title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer"
				.split(" ").forEach(function(b) {
					var k = a[b];
					k && k.destroy && (a[b] = k.destroy())
				});
				e && (e.innerHTML = f.emptyHTML, fa(e), c && T(e));
				Y(a, function(b, k) {
					delete a[k]
				})
			};
			h.prototype.firstRender = function() {
				var a = this,
					b = a.options;
				if (!a.isReadyToRender || a.isReadyToRender()) {
					a.getContainer();
					a.resetMargins();
					a.setChartSize();
					a.propFromSeries();
					a.getAxes();
					(U(b.series) ? b.series : []).forEach(function(b) {
						a.initSeries(b)
					});
					a.linkSeries();
					a.setSeriesData();
					R(a, "beforeRender");
					t && (x.isRequired() ? a.pointer = new x(a, b) : a.pointer = new t(a, b));
					a.render();
					a.pointer.getChartPosition();
					if (!a.renderer.imgCount && !a.hasLoaded) a.onload();
					a.temporaryDisplay(!0)
				}
			};
			h.prototype.onload = function() {
				this.callbacks.concat([this.callback]).forEach(function(a) {
					a && "undefined" !== typeof this.index && a.apply(this, [this])
				}, this);
				R(this, "load");
				R(this, "render");
				Q(this.index) &&
					this.setReflow(this.options.chart.reflow);
				this.warnIfA11yModuleNotLoaded();
				this.hasLoaded = !0
			};
			h.prototype.warnIfA11yModuleNotLoaded = function() {
				var a = this.options,
					b = this.title;
				a && !this.accessibility && (this.renderer.boxWrapper.attr({
					role: "img",
					"aria-label": (b && b.element.textContent || "").replace(/</g,
						"&lt;")
				}), a.accessibility && !1 === a.accessibility.enabled || N(
					'Highcharts warning: Consider including the "accessibility.js" module to make your chart more usable for people with disabilities. Set the "accessibility.enabled" option to false to remove this warning. See https://www.highcharts.com/docs/accessibility/accessibility-module.',
					!1, this))
			};
			h.prototype.addSeries = function(a, b, k) {
				var e = this,
					c;
				a && (b = S(b, !0), R(e, "addSeries", {
					options: a
				}, function() {
					c = e.initSeries(a);
					e.isDirtyLegend = !0;
					e.linkSeries();
					c.enabledDataSorting && c.setData(a.data, !1);
					R(e, "afterAddSeries", {
						series: c
					});
					b && e.redraw(k)
				}));
				return c
			};
			h.prototype.addAxis = function(a, b, k, e) {
				return this.createAxis(b ? "xAxis" : "yAxis", {
					axis: a,
					redraw: k,
					animation: e
				})
			};
			h.prototype.addColorAxis = function(a, b, k) {
				return this.createAxis("colorAxis", {
					axis: a,
					redraw: b,
					animation: k
				})
			};
			h.prototype.createAxis =
				function(a, b) {
					a = new g(this, V(b.axis, {
						index: this[a].length,
						isX: "xAxis" === a
					}));
					S(b.redraw, !0) && this.redraw(b.animation);
					return a
				};
			h.prototype.showLoading = function(a) {
				var b = this,
					k = b.options,
					e = k.loading,
					m = function() {
						l && O(l, {
							left: b.plotLeft + "px",
							top: b.plotTop + "px",
							width: b.plotWidth + "px",
							height: b.plotHeight + "px"
						})
					},
					l = b.loadingDiv,
					h = b.loadingSpan;
				l || (b.loadingDiv = l = L("div", {
					className: "highcharts-loading highcharts-loading-hidden"
				}, null, b.container));
				h || (b.loadingSpan = h = L("span", {
						className: "highcharts-loading-inner"
					},
					null, l), v(b, "redraw", m));
				l.className = "highcharts-loading";
				f.setElementHTML(h, S(a, k.lang.loading, ""));
				b.styledMode || (O(l, Z(e.style, {
					zIndex: 10
				})), O(h, e.labelStyle), b.loadingShown || (O(l, {
					opacity: 0,
					display: ""
				}), c(l, {
					opacity: e.style.opacity || .5
				}, {
					duration: e.showDuration || 0
				})));
				b.loadingShown = !0;
				m()
			};
			h.prototype.hideLoading = function() {
				var a = this.options,
					b = this.loadingDiv;
				b && (b.className = "highcharts-loading highcharts-loading-hidden", this
					.styledMode || c(b, {
						opacity: 0
					}, {
						duration: a.loading.hideDuration || 100,
						complete: function() {
							O(b, {
								display: "none"
							})
						}
					}));
				this.loadingShown = !1
			};
			h.prototype.update = function(a, b, k, e) {
				var c = this,
					f = {
						credits: "addCredits",
						title: "setTitle",
						subtitle: "setSubtitle",
						caption: "setCaption"
					},
					m = a.isResponsiveOptions,
					l = [],
					h, d;
				R(c, "update", {
					options: a
				});
				m || c.setResponsive(!1, !0);
				a = J(a, c.options);
				c.userOptions = V(c.userOptions, a);
				var v = a.chart;
				if (v) {
					V(!0, c.options.chart, v);
					"className" in v && c.setClassName(v.className);
					"reflow" in v && c.setReflow(v.reflow);
					if ("inverted" in v || "polar" in v || "type" in
						v) {
						c.propFromSeries();
						var p = !0
					}
					"alignTicks" in v && (p = !0);
					"events" in v && n(this, v);
					Y(v, function(a, b) {
						-1 !== c.propsRequireUpdateSeries.indexOf("chart." + b) && (h = !
						0); - 1 !== c.propsRequireDirtyBox.indexOf(b) && (c.isDirtyBox = !
						0); - 1 !== c.propsRequireReflow.indexOf(b) && (m ? c.isDirtyBox = !
							0 : d = !0)
					});
					!c.styledMode && v.style && c.renderer.setStyle(c.options.chart.style || {})
				}!c.styledMode && a.colors && (this.options.colors = a.colors);
				a.time && (this.time === K && (this.time = new q(a.time)), V(!0, c.options.time, a
					.time));
				Y(a, function(b,
					k) {
					if (c[k] && "function" === typeof c[k].update) c[k].update(b, !1);
					else if ("function" === typeof c[f[k]]) c[f[k]](b);
					else "colors" !== k && -1 === c.collectionsWithUpdate.indexOf(k) && V(!
						0, c.options[k], a[k]);
					"chart" !== k && -1 !== c.propsRequireUpdateSeries.indexOf(k) && (h = !
						0)
				});
				this.collectionsWithUpdate.forEach(function(b) {
					if (a[b]) {
						var e = [];
						c[b].forEach(function(a, b) {
							a.options.isInternal || e.push(S(a.options.index, b))
						});
						ea(a[b]).forEach(function(a, f) {
							var m = Q(a.id),
								l;
							m && (l = c.get(a.id));
							!l && c[b] && (l = c[b][e ? e[f] : f]) && m &&
								Q(l.options.id) && (l = void 0);
							l && l.coll === b && (l.update(a, !1), k && (l
								.touched = !0));
							!l && k && c.collectionsWithInit[b] && (c
								.collectionsWithInit[b][0].apply(c, [a].concat(c
										.collectionsWithInit[b][1] || [])
									.concat([!1])).touched = !0)
						});
						k && c[b].forEach(function(a) {
							a.touched || a.options.isInternal ? delete a.touched : l
								.push(a)
						})
					}
				});
				l.forEach(function(a) {
					a.chart && a.remove && a.remove(!1)
				});
				p && c.axes.forEach(function(a) {
					a.update({}, !1)
				});
				h && c.getSeriesOrderByLinks().forEach(function(a) {
					a.chart && a.update({}, !1)
				}, this);
				p = v &&
					v.width;
				v = v && (W(v.height) ? I(v.height, p || c.chartWidth) : v.height);
				d || aa(p) && p !== c.chartWidth || aa(v) && v !== c.chartHeight ? c.setSize(p, v,
					e) : S(b, !0) && c.redraw(e);
				R(c, "afterUpdate", {
					options: a,
					redraw: b,
					animation: e
				})
			};
			h.prototype.setSubtitle = function(a, b) {
				this.applyDescription("subtitle", a);
				this.layOutTitles(b)
			};
			h.prototype.setCaption = function(a, b) {
				this.applyDescription("caption", a);
				this.layOutTitles(b)
			};
			h.prototype.showResetZoom = function() {
				function a() {
					b.zoomOut()
				}
				var b = this,
					k = H.lang,
					e = b.options.chart.zooming.resetButton,
					c = e.theme,
					f = "chart" === e.relativeTo || "spacingBox" === e.relativeTo ? null :
					"scrollablePlotBox";
				R(this, "beforeShowResetZoom", null, function() {
					b.resetZoomButton = b.renderer.button(k.resetZoom, null, null, a, c)
						.attr({
							align: e.position.align,
							title: k.resetZoomTitle
						}).addClass("highcharts-reset-zoom").add().align(e.position, !1, f)
				});
				R(this, "afterShowResetZoom")
			};
			h.prototype.zoomOut = function() {
				R(this, "selection", {
					resetSelection: !0
				}, this.zoom)
			};
			h.prototype.zoom = function(a) {
				var b = this,
					k = b.pointer,
					e = !1,
					c;
				!a || a.resetSelection ?
					(b.axes.forEach(function(a) {
						c = a.zoom()
					}), k.initiated = !1) : a.xAxis.concat(a.yAxis).forEach(function(a) {
						var f = a.axis;
						if (k[f.isXAxis ? "zoomX" : "zoomY"] && Q(k.mouseDownX) && Q(k
								.mouseDownY) && b.isInsidePlot(k.mouseDownX - b.plotLeft, k
								.mouseDownY - b.plotTop, {
									axis: f
								}) || !Q(b.inverted ? k.mouseDownX : k.mouseDownY)) c = f.zoom(a
							.min, a.max), f.displayBtn && (e = !0)
					});
				var f = b.resetZoomButton;
				e && !f ? b.showResetZoom() : !e && da(f) && (b.resetZoomButton = f.destroy());
				c && b.redraw(S(b.options.chart.animation, a && a.animation, 100 > b.pointCount))
			};
			h.prototype.pan = function(a, b) {
				var k = this,
					e = k.hoverPoints;
				b = "object" === typeof b ? b : {
					enabled: b,
					type: "x"
				};
				var c = k.options.chart;
				c && c.panning && (c.panning = b);
				var f = b.type,
					m;
				R(this, "pan", {
					originalEvent: a
				}, function() {
					e && e.forEach(function(a) {
						a.setState()
					});
					var b = k.xAxis;
					"xy" === f ? b = b.concat(k.yAxis) : "y" === f && (b = k.yAxis);
					var c = {};
					b.forEach(function(b) {
						if (b.options.panningEnabled && !b.options.isInternal) {
							var e = b.horiz,
								l = a[e ? "chartX" : "chartY"];
							e = e ? "mouseDownX" : "mouseDownY";
							var h = k[e],
								d = b.minPointOffset || 0,
								n = b.reversed &&
								!k.inverted || !b.reversed && k.inverted ? -1 : 1,
								v = b.getExtremes(),
								p = b.toValue(h - l, !0) + d * n,
								g = b.toValue(h + b.len - l, !0) - (d * n || b
									.isXAxis && b.pointRangePadding || 0),
								q = g < p;
							n = b.hasVerticalPanning();
							h = q ? g : p;
							p = q ? p : g;
							var u = b.panningState;
							!n || b.isXAxis || u && !u.isDirty || b.series.forEach(
								function(a) {
									var b = a.getProcessedData(!0);
									b = a.getExtremes(b.yData, !0);
									u || (u = {
										startMin: Number.MAX_VALUE,
										startMax: -Number.MAX_VALUE
									});
									aa(b.dataMin) && aa(b.dataMax) && (u
										.startMin = Math.min(S(a.options
												.threshold, Infinity), b
											.dataMin, u.startMin),
										u.startMax = Math.max(S(a.options
												.threshold, -Infinity), b
											.dataMax, u.startMax))
								});
							n = Math.min(S(u && u.startMin, v.dataMin), d ? v.min :
								b.toValue(b.toPixels(v.min) - b.minPixelPadding)
								);
							g = Math.max(S(u && u.startMax, v.dataMax), d ? v.max :
								b.toValue(b.toPixels(v.max) + b.minPixelPadding)
								);
							b.panningState = u;
							b.isOrdinal || (d = n - h, 0 < d && (p += d, h = n), d =
								p - g, 0 < d && (p = g, h -= d), b.series
								.length && h !== v.min && p !== v.max && h >=
								n && p <= g && (b.setExtremes(h, p, !1, !1, {
										trigger: "pan"
									}), !k.resetZoomButton && h !== n && p !==
									g && f.match("y") && (k.showResetZoom(),
										b.displayBtn = !1), m = !0), c[e] = l)
						}
					});
					Y(c, function(a, b) {
						k[b] = a
					});
					m && k.redraw(!1);
					O(k.container, {
						cursor: "move"
					})
				})
			};
			return h
		}();
		Z(d.prototype, {
			callbacks: [],
			collectionsWithInit: {
				xAxis: [d.prototype.addAxis, [!0]],
				yAxis: [d.prototype.addAxis, [!1]],
				series: [d.prototype.addSeries]
			},
			collectionsWithUpdate: ["xAxis", "yAxis", "series"],
			propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow"
				.split(" "),
			propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft"
				.split(" "),
			propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip"
				.split(" ")
		});
		"";
		return d
	});
	I(g, "Core/Legend/LegendSymbol.js", [g["Core/Utilities.js"]], function(d) {
		var g = d.merge,
			z = d.pick,
			B;
		(function(d) {
			d.drawLineMarker = function(d) {
				var A = this.legendItem = this.legendItem || {},
					x = this.options,
					t = d.symbolWidth,
					r = d.symbolHeight,
					h = r / 2,
					l = this.chart.renderer,
					q = A.group;
				d = d.baseline - Math.round(.3 * d.fontMetrics.b);
				var p = {},
					f = x.marker;
				this.chart.styledMode ||
					(p = {
						"stroke-width": x.lineWidth || 0
					}, x.dashStyle && (p.dashstyle = x.dashStyle));
				A.line = l.path([
					["M", 0, d],
					["L", t, d]
				]).addClass("highcharts-graph").attr(p).add(q);
				f && !1 !== f.enabled && t && (x = Math.min(z(f.radius, h), h), 0 === this.symbol
					.indexOf("url") && (f = g(f, {
						width: r,
						height: r
					}), x = 0), A.symbol = A = l.symbol(this.symbol, t / 2 - x, d - x, 2 * x,
						2 * x, f).addClass("highcharts-point").add(q), A.isMarker = !0)
			};
			d.drawRectangle = function(d, g) {
				g = g.legendItem || {};
				var x = d.symbolHeight,
					t = d.options.squareSymbol;
				g.symbol = this.chart.renderer.rect(t ?
					(d.symbolWidth - x) / 2 : 0, d.baseline - x + 1, t ? x : d.symbolWidth, x,
					z(d.options.symbolRadius, x / 2)).addClass("highcharts-point").attr({
					zIndex: 3
				}).add(g.group)
			}
		})(B || (B = {}));
		return B
	});
	I(g, "Core/Series/SeriesDefaults.js", [], function() {
		return {
			lineWidth: 2,
			allowPointSelect: !1,
			crisp: !0,
			showCheckbox: !1,
			animation: {
				duration: 1E3
			},
			events: {},
			marker: {
				enabledThreshold: 2,
				lineColor: "#ffffff",
				lineWidth: 0,
				radius: 4,
				states: {
					normal: {
						animation: !0
					},
					hover: {
						animation: {
							duration: 50
						},
						enabled: !0,
						radiusPlus: 2,
						lineWidthPlus: 1
					},
					select: {
						fillColor: "#cccccc",
						lineColor: "#000000",
						lineWidth: 2
					}
				}
			},
			point: {
				events: {}
			},
			dataLabels: {
				animation: {},
				align: "center",
				defer: !0,
				formatter: function() {
					var d = this.series.chart.numberFormatter;
					return "number" !== typeof this.y ? "" : d(this.y, -1)
				},
				padding: 5,
				style: {
					fontSize: "11px",
					fontWeight: "bold",
					color: "contrast",
					textOutline: "1px contrast"
				},
				verticalAlign: "bottom",
				x: 0,
				y: 0
			},
			cropThreshold: 300,
			opacity: 1,
			pointRange: 0,
			softThreshold: !0,
			states: {
				normal: {
					animation: !0
				},
				hover: {
					animation: {
						duration: 50
					},
					lineWidthPlus: 1,
					marker: {},
					halo: {
						size: 10,
						opacity: .25
					}
				},
				select: {
					animation: {
						duration: 0
					}
				},
				inactive: {
					animation: {
						duration: 50
					},
					opacity: .2
				}
			},
			stickyTracking: !0,
			turboThreshold: 1E3,
			findNearestPointBy: "x"
		}
	});
	I(g, "Core/Series/Series.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/Defaults.js"], g[
			"Core/Foundation.js"], g["Core/Globals.js"], g["Core/Legend/LegendSymbol.js"], g[
			"Core/Series/Point.js"], g["Core/Series/SeriesDefaults.js"], g["Core/Series/SeriesRegistry.js"],
		g["Core/Renderer/SVG/SVGElement.js"], g["Core/Utilities.js"]
	], function(d, g, z, B, y, C, A, x, t, r) {
		var h =
			d.animObject,
			l = d.setAnimation,
			q = g.defaultOptions,
			p = z.registerEventOptions,
			f = B.hasTouch,
			c = B.svg,
			D = B.win,
			G = x.seriesTypes,
			H = r.arrayMax,
			K = r.arrayMin,
			w = r.clamp,
			n = r.cleanRecursively,
			u = r.correctFloat,
			m = r.defined,
			e = r.erase,
			b = r.error,
			a = r.extend,
			k = r.find,
			v = r.fireEvent,
			F = r.getNestedProperty,
			J = r.isArray,
			L = r.isNumber,
			O = r.isString,
			Q = r.merge,
			T = r.objectEach,
			E = r.pick,
			N = r.removeEvent,
			Z = r.splat,
			M = r.syncTimeout;
		d = function() {
			function d() {
				this.zones = this.yAxis = this.xAxis = this.userOptions = this.tooltipOptions = this
					.processedYData =
					this.processedXData = this.points = this.options = this.linkedSeries = this.index =
					this.eventsToUnbind = this.eventOptions = this.data = this.chart = this._i = void 0
			}
			d.prototype.init = function(b, k) {
				v(this, "init", {
					options: k
				});
				var e = this,
					c = b.series;
				this.eventsToUnbind = [];
				e.chart = b;
				e.options = e.setOptions(k);
				k = e.options;
				e.linkedSeries = [];
				e.bindAxes();
				a(e, {
					name: k.name,
					state: "",
					visible: !1 !== k.visible,
					selected: !0 === k.selected
				});
				p(this, k);
				var f = k.events;
				if (f && f.click || k.point && k.point.events && k.point.events.click || k
					.allowPointSelect) b.runTrackerClick = !0;
				e.getColor();
				e.getSymbol();
				e.parallelArrays.forEach(function(a) {
					e[a + "Data"] || (e[a + "Data"] = [])
				});
				e.isCartesian && (b.hasCartesianSeries = !0);
				var m;
				c.length && (m = c[c.length - 1]);
				e._i = E(m && m._i, -1) + 1;
				e.opacity = e.options.opacity;
				b.orderSeries(this.insert(c));
				k.dataSorting && k.dataSorting.enabled ? e.setDataSortingOptions() : e.points || e
					.data || e.setData(k.data, !1);
				v(this, "afterInit")
			};
			d.prototype.is = function(a) {
				return G[a] && this instanceof G[a]
			};
			d.prototype.insert = function(a) {
				var b = this.options.index,
					k;
				if (L(b)) {
					for (k =
						a.length; k--;)
						if (b >= E(a[k].options.index, a[k]._i)) {
							a.splice(k + 1, 0, this);
							break
						} - 1 === k && a.unshift(this);
					k += 1
				} else a.push(this);
				return E(k, a.length - 1)
			};
			d.prototype.bindAxes = function() {
				var a = this,
					k = a.options,
					e = a.chart,
					c;
				v(this, "bindAxes", null, function() {
					(a.axisTypes || []).forEach(function(f) {
						var m = 0;
						e[f].forEach(function(b) {
							c = b.options;
							if (k[f] === m && !c.isInternal ||
								"undefined" !== typeof k[f] && k[f] === c
								.id || "undefined" === typeof k[f] && 0 ===
								c.index) a.insert(b.series), a[f] = b, b
								.isDirty = !0;
							c.isInternal || m++
						});
						a[f] ||
							a.optionalAxis === f || b(18, !0, e)
					})
				});
				v(this, "afterBindAxes")
			};
			d.prototype.updateParallelArrays = function(a, b) {
				var k = a.series,
					e = arguments,
					c = L(b) ? function(e) {
						var c = "y" === e && k.toYData ? k.toYData(a) : a[e];
						k[e + "Data"][b] = c
					} : function(a) {
						Array.prototype[b].apply(k[a + "Data"], Array.prototype.slice.call(e, 2))
					};
				k.parallelArrays.forEach(c)
			};
			d.prototype.hasData = function() {
				return this.visible && "undefined" !== typeof this.dataMax && "undefined" !==
					typeof this.dataMin || this.visible && this.yData && 0 < this.yData.length
			};
			d.prototype.autoIncrement =
				function(a) {
					var b = this.options,
						k = b.pointIntervalUnit,
						e = b.relativeXValue,
						c = this.chart.time,
						f = this.xIncrement,
						m;
					f = E(f, b.pointStart, 0);
					this.pointInterval = m = E(this.pointInterval, b.pointInterval, 1);
					e && L(a) && (m *= a);
					k && (b = new c.Date(f), "day" === k ? c.set("Date", b, c.get("Date", b) + m) :
						"month" === k ? c.set("Month", b, c.get("Month", b) + m) : "year" === k && c
						.set("FullYear", b, c.get("FullYear", b) + m), m = b.getTime() - f);
					if (e && L(a)) return f + m;
					this.xIncrement = f + m;
					return f
				};
			d.prototype.setDataSortingOptions = function() {
				var b = this.options;
				a(this, {
					requireSorting: !1,
					sorted: !1,
					enabledDataSorting: !0,
					allowDG: !1
				});
				m(b.pointRange) || (b.pointRange = 1)
			};
			d.prototype.setOptions = function(a) {
				var b = this.chart,
					k = b.options,
					e = k.plotOptions,
					c = b.userOptions || {};
				a = Q(a);
				b = b.styledMode;
				var f = {
					plotOptions: e,
					userOptions: a
				};
				v(this, "setOptions", f);
				var l = f.plotOptions[this.type],
					d = c.plotOptions || {};
				this.userOptions = f.userOptions;
				c = Q(l, e.series, c.plotOptions && c.plotOptions[this.type], a);
				this.tooltipOptions = Q(q.tooltip, q.plotOptions.series && q.plotOptions.series
					.tooltip,
					q.plotOptions[this.type].tooltip, k.tooltip.userOptions, e.series && e
					.series.tooltip, e[this.type].tooltip, a.tooltip);
				this.stickyTracking = E(a.stickyTracking, d[this.type] && d[this.type]
					.stickyTracking, d.series && d.series.stickyTracking, this.tooltipOptions
					.shared && !this.noSharedTooltip ? !0 : c.stickyTracking);
				null === l.marker && delete c.marker;
				this.zoneAxis = c.zoneAxis;
				e = this.zones = (c.zones || []).slice();
				!c.negativeColor && !c.negativeFillColor || c.zones || (k = {
						value: c[this.zoneAxis + "Threshold"] || c.threshold || 0,
						className: "highcharts-negative"
					},
					b || (k.color = c.negativeColor, k.fillColor = c.negativeFillColor), e.push(
						k));
				e.length && m(e[e.length - 1].value) && e.push(b ? {} : {
					color: this.color,
					fillColor: this.fillColor
				});
				v(this, "afterSetOptions", {
					options: c
				});
				return c
			};
			d.prototype.getName = function() {
				return E(this.options.name, "Series " + (this.index + 1))
			};
			d.prototype.getCyclic = function(a, b, k) {
				var e = this.chart,
					c = this.userOptions,
					f = a + "Index",
					l = a + "Counter",
					d = k ? k.length : E(e.options.chart[a + "Count"], e[a + "Count"]);
				if (!b) {
					var h = E(c[f], c["_" + f]);
					m(h) || (e.series.length ||
						(e[l] = 0), c["_" + f] = h = e[l] % d, e[l] += 1);
					k && (b = k[h])
				}
				"undefined" !== typeof h && (this[f] = h);
				this[a] = b
			};
			d.prototype.getColor = function() {
				this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this
					.color = "#cccccc" : this.getCyclic("color", this.options.color || q
						.plotOptions[this.type].color, this.chart.options.colors)
			};
			d.prototype.getPointsCollection = function() {
				return (this.hasGroupedData ? this.points : this.data) || []
			};
			d.prototype.getSymbol = function() {
				this.getCyclic("symbol", this.options.marker.symbol,
					this.chart.options.symbols)
			};
			d.prototype.findPointIndex = function(a, b) {
				var e = a.id,
					c = a.x,
					f = this.points,
					m = this.options.dataSorting,
					l, d;
				if (e) m = this.chart.get(e), m instanceof C && (l = m);
				else if (this.linkedParent || this.enabledDataSorting || this.options
					.relativeXValue)
					if (l = function(b) {
							return !b.touched && b.index === a.index
						}, m && m.matchByName ? l = function(b) {
							return !b.touched && b.name === a.name
						} : this.options.relativeXValue && (l = function(b) {
							return !b.touched && b.options.x === a.x
						}), l = k(f, l), !l) return;
				if (l) {
					var h = l && l.index;
					"undefined" !== typeof h && (d = !0)
				}
				"undefined" === typeof h && L(c) && (h = this.xData.indexOf(c, b)); - 1 !== h &&
					"undefined" !== typeof h && this.cropped && (h = h >= this.cropStart ? h - this
						.cropStart : h);
				!d && L(h) && f[h] && f[h].touched && (h = void 0);
				return h
			};
			d.prototype.updateData = function(a, b) {
				var k = this.options,
					e = k.dataSorting,
					c = this.points,
					f = [],
					l = this.requireSorting,
					h = a.length === c.length,
					d, n, v, p = !0;
				this.xIncrement = null;
				a.forEach(function(a, b) {
					var n = m(a) && this.pointClass.prototype.optionsToObject.call({
							series: this
						}, a) || {},
						p = n.x;
					if (n.id || L(p)) {
						if (n = this.findPointIndex(n, v), -1 === n || "undefined" ===
							typeof n ? f.push(a) : c[n] && a !== k.data[n] ? (c[n].update(a,
								!1, null, !1), c[n].touched = !0, l && (v = n + 1)) : c[
							n] && (c[n].touched = !0), !h || b !== n || e && e.enabled ||
							this.hasDerivedData) d = !0
					} else f.push(a)
				}, this);
				if (d)
					for (a = c.length; a--;)(n = c[a]) && !n.touched && n.remove && n.remove(!1, b);
				else !h || e && e.enabled ? p = !1 : (a.forEach(function(a, b) {
					a !== c[b].y && c[b].update && c[b].update(a, !1, null, !1)
				}), f.length = 0);
				c.forEach(function(a) {
					a && (a.touched = !1)
				});
				if (!p) return !1;
				f.forEach(function(a) {
					this.addPoint(a, !1, null, null, !1)
				}, this);
				null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement = H(
					this.xData), this.autoIncrement());
				return !0
			};
			d.prototype.setData = function(a, k, e, c) {
				void 0 === k && (k = !0);
				var f = this,
					m = f.points,
					l = m && m.length || 0,
					h = f.options,
					d = f.chart,
					n = h.dataSorting,
					v = f.xAxis,
					p = h.turboThreshold,
					g = this.xData,
					q = this.yData,
					u = f.pointArrayMap;
				u = u && u.length;
				var w = h.keys,
					F, E = 0,
					r = 1,
					D = null;
				if (!d.options.chart.allowMutatingData) {
					h.data && delete f.options.data;
					f.userOptions.data &&
						delete f.userOptions.data;
					var t = Q(!0, a)
				}
				a = t || a || [];
				t = a.length;
				n && n.enabled && (a = this.sortData(a));
				d.options.chart.allowMutatingData && !1 !== c && t && l && !f.cropped && !f
					.hasGroupedData && f.visible && !f.boosted && (F = this.updateData(a, e));
				if (!F) {
					f.xIncrement = null;
					f.colorCounter = 0;
					this.parallelArrays.forEach(function(a) {
						f[a + "Data"].length = 0
					});
					if (p && t > p)
						if (D = f.getFirstValidPoint(a), L(D))
							for (e = 0; e < t; e++) g[e] = this.autoIncrement(), q[e] = a[e];
						else if (J(D))
						if (u)
							if (D.length === u)
								for (e = 0; e < t; e++) g[e] = this.autoIncrement(),
									q[e] = a[e];
							else
								for (e = 0; e < t; e++) c = a[e], g[e] = c[0], q[e] = c.slice(1, u +
									1);
					else if (w && (E = w.indexOf("x"), r = w.indexOf("y"), E = 0 <= E ? E : 0, r =
							0 <= r ? r : 1), 1 === D.length && (r = 0), E === r)
						for (e = 0; e < t; e++) g[e] = this.autoIncrement(), q[e] = a[e][r];
					else
						for (e = 0; e < t; e++) c = a[e], g[e] = c[E], q[e] = c[r];
					else b(12, !1, d);
					else
						for (e = 0; e < t; e++) "undefined" !== typeof a[e] && (c = {
								series: f
							}, f.pointClass.prototype.applyOptions.apply(c, [a[e]]), f
							.updateParallelArrays(c, e));
					q && O(q[0]) && b(14, !0, d);
					f.data = [];
					f.options.data = f.userOptions.data = a;
					for (e = l; e--;) m[e] &&
						m[e].destroy && m[e].destroy();
					v && (v.minRange = v.userMinRange);
					f.isDirty = d.isDirtyBox = !0;
					f.isDirtyData = !!m;
					e = !1
				}
				"point" === h.legendType && (this.processData(), this.generatePoints());
				k && d.redraw(e)
			};
			d.prototype.sortData = function(a) {
				var b = this,
					e = b.options.dataSorting.sortKey || "y",
					k = function(a, b) {
						return m(b) && a.pointClass.prototype.optionsToObject.call({
							series: a
						}, b) || {}
					};
				a.forEach(function(e, c) {
					a[c] = k(b, e);
					a[c].index = c
				}, this);
				a.concat().sort(function(a, b) {
					a = F(e, a);
					b = F(e, b);
					return b < a ? -1 : b > a ? 1 : 0
				}).forEach(function(a,
					b) {
					a.x = b
				}, this);
				b.linkedSeries && b.linkedSeries.forEach(function(b) {
					var e = b.options,
						c = e.data;
					e.dataSorting && e.dataSorting.enabled || !c || (c.forEach(function(e,
						f) {
						c[f] = k(b, e);
						a[f] && (c[f].x = a[f].x, c[f].index = f)
					}), b.setData(c, !1))
				});
				return a
			};
			d.prototype.getProcessedData = function(a) {
				var e = this.xAxis,
					k = this.options,
					c = k.cropThreshold,
					f = a || this.getExtremesFromAll || k.getExtremesFromAll,
					m = this.isCartesian;
				a = e && e.val2lin;
				k = !(!e || !e.logarithmic);
				var l = 0,
					h = this.xData,
					d = this.yData,
					n = this.requireSorting;
				var v = !1;
				var p = h.length;
				if (e) {
					v = e.getExtremes();
					var g = v.min;
					var q = v.max;
					v = !(!e.categories || e.names.length)
				}
				if (m && this.sorted && !f && (!c || p > c || this.forceCrop))
					if (h[p - 1] < g || h[0] > q) h = [], d = [];
					else if (this.yData && (h[0] < g || h[p - 1] > q)) {
					var u = this.cropData(this.xData, this.yData, g, q);
					h = u.xData;
					d = u.yData;
					l = u.start;
					u = !0
				}
				for (c = h.length || 1; --c;)
					if (e = k ? a(h[c]) - a(h[c - 1]) : h[c] - h[c - 1], 0 < e && ("undefined" ===
							typeof w || e < w)) var w = e;
					else 0 > e && n && !v && (b(15, !1, this.chart), n = !1);
				return {
					xData: h,
					yData: d,
					cropped: u,
					cropStart: l,
					closestPointRange: w
				}
			};
			d.prototype.processData = function(a) {
				var b = this.xAxis;
				if (this.isCartesian && !this.isDirty && !b.isDirty && !this.yAxis.isDirty && !a)
					return !1;
				a = this.getProcessedData();
				this.cropped = a.cropped;
				this.cropStart = a.cropStart;
				this.processedXData = a.xData;
				this.processedYData = a.yData;
				this.closestPointRange = this.basePointRange = a.closestPointRange;
				v(this, "afterProcessData")
			};
			d.prototype.cropData = function(a, b, e, k, c) {
				var f = a.length,
					m, l = 0,
					h = f;
				c = E(c, this.cropShoulder);
				for (m = 0; m < f; m++)
					if (a[m] >= e) {
						l = Math.max(0, m - c);
						break
					} for (e =
					m; e < f; e++)
					if (a[e] > k) {
						h = e + c;
						break
					} return {
					xData: a.slice(l, h),
					yData: b.slice(l, h),
					start: l,
					end: h
				}
			};
			d.prototype.generatePoints = function() {
				var b = this.options,
					e = this.processedData || b.data,
					k = this.processedXData,
					c = this.processedYData,
					f = this.pointClass,
					m = k.length,
					l = this.cropStart || 0,
					h = this.hasGroupedData,
					d = b.keys,
					n = [];
				b = b.dataGrouping && b.dataGrouping.groupAll ? l : 0;
				var p, g, q = this.data;
				if (!q && !h) {
					var u = [];
					u.length = e.length;
					q = this.data = u
				}
				d && h && (this.options.keys = !1);
				for (g = 0; g < m; g++) {
					u = l + g;
					if (h) {
						var w = (new f).init(this,
							[k[g]].concat(Z(c[g])));
						w.dataGroup = this.groupMap[b + g];
						w.dataGroup.options && (w.options = w.dataGroup.options, a(w, w.dataGroup
							.options), delete w.dataLabels)
					} else(w = q[u]) || "undefined" === typeof e[u] || (q[u] = w = (new f).init(
						this, e[u], k[g]));
					w && (w.index = h ? b + g : u, n[g] = w)
				}
				this.options.keys = d;
				if (q && (m !== (p = q.length) || h))
					for (g = 0; g < p; g++) g !== l || h || (g += m), q[g] && (q[g]
					.destroyElements(), q[g].plotX = void 0);
				this.data = q;
				this.points = n;
				v(this, "afterGeneratePoints")
			};
			d.prototype.getXExtremes = function(a) {
				return {
					min: K(a),
					max: H(a)
				}
			};
			d.prototype.getExtremes = function(a, b) {
				var e = this.xAxis,
					k = this.yAxis,
					c = this.processedXData || this.xData,
					f = [],
					m = this.requireSorting ? this.cropShoulder : 0;
				k = k ? k.positiveValuesOnly : !1;
				var l, h = 0,
					d = 0,
					n = 0;
				a = a || this.stackedYData || this.processedYData || [];
				var g = a.length;
				if (e) {
					var p = e.getExtremes();
					h = p.min;
					d = p.max
				}
				for (l = 0; l < g; l++) {
					var q = c[l];
					p = a[l];
					var u = (L(p) || J(p)) && (p.length || 0 < p || !k);
					q = b || this.getExtremesFromAll || this.options.getExtremesFromAll || this
						.cropped || !e || (c[l + m] || q) >= h && (c[l - m] || q) <= d;
					if (u && q)
						if (u =
							p.length)
							for (; u--;) L(p[u]) && (f[n++] = p[u]);
						else f[n++] = p
				}
				a = {
					activeYData: f,
					dataMin: K(f),
					dataMax: H(f)
				};
				v(this, "afterGetExtremes", {
					dataExtremes: a
				});
				return a
			};
			d.prototype.applyExtremes = function() {
				var a = this.getExtremes();
				this.dataMin = a.dataMin;
				this.dataMax = a.dataMax;
				return a
			};
			d.prototype.getFirstValidPoint = function(a) {
				for (var b = a.length, e = 0, k = null; null === k && e < b;) k = a[e], e++;
				return k
			};
			d.prototype.translate = function() {
				this.processedXData || this.processData();
				this.generatePoints();
				var a = this.options,
					b = a.stacking,
					e = this.xAxis,
					k = e.categories,
					c = this.enabledDataSorting,
					f = this.yAxis,
					l = this.points,
					h = l.length,
					d = this.pointPlacementToXValue(),
					n = !!d,
					p = a.threshold,
					g = a.startFromThreshold ? p : 0,
					q = this.zoneAxis || "y",
					F, r, D = Number.MAX_VALUE;
				for (F = 0; F < h; F++) {
					var t = l[F],
						G = t.x,
						x = void 0,
						N = void 0,
						O = t.y,
						A = t.low,
						H = b && f.stacking && f.stacking.stacks[(this.negStacks && O < (g ? 0 :
							p) ? "-" : "") + this.stackKey];
					if (f.positiveValuesOnly && !f.validatePositiveValue(O) || e
						.positiveValuesOnly && !e.validatePositiveValue(G)) t.isNull = !0;
					t.plotX = r = u(w(e.translate(G,
						0, 0, 0, 1, d, "flags" === this.type), -1E5, 1E5));
					if (b && this.visible && H && H[G]) {
						var Q = this.getStackIndicator(Q, G, this.index);
						t.isNull || (x = H[G], N = x.points[Q.key])
					}
					J(N) && (A = N[0], O = N[1], A === g && Q.key === H[G].base && (A = E(L(p) && p,
							f.min)), f.positiveValuesOnly && 0 >= A && (A = null), t.total = t
						.stackTotal = x.total, t.percentage = x.total && t.y / x.total * 100, t
						.stackY = O, this.irregularWidths || x.setOffset(this.pointXOffset || 0,
							this.barW || 0));
					t.yBottom = m(A) ? w(f.translate(A, 0, 1, 0, 1), -1E5, 1E5) : null;
					this.dataModify && (O = this.dataModify.modifyValue(O,
						F));
					t.plotY = void 0;
					L(O) && (x = f.translate(O, !1, !0, !1, !0), "undefined" !== typeof x && (t
						.plotY = w(x, -1E5, 1E5)));
					t.isInside = this.isPointInside(t);
					t.clientX = n ? u(e.translate(G, 0, 0, 0, 1, d)) : r;
					t.negative = t[q] < (a[q + "Threshold"] || p || 0);
					t.category = E(k && k[t.x], t.x);
					if (!t.isNull && !1 !== t.visible) {
						"undefined" !== typeof C && (D = Math.min(D, Math.abs(r - C)));
						var C = r
					}
					t.zone = this.zones.length ? t.getZone() : void 0;
					!t.graphic && this.group && c && (t.isNew = !0)
				}
				this.closestPointRangePx = D;
				v(this, "afterTranslate")
			};
			d.prototype.getValidPoints =
				function(a, b, e) {
					var k = this.chart;
					return (a || this.points || []).filter(function(a) {
						return b && !k.isInsidePlot(a.plotX, a.plotY, {
							inverted: k.inverted
						}) ? !1 : !1 !== a.visible && (e || !a.isNull)
					})
				};
			d.prototype.getClipBox = function() {
				var a = this.chart,
					b = this.xAxis,
					e = this.yAxis,
					k = Q(a.clipBox);
				b && b.len !== a.plotSizeX && (k.width = b.len);
				e && e.len !== a.plotSizeY && (k.height = e.len);
				return k
			};
			d.prototype.getSharedClipKey = function() {
				return this.sharedClipKey = (this.options.xAxis || 0) + "," + (this.options.yAxis ||
					0)
			};
			d.prototype.setClip =
				function() {
					var a = this.chart,
						b = this.group,
						e = this.markerGroup,
						k = a.sharedClips;
					a = a.renderer;
					var c = this.getClipBox(),
						f = this.getSharedClipKey(),
						m = k[f];
					m ? m.animate(c) : k[f] = m = a.clipRect(c);
					b && b.clip(!1 === this.options.clip ? void 0 : m);
					e && e.clip()
				};
			d.prototype.animate = function(a) {
				var b = this.chart,
					e = this.group,
					k = this.markerGroup,
					c = b.inverted,
					f = h(this.options.animation),
					m = [this.getSharedClipKey(), f.duration, f.easing, f.defer].join(),
					l = b.sharedClips[m],
					d = b.sharedClips[m + "m"];
				if (a && e) f = this.getClipBox(), l ? l.attr("height",
					f.height) : (f.width = 0, c && (f.x = b.plotHeight), l = b.renderer
					.clipRect(f), b.sharedClips[m] = l, d = b.renderer.clipRect({
						x: c ? (b.plotSizeX || 0) + 99 : -99,
						y: c ? -b.plotLeft : -b.plotTop,
						width: 99,
						height: c ? b.chartWidth : b.chartHeight
					}), b.sharedClips[m + "m"] = d), e.clip(l), k && k.clip(d);
				else if (l && !l.hasClass("highcharts-animating")) {
					b = this.getClipBox();
					var n = f.step;
					k && k.element.childNodes.length && (f.step = function(a, b) {
						n && n.apply(b, arguments);
						d && d.element && d.attr(b.prop, "width" === b.prop ? a + 99 : a)
					});
					l.addClass("highcharts-animating").animate(b,
						f)
				}
			};
			d.prototype.afterAnimate = function() {
				var a = this;
				this.setClip();
				T(this.chart.sharedClips, function(b, e, k) {
					b && !a.chart.container.querySelector('[clip-path="url(#'.concat(b.id,
						')"]')) && (b.destroy(), delete k[e])
				});
				this.finishedAnimating = !0;
				v(this, "afterAnimate")
			};
			d.prototype.drawPoints = function(a) {
				void 0 === a && (a = this.points);
				var b = this.chart,
					e = this.options.marker,
					k = this[this.specialGroup] || this.markerGroup,
					c = this.xAxis,
					f = E(e.enabled, !c || c.isRadial ? !0 : null, this.closestPointRangePx >= e
						.enabledThreshold *
						e.radius),
					m, l;
				if (!1 !== e.enabled || this._hasPointMarkers)
					for (m = 0; m < a.length; m++) {
						var h = a[m];
						var d = (l = h.graphic) ? "animate" : "attr";
						var n = h.marker || {};
						var v = !!h.marker;
						if ((f && "undefined" === typeof n.enabled || n.enabled) && !h.isNull && !
							1 !== h.visible) {
							var p = E(n.symbol, this.symbol, "rect");
							var g = this.markerAttribs(h, h.selected && "select");
							this.enabledDataSorting && (h.startXPos = c.reversed ? -(g.width || 0) :
								c.width);
							var q = !1 !== h.isInside;
							l ? l[q ? "show" : "hide"](q).animate(g) : q && (0 < (g.width || 0) || h
								.hasImage) && (h.graphic = l =
								b.renderer.symbol(p, g.x, g.y, g.width, g.height, v ? n : e)
								.add(k), this.enabledDataSorting && b.hasRendered && (l.attr({
									x: h.startXPos
								}), d = "animate"));
							l && "animate" === d && l[q ? "show" : "hide"](q).animate(g);
							if (l && !b.styledMode) l[d](this.pointAttribs(h, h.selected &&
								"select"));
							l && l.addClass(h.getClassName(), !0)
						} else l && (h.graphic = l.destroy())
					}
			};
			d.prototype.markerAttribs = function(a, b) {
				var e = this.options,
					k = e.marker,
					c = a.marker || {},
					f = c.symbol || k.symbol,
					m = E(c.radius, k && k.radius);
				b && (k = k.states[b], b = c.states && c.states[b], m =
					E(b && b.radius, k && k.radius, m && m + (k && k.radiusPlus || 0)));
				a.hasImage = f && 0 === f.indexOf("url");
				a.hasImage && (m = 0);
				a = L(m) ? {
					x: e.crisp ? Math.floor(a.plotX - m) : a.plotX - m,
					y: a.plotY - m
				} : {};
				m && (a.width = a.height = 2 * m);
				return a
			};
			d.prototype.pointAttribs = function(a, b) {
				var e = this.options.marker,
					k = a && a.options,
					c = k && k.marker || {},
					f = k && k.color,
					m = a && a.color,
					l = a && a.zone && a.zone.color,
					h = this.color;
				a = E(c.lineWidth, e.lineWidth);
				k = 1;
				h = f || l || m || h;
				f = c.fillColor || e.fillColor || h;
				m = c.lineColor || e.lineColor || h;
				b = b || "normal";
				e = e.states[b] || {};
				b = c.states && c.states[b] || {};
				a = E(b.lineWidth, e.lineWidth, a + E(b.lineWidthPlus, e.lineWidthPlus, 0));
				f = b.fillColor || e.fillColor || f;
				m = b.lineColor || e.lineColor || m;
				k = E(b.opacity, e.opacity, k);
				return {
					stroke: m,
					"stroke-width": a,
					fill: f,
					opacity: k
				}
			};
			d.prototype.destroy = function(a) {
				var b = this,
					k = b.chart,
					c = /AppleWebKit\/533/.test(D.navigator.userAgent),
					f = b.data || [],
					m, l, h, d;
				v(b, "destroy", {
					keepEventsForUpdate: a
				});
				this.removeEvents(a);
				(b.axisTypes || []).forEach(function(a) {
					(d = b[a]) && d.series && (e(d.series, b), d.isDirty =
						d.forceRedraw = !0)
				});
				b.legendItem && b.chart.legend.destroyItem(b);
				for (l = f.length; l--;)(h = f[l]) && h.destroy && h.destroy();
				b.clips && b.clips.forEach(function(a) {
					return a.destroy()
				});
				r.clearTimeout(b.animationTimeout);
				T(b, function(a, b) {
					a instanceof t && !a.survive && (m = c && "group" === b ? "hide" :
						"destroy", a[m]())
				});
				k.hoverSeries === b && (k.hoverSeries = void 0);
				e(k.series, b);
				k.orderSeries();
				T(b, function(e, k) {
					a && "hcEvents" === k || delete b[k]
				})
			};
			d.prototype.applyZones = function() {
				var a = this,
					b = this.chart,
					e = b.renderer,
					k = this.zones,
					c = this.clips || [],
					f = this.graph,
					m = this.area,
					l = Math.max(b.plotWidth, b.plotHeight),
					h = this[(this.zoneAxis || "y") + "Axis"],
					d = b.inverted,
					n, v, p, g, q, u, F, r, D = !1;
				if (k.length && (f || m) && h && "undefined" !== typeof h.min) {
					var t = h.reversed;
					var J = h.horiz;
					f && !this.showLine && f.hide();
					m && m.hide();
					var G = h.getExtremes();
					k.forEach(function(k, L) {
						n = t ? J ? b.plotWidth : 0 : J ? 0 : h.toPixels(G.min) || 0;
						n = w(E(v, n), 0, l);
						v = w(Math.round(h.toPixels(E(k.value, G.max), !0) || 0), 0, l);
						D && (n = v = h.toPixels(G.max));
						g = Math.abs(n - v);
						q = Math.min(n, v);
						u = Math.max(n,
							v);
						h.isXAxis ? (p = {
							x: d ? u : q,
							y: 0,
							width: g,
							height: l
						}, J || (p.x = b.plotHeight - p.x)) : (p = {
							x: 0,
							y: d ? u : q,
							width: l,
							height: g
						}, J && (p.y = b.plotWidth - p.y));
						d && e.isVML && (p = h.isXAxis ? {
							x: 0,
							y: t ? q : u,
							height: p.width,
							width: b.chartWidth
						} : {
							x: p.y - b.plotLeft - b.spacingBox.x,
							y: 0,
							width: p.height,
							height: b.chartHeight
						});
						c[L] ? c[L].animate(p) : c[L] = e.clipRect(p);
						F = a["zone-area-" + L];
						r = a["zone-graph-" + L];
						f && r && r.clip(c[L]);
						m && F && F.clip(c[L]);
						D = k.value > G.max;
						a.resetZones && 0 === v && (v = void 0)
					});
					this.clips = c
				} else a.visible && (f && f.show(), m && m.show())
			};
			d.prototype.plotGroup = function(a, b, e, k, c) {
				var f = this[a],
					l = !f;
				e = {
					visibility: e,
					zIndex: k || .1
				};
				"undefined" === typeof this.opacity || this.chart.styledMode || "inactive" === this
					.state || (e.opacity = this.opacity);
				l && (this[a] = f = this.chart.renderer.g().add(c));
				f.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" +
					this.type + "-series " + (m(this.colorIndex) ? "highcharts-color-" + this
						.colorIndex + " " : "") + (this.options.className || "") + (f.hasClass(
						"highcharts-tracker") ? " highcharts-tracker" : ""), !0);
				f.attr(e)[l ?
					"attr" : "animate"](this.getPlotBox(b));
				return f
			};
			d.prototype.getPlotBox = function(a) {
				var b = this.xAxis,
					e = this.yAxis,
					k = this.chart;
				a = k.inverted && !k.polar && b && !1 !== this.invertible && ("markers" === a ||
					"series" === a);
				k.inverted && (b = e, e = this.xAxis);
				return {
					translateX: b ? b.left : k.plotLeft,
					translateY: e ? e.top : k.plotTop,
					rotation: a ? 90 : 0,
					rotationOriginX: a ? (b.len - e.len) / 2 : 0,
					rotationOriginY: a ? (b.len + e.len) / 2 : 0,
					scaleX: a ? -1 : 1,
					scaleY: 1
				}
			};
			d.prototype.removeEvents = function(a) {
				a || N(this);
				this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function(a) {
						a()
					}),
					this.eventsToUnbind.length = 0)
			};
			d.prototype.render = function() {
				var a = this,
					b = a.chart,
					e = a.options,
					k = h(e.animation),
					c = a.visible ? "inherit" : "hidden",
					f = e.zIndex,
					m = a.hasRendered,
					l = b.seriesGroup;
				b = !a.finishedAnimating && b.renderer.isSVG ? k.duration : 0;
				v(this, "render");
				a.plotGroup("group", "series", c, f, l);
				a.markerGroup = a.plotGroup("markerGroup", "markers", c, f, l);
				!1 !== e.clip && a.setClip();
				a.animate && b && a.animate(!0);
				a.drawGraph && (a.drawGraph(), a.applyZones());
				a.visible && a.drawPoints();
				a.drawDataLabels && a.drawDataLabels();
				a.redrawPoints && a.redrawPoints();
				a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
				a.animate && b && a.animate();
				m || (b && k.defer && (b += k.defer), a.animationTimeout = M(function() {
					a.afterAnimate()
				}, b || 0));
				a.isDirty = !1;
				a.hasRendered = !0;
				v(a, "afterRender")
			};
			d.prototype.redraw = function() {
				var a = this.isDirty || this.isDirtyData;
				this.translate();
				this.render();
				a && delete this.kdTree
			};
			d.prototype.searchPoint = function(a, b) {
				var e = this.xAxis,
					k = this.yAxis,
					c = this.chart.inverted;
				return this.searchKDTree({
					clientX: c ?
						e.len - a.chartY + e.pos : a.chartX - e.pos,
					plotY: c ? k.len - a.chartX + k.pos : a.chartY - k.pos
				}, b, a)
			};
			d.prototype.buildKDTree = function(a) {
				function b(a, k, c) {
					var f = a && a.length;
					if (f) {
						var m = e.kdAxisArray[k % c];
						a.sort(function(a, b) {
							return a[m] - b[m]
						});
						f = Math.floor(f / 2);
						return {
							point: a[f],
							left: b(a.slice(0, f), k + 1, c),
							right: b(a.slice(f + 1), k + 1, c)
						}
					}
				}
				this.buildingKdTree = !0;
				var e = this,
					k = -1 < e.options.findNearestPointBy.indexOf("y") ? 2 : 1;
				delete e.kdTree;
				M(function() {
					e.kdTree = b(e.getValidPoints(null, !e.directTouch), k, k);
					e.buildingKdTree = !1
				}, e.options.kdNow || a && "touchstart" === a.type ? 0 : 1)
			};
			d.prototype.searchKDTree = function(a, b, e) {
				function k(a, b, e, d) {
					var n = b.point,
						v = c.kdAxisArray[e % d],
						p = n,
						g = m(a[f]) && m(n[f]) ? Math.pow(a[f] - n[f], 2) : null;
					var q = m(a[l]) && m(n[l]) ? Math.pow(a[l] - n[l], 2) : null;
					q = (g || 0) + (q || 0);
					n.dist = m(q) ? Math.sqrt(q) : Number.MAX_VALUE;
					n.distX = m(g) ? Math.sqrt(g) : Number.MAX_VALUE;
					v = a[v] - n[v];
					q = 0 > v ? "left" : "right";
					g = 0 > v ? "right" : "left";
					b[q] && (q = k(a, b[q], e + 1, d), p = q[h] < p[h] ? q : n);
					b[g] && Math.sqrt(v * v) < p[h] && (a = k(a, b[g], e + 1, d), p = a[h] < p[h] ?
						a : p);
					return p
				}
				var c = this,
					f = this.kdAxisArray[0],
					l = this.kdAxisArray[1],
					h = b ? "distX" : "dist";
				b = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1;
				this.kdTree || this.buildingKdTree || this.buildKDTree(e);
				if (this.kdTree) return k(a, this.kdTree, b, b)
			};
			d.prototype.pointPlacementToXValue = function() {
				var a = this.options,
					b = a.pointRange,
					e = this.xAxis;
				a = a.pointPlacement;
				"between" === a && (a = e.reversed ? -.5 : .5);
				return L(a) ? a * (b || e.pointRange) : 0
			};
			d.prototype.isPointInside = function(a) {
				var b = this.chart,
					e = this.xAxis,
					k = this.yAxis;
				return "undefined" !== typeof a.plotY && "undefined" !== typeof a.plotX && 0 <= a
					.plotY && a.plotY <= (k ? k.len : b.plotHeight) && 0 <= a.plotX && a.plotX <= (
						e ? e.len : b.plotWidth)
			};
			d.prototype.drawTracker = function() {
				var a = this,
					b = a.options,
					e = b.trackByArea,
					k = [].concat(e ? a.areaPath : a.graphPath),
					m = a.chart,
					l = m.pointer,
					h = m.renderer,
					d = m.options.tooltip.snap,
					n = a.tracker,
					p = function(b) {
						if (m.hoverSeries !== a) a.onMouseOver()
					},
					g = "rgba(192,192,192," + (c ? .0001 : .002) + ")";
				n ? n.attr({
					d: k
				}) : a.graph && (a.tracker = h.path(k).attr({
					visibility: a.visible ?
						"inherit" : "hidden",
					zIndex: 2
				}).addClass(e ? "highcharts-tracker-area" : "highcharts-tracker-line").add(a
					.group), m.styledMode || a.tracker.attr({
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					stroke: g,
					fill: e ? g : "none",
					"stroke-width": a.graph.strokeWidth() + (e ? 0 : 2 * d)
				}), [a.tracker, a.markerGroup, a.dataLabelsGroup].forEach(function(a) {
					if (a && (a.addClass("highcharts-tracker").on("mouseover", p).on(
							"mouseout",
							function(a) {
								l.onTrackerMouseOut(a)
							}), b.cursor && !m.styledMode && a.css({
							cursor: b.cursor
						}), f)) a.on("touchstart",
						p)
				}));
				v(this, "afterDrawTracker")
			};
			d.prototype.addPoint = function(a, b, e, k, c) {
				var f = this.options,
					m = this.data,
					l = this.chart,
					h = this.xAxis;
				h = h && h.hasNames && h.names;
				var d = f.data,
					n = this.xData,
					p;
				b = E(b, !0);
				var g = {
					series: this
				};
				this.pointClass.prototype.applyOptions.apply(g, [a]);
				var q = g.x;
				var u = n.length;
				if (this.requireSorting && q < n[u - 1])
					for (p = !0; u && n[u - 1] > q;) u--;
				this.updateParallelArrays(g, "splice", u, 0, 0);
				this.updateParallelArrays(g, u);
				h && g.name && (h[q] = g.name);
				d.splice(u, 0, a);
				if (p || this.processedData) this.data.splice(u,
					0, null), this.processData();
				"point" === f.legendType && this.generatePoints();
				e && (m[0] && m[0].remove ? m[0].remove(!1) : (m.shift(), this.updateParallelArrays(
					g, "shift"), d.shift()));
				!1 !== c && v(this, "addPoint", {
					point: g
				});
				this.isDirtyData = this.isDirty = !0;
				b && l.redraw(k)
			};
			d.prototype.removePoint = function(a, b, e) {
				var k = this,
					c = k.data,
					f = c[a],
					m = k.points,
					h = k.chart,
					d = function() {
						m && m.length === c.length && m.splice(a, 1);
						c.splice(a, 1);
						k.options.data.splice(a, 1);
						k.updateParallelArrays(f || {
							series: k
						}, "splice", a, 1);
						f && f.destroy();
						k.isDirty = !0;
						k.isDirtyData = !0;
						b && h.redraw()
					};
				l(e, h);
				b = E(b, !0);
				f ? f.firePointEvent("remove", null, d) : d()
			};
			d.prototype.remove = function(a, b, e, k) {
				function c() {
					f.destroy(k);
					m.isDirtyLegend = m.isDirtyBox = !0;
					m.linkSeries();
					E(a, !0) && m.redraw(b)
				}
				var f = this,
					m = f.chart;
				!1 !== e ? v(f, "remove", null, c) : c()
			};
			d.prototype.update = function(e, k) {
				e = n(e, this.userOptions);
				v(this, "update", {
					options: e
				});
				var c = this,
					f = c.chart,
					m = c.userOptions,
					l = c.initialType || c.type,
					h = f.options.plotOptions,
					d = G[l].prototype,
					p = c.finishedAnimating && {
						animation: !1
					},
					g = {},
					q = ["eventOptions", "navigatorSeries", "baseSeries"],
					u = e.type || m.type || f.options.chart.type,
					w = !(this.hasDerivedData || u && u !== this.type || "undefined" !== typeof e
						.pointStart || "undefined" !== typeof e.pointInterval || "undefined" !==
						typeof e.relativeXValue || e.joinBy || e.mapData || c.hasOptionChanged(
							"dataGrouping") || c.hasOptionChanged("pointStart") || c
						.hasOptionChanged("pointInterval") || c.hasOptionChanged(
							"pointIntervalUnit") || c.hasOptionChanged("keys"));
				u = u || l;
				w && (q.push("data", "isDirtyData", "points", "processedData",
						"processedXData", "processedYData", "xIncrement", "cropped",
						"_hasPointMarkers", "_hasPointLabels", "clips", "nodes", "layout",
						"level", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== e
					.visible && q.push("area", "graph"), c.parallelArrays.forEach(function(a) {
						q.push(a + "Data")
					}), e.data && (e.dataSorting && a(c.options.dataSorting, e.dataSorting),
						this.setData(e.data, !1)));
				e = Q(m, p, {
						index: "undefined" === typeof m.index ? c.index : m.index,
						pointStart: E(h && h.series && h.series.pointStart, m.pointStart, c
							.xData[0])
					}, !w && {
						data: c.options.data
					},
					e);
				w && e.data && (e.data = c.options.data);
				q = ["group", "markerGroup", "dataLabelsGroup", "transformGroup", "shadowGroup"]
					.concat(q);
				q.forEach(function(a) {
					q[a] = c[a];
					delete c[a]
				});
				h = !1;
				if (G[u]) {
					if (h = u !== c.type, c.remove(!1, !1, !1, !0), h)
						if (Object.setPrototypeOf) Object.setPrototypeOf(c, G[u].prototype);
						else {
							p = Object.hasOwnProperty.call(c, "hcEvents") && c.hcEvents;
							for (F in d) c[F] = void 0;
							a(c, G[u].prototype);
							p ? c.hcEvents = p : delete c.hcEvents
						}
				} else b(17, !0, f, {
					missingModuleFor: u
				});
				q.forEach(function(a) {
					c[a] = q[a]
				});
				c.init(f,
					e);
				if (w && this.points) {
					e = c.options;
					if (!1 === e.visible) g.graphic = 1, g.dataLabel = 1;
					else if (!c._hasPointLabels) {
						d = e.marker;
						var F = e.dataLabels;
						!d || !1 !== d.enabled && (m.marker && m.marker.symbol) === d.symbol || (g
							.graphic = 1);
						F && !1 === F.enabled && (g.dataLabel = 1)
					}
					m = 0;
					for (d = this.points; m < d.length; m++)(F = d[m]) && F.series && (F
						.resolveColor(), Object.keys(g).length && F.destroyElements(g), !1 === e
						.showInLegend && F.legendItem && f.legend.destroyItem(F))
				}
				c.initialType = l;
				f.linkSeries();
				h && c.linkedSeries.length && (c.isDirtyData = !0);
				v(this,
					"afterUpdate");
				E(k, !0) && f.redraw(w ? void 0 : !1)
			};
			d.prototype.setName = function(a) {
				this.name = this.options.name = this.userOptions.name = a;
				this.chart.isDirtyLegend = !0
			};
			d.prototype.hasOptionChanged = function(a) {
				var b = this.options[a],
					e = this.chart.options.plotOptions,
					k = this.userOptions[a];
				return k ? b !== k : b !== E(e && e[this.type] && e[this.type][a], e && e.series &&
					e.series[a], b)
			};
			d.prototype.onMouseOver = function() {
				var a = this.chart,
					b = a.hoverSeries;
				a.pointer.setHoverChartIndex();
				if (b && b !== this) b.onMouseOut();
				this.options.events.mouseOver &&
					v(this, "mouseOver");
				this.setState("hover");
				a.hoverSeries = this
			};
			d.prototype.onMouseOut = function() {
				var a = this.options,
					b = this.chart,
					e = b.tooltip,
					k = b.hoverPoint;
				b.hoverSeries = null;
				if (k) k.onMouseOut();
				this && a.events.mouseOut && v(this, "mouseOut");
				!e || this.stickyTracking || e.shared && !this.noSharedTooltip || e.hide();
				b.series.forEach(function(a) {
					a.setState("", !0)
				})
			};
			d.prototype.setState = function(a, b) {
				var e = this,
					k = e.options,
					c = e.graph,
					f = k.inactiveOtherPoints,
					m = k.states,
					h = E(m[a || "normal"] && m[a || "normal"].animation,
						e.chart.options.chart.animation),
					l = k.lineWidth,
					d = 0,
					n = k.opacity;
				a = a || "";
				if (e.state !== a && ([e.group, e.markerGroup, e.dataLabelsGroup].forEach(function(
						b) {
						b && (e.state && b.removeClass("highcharts-series-" + e.state), a &&
							b.addClass("highcharts-series-" + a))
					}), e.state = a, !e.chart.styledMode)) {
					if (m[a] && !1 === m[a].enabled) return;
					a && (l = m[a].lineWidth || l + (m[a].lineWidthPlus || 0), n = E(m[a].opacity,
						n));
					if (c && !c.dashstyle && L(l))
						for (k = {
								"stroke-width": l
							}, c.animate(k, h); e["zone-graph-" + d];) e["zone-graph-" + d].animate(
								k, h), d +=
							1;
					f || [e.group, e.markerGroup, e.dataLabelsGroup, e.labelBySeries].forEach(
						function(a) {
							a && a.animate({
								opacity: n
							}, h)
						})
				}
				b && f && e.points && e.setAllPointsToState(a || void 0)
			};
			d.prototype.setAllPointsToState = function(a) {
				this.points.forEach(function(b) {
					b.setState && b.setState(a)
				})
			};
			d.prototype.setVisible = function(a, b) {
				var e = this,
					k = e.chart,
					c = k.options.chart.ignoreHiddenSeries,
					f = e.visible,
					m = (e.visible = a = e.options.visible = e.userOptions.visible = "undefined" ===
						typeof a ? !f : a) ? "show" : "hide";
				["group", "dataLabelsGroup", "markerGroup",
					"tracker", "tt"
				].forEach(function(a) {
					if (e[a]) e[a][m]()
				});
				if (k.hoverSeries === e || (k.hoverPoint && k.hoverPoint.series) === e) e
					.onMouseOut();
				e.legendItem && k.legend.colorizeItem(e, a);
				e.isDirty = !0;
				e.options.stacking && k.series.forEach(function(a) {
					a.options.stacking && a.visible && (a.isDirty = !0)
				});
				e.linkedSeries.forEach(function(b) {
					b.setVisible(a, !1)
				});
				c && (k.isDirtyBox = !0);
				v(e, m);
				!1 !== b && k.redraw()
			};
			d.prototype.show = function() {
				this.setVisible(!0)
			};
			d.prototype.hide = function() {
				this.setVisible(!1)
			};
			d.prototype.select =
				function(a) {
					this.selected = a = this.options.selected = "undefined" === typeof a ? !this
						.selected : a;
					this.checkbox && (this.checkbox.checked = a);
					v(this, a ? "select" : "unselect")
				};
			d.prototype.shouldShowTooltip = function(a, b, e) {
				void 0 === e && (e = {});
				e.series = this;
				e.visiblePlotOnly = !0;
				return this.chart.isInsidePlot(a, b, e)
			};
			d.defaultOptions = A;
			d.types = x.seriesTypes;
			d.registerType = x.registerSeriesType;
			return d
		}();
		a(d.prototype, {
			axisTypes: ["xAxis", "yAxis"],
			coll: "series",
			colorCounter: 0,
			cropShoulder: 1,
			directTouch: !1,
			drawLegendSymbol: y.drawLineMarker,
			isCartesian: !0,
			kdAxisArray: ["clientX", "plotY"],
			parallelArrays: ["x", "y"],
			pointClass: C,
			requireSorting: !0,
			sorted: !0
		});
		x.series = d;
		"";
		"";
		return d
	});
	I(g, "Extensions/ScrollablePlotArea.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/Axis/Axis.js"], g[
		"Core/Chart/Chart.js"], g["Core/Series/Series.js"], g["Core/Renderer/RendererRegistry.js"], g[
		"Core/Utilities.js"]], function(d, g, z, B, y, C) {
		var A = d.stop,
			x = C.addEvent,
			t = C.createElement,
			r = C.defined,
			h = C.merge,
			l = C.pick;
		x(z, "afterSetChartSize", function(l) {
			var d =
				this.options.chart.scrollablePlotArea,
				f = d && d.minWidth;
			d = d && d.minHeight;
			if (!this.renderer.forExport) {
				if (f) {
					if (this.scrollablePixelsX = f = Math.max(0, f - this.chartWidth)) {
						this.scrollablePlotBox = this.renderer.scrollablePlotBox = h(this.plotBox);
						this.plotBox.width = this.plotWidth += f;
						this.inverted ? this.clipBox.height += f : this.clipBox.width += f;
						var c = {
							1: {
								name: "right",
								value: f
							}
						}
					}
				} else d && (this.scrollablePixelsY = f = Math.max(0, d - this.chartHeight), r(f) &&
					(this.scrollablePlotBox = this.renderer.scrollablePlotBox = h(this.plotBox),
						this.plotBox.height = this.plotHeight += f, this.inverted ? this.clipBox
						.width += f : this.clipBox.height += f, c = {
							2: {
								name: "bottom",
								value: f
							}
						}));
				c && !l.skipAxes && this.axes.forEach(function(f) {
					c[f.side] ? f.getPlotLinePath = function() {
						var l = c[f.side].name,
							h = this[l];
						this[l] = h - c[f.side].value;
						var d = g.prototype.getPlotLinePath.apply(this, arguments);
						this[l] = h;
						return d
					} : (f.setAxisSize(), f.setAxisTranslation())
				})
			}
		});
		x(z, "render", function() {
			this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this
				.setUpScrolling(),
				this.applyFixed()) : this.fixedDiv && this.applyFixed()
		});
		z.prototype.setUpScrolling = function() {
			var l = this,
				h = {
					WebkitOverflowScrolling: "touch",
					overflowX: "hidden",
					overflowY: "hidden"
				};
			this.scrollablePixelsX && (h.overflowX = "auto");
			this.scrollablePixelsY && (h.overflowY = "auto");
			this.scrollingParent = t("div", {
				className: "highcharts-scrolling-parent"
			}, {
				position: "relative"
			}, this.renderTo);
			this.scrollingContainer = t("div", {
				className: "highcharts-scrolling"
			}, h, this.scrollingParent);
			var f;
			x(this.scrollingContainer, "scroll",
				function() {
					l.pointer && (delete l.pointer.chartPosition, l.hoverPoint && (f = l
						.hoverPoint), l.pointer.runPointActions(void 0, f, !0))
				});
			this.innerContainer = t("div", {
				className: "highcharts-inner-container"
			}, null, this.scrollingContainer);
			this.innerContainer.appendChild(this.container);
			this.setUpScrolling = null
		};
		z.prototype.moveFixedElements = function() {
			var l = this.container,
				h = this.fixedRenderer,
				f =
				".highcharts-breadcrumbs-group .highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title"
				.split(" "),
				c;
			this.scrollablePixelsX && !this.inverted ? c = ".highcharts-yaxis" : this
				.scrollablePixelsX && this.inverted ? c = ".highcharts-xaxis" : this
				.scrollablePixelsY && !this.inverted ? c = ".highcharts-xaxis" : this
				.scrollablePixelsY && this.inverted && (c = ".highcharts-yaxis");
			c && f.push("" + c + ":not(.highcharts-radial-axis)", "" + c +
				"-labels:not(.highcharts-radial-axis-labels)");
			f.forEach(function(c) {
				[].forEach.call(l.querySelectorAll(c), function(c) {
					(c.namespaceURI === h.SVG_NS ? h.box : h.box.parentNode).appendChild
						(c);
					c.style.pointerEvents =
						"auto"
				})
			})
		};
		z.prototype.applyFixed = function() {
			var h = !this.fixedDiv,
				d = this.options.chart,
				f = d.scrollablePlotArea,
				c = y.getRendererType();
			h ? (this.fixedDiv = t("div", {
						className: "highcharts-fixed"
					}, {
						position: "absolute",
						overflow: "hidden",
						pointerEvents: "none",
						zIndex: (d.style && d.style.zIndex || 0) + 2,
						top: 0
					}, null, !0), this.scrollingContainer && this.scrollingContainer.parentNode
					.insertBefore(this.fixedDiv, this.scrollingContainer), this.renderTo.style
					.overflow = "visible", this.fixedRenderer = d = new c(this.fixedDiv, this
						.chartWidth,
						this.chartHeight, this.options.chart.style), this.scrollableMask = d.path()
					.attr({
						fill: this.options.chart.backgroundColor || "#fff",
						"fill-opacity": l(f.opacity, .85),
						zIndex: -1
					}).addClass("highcharts-scrollable-mask").add(), x(this, "afterShowResetZoom", this
						.moveFixedElements), x(this, "afterApplyDrilldown", this.moveFixedElements), x(
						this, "afterLayOutTitles", this.moveFixedElements)) : this.fixedRenderer
				.setSize(this.chartWidth, this.chartHeight);
			if (this.scrollableDirty || h) this.scrollableDirty = !1, this.moveFixedElements();
			d = this.chartWidth + (this.scrollablePixelsX || 0);
			c = this.chartHeight + (this.scrollablePixelsY || 0);
			A(this.container);
			this.container.style.width = d + "px";
			this.container.style.height = c + "px";
			this.renderer.boxWrapper.attr({
				width: d,
				height: c,
				viewBox: [0, 0, d, c].join(" ")
			});
			this.chartBackground.attr({
				width: d,
				height: c
			});
			this.scrollingContainer.style.height = this.chartHeight + "px";
			h && (f.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * f
				.scrollPositionX), f.scrollPositionY && (this.scrollingContainer.scrollTop =
				this.scrollablePixelsY * f.scrollPositionY));
			c = this.axisOffset;
			h = this.plotTop - c[0] - 1;
			f = this.plotLeft - c[3] - 1;
			d = this.plotTop + this.plotHeight + c[2] + 1;
			c = this.plotLeft + this.plotWidth + c[1] + 1;
			var g = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
				r = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
			h = this.scrollablePixelsX ? [
				["M", 0, h],
				["L", this.plotLeft - 1, h],
				["L", this.plotLeft - 1, d],
				["L", 0, d],
				["Z"],
				["M", g, h],
				["L", this.chartWidth, h],
				["L", this.chartWidth, d],
				["L", g, d],
				["Z"]
			] : this.scrollablePixelsY ? [
				["M", f, 0],
				["L", f, this.plotTop - 1],
				["L", c, this.plotTop - 1],
				["L", c, 0],
				["Z"],
				["M", f, r],
				["L", f, this.chartHeight],
				["L", c, this.chartHeight],
				["L", c, r],
				["Z"]
			] : [
				["M", 0, 0]
			];
			"adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({
				d: h
			})
		};
		x(g, "afterInit", function() {
			this.chart.scrollableDirty = !0
		});
		x(B, "show", function() {
			this.chart.scrollableDirty = !0
		});
		""
	});
	I(g, "Core/Axis/Stacking/StackItem.js", [g["Core/FormatUtilities.js"], g["Core/Series/SeriesRegistry.js"], g[
		"Core/Utilities.js"]], function(d, g, z) {
		var B = d.format,
			y = g.series,
			C = z.defined,
			A = z.destroyObjectProperties,
			x = z.isNumber,
			t = z.pick;
		d = function() {
			function d(h, l, d, g, f) {
				var c = h.chart.inverted;
				this.axis = h;
				this.isNegative = d;
				this.options = l = l || {};
				this.x = g;
				this.cumulative = this.total = null;
				this.points = {};
				this.hasValidPoints = !1;
				this.stack = f;
				this.rightCliff = this.leftCliff = 0;
				this.alignOptions = {
					align: l.align || (c ? d ? "left" : "right" : "center"),
					verticalAlign: l.verticalAlign || (c ? "middle" : d ? "bottom" : "top"),
					y: l.y,
					x: l.x
				};
				this.textAlign = l.textAlign || (c ? d ? "right" : "left" : "center")
			}
			d.prototype.destroy = function() {
				A(this, this.axis)
			};
			d.prototype.render = function(h) {
				var l = this.axis.chart,
					d = this.options,
					g = d.format;
				g = g ? B(g, this, l) : d.formatter.call(this);
				this.label ? this.label.attr({
					text: g,
					visibility: "hidden"
				}) : (this.label = l.renderer.label(g, null, null, d.shape, null, null, d
						.useHTML, !1, "stack-labels"), g = {
						r: d.borderRadius || 0,
						text: g,
						rotation: d.rotation,
						padding: t(d.padding, 5),
						visibility: "hidden"
					}, l.styledMode || (g.fill = d.backgroundColor, g.stroke = d.borderColor, g[
							"stroke-width"] = d.borderWidth,
						this.label.css(d.style)), this.label.attr(g), this.label.added || this
					.label.add(h));
				this.label.labelrank = l.plotSizeY
			};
			d.prototype.setOffset = function(h, l, d, g, f) {
				var c = this.axis,
					p = c.chart;
				g = c.translate(c.stacking.usePercentage ? 100 : g ? g : this.total, 0, 0, 0, 1);
				d = c.translate(d ? d : 0);
				h = t(f, p.xAxis[0].translate(this.x)) + h;
				c = C(g) && this.getStackBox(p, this, h, g, l, Math.abs(g - d), c);
				l = this.label;
				d = this.isNegative;
				var q = this.textAlign;
				l && c && (h = l.getBBox(), f = l.padding, g = "justify" === t(this.options
						.overflow, "justify"), q = "left" ===
					q ? p.inverted ? -f : f : "right" === q ? h.width : p.inverted &&
					"center" === q ? h.width / 2 : p.inverted ? d ? h.width + f : -f : h.width /
					2, d = p.inverted ? h.height / 2 : d ? -f : h.height, this.alignOptions.x =
					t(this.options.x, 0), this.alignOptions.y = t(this.options.y, 0), c.x -= q,
					c.y -= d, l.align(this.alignOptions, null, c), p.isInsidePlot(l.alignAttr
						.x + q - this.alignOptions.x, l.alignAttr.y + d - this.alignOptions.y) ?
					l.show() : (l.hide(), g = !1), g && y.prototype.justifyDataLabel.call(this
						.axis, l, this.alignOptions, l.alignAttr, h, c), l.attr({
						x: l.alignAttr.x,
						y: l.alignAttr.y
					}),
					t(!g && this.options.crop, !0) && ((p = x(l.x) && x(l.y) && p.isInsidePlot(l
						.x - f + l.width, l.y) && p.isInsidePlot(l.x + f, l.y)) || l.hide()))
			};
			d.prototype.getStackBox = function(h, l, d, g, f, c, r) {
				var p = l.axis.reversed,
					q = h.inverted,
					t = r.height + r.pos - (q ? h.plotLeft : h.plotTop);
				l = l.isNegative && !p || !l.isNegative && p;
				return {
					x: q ? l ? g - r.right : g - c + r.pos - h.plotLeft : d + h.xAxis[0].transB - h
						.plotLeft,
					y: q ? r.height - d - f : l ? t - g - c : t - g,
					width: q ? c : f,
					height: q ? f : c
				}
			};
			return d
		}();
		"";
		return d
	});
	I(g, "Core/Axis/Stacking/StackingAxis.js", [g["Core/Animation/AnimationUtilities.js"],
		g["Core/Axis/Axis.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Axis/Stacking/StackItem.js"], g[
			"Core/Utilities.js"]
	], function(d, g, z, B, y) {
		function C() {
			var a = this,
				b = a.inverted;
			a.yAxis.forEach(function(a) {
				a.stacking && a.stacking.stacks && a.hasVisibleSeries && (a.stacking.oldStacks = a
					.stacking.stacks)
			});
			a.series.forEach(function(e) {
				var k = e.xAxis && e.xAxis.options || {};
				!e.options.stacking || !0 !== e.visible && !1 !== a.options.chart
					.ignoreHiddenSeries || (e.stackKey = [e.type, m(e.options.stack, ""), b ? k
						.top : k.left, b ? k.height :
						k.width
					].join())
			})
		}

		function A() {
			var a = this.stacking;
			if (a) {
				var b = a.stacks;
				u(b, function(a, e) {
					H(a);
					b[e] = null
				});
				a && a.stackTotalGroup && a.stackTotalGroup.destroy()
			}
		}

		function x() {
			this.stacking || (this.stacking = new e(this))
		}

		function t(a, b, e, c) {
			!G(a) || a.x !== b || c && a.stackKey !== c ? a = {
				x: b,
				index: 0,
				key: c,
				stackKey: c
			} : a.index++;
			a.key = [e, b, a.index].join();
			return a
		}

		function r() {
			var a = this,
				b = a.stackKey,
				e = a.yAxis.stacking.stacks,
				c = a.processedXData,
				f = a[a.options.stacking + "Stacker"],
				m;
			f && [b, "-" + b].forEach(function(b) {
				for (var k =
						c.length, h, d; k--;) h = c[k], m = a.getStackIndicator(m, h, a.index, b), (
					d = (h = e[b] && e[b][h]) && h.points[m.key]) && f.call(a, d, h, k)
			})
		}

		function h(a, b, e) {
			b = b.total ? 100 / b.total : 0;
			a[0] = D(a[0] * b);
			a[1] = D(a[1] * b);
			this.stackedYData[e] = a[1]
		}

		function l() {
			var a = this.yAxis.stacking;
			this.options.centerInCategory && (this.is("column") || this.is("columnrange")) && !this.options
				.stacking && 1 < this.chart.series.length ? f.setStackedPoints.call(this, "group") : a && u(
					a.stacks,
					function(b, e) {
						"group" === e.slice(-5) && (u(b, function(a) {
								return a.destroy()
							}),
							delete a.stacks[e])
					})
		}

		function q(a) {
			var b = this.chart,
				e = a || this.options.stacking;
			if (e && (!0 === this.visible || !1 === b.options.chart.ignoreHiddenSeries)) {
				var c = this.processedXData,
					f = this.processedYData,
					h = [],
					d = f.length,
					l = this.options,
					n = l.threshold,
					g = m(l.startFromThreshold && n, 0);
				l = l.stack;
				a = a ? "" + this.type + ",".concat(e) : this.stackKey;
				var p = "-" + a,
					u = this.negStacks;
				b = "group" === e ? b.yAxis[0] : this.yAxis;
				var q = b.stacking.stacks,
					r = b.stacking.oldStacks,
					t, x;
				b.stacking.stacksTouched += 1;
				for (x = 0; x < d; x++) {
					var A = c[x];
					var H =
						f[x];
					var C = this.getStackIndicator(C, A, this.index);
					var z = C.key;
					var y = (t = u && H < (g ? 0 : n)) ? p : a;
					q[y] || (q[y] = {});
					q[y][A] || (r[y] && r[y][A] ? (q[y][A] = r[y][A], q[y][A].total = null) : q[y][A] =
						new B(b, b.options.stackLabels, !!t, A, l));
					y = q[y][A];
					null !== H ? (y.points[z] = y.points[this.index] = [m(y.cumulative, g)], G(y
						.cumulative) || (y.base = z), y.touched = b.stacking.stacksTouched, 0 < C
						.index && !1 === this.singleStacks && (y.points[z][0] = y.points[this.index +
							"," + A + ",0"][0])) : y.points[z] = y.points[this.index] = null;
					"percent" === e ? (t = t ? a : p, u &&
							q[t] && q[t][A] ? (t = q[t][A], y.total = t.total = Math.max(t.total, y.total) +
								Math.abs(H) || 0) : y.total = D(y.total + (Math.abs(H) || 0))) : "group" ===
						e ? (w(H) && (H = H[0]), null !== H && (y.total = (y.total || 0) + 1)) : y.total =
						D(y.total + (H || 0));
					y.cumulative = "group" === e ? (y.total || 1) - 1 : m(y.cumulative, g) + (H || 0);
					null !== H && (y.points[z].push(y.cumulative), h[x] = y.cumulative, y.hasValidPoints = !
						0)
				}
				"percent" === e && (b.stacking.usePercentage = !0);
				"group" !== e && (this.stackedYData = h);
				b.stacking.oldStacks = {}
			}
		}
		var p = d.getDeferredAnimation,
			f = z.series.prototype,
			c = y.addEvent,
			D = y.correctFloat,
			G = y.defined,
			H = y.destroyObjectProperties,
			K = y.fireEvent,
			w = y.isArray,
			n = y.isNumber,
			u = y.objectEach,
			m = y.pick,
			e = function() {
				function a(a) {
					this.oldStacks = {};
					this.stacks = {};
					this.stacksTouched = 0;
					this.axis = a
				}
				a.prototype.buildStacks = function() {
					var a = this.axis,
						b = a.series,
						e = a.options.reversedStacks,
						c = b.length,
						f;
					if (!a.isXAxis) {
						this.usePercentage = !1;
						for (f = c; f--;) {
							var m = b[e ? f : c - f - 1];
							m.setStackedPoints();
							m.setGroupedPoints()
						}
						for (f = 0; f < c; f++) b[f].modifyStacks();
						K(a, "afterBuildStacks")
					}
				};
				a.prototype.cleanStacks = function() {
					if (!this.axis.isXAxis) {
						if (this.oldStacks) var a = this.stacks = this.oldStacks;
						u(a, function(a) {
							u(a, function(a) {
								a.cumulative = a.total
							})
						})
					}
				};
				a.prototype.resetStacks = function() {
					var a = this,
						b = a.stacks;
					a.axis.isXAxis || u(b, function(b) {
						u(b, function(e, k) {
							n(e.touched) && e.touched < a.stacksTouched ? (e.destroy(),
								delete b[k]) : (e.total = null, e.cumulative = null)
						})
					})
				};
				a.prototype.renderStackTotals = function() {
					var a = this.axis,
						b = a.chart,
						e = b.renderer,
						c = this.stacks;
					a = p(b, a.options.stackLabels &&
						a.options.stackLabels.animation || !1);
					var f = this.stackTotalGroup = this.stackTotalGroup || e.g("stack-labels").attr({
						zIndex: 6,
						opacity: 0
					}).add();
					f.translate(b.plotLeft, b.plotTop);
					u(c, function(a) {
						u(a, function(a) {
							a.render(f)
						})
					});
					f.animate({
						opacity: 1
					}, a)
				};
				return a
			}(),
			b;
		(function(a) {
			var b = [];
			a.compose = function(a, e, k) {
				-1 === b.indexOf(a) && (b.push(a), c(a, "init", x), c(a, "destroy", A)); - 1 === b
					.indexOf(e) && (b.push(e), e.prototype.getStacks = C); - 1 === b.indexOf(k) && (
					b.push(k), a = k.prototype, a.getStackIndicator = t, a.modifyStacks =
					r, a.percentStacker = h, a.setGroupedPoints = l, a.setStackedPoints = q)
			}
		})(b || (b = {}));
		return b
	});
	I(g, "Series/Line/LineSeries.js", [g["Core/Series/Series.js"], g["Core/Series/SeriesRegistry.js"], g[
		"Core/Utilities.js"]], function(d, g, z) {
		var B = this && this.__extends || function() {
				var d = function(g, t) {
					d = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function(d, h) {
						d.__proto__ = h
					} || function(d, h) {
						for (var l in h) h.hasOwnProperty(l) && (d[l] = h[l])
					};
					return d(g, t)
				};
				return function(g, t) {
					function r() {
						this.constructor = g
					}
					d(g, t);
					g.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
				}
			}(),
			y = z.defined,
			C = z.merge;
		z = function(g) {
			function x() {
				var d = null !== g && g.apply(this, arguments) || this;
				d.data = void 0;
				d.options = void 0;
				d.points = void 0;
				return d
			}
			B(x, g);
			x.prototype.drawGraph = function() {
				var d = this,
					g = this.options,
					h = (this.gappedPath || this.getGraphPath).call(this),
					l = this.chart.styledMode,
					q = [
						["graph", "highcharts-graph"]
					];
				l || q[0].push(g.lineColor || this.color || "#cccccc", g.dashStyle);
				q = d.getZonesGraphs(q);
				q.forEach(function(p,
					f) {
					var c = p[0],
						q = d[c],
						r = q ? "animate" : "attr";
					q ? (q.endX = d.preventGraphAnimation ? null : h.xMap, q.animate({
						d: h
					})) : h.length && (d[c] = q = d.chart.renderer.path(h).addClass(p[
						1]).attr({
						zIndex: 1
					}).add(d.group));
					q && !l && (c = {
							stroke: p[2],
							"stroke-width": g.lineWidth || 0,
							fill: d.fillGraph && d.color || "none"
						}, p[3] ? c.dashstyle = p[3] : "square" !== g.linecap && (c[
							"stroke-linecap"] = c["stroke-linejoin"] = "round"), q[r](c)
						.shadow(2 > f && g.shadow));
					q && (q.startX = h.xMap, q.isArea = h.isArea)
				})
			};
			x.prototype.getGraphPath = function(d, g, h) {
				var l = this,
					q = l.options,
					p = [],
					f = [],
					c, r = q.step;
				d = d || l.points;
				var t = d.reversed;
				t && d.reverse();
				(r = {
					right: 1,
					center: 2
				} [r] || r && 3) && t && (r = 4 - r);
				d = this.getValidPoints(d, !1, !(q.connectNulls && !g && !h));
				d.forEach(function(t, D) {
					var w = t.plotX,
						n = t.plotY,
						u = d[D - 1];
					(t.leftCliff || u && u.rightCliff) && !h && (c = !0);
					t.isNull && !y(g) && 0 < D ? c = !q.connectNulls : t.isNull && !g ?
						c = !0 : (0 === D || c ? D = [
								["M", t.plotX, t.plotY]
							] : l.getPointSpline ? D = [l.getPointSpline(d, t, D)] : r ? (
								D = 1 === r ? [
									["L", u.plotX, n]
								] : 2 === r ? [
									["L", (u.plotX + w) / 2, u.plotY],
									["L", (u.plotX + w) / 2, n]
								] : [
									["L", w, u.plotY]
								], D.push(["L", w, n])) : D = [
								["L", w, n]
							], f.push(t.x), r && (f.push(t.x), 2 === r && f.push(t.x)), p
							.push.apply(p, D), c = !1)
				});
				p.xMap = f;
				return l.graphPath = p
			};
			x.prototype.getZonesGraphs = function(d) {
				this.zones.forEach(function(g, h) {
					h = ["zone-graph-" + h, "highcharts-graph highcharts-zone-graph-" + h +
						" " + (g.className || "")
					];
					this.chart.styledMode || h.push(g.color || this.color, g.dashStyle ||
						this.options.dashStyle);
					d.push(h)
				}, this);
				return d
			};
			x.defaultOptions = C(d.defaultOptions, {});
			return x
		}(d);
		g.registerSeriesType("line",
			z);
		"";
		return z
	});
	I(g, "Series/Area/AreaSeries.js", [g["Core/Color/Color.js"], g["Core/Legend/LegendSymbol.js"], g[
		"Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function(d, g, z, B) {
		var y = this && this.__extends || function() {
				var d = function(h, g) {
					d = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function(d, f) {
						d.__proto__ = f
					} || function(d, f) {
						for (var c in f) f.hasOwnProperty(c) && (d[c] = f[c])
					};
					return d(h, g)
				};
				return function(h, g) {
					function l() {
						this.constructor = h
					}
					d(h, g);
					h.prototype = null === g ? Object.create(g) :
						(l.prototype = g.prototype, new l)
				}
			}(),
			C = d.parse,
			A = z.seriesTypes.line;
		d = B.extend;
		var x = B.merge,
			t = B.objectEach,
			r = B.pick;
		B = function(d) {
			function h() {
				var h = null !== d && d.apply(this, arguments) || this;
				h.data = void 0;
				h.options = void 0;
				h.points = void 0;
				return h
			}
			y(h, d);
			h.prototype.drawGraph = function() {
				this.areaPath = [];
				d.prototype.drawGraph.apply(this);
				var h = this,
					l = this.areaPath,
					f = this.options,
					c = [
						["area", "highcharts-area", this.color, f.fillColor]
					];
				this.zones.forEach(function(d, l) {
					c.push(["zone-area-" + l, "highcharts-area highcharts-zone-area-" +
						l + " " + d.className, d.color || h.color, d.fillColor || f
						.fillColor
					])
				});
				c.forEach(function(c) {
					var d = c[0],
						g = {},
						p = h[d],
						q = p ? "animate" : "attr";
					p ? (p.endX = h.preventGraphAnimation ? null : l.xMap, p.animate({
						d: l
					})) : (g.zIndex = 0, p = h[d] = h.chart.renderer.path(l).addClass(c[
						1]).add(h.group), p.isArea = !0);
					h.chart.styledMode || (g.fill = r(c[3], C(c[2]).setOpacity(r(f
						.fillOpacity, .75)).get()));
					p[q](g);
					p.startX = l.xMap;
					p.shiftUnit = f.step ? 2 : 1
				})
			};
			h.prototype.getGraphPath = function(d) {
				var h = A.prototype.getGraphPath,
					f = this.options,
					c = f.stacking,
					l = this.yAxis,
					g = [],
					q = [],
					t = this.index,
					w = l.stacking.stacks[this.stackKey],
					n = f.threshold,
					u = Math.round(l.getThreshold(f.threshold));
				f = r(f.connectNulls, "percent" === c);
				var m = function(a, b, e) {
					var f = d[a];
					a = c && w[f.x].points[t];
					var m = f[e + "Null"] || 0;
					e = f[e + "Cliff"] || 0;
					f = !0;
					if (e || m) {
						var h = (m ? a[0] : a[1]) + e;
						var v = a[0] + e;
						f = !!m
					} else !c && d[b] && d[b].isNull && (h = v = n);
					"undefined" !== typeof h && (q.push({
						plotX: k,
						plotY: null === h ? u : l.getThreshold(h),
						isNull: f,
						isCliff: !0
					}), g.push({
						plotX: k,
						plotY: null === v ? u : l.getThreshold(v),
						doCurve: !1
					}))
				};
				d = d || this.points;
				c && (d = this.getStackPoints(d));
				for (var e = 0, b = d.length; e < b; ++e) {
					c || (d[e].leftCliff = d[e].rightCliff = d[e].leftNull = d[e].rightNull =
						void 0);
					var a = d[e].isNull;
					var k = r(d[e].rectPlotX, d[e].plotX);
					var v = c ? r(d[e].yBottom, u) : u;
					if (!a || f) f || m(e, e - 1, "left"), a && !c && f || (q.push(d[e]), g.push({
						x: e,
						plotX: k,
						plotY: v
					})), f || m(e, e + 1, "right")
				}
				m = h.call(this, q, !0, !0);
				g.reversed = !0;
				a = h.call(this, g, !0, !0);
				(v = a[0]) && "M" === v[0] && (a[0] = ["L", v[1], v[2]]);
				a = m.concat(a);
				a.length && a.push(["Z"]);
				h = h.call(this, q, !1, f);
				a.xMap =
					m.xMap;
				this.areaPath = a;
				return h
			};
			h.prototype.getStackPoints = function(d) {
				var h = this,
					f = [],
					c = [],
					l = this.xAxis,
					g = this.yAxis,
					q = g.stacking.stacks[this.stackKey],
					x = {},
					w = g.series,
					n = w.length,
					u = g.options.reversedStacks ? 1 : -1,
					m = w.indexOf(h);
				d = d || this.points;
				if (this.options.stacking) {
					for (var e = 0; e < d.length; e++) d[e].leftNull = d[e].rightNull = void 0, x[d[
						e].x] = d[e];
					t(q, function(a, b) {
						null !== a.total && c.push(b)
					});
					c.sort(function(a, b) {
						return a - b
					});
					var b = w.map(function(a) {
						return a.visible
					});
					c.forEach(function(a, e) {
						var k =
							0,
							d, p;
						if (x[a] && !x[a].isNull) f.push(x[a]), [-1, 1].forEach(function(
						k) {
							var f = 1 === k ? "rightNull" : "leftNull",
								l = q[c[e + k]],
								g = 0;
							if (l)
								for (var v = m; 0 <= v && v < n;) {
									var r = w[v].index;
									d = l.points[r];
									d || (r === h.index ? x[a][f] = !0 : b[v] && (
										p = q[a].points[r]) && (g -= p[1] -
										p[0]));
									v += u
								}
							x[a][1 === k ? "rightCliff" : "leftCliff"] = g
						});
						else {
							for (var t = m; 0 <= t && t < n;) {
								if (d = q[a].points[w[t].index]) {
									k = d[1];
									break
								}
								t += u
							}
							k = r(k, 0);
							k = g.translate(k, 0, 1, 0, 1);
							f.push({
								isNull: !0,
								plotX: l.translate(a, 0, 0, 0, 1),
								x: a,
								plotY: k,
								yBottom: k
							})
						}
					})
				}
				return f
			};
			h.defaultOptions =
				x(A.defaultOptions, {
					threshold: 0
				});
			return h
		}(A);
		d(B.prototype, {
			singleStacks: !1,
			drawLegendSymbol: g.drawRectangle
		});
		z.registerSeriesType("area", B);
		"";
		return B
	});
	I(g, "Series/Spline/SplineSeries.js", [g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function(d,
		g) {
		var z = this && this.__extends || function() {
				var d = function(g, t) {
					d = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function(d, h) {
						d.__proto__ = h
					} || function(d, h) {
						for (var l in h) h.hasOwnProperty(l) && (d[l] = h[l])
					};
					return d(g, t)
				};
				return function(g,
					t) {
					function r() {
						this.constructor = g
					}
					d(g, t);
					g.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
				}
			}(),
			B = d.seriesTypes.line,
			y = g.merge,
			C = g.pick;
		g = function(d) {
			function g() {
				var g = null !== d && d.apply(this, arguments) || this;
				g.data = void 0;
				g.options = void 0;
				g.points = void 0;
				return g
			}
			z(g, d);
			g.prototype.getPointSpline = function(d, g, h) {
				var l = g.plotX || 0,
					q = g.plotY || 0,
					p = d[h - 1];
				h = d[h + 1];
				if (p && !p.isNull && !1 !== p.doCurve && !g.isCliff && h && !h.isNull && !1 !== h
					.doCurve && !g.isCliff) {
					d = p.plotY || 0;
					var f = h.plotX || 0;
					h =
						h.plotY || 0;
					var c = 0;
					var r = (1.5 * l + (p.plotX || 0)) / 2.5;
					var t = (1.5 * q + d) / 2.5;
					f = (1.5 * l + f) / 2.5;
					var x = (1.5 * q + h) / 2.5;
					f !== r && (c = (x - t) * (f - l) / (f - r) + q - x);
					t += c;
					x += c;
					t > d && t > q ? (t = Math.max(d, q), x = 2 * q - t) : t < d && t < q && (t =
						Math.min(d, q), x = 2 * q - t);
					x > h && x > q ? (x = Math.max(h, q), t = 2 * q - x) : x < h && x < q && (x =
						Math.min(h, q), t = 2 * q - x);
					g.rightContX = f;
					g.rightContY = x
				}
				g = ["C", C(p.rightContX, p.plotX, 0), C(p.rightContY, p.plotY, 0), C(r, l, 0), C(t,
					q, 0), l, q];
				p.rightContX = p.rightContY = void 0;
				return g
			};
			g.defaultOptions = y(B.defaultOptions);
			return g
		}(B);
		d.registerSeriesType("spline",
			g);
		"";
		return g
	});
	I(g, "Series/AreaSpline/AreaSplineSeries.js", [g["Series/Spline/SplineSeries.js"], g[
			"Core/Legend/LegendSymbol.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]],
		function(d, g, z, B) {
			var y = this && this.__extends || function() {
					var d = function(h, l) {
						d = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function(d, h) {
							d.__proto__ = h
						} || function(d, h) {
							for (var f in h) h.hasOwnProperty(f) && (d[f] = h[f])
						};
						return d(h, l)
					};
					return function(h, l) {
						function g() {
							this.constructor = h
						}
						d(h, l);
						h.prototype =
							null === l ? Object.create(l) : (g.prototype = l.prototype, new g)
					}
				}(),
				C = z.seriesTypes,
				A = C.area;
			C = C.area.prototype;
			var x = B.extend,
				t = B.merge;
			B = function(g) {
				function h() {
					var d = null !== g && g.apply(this, arguments) || this;
					d.data = void 0;
					d.points = void 0;
					d.options = void 0;
					return d
				}
				y(h, g);
				h.defaultOptions = t(d.defaultOptions, A.defaultOptions);
				return h
			}(d);
			x(B.prototype, {
				getGraphPath: C.getGraphPath,
				getStackPoints: C.getStackPoints,
				drawGraph: C.drawGraph,
				drawLegendSymbol: g.drawRectangle
			});
			z.registerSeriesType("areaspline", B);
			"";
			return B
		});
	I(g, "Series/Column/ColumnSeriesDefaults.js", [], function() {
		"";
		return {
			borderRadius: 0,
			centerInCategory: !1,
			groupPadding: .2,
			marker: null,
			pointPadding: .1,
			minPointLength: 0,
			cropThreshold: 50,
			pointRange: null,
			states: {
				hover: {
					halo: !1,
					brightness: .1
				},
				select: {
					color: "#cccccc",
					borderColor: "#000000"
				}
			},
			dataLabels: {
				align: void 0,
				verticalAlign: void 0,
				y: void 0
			},
			startFromThreshold: !0,
			stickyTracking: !1,
			tooltip: {
				distance: 6
			},
			threshold: 0,
			borderColor: "#ffffff"
		}
	});
	I(g, "Series/Column/ColumnSeries.js", [g["Core/Animation/AnimationUtilities.js"],
		g["Core/Color/Color.js"], g["Series/Column/ColumnSeriesDefaults.js"], g["Core/Globals.js"], g[
			"Core/Legend/LegendSymbol.js"], g["Core/Series/Series.js"], g["Core/Series/SeriesRegistry.js"],
		g["Core/Utilities.js"]
	], function(d, g, z, B, y, C, A, x) {
		var t = this && this.__extends || function() {
				var c = function(f, m) {
					c = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function(e, b) {
						e.__proto__ = b
					} || function(e, b) {
						for (var a in b) b.hasOwnProperty(a) && (e[a] = b[a])
					};
					return c(f, m)
				};
				return function(f, m) {
					function e() {
						this.constructor =
							f
					}
					c(f, m);
					f.prototype = null === m ? Object.create(m) : (e.prototype = m.prototype, new e)
				}
			}(),
			r = d.animObject,
			h = g.parse,
			l = B.hasTouch;
		d = B.noop;
		var q = x.clamp,
			p = x.defined,
			f = x.extend,
			c = x.fireEvent,
			D = x.isArray,
			G = x.isNumber,
			H = x.merge,
			K = x.pick,
			w = x.objectEach;
		x = function(d) {
			function n() {
				var c = null !== d && d.apply(this, arguments) || this;
				c.borderWidth = void 0;
				c.data = void 0;
				c.group = void 0;
				c.options = void 0;
				c.points = void 0;
				return c
			}
			t(n, d);
			n.prototype.animate = function(c) {
				var e = this,
					b = this.yAxis,
					a = e.options,
					k = this.chart.inverted,
					m = {},
					d = k ? "translateX" : "translateY";
				if (c) m.scaleY = .001, c = q(b.toPixels(a.threshold), b.pos, b.pos + b.len), k ? m
					.translateX = c - b.len : m.translateY = c, e.clipBox && e.setClip(), e.group
					.attr(m);
				else {
					var h = Number(e.group.attr(d));
					e.group.animate({
						scaleY: 1
					}, f(r(e.options.animation), {
						step: function(a, k) {
							e.group && (m[d] = h + k.pos * (b.pos - h), e.group
								.attr(m))
						}
					}))
				}
			};
			n.prototype.init = function(c, e) {
				d.prototype.init.apply(this, arguments);
				var b = this;
				c = b.chart;
				c.hasRendered && c.series.forEach(function(a) {
					a.type === b.type && (a.isDirty = !0)
				})
			};
			n.prototype.getColumnMetrics = function() {
				var c = this,
					e = c.options,
					b = c.xAxis,
					a = c.yAxis,
					k = b.options.reversedStacks;
				k = b.reversed && !k || !b.reversed && k;
				var f = {},
					d, h = 0;
				!1 === e.grouping ? h = 1 : c.chart.series.forEach(function(b) {
					var e = b.yAxis,
						k = b.options;
					if (b.type === c.type && (b.visible || !c.chart.options.chart
							.ignoreHiddenSeries) && a.len === e.len && a.pos === e.pos) {
						if (k.stacking && "group" !== k.stacking) {
							d = b.stackKey;
							"undefined" === typeof f[d] && (f[d] = h++);
							var m = f[d]
						} else !1 !== k.grouping && (m = h++);
						b.columnIndex = m
					}
				});
				var l =
					Math.min(Math.abs(b.transA) * (b.ordinal && b.ordinal.slope || e.pointRange || b
						.closestPointRange || b.tickInterval || 1), b.len),
					n = l * e.groupPadding,
					g = (l - 2 * n) / (h || 1);
				e = Math.min(e.maxPointWidth || b.len, K(e.pointWidth, g * (1 - 2 * e
					.pointPadding)));
				c.columnMetrics = {
					width: e,
					offset: (g - e) / 2 + (n + ((c.columnIndex || 0) + (k ? 1 : 0)) * g - l /
						2) * (k ? -1 : 1),
					paddedWidth: g,
					columnCount: h
				};
				return c.columnMetrics
			};
			n.prototype.crispCol = function(c, e, b, a) {
				var k = this.chart,
					f = this.borderWidth,
					m = -(f % 2 ? .5 : 0);
				f = f % 2 ? .5 : 1;
				k.inverted && k.renderer.isVML && (f +=
					1);
				this.options.crisp && (b = Math.round(c + b) + m, c = Math.round(c) + m, b -= c);
				a = Math.round(e + a) + f;
				m = .5 >= Math.abs(e) && .5 < a;
				e = Math.round(e) + f;
				a -= e;
				m && a && (--e, a += 1);
				return {
					x: c,
					y: e,
					width: b,
					height: a
				}
			};
			n.prototype.adjustForMissingColumns = function(c, e, b, a) {
				var k = this,
					f = this.options.stacking;
				if (!b.isNull && 1 < a.columnCount) {
					var m = this.yAxis.options.reversedStacks,
						d = 0,
						h = m ? 0 : -a.columnCount;
					w(this.yAxis.stacking && this.yAxis.stacking.stacks, function(a) {
						if ("number" === typeof b.x) {
							var e = a[b.x.toString()];
							e && (a = e.points[k.index],
								f ? (a && (d = h), e.hasValidPoints && (m ? h++ :
								h--)) : D(a) && (a = Object.keys(e.points).filter(
									function(a) {
										return !a.match(",") && e.points[a] && 1 < e
											.points[a].length
									}).map(parseFloat).sort(function(a, b) {
									return b - a
								}), d = a.indexOf(k.index), h = a.length))
						}
					});
					c = (b.plotX || 0) + ((h - 1) * a.paddedWidth + e) / 2 - e - d * a.paddedWidth
				}
				return c
			};
			n.prototype.translate = function() {
				var c = this,
					e = c.chart,
					b = c.options,
					a = c.dense = 2 > c.closestPointRange * c.xAxis.transA;
				a = c.borderWidth = K(b.borderWidth, a ? 0 : 1);
				var k = c.xAxis,
					f = c.yAxis,
					d = b.threshold,
					h = c.translatedThreshold =
					f.getThreshold(d),
					l = K(b.minPointLength, 5),
					n = c.getColumnMetrics(),
					g = n.width,
					u = c.pointXOffset = n.offset,
					w = c.dataMin,
					r = c.dataMax,
					t = c.barW = Math.max(g, 1 + 2 * a);
				e.inverted && (h -= .5);
				b.pointPadding && (t = Math.ceil(t));
				C.prototype.translate.apply(c);
				c.points.forEach(function(a) {
					var m = K(a.yBottom, h),
						v = 999 + Math.abs(m),
						E = a.plotX || 0;
					v = q(a.plotY, -v, f.len + v);
					var F = Math.min(v, m),
						D = Math.max(v, m) - F,
						J = g,
						x = E + u,
						L = t;
					l && Math.abs(D) < l && (D = l, E = !f.reversed && !a.negative || f
						.reversed && a.negative, G(d) && G(r) && a.y === d && r <= d &&
						(f.min ||
							0) < d && (w !== r || (f.max || 0) <= d) && (E = !E), F =
						Math.abs(F - h) > l ? m - l : h - (E ? l : 0));
					p(a.options.pointWidth) && (J = L = Math.ceil(a.options.pointWidth),
						x -= Math.round((J - g) / 2));
					b.centerInCategory && (x = c.adjustForMissingColumns(x, J, a, n));
					a.barX = x;
					a.pointWidth = J;
					a.tooltipPos = e.inverted ? [q(f.len + f.pos - e.plotLeft - v, f.pos - e
							.plotLeft, f.len + f.pos - e.plotLeft), k.len + k.pos - e
						.plotTop - x - L / 2, D
					] : [k.left - e.plotLeft + x + L / 2, q(v + f.pos - e.plotTop, f
						.pos - e.plotTop, f.len + f.pos - e.plotTop), D];
					a.shapeType = c.pointClass.prototype.shapeType || "rect";
					a.shapeArgs = c.crispCol.apply(c, a.isNull ? [x, h, L, 0] : [x, F, L,
						D])
				})
			};
			n.prototype.drawGraph = function() {
				this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
			};
			n.prototype.pointAttribs = function(c, e) {
				var b = this.options,
					a = this.pointAttrToOptions || {},
					k = a.stroke || "borderColor",
					f = a["stroke-width"] || "borderWidth",
					d = c && c.color || this.color,
					m = c && c[k] || b[k] || d;
				a = c && c.options.dashStyle || b.dashStyle;
				var l = c && c[f] || b[f] || this[f] || 0,
					n = K(c && c.opacity, b.opacity, 1);
				if (c && this.zones.length) {
					var g = c.getZone();
					d = c.options.color || g && (g.color || c.nonZonedColor) || this.color;
					g && (m = g.borderColor || m, a = g.dashStyle || a, l = g.borderWidth || l)
				}
				e && c && (c = H(b.states[e], c.options.states && c.options.states[e] || {}), e = c
					.brightness, d = c.color || "undefined" !== typeof e && h(d).brighten(c
						.brightness).get() || d, m = c[k] || m, l = c[f] || l, a = c
					.dashStyle || a, n = K(c.opacity, n));
				k = {
					fill: d,
					stroke: m,
					"stroke-width": l,
					opacity: n
				};
				a && (k.dashstyle = a);
				return k
			};
			n.prototype.drawPoints = function(c) {
				void 0 === c && (c = this.points);
				var e = this,
					b = this.chart,
					a = e.options,
					k = b.renderer,
					f = a.animationLimit || 250,
					d;
				c.forEach(function(c) {
					var m = c.graphic,
						h = !!m,
						l = m && b.pointCount < f ? "animate" : "attr";
					if (G(c.plotY) && null !== c.y) {
						d = c.shapeArgs;
						m && c.hasNewShapeType() && (m = m.destroy());
						e.enabledDataSorting && (c.startXPos = e.xAxis.reversed ? -(d ? d
							.width || 0 : 0) : e.xAxis.width);
						m || (c.graphic = m = k[c.shapeType](d).add(c.group || e.group)) &&
							e.enabledDataSorting && b.hasRendered && b.pointCount < f && (m
								.attr({
									x: c.startXPos
								}), h = !0, l = "animate");
						if (m && h) m[l](H(d));
						if (a.borderRadius) m[l]({
							r: a.borderRadius
						});
						b.styledMode || m[l](e.pointAttribs(c, c.selected && "select"))
							.shadow(!1 !== c.allowShadow && a.shadow, null, a.stacking && !a
								.borderRadius);
						m && (m.addClass(c.getClassName(), !0), m.attr({
							visibility: c.visible ? "inherit" : "hidden"
						}))
					} else m && (c.graphic = m.destroy())
				})
			};
			n.prototype.drawTracker = function(f) {
				void 0 === f && (f = this.points);
				var e = this,
					b = e.chart,
					a = b.pointer,
					k = function(b) {
						var e = a.getPointFromEvent(b);
						"undefined" !== typeof e && (a.isDirectTouch = !0, e.onMouseOver(b))
					},
					d;
				f.forEach(function(a) {
					d = D(a.dataLabels) ? a.dataLabels :
						a.dataLabel ? [a.dataLabel] : [];
					a.graphic && (a.graphic.element.point = a);
					d.forEach(function(b) {
						b.div ? b.div.point = a : b.element.point = a
					})
				});
				e._hasTracking || (e.trackerGroups.forEach(function(c) {
					if (e[c]) {
						e[c].addClass("highcharts-tracker").on("mouseover", k).on(
							"mouseout",
							function(b) {
								a.onTrackerMouseOut(b)
							});
						if (l) e[c].on("touchstart", k);
						!b.styledMode && e.options.cursor && e[c].css({
							cursor: e.options.cursor
						})
					}
				}), e._hasTracking = !0);
				c(this, "afterDrawTracker")
			};
			n.prototype.remove = function() {
				var c = this,
					e = c.chart;
				e.hasRendered &&
					e.series.forEach(function(b) {
						b.type === c.type && (b.isDirty = !0)
					});
				C.prototype.remove.apply(c, arguments)
			};
			n.defaultOptions = H(C.defaultOptions, z);
			return n
		}(C);
		f(x.prototype, {
			cropShoulder: 0,
			directTouch: !0,
			drawLegendSymbol: y.drawRectangle,
			getSymbol: d,
			negStacks: !0,
			trackerGroups: ["group", "dataLabelsGroup"]
		});
		A.registerSeriesType("column", x);
		"";
		return x
	});
	I(g, "Core/Series/DataLabel.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/FormatUtilities.js"], g[
		"Core/Utilities.js"]], function(d, g, z) {
		var B = d.getDeferredAnimation,
			y = g.format,
			C = z.defined,
			A = z.extend,
			x = z.fireEvent,
			t = z.isArray,
			r = z.isString,
			h = z.merge,
			l = z.objectEach,
			q = z.pick,
			p = z.splat,
			f;
		(function(c) {
			function f(c, e, b, a, k) {
				var f = this,
					d = this.chart,
					m = this.isCartesian && d.inverted,
					h = this.enabledDataSorting,
					l = c.plotX,
					n = c.plotY,
					g = b.rotation,
					p = b.align,
					u = C(l) && C(n) && d.isInsidePlot(l, Math.round(n), {
						inverted: m,
						paneCoordinates: !0,
						series: f
					}),
					w = function(a) {
						h && f.xAxis && !r && f.setDataLabelStartPos(c, e, k, u, a)
					},
					r = "justify" === q(b.overflow, h ? "none" : "justify"),
					t = this.visible && !1 !== c.visible &&
					C(l) && (c.series.forceDL || h && !r || u || q(b.inside, !!this.options.stacking) &&
						a && d.isInsidePlot(l, m ? a.x + 1 : a.y + a.height - 1, {
							inverted: m,
							paneCoordinates: !0,
							series: f
						}));
				if (t && C(l) && C(n)) {
					g && e.attr({
						align: p
					});
					p = e.getBBox(!0);
					var D = [0, 0];
					var x = d.renderer.fontMetrics(d.styledMode ? void 0 : b.style.fontSize, e).b;
					a = A({
						x: m ? this.yAxis.len - n : l,
						y: Math.round(m ? this.xAxis.len - l : n),
						width: 0,
						height: 0
					}, a);
					A(b, {
						width: p.width,
						height: p.height
					});
					g ? (r = !1, D = d.renderer.rotCorr(x, g), x = {
						x: a.x + (b.x || 0) + a.width / 2 + D.x,
						y: a.y + (b.y || 0) + {
							top: 0,
							middle: .5,
							bottom: 1
						} [b.verticalAlign] * a.height
					}, D = [p.x - Number(e.attr("x")), p.y - Number(e.attr("y"))], w(x), e[k ?
						"attr" : "animate"](x)) : (w(a), e.align(b, void 0, a), x = e.alignAttr);
					r && 0 <= a.height ? this.justifyDataLabel(e, b, x, p, a, k) : q(b.crop, !0) && (a =
						x.x, w = x.y, a += D[0], w += D[1], t = d.isInsidePlot(a, w, {
							paneCoordinates: !0,
							series: f
						}) && d.isInsidePlot(a + p.width, w + p.height, {
							paneCoordinates: !0,
							series: f
						}));
					if (b.shape && !g) e[k ? "attr" : "animate"]({
						anchorX: m ? d.plotWidth - n : l,
						anchorY: m ? d.plotHeight - l : n
					})
				}
				k && h && (e.placed = !1);
				t ||
					h && !r ? e.show() : (e.hide(), e.placed = !1)
			}

			function d(c, e) {
				var b = e.filter;
				return b ? (e = b.operator, c = c[b.property], b = b.value, ">" === e && c > b ||
					"<" === e && c < b || ">=" === e && c >= b || "<=" === e && c <= b || "==" ===
					e && c == b || "===" === e && c === b ? !0 : !1) : !0
			}

			function g(c) {
				void 0 === c && (c = this.points);
				var e = this,
					b = e.chart,
					a = e.options,
					k = e.hasRendered || 0,
					f = b.renderer,
					m = b.options.chart,
					h = m.backgroundColor;
				m = m.plotBackgroundColor;
				var n = f.getContrast(r(m) && m || r(h) && h || "#000000"),
					g = a.dataLabels,
					u;
				h = g.animation;
				h = g.defer ? B(b, h, e) : {
					defer: 0,
					duration: 0
				};
				g = w(w(b.options.plotOptions && b.options.plotOptions.series && b.options.plotOptions
					.series.dataLabels, b.options.plotOptions && b.options.plotOptions[e
					.type] && b.options.plotOptions[e.type].dataLabels), g);
				x(this, "drawDataLabels");
				if (t(g) || g.enabled || e._hasPointLabels) {
					var D = e.plotGroup("dataLabelsGroup", "data-labels", k ? "inherit" : "hidden", g
						.zIndex || 6);
					D.attr({
						opacity: +k
					});
					!k && (k = e.dataLabelsGroup) && (e.visible && D.show(), k[a.animation ? "animate" :
						"attr"]({
						opacity: 1
					}, h));
					c.forEach(function(c) {
						u = p(w(g, c.dlOptions ||
							c.options && c.options.dataLabels));
						u.forEach(function(k, m) {
							var h = k.enabled && (!c.isNull || c.dataLabelOnNull) && d(
									c, k),
								g = c.connectors ? c.connectors[m] : c.connector,
								p = c.dataLabels ? c.dataLabels[m] : c.dataLabel,
								v = !p,
								u = q(k.distance, c.labelDistance);
							if (h) {
								var w = c.getLabelConfig();
								var r = q(k[c.formatPrefix + "Format"], k.format);
								w = C(r) ? y(r, w, b) : (k[c.formatPrefix +
									"Formatter"] || k.formatter).call(w, k);
								r = k.style;
								var t = k.rotation;
								b.styledMode || (r.color = q(k.color, r.color, e.color,
										"#000000"), "contrast" === r.color ? (c
										.contrastColor =
										f.getContrast(c.color || e.color), r
										.color = !C(u) && k.inside || 0 > u || a
										.stacking ? c.contrastColor : n) : delete c
									.contrastColor, a.cursor && (r.cursor = a
										.cursor));
								var E = {
									r: k.borderRadius || 0,
									rotation: t,
									padding: k.padding,
									zIndex: 1
								};
								b.styledMode || (E.fill = k.backgroundColor, E.stroke =
									k.borderColor, E["stroke-width"] = k.borderWidth
									);
								l(E, function(a, b) {
									"undefined" === typeof a && delete E[b]
								})
							}!p || h && C(w) && !!p.div === !!k.useHTML && (p
								.rotation && k.rotation || p.rotation === k.rotation
								) || (v = !0, c.dataLabel = p = c.dataLabel && c
								.dataLabel.destroy(),
								c.dataLabels && (1 === c.dataLabels.length ?
									delete c.dataLabels : delete c.dataLabels[m]),
								m || delete c.dataLabel, g && (c.connector = c
									.connector.destroy(), c.connectors && (1 === c
										.connectors.length ? delete c.connectors :
										delete c.connectors[m])));
							h && C(w) ? (p ? E.text = w : (c.dataLabels = c
									.dataLabels || [], p = c.dataLabels[m] = t ? f
									.text(w, 0, 0, k.useHTML).addClass(
										"highcharts-data-label") : f.label(w, 0, 0,
										k.shape, null, null, k.useHTML, null,
										"data-label"), m || (c.dataLabel = p), p
									.addClass(" highcharts-data-label-color-" + c
										.colorIndex + " " + (k.className ||
											"") + (k.useHTML ?
											" highcharts-tracker" : ""))), p
								.options = k, p.attr(E), b.styledMode || p.css(r)
								.shadow(k.shadow), (m = k[c.formatPrefix +
									"TextPath"] || k.textPath) && !k.useHTML && (p
									.setTextPath(c.getDataLabelPath && c
										.getDataLabelPath(p) || c.graphic, m), c
									.dataLabelPath && !m.enabled && (c
										.dataLabelPath = c.dataLabelPath.destroy())
									), p.added || p.add(D), e.alignDataLabel(c, p,
									k, null, v)) : p && p.hide()
						})
					})
				}
				x(this, "afterDrawDataLabels")
			}

			function z(c, e, b, a, k, f) {
				var d = this.chart,
					m = e.align,
					h = e.verticalAlign,
					l = c.box ? 0 : c.padding || 0,
					n = e.x;
				n = void 0 === n ? 0 : n;
				var g = e.y;
				g = void 0 === g ? 0 : g;
				var p = (b.x || 0) + l;
				if (0 > p) {
					"right" === m && 0 <= n ? (e.align = "left", e.inside = !0) : n -= p;
					var v = !0
				}
				p = (b.x || 0) + a.width - l;
				p > d.plotWidth && ("left" === m && 0 >= n ? (e.align = "right", e.inside = !0) : n += d
					.plotWidth - p, v = !0);
				p = b.y + l;
				0 > p && ("bottom" === h && 0 <= g ? (e.verticalAlign = "top", e.inside = !0) : g -= p,
					v = !0);
				p = (b.y || 0) + a.height - l;
				p > d.plotHeight && ("top" === h && 0 >= g ? (e.verticalAlign = "bottom", e.inside = !
					0) : g += d.plotHeight - p, v = !0);
				v && (e.x = n, e.y = g, c.placed = !f, c.align(e, void 0, k));
				return v
			}

			function w(c,
				e) {
				var b = [],
					a;
				if (t(c) && !t(e)) b = c.map(function(a) {
					return h(a, e)
				});
				else if (t(e) && !t(c)) b = e.map(function(a) {
					return h(c, a)
				});
				else if (t(c) || t(e))
					for (a = Math.max(c.length, e.length); a--;) b[a] = h(c[a], e[a]);
				else b = h(c, e);
				return b
			}

			function n(c, e, b, a, k) {
				var f = this.chart,
					d = f.inverted,
					m = this.xAxis,
					h = m.reversed,
					l = d ? e.height / 2 : e.width / 2;
				c = (c = c.pointWidth) ? c / 2 : 0;
				e.startXPos = d ? k.x : h ? -l - c : m.width - l + c;
				e.startYPos = d ? h ? this.yAxis.height - l + c : -l - c : k.y;
				a ? "hidden" === e.visibility && (e.show(), e.attr({
						opacity: 0
					}).animate({
						opacity: 1
					})) :
					e.attr({
						opacity: 1
					}).animate({
						opacity: 0
					}, void 0, e.hide);
				f.hasRendered && (b && e.attr({
					x: e.startXPos,
					y: e.startYPos
				}), e.placed = !0)
			}
			var u = [];
			c.compose = function(c) {
				if (-1 === u.indexOf(c)) {
					var e = c.prototype;
					u.push(c);
					e.alignDataLabel = f;
					e.drawDataLabels = g;
					e.justifyDataLabel = z;
					e.setDataLabelStartPos = n
				}
			}
		})(f || (f = {}));
		"";
		return f
	});
	I(g, "Series/Column/ColumnDataLabel.js", [g["Core/Series/DataLabel.js"], g["Core/Series/SeriesRegistry.js"], g[
		"Core/Utilities.js"]], function(d, g, z) {
		var B = g.series,
			y = z.merge,
			C = z.pick,
			A;
		(function(g) {
			function t(d,
				l, g, p, f) {
				var c = this.chart.inverted,
					h = d.series,
					q = (h.xAxis ? h.xAxis.len : this.chart.plotSizeX) || 0;
				h = (h.yAxis ? h.yAxis.len : this.chart.plotSizeY) || 0;
				var r = d.dlBox || d.shapeArgs,
					t = C(d.below, d.plotY > C(this.translatedThreshold, h)),
					w = C(g.inside, !!this.options.stacking);
				r && (p = y(r), 0 > p.y && (p.height += p.y, p.y = 0), r = p.y + p.height - h, 0 < r &&
					r < p.height && (p.height -= r), c && (p = {
						x: h - p.y - p.height,
						y: q - p.x - p.width,
						width: p.height,
						height: p.width
					}), w || (c ? (p.x += t ? 0 : p.width, p.width = 0) : (p.y += t ? p.height : 0,
						p.height = 0)));
				g.align = C(g.align,
					!c || w ? "center" : t ? "right" : "left");
				g.verticalAlign = C(g.verticalAlign, c || w ? "middle" : t ? "top" : "bottom");
				B.prototype.alignDataLabel.call(this, d, l, g, p, f);
				g.inside && d.contrastColor && l.css({
					color: d.contrastColor
				})
			}
			var r = [];
			g.compose = function(h) {
				d.compose(B); - 1 === r.indexOf(h) && (r.push(h), h.prototype.alignDataLabel = t)
			}
		})(A || (A = {}));
		return A
	});
	I(g, "Series/Bar/BarSeries.js", [g["Series/Column/ColumnSeries.js"], g["Core/Series/SeriesRegistry.js"], g[
		"Core/Utilities.js"]], function(d, g, z) {
		var B = this && this.__extends ||
			function() {
				var d = function(g, t) {
					d = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function(d, h) {
						d.__proto__ = h
					} || function(d, h) {
						for (var l in h) h.hasOwnProperty(l) && (d[l] = h[l])
					};
					return d(g, t)
				};
				return function(g, t) {
					function r() {
						this.constructor = g
					}
					d(g, t);
					g.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
				}
			}(),
			y = z.extend,
			C = z.merge;
		z = function(g) {
			function x() {
				var d = null !== g && g.apply(this, arguments) || this;
				d.data = void 0;
				d.options = void 0;
				d.points = void 0;
				return d
			}
			B(x, g);
			x.defaultOptions =
				C(d.defaultOptions, {});
			return x
		}(d);
		y(z.prototype, {
			inverted: !0
		});
		g.registerSeriesType("bar", z);
		"";
		return z
	});
	I(g, "Series/Scatter/ScatterSeriesDefaults.js", [], function() {
		"";
		return {
			lineWidth: 0,
			findNearestPointBy: "xy",
			jitter: {
				x: 0,
				y: 0
			},
			marker: {
				enabled: !0
			},
			tooltip: {
				headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
				pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
			}
		}
	});
	I(g, "Series/Scatter/ScatterSeries.js", [g["Series/Scatter/ScatterSeriesDefaults.js"],
		g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]
	], function(d, g, z) {
		var B = this && this.__extends || function() {
				var d = function(h, l) {
					d = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function(d, h) {
						d.__proto__ = h
					} || function(d, h) {
						for (var f in h) h.hasOwnProperty(f) && (d[f] = h[f])
					};
					return d(h, l)
				};
				return function(h, l) {
					function g() {
						this.constructor = h
					}
					d(h, l);
					h.prototype = null === l ? Object.create(l) : (g.prototype = l.prototype, new g)
				}
			}(),
			y = g.seriesTypes,
			C = y.column,
			A = y.line;
		y = z.addEvent;
		var x = z.extend,
			t = z.merge;
		z = function(g) {
			function h() {
				var d = null !== g && g.apply(this, arguments) || this;
				d.data = void 0;
				d.options = void 0;
				d.points = void 0;
				return d
			}
			B(h, g);
			h.prototype.applyJitter = function() {
				var d = this,
					h = this.options.jitter,
					g = this.points.length;
				h && this.points.forEach(function(f, c) {
					["x", "y"].forEach(function(l, p) {
						var q = "plot" + l.toUpperCase();
						if (h[l] && !f.isNull) {
							var r = d[l + "Axis"];
							var w = h[l] * r.transA;
							if (r && !r.isLog) {
								var n = Math.max(0, f[q] - w);
								r = Math.min(r.len, f[q] + w);
								p = 1E4 * Math.sin(c + p * g);
								f[q] = n + (r - n) * (p - Math.floor(p));
								"x" ===
								l && (f.clientX = f.plotX)
							}
						}
					})
				})
			};
			h.prototype.drawGraph = function() {
				this.options.lineWidth ? g.prototype.drawGraph.call(this) : this.graph && (this
					.graph = this.graph.destroy())
			};
			h.defaultOptions = t(A.defaultOptions, d);
			return h
		}(A);
		x(z.prototype, {
			drawTracker: C.prototype.drawTracker,
			sorted: !1,
			requireSorting: !1,
			noSharedTooltip: !0,
			trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
			takeOrdinalPosition: !1
		});
		y(z, "afterTranslate", function() {
			this.applyJitter()
		});
		g.registerSeriesType("scatter", z);
		return z
	});
	I(g, "Series/CenteredUtilities.js",
		[g["Core/Globals.js"], g["Core/Series/Series.js"], g["Core/Utilities.js"]],
		function(d, g, z) {
			var B = d.deg2rad,
				y = z.fireEvent,
				C = z.isNumber,
				A = z.pick,
				x = z.relativeLength,
				t;
			(function(d) {
				d.getCenter = function() {
					var d = this.options,
						l = this.chart,
						q = 2 * (d.slicedOffset || 0),
						p = l.plotWidth - 2 * q,
						f = l.plotHeight - 2 * q,
						c = d.center,
						r = Math.min(p, f),
						t = d.thickness,
						z = d.size,
						B = d.innerSize || 0;
					"string" === typeof z && (z = parseFloat(z));
					"string" === typeof B && (B = parseFloat(B));
					d = [A(c[0], "50%"), A(c[1], "50%"), A(z && 0 > z ? void 0 : d.size, "100%"), A(B &&
						0 > B ? void 0 : d.innerSize || 0, "0%")];
					!l.angular || this instanceof g || (d[3] = 0);
					for (c = 0; 4 > c; ++c) z = d[c], l = 2 > c || 2 === c && /%$/.test(z), d[c] = x(z,
						[p, f, r, d[2]][c]) + (l ? q : 0);
					d[3] > d[2] && (d[3] = d[2]);
					C(t) && 2 * t < d[2] && 0 < t && (d[3] = d[2] - 2 * t);
					y(this, "afterGetCenter", {
						positions: d
					});
					return d
				};
				d.getStartAndEndRadians = function(d, l) {
					d = C(d) ? d : 0;
					l = C(l) && l > d && 360 > l - d ? l : d + 360;
					return {
						start: B * (d + -90),
						end: B * (l + -90)
					}
				}
			})(t || (t = {}));
			"";
			return t
		});
	I(g, "Series/Pie/PiePoint.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/Series/Point.js"],
		g["Core/Utilities.js"]
	], function(d, g, z) {
		var B = this && this.__extends || function() {
				var d = function(h, g) {
					d = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function(d, f) {
						d.__proto__ = f
					} || function(d, f) {
						for (var c in f) f.hasOwnProperty(c) && (d[c] = f[c])
					};
					return d(h, g)
				};
				return function(h, g) {
					function l() {
						this.constructor = h
					}
					d(h, g);
					h.prototype = null === g ? Object.create(g) : (l.prototype = g.prototype, new l)
				}
			}(),
			y = d.setAnimation,
			C = z.addEvent,
			A = z.defined;
		d = z.extend;
		var x = z.isNumber,
			t = z.pick,
			r = z.relativeLength;
		g = function(d) {
			function h() {
				var h =
					null !== d && d.apply(this, arguments) || this;
				h.labelDistance = void 0;
				h.options = void 0;
				h.series = void 0;
				return h
			}
			B(h, d);
			h.prototype.getConnectorPath = function() {
				var d = this.labelPosition,
					h = this.series.options.dataLabels,
					f = this.connectorShapes,
					c = h.connectorShape;
				f[c] && (c = f[c]);
				return c.call(this, {
					x: d.final.x,
					y: d.final.y,
					alignment: d.alignment
				}, d.connectorPosition, h)
			};
			h.prototype.getTranslate = function() {
				return this.sliced ? this.slicedTranslation : {
					translateX: 0,
					translateY: 0
				}
			};
			h.prototype.haloPath = function(d) {
				var h =
					this.shapeArgs;
				return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(h
					.x, h.y, h.r + d, h.r + d, {
						innerR: h.r - 1,
						start: h.start,
						end: h.end
					})
			};
			h.prototype.init = function() {
				var h = this;
				d.prototype.init.apply(this, arguments);
				this.name = t(this.name, "Slice");
				var l = function(f) {
					h.slice("select" === f.type)
				};
				C(this, "select", l);
				C(this, "unselect", l);
				return this
			};
			h.prototype.isValid = function() {
				return x(this.y) && 0 <= this.y
			};
			h.prototype.setVisible = function(d, h) {
				var f = this,
					c = this.series,
					l = c.chart,
					g = c.options.ignoreHiddenPoint;
				h = t(h, g);
				d !== this.visible && (this.visible = this.options.visible = d = "undefined" ===
					typeof d ? !this.visible : d, c.options.data[c.data.indexOf(this)] = this
					.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(
						function(c) {
							if (f[c]) f[c][d ? "show" : "hide"](d)
						}), this.legendItem && l.legend.colorizeItem(this, d), d || "hover" !==
					this.state || this.setState(""), g && (c.isDirty = !0), h && l.redraw())
			};
			h.prototype.slice = function(d, h, f) {
				var c = this.series;
				y(f, c.chart);
				t(h, !0);
				this.sliced = this.options.sliced = A(d) ? d : !this.sliced;
				c.options.data[c.data.indexOf(this)] = this.options;
				this.graphic && this.graphic.animate(this.getTranslate());
				this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
			};
			return h
		}(g);
		d(g.prototype, {
			connectorShapes: {
				fixedOffset: function(d, l, g) {
					var h = l.breakAt;
					l = l.touchingSliceAt;
					return [
						["M", d.x, d.y], g.softConnector ? ["C", d.x + ("left" === d
								.alignment ? -5 : 5), d.y, 2 * h.x - l.x, 2 * h.y - l.y, h
							.x, h.y
						] : ["L", h.x, h.y],
						["L", l.x, l.y]
					]
				},
				straight: function(d, l) {
					l = l.touchingSliceAt;
					return [
						["M", d.x, d.y],
						["L", l.x, l.y]
					]
				},
				crookedLine: function(d,
					l, g) {
					l = l.touchingSliceAt;
					var h = this.series,
						f = h.center[0],
						c = h.chart.plotWidth,
						q = h.chart.plotLeft;
					h = d.alignment;
					var t = this.shapeArgs.r;
					g = r(g.crookDistance, 1);
					c = "left" === h ? f + t + (c + q - f - t) * (1 - g) : q + (f - t) * g;
					g = ["L", c, d.y];
					f = !0;
					if ("left" === h ? c > d.x || c < l.x : c < d.x || c > l.x) f = !1;
					d = [
						["M", d.x, d.y]
					];
					f && d.push(g);
					d.push(["L", l.x, l.y]);
					return d
				}
			}
		});
		return g
	});
	I(g, "Series/Pie/PieSeriesDefaults.js", [], function() {
		"";
		return {
			center: [null, null],
			clip: !1,
			colorByPoint: !0,
			dataLabels: {
				allowOverlap: !0,
				connectorPadding: 5,
				connectorShape: "fixedOffset",
				crookDistance: "70%",
				distance: 30,
				enabled: !0,
				formatter: function() {
					return this.point.isNull ? void 0 : this.point.name
				},
				softConnector: !0,
				x: 0
			},
			fillColor: void 0,
			ignoreHiddenPoint: !0,
			inactiveOtherPoints: !0,
			legendType: "point",
			marker: null,
			size: null,
			showInLegend: !1,
			slicedOffset: 10,
			stickyTracking: !1,
			tooltip: {
				followPointer: !0
			},
			borderColor: "#ffffff",
			borderWidth: 1,
			lineWidth: void 0,
			states: {
				hover: {
					brightness: .1
				}
			}
		}
	});
	I(g, "Series/Pie/PieSeries.js", [g["Series/CenteredUtilities.js"], g["Series/Column/ColumnSeries.js"], g[
			"Core/Globals.js"],
		g["Core/Legend/LegendSymbol.js"], g["Series/Pie/PiePoint.js"], g["Series/Pie/PieSeriesDefaults.js"],
		g["Core/Series/Series.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Renderer/SVG/Symbols.js"],
		g["Core/Utilities.js"]
	], function(d, g, z, B, y, C, A, x, t, r) {
		var h = this && this.__extends || function() {
				var c = function(f, d) {
					c = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function(c, f) {
						c.__proto__ = f
					} || function(c, f) {
						for (var d in f) f.hasOwnProperty(d) && (c[d] = f[d])
					};
					return c(f, d)
				};
				return function(f, d) {
					function h() {
						this.constructor =
							f
					}
					c(f, d);
					f.prototype = null === d ? Object.create(d) : (h.prototype = d.prototype, new h)
				}
			}(),
			l = d.getStartAndEndRadians;
		z = z.noop;
		var q = r.clamp,
			p = r.extend,
			f = r.fireEvent,
			c = r.merge,
			D = r.pick,
			G = r.relativeLength;
		r = function(d) {
			function g() {
				var c = null !== d && d.apply(this, arguments) || this;
				c.center = void 0;
				c.data = void 0;
				c.maxLabelDistance = void 0;
				c.options = void 0;
				c.points = void 0;
				return c
			}
			h(g, d);
			g.prototype.animate = function(c) {
				var f = this,
					d = f.points,
					m = f.startAngleRad;
				c || d.forEach(function(e) {
					var b = e.graphic,
						a = e.shapeArgs;
					b &&
						a && (b.attr({
							r: D(e.startR, f.center && f.center[3] / 2),
							start: m,
							end: m
						}), b.animate({
							r: a.r,
							start: a.start,
							end: a.end
						}, f.options.animation))
				})
			};
			g.prototype.drawEmpty = function() {
				var c = this.startAngleRad,
					f = this.endAngleRad,
					d = this.options;
				if (0 === this.total && this.center) {
					var m = this.center[0];
					var e = this.center[1];
					this.graph || (this.graph = this.chart.renderer.arc(m, e, this.center[1] / 2, 0,
						c, f).addClass("highcharts-empty-series").add(this.group));
					this.graph.attr({
						d: t.arc(m, e, this.center[2] / 2, 0, {
							start: c,
							end: f,
							innerR: this.center[3] /
								2
						})
					});
					this.chart.styledMode || this.graph.attr({
						"stroke-width": d.borderWidth,
						fill: d.fillColor || "none",
						stroke: d.color || "#cccccc"
					})
				} else this.graph && (this.graph = this.graph.destroy())
			};
			g.prototype.drawPoints = function() {
				var c = this.chart.renderer;
				this.points.forEach(function(f) {
					f.graphic && f.hasNewShapeType() && (f.graphic = f.graphic.destroy());
					f.graphic || (f.graphic = c[f.shapeType](f.shapeArgs).add(f.series
						.group), f.delayedRendering = !0)
				})
			};
			g.prototype.generatePoints = function() {
				d.prototype.generatePoints.call(this);
				this.updateTotals()
			};
			g.prototype.getX = function(c, f, d) {
				var m = this.center,
					e = this.radii ? this.radii[d.index] || 0 : m[2] / 2;
				c = Math.asin(q((c - m[1]) / (e + d.labelDistance), -1, 1));
				return m[0] + (f ? -1 : 1) * Math.cos(c) * (e + d.labelDistance) + (0 < d
					.labelDistance ? (f ? -1 : 1) * this.options.dataLabels.padding : 0)
			};
			g.prototype.hasData = function() {
				return !!this.processedXData.length
			};
			g.prototype.redrawPoints = function() {
				var f = this,
					d = f.chart,
					h = d.renderer,
					m = f.options.shadow,
					e, b, a, k;
				this.drawEmpty();
				!m || f.shadowGroup || d.styledMode || (f.shadowGroup =
					h.g("shadow").attr({
						zIndex: -1
					}).add(f.group));
				f.points.forEach(function(l) {
					var g = {};
					b = l.graphic;
					if (!l.isNull && b) {
						var n = void 0;
						k = l.shapeArgs;
						e = l.getTranslate();
						d.styledMode || (n = l.shadowGroup, m && !n && (n = l.shadowGroup =
								h.g("shadow").add(f.shadowGroup)), n && n.attr(e), a = f
							.pointAttribs(l, l.selected && "select"));
						l.delayedRendering ? (b.setRadialReference(f.center).attr(k).attr(
							e), d.styledMode || b.attr(a).attr({
								"stroke-linejoin": "round"
							}).shadow(m, n), l.delayedRendering = !1) : (b
							.setRadialReference(f.center), d.styledMode ||
							c(!0, g, a), c(!0, g, k, e), b.animate(g));
						b.attr({
							visibility: l.visible ? "inherit" : "hidden"
						});
						b.addClass(l.getClassName(), !0)
					} else b && (l.graphic = b.destroy())
				})
			};
			g.prototype.sortByAngle = function(c, f) {
				c.sort(function(c, d) {
					return "undefined" !== typeof c.angle && (d.angle - c.angle) * f
				})
			};
			g.prototype.translate = function(c) {
				f(this, "translate");
				this.generatePoints();
				var d = this.options,
					h = d.slicedOffset,
					m = h + (d.borderWidth || 0),
					e = l(d.startAngle, d.endAngle),
					b = this.startAngleRad = e.start;
				e = (this.endAngleRad = e.end) - b;
				var a = this.points,
					k = d.dataLabels.distance;
				d = d.ignoreHiddenPoint;
				var g = a.length,
					p, q = 0;
				c || (this.center = c = this.getCenter());
				for (p = 0; p < g; p++) {
					var w = a[p];
					var r = b + q * e;
					!w.isValid() || d && !w.visible || (q += w.percentage / 100);
					var t = b + q * e;
					var x = {
						x: c[0],
						y: c[1],
						r: c[2] / 2,
						innerR: c[3] / 2,
						start: Math.round(1E3 * r) / 1E3,
						end: Math.round(1E3 * t) / 1E3
					};
					w.shapeType = "arc";
					w.shapeArgs = x;
					w.labelDistance = D(w.options.dataLabels && w.options.dataLabels.distance, k);
					w.labelDistance = G(w.labelDistance, x.r);
					this.maxLabelDistance = Math.max(this.maxLabelDistance ||
						0, w.labelDistance);
					t = (t + r) / 2;
					t > 1.5 * Math.PI ? t -= 2 * Math.PI : t < -Math.PI / 2 && (t += 2 * Math.PI);
					w.slicedTranslation = {
						translateX: Math.round(Math.cos(t) * h),
						translateY: Math.round(Math.sin(t) * h)
					};
					x = Math.cos(t) * c[2] / 2;
					var E = Math.sin(t) * c[2] / 2;
					w.tooltipPos = [c[0] + .7 * x, c[1] + .7 * E];
					w.half = t < -Math.PI / 2 || t > Math.PI / 2 ? 1 : 0;
					w.angle = t;
					r = Math.min(m, w.labelDistance / 5);
					w.labelPosition = {
						natural: {
							x: c[0] + x + Math.cos(t) * w.labelDistance,
							y: c[1] + E + Math.sin(t) * w.labelDistance
						},
						"final": {},
						alignment: 0 > w.labelDistance ? "center" : w.half ? "right" : "left",
						connectorPosition: {
							breakAt: {
								x: c[0] + x + Math.cos(t) * r,
								y: c[1] + E + Math.sin(t) * r
							},
							touchingSliceAt: {
								x: c[0] + x,
								y: c[1] + E
							}
						}
					}
				}
				f(this, "afterTranslate")
			};
			g.prototype.updateTotals = function() {
				var c = this.points,
					f = c.length,
					d = this.options.ignoreHiddenPoint,
					h, e = 0;
				for (h = 0; h < f; h++) {
					var b = c[h];
					!b.isValid() || d && !b.visible || (e += b.y)
				}
				this.total = e;
				for (h = 0; h < f; h++) b = c[h], b.percentage = 0 < e && (b.visible || !d) ? b.y /
					e * 100 : 0, b.total = e
			};
			g.defaultOptions = c(A.defaultOptions, C);
			return g
		}(A);
		p(r.prototype, {
			axisTypes: [],
			directTouch: !0,
			drawGraph: void 0,
			drawLegendSymbol: B.drawRectangle,
			drawTracker: g.prototype.drawTracker,
			getCenter: d.getCenter,
			getSymbol: z,
			isCartesian: !1,
			noSharedTooltip: !0,
			pointAttribs: g.prototype.pointAttribs,
			pointClass: y,
			requireSorting: !1,
			searchPoint: z,
			trackerGroups: ["group", "dataLabelsGroup"]
		});
		x.registerSeriesType("pie", r);
		return r
	});
	I(g, "Series/Pie/PieDataLabel.js", [g["Core/Series/DataLabel.js"], g["Core/Globals.js"], g[
			"Core/Renderer/RendererUtilities.js"], g["Core/Series/SeriesRegistry.js"], g[
			"Core/Utilities.js"]],
		function(d, g, z, B, y) {
			var C = g.noop,
				A = z.distribute,
				x = B.series,
				t = y.arrayMax,
				r = y.clamp,
				h = y.defined,
				l = y.merge,
				q = y.pick,
				p = y.relativeLength,
				f;
			(function(c) {
				function f() {
					var c = this,
						f = c.data,
						d = c.chart,
						e = c.options.dataLabels || {},
						b = e.connectorPadding,
						a = d.plotWidth,
						k = d.plotHeight,
						g = d.plotLeft,
						p = Math.round(d.chartWidth / 3),
						w = c.center,
						r = w[2] / 2,
						D = w[1],
						G = [
							[],
							[]
						],
						y = [0, 0, 0, 0],
						E = c.dataLabelPositioners,
						N, z, C, B, H, M, K, I, W, V, Y, S;
					c.visible && (e.enabled || c._hasPointLabels) && (f.forEach(function(a) {
						a.dataLabel && a.visible && a.dataLabel.shortened &&
							(a.dataLabel.attr({
								width: "auto"
							}).css({
								width: "auto",
								textOverflow: "clip"
							}), a.dataLabel.shortened = !1)
					}), x.prototype.drawDataLabels.apply(c), f.forEach(function(a) {
						a.dataLabel && (a.visible ? (G[a.half].push(a), a.dataLabel._pos = null,
							!h(e.style.width) && !h(a.options.dataLabels && a.options
								.dataLabels.style && a.options.dataLabels.style.width
								) && a.dataLabel.getBBox().width > p && (a.dataLabel
								.css({
									width: Math.round(.7 * p) + "px"
								}), a.dataLabel.shortened = !0)) : (a.dataLabel = a
							.dataLabel.destroy(), a.dataLabels && 1 === a.dataLabels
							.length &&
							delete a.dataLabels))
					}), G.forEach(function(f, m) {
						var l = f.length,
							n = [],
							p;
						if (l) {
							c.sortByAngle(f, m - .5);
							if (0 < c.maxLabelDistance) {
								var v = Math.max(0, D - r - c.maxLabelDistance);
								var u = Math.min(D + r + c.maxLabelDistance, d.plotHeight);
								f.forEach(function(a) {
									0 < a.labelDistance && a.dataLabel && (a.top = Math
										.max(0, D - r - a.labelDistance), a.bottom =
										Math.min(D + r + a.labelDistance, d
											.plotHeight), p = a.dataLabel.getBBox()
										.height || 21, a.distributeBox = {
											target: a.labelPosition.natural.y - a
												.top + p / 2,
											size: p,
											rank: a.y
										}, n.push(a.distributeBox))
								});
								v =
									u + p - v;
								A(n, v, v / 5)
							}
							for (Y = 0; Y < l; Y++) {
								N = f[Y];
								M = N.labelPosition;
								B = N.dataLabel;
								V = !1 === N.visible ? "hidden" : "inherit";
								W = v = M.natural.y;
								n && h(N.distributeBox) && ("undefined" === typeof N
									.distributeBox.pos ? V = "hidden" : (K = N.distributeBox
										.size, W = E.radialDistributionY(N)));
								delete N.positionIndex;
								if (e.justify) I = E.justify(N, r, w);
								else switch (e.alignTo) {
									case "connectors":
										I = E.alignToConnectors(f, m, a, g);
										break;
									case "plotEdges":
										I = E.alignToPlotEdges(B, m, a, g);
										break;
									default:
										I = E.radialDistributionX(c, N, W, v)
								}
								B._attr = {
									visibility: V,
									align: M.alignment
								};
								S = N.options.dataLabels || {};
								B._pos = {
									x: I + q(S.x, e.x) + ({
										left: b,
										right: -b
									} [M.alignment] || 0),
									y: W + q(S.y, e.y) - 10
								};
								M.final.x = I;
								M.final.y = W;
								q(e.crop, !0) && (H = B.getBBox().width, v = null, I - H < b &&
									1 === m ? (v = Math.round(H - I + b), y[3] = Math.max(v,
										y[3])) : I + H > a - b && 0 === m && (v = Math
										.round(I + H - a + b), y[1] = Math.max(v, y[1])),
									0 > W - K / 2 ? y[0] = Math.max(Math.round(-W + K / 2),
										y[0]) : W + K / 2 > k && (y[2] = Math.max(Math
										.round(W + K / 2 - k), y[2])), B.sideOverflow = v)
							}
						}
					}), 0 === t(y) || this.verifyDataLabelOverflow(y)) && (this.placeDataLabels(), this
						.points.forEach(function(a) {
							S =
								l(e, a.options.dataLabels);
							if (z = q(S.connectorWidth, 1)) {
								var b;
								C = a.connector;
								if ((B = a.dataLabel) && B._pos && a.visible && 0 < a
									.labelDistance) {
									V = B._attr.visibility;
									if (b = !C) a.connector = C = d.renderer.path().addClass(
											"highcharts-data-label-connector  highcharts-color-" + a
											.colorIndex + (a.className ? " " + a.className : ""))
										.add(c.dataLabelsGroup), d.styledMode || C.attr({
											"stroke-width": z,
											stroke: S.connectorColor || a.color || "#666666"
										});
									C[b ? "attr" : "animate"]({
										d: a.getConnectorPath()
									});
									C.attr("visibility", V)
								} else C && (a.connector =
									C.destroy())
							}
						}))
				}

				function g() {
					this.points.forEach(function(c) {
						var f = c.dataLabel,
							d;
						f && c.visible && ((d = f._pos) ? (f.sideOverflow && (f._attr.width = Math
							.max(f.getBBox().width - f.sideOverflow, 0), f.css({
								width: f._attr.width + "px",
								textOverflow: (this.options.dataLabels.style || {})
									.textOverflow || "ellipsis"
							}), f.shortened = !0), f.attr(f._attr), f[f.moved ?
							"animate" : "attr"](d), f.moved = !0) : f && f.attr({
							y: -9999
						}));
						delete c.distributeBox
					}, this)
				}

				function y(c) {
					var f = this.center,
						d = this.options,
						e = d.center,
						b = d.minSize || 80,
						a = null !==
						d.size;
					if (!a) {
						if (null !== e[0]) var k = Math.max(f[2] - Math.max(c[1], c[3]), b);
						else k = Math.max(f[2] - c[1] - c[3], b), f[0] += (c[3] - c[1]) / 2;
						null !== e[1] ? k = r(k, b, f[2] - Math.max(c[0], c[2])) : (k = r(k, b, f[2] - c[
							0] - c[2]), f[1] += (c[0] - c[2]) / 2);
						k < f[2] ? (f[2] = k, f[3] = Math.min(d.thickness ? Math.max(0, k - 2 * d
								.thickness) : Math.max(0, p(d.innerSize || 0, k)), k), this.translate(
							f), this.drawDataLabels && this.drawDataLabels()) : a = !0
					}
					return a
				}
				var z = [],
					w = {
						radialDistributionY: function(c) {
							return c.top + c.distributeBox.pos
						},
						radialDistributionX: function(c,
							f, d, e) {
							return c.getX(d < f.top + 2 || d > f.bottom - 2 ? e : d, f.half, f)
						},
						justify: function(c, f, d) {
							return d[0] + (c.half ? -1 : 1) * (f + c.labelDistance)
						},
						alignToPlotEdges: function(c, f, d, e) {
							c = c.getBBox().width;
							return f ? c + e : d - c - e
						},
						alignToConnectors: function(c, f, d, e) {
							var b = 0,
								a;
							c.forEach(function(c) {
								a = c.dataLabel.getBBox().width;
								a > b && (b = a)
							});
							return f ? b + e : d - b - e
						}
					};
				c.compose = function(c) {
					d.compose(x); - 1 === z.indexOf(c) && (z.push(c), c = c.prototype, c
						.dataLabelPositioners = w, c.alignDataLabel = C, c.drawDataLabels = f, c
						.placeDataLabels = g, c.verifyDataLabelOverflow =
						y)
				}
			})(f || (f = {}));
			return f
		});
	I(g, "Extensions/OverlappingDataLabels.js", [g["Core/Chart/Chart.js"], g["Core/Utilities.js"]], function(d, g) {
		function z(d, h) {
			var l = !1;
			if (d) {
				var g = d.newOpacity;
				d.oldOpacity !== g && (d.alignAttr && d.placed ? (d[g ? "removeClass" : "addClass"](
					"highcharts-data-label-hidden"), l = !0, d.alignAttr.opacity = g, d[d
					.isOld ? "animate" : "attr"](d.alignAttr, null, function() {
					h.styledMode || d.css({
						pointerEvents: g ? "auto" : "none"
					})
				}), y(h, "afterHideOverlappingLabel")) : d.attr({
					opacity: g
				}));
				d.isOld = !0
			}
			return l
		}
		var B = g.addEvent,
			y = g.fireEvent,
			C = g.isArray,
			A = g.isNumber,
			x = g.objectEach,
			t = g.pick;
		B(d, "render", function() {
			var d = this,
				h = [];
			(this.labelCollectors || []).forEach(function(d) {
				h = h.concat(d())
			});
			(this.yAxis || []).forEach(function(d) {
				d.stacking && d.options.stackLabels && !d.options.stackLabels
					.allowOverlap && x(d.stacking.stacks, function(d) {
						x(d, function(d) {
							d.label && h.push(d.label)
						})
					})
			});
			(this.series || []).forEach(function(l) {
				var g = l.options.dataLabels;
				l.visible && (!1 !== g.enabled || l._hasPointLabels) && (g = function(l) {
					return l.forEach(function(f) {
						f.visible &&
							(C(f.dataLabels) ? f.dataLabels : f.dataLabel ?
								[f.dataLabel] : []).forEach(function(c) {
								var l = c.options;
								c.labelrank = t(l.labelrank, f
									.labelrank, f.shapeArgs && f
									.shapeArgs.height);
								l.allowOverlap ? (c.oldOpacity = c
									.opacity, c.newOpacity = 1, z(c,
										d)) : h.push(c)
							})
					})
				}, g(l.nodes || []), g(l.points))
			});
			this.hideOverlappingLabels(h)
		});
		d.prototype.hideOverlappingLabels = function(d) {
			var h = this,
				l = d.length,
				g = h.renderer,
				p, f, c, t = !1;
			var r = function(c) {
				var f, d = c.box ? 0 : c.padding || 0,
					h = f = 0,
					e;
				if (c && (!c.alignAttr || c.placed)) {
					var b = c.alignAttr || {
						x: c.attr("x"),
						y: c.attr("y")
					};
					var a = c.parentGroup;
					c.width || (f = c.getBBox(), c.width = f.width, c.height = f.height, f = g
						.fontMetrics(null, c.element).h);
					var k = c.width - 2 * d;
					(e = {
						left: "0",
						center: "0.5",
						right: "1"
					} [c.alignValue]) ? h = +e * k: A(c.x) && Math.round(c.x) !== c.translateX && (
						h = c.x - c.translateX);
					return {
						x: b.x + (a.translateX || 0) + d - (h || 0),
						y: b.y + (a.translateY || 0) + d - f,
						width: c.width - 2 * d,
						height: c.height - 2 * d
					}
				}
			};
			for (f = 0; f < l; f++)
				if (p = d[f]) p.oldOpacity = p.opacity, p.newOpacity = 1, p.absoluteBox = r(p);
			d.sort(function(c, f) {
				return (f.labelrank ||
					0) - (c.labelrank || 0)
			});
			for (f = 0; f < l; f++) {
				var x = (r = d[f]) && r.absoluteBox;
				for (p = f + 1; p < l; ++p) {
					var C = (c = d[p]) && c.absoluteBox;
					!x || !C || r === c || 0 === r.newOpacity || 0 === c.newOpacity || "hidden" === r
						.visibility || "hidden" === c.visibility || C.x >= x.x + x.width || C.x + C
						.width <= x.x || C.y >= x.y + x.height || C.y + C.height <= x.y || ((r
							.labelrank < c.labelrank ? r : c).newOpacity = 0)
				}
			}
			d.forEach(function(c) {
				z(c, h) && (t = !0)
			});
			t && y(h, "afterHideAllOverlappingLabels")
		}
	});
	I(g, "Core/Responsive.js", [g["Core/Utilities.js"]], function(d) {
		var g = d.extend,
			z = d.find,
			B = d.isArray,
			y = d.isObject,
			C = d.merge,
			A = d.objectEach,
			x = d.pick,
			t = d.splat,
			r = d.uniqueKey,
			h;
		(function(d) {
			var h = [];
			d.compose = function(f) {
				-1 === h.indexOf(f) && (h.push(f), g(f.prototype, l.prototype));
				return f
			};
			var l = function() {
				function f() {}
				f.prototype.currentOptions = function(c) {
					function f(c, h, l, g) {
						var m;
						A(c, function(c, b) {
							if (!g && -1 < d.collectionsWithUpdate.indexOf(b) && h[b])
								for (c = t(c), l[b] = [], m = 0; m < Math.max(c.length,
										h[b].length); m++) h[b][m] && (void 0 === c[m] ?
									l[b][m] = h[b][m] : (l[b][m] = {}, f(c[m], h[b][
										m
									], l[b][m], g + 1)));
							else y(c) ? (l[b] = B(c) ? [] : {}, f(c, h[b] || {}, l[b],
									g + 1)) : l[b] = "undefined" === typeof h[b] ?
								null : h[b]
						})
					}
					var d = this,
						h = {};
					f(c, this.options, h, 0);
					return h
				};
				f.prototype.matchResponsiveRule = function(c, f) {
					var d = c.condition;
					(d.callback || function() {
						return this.chartWidth <= x(d.maxWidth, Number.MAX_VALUE) && this
							.chartHeight <= x(d.maxHeight, Number.MAX_VALUE) && this
							.chartWidth >= x(d.minWidth, 0) && this.chartHeight >= x(d
								.minHeight, 0)
					}).call(this) && f.push(c._id)
				};
				f.prototype.setResponsive = function(c, f) {
					var d = this,
						h = this.options.responsive,
						l = this.currentResponsive,
						g = [];
					!f && h && h.rules && h.rules.forEach(function(c) {
						"undefined" === typeof c._id && (c._id = r());
						d.matchResponsiveRule(c, g)
					}, this);
					f = C.apply(void 0, g.map(function(c) {
						return z((h || {}).rules || [], function(f) {
							return f._id === c
						})
					}).map(function(c) {
						return c && c.chartOptions
					}));
					f.isResponsiveOptions = !0;
					g = g.toString() || void 0;
					g !== (l && l.ruleIds) && (l && this.update(l.undoOptions, c, !0), g ? (l =
						this.currentOptions(f), l.isResponsiveOptions = !0, this
						.currentResponsive = {
							ruleIds: g,
							mergedOptions: f,
							undoOptions: l
						},
						this.update(f, c, !0)) : this.currentResponsive = void 0)
				};
				return f
			}()
		})(h || (h = {}));
		"";
		"";
		return h
	});
	I(g, "masters/highcharts.src.js", [g["Core/Globals.js"], g["Core/Utilities.js"], g["Core/Defaults.js"], g[
			"Core/Animation/Fx.js"], g["Core/Animation/AnimationUtilities.js"], g[
			"Core/Renderer/HTML/AST.js"], g["Core/FormatUtilities.js"], g[
			"Core/Renderer/RendererUtilities.js"], g["Core/Renderer/SVG/SVGElement.js"], g[
			"Core/Renderer/SVG/SVGRenderer.js"], g["Core/Renderer/HTML/HTMLElement.js"], g[
			"Core/Renderer/HTML/HTMLRenderer.js"],
		g["Core/Axis/Axis.js"], g["Core/Axis/DateTimeAxis.js"], g["Core/Axis/LogarithmicAxis.js"], g[
			"Core/Axis/PlotLineOrBand/PlotLineOrBand.js"], g["Core/Axis/Tick.js"], g["Core/Tooltip.js"], g[
			"Core/Series/Point.js"], g["Core/Pointer.js"], g["Core/MSPointer.js"], g[
			"Core/Legend/Legend.js"], g["Core/Chart/Chart.js"], g["Core/Axis/Stacking/StackingAxis.js"], g[
			"Core/Axis/Stacking/StackItem.js"], g["Core/Series/Series.js"], g[
			"Core/Series/SeriesRegistry.js"], g["Series/Column/ColumnSeries.js"], g[
			"Series/Column/ColumnDataLabel.js"],
		g["Series/Pie/PieSeries.js"], g["Series/Pie/PieDataLabel.js"], g["Core/Series/DataLabel.js"], g[
			"Core/Responsive.js"], g["Core/Color/Color.js"], g["Core/Time.js"]
	], function(d, g, z, B, y, C, A, x, t, r, h, l, q, p, f, c, D, G, H, K, w, n, u, m, e, b, a, k, v, F, J,
		L, O, Q, T) {
		d.animate = y.animate;
		d.animObject = y.animObject;
		d.getDeferredAnimation = y.getDeferredAnimation;
		d.setAnimation = y.setAnimation;
		d.stop = y.stop;
		d.timers = B.timers;
		d.AST = C;
		d.Axis = q;
		d.Chart = u;
		d.chart = u.chart;
		d.Fx = B;
		d.Legend = n;
		d.PlotLineOrBand = c;
		d.Point = H;
		d.Pointer = w.isRequired() ?
			w : K;
		d.Series = b;
		d.StackItem = e;
		d.SVGElement = t;
		d.SVGRenderer = r;
		d.Tick = D;
		d.Time = T;
		d.Tooltip = G;
		d.Color = Q;
		d.color = Q.parse;
		l.compose(r);
		h.compose(t);
		d.defaultOptions = z.defaultOptions;
		d.getOptions = z.getOptions;
		d.time = z.defaultTime;
		d.setOptions = z.setOptions;
		d.dateFormat = A.dateFormat;
		d.format = A.format;
		d.numberFormat = A.numberFormat;
		d.addEvent = g.addEvent;
		d.arrayMax = g.arrayMax;
		d.arrayMin = g.arrayMin;
		d.attr = g.attr;
		d.clearTimeout = g.clearTimeout;
		d.correctFloat = g.correctFloat;
		d.createElement = g.createElement;
		d.css =
			g.css;
		d.defined = g.defined;
		d.destroyObjectProperties = g.destroyObjectProperties;
		d.discardElement = g.discardElement;
		d.distribute = x.distribute;
		d.erase = g.erase;
		d.error = g.error;
		d.extend = g.extend;
		d.extendClass = g.extendClass;
		d.find = g.find;
		d.fireEvent = g.fireEvent;
		d.getMagnitude = g.getMagnitude;
		d.getStyle = g.getStyle;
		d.inArray = g.inArray;
		d.isArray = g.isArray;
		d.isClass = g.isClass;
		d.isDOMElement = g.isDOMElement;
		d.isFunction = g.isFunction;
		d.isNumber = g.isNumber;
		d.isObject = g.isObject;
		d.isString = g.isString;
		d.keys = g.keys;
		d.merge = g.merge;
		d.normalizeTickInterval = g.normalizeTickInterval;
		d.objectEach = g.objectEach;
		d.offset = g.offset;
		d.pad = g.pad;
		d.pick = g.pick;
		d.pInt = g.pInt;
		d.relativeLength = g.relativeLength;
		d.removeEvent = g.removeEvent;
		d.seriesType = a.seriesType;
		d.splat = g.splat;
		d.stableSort = g.stableSort;
		d.syncTimeout = g.syncTimeout;
		d.timeUnits = g.timeUnits;
		d.uniqueKey = g.uniqueKey;
		d.useSerialIds = g.useSerialIds;
		d.wrap = g.wrap;
		v.compose(k);
		L.compose(b);
		p.compose(q);
		f.compose(q);
		J.compose(F);
		c.compose(q);
		O.compose(u);
		m.compose(q,
			u, b);
		return d
	});
	I(g, "Core/Axis/NavigatorAxisComposition.js", [g["Core/Globals.js"], g["Core/Utilities.js"]], function(d, g) {
		function z() {
			this.navigatorAxis || (this.navigatorAxis = new l(this))
		}

		function B(d) {
			var h = this.chart.options,
				f = h.navigator,
				c = this.navigatorAxis,
				l = h.chart.zooming.pinchType,
				g = h.rangeSelector;
			h = h.chart.zooming.type;
			this.isXAxis && (f && f.enabled || g && g.enabled) && ("y" === h ? d.zoomed = !1 : (!y &&
				"xy" === h || y && "xy" === l) && this.options.range && (f = c.previousZoom, x(d
					.newMin) ? c.previousZoom = [this.min, this.max] :
				f && (d.newMin = f[0], d.newMax = f[1], c.previousZoom = void 0)));
			"undefined" !== typeof d.zoomed && d.preventDefault()
		}
		var y = d.isTouchDevice,
			C = g.addEvent,
			A = g.correctFloat,
			x = g.defined,
			t = g.isNumber,
			r = g.pick,
			h = [],
			l = function() {
				function d(d) {
					this.axis = d
				}
				d.compose = function(d) {
					-1 === h.indexOf(d) && (h.push(d), d.keepProps.push("navigatorAxis"), C(d, "init",
						z), C(d, "zoom", B))
				};
				d.prototype.destroy = function() {
					this.axis = void 0
				};
				d.prototype.toFixedRange = function(d, f, c, h) {
					var l = this.axis,
						g = l.chart;
					d = r(c, l.translate(d, !0, !l.horiz));
					f = r(h, l.translate(f, !0, !l.horiz));
					g = g && g.fixedRange;
					l = (l.pointRange || 0) / 2;
					var p = g && (f - d) / g;
					x(c) || (d = A(d + l));
					x(h) || (f = A(f - l));
					.7 < p && 1.3 > p && (h ? d = f - g : f = d + g);
					t(d) && t(f) || (d = f = void 0);
					return {
						min: d,
						max: f
					}
				};
				return d
			}();
		return l
	});
	I(g, "Stock/Navigator/NavigatorDefaults.js", [g["Core/Color/Color.js"], g["Core/Series/SeriesRegistry.js"]],
		function(d, g) {
			d = d.parse;
			g = g.seriesTypes;
			g = {
				height: 40,
				margin: 25,
				maskInside: !0,
				handles: {
					width: 7,
					height: 15,
					symbols: ["navigator-handle", "navigator-handle"],
					enabled: !0,
					lineWidth: 1,
					backgroundColor: "#f2f2f2",
					borderColor: "#999999"
				},
				maskFill: d("#6685c2").setOpacity(.3).get(),
				outlineColor: "#cccccc",
				outlineWidth: 1,
				series: {
					type: "undefined" === typeof g.areaspline ? "line" : "areaspline",
					fillOpacity: .05,
					lineWidth: 1,
					compare: null,
					dataGrouping: {
						approximation: "average",
						enabled: !0,
						groupPixelWidth: 2,
						firstAnchor: "firstPoint",
						anchor: "middle",
						lastAnchor: "lastPoint",
						units: [
							["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
							["second", [1, 2, 5, 10, 15, 30]],
							["minute", [1, 2, 5, 10, 15, 30]],
							["hour", [1, 2, 3, 4, 6, 8,
								12
							]],
							["day", [1, 2, 3, 4]],
							["week", [1, 2, 3]],
							["month", [1, 3, 6]],
							["year", null]
						]
					},
					dataLabels: {
						enabled: !1,
						zIndex: 2
					},
					id: "highcharts-navigator-series",
					className: "highcharts-navigator-series",
					lineColor: null,
					marker: {
						enabled: !1
					},
					threshold: null
				},
				xAxis: {
					overscroll: 0,
					className: "highcharts-navigator-xaxis",
					tickLength: 0,
					lineWidth: 0,
					gridLineColor: "#e6e6e6",
					gridLineWidth: 1,
					tickPixelInterval: 200,
					labels: {
						align: "left",
						style: {
							color: "#999999"
						},
						x: 3,
						y: -4
					},
					crosshair: !1
				},
				yAxis: {
					className: "highcharts-navigator-yaxis",
					gridLineWidth: 0,
					startOnTick: !1,
					endOnTick: !1,
					minPadding: .1,
					maxPadding: .1,
					labels: {
						enabled: !1
					},
					crosshair: !1,
					title: {
						text: null
					},
					tickLength: 0,
					tickWidth: 0
				}
			};
			"";
			return g
		});
	I(g, "Stock/Navigator/NavigatorSymbols.js", [], function() {
		return {
			"navigator-handle": function(d, g, z, B, y) {
				void 0 === y && (y = {});
				d = y.width ? y.width / 2 : z;
				g = Math.round(d / 3) + .5;
				B = y.height || B;
				return [
					["M", -d - 1, .5],
					["L", d, .5],
					["L", d, B + .5],
					["L", -d - 1, B + .5],
					["L", -d - 1, .5],
					["M", -g, 4],
					["L", -g, B - 3],
					["M", g - 1, 4],
					["L", g - 1, B - 3]
				]
			}
		}
	});
	I(g, "Stock/Navigator/NavigatorComposition.js",
		[g["Core/Defaults.js"], g["Core/Globals.js"], g["Core/Axis/NavigatorAxisComposition.js"], g[
			"Stock/Navigator/NavigatorDefaults.js"], g["Stock/Navigator/NavigatorSymbols.js"], g[
			"Core/Renderer/RendererRegistry.js"], g["Core/Utilities.js"]],
		function(d, g, z, B, y, C, A) {
			function x() {
				this.navigator && this.navigator.setBaseSeries(null, !1)
			}

			function t() {
				var b = this.legend,
					a = this.navigator;
				if (a) {
					var c = b && b.options;
					var e = a.xAxis;
					var f = a.yAxis;
					var d = a.scrollbarHeight;
					this.inverted ? (a.left = a.opposite ? this.chartWidth - d - a.height :
						this.spacing[3] + d, a.top = this.plotTop + d) : (a.left = u(e.left, this.plotLeft +
							d), a.top = a.navigatorOptions.top || this.chartHeight - a.height - d - this
						.spacing[2] - (this.rangeSelector && this.extraBottomMargin ? this.rangeSelector
							.getHeight() : 0) - (c && "bottom" === c.verticalAlign && "proximate" !== c
							.layout && c.enabled && !c.floating ? b.legendHeight + u(c.margin, 10) : 0) - (
							this.titleOffset ? this.titleOffset[2] : 0));
					e && f && (this.inverted ? e.options.left = f.options.left = a.left : e.options.top = f
						.options.top = a.top, e.setAxisSize(), f.setAxisSize())
				}
			}

			function r(b) {
				this.navigator || this.scroller || !this.options.navigator.enabled && !this.options.scrollbar
					.enabled || (this.scroller = this.navigator = new e(this), u(b.redraw, !0) && this.redraw(b
						.animation))
			}

			function h() {
				var b = this.options;
				if (b.navigator.enabled || b.scrollbar.enabled) this.scroller = this.navigator = new e(this)
			}

			function l() {
				var b = this.options,
					a = b.navigator,
					c = b.rangeSelector;
				if ((a && a.enabled || c && c.enabled) && (!G && "x" === b.chart.zooming.type || G && "x" === b
						.chart.zooming.pinchType)) return !1
			}

			function q(b) {
				var a =
					b.navigator;
				a && b.xAxis[0] && (b = b.xAxis[0].getExtremes(), a.render(b.min, b.max))
			}

			function p(b) {
				var a = b.options.navigator || {},
					c = b.options.scrollbar || {};
				this.navigator || this.scroller || !a.enabled && !c.enabled || (n(!0, this.options.navigator,
					a), n(!0, this.options.scrollbar, c), delete b.options.navigator, delete b.options
					.scrollbar)
			}

			function f() {
				this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null, !1)
			}
			var c = d.defaultOptions,
				D = d.setOptions,
				G = g.isTouchDevice,
				H = C.getRendererType,
				K = A.addEvent,
				w = A.extend,
				n = A.merge,
				u = A.pick,
				m = [],
				e;
			return {
				compose: function(b, a, k, d) {
					z.compose(b);
					e = k; - 1 === m.indexOf(a) && (m.push(a), a.prototype.callbacks.push(q), K(a,
							"afterAddSeries", x), K(a, "afterSetChartSize", t), K(a, "afterUpdate", r),
						K(a, "beforeRender", h), K(a, "beforeShowResetZoom", l), K(a, "update", p)); - 1 ===
						m.indexOf(d) && (m.push(d), K(d, "afterUpdate", f)); - 1 === m.indexOf(H) && (m
						.push(H), w(H().prototype.symbols, y)); - 1 === m.indexOf(D) && (m.push(D), w(c, {
						navigator: B
					}))
				}
			}
		});
	I(g, "Core/Axis/ScrollbarAxis.js", [g["Core/Utilities.js"]],
		function(d) {
			var g = d.addEvent,
				z = d.defined,
				B = d.pick;
			return function() {
				function d() {}
				d.compose = function(y, A) {
					if (-1 === d.composed.indexOf(y)) d.composed.push(y);
					else return y;
					var x = function(d) {
						var g = B(d.options && d.options.min, d.min),
							h = B(d.options && d.options.max, d.max);
						return {
							axisMin: g,
							axisMax: h,
							scrollMin: z(d.dataMin) ? Math.min(g, d.min, d.dataMin, B(d.threshold,
								Infinity)) : g,
							scrollMax: z(d.dataMax) ? Math.max(h, d.max, d.dataMax, B(d.threshold, -
								Infinity)) : h
						}
					};
					g(y, "afterInit", function() {
						var d = this;
						d.options && d.options.scrollbar &&
							d.options.scrollbar.enabled && (d.options.scrollbar.vertical = !d
								.horiz, d.options.startOnTick = d.options.endOnTick = !1, d
								.scrollbar = new A(d.chart.renderer, d.options.scrollbar, d
									.chart), g(d.scrollbar, "changed", function(g) {
									var h = x(d),
										l = h.axisMax,
										q = h.scrollMin,
										p = h.scrollMax - q;
									z(h.axisMin) && z(l) && (d.horiz && !d.reversed || !d
										.horiz && d.reversed ? (h = q + p * this.to,
											q += p * this.from) : (h = q + p * (1 - this
											.from), q += p * (1 - this.to)), this
										.shouldUpdateExtremes(g.DOMType) ? d
										.setExtremes(q, h, !0, "mousemove" !== g
											.DOMType && "touchmove" !== g.DOMType,
											g) : this.setRange(this.from, this.to))
								}))
					});
					g(y, "afterRender", function() {
						var d = x(this),
							g = d.scrollMin,
							h = d.scrollMax;
						d = this.scrollbar;
						var l = this.axisTitleMargin + (this.titleOffset || 0),
							q = this.chart.scrollbarsOffsets,
							p = this.options.margin || 0;
						d && (this.horiz ? (this.opposite || (q[1] += l), d.position(this.left,
								this.top + this.height + 2 + q[1] - (this.opposite ? p :
									0), this.width, this.height), this.opposite || (q[
								1] += p), l = 1) : (this.opposite && (q[0] += l), d
								.position(d.options.opposite ? this.left + this.width + 2 +
									q[0] - (this.opposite ? 0 : p) :
									this.opposite ? 0 : p, this.top, this.width, this.height
									), this.opposite && (q[0] += p), l = 0), q[l] += d
							.size + d.options.margin, isNaN(g) || isNaN(h) || !z(this
							.min) || !z(this.max) || this.min === this.max ? d.setRange(0,
								1) : (q = (this.min - g) / (h - g), g = (this.max - g) / (
									h - g), this.horiz && !this.reversed || !this.horiz &&
								this.reversed ? d.setRange(q, g) : d.setRange(1 - g, 1 - q))
							)
					});
					g(y, "afterGetOffset", function() {
						var d = this.scrollbar && !this.scrollbar.options.opposite;
						d = this.horiz ? 2 : d ? 3 : 1;
						var g = this.scrollbar;
						g && (this.chart.scrollbarsOffsets = [0, 0],
							this.chart.axisOffset[d] += g.size + g.options.margin)
					});
					return y
				};
				d.composed = [];
				return d
			}()
		});
	I(g, "Stock/Scrollbar/ScrollbarDefaults.js", [g["Core/Globals.js"]], function(d) {
		return {
			height: d.isTouchDevice ? 20 : 14,
			barBorderRadius: 0,
			buttonBorderRadius: 0,
			liveRedraw: void 0,
			margin: 10,
			minWidth: 6,
			opposite: !0,
			step: .2,
			zIndex: 3,
			barBackgroundColor: "#cccccc",
			barBorderWidth: 1,
			barBorderColor: "#cccccc",
			buttonArrowColor: "#333333",
			buttonBackgroundColor: "#e6e6e6",
			buttonBorderColor: "#cccccc",
			buttonBorderWidth: 1,
			rifleColor: "#333333",
			trackBackgroundColor: "#f2f2f2",
			trackBorderColor: "#f2f2f2",
			trackBorderWidth: 1
		}
	});
	I(g, "Stock/Scrollbar/Scrollbar.js", [g["Core/Defaults.js"], g["Core/Globals.js"], g[
			"Core/Axis/ScrollbarAxis.js"], g["Stock/Scrollbar/ScrollbarDefaults.js"], g[
		"Core/Utilities.js"]], function(d, g, z, B, y) {
		var C = d.defaultOptions,
			A = y.addEvent,
			x = y.correctFloat,
			t = y.defined,
			r = y.destroyObjectProperties,
			h = y.fireEvent,
			l = y.merge,
			q = y.pick,
			p = y.removeEvent;
		d = function() {
			function d(c, d, f) {
				this._events = [];
				this.chart = void 0;
				this.from = this.chartY =
					this.chartX = 0;
				this.scrollbar = this.renderer = this.options = this.group = void 0;
				this.scrollbarButtons = [];
				this.scrollbarGroup = void 0;
				this.scrollbarLeft = 0;
				this.scrollbarRifles = void 0;
				this.scrollbarStrokeWidth = 1;
				this.to = this.size = this.scrollbarTop = 0;
				this.track = void 0;
				this.trackBorderWidth = 1;
				this.userOptions = void 0;
				this.y = this.x = 0;
				this.init(c, d, f)
			}
			d.compose = function(c) {
				z.compose(c, d)
			};
			d.swapXY = function(c, d) {
				d && c.forEach(function(c) {
					for (var d = c.length, f, h = 0; h < d; h += 2) f = c[h + 1],
						"number" === typeof f && (c[h + 1] = c[h +
							2], c[h + 2] = f)
				});
				return c
			};
			d.prototype.addEvents = function() {
				var c = this.options.inverted ? [1, 0] : [0, 1],
					d = this.scrollbarButtons,
					f = this.scrollbarGroup.element,
					h = this.track.element,
					l = this.mouseDownHandler.bind(this),
					p = this.mouseMoveHandler.bind(this),
					n = this.mouseUpHandler.bind(this);
				c = [
					[d[c[0]].element, "click", this.buttonToMinClick.bind(this)],
					[d[c[1]].element, "click", this.buttonToMaxClick.bind(this)],
					[h, "click", this.trackClick.bind(this)],
					[f, "mousedown", l],
					[f.ownerDocument, "mousemove", p],
					[f.ownerDocument,
						"mouseup", n
					]
				];
				g.hasTouch && c.push([f, "touchstart", l], [f.ownerDocument, "touchmove", p], [f
					.ownerDocument, "touchend", n
				]);
				c.forEach(function(c) {
					A.apply(null, c)
				});
				this._events = c
			};
			d.prototype.buttonToMaxClick = function(c) {
				var d = (this.to - this.from) * q(this.options.step, .2);
				this.updatePosition(this.from + d, this.to + d);
				h(this, "changed", {
					from: this.from,
					to: this.to,
					trigger: "scrollbar",
					DOMEvent: c
				})
			};
			d.prototype.buttonToMinClick = function(c) {
				var d = x(this.to - this.from) * q(this.options.step, .2);
				this.updatePosition(x(this.from -
					d), x(this.to - d));
				h(this, "changed", {
					from: this.from,
					to: this.to,
					trigger: "scrollbar",
					DOMEvent: c
				})
			};
			d.prototype.cursorToScrollbarPosition = function(c) {
				var d = this.options;
				d = d.minWidth > this.calculatedWidth ? d.minWidth : 0;
				return {
					chartX: (c.chartX - this.x - this.xOffset) / (this.barWidth - d),
					chartY: (c.chartY - this.y - this.yOffset) / (this.barWidth - d)
				}
			};
			d.prototype.destroy = function() {
				var c = this,
					d = c.chart.scroller;
				c.removeEvents();
				["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"].forEach(
					function(d) {
						c[d] &&
							c[d].destroy && (c[d] = c[d].destroy())
					});
				d && c === d.scrollbar && (d.scrollbar = null, r(d.scrollbarButtons))
			};
			d.prototype.drawScrollbarButton = function(c) {
				var f = this.renderer,
					h = this.scrollbarButtons,
					l = this.options,
					g = this.size,
					p = f.g().add(this.group);
				h.push(p);
				p = f.rect().addClass("highcharts-scrollbar-button").add(p);
				this.chart.styledMode || p.attr({
					stroke: l.buttonBorderColor,
					"stroke-width": l.buttonBorderWidth,
					fill: l.buttonBackgroundColor
				});
				p.attr(p.crisp({
						x: -.5,
						y: -.5,
						width: g + 1,
						height: g + 1,
						r: l.buttonBorderRadius
					},
					p.strokeWidth()));
				p = f.path(d.swapXY([
					["M", g / 2 + (c ? -1 : 1), g / 2 - 3],
					["L", g / 2 + (c ? -1 : 1), g / 2 + 3],
					["L", g / 2 + (c ? 2 : -2), g / 2]
				], l.vertical)).addClass("highcharts-scrollbar-arrow").add(h[c]);
				this.chart.styledMode || p.attr({
					fill: l.buttonArrowColor
				})
			};
			d.prototype.init = function(c, d, f) {
				this.scrollbarButtons = [];
				this.renderer = c;
				this.userOptions = d;
				this.options = l(B, C.scrollbar, d);
				this.chart = f;
				this.size = q(this.options.size, this.options.height);
				d.enabled && (this.render(), this.addEvents())
			};
			d.prototype.mouseDownHandler = function(c) {
				c =
					this.chart.pointer.normalize(c);
				c = this.cursorToScrollbarPosition(c);
				this.chartX = c.chartX;
				this.chartY = c.chartY;
				this.initPositions = [this.from, this.to];
				this.grabbedCenter = !0
			};
			d.prototype.mouseMoveHandler = function(c) {
				var d = this.chart.pointer.normalize(c),
					f = this.options.vertical ? "chartY" : "chartX",
					l = this.initPositions || [];
				!this.grabbedCenter || c.touches && 0 === c.touches[0][f] || (d = this
					.cursorToScrollbarPosition(d)[f], f = this[f], f = d - f, this
					.hasDragged = !0, this.updatePosition(l[0] + f, l[1] + f), this
					.hasDragged && h(this,
						"changed", {
							from: this.from,
							to: this.to,
							trigger: "scrollbar",
							DOMType: c.type,
							DOMEvent: c
						}))
			};
			d.prototype.mouseUpHandler = function(c) {
				this.hasDragged && h(this, "changed", {
					from: this.from,
					to: this.to,
					trigger: "scrollbar",
					DOMType: c.type,
					DOMEvent: c
				});
				this.grabbedCenter = this.hasDragged = this.chartX = this.chartY = null
			};
			d.prototype.position = function(c, d, f, h) {
				var l = this.options.vertical,
					g = this.rendered ? "animate" : "attr",
					n = h,
					p = 0;
				this.group.show();
				this.x = c;
				this.y = d + this.trackBorderWidth;
				this.width = f;
				this.height = h;
				this.xOffset =
					n;
				this.yOffset = p;
				l ? (this.width = this.yOffset = f = p = this.size, this.xOffset = n = 0, this
					.barWidth = h - 2 * f, this.x = c += this.options.margin) : (this.height =
					this.xOffset = h = n = this.size, this.barWidth = f - 2 * h, this.y += this
					.options.margin);
				this.group[g]({
					translateX: c,
					translateY: this.y
				});
				this.track[g]({
					width: f,
					height: h
				});
				this.scrollbarButtons[1][g]({
					translateX: l ? 0 : f - n,
					translateY: l ? h - p : 0
				})
			};
			d.prototype.removeEvents = function() {
				this._events.forEach(function(c) {
					p.apply(null, c)
				});
				this._events.length = 0
			};
			d.prototype.render = function() {
				var c =
					this.renderer,
					f = this.options,
					h = this.size,
					l = this.chart.styledMode,
					g = c.g("scrollbar").attr({
						zIndex: f.zIndex
					}).hide().add();
				this.group = g;
				this.track = c.rect().addClass("highcharts-scrollbar-track").attr({
					x: 0,
					r: f.trackBorderRadius || 0,
					height: h,
					width: h
				}).add(g);
				l || this.track.attr({
					fill: f.trackBackgroundColor,
					stroke: f.trackBorderColor,
					"stroke-width": f.trackBorderWidth
				});
				this.trackBorderWidth = this.track.strokeWidth();
				this.track.attr({
					y: -this.trackBorderWidth % 2 / 2
				});
				this.scrollbarGroup = c.g().add(g);
				this.scrollbar =
					c.rect().addClass("highcharts-scrollbar-thumb").attr({
						height: h,
						width: h,
						r: f.barBorderRadius || 0
					}).add(this.scrollbarGroup);
				this.scrollbarRifles = c.path(d.swapXY([
					["M", -3, h / 4],
					["L", -3, 2 * h / 3],
					["M", 0, h / 4],
					["L", 0, 2 * h / 3],
					["M", 3, h / 4],
					["L", 3, 2 * h / 3]
				], f.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);
				l || (this.scrollbar.attr({
					fill: f.barBackgroundColor,
					stroke: f.barBorderColor,
					"stroke-width": f.barBorderWidth
				}), this.scrollbarRifles.attr({
					stroke: f.rifleColor,
					"stroke-width": 1
				}));
				this.scrollbarStrokeWidth =
					this.scrollbar.strokeWidth();
				this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this
					.scrollbarStrokeWidth % 2 / 2);
				this.drawScrollbarButton(0);
				this.drawScrollbarButton(1)
			};
			d.prototype.setRange = function(c, d) {
				var f = this.options,
					h = f.vertical,
					l = f.minWidth,
					g = this.barWidth,
					n = !this.rendered || this.hasDragged || this.chart.navigator && this.chart
					.navigator.hasDragged ? "attr" : "animate";
				if (t(g)) {
					var p = g * Math.min(d, 1);
					c = Math.max(c, 0);
					var m = Math.ceil(g * c);
					this.calculatedWidth = p = x(p - m);
					p < l && (m = (g - l + p) * c, p = l);
					l = Math.floor(m + this.xOffset + this.yOffset);
					g = p / 2 - .5;
					this.from = c;
					this.to = d;
					h ? (this.scrollbarGroup[n]({
						translateY: l
					}), this.scrollbar[n]({
						height: p
					}), this.scrollbarRifles[n]({
						translateY: g
					}), this.scrollbarTop = l, this.scrollbarLeft = 0) : (this.scrollbarGroup[n]
						({
							translateX: l
						}), this.scrollbar[n]({
							width: p
						}), this.scrollbarRifles[n]({
							translateX: g
						}), this.scrollbarLeft = l, this.scrollbarTop = 0);
					12 >= p ? this.scrollbarRifles.hide() : this.scrollbarRifles.show();
					!1 === f.showFull && (0 >= c && 1 <= d ? this.group.hide() : this.group.show());
					this.rendered = !0
				}
			};
			d.prototype.shouldUpdateExtremes = function(c) {
				return q(this.options.liveRedraw, g.svg && !g.isTouchDevice && !this.chart
					.boosted) || "mouseup" === c || "touchend" === c || !t(c)
			};
			d.prototype.trackClick = function(c) {
				var d = this.chart.pointer.normalize(c),
					f = this.to - this.from,
					l = this.y + this.scrollbarTop,
					g = this.x + this.scrollbarLeft;
				this.options.vertical && d.chartY > l || !this.options.vertical && d.chartX > g ?
					this.updatePosition(this.from + f, this.to + f) : this.updatePosition(this
						.from - f, this.to - f);
				h(this, "changed", {
					from: this.from,
					to: this.to,
					trigger: "scrollbar",
					DOMEvent: c
				})
			};
			d.prototype.update = function(c) {
				this.destroy();
				this.init(this.chart.renderer, l(!0, this.options, c), this.chart)
			};
			d.prototype.updatePosition = function(c, d) {
				1 < d && (c = x(1 - x(d - c)), d = 1);
				0 > c && (d = x(d - c), c = 0);
				this.from = c;
				this.to = d
			};
			d.defaultOptions = B;
			return d
		}();
		C.scrollbar = l(!0, d.defaultOptions, C.scrollbar);
		return d
	});
	I(g, "Stock/Navigator/Navigator.js", [g["Core/Axis/Axis.js"], g["Core/Defaults.js"], g["Core/Globals.js"], g[
			"Core/Axis/NavigatorAxisComposition.js"],
		g["Stock/Navigator/NavigatorComposition.js"], g["Stock/Scrollbar/Scrollbar.js"], g[
			"Core/Utilities.js"]
	], function(d, g, z, B, y, C, A) {
		function x(b) {
			for (var a = [], c = 1; c < arguments.length; c++) a[c - 1] = arguments[c];
			a = [].filter.call(a, w);
			if (a.length) return Math[b].apply(0, a)
		}
		var t = g.defaultOptions,
			r = z.hasTouch,
			h = z.isTouchDevice,
			l = A.addEvent,
			q = A.clamp,
			p = A.correctFloat,
			f = A.defined,
			c = A.destroyObjectProperties,
			D = A.erase,
			G = A.extend,
			H = A.find,
			K = A.isArray,
			w = A.isNumber,
			n = A.merge,
			u = A.pick,
			m = A.removeEvent,
			e = A.splat;
		return function() {
			function b(a) {
				this.zoomedMin =
					this.zoomedMax = this.yAxis = this.xAxis = this.top = this.size = this.shades = this
					.rendered = this.range = this.outlineHeight = this.outline = this.opposite = this
					.navigatorSize = this.navigatorSeries = this.navigatorOptions = this
					.navigatorGroup = this.navigatorEnabled = this.left = this.height = this.handles =
					this.chart = this.baseSeries = void 0;
				this.init(a)
			}
			b.compose = function(a, c, e) {
				y.compose(a, c, b, e)
			};
			b.prototype.drawHandle = function(a, b, c, e) {
				var k = this.navigatorOptions.handles.height;
				this.handles[b][e](c ? {
					translateX: Math.round(this.left +
						this.height / 2),
					translateY: Math.round(this.top + parseInt(a, 10) + .5 - k)
				} : {
					translateX: Math.round(this.left + parseInt(a, 10)),
					translateY: Math.round(this.top + this.height / 2 - k / 2 - 1)
				})
			};
			b.prototype.drawOutline = function(a, b, c, e) {
				var k = this.navigatorOptions.maskInside,
					d = this.outline.strokeWidth(),
					f = d / 2,
					h = d % 2 / 2;
				d = this.outlineHeight;
				var l = this.scrollbarHeight || 0,
					m = this.size,
					g = this.left - l,
					n = this.top;
				c ? (g -= f, c = n + b + h, b = n + a + h, h = [
					["M", g + d, n - l - h],
					["L", g + d, c],
					["L", g, c],
					["L", g, b],
					["L", g + d, b],
					["L", g + d, n + m + l]
				], k && h.push(["M",
					g + d, c - f
				], ["L", g + d, b + f])) : (a += g + l - h, b += g + l - h, n += f, h = [
					["M", g, n],
					["L", a, n],
					["L", a, n + d],
					["L", b, n + d],
					["L", b, n],
					["L", g + m + 2 * l, n]
				], k && h.push(["M", a - f, n], ["L", b + f, n]));
				this.outline[e]({
					d: h
				})
			};
			b.prototype.drawMasks = function(a, b, c, e) {
				var k = this.left,
					d = this.top,
					f = this.height;
				if (c) {
					var h = [k, k, k];
					var l = [d, d + a, d + b];
					var m = [f, f, f];
					var g = [a, b - a, this.size - b]
				} else h = [k, k + a, k + b], l = [d, d, d], m = [a, b - a, this.size - b], g = [f,
					f, f
				];
				this.shades.forEach(function(a, b) {
					a[e]({
						x: h[b],
						y: l[b],
						width: m[b],
						height: g[b]
					})
				})
			};
			b.prototype.renderElements =
				function() {
					var a = this,
						b = a.navigatorOptions,
						c = b.maskInside,
						e = a.chart,
						d = e.renderer,
						f = {
							cursor: e.inverted ? "ns-resize" : "ew-resize"
						},
						h = a.navigatorGroup = d.g("navigator").attr({
							zIndex: 8,
							visibility: "hidden"
						}).add();
					[!c, c, !c].forEach(function(c, k) {
						var l = d.rect().addClass("highcharts-navigator-mask" + (1 === k ?
							"-inside" : "-outside")).add(h);
						e.styledMode || (l.attr({
							fill: c ? b.maskFill : "rgba(0,0,0,0)"
						}), 1 === k && l.css(f));
						a.shades[k] = l
					});
					a.outline = d.path().addClass("highcharts-navigator-outline").add(h);
					e.styledMode || a.outline.attr({
						"stroke-width": b.outlineWidth,
						stroke: b.outlineColor
					});
					if (b.handles && b.handles.enabled) {
						var l = b.handles,
							m = l.height,
							g = l.width;
						[0, 1].forEach(function(b) {
							a.handles[b] = d.symbol(l.symbols[b], -g / 2 - 1, 0, g, m, l);
							e.inverted && a.handles[b].attr({
								rotation: 90,
								rotationOriginX: Math.floor(-g / 2),
								rotationOriginY: (m + g) / 2
							});
							a.handles[b].attr({
								zIndex: 7 - b
							}).addClass(
								"highcharts-navigator-handle highcharts-navigator-handle-" +
								["left", "right"][b]).add(h);
							e.styledMode || a.handles[b].attr({
								fill: l.backgroundColor,
								stroke: l.borderColor,
								"stroke-width": l.lineWidth
							}).css(f)
						})
					}
				};
			b.prototype.update = function(a) {
				(this.series || []).forEach(function(a) {
					a.baseSeries && delete a.baseSeries.navigatorSeries
				});
				this.destroy();
				n(!0, this.chart.options.navigator, a);
				this.init(this.chart)
			};
			b.prototype.render = function(a, b, c, e) {
				var d = this.chart,
					k = this.xAxis,
					h = k.pointRange || 0,
					l = k.navigatorAxis.fake ? d.xAxis[0] : k,
					m = this.navigatorEnabled,
					g = this.rendered,
					n = d.inverted,
					v = d.xAxis[0].minRange,
					r = d.xAxis[0].options.maxRange,
					t = this.scrollbarHeight,
					F;
				if (!this.hasDragged || f(c)) {
					a = p(a - h / 2);
					b = p(b + h / 2);
					if (!w(a) ||
						!w(b))
						if (g) c = 0, e = u(k.width, l.width);
						else return;
					this.left = u(k.left, d.plotLeft + t + (n ? d.plotWidth : 0));
					var x = this.size = F = u(k.len, (n ? d.plotHeight : d.plotWidth) - 2 * t);
					d = n ? t : F + 2 * t;
					c = u(c, k.toPixels(a, !0));
					e = u(e, k.toPixels(b, !0));
					w(c) && Infinity !== Math.abs(c) || (c = 0, e = d);
					a = k.toValue(c, !0);
					b = k.toValue(e, !0);
					var D = Math.abs(p(b - a));
					D < v ? this.grabbedLeft ? c = k.toPixels(b - v - h, !0) : this.grabbedRight &&
						(e = k.toPixels(a + v + h, !0)) : f(r) && p(D - h) > r && (this
							.grabbedLeft ? c = k.toPixels(b - r - h, !0) : this.grabbedRight && (e =
								k.toPixels(a + r + h,
									!0)));
					this.zoomedMax = q(Math.max(c, e), 0, x);
					this.zoomedMin = q(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math
						.min(c, e), 0, x);
					this.range = this.zoomedMax - this.zoomedMin;
					x = Math.round(this.zoomedMax);
					c = Math.round(this.zoomedMin);
					m && (this.navigatorGroup.attr({
							visibility: "inherit"
						}), g = g && !this.hasDragged ? "animate" : "attr", this.drawMasks(c, x,
							n, g), this.drawOutline(c, x, n, g), this.navigatorOptions.handles
						.enabled && (this.drawHandle(c, 0, n, g), this.drawHandle(x, 1, n, g)));
					this.scrollbar && (n ? (n = this.top - t, l = this.left -
						t + (m || !l.opposite ? 0 : (l.titleOffset || 0) + l
							.axisTitleMargin), t = F + 2 * t) : (n = this.top + (m ? this
						.height : -t), l = this.left - t), this.scrollbar.position(l, n, d,
						t), this.scrollbar.setRange(this.zoomedMin / (F || 1), this
						.zoomedMax / (F || 1)));
					this.rendered = !0
				}
			};
			b.prototype.addMouseEvents = function() {
				var a = this,
					b = a.chart,
					c = b.container,
					e = [],
					d, f;
				a.mouseMoveHandler = d = function(b) {
					a.onMouseMove(b)
				};
				a.mouseUpHandler = f = function(b) {
					a.onMouseUp(b)
				};
				e = a.getPartsEvents("mousedown");
				e.push(l(b.renderTo, "mousemove", d), l(c.ownerDocument, "mouseup",
					f));
				r && (e.push(l(b.renderTo, "touchmove", d), l(c.ownerDocument, "touchend", f)), e
					.concat(a.getPartsEvents("touchstart")));
				a.eventsToUnbind = e;
				a.series && a.series[0] && e.push(l(a.series[0].xAxis, "foundExtremes", function() {
					b.navigator.modifyNavigatorAxisExtremes()
				}))
			};
			b.prototype.getPartsEvents = function(a) {
				var b = this,
					c = [];
				["shades", "handles"].forEach(function(e) {
					b[e].forEach(function(d, k) {
						c.push(l(d.element, a, function(a) {
							b[e + "Mousedown"](a, k)
						}))
					})
				});
				return c
			};
			b.prototype.shadesMousedown = function(a, b) {
				a = this.chart.pointer.normalize(a);
				var c = this.chart,
					e = this.xAxis,
					d = this.zoomedMin,
					k = this.size,
					h = this.range,
					l = this.left,
					m = a.chartX;
				c.inverted && (m = a.chartY, l = this.top);
				if (1 === b) this.grabbedCenter = m, this.fixedWidth = h, this.dragOffset = m - d;
				else {
					a = m - l - h / 2;
					if (0 === b) a = Math.max(0, a);
					else if (2 === b && a + h >= k)
						if (a = k - h, this.reversedExtremes) {
							a -= h;
							var g = this.getUnionExtremes().dataMin
						} else var n = this.getUnionExtremes().dataMax;
					a !== d && (this.fixedWidth = h, b = e.navigatorAxis.toFixedRange(a, a + h, g,
						n), f(b.min) && c.xAxis[0].setExtremes(Math.min(b.min, b.max),
						Math.max(b.min, b.max), !0, null, {
							trigger: "navigator"
						}))
				}
			};
			b.prototype.handlesMousedown = function(a, b) {
				this.chart.pointer.normalize(a);
				a = this.chart;
				var c = a.xAxis[0],
					e = this.reversedExtremes;
				0 === b ? (this.grabbedLeft = !0, this.otherHandlePos = this.zoomedMax, this
					.fixedExtreme = e ? c.min : c.max) : (this.grabbedRight = !0, this
					.otherHandlePos = this.zoomedMin, this.fixedExtreme = e ? c.max : c.min);
				a.fixedRange = null
			};
			b.prototype.onMouseMove = function(a) {
				var b = this,
					c = b.chart,
					e = b.navigatorSize,
					d = b.range,
					f = b.dragOffset,
					l = c.inverted,
					m = b.left;
				a.touches && 0 === a.touches[0].pageX || (a = c.pointer.normalize(a), c = a.chartX,
					l && (m = b.top, c = a.chartY), b.grabbedLeft ? (b.hasDragged = !0, b
						.render(0, 0, c - m, b.otherHandlePos)) : b.grabbedRight ? (b
						.hasDragged = !0, b.render(0, 0, b.otherHandlePos, c - m)) : b
					.grabbedCenter && (b.hasDragged = !0, c < f ? c = f : c > e + f - d && (c =
						e + f - d), b.render(0, 0, c - f, c - f + d)), b.hasDragged && b
					.scrollbar && u(b.scrollbar.options.liveRedraw, z.svg && !h && !this.chart
						.boosted) && (a.DOMType = a.type, setTimeout(function() {
						b.onMouseUp(a)
					}, 0)))
			};
			b.prototype.onMouseUp =
				function(a) {
					var b = this.chart,
						c = this.xAxis,
						e = this.scrollbar,
						d = a.DOMEvent || a,
						h = b.inverted,
						l = this.rendered && !this.hasDragged ? "animate" : "attr";
					if (this.hasDragged && (!e || !e.hasDragged) || "scrollbar" === a.trigger) {
						e = this.getUnionExtremes();
						if (this.zoomedMin === this.otherHandlePos) var m = this.fixedExtreme;
						else if (this.zoomedMax === this.otherHandlePos) var g = this.fixedExtreme;
						this.zoomedMax === this.size && (g = this.reversedExtremes ? e.dataMin : e
							.dataMax);
						0 === this.zoomedMin && (m = this.reversedExtremes ? e.dataMax : e.dataMin);
						c = c.navigatorAxis.toFixedRange(this.zoomedMin, this.zoomedMax, m, g);
						f(c.min) && b.xAxis[0].setExtremes(Math.min(c.min, c.max), Math.max(c.min, c
							.max), !0, this.hasDragged ? !1 : null, {
							trigger: "navigator",
							triggerOp: "navigator-drag",
							DOMEvent: d
						})
					}
					"mousemove" !== a.DOMType && "touchmove" !== a.DOMType && (this.grabbedLeft = this
						.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme =
						this.otherHandlePos = this.hasDragged = this.dragOffset = null);
					this.navigatorEnabled && w(this.zoomedMin) && w(this.zoomedMax) && (b = Math.round(
							this.zoomedMin),
						a = Math.round(this.zoomedMax), this.shades && this.drawMasks(b, a, h, l),
						this.outline && this.drawOutline(b, a, h, l), this.navigatorOptions.handles
						.enabled && Object.keys(this.handles).length === this.handles.length && (
							this.drawHandle(b, 0, h, l), this.drawHandle(a, 1, h, l)))
				};
			b.prototype.removeEvents = function() {
				this.eventsToUnbind && (this.eventsToUnbind.forEach(function(a) {
					a()
				}), this.eventsToUnbind = void 0);
				this.removeBaseSeriesEvents()
			};
			b.prototype.removeBaseSeriesEvents = function() {
				var a = this.baseSeries || [];
				this.navigatorEnabled &&
					a[0] && (!1 !== this.navigatorOptions.adaptToUpdatedData && a.forEach(function(
						a) {
						m(a, "updatedData", this.updatedDataHandler)
					}, this), a[0].xAxis && m(a[0].xAxis, "foundExtremes", this
						.modifyBaseAxisExtremes))
			};
			b.prototype.init = function(a) {
				var b = a.options,
					c = b.navigator || {},
					e = c.enabled,
					f = b.scrollbar || {},
					h = f.enabled;
				b = e && c.height || 0;
				var m = h && f.height || 0;
				this.handles = [];
				this.shades = [];
				this.chart = a;
				this.setBaseSeries();
				this.height = b;
				this.scrollbarHeight = m;
				this.scrollbarEnabled = h;
				this.navigatorEnabled = e;
				this.navigatorOptions =
					c;
				this.scrollbarOptions = f;
				this.outlineHeight = b + m;
				this.opposite = u(c.opposite, !(e || !a.inverted));
				var g = this;
				e = g.baseSeries;
				f = a.xAxis.length;
				h = a.yAxis.length;
				var p = e && e[0] && e[0].xAxis || a.xAxis[0] || {
					options: {}
				};
				a.isDirtyBox = !0;
				g.navigatorEnabled ? (g.xAxis = new d(a, n({
							breaks: p.options.breaks,
							ordinal: p.options.ordinal
						}, c.xAxis, {
							id: "navigator-x-axis",
							yAxis: "navigator-y-axis",
							isX: !0,
							type: "datetime",
							index: f,
							isInternal: !0,
							offset: 0,
							keepOrdinalPadding: !0,
							startOnTick: !1,
							endOnTick: !1,
							minPadding: 0,
							maxPadding: 0,
							zoomEnabled: !1
						},
						a.inverted ? {
							offsets: [m, 0, -m, 0],
							width: b
						} : {
							offsets: [0, -m, 0, m],
							height: b
						})), g.yAxis = new d(a, n(c.yAxis, {
						id: "navigator-y-axis",
						alignTicks: !1,
						offset: 0,
						index: h,
						isInternal: !0,
						reversed: u(c.yAxis && c.yAxis.reversed, a.yAxis[0] && a.yAxis[
							0].reversed, !1),
						zoomEnabled: !1
					}, a.inverted ? {
						width: b
					} : {
						height: b
					})), e || c.series.data ? g.updateNavigatorSeries(!1) : 0 === a.series
					.length && (g.unbindRedraw = l(a, "beforeRedraw", function() {
						0 < a.series.length && !g.series && (g.setBaseSeries(), g
							.unbindRedraw())
					})), g.reversedExtremes = a.inverted &&
					!g.xAxis.reversed || !a.inverted && g.xAxis.reversed, g.renderElements(), g
					.addMouseEvents()) : (g.xAxis = {
						chart: a,
						navigatorAxis: {
							fake: !0
						},
						translate: function(b, c) {
							var e = a.xAxis[0],
								d = e.getExtremes(),
								k = e.len - 2 * m,
								f = x("min", e.options.min, d.dataMin);
							e = x("max", e.options.max, d.dataMax) - f;
							return c ? b * e / k + f : k * (b - f) / e
						},
						toPixels: function(a) {
							return this.translate(a)
						},
						toValue: function(a) {
							return this.translate(a, !0)
						}
					}, g.xAxis.navigatorAxis.axis = g.xAxis, g.xAxis.navigatorAxis
					.toFixedRange = B.prototype.toFixedRange.bind(g.xAxis.navigatorAxis));
				a.options.scrollbar.enabled && (a.scrollbar = g.scrollbar = new C(a.renderer, n(a
					.options.scrollbar, {
						margin: g.navigatorEnabled ? 0 : 10,
						vertical: a.inverted
					}), a), l(g.scrollbar, "changed", function(a) {
					var b = g.size,
						c = b * this.to;
					b *= this.from;
					g.hasDragged = g.scrollbar.hasDragged;
					g.render(0, 0, b, c);
					this.shouldUpdateExtremes(a.DOMType) && setTimeout(function() {
						g.onMouseUp(a)
					})
				}));
				g.addBaseSeriesEvents();
				g.addChartEvents()
			};
			b.prototype.getUnionExtremes = function(a) {
				var b = this.chart.xAxis[0],
					c = this.xAxis,
					e = c.options,
					d = b.options,
					f;
				a && null === b.dataMin || (f = {
					dataMin: u(e && e.min, x("min", d.min, b.dataMin, c.dataMin, c.min)),
					dataMax: u(e && e.max, x("max", d.max, b.dataMax, c.dataMax, c.max))
				});
				return f
			};
			b.prototype.setBaseSeries = function(a, b) {
				var c = this.chart,
					e = this.baseSeries = [];
				a = a || c.options && c.options.navigator.baseSeries || (c.series.length ? H(c
					.series,
					function(a) {
						return !a.options.isInternal
					}).index : 0);
				(c.series || []).forEach(function(b, c) {
					b.options.isInternal || !b.options.showInNavigator && (c !== a && b
							.options.id !== a || !1 === b.options.showInNavigator) ||
						e.push(b)
				});
				this.xAxis && !this.xAxis.navigatorAxis.fake && this.updateNavigatorSeries(!0, b)
			};
			b.prototype.updateNavigatorSeries = function(a, b) {
				var c = this,
					d = c.chart,
					f = c.baseSeries,
					k = {
						enableMouseTracking: !1,
						index: null,
						linkedTo: null,
						group: "nav",
						padXAxis: !1,
						xAxis: "navigator-x-axis",
						yAxis: "navigator-y-axis",
						showInLegend: !1,
						stacking: void 0,
						isInternal: !0,
						states: {
							inactive: {
								opacity: 1
							}
						}
					},
					h = c.series = (c.series || []).filter(function(a) {
						var b = a.baseSeries;
						return 0 > f.indexOf(b) ? (b && (m(b, "updatedData", c
								.updatedDataHandler),
							delete b.navigatorSeries), a.chart && a.destroy(), !1) : !0
					}),
					l, g, p = c.navigatorOptions.series,
					q;
				f && f.length && f.forEach(function(a) {
					var m = a.navigatorSeries,
						v = G({
							color: a.color,
							visible: a.visible
						}, K(p) ? t.navigator.series : p);
					m && !1 === c.navigatorOptions.adaptToUpdatedData || (k.name =
						"Navigator " + f.length, l = a.options || {}, q = l
						.navigatorOptions || {}, v.dataLabels = e(v.dataLabels), g = n(
							l, k, v, q), g.pointRange = u(v.pointRange, q.pointRange, t
							.plotOptions[g.type || "line"].pointRange), v = q.data || v
						.data, c.hasNavigatorData = c.hasNavigatorData ||
						!!v, g.data = v || l.data && l.data.slice(0), m && m.options ? m
						.update(g, b) : (a.navigatorSeries = d.initSeries(g), a
							.navigatorSeries.baseSeries = a, h.push(a.navigatorSeries)))
				});
				if (p.data && (!f || !f.length) || K(p)) c.hasNavigatorData = !1, p = e(p), p
					.forEach(function(a, b) {
						k.name = "Navigator " + (h.length + 1);
						g = n(t.navigator.series, {
							color: d.series[b] && !d.series[b].options.isInternal && d
								.series[b].color || d.options.colors[b] || d.options
								.colors[0]
						}, k, a);
						g.data = a.data;
						g.data && (c.hasNavigatorData = !0, h.push(d.initSeries(g)))
					});
				a && this.addBaseSeriesEvents()
			};
			b.prototype.addBaseSeriesEvents = function() {
				var a = this,
					b = this,
					c = b.baseSeries || [];
				c[0] && c[0].xAxis && c[0].eventsToUnbind.push(l(c[0].xAxis, "foundExtremes", this
					.modifyBaseAxisExtremes));
				c.forEach(function(c) {
					c.eventsToUnbind.push(l(c, "show", function() {
						this.navigatorSeries && this.navigatorSeries.setVisible(
							!0, !1)
					}));
					c.eventsToUnbind.push(l(c, "hide", function() {
						this.navigatorSeries && this.navigatorSeries.setVisible(
							!1, !1)
					}));
					!1 !== a.navigatorOptions.adaptToUpdatedData && c.xAxis && c
						.eventsToUnbind.push(l(c, "updatedData",
							a.updatedDataHandler));
					c.eventsToUnbind.push(l(c, "remove", function() {
						this.navigatorSeries && (D(b.series, this
								.navigatorSeries), f(this.navigatorSeries
								.options) && this.navigatorSeries.remove(!
							1), delete this.navigatorSeries)
					}))
				})
			};
			b.prototype.getBaseSeriesMin = function(a) {
				return this.baseSeries.reduce(function(a, b) {
					return Math.min(a, b.xData && b.xData.length ? b.xData[0] : a)
				}, a)
			};
			b.prototype.modifyNavigatorAxisExtremes = function() {
				var a = this.xAxis;
				if ("undefined" !== typeof a.getExtremes) {
					var b = this.getUnionExtremes(!0);
					!b || b.dataMin === a.min && b.dataMax === a.max || (a.min = b.dataMin, a.max =
						b.dataMax)
				}
			};
			b.prototype.modifyBaseAxisExtremes = function() {
				var a = this.chart.navigator,
					b = this.getExtremes(),
					c = b.dataMin,
					e = b.dataMax;
				b = b.max - b.min;
				var d = a.stickToMin,
					f = a.stickToMax,
					h = u(this.options.overscroll, 0),
					l = a.series && a.series[0],
					m = !!this.setExtremes;
				if (!this.eventArgs || "rangeSelectorButton" !== this.eventArgs.trigger) {
					if (d) {
						var g = c;
						var n = g + b
					}
					f && (n = e + h, d || (g = Math.max(c, n - b, a.getBaseSeriesMin(l && l.xData ?
						l.xData[0] : -Number.MAX_VALUE))));
					m && (d || f) && w(g) && (this.min = this.userMin = g, this.max = this.userMax =
						n)
				}
				a.stickToMin = a.stickToMax = null
			};
			b.prototype.updatedDataHandler = function() {
				var a = this.chart.navigator,
					b = this.navigatorSeries;
				a.stickToMax = u(this.chart.options.navigator && this.chart.options.navigator
					.stickToMax, a.reversedExtremes ? 0 === Math.round(a.zoomedMin) : Math
					.round(a.zoomedMax) >= Math.round(a.size));
				a.stickToMin = a.shouldStickToMin(this, a);
				b && !a.hasNavigatorData && (b.options.pointStart = this.xData[0], b.setData(this
					.options.data, !1, null,
					!1))
			};
			b.prototype.shouldStickToMin = function(a, b) {
				b = b.getBaseSeriesMin(a.xData[0]);
				var c = a.xAxis;
				a = c.max;
				var e = c.min;
				c = c.options.range;
				return w(a) && w(e) ? c && 0 < a - b ? a - b < c : e <= b : !1
			};
			b.prototype.addChartEvents = function() {
				this.eventsToUnbind || (this.eventsToUnbind = []);
				this.eventsToUnbind.push(l(this.chart, "redraw", function() {
					var a = this.navigator,
						b = a && (a.baseSeries && a.baseSeries[0] && a.baseSeries[0]
							.xAxis || this.xAxis[0]);
					b && a.render(b.min, b.max)
				}), l(this.chart, "getMargins", function() {
					var a = this.navigator,
						b =
						a.opposite ? "plotTop" : "marginBottom";
					this.inverted && (b = a.opposite ? "marginRight" : "plotLeft");
					this[b] = (this[b] || 0) + (a.navigatorEnabled || !this.inverted ? a
						.outlineHeight : 0) + a.navigatorOptions.margin
				}))
			};
			b.prototype.destroy = function() {
				var a = this;
				this.removeEvents();
				this.xAxis && (D(this.chart.xAxis, this.xAxis), D(this.chart.axes, this.xAxis));
				this.yAxis && (D(this.chart.yAxis, this.yAxis), D(this.chart.axes, this.yAxis));
				(this.series || []).forEach(function(a) {
					a.destroy && a.destroy()
				});
				"series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered"
				.split(" ").forEach(function(b) {
					a[b] &&
						a[b].destroy && a[b].destroy();
					a[b] = null
				});
				[this.handles].forEach(function(a) {
					c(a)
				})
			};
			return b
		}()
	});
	I(g, "Stock/RangeSelector/RangeSelectorDefaults.js", [], function() {
		return {
			lang: {
				rangeSelectorZoom: "Zoom",
				rangeSelectorFrom: "",
				rangeSelectorTo: "\u2192"
			},
			rangeSelector: {
				allButtonsEnabled: !1,
				buttons: void 0,
				buttonSpacing: 5,
				dropdown: "responsive",
				enabled: void 0,
				verticalAlign: "top",
				buttonTheme: {
					width: 28,
					height: 18,
					padding: 2,
					zIndex: 7
				},
				floating: !1,
				x: 0,
				y: 0,
				height: void 0,
				inputBoxBorderColor: "none",
				inputBoxHeight: 17,
				inputBoxWidth: void 0,
				inputDateFormat: "%b %e, %Y",
				inputDateParser: void 0,
				inputEditDateFormat: "%Y-%m-%d",
				inputEnabled: !0,
				inputPosition: {
					align: "right",
					x: 0,
					y: 0
				},
				inputSpacing: 5,
				selected: void 0,
				buttonPosition: {
					align: "left",
					x: 0,
					y: 0
				},
				inputStyle: {
					color: "#335cad",
					cursor: "pointer"
				},
				labelStyle: {
					color: "#666666"
				}
			}
		}
	});
	I(g, "Stock/RangeSelector/RangeSelectorComposition.js", [g["Core/Defaults.js"], g[
		"Stock/RangeSelector/RangeSelectorDefaults.js"], g["Core/Utilities.js"]], function(d, g, z) {
		function B() {
			var c = this.range,
				e = c.type,
				b = this.max,
				a = this.chart.time,
				d = function(b, c) {
					var d = "year" === e ? "FullYear" : "Month",
						f = new a.Date(b),
						k = a.get(d, f);
					a.set(d, f, k + c);
					k === a.get(d, f) && a.set("Date", f, 0);
					return f.getTime() - b
				};
			if (G(c)) {
				var f = b - c;
				var h = c
			} else c && (f = b + d(b, -(c.count || 1)), this.chart && (this.chart.fixedRange = b - f));
			var l = K(this.dataMin, Number.MIN_VALUE);
			G(f) || (f = l);
			f <= l && (f = l, "undefined" === typeof h && (h = d(f, c.count)), this.newMax = Math.min(f + h,
				K(this.dataMax, Number.MAX_VALUE)));
			G(b) ? !G(c) && c && c._offsetMin && (f += c._offsetMin) : f =
				void 0;
			return f
		}

		function y() {
			this.options.rangeSelector && this.options.rangeSelector.enabled && (this.rangeSelector = new u(
				this))
		}

		function C() {
			var c = this.axes,
				e = this.rangeSelector;
			e && (G(e.deferredYTDClick) && (e.clickButton(e.deferredYTDClick), delete e.deferredYTDClick), c
				.forEach(function(b) {
					b.updateNames();
					b.setScale()
				}), this.getAxisMargins(), e.render(), c = e.options.verticalAlign, e.options
				.floating || ("bottom" === c ? this.extraBottomMargin = !0 : "middle" !== c && (this
					.extraTopMargin = !0)))
		}

		function A(c) {
			var e, b, a,
				d, f = c.rangeSelector,
				h = function() {
					f && (e = c.xAxis[0].getExtremes(), b = c.legend, d = f && f.options.verticalAlign, G(e
							.min) && f.render(e.min, e.max), b.display && "top" === d && d === b.options
						.verticalAlign && (a = H(c.spacingBox), a.y = "vertical" === b.options.layout ?
							c.plotTop : a.y + f.getHeight(), b.group.placed = !1, b.align(a)))
				};
			f && (D(w, function(a) {
				return a[0] === c
			}) || w.push([c, [p(c.xAxis[0], "afterSetExtremes", function(a) {
				f && f.render(a.min, a.max)
			}), p(c, "redraw", h)]]), h())
		}

		function x() {
			for (var c = 0, e = w.length; c < e; ++c) {
				var b = w[c];
				if (b[0] === this) {
					b[1].forEach(function(a) {
						return a()
					});
					w.splice(c, 1);
					break
				}
			}
		}

		function t() {
			var c = this.rangeSelector;
			c && (c = c.getHeight(), this.extraTopMargin && (this.plotTop += c), this.extraBottomMargin && (
				this.marginBottom += c))
		}

		function r() {
			var c = this.rangeSelector;
			c && !c.options.floating && (c.render(), c = c.options.verticalAlign, "bottom" === c ? this
				.extraBottomMargin = !0 : "middle" !== c && (this.extraTopMargin = !0))
		}

		function h(c) {
			var e = c.options.rangeSelector;
			c = this.extraBottomMargin;
			var b = this.extraTopMargin,
				a = this.rangeSelector;
			e && e.enabled && !f(a) && this.options.rangeSelector && (this.options.rangeSelector.enabled = !
				0, this.rangeSelector = a = new u(this));
			this.extraTopMargin = this.extraBottomMargin = !1;
			a && (A(this), e = e && e.verticalAlign || a.options && a.options.verticalAlign, a.options
					.floating || ("bottom" === e ? this.extraBottomMargin = !0 : "middle" !== e && (this
						.extraTopMargin = !0)), this.extraBottomMargin !== c || this.extraTopMargin !== b
					) && (this.isDirtyBox = !0)
		}
		var l = d.defaultOptions,
			q = d.setOptions,
			p = z.addEvent,
			f = z.defined,
			c = z.extend,
			D = z.find,
			G = z.isNumber,
			H = z.merge,
			K = z.pick,
			w = [],
			n = [],
			u;
		return {
			compose: function(d, e, b) {
				u = b; - 1 === n.indexOf(d) && (n.push(d), d.prototype.minFromRange = B); - 1 === n
					.indexOf(e) && (n.push(e), p(e, "afterGetContainer", y), p(e, "beforeRender", C), p(
						e, "destroy", x), p(e, "getMargins", t), p(e, "render", r), p(e, "update",
						h), e.prototype.callbacks.push(A)); - 1 === n.indexOf(q) && (c(l, {
					rangeSelector: g.rangeSelector
				}), c(l.lang, g.lang))
			}
		}
	});
	I(g, "Stock/RangeSelector/RangeSelector.js", [g["Core/Axis/Axis.js"], g["Core/Defaults.js"], g[
			"Core/Globals.js"], g["Stock/RangeSelector/RangeSelectorComposition.js"],
		g["Core/Renderer/SVG/SVGElement.js"], g["Core/Utilities.js"]
	], function(d, g, z, B, y, C) {
		function A(c) {
			if (-1 !== c.indexOf("%L")) return "text";
			var e = "aAdewbBmoyY".split("").some(function(a) {
					return -1 !== c.indexOf("%" + a)
				}),
				b = "HkIlMS".split("").some(function(a) {
					return -1 !== c.indexOf("%" + a)
				});
			return e && b ? "datetime-local" : e ? "date" : b ? "time" : "text"
		}
		var x = g.defaultOptions,
			t = C.addEvent,
			r = C.createElement,
			h = C.css,
			l = C.defined,
			q = C.destroyObjectProperties,
			p = C.discardElement,
			f = C.extend,
			c = C.fireEvent,
			D = C.isNumber,
			G = C.merge,
			H = C.objectEach,
			K = C.pad,
			w = C.pick,
			n = C.pInt,
			u = C.splat;
		g = function() {
			function g(c) {
				this.buttons = void 0;
				this.buttonOptions = g.prototype.defaultButtons;
				this.initialButtonGroupWidth = 0;
				this.options = void 0;
				this.chart = c;
				this.init(c)
			}
			g.compose = function(c, b) {
				B.compose(c, b, g)
			};
			g.prototype.clickButton = function(e, b) {
				var a = this.chart,
					f = this.buttonOptions[e],
					h = a.xAxis[0],
					g = a.scroller && a.scroller.getUnionExtremes() || h || {},
					m = f.type,
					n = f.dataGrouping,
					p = g.dataMin,
					q = g.dataMax,
					r = h && Math.round(Math.min(h.max, w(q, h.max)));
				g =
					f._range;
				var E, x = !0;
				if (null !== p && null !== q) {
					a.fixedRange = g;
					this.setSelected(e);
					n && (this.forcedDataGrouping = !0, d.prototype.setDataGrouping.call(h || {
						chart: this.chart
					}, n, !1), this.frozenStates = f.preserveDataGrouping);
					if ("month" === m || "year" === m)
						if (h) {
							m = {
								range: f,
								max: r,
								chart: a,
								dataMin: p,
								dataMax: q
							};
							var A = h.minFromRange.call(m);
							D(m.newMax) && (r = m.newMax);
							x = !1
						} else g = f;
					else if (g) A = Math.max(r - g, p), r = Math.min(A + g, q), x = !1;
					else if ("ytd" === m)
						if (h) {
							if ("undefined" === typeof q || "undefined" === typeof p) p = Number
								.MAX_VALUE,
								q = Number.MIN_VALUE, a.series.forEach(function(a) {
									if (a = a.xData) p = Math.min(a[0], p), q = Math.max(a[a
										.length - 1], q)
								}), b = !1;
							m = this.getYTDExtremes(q, p, a.time.useUTC);
							A = E = m.min;
							r = m.max
						} else {
							this.deferredYTDClick = e;
							return
						}
					else "all" === m && h && (a.navigator && a.navigator.baseSeries[0] && (a
							.navigator.baseSeries[0].xAxis.options.range = void 0), A = p, r =
						q);
					x && f._offsetMin && l(A) && (A += f._offsetMin);
					f._offsetMax && l(r) && (r += f._offsetMax);
					this.dropdown && (this.dropdown.selectedIndex = e + 1);
					if (h) h.setExtremes(A, r, w(b, !0), void 0, {
						trigger: "rangeSelectorButton",
						rangeSelectorButton: f
					});
					else {
						var y = u(a.options.xAxis)[0];
						var C = y.range;
						y.range = g;
						var z = y.min;
						y.min = E;
						t(a, "load", function() {
							y.range = C;
							y.min = z
						})
					}
					c(this, "afterBtnClick")
				}
			};
			g.prototype.setSelected = function(c) {
				this.selected = this.options.selected = c
			};
			g.prototype.init = function(e) {
				var b = this,
					a = e.options.rangeSelector,
					d = a.buttons || b.defaultButtons.slice(),
					f = a.selected,
					h = function() {
						var a = b.minInput,
							e = b.maxInput;
						a && a.blur && c(a, "blur");
						e && e.blur && c(e, "blur")
					};
				b.chart = e;
				b.options = a;
				b.buttons = [];
				b.buttonOptions =
					d;
				this.eventsToUnbind = [];
				this.eventsToUnbind.push(t(e.container, "mousedown", h));
				this.eventsToUnbind.push(t(e, "resize", h));
				d.forEach(b.computeButtonRange);
				"undefined" !== typeof f && d[f] && this.clickButton(f, !1);
				this.eventsToUnbind.push(t(e, "load", function() {
					e.xAxis && e.xAxis[0] && t(e.xAxis[0], "setExtremes", function(a) {
						this.max - this.min !== e.fixedRange &&
							"rangeSelectorButton" !== a.trigger &&
							"updatedData" !== a.trigger && b
							.forcedDataGrouping && !b.frozenStates && this
							.setDataGrouping(!1, !1)
					})
				}))
			};
			g.prototype.updateButtonStates =
				function() {
					var c = this,
						b = this.chart,
						a = this.dropdown,
						d = b.xAxis[0],
						f = Math.round(d.max - d.min),
						h = !d.hasVisibleSeries,
						l = b.scroller && b.scroller.getUnionExtremes() || d,
						g = l.dataMin,
						m = l.dataMax;
					b = c.getYTDExtremes(m, g, b.time.useUTC);
					var n = b.min,
						p = b.max,
						q = c.selected,
						u = c.options.allButtonsEnabled,
						w = c.buttons,
						r = D(q);
					c.buttonOptions.forEach(function(b, e) {
						var k = b._range,
							l = b.type,
							v = b.count || 1,
							t = w[e],
							E = b._offsetMax - b._offsetMin,
							x = e === q,
							D = k > m - g,
							F = k < d.minRange;
						b = 0;
						var A = !1,
							y = !1;
						k = k === f;
						("month" === l || "year" === l) && f + 36E5 >=
							864E5 * {
								month: 28,
								year: 365
							} [l] * v - E && f - 36E5 <= 864E5 * {
								month: 31,
								year: 366
							} [l] * v + E ? k = !0 : "ytd" === l ? (k = p - n + E === f, A = !
							x) : "all" === l && (k = d.max - d.min >= m - g, y = !x && r && k);
						l = !u && (D || F || y || h);
						v = x && k || k && !r && !A || x && c.frozenStates;
						l ? b = 3 : v && (r = !0, b = 2);
						t.state !== b && (t.setState(b), a && (a.options[e + 1].disabled = l,
								2 === b && (a.selectedIndex = e + 1)), 0 === b && q === e &&
							c.setSelected())
					})
				};
			g.prototype.computeButtonRange = function(c) {
				var b = c.type,
					a = c.count || 1,
					e = {
						millisecond: 1,
						second: 1E3,
						minute: 6E4,
						hour: 36E5,
						day: 864E5,
						week: 6048E5
					};
				if (e[b]) c._range =
					e[b] * a;
				else if ("month" === b || "year" === b) c._range = 864E5 * {
					month: 30,
					year: 365
				} [b] * a;
				c._offsetMin = w(c.offsetMin, 0);
				c._offsetMax = w(c.offsetMax, 0);
				c._range += c._offsetMax - c._offsetMin
			};
			g.prototype.getInputValue = function(c) {
				c = "min" === c ? this.minInput : this.maxInput;
				var b = this.chart.options.rangeSelector,
					a = this.chart.time;
				return c ? ("text" === c.type && b.inputDateParser || this.defaultInputDateParser)(c
					.value, a.useUTC, a) : 0
			};
			g.prototype.setInputValue = function(c, b) {
				var a = this.options,
					e = this.chart.time,
					d = "min" === c ? this.minInput :
					this.maxInput;
				c = "min" === c ? this.minDateBox : this.maxDateBox;
				if (d) {
					var f = d.getAttribute("data-hc-time");
					f = l(f) ? Number(f) : void 0;
					l(b) && (l(f) && d.setAttribute("data-hc-time-previous", f), d.setAttribute(
						"data-hc-time", b), f = b);
					d.value = e.dateFormat(this.inputTypeFormats[d.type] || a.inputEditDateFormat,
						f);
					c && c.attr({
						text: e.dateFormat(a.inputDateFormat, f)
					})
				}
			};
			g.prototype.setInputExtremes = function(c, b, a) {
				if (c = "min" === c ? this.minInput : this.maxInput) {
					var e = this.inputTypeFormats[c.type],
						d = this.chart.time;
					e && (b = d.dateFormat(e,
							b), c.min !== b && (c.min = b), a = d.dateFormat(e, a), c.max !==
						a && (c.max = a))
				}
			};
			g.prototype.showInput = function(c) {
				var b = "min" === c ? this.minDateBox : this.maxDateBox;
				if ((c = "min" === c ? this.minInput : this.maxInput) && b && this.inputGroup) {
					var a = "text" === c.type,
						e = this.inputGroup,
						d = e.translateX;
					e = e.translateY;
					var f = this.options.inputBoxWidth;
					h(c, {
						width: a ? b.width + (f ? -2 : 20) + "px" : "auto",
						height: a ? b.height - 2 + "px" : "auto",
						border: "2px solid silver"
					});
					a && f ? h(c, {
						left: d + b.x + "px",
						top: e + "px"
					}) : h(c, {
						left: Math.min(Math.round(b.x + d - (c.offsetWidth -
								b.width) / 2), this.chart.chartWidth - c.offsetWidth) +
							"px",
						top: e - (c.offsetHeight - b.height) / 2 + "px"
					})
				}
			};
			g.prototype.hideInput = function(c) {
				(c = "min" === c ? this.minInput : this.maxInput) && h(c, {
					top: "-9999em",
					border: 0,
					width: "1px",
					height: "1px"
				})
			};
			g.prototype.defaultInputDateParser = function(c, b, a) {
				var e = c.split("/").join("-").split(" ").join("T"); - 1 === e.indexOf("T") && (e +=
					"T00:00");
				if (b) e += "Z";
				else {
					var d;
					if (d = z.isSafari) d = e, d = !(6 < d.length && (d.lastIndexOf("-") === d
						.length - 6 || d.lastIndexOf("+") === d.length - 6));
					d && (d = (new Date(e)).getTimezoneOffset() /
						60, e += 0 >= d ? "+".concat(K(-d), ":00") : "-".concat(K(d), ":00"))
				}
				e = Date.parse(e);
				D(e) || (c = c.split("-"), e = Date.UTC(n(c[0]), n(c[1]) - 1, n(c[2])));
				a && b && D(e) && (e += a.getTimezoneOffset(e));
				return e
			};
			g.prototype.drawInput = function(c) {
				function b() {
					var b = l.maxInput,
						e = l.minInput,
						d = a.xAxis[0],
						f = a.scroller && a.scroller.xAxis ? a.scroller.xAxis : d,
						k = f.dataMin;
					f = f.dataMax;
					var h = l.getInputValue(c);
					h !== Number(u.getAttribute("data-hc-time-previous")) && D(h) && (u
						.setAttribute("data-hc-time-previous", h), p && b && D(k) ? h > Number(b
							.getAttribute("data-hc-time")) ?
						h = void 0 : h < k && (h = k) : e && D(f) && (h < Number(e.getAttribute(
							"data-hc-time")) ? h = void 0 : h > f && (h = f)), "undefined" !==
						typeof h && d.setExtremes(p ? h : d.min, p ? d.max : h, void 0,
						void 0, {
							trigger: "rangeSelectorInput"
						}))
				}
				var a = this.chart,
					e = this.div,
					d = this.inputGroup,
					l = this,
					g = a.renderer.style || {},
					m = a.renderer,
					n = a.options.rangeSelector,
					p = "min" === c,
					q = x.lang[p ? "rangeSelectorFrom" : "rangeSelectorTo"] || "";
				q = m.label(q, 0).addClass("highcharts-range-label").attr({
					padding: q ? 2 : 0,
					height: q ? n.inputBoxHeight : 0
				}).add(d);
				m = m.label("", 0).addClass("highcharts-range-input").attr({
					padding: 2,
					width: n.inputBoxWidth,
					height: n.inputBoxHeight,
					"text-align": "center"
				}).on("click", function() {
					l.showInput(c);
					l[c + "Input"].focus()
				});
				a.styledMode || m.attr({
					stroke: n.inputBoxBorderColor,
					"stroke-width": 1
				});
				m.add(d);
				var u = r("input", {
					name: c,
					className: "highcharts-range-selector"
				}, void 0, e);
				u.setAttribute("type", A(n.inputDateFormat || "%b %e, %Y"));
				a.styledMode || (q.css(G(g, n.labelStyle)), m.css(G({
					color: "#333333"
				}, g, n.inputStyle)), h(u, f({
					position: "absolute",
					border: 0,
					boxShadow: "0 0 15px rgba(0,0,0,0.3)",
					width: "1px",
					height: "1px",
					padding: 0,
					textAlign: "center",
					fontSize: g.fontSize,
					fontFamily: g.fontFamily,
					top: "-9999em"
				}, n.inputStyle)));
				u.onfocus = function() {
					l.showInput(c)
				};
				u.onblur = function() {
					u === z.doc.activeElement && b();
					l.hideInput(c);
					l.setInputValue(c);
					u.blur()
				};
				var w = !1;
				u.onchange = function() {
					w || (b(), l.hideInput(c), u.blur())
				};
				u.onkeypress = function(a) {
					13 === a.keyCode && b()
				};
				u.onkeydown = function(a) {
					w = !0;
					38 !== a.keyCode && 40 !== a.keyCode || b()
				};
				u.onkeyup = function() {
					w = !1
				};
				return {
					dateBox: m,
					input: u,
					label: q
				}
			};
			g.prototype.getPosition =
				function() {
					var c = this.chart,
						b = c.options.rangeSelector;
					c = "top" === b.verticalAlign ? c.plotTop - c.axisOffset[0] : 0;
					return {
						buttonTop: c + b.buttonPosition.y,
						inputTop: c + b.inputPosition.y - 10
					}
				};
			g.prototype.getYTDExtremes = function(c, b, a) {
				var e = this.chart.time,
					d = new e.Date(c),
					f = e.get("FullYear", d);
				a = a ? e.Date.UTC(f, 0, 1) : +new e.Date(f, 0, 1);
				b = Math.max(b, a);
				d = d.getTime();
				return {
					max: Math.min(c || d, d),
					min: b
				}
			};
			g.prototype.render = function(c, b) {
				var a = this.chart,
					e = a.renderer,
					d = a.container,
					f = a.options,
					h = f.rangeSelector,
					g = w(f.chart.style &&
						f.chart.style.zIndex, 0) + 1;
				f = h.inputEnabled;
				if (!1 !== h.enabled) {
					this.rendered || (this.group = e.g("range-selector-group").attr({
							zIndex: 7
						}).add(), this.div = r("div", void 0, {
							position: "relative",
							height: 0,
							zIndex: g
						}), this.buttonOptions.length && this.renderButtons(), d.parentNode && d
						.parentNode.insertBefore(this.div, d), f && (this.inputGroup = e.g(
								"input-group").add(this.group), e = this.drawInput("min"), this
							.minDateBox = e.dateBox, this.minLabel = e.label, this.minInput = e
							.input, e = this.drawInput("max"), this.maxDateBox = e.dateBox,
							this.maxLabel = e.label, this.maxInput = e.input));
					if (f && (this.setInputValue("min", c), this.setInputValue("max", b), c = a
							.scroller && a.scroller.getUnionExtremes() || a.xAxis[0] || {}, l(c
								.dataMin) && l(c.dataMax) && (a = a.xAxis[0].minRange || 0, this
								.setInputExtremes("min", c.dataMin, Math.min(c.dataMax, this
									.getInputValue("max")) - a), this.setInputExtremes("max", Math
									.max(c.dataMin, this.getInputValue("min")) + a, c.dataMax)),
							this.inputGroup)) {
						var m = 0;
						[this.minLabel, this.minDateBox, this.maxLabel, this.maxDateBox].forEach(
							function(a) {
								if (a) {
									var b =
										a.getBBox().width;
									b && (a.attr({
										x: m
									}), m += b + h.inputSpacing)
								}
							})
					}
					this.alignElements();
					this.rendered = !0
				}
			};
			g.prototype.renderButtons = function() {
				var e = this,
					b = this.buttons,
					a = this.options,
					d = x.lang,
					f = this.chart.renderer,
					h = G(a.buttonTheme),
					l = h && h.states,
					g = h.width || 28;
				delete h.width;
				delete h.states;
				this.buttonGroup = f.g("range-selector-buttons").add(this.group);
				var m = this.dropdown = r("select", void 0, {
					position: "absolute",
					width: "1px",
					height: "1px",
					padding: 0,
					border: 0,
					top: "-9999em",
					cursor: "pointer",
					opacity: .0001
				}, this.div);
				t(m, "touchstart", function() {
					m.style.fontSize = "16px"
				});
				[
					[z.isMS ? "mouseover" : "mouseenter"],
					[z.isMS ? "mouseout" : "mouseleave"],
					["change", "click"]
				].forEach(function(a) {
					var d = a[0],
						f = a[1];
					t(m, d, function() {
						var a = b[e.currentButtonIndex()];
						a && c(a.element, f || d)
					})
				});
				this.zoomText = f.label(d && d.rangeSelectorZoom || "", 0).attr({
					padding: a.buttonTheme.padding,
					height: a.buttonTheme.height,
					paddingLeft: 0,
					paddingRight: 0
				}).add(this.buttonGroup);
				this.chart.styledMode || (this.zoomText.css(a.labelStyle), h["stroke-width"] = w(h[
						"stroke-width"],
					0));
				r("option", {
					textContent: this.zoomText.textStr,
					disabled: !0
				}, void 0, m);
				this.buttonOptions.forEach(function(a, c) {
					r("option", {
						textContent: a.title || a.text
					}, void 0, m);
					b[c] = f.button(a.text, 0, 0, function(b) {
						var d = a.events && a.events.click,
							f;
						d && (f = d.call(a, b));
						!1 !== f && e.clickButton(c);
						e.isActive = !0
					}, h, l && l.hover, l && l.select, l && l.disabled).attr({
						"text-align": "center",
						width: g
					}).add(e.buttonGroup);
					a.title && b[c].attr("title", a.title)
				})
			};
			g.prototype.alignElements = function() {
				var c = this,
					b = this.buttonGroup,
					a = this.buttons,
					d = this.chart,
					f = this.group,
					h = this.inputGroup,
					l = this.options,
					g = this.zoomText,
					m = d.options,
					n = m.exporting && !1 !== m.exporting.enabled && m.navigation && m.navigation
					.buttonOptions;
				m = l.buttonPosition;
				var p = l.inputPosition,
					q = l.verticalAlign,
					u = function(a, b) {
						return n && c.titleCollision(d) && "top" === q && "right" === b.align && b
							.y - a.getBBox().height - 12 < (n.y || 0) + (n.height || 0) + d.spacing[
								0] ? -40 : 0
					},
					r = d.plotLeft;
				if (f && m && p) {
					var t = m.x - d.spacing[3];
					if (b) {
						this.positionButtons();
						if (!this.initialButtonGroupWidth) {
							var x = 0;
							g && (x += g.getBBox().width +
								5);
							a.forEach(function(b, c) {
								x += b.width;
								c !== a.length - 1 && (x += l.buttonSpacing)
							});
							this.initialButtonGroupWidth = x
						}
						r -= d.spacing[3];
						this.updateButtonStates();
						g = u(b, m);
						this.alignButtonGroup(g);
						f.placed = b.placed = d.hasLoaded
					}
					b = 0;
					h && (b = u(h, p), "left" === p.align ? t = r : "right" === p.align && (t = -
						Math.max(d.axisOffset[1], -b)), h.align({
						y: p.y,
						width: h.getBBox().width,
						align: p.align,
						x: p.x + t - 2
					}, !0, d.spacingBox), h.placed = d.hasLoaded);
					this.handleCollision(b);
					f.align({
						verticalAlign: q
					}, !0, d.spacingBox);
					h = f.alignAttr.translateY;
					b =
						f.getBBox().height + 20;
					u = 0;
					"bottom" === q && (u = (u = d.legend && d.legend.options) && "bottom" === u
						.verticalAlign && u.enabled && !u.floating ? d.legend.legendHeight + w(u
							.margin, 10) : 0, b = b + u - 20, u = h - b - (l.floating ? 0 : l
						.y) - (d.titleOffset ? d.titleOffset[2] : 0) - 10);
					if ("top" === q) l.floating && (u = 0), d.titleOffset && d.titleOffset[0] && (
						u = d.titleOffset[0]), u += d.margin[0] - d.spacing[0] || 0;
					else if ("middle" === q)
						if (p.y === m.y) u = h;
						else if (p.y || m.y) u = 0 > p.y || 0 > m.y ? u - Math.min(p.y, m.y) : h -
					b;
					f.translate(l.x, l.y + Math.floor(u));
					m = this.minInput;
					p =
						this.maxInput;
					h = this.dropdown;
					l.inputEnabled && m && p && (m.style.marginTop = f.translateY + "px", p.style
						.marginTop = f.translateY + "px");
					h && (h.style.marginTop = f.translateY + "px")
				}
			};
			g.prototype.alignButtonGroup = function(c, b) {
				var a = this.chart,
					e = this.buttonGroup,
					d = this.options.buttonPosition,
					f = a.plotLeft - a.spacing[3],
					h = d.x - a.spacing[3];
				"right" === d.align ? h += c - f : "center" === d.align && (h -= f / 2);
				e && e.align({
					y: d.y,
					width: w(b, this.initialButtonGroupWidth),
					align: d.align,
					x: h
				}, !0, a.spacingBox)
			};
			g.prototype.positionButtons = function() {
				var c =
					this.buttons,
					b = this.chart,
					a = this.options,
					d = this.zoomText,
					f = b.hasLoaded ? "animate" : "attr",
					h = a.buttonPosition,
					l = b = b.plotLeft;
				d && "hidden" !== d.visibility && (d[f]({
					x: w(b + h.x, b)
				}), l += h.x + d.getBBox().width + 5);
				d = 0;
				for (h = this.buttonOptions.length; d < h; ++d)
					if ("hidden" !== c[d].visibility) c[d][f]({
						x: l
					}), l += c[d].width + a.buttonSpacing;
					else c[d][f]({
						x: b
					})
			};
			g.prototype.handleCollision = function(c) {
				var b = this,
					a = this.chart,
					e = this.buttonGroup,
					d = this.inputGroup,
					f = this.options,
					h = f.buttonPosition,
					l = f.dropdown,
					g = f.inputPosition;
				f = function() {
					var a = 0;
					b.buttons.forEach(function(b) {
						b = b.getBBox();
						b.width > a && (a = b.width)
					});
					return a
				};
				var m = function(a) {
						if (d && e) {
							var b = d.alignAttr.translateX + d.alignOptions.x - c + d.getBBox().x +
								2,
								f = d.alignOptions.width,
								k = e.alignAttr.translateX + e.getBBox().x;
							return k + a > b && b + f > k && h.y < g.y + d.getBBox().height
						}
						return !1
					},
					n = function() {
						d && e && d.attr({
							translateX: d.alignAttr.translateX + (a.axisOffset[1] >= -c ?
								0 : -c),
							translateY: d.alignAttr.translateY + e.getBBox().height + 10
						})
					};
				if (e) {
					if ("always" === l) {
						this.collapseButtons(c);
						m(f()) && n();
						return
					}
					"never" === l && this.expandButtons()
				}
				d && e ? g.align === h.align || m(this.initialButtonGroupWidth + 20) ?
					"responsive" === l ? (this.collapseButtons(c), m(f()) && n()) : n() :
					"responsive" === l && this.expandButtons() : e && "responsive" === l && (this
						.initialButtonGroupWidth > a.plotWidth ? this.collapseButtons(c) : this
						.expandButtons())
			};
			g.prototype.collapseButtons = function(c) {
				var b = this.buttons,
					a = this.buttonOptions,
					e = this.chart,
					d = this.dropdown,
					f = this.options,
					h = this.zoomText,
					l = e.userOptions.rangeSelector && e.userOptions.rangeSelector.buttonTheme ||
					{},
					g = function(a) {
						return {
							text: a ? "" + a + " \u25be" : "\u25be",
							width: "auto",
							paddingLeft: w(f.buttonTheme.paddingLeft, l.padding, 8),
							paddingRight: w(f.buttonTheme.paddingRight, l.padding, 8)
						}
					};
				h && h.hide();
				var m = !1;
				a.forEach(function(a, c) {
					c = b[c];
					2 !== c.state ? c.hide() : (c.show(), c.attr(g(a.text)), m = !0)
				});
				m || (d && (d.selectedIndex = 0), b[0].show(), b[0].attr(g(this.zoomText && this
					.zoomText.textStr)));
				a = f.buttonPosition.align;
				this.positionButtons();
				"right" !== a && "center" !== a || this.alignButtonGroup(c, b[this
					.currentButtonIndex()].getBBox().width);
				this.showDropdown()
			};
			g.prototype.expandButtons = function() {
				var c = this.buttons,
					b = this.buttonOptions,
					a = this.options,
					d = this.zoomText;
				this.hideDropdown();
				d && d.show();
				b.forEach(function(b, e) {
					e = c[e];
					e.show();
					e.attr({
						text: b.text,
						width: a.buttonTheme.width || 28,
						paddingLeft: w(a.buttonTheme.paddingLeft, "unset"),
						paddingRight: w(a.buttonTheme.paddingRight, "unset")
					});
					2 > e.state && e.setState(0)
				});
				this.positionButtons()
			};
			g.prototype.currentButtonIndex = function() {
				var c = this.dropdown;
				return c && 0 < c.selectedIndex ? c.selectedIndex -
					1 : 0
			};
			g.prototype.showDropdown = function() {
				var c = this.buttonGroup,
					b = this.buttons,
					a = this.chart,
					d = this.dropdown;
				if (c && d) {
					var f = c.translateX;
					c = c.translateY;
					b = b[this.currentButtonIndex()].getBBox();
					h(d, {
						left: a.plotLeft + f + "px",
						top: c + .5 + "px",
						width: b.width + "px",
						height: b.height + "px"
					});
					this.hasVisibleDropdown = !0
				}
			};
			g.prototype.hideDropdown = function() {
				var c = this.dropdown;
				c && (h(c, {
					top: "-9999em",
					width: "1px",
					height: "1px"
				}), this.hasVisibleDropdown = !1)
			};
			g.prototype.getHeight = function() {
				var c = this.options,
					b = this.group,
					a = c.y,
					d = c.buttonPosition.y,
					f = c.inputPosition.y;
				if (c.height) return c.height;
				this.alignElements();
				c = b ? b.getBBox(!0).height + 13 + a : 0;
				b = Math.min(f, d);
				if (0 > f && 0 > d || 0 < f && 0 < d) c += Math.abs(b);
				return c
			};
			g.prototype.titleCollision = function(c) {
				return !(c.options.title.text || c.options.subtitle.text)
			};
			g.prototype.update = function(c) {
				var b = this.chart;
				G(!0, b.options.rangeSelector, c);
				this.destroy();
				this.init(b);
				this.render()
			};
			g.prototype.destroy = function() {
				var c = this,
					b = c.minInput,
					a = c.maxInput;
				c.eventsToUnbind && (c.eventsToUnbind.forEach(function(a) {
						return a()
					}),
					c.eventsToUnbind = void 0);
				q(c.buttons);
				b && (b.onfocus = b.onblur = b.onchange = null);
				a && (a.onfocus = a.onblur = a.onchange = null);
				H(c, function(a, b) {
					a && "chart" !== b && (a instanceof y ? a.destroy() : a instanceof X
						.HTMLElement && p(a));
					a !== g.prototype[b] && (c[b] = null)
				}, this)
			};
			return g
		}();
		f(g.prototype, {
			defaultButtons: [{
					type: "month",
					count: 1,
					text: "1m",
					title: "View 1 month"
				}, {
					type: "month",
					count: 3,
					text: "3m",
					title: "View 3 months"
				}, {
					type: "month",
					count: 6,
					text: "6m",
					title: "View 6 months"
				}, {
					type: "ytd",
					text: "YTD",
					title: "View year to date"
				},
				{
					type: "year",
					count: 1,
					text: "1y",
					title: "View 1 year"
				}, {
					type: "all",
					text: "All",
					title: "View all"
				}
			],
			inputTypeFormats: {
				"datetime-local": "%Y-%m-%dT%H:%M:%S",
				date: "%Y-%m-%d",
				time: "%H:%M:%S"
			}
		});
		"";
		return g
	});
	I(g, "Series/XRange/XRangeSeriesDefaults.js", [g["Core/Utilities.js"]], function(d) {
		var g = d.correctFloat,
			z = d.isNumber,
			B = d.isObject;
		"";
		return {
			colorByPoint: !0,
			dataLabels: {
				formatter: function() {
					var d = this.point.partialFill;
					B(d) && (d = d.amount);
					if (z(d) && 0 < d) return g(100 * d) + "%"
				},
				inside: !0,
				verticalAlign: "middle"
			},
			tooltip: {
				headerFormat: '<span style="font-size: 10px">{point.x} - {point.x2}</span><br/>',
				pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.yCategory}</b><br/>'
			},
			borderRadius: 3,
			pointRange: 0
		}
	});
	I(g, "Series/XRange/XRangePoint.js", [g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function(d,
		g) {
		var z = this && this.__extends || function() {
				var d = function(g, A) {
					d = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function(d, g) {
						d.__proto__ = g
					} || function(d, g) {
						for (var r in g) g.hasOwnProperty(r) &&
							(d[r] = g[r])
					};
					return d(g, A)
				};
				return function(g, A) {
					function x() {
						this.constructor = g
					}
					d(g, A);
					g.prototype = null === A ? Object.create(A) : (x.prototype = A.prototype, new x)
				}
			}(),
			B = d.series.prototype.pointClass.prototype;
		g = g.extend;
		d = function(d) {
			function g() {
				var g = null !== d && d.apply(this, arguments) || this;
				g.options = void 0;
				g.series = void 0;
				return g
			}
			z(g, d);
			g.getColorByCategory = function(d, g) {
				var t = d.options.colors || d.chart.options.colors;
				d = g.y % (t ? t.length : d.chart.options.chart.colorCount);
				return {
					colorIndex: d,
					color: t && t[d]
				}
			};
			g.prototype.resolveColor = function() {
				var d = this.series;
				if (d.options.colorByPoint && !this.options.color) {
					var x = g.getColorByCategory(d, this);
					d.chart.styledMode || (this.color = x.color);
					this.options.colorIndex || (this.colorIndex = x.colorIndex)
				} else this.color || (this.color = d.color)
			};
			g.prototype.init = function() {
				B.init.apply(this, arguments);
				this.y || (this.y = 0);
				return this
			};
			g.prototype.setState = function() {
				B.setState.apply(this, arguments);
				this.series.drawPoint(this, this.series.getAnimationVerb())
			};
			g.prototype.getLabelConfig =
				function() {
					var d = B.getLabelConfig.call(this),
						g = this.series.yAxis.categories;
					d.x2 = this.x2;
					d.yCategory = this.yCategory = g && g[this.y];
					return d
				};
			g.prototype.isValid = function() {
				return "number" === typeof this.x && "number" === typeof this.x2
			};
			return g
		}(d.seriesTypes.column.prototype.pointClass);
		g(d.prototype, {
			ttBelow: !1,
			tooltipDateKeys: ["x", "x2"]
		});
		"";
		return d
	});
	I(g, "Series/XRange/XRangeSeries.js", [g["Core/Globals.js"], g["Core/Color/Color.js"], g[
			"Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"], g[
			"Series/XRange/XRangeSeriesDefaults.js"],
		g["Series/XRange/XRangePoint.js"]
	], function(d, g, z, B, y, C) {
		function A() {
			if (this.isXAxis) {
				var c = H(this.dataMax, -Number.MAX_VALUE);
				for (var d = 0, f = this.series; d < f.length; d++) {
					var h = f[d];
					if (h.x2Data) {
						var e = 0;
						for (h = h.x2Data; e < h.length; e++) {
							var b = h[e];
							if (b && b > c) {
								c = b;
								var a = !0
							}
						}
					}
				}
				a && (this.dataMax = c)
			}
		}
		var x = this && this.__extends || function() {
			var c = function(d, f) {
				c = Object.setPrototypeOf || {
					__proto__: []
				}
				instanceof Array && function(c, d) {
					c.__proto__ = d
				} || function(c, d) {
					for (var b in d) d.hasOwnProperty(b) && (c[b] = d[b])
				};
				return c(d,
					f)
			};
			return function(d, f) {
				function h() {
					this.constructor = d
				}
				c(d, f);
				d.prototype = null === f ? Object.create(f) : (h.prototype = f.prototype, new h)
			}
		}();
		d = d.noop;
		var t = g.parse,
			r = z.series.prototype,
			h = z.seriesTypes.column,
			l = B.addEvent,
			q = B.clamp,
			p = B.defined;
		g = B.extend;
		var f = B.find,
			c = B.isNumber,
			D = B.isObject,
			G = B.merge,
			H = B.pick,
			K = [];
		B = function(d) {
			function g() {
				var c = null !== d && d.apply(this, arguments) || this;
				c.data = void 0;
				c.options = void 0;
				c.points = void 0;
				return c
			}
			x(g, d);
			g.compose = function(c) {
				-1 === K.indexOf(c) && (K.push(c),
					l(c, "afterGetSeriesExtremes", A))
			};
			g.prototype.init = function() {
				d.prototype.init.apply(this, arguments);
				this.options.stacking = void 0
			};
			g.prototype.getColumnMetrics = function() {
				var c = this,
					f = function() {
						for (var b = 0, a = c.chart.series; b < a.length; b++) {
							var d = a[b],
								e = d.xAxis;
							d.xAxis = d.yAxis;
							d.yAxis = e
						}
					};
				f();
				var e = d.prototype.getColumnMetrics.call(this);
				f();
				return e
			};
			g.prototype.cropData = function(c, d, e, b) {
				d = r.cropData.call(this, this.x2Data, d, e, b);
				d.xData = c.slice(d.start, d.end);
				return d
			};
			g.prototype.findPointIndex =
				function(d) {
					var h = this.cropStart,
						e = this.points,
						b = d.id;
					if (b) var a = (a = f(e, function(a) {
						return a.id === b
					})) ? a.index : void 0;
					"undefined" === typeof a && (a = (a = f(e, function(a) {
						return a.x === d.x && a.x2 === d.x2 && !a.touched
					})) ? a.index : void 0);
					this.cropped && c(a) && c(h) && a >= h && (a -= h);
					return a
				};
			g.prototype.alignDataLabel = function(c) {
				var f = c.plotX;
				c.plotX = H(c.dlBox && c.dlBox.centerX, c.plotX);
				d.prototype.alignDataLabel.apply(this, arguments);
				c.plotX = f
			};
			g.prototype.translatePoint = function(d) {
				var f = this.xAxis,
					e = this.yAxis,
					b =
					this.columnMetrics,
					a = this.options,
					k = a.minPointLength || 0,
					h = (d.shapeArgs && d.shapeArgs.width || 0) / 2,
					l = this.pointXOffset = b.offset,
					g = H(d.x2, d.x + (d.len || 0)),
					n = d.plotX,
					u = f.translate(g, 0, 0, 0, 1);
				g = Math.abs(u - n);
				var r = this.chart.inverted,
					w = H(a.borderWidth, 1) % 2 / 2,
					t = b.offset,
					x = Math.round(b.width);
				k && (k -= g, 0 > k && (k = 0), n -= k / 2, u += k / 2);
				n = Math.max(n, -10);
				u = q(u, -10, f.len + 10);
				p(d.options.pointWidth) && (t -= (Math.ceil(d.options.pointWidth) - x) / 2, x = Math
					.ceil(d.options.pointWidth));
				a.pointPlacement && c(d.plotY) && e.categories &&
					(d.plotY = e.translate(d.y, 0, 1, 0, 1, a.pointPlacement));
				a = Math.floor(Math.min(n, u)) + w;
				a = {
					x: a,
					y: Math.floor(d.plotY + t) + w,
					width: Math.floor(Math.max(n, u)) + w - a,
					height: x,
					r: this.options.borderRadius
				};
				d.shapeArgs = a;
				r ? d.tooltipPos[1] += l + h : d.tooltipPos[0] -= h + l - a.width / 2;
				h = a.x;
				l = h + a.width;
				0 > h || l > f.len ? (h = q(h, 0, f.len), l = q(l, 0, f.len), u = l - h, d.dlBox =
					G(a, {
						x: h,
						width: l - h,
						centerX: u ? u / 2 : null
					})) : d.dlBox = null;
				h = d.tooltipPos;
				l = r ? 1 : 0;
				u = r ? 0 : 1;
				b = this.columnMetrics ? this.columnMetrics.offset : -b.width / 2;
				h[l] = r ? h[l] + a.width / 2 : h[l] +
					(f.reversed ? -1 : 0) * a.width;
				h[u] = q(h[u] + (r ? -1 : 1) * b, 0, e.len - 1);
				if (e = d.partialFill) D(e) && (e = e.amount), c(e) || (e = 0), d.partShapeArgs = G(
					a, {
						r: this.options.borderRadius
					}), n = Math.max(Math.round(g * e + d.plotX - n), 0), d.clipRectArgs = {
					x: f.reversed ? a.x + g - n : a.x,
					y: a.y,
					width: n,
					height: a.height
				}
			};
			g.prototype.translate = function() {
				d.prototype.translate.apply(this, arguments);
				for (var c = 0, f = this.points; c < f.length; c++) this.translatePoint(f[c])
			};
			g.prototype.drawPoint = function(c, d) {
				var e = this.options,
					b = this.chart.renderer,
					a = c.shapeType,
					f = c.shapeArgs,
					h = c.partShapeArgs,
					l = c.clipRectArgs,
					g = e.stacking && !e.borderRadius,
					m = c.state,
					n = e.states[m || "normal"] || {},
					p = "undefined" === typeof m ? "attr" : d;
				m = this.pointAttribs(c, m);
				n = H(this.chart.options.chart.animation, n.animation);
				var q = c.graphic,
					u = c.partialFill;
				if (c.isNull || !1 === c.visible) q && (c.graphic = q.destroy());
				else {
					if (q) q.rect[d](f);
					else c.graphic = q = b.g("point").addClass(c.getClassName()).add(c.group || this
						.group), q.rect = b[a](G(f)).addClass(c.getClassName()).addClass(
						"highcharts-partfill-original").add(q);
					h && (q.partRect ? (q.partRect[d](G(h)), q.partialClipRect[d](G(l))) : (q
						.partialClipRect = b.clipRect(l.x, l.y, l.width, l.height), q
						.partRect = b[a](h).addClass("highcharts-partfill-overlay").add(q)
						.clip(q.partialClipRect)));
					this.chart.styledMode || (q.rect[d](m, n).shadow(e.shadow, null, g), h && (D(
						u) || (u = {}), D(e.partialFill) && (u = G(e.partialFill, u)), c = u
						.fill || t(m.fill).brighten(-.3).get() || t(c.color || this.color)
						.brighten(-.3).get(), m.fill = c, q.partRect[p](m, n).shadow(e
							.shadow, null, g)))
				}
			};
			g.prototype.drawPoints = function() {
				for (var c =
						this.getAnimationVerb(), d = 0, e = this.points; d < e.length; d++) this
					.drawPoint(e[d], c)
			};
			g.prototype.getAnimationVerb = function() {
				return this.chart.pointCount < (this.options.animationLimit || 250) ? "animate" :
					"attr"
			};
			g.prototype.isPointInside = function(c) {
				var f = c.shapeArgs,
					e = c.plotX,
					b = c.plotY;
				return f ? "undefined" !== typeof e && "undefined" !== typeof b && 0 <= b && b <=
					this.yAxis.len && 0 <= (f.x || 0) + (f.width || 0) && e <= this.xAxis.len : d
					.prototype.isPointInside.apply(this, arguments)
			};
			g.defaultOptions = G(h.defaultOptions, y);
			return g
		}(h);
		g(B.prototype, {
			pointClass: C,
			cropShoulder: 1,
			getExtremesFromAll: !0,
			parallelArrays: ["x", "x2", "y"],
			requireSorting: !1,
			type: "xrange",
			animate: r.animate,
			autoIncrement: d,
			buildKDTree: d
		});
		z.registerSeriesType("xrange", B);
		return B
	});
	I(g, "Series/Gantt/GanttPoint.js", [g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function(d,
	g) {
		var z = this && this.__extends || function() {
				var d = function(g, y) {
					d = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function(d, g) {
						d.__proto__ = g
					} || function(d, g) {
						for (var r in g) g.hasOwnProperty(r) &&
							(d[r] = g[r])
					};
					return d(g, y)
				};
				return function(g, y) {
					function x() {
						this.constructor = g
					}
					d(g, y);
					g.prototype = null === y ? Object.create(y) : (x.prototype = y.prototype, new x)
				}
			}(),
			B = g.pick;
		return function(d) {
			function g() {
				var g = null !== d && d.apply(this, arguments) || this;
				g.options = void 0;
				g.series = void 0;
				return g
			}
			z(g, d);
			g.setGanttPointAliases = function(d) {
				function g(g, r) {
					"undefined" !== typeof r && (d[g] = r)
				}
				g("x", B(d.start, d.x));
				g("x2", B(d.end, d.x2));
				g("partialFill", B(d.completed, d.partialFill))
			};
			g.prototype.applyOptions = function(y,
				x) {
				y = d.prototype.applyOptions.call(this, y, x);
				g.setGanttPointAliases(y);
				return y
			};
			g.prototype.isValid = function() {
				return ("number" === typeof this.start || "number" === typeof this.x) && (
					"number" === typeof this.end || "number" === typeof this.x2 || this
					.milestone)
			};
			return g
		}(d.seriesTypes.xrange.prototype.pointClass)
	});
	I(g, "Core/Axis/BrokenAxis.js", [g["Core/Axis/Stacking/StackItem.js"], g["Core/Utilities.js"]], function(d, g) {
		var z = g.addEvent,
			B = g.find,
			y = g.fireEvent,
			C = g.isArray,
			A = g.isNumber,
			x = g.pick,
			t;
		(function(g) {
			function h() {
				"undefined" !==
				typeof this.brokenAxis && this.brokenAxis.setBreaks(this.options.breaks, !1)
			}

			function l() {
				this.brokenAxis && this.brokenAxis.hasBreaks && (this.options.ordinal = !1)
			}

			function q() {
				var c = this.brokenAxis;
				if (c && c.hasBreaks) {
					for (var d = this.tickPositions, f = this.tickPositions.info, h = [], e = 0; e < d
						.length; e++) c.isInAnyBreak(d[e]) || h.push(d[e]);
					this.tickPositions = h;
					this.tickPositions.info = f
				}
			}

			function p() {
				this.brokenAxis || (this.brokenAxis = new K(this))
			}

			function f() {
				var c = this.options.connectNulls,
					d = this.points,
					f = this.xAxis,
					h = this.yAxis;
				if (this.isDirty)
					for (var e = d.length; e--;) {
						var b = d[e],
							a = !(null === b.y && !1 === c) && (f && f.brokenAxis && f.brokenAxis
								.isInAnyBreak(b.x, !0) || h && h.brokenAxis && h.brokenAxis
								.isInAnyBreak(b.y, !0));
						b.visible = a ? !1 : !1 !== b.options.visible
					}
			}

			function c() {
				this.drawBreaks(this.xAxis, ["x"]);
				this.drawBreaks(this.yAxis, x(this.pointArrayMap, ["y"]))
			}

			function r(c, d) {
				var f = this,
					h = f.points,
					e, b, a, k;
				if (c && c.brokenAxis && c.brokenAxis.hasBreaks) {
					var g = c.brokenAxis;
					d.forEach(function(d) {
						e = g && g.breakArray || [];
						b = c.isXAxis ?
							c.min : x(f.options.threshold, c.min);
						h.forEach(function(f) {
							k = x(f["stack" + d.toUpperCase()], f[d]);
							e.forEach(function(d) {
								if (A(b) && A(k)) {
									a = !1;
									if (b < d.from && k > d.to || b > d.from &&
										k < d.from) a = "pointBreak";
									else if (b < d.from && k > d.from && k < d
										.to || b > d.from && k > d.to && k < d
										.from) a = "pointInBreak";
									a && y(c, a, {
										point: f,
										brk: d
									})
								}
							})
						})
					})
				}
			}

			function t() {
				var c = this.currentDataGrouping,
					f = c && c.gapSize;
				c = this.points.slice();
				var h = this.yAxis,
					g = this.options.gapSize,
					e = c.length - 1,
					b;
				if (g && 0 < e)
					for ("value" !== this.options.gapUnit && (g *= this.basePointRange),
						f && f > g && f >= this.basePointRange && (g = f), b = void 0; e--;) b && !1 !==
						b.visible || (b = c[e + 1]), f = c[e], !1 !== b.visible && !1 !== f.visible && (
							b.x - f.x > g && (b = (f.x + b.x) / 2, c.splice(e + 1, 0, {
								isNull: !0,
								x: b
							}), h.stacking && this.options.stacking && (b = h.stacking.stacks[this
								.stackKey][b] = new d(h, h.options.stackLabels, !1, b, this
								.stack), b.total = 0)), b = f);
				return this.getGraphPath(c)
			}
			var H = [];
			g.compose = function(d, g) {
				-1 === H.indexOf(d) && (H.push(d), d.keepProps.push("brokenAxis"), z(d, "init", p),
					z(d, "afterInit", h), z(d, "afterSetTickPositions",
						q), z(d, "afterSetOptions", l));
				if (-1 === H.indexOf(g)) {
					H.push(g);
					var n = g.prototype;
					n.drawBreaks = r;
					n.gappedPath = t;
					z(g, "afterGeneratePoints", f);
					z(g, "afterRender", c)
				}
				return d
			};
			var K = function() {
				function c(c) {
					this.hasBreaks = !1;
					this.axis = c
				}
				c.isInBreak = function(c, d) {
					var f = c.repeat || Infinity,
						e = c.from,
						b = c.to - c.from;
					d = d >= e ? (d - e) % f : f - (e - d) % f;
					return c.inclusive ? d <= b : d < b && 0 !== d
				};
				c.lin2Val = function(d) {
					var f = this.brokenAxis;
					f = f && f.breakArray;
					if (!f || !A(d)) return d;
					var h;
					for (h = 0; h < f.length; h++) {
						var e = f[h];
						if (e.from >=
							d) break;
						else e.to < d ? d += e.len : c.isInBreak(e, d) && (d += e.len)
					}
					return d
				};
				c.val2Lin = function(d) {
					var f = this.brokenAxis;
					f = f && f.breakArray;
					if (!f || !A(d)) return d;
					var h = d,
						e;
					for (e = 0; e < f.length; e++) {
						var b = f[e];
						if (b.to <= d) h -= b.len;
						else if (b.from >= d) break;
						else if (c.isInBreak(b, d)) {
							h -= d - b.from;
							break
						}
					}
					return h
				};
				c.prototype.findBreakAt = function(c, d) {
					return B(d, function(d) {
						return d.from < c && c < d.to
					})
				};
				c.prototype.isInAnyBreak = function(d, f) {
					var h = this.axis,
						e = h.options.breaks || [],
						b = e.length,
						a;
					if (b && A(d)) {
						for (; b--;)
							if (c.isInBreak(e[b],
									d)) {
								var k = !0;
								a || (a = x(e[b].showPoints, !h.isXAxis))
							} var g = k && f ? k && !a : k
					}
					return g
				};
				c.prototype.setBreaks = function(d, f) {
					var h = this,
						e = h.axis,
						b = C(d) && !!d.length;
					e.isDirty = h.hasBreaks !== b;
					h.hasBreaks = b;
					e.options.breaks = e.userOptions.breaks = d;
					e.forceRedraw = !0;
					e.series.forEach(function(a) {
						a.isDirty = !0
					});
					b || e.val2lin !== c.val2Lin || (delete e.val2lin, delete e.lin2val);
					b && (e.userOptions.ordinal = !1, e.lin2val = c.lin2Val, e.val2lin = c
						.val2Lin, e.setExtremes = function(a, b, c, d, f) {
							if (h.hasBreaks) {
								for (var k = this.options.breaks || [], g; g = h
									.findBreakAt(a, k);) a = g.to;
								for (; g = h.findBreakAt(b, k);) b = g.from;
								b < a && (b = a)
							}
							e.constructor.prototype.setExtremes.call(this, a, b, c, d, f)
						}, e.setAxisTranslation = function() {
							e.constructor.prototype.setAxisTranslation.call(this);
							h.unitLength = void 0;
							if (h.hasBreaks) {
								var a = e.options.breaks || [],
									b = [],
									d = [],
									f = x(e.pointRangePadding, 0),
									g = 0,
									l, m = e.userMin || e.min,
									n = e.userMax || e.max,
									p;
								a.forEach(function(a) {
									l = a.repeat || Infinity;
									A(m) && A(n) && (c.isInBreak(a, m) && (m += a
											.to % l - m % l), c.isInBreak(a,
										n) && (n -= n % l - a.from % l))
								});
								a.forEach(function(a) {
									r =
										a.from;
									l = a.repeat || Infinity;
									if (A(m) && A(n)) {
										for (; r - l > m;) r -= l;
										for (; r < m;) r += l;
										for (p = r; p < n; p += l) b.push({
											value: p,
											move: "in"
										}), b.push({
											value: p + a.to - a.from,
											move: "out",
											size: a.breakSize
										})
									}
								});
								b.sort(function(a, b) {
									return a.value === b.value ? ("in" === a.move ?
											0 : 1) - ("in" === b.move ? 0 : 1) : a
										.value - b.value
								});
								var q = 0;
								var r = m;
								b.forEach(function(a) {
									q += "in" === a.move ? 1 : -1;
									1 === q && "in" === a.move && (r = a.value);
									0 === q && A(r) && (d.push({
										from: r,
										to: a.value,
										len: a.value - r - (a.size || 0)
									}), g += a.value - r - (a.size || 0))
								});
								h.breakArray = d;
								A(m) && A(n) &&
									A(e.min) && (h.unitLength = n - m - g + f, y(e,
											"afterBreaks"), e.staticScale ? e.transA = e
										.staticScale : h.unitLength && (e.transA *= (n - e
											.min + f) / h.unitLength), f && (e
											.minPixelPadding = e.transA * (e
												.minPointOffset || 0)), e.min = m, e.max = n
										)
							}
						});
					x(f, !0) && e.chart.redraw()
				};
				return c
			}();
			g.Additions = K
		})(t || (t = {}));
		return t
	});
	I(g, "Core/Axis/GridAxis.js", [g["Core/Axis/Axis.js"], g["Core/Axis/AxisDefaults.js"], g["Core/Globals.js"], g[
		"Core/Utilities.js"]], function(d, g, z, B) {
		function y(a, b) {
			var c = {
				width: 0,
				height: 0
			};
			b.forEach(function(b) {
				b =
					a[b];
				if (B.isObject(b, !0)) {
					var d = B.isObject(b.label, !0) ? b.label : {};
					b = d.getBBox ? d.getBBox().height : 0;
					d.textStr && !k(d.textPxLength) && (d.textPxLength = d.getBBox().width);
					var e = k(d.textPxLength) ? Math.round(d.textPxLength) : 0;
					d.textStr && (e = Math.round(d.getBBox().width));
					c.height = Math.max(b, c.height);
					c.width = Math.max(e, c.width)
				}
			});
			"treegrid" === this.options.type && this.treeGrid && this.treeGrid.mapOfPosToGridNode && (c
				.width += this.options.labels.indentation * ((this.treeGrid.mapOfPosToGridNode[-1]
					.height || 0) - 1));
			return c
		}

		function C() {
			var a = this.grid;
			(a && a.columns || []).forEach(function(a) {
				a.getOffset()
			})
		}

		function A(a) {
			if (!0 === (this.options.grid || {}).enabled) {
				var b = this.axisTitle,
					c = this.height,
					d = this.horiz,
					e = this.left,
					f = this.offset,
					h = this.opposite,
					k = this.options,
					g = this.top,
					l = this.width,
					m = this.tickSize(),
					n = b && b.getBBox().width,
					p = k.title.x,
					q = k.title.y,
					r = F(k.title.margin, d ? 5 : 10);
				b = this.chart.renderer.fontMetrics(k.title.style.fontSize, b).f;
				m = (d ? g + c : e) + (d ? 1 : -1) * (h ? -1 : 1) * (m ? m[0] / 2 : 0) + (this.side === O
					.bottom ? b : 0);
				a.titlePosition.x = d ? e - (n || 0) / 2 - r + p : m + (h ? l : 0) + f + p;
				a.titlePosition.y = d ? m - (h ? c : 0) + (h ? b : -b) / 2 + f + q : g - r + q
			}
		}

		function x() {
			var a = this.chart,
				b = this.options.grid;
			b = void 0 === b ? {} : b;
			var c = this.userOptions;
			if (b.enabled) {
				var f = this.options;
				f.labels.align = F(f.labels.align, "center");
				this.categories || (f.showLastLabel = !1);
				this.labelRotation = 0;
				f.labels.rotation = 0
			}
			if (b.columns) {
				f = this.grid.columns = [];
				for (var h = this.grid.columnIndex = 0; ++h < b.columns.length;) {
					var k = v(c, b.columns[b.columns.length - h - 1], {
						linkedTo: 0,
						type: "category",
						scrollbar: {
							enabled: !1
						}
					});
					delete k.grid.columns;
					k = new d(this.chart, k);
					k.grid.isColumn = !0;
					k.grid.columnIndex = h;
					e(a.axes, k);
					e(a[this.coll], k);
					f.push(k)
				}
			}
		}

		function t() {
			var a = this.grid,
				b = this.options;
			if (!0 === (b.grid || {}).enabled) {
				var c = this.min || 0,
					d = this.max || 0;
				this.maxLabelDimensions = this.getMaxLabelDimensions(this.ticks, this.tickPositions);
				this.rightWall && this.rightWall.destroy();
				if (this.grid && this.grid.isOuterAxis() && this.axisLine) {
					var e = b.lineWidth;
					if (e) {
						e = this.getLinePath(e);
						var f = e[0],
							h = e[1],
							k = ((this.tickSize("tick") || [1])[0] - 1) * (this.side === O.top || this
								.side === O.left ? -1 : 1);
						"M" === f[0] && "L" === h[0] && (this.horiz ? (f[2] += k, h[2] += k) : (f[1] += k,
							h[1] += k));
						!this.horiz && this.chart.marginRight && (f = [f, ["L", this.left, f[2] || 0]],
							k = ["L", this.chart.chartWidth - this.chart.marginRight, this.toPixels(d +
								this.tickmarkOffset)], h = [
								["M", h[1] || 0, this.toPixels(d + this.tickmarkOffset)], k
							], this.grid.upperBorder || 0 === c % 1 || (this.grid.upperBorder = this
								.grid.renderBorder(f)), this.grid.upperBorder && (this.grid.upperBorder
								.attr({
									stroke: b.lineColor,
									"stroke-width": b.lineWidth
								}),
								this.grid.upperBorder.animate({
									d: f
								})), this.grid.lowerBorder || 0 === d % 1 || (this.grid.lowerBorder =
								this.grid.renderBorder(h)), this.grid.lowerBorder && (this.grid
								.lowerBorder.attr({
									stroke: b.lineColor,
									"stroke-width": b.lineWidth
								}), this.grid.lowerBorder.animate({
									d: h
								})));
						this.grid.axisLineExtra ? (this.grid.axisLineExtra.attr({
							stroke: b.lineColor,
							"stroke-width": b.lineWidth
						}), this.grid.axisLineExtra.animate({
							d: e
						})) : this.grid.axisLineExtra = this.grid.renderBorder(e);
						this.axisLine[this.showAxis ? "show" : "hide"]()
					}
				}(a &&
					a.columns || []).forEach(function(a) {
					return a.render()
				});
				if (!this.horiz && this.chart.hasRendered && (this.scrollbar || this.linkedParent && this
						.linkedParent.scrollbar)) {
					a = this.tickmarkOffset;
					b = this.tickPositions[this.tickPositions.length - 1];
					e = this.tickPositions[0];
					for (f = h = void 0;
						(h = this.hiddenLabels.pop()) && h.element;) h.show();
					for (;
						(f = this.hiddenMarks.pop()) && f.element;) f.show();
					(h = this.ticks[e].label) && (c - e > a ? this.hiddenLabels.push(h.hide()) : h.show());
					(h = this.ticks[b].label) && (b - d > a ? this.hiddenLabels.push(h.hide()) :
						h.show());
					(c = this.ticks[b].mark) && b - d < a && 0 < b - d && this.ticks[b].isLast && this
						.hiddenMarks.push(c.hide())
				}
			}
		}

		function r() {
			var a = this.tickPositions && this.tickPositions.info,
				b = this.options,
				c = this.userOptions.labels || {};
			(b.grid || {}).enabled && (this.horiz ? (this.series.forEach(function(a) {
					a.options.pointRange = 0
				}), a && b.dateTimeLabelFormats && b.labels && !m(c.align) && (!1 === b
					.dateTimeLabelFormats[a.unitName].range || 1 < a.count) && (b.labels.align =
					"left", m(c.x) || (b.labels.x = 3))) : "treegrid" !== this.options.type && this
				.grid &&
				this.grid.columns && (this.minPointOffset = this.tickInterval))
		}

		function h(a) {
			var b = this.options;
			a = a.userOptions;
			var c = b && B.isObject(b.grid, !0) ? b.grid : {};
			if (!0 === c.enabled) {
				var d = v(!0, {
					className: "highcharts-grid-axis " + (a.className || ""),
					dateTimeLabelFormats: {
						hour: {
							list: ["%H:%M", "%H"]
						},
						day: {
							list: ["%A, %e. %B", "%a, %e. %b", "%E"]
						},
						week: {
							list: ["Week %W", "W%W"]
						},
						month: {
							list: ["%B", "%b", "%o"]
						}
					},
					grid: {
						borderWidth: 1
					},
					labels: {
						padding: 2,
						style: {
							fontSize: "13px"
						}
					},
					margin: 0,
					title: {
						text: null,
						reserveSpace: !1,
						rotation: 0
					},
					units: [
						["millisecond", [1, 10, 100]],
						["second", [1, 10]],
						["minute", [1, 5, 15]],
						["hour", [1, 6]],
						["day", [1]],
						["week", [1]],
						["month", [1]],
						["year", null]
					]
				}, a);
				"xAxis" === this.coll && (m(a.linkedTo) && !m(a.tickPixelInterval) && (d.tickPixelInterval =
					350), m(a.tickPixelInterval) || !m(a.linkedTo) || m(a.tickPositioner) || m(a
					.tickInterval) || (d.tickPositioner = function(a, b) {
					var c = this.linkedParent && this.linkedParent.tickPositions && this
						.linkedParent.tickPositions.info;
					if (c) {
						for (var e = d.units || [], f = void 0, h = 1, g = "year", l = 0; l < e
							.length; l++) {
							var m =
								e[l];
							if (m && m[0] === c.unitName) {
								f = l;
								break
							}
						}(e = k(f) && e[f + 1]) ? (g = e[0] || "year", h = (h = e[1]) && h[0] ||
							1) : "year" === c.unitName && (h = 10 * c.count);
						c = J[g];
						this.tickInterval = c * h;
						return this.chart.time.getTimeTicks({
							unitRange: c,
							count: h,
							unitName: g
						}, a, b, this.options.startOfWeek)
					}
				}));
				v(!0, this.options, d);
				this.horiz && (b.minPadding = F(a.minPadding, 0), b.maxPadding = F(a.maxPadding, 0));
				k(b.grid.borderWidth) && (b.tickWidth = b.lineWidth = c.borderWidth)
			}
		}

		function l(a) {
			a = (a = a.userOptions) && a.grid || {};
			var b = a.columns;
			a.enabled && b && v(!0,
				this.options, b[b.length - 1])
		}

		function q() {
			(this.grid.columns || []).forEach(function(a) {
				return a.setScale()
			})
		}

		function p(b) {
			var c = g.defaultLeftAxisOptions,
				d = this.horiz,
				e = this.maxLabelDimensions,
				f = this.options.grid;
			f = void 0 === f ? {} : f;
			f.enabled && e && (c = 2 * Math.abs(c.labels.x), d = d ? f.cellHeight || c + e.height : c + e
				.width, a(b.tickSize) ? b.tickSize[0] = d : b.tickSize = [d, 0])
		}

		function f() {
			this.axes.forEach(function(a) {
				(a.grid && a.grid.columns || []).forEach(function(a) {
					a.setAxisSize();
					a.setAxisTranslation()
				})
			})
		}

		function c(a) {
			var b =
				this.grid;
			(b.columns || []).forEach(function(b) {
				return b.destroy(a.keepEvents)
			});
			b.columns = void 0
		}

		function D(a) {
			a = a.userOptions || {};
			var b = a.grid || {};
			b.enabled && m(b.borderColor) && (a.tickColor = a.lineColor = b.borderColor);
			this.grid || (this.grid = new M(this));
			this.hiddenLabels = [];
			this.hiddenMarks = []
		}

		function G(a) {
			var b = this.label,
				c = this.axis,
				d = c.reversed,
				e = c.chart,
				f = c.options.grid || {},
				h = c.options.labels,
				g = h.align,
				l = O[c.side],
				m = a.tickmarkOffset,
				n = c.tickPositions,
				p = this.pos - m;
			n = k(n[a.index + 1]) ? n[a.index + 1] -
				m : (c.max || 0) + m;
			var q = c.tickSize("tick");
			m = q ? q[0] : 0;
			q = q ? q[1] / 2 : 0;
			if (!0 === f.enabled) {
				if ("top" === l) {
					f = c.top + c.offset;
					var r = f - m
				} else "bottom" === l ? (r = e.chartHeight - c.bottom + c.offset, f = r + m) : (f = c.top +
					c.len - (c.translate(d ? n : p) || 0), r = c.top + c.len - (c.translate(d ? p :
						n) || 0));
				"right" === l ? (l = e.chartWidth - c.right + c.offset, d = l + m) : "left" === l ? (d = c
					.left + c.offset, l = d - m) : (l = Math.round(c.left + (c.translate(d ? n : p) ||
					0)) - q, d = Math.min(Math.round(c.left + (c.translate(d ? p : n) || 0)) - q, c
					.left + c.len));
				this.slotWidth = d - l;
				a.pos.x = "left" ===
					g ? l : "right" === g ? d : l + (d - l) / 2;
				a.pos.y = r + (f - r) / 2;
				e = e.renderer.fontMetrics(h.style.fontSize, b && b.element);
				b = b ? b.getBBox().height : 0;
				h.useHTML ? a.pos.y += e.b + -(b / 2) : (b = Math.round(b / e.h), a.pos.y += (e.b - (e.h - e
					.f)) / 2 + -((b - 1) * e.h / 2));
				a.pos.x += c.horiz && h.x || 0
			}
		}

		function H(a) {
			var c = a.axis,
				d = a.value;
			if (c.options.grid && c.options.grid.enabled) {
				var e = c.tickPositions,
					f = (c.linkedParent || c).series[0],
					h = d === e[0];
				e = d === e[e.length - 1];
				var k = f && b(f.options.data, function(a) {
						return a[c.isXAxis ? "x" : "y"] === d
					}),
					g = void 0;
				k && f.is("gantt") &&
					(g = v(k), z.seriesTypes.gantt.prototype.pointClass.setGanttPointAliases(g));
				a.isFirst = h;
				a.isLast = e;
				a.point = g
			}
		}

		function K() {
			var a = this.options,
				b = this.categories,
				c = this.tickPositions,
				d = c[0],
				e = c[c.length - 1],
				f = this.linkedParent && this.linkedParent.min || this.min,
				h = this.linkedParent && this.linkedParent.max || this.max,
				k = this.tickInterval;
			!0 !== (a.grid || {}).enabled || b || !this.horiz && !this.isLinked || (d < f && d + k > f && !a
				.startOnTick && (c[0] = f), e > h && e - k < h && !a.endOnTick && (c[c.length - 1] = h))
		}

		function w(a) {
			var b = this.options.grid;
			return !0 === (void 0 === b ? {} : b).enabled && this.categories ? this.tickInterval : a.apply(
				this, Array.prototype.slice.call(arguments, 1))
		}
		var n = z.dateFormats,
			u = B.addEvent,
			m = B.defined,
			e = B.erase,
			b = B.find,
			a = B.isArray,
			k = B.isNumber,
			v = B.merge,
			F = B.pick,
			J = B.timeUnits,
			L = B.wrap,
			O;
		(function(a) {
			a[a.top = 0] = "top";
			a[a.right = 1] = "right";
			a[a.bottom = 2] = "bottom";
			a[a.left = 3] = "left"
		})(O || (O = {}));
		var I = [],
			M = function() {
				function a(a) {
					this.axis = a
				}
				a.prototype.isOuterAxis = function() {
					var a = this.axis,
						b = a.grid.columnIndex,
						c = a.linkedParent &&
						a.linkedParent.grid.columns || a.grid.columns,
						d = b ? a.linkedParent : a,
						e = -1,
						f = 0;
					(a.chart[a.coll] || []).forEach(function(b, c) {
						b.side !== a.side || b.options.isInternal || (f = c, b === d && (e = c))
					});
					return f === e && (k(b) ? c.length === b : !0)
				};
				a.prototype.renderBorder = function(a) {
					var b = this.axis,
						c = b.chart.renderer,
						d = b.options;
					a = c.path(a).addClass("highcharts-axis-line").add(b.axisBorder);
					c.styledMode || a.attr({
						stroke: d.lineColor,
						"stroke-width": d.lineWidth,
						zIndex: 7
					});
					return a
				};
				return a
			}();
		n.E = function(a) {
			return this.dateFormat("%a",
				a, !0).charAt(0)
		};
		n.W = function(a) {
			var b = this,
				c = new this.Date(a);
			["Hours", "Milliseconds", "Minutes", "Seconds"].forEach(function(a) {
				b.set(a, c, 0)
			});
			var d = (this.get("Day", c) + 6) % 7;
			a = new this.Date(c.valueOf());
			this.set("Date", a, this.get("Date", c) - d + 3);
			d = new this.Date(this.get("FullYear", a), 0, 1);
			4 !== this.get("Day", d) && (this.set("Month", c, 0), this.set("Date", c, 1 + (11 - this
				.get("Day", d)) % 7));
			return (1 + Math.floor((a.valueOf() - d.valueOf()) / 6048E5)).toString()
		};
		"";
		return {
			compose: function(a, b, d) {
				-1 === I.indexOf(a) &&
					(I.push(a), a.keepProps.push("grid"), a.prototype.getMaxLabelDimensions = y, L(a
							.prototype, "unsquish", w), u(a, "init", D), u(a, "afterGetOffset", C), u(a,
							"afterGetTitlePosition", A), u(a, "afterInit", x), u(a, "afterRender", t),
						u(a, "afterSetAxisTranslation", r), u(a, "afterSetOptions", h), u(a,
							"afterSetOptions", l), u(a, "afterSetScale", q), u(a, "afterTickSize", p),
						u(a, "trimTicks", K), u(a, "destroy", c)); - 1 === I.indexOf(b) && u(b,
					"afterSetChartSize", f); - 1 === I.indexOf(d) && (u(d, "afterGetLabelPosition", G),
					u(d, "labelFormat", H));
				return a
			}
		}
	});
	I(g, "Gantt/Tree.js", [g["Core/Utilities.js"]], function(d) {
		var g = d.extend,
			z = d.isNumber,
			B = d.pick,
			y = function(d, g) {
				var t = d.reduce(function(d, h) {
					var g = B(h.parent, "");
					"undefined" === typeof d[g] && (d[g] = []);
					d[g].push(h);
					return d
				}, {});
				Object.keys(t).forEach(function(d, h) {
					var l = t[d];
					"" !== d && -1 === g.indexOf(d) && (l.forEach(function(d) {
						h[""].push(d)
					}), delete h[d])
				});
				return t
			},
			C = function(d, x, t, r, h, l) {
				var q = 0,
					p = 0,
					f = l && l.after,
					c = l && l.before;
				x = {
					data: r,
					depth: t - 1,
					id: d,
					level: t,
					parent: x
				};
				var D, y;
				"function" === typeof c && c(x,
					l);
				c = (h[d] || []).map(function(c) {
					var f = C(c.id, d, t + 1, c, h, l),
						g = c.start;
					c = !0 === c.milestone ? g : c.end;
					D = !z(D) || g < D ? g : D;
					y = !z(y) || c > y ? c : y;
					q = q + 1 + f.descendants;
					p = Math.max(f.height + 1, p);
					return f
				});
				r && (r.start = B(r.start, D), r.end = B(r.end, y));
				g(x, {
					children: c,
					descendants: q,
					height: p
				});
				"function" === typeof f && f(x, l);
				return x
			};
		return {
			getListOfParents: y,
			getNode: C,
			getTree: function(d, g) {
				var t = d.map(function(d) {
					return d.id
				});
				d = y(d, t);
				return C("", null, 1, null, d, g)
			}
		}
	});
	I(g, "Core/Axis/TreeGrid/TreeGridTick.js", [g["Core/Utilities.js"]],
		function(d) {
			function g() {
				this.treeGrid || (this.treeGrid = new l(this))
			}

			function z(d, h) {
				d = d.treeGrid;
				var f = !d.labelIcon,
					c = h.renderer,
					g = h.xy,
					l = h.options,
					p = l.width || 0,
					q = l.height || 0,
					r = g.x - p / 2 - (l.padding || 0);
				g = g.y - q / 2;
				var n = h.collapsed ? 90 : 180,
					u = h.show && x(g),
					m = d.labelIcon;
				m || (d.labelIcon = m = c.path(c.symbols[l.type](l.x || 0, l.y || 0, p, q)).addClass(
					"highcharts-label-icon").add(h.group));
				m[u ? "show" : "hide"]();
				c.styledMode || m.attr({
					cursor: "pointer",
					fill: t(h.color, "#666666"),
					"stroke-width": 1,
					stroke: l.lineColor,
					strokeWidth: l.lineWidth ||
						0
				});
				m[f ? "attr" : "animate"]({
					translateX: r,
					translateY: g,
					rotation: n
				})
			}

			function B(d, h, f, c, g, l, r, y, w) {
				var n = t(this.options && this.options.labels, l);
				l = this.pos;
				var p = this.axis,
					m = "treegrid" === p.options.type;
				d = d.apply(this, [h, f, c, g, n, r, y, w]);
				m && (h = n && A(n.symbol, !0) ? n.symbol : {}, n = n && x(n.indentation) ? n.indentation : 0,
					l = (l = (p = p.treeGrid.mapOfPosToGridNode) && p[l]) && l.depth || 1, d.x += (h
						.width || 0) + 2 * (h.padding || 0) + (l - 1) * n);
				return d
			}

			function y(d) {
				var h = this,
					f = h.pos,
					c = h.axis,
					g = h.label,
					l = c.treeGrid.mapOfPosToGridNode,
					q = c.options,
					r = t(h.options && h.options.labels, q && q.labels),
					w = r && A(r.symbol, !0) ? r.symbol : {},
					n = (l = l && l[f]) && l.depth;
				q = "treegrid" === q.type;
				var u = -1 < c.tickPositions.indexOf(f);
				f = c.chart.styledMode;
				q && l && g && g.element && g.addClass("highcharts-treegrid-node-level-" + n);
				d.apply(h, Array.prototype.slice.call(arguments, 1));
				q && g && g.element && l && l.descendants && 0 < l.descendants && (c = c.treeGrid.isCollapsed(
					l), z(h, {
						color: !f && g.styles && g.styles.color || "",
						collapsed: c,
						group: g.parentGroup,
						options: w,
						renderer: g.renderer,
						show: u,
						xy: g.xy
					}), w = "highcharts-treegrid-node-" + (c ? "expanded" : "collapsed"), g.addClass(
						"highcharts-treegrid-node-" + (c ? "collapsed" : "expanded")).removeClass(w), f || g
					.css({
						cursor: "pointer"
					}), [g, h.treeGrid.labelIcon].forEach(function(c) {
						c && !c.attachedTreeGridEvents && (C(c.element, "mouseover", function() {
							g.addClass("highcharts-treegrid-node-active");
							g.renderer.styledMode || g.css({
								textDecoration: "underline"
							})
						}), C(c.element, "mouseout", function() {
							var c = A(r.style) ? r.style : {};
							g.removeClass("highcharts-treegrid-node-active");
							g.renderer.styledMode || g.css({
								textDecoration: c.textDecoration
							})
						}), C(c.element, "click", function() {
							h.treeGrid.toggleCollapse()
						}), c.attachedTreeGridEvents = !0)
					}))
			}
			var C = d.addEvent,
				A = d.isObject,
				x = d.isNumber,
				t = d.pick,
				r = d.wrap,
				h = [],
				l = function() {
					function d(d) {
						this.tick = d
					}
					d.compose = function(d) {
						-1 === h.indexOf(d) && (h.push(d), C(d, "init", g), r(d.prototype,
								"getLabelPosition", B), r(d.prototype, "renderLabel", y), d.prototype
							.collapse = function(d) {
								this.treeGrid.collapse(d)
							}, d.prototype.expand = function(d) {
								this.treeGrid.expand(d)
							},
							d.prototype.toggleCollapse = function(d) {
								this.treeGrid.toggleCollapse(d)
							})
					};
					d.prototype.collapse = function(d) {
						var f = this.tick,
							c = f.axis,
							h = c.brokenAxis;
						h && c.treeGrid.mapOfPosToGridNode && (f = c.treeGrid.collapse(c.treeGrid
							.mapOfPosToGridNode[f.pos]), h.setBreaks(f, t(d, !0)))
					};
					d.prototype.destroy = function() {
						this.labelIcon && this.labelIcon.destroy()
					};
					d.prototype.expand = function(d) {
						var f = this.tick,
							c = f.axis,
							h = c.brokenAxis;
						h && c.treeGrid.mapOfPosToGridNode && (f = c.treeGrid.expand(c.treeGrid
								.mapOfPosToGridNode[f.pos]),
							h.setBreaks(f, t(d, !0)))
					};
					d.prototype.toggleCollapse = function(d) {
						var f = this.tick,
							c = f.axis,
							h = c.brokenAxis;
						h && c.treeGrid.mapOfPosToGridNode && (f = c.treeGrid.toggleCollapse(c.treeGrid
							.mapOfPosToGridNode[f.pos]), h.setBreaks(f, t(d, !0)))
					};
					return d
				}();
			return l
		});
	I(g, "Series/TreeUtilities.js", [g["Core/Color/Color.js"], g["Core/Utilities.js"]], function(d, g) {
		function z(d, h) {
			var g = h.before,
				q = h.idRoot,
				p = h.mapIdToNode[q],
				f = h.points[d.i],
				c = f && f.options || {},
				r = [],
				x = 0;
			d.levelDynamic = d.level - (!1 !== h.levelIsConstant ? 0 :
				p.level);
			d.name = t(f && f.name, "");
			d.visible = q === d.id || !0 === h.visible;
			"function" === typeof g && (d = g(d, h));
			d.children.forEach(function(c, f) {
				var g = B({}, h);
				B(g, {
					index: f,
					siblings: d.children.length,
					visible: d.visible
				});
				c = z(c, g);
				r.push(c);
				c.visible && (x += c.val)
			});
			g = t(c.value, x);
			d.visible = 0 <= g && (0 < x || d.visible);
			d.children = r;
			d.childrenTotal = x;
			d.isLeaf = d.visible && !x;
			d.val = g;
			return d
		}
		var B = g.extend,
			y = g.isArray,
			C = g.isNumber,
			A = g.isObject,
			x = g.merge,
			t = g.pick;
		return {
			getColor: function(g, h) {
				var l = h.index,
					q = h.mapOptionsToLevel,
					p = h.parentColor,
					f = h.parentColorIndex,
					c = h.series,
					r = h.colors,
					x = h.siblings,
					y = c.points,
					z = c.chart.options.chart,
					w;
				if (g) {
					y = y[g.i];
					g = q[g.level] || {};
					if (q = y && g.colorByPoint) {
						var n = y.index % (r ? r.length : z.colorCount);
						var u = r && r[n]
					}
					if (!c.chart.styledMode) {
						r = y && y.options.color;
						z = g && g.color;
						if (w = p) w = (w = g && g.colorVariation) && "brightness" === w.key && l && x ?
							d.parse(p).brighten(l / x * w.to).get() : p;
						w = t(r, z, u, w, c.color)
					}
					var m = t(y && y.options.colorIndex, g && g.colorIndex, n, f, h.colorIndex)
				}
				return {
					color: w,
					colorIndex: m
				}
			},
			getLevelOptions: function(d) {
				var h = {};
				if (A(d)) {
					var g = C(d.from) ? d.from : 1;
					var q = d.levels;
					var p = {};
					var f = A(d.defaults) ? d.defaults : {};
					y(q) && (p = q.reduce(function(c, d) {
						if (A(d) && C(d.level)) {
							var h = x({}, d);
							var l = t(h.levelIsConstant, f.levelIsConstant);
							delete h.levelIsConstant;
							delete h.level;
							d = d.level + (l ? 0 : g - 1);
							A(c[d]) ? x(!0, c[d], h) : c[d] = h
						}
						return c
					}, {}));
					q = C(d.to) ? d.to : 1;
					for (d = 0; d <= q; d++) h[d] = x({}, f, A(p[d]) ? p[d] : {})
				}
				return h
			},
			setTreeValues: z,
			updateRootId: function(d) {
				if (A(d)) {
					var h = A(d.options) ? d.options : {};
					h = t(d.rootNode, h.rootId, "");
					A(d.userOptions) &&
						(d.userOptions.rootId = h);
					d.rootNode = h
				}
				return h
			}
		}
	});
	I(g, "Core/Axis/TreeGrid/TreeGridAxis.js", [g["Core/Axis/BrokenAxis.js"], g["Core/Axis/GridAxis.js"], g[
		"Gantt/Tree.js"], g["Core/Axis/TreeGrid/TreeGridTick.js"], g["Series/TreeUtilities.js"], g[
		"Core/Utilities.js"]], function(d, g, z, B, y, C) {
		function A(b, a) {
			var c = b.collapseEnd || 0;
			b = b.collapseStart || 0;
			c >= a && (b -= .5);
			return {
				from: b,
				to: c,
				showPoints: !1
			}
		}

		function x(b, a, c) {
			var d = [],
				e = [],
				h = {},
				k = "boolean" === typeof a ? a : !1,
				g = {},
				l = -1;
			b = z.getTree(b, {
				after: function(a) {
					a =
						g[a.pos];
					var b = 0,
						c = 0;
					a.children.forEach(function(a) {
						c += (a.descendants || 0) + 1;
						b = Math.max((a.height || 0) + 1, b)
					});
					a.descendants = c;
					a.height = b;
					a.collapsed && e.push(a)
				},
				before: function(a) {
					var b = G(a.data, !0) ? a.data : {},
						c = H(b.name) ? b.name : "",
						e = h[a.parent];
					e = G(e, !0) ? g[e.pos] : null;
					var m = function(a) {
							return a.name === c
						},
						n;
					k && G(e, !0) && (n = f(e.children, m)) ? (m = n.pos, n.nodes.push(a)) : m =
						l++;
					g[m] || (g[m] = n = {
						depth: e ? e.depth + 1 : 0,
						name: c,
						id: b.id,
						nodes: [a],
						children: [],
						pos: m
					}, -1 !== m && d.push(c), G(e, !0) && e.children.push(n));
					H(a.id) &&
						(h[a.id] = a);
					n && !0 === b.collapsed && (n.collapsed = !0);
					a.pos = m
				}
			});
			g = function(a, b) {
				var c = function(a, d, e) {
					var f = d + (-1 === d ? 0 : b - 1),
						h = (f - d) / 2,
						k = d + h;
					a.nodes.forEach(function(a) {
						var b = a.data;
						G(b, !0) && (b.y = d + (b.seriesIndex || 0), delete b.seriesIndex);
						a.pos = k
					});
					e[k] = a;
					a.pos = k;
					a.tickmarkOffset = h + .5;
					a.collapseStart = f + .5;
					a.children.forEach(function(a) {
						c(a, f + 1, e);
						f = (a.collapseEnd || 0) - .5
					});
					a.collapseEnd = f + .5;
					return e
				};
				return c(a["-1"], -1, {})
			}(g, c);
			return {
				categories: d,
				mapOfIdToNode: h,
				mapOfPosToGridNode: g,
				collapsedNodes: e,
				tree: b
			}
		}

		function t(b) {
			b.target.axes.filter(function(a) {
				return "treegrid" === a.options.type
			}).forEach(function(a) {
				var c = a.options || {},
					d = c.labels,
					e = c.uniqueNames;
				c = c.max;
				var f = 0;
				if (!a.treeGrid.mapOfPosToGridNode || a.series.some(function(a) {
						return !a.hasRendered || a.isDirtyData || a.isDirty
					})) {
					var h = a.series.reduce(function(a, b) {
						b.visible && ((b.options.data || []).forEach(function(c) {
							b.options.keys && b.options.keys.length && (c = b
								.pointClass.prototype.optionsToObject.call({
									series: b
								}, c), b.pointClass.setGanttPointAliases(c));
							G(c, !0) && (c.seriesIndex = f, a.push(c))
						}), !0 === e && f++);
						return a
					}, []);
					if (c && h.length < c)
						for (var g = h.length; g <= c; g++) h.push({
							name: g + "\u200b"
						});
					c = x(h, e || !1, !0 === e ? f : 1);
					a.categories = c.categories;
					a.treeGrid.mapOfPosToGridNode = c.mapOfPosToGridNode;
					a.hasNames = !0;
					a.treeGrid.tree = c.tree;
					a.series.forEach(function(a) {
						var b = (a.options.data || []).map(function(b) {
							D(b) && a.options.keys && a.options.keys.length && h
								.forEach(function(a) {
									0 <= b.indexOf(a.x) && 0 <= b.indexOf(a
										.x2) && (b = a)
								});
							return G(b, !0) ? K(b) : b
						});
						a.visible && a.setData(b,
							!1)
					});
					a.treeGrid.mapOptionsToLevel = q({
						defaults: d,
						from: 1,
						levels: d && d.levels,
						to: a.treeGrid.tree && a.treeGrid.tree.height
					});
					"beforeRender" === b.type && (a.treeGrid.collapsedNodes = c.collapsedNodes)
				}
			})
		}

		function r(b, a) {
			var c = this.treeGrid.mapOptionsToLevel || {},
				d = this.ticks,
				e = d[a],
				f;
			if ("treegrid" === this.options.type && this.treeGrid.mapOfPosToGridNode) {
				var h = this.treeGrid.mapOfPosToGridNode[a];
				(c = c[h.depth]) && (f = {
					labels: c
				});
				!e && m ? d[a] = new m(this, a, void 0, void 0, {
					category: h.name,
					tickmarkOffset: h.tickmarkOffset,
					options: f
				}) : (e.parameters.category = h.name, e.options = f, e.addLabel())
			} else b.apply(this, Array.prototype.slice.call(arguments, 1))
		}

		function h(b, a, c) {
			var d = this,
				f = "treegrid" === c.type;
			d.treeGrid || (d.treeGrid = new e(d));
			f && (p(a, "beforeRender", t), p(a, "beforeRedraw", t), p(a, "addSeries", function(a) {
				a.options.data && (a = x(a.options.data, c.uniqueNames || !1, 1), d.treeGrid
					.collapsedNodes = (d.treeGrid.collapsedNodes || []).concat(a
						.collapsedNodes))
			}), p(d, "foundExtremes", function() {
				d.treeGrid.collapsedNodes && d.treeGrid.collapsedNodes.forEach(function(a) {
					var b =
						d.treeGrid.collapse(a);
					d.brokenAxis && (d.brokenAxis.setBreaks(b, !1), d.treeGrid
						.collapsedNodes && (d.treeGrid.collapsedNodes = d.treeGrid
							.collapsedNodes.filter(function(b) {
								return a.collapseStart !== b.collapseStart || a
									.collapseEnd !== b.collapseEnd
							})))
				})
			}), p(d, "afterBreaks", function() {
				"yAxis" === d.coll && !d.staticScale && d.chart.options.chart.height && (d
					.isDirty = !0)
			}), c = K({
				grid: {
					enabled: !0
				},
				labels: {
					align: "left",
					levels: [{
						level: void 0
					}, {
						level: 1,
						style: {
							fontWeight: "bold"
						}
					}],
					symbol: {
						type: "triangle",
						x: -5,
						y: -5,
						height: 10,
						width: 10,
						padding: 5
					}
				},
				uniqueNames: !1
			}, c, {
				reversed: !0,
				grid: {
					columns: void 0
				}
			}));
			b.apply(d, [a, c]);
			f && (d.hasNames = !0, d.options.showLastLabel = !0)
		}

		function l(b) {
			var a = this.options;
			"treegrid" === a.type ? (this.min = w(this.userMin, a.min, this.dataMin), this.max = w(this
					.userMax, a.max, this.dataMax), c(this, "foundExtremes"), this.setAxisTranslation(),
				this.tickmarkOffset = .5, this.tickInterval = 1, this.tickPositions = this.treeGrid
				.mapOfPosToGridNode ? this.treeGrid.getTickPositions() : []) : b.apply(this, Array
				.prototype.slice.call(arguments,
					1))
		}
		var q = y.getLevelOptions,
			p = C.addEvent,
			f = C.find,
			c = C.fireEvent,
			D = C.isArray,
			G = C.isObject,
			H = C.isString,
			K = C.merge,
			w = C.pick,
			n = C.wrap,
			u = [],
			m, e = function() {
				function b(a) {
					this.axis = a
				}
				b.compose = function(a, b, c, e) {
					if (-1 === u.indexOf(a)) {
						u.push(a); - 1 === a.keepProps.indexOf("treeGrid") && a.keepProps.push(
							"treeGrid");
						var f = a.prototype;
						n(f, "generateTick", r);
						n(f, "init", h);
						n(f, "setTickInterval", l);
						f.utils = {
							getNode: z.getNode
						}
					} - 1 === u.indexOf(e) && (u.push(e), m || (m = e));
					g.compose(a, b, e);
					d.compose(a, c);
					B.compose(e);
					return a
				};
				b.prototype.setCollapsedStatus = function(a) {
					var b = this.axis,
						c = b.chart;
					b.series.forEach(function(b) {
						var d = b.options.data;
						if (a.id && d) {
							var e = c.get(a.id);
							b = d[b.data.indexOf(e)];
							e && b && (e.collapsed = a.collapsed, b.collapsed = a.collapsed)
						}
					})
				};
				b.prototype.collapse = function(a) {
					var b = this.axis,
						c = b.options.breaks || [],
						d = A(a, b.max);
					c.push(d);
					a.collapsed = !0;
					b.treeGrid.setCollapsedStatus(a);
					return c
				};
				b.prototype.expand = function(a) {
					var b = this.axis,
						c = b.options.breaks || [],
						d = A(a, b.max);
					a.collapsed = !1;
					b.treeGrid.setCollapsedStatus(a);
					return c.reduce(function(a, b) {
						b.to === d.to && b.from === d.from || a.push(b);
						return a
					}, [])
				};
				b.prototype.getTickPositions = function() {
					var a = this.axis,
						b = Math.floor(a.min / a.tickInterval) * a.tickInterval,
						c = Math.ceil(a.max / a.tickInterval) * a.tickInterval;
					return Object.keys(a.treeGrid.mapOfPosToGridNode || {}).reduce(function(d, e) {
						e = +e;
						!(e >= b && e <= c) || a.brokenAxis && a.brokenAxis.isInAnyBreak(e) || d
							.push(e);
						return d
					}, [])
				};
				b.prototype.isCollapsed = function(a) {
					var b = this.axis,
						c = b.options.breaks || [],
						d = A(a, b.max);
					return c.some(function(a) {
						return a.from ===
							d.from && a.to === d.to
					})
				};
				b.prototype.toggleCollapse = function(a) {
					return this.isCollapsed(a) ? this.expand(a) : this.collapse(a)
				};
				return b
			}();
		return e
	});
	I(g, "Extensions/CurrentDateIndication.js", [g["Core/Axis/Axis.js"], g[
		"Core/Axis/PlotLineOrBand/PlotLineOrBand.js"], g["Core/Utilities.js"]], function(d, g, z) {
		var B = z.addEvent,
			y = z.merge;
		z = z.wrap;
		var C = {
			color: "#ccd6eb",
			width: 2,
			label: {
				format: "%a, %b %d %Y, %H:%M",
				formatter: function(d, g) {
					return this.axis.chart.time.dateFormat(g || "", d)
				},
				rotation: 0,
				style: {
					fontSize: "10px"
				}
			}
		};
		B(d, "afterSetOptions", function() {
			var d = this.options,
				g = d.currentDateIndicator;
			g && (g = "object" === typeof g ? y(C, g) : y(C), g.value = Date.now(), g.className =
				"highcharts-current-date-indicator", d.plotLines || (d.plotLines = []), d
				.plotLines.push(g))
		});
		B(g, "render", function() {
			this.label && this.label.attr({
				text: this.getLabelText(this.options.label)
			})
		});
		z(g.prototype, "getLabelText", function(d, g) {
			var t = this.options;
			return t && t.className && -1 !== t.className.indexOf(
					"highcharts-current-date-indicator") && t.label && "function" ===
				typeof t.label.formatter ? (t.value = Date.now(), t.label.formatter.call(this, t
					.value, t.label.format)) : d.call(this, g)
		})
	});
	I(g, "Extensions/StaticScale.js", [g["Core/Axis/Axis.js"], g["Core/Chart/Chart.js"], g["Core/Utilities.js"]],
		function(d, g, z) {
			var B = z.addEvent,
				y = z.defined,
				C = z.isNumber,
				A = z.pick;
			B(d, "afterSetOptions", function() {
				var d = this.chart.options.chart;
				!this.horiz && C(this.options.staticScale) && (!d.height || d.scrollablePlotArea && d
					.scrollablePlotArea.minHeight) && (this.staticScale = this.options.staticScale)
			});
			g.prototype.adjustHeight = function() {
				"adjustHeight" !== this.redrawTrigger && ((this.axes || []).forEach(function(d) {
					var g = d.chart,
						r = !!g.initiatedScale && g.options.animation,
						h = d.options.staticScale;
					if (d.staticScale && y(d.min)) {
						var l = A(d.brokenAxis && d.brokenAxis.unitLength, d.max + d
							.tickInterval - d.min) * h;
						l = Math.max(l, h);
						h = l - g.plotHeight;
						!g.scrollablePixelsY && 1 <= Math.abs(h) && (g.plotHeight = l, g
							.redrawTrigger = "adjustHeight", g.setSize(void 0, g
								.chartHeight + h, r));
						d.series.forEach(function(d) {
							(d = d.sharedClipKey && g.sharedClips[d.sharedClipKey]) &&
							d.attr(g.inverted ? {
								width: g.plotHeight
							} : {
								height: g.plotHeight
							})
						})
					}
				}), this.initiatedScale = !0);
				this.redrawTrigger = null
			};
			B(g, "render", g.prototype.adjustHeight)
		});
	I(g, "Extensions/ArrowSymbols.js", [g["Core/Renderer/SVG/SVGRenderer.js"]], function(d) {
		function g(d, g, z, x) {
			return [
				["M", d, g + x / 2],
				["L", d + z, g],
				["L", d, g + x / 2],
				["L", d + z, g + x]
			]
		}

		function z(d, g, z, x) {
			return [
				["M", d + z, g],
				["L", d, g + x / 2],
				["L", d + z, g + x],
				["Z"]
			]
		}

		function B(d, g, A, x) {
			return z(d, g, A / 2, x)
		}
		d = d.prototype.symbols;
		d.arrow = g;
		d["arrow-filled"] = z;
		d["arrow-filled-half"] =
			B;
		d["arrow-half"] = function(d, z, A, x) {
			return g(d, z, A / 2, x)
		};
		d["triangle-left"] = z;
		d["triangle-left-half"] = B;
		return d
	});
	I(g, "Gantt/Connection.js", [g["Core/Defaults.js"], g["Core/Globals.js"], g["Core/Series/Point.js"], g[
		"Core/Utilities.js"]], function(d, g, z, B) {
		function y(d) {
			var f = d.shapeArgs;
			return f ? {
				xMin: f.x || 0,
				xMax: (f.x || 0) + (f.width || 0),
				yMin: f.y || 0,
				yMax: (f.y || 0) + (f.height || 0)
			} : (f = d.graphic && d.graphic.getBBox()) ? {
				xMin: d.plotX - f.width / 2,
				xMax: d.plotX + f.width / 2,
				yMin: d.plotY - f.height / 2,
				yMax: d.plotY + f.height /
					2
			} : null
		}
		var C = d.defaultOptions,
			A = B.defined,
			x = B.error;
		d = B.extend;
		var t = B.merge,
			r = B.objectEach;
		"";
		var h = g.deg2rad,
			l = Math.max,
			q = Math.min;
		d(C, {
			connectors: {
				type: "straight",
				lineWidth: 1,
				marker: {
					enabled: !1,
					align: "center",
					verticalAlign: "middle",
					inside: !1,
					lineWidth: 1
				},
				startMarker: {
					symbol: "diamond"
				},
				endMarker: {
					symbol: "arrow-filled"
				}
			}
		});
		B = function() {
			function d(d, c, h) {
				this.toPoint = this.pathfinder = this.graphics = this.fromPoint = this.chart = void 0;
				this.init(d, c, h)
			}
			d.prototype.init = function(d, c, h) {
				this.fromPoint = d;
				this.toPoint = c;
				this.options = h;
				this.chart = d.series.chart;
				this.pathfinder = this.chart.pathfinder
			};
			d.prototype.renderPath = function(d, c, h) {
				var f = this.chart,
					g = f.styledMode,
					l = f.pathfinder,
					p = !f.options.chart.forExport && !1 !== h,
					n = this.graphics && this.graphics.path;
				l.group || (l.group = f.renderer.g().addClass("highcharts-pathfinder-group").attr({
					zIndex: -1
				}).add(f.seriesGroup));
				l.group.translate(f.plotLeft, f.plotTop);
				n && n.renderer || (n = f.renderer.path().add(l.group), g || n.attr({
					opacity: 0
				}));
				n.attr(c);
				d = {
					d: d
				};
				g || (d.opacity =
					1);
				n[p ? "animate" : "attr"](d, h);
				this.graphics = this.graphics || {};
				this.graphics.path = n
			};
			d.prototype.addMarker = function(d, c, g) {
				var f = this.fromPoint.series.chart,
					l = f.pathfinder;
				f = f.renderer;
				var p = "start" === d ? this.fromPoint : this.toPoint,
					q = p.getPathfinderAnchorPoint(c);
				if (c.enabled && ((g = "start" === d ? g[1] : g[g.length - 2]) && "M" === g[0] ||
						"L" === g[0])) {
					g = {
						x: g[1],
						y: g[2]
					};
					g = p.getRadiansToVector(g, q);
					q = p.getMarkerVector(g, c.radius, q);
					g = -g / h;
					if (c.width && c.height) {
						var n = c.width;
						var r = c.height
					} else n = r = 2 * c.radius;
					this.graphics =
						this.graphics || {};
					q = {
						x: q.x - n / 2,
						y: q.y - r / 2,
						width: n,
						height: r,
						rotation: g,
						rotationOriginX: q.x,
						rotationOriginY: q.y
					};
					this.graphics[d] ? this.graphics[d].animate(q) : (this.graphics[d] = f.symbol(c
							.symbol).addClass("highcharts-point-connecting-path-" + d +
							"-marker").attr(q).add(l.group), f.styledMode || this.graphics[d]
						.attr({
							fill: c.color || this.fromPoint.color,
							stroke: c.lineColor,
							"stroke-width": c.lineWidth,
							opacity: 0
						}).animate({
							opacity: 1
						}, p.series.options.animation))
				}
			};
			d.prototype.getPath = function(d) {
				var c = this.pathfinder,
					f = this.chart,
					h = c.algorithms[d.type],
					g = c.chartObstacles;
				if ("function" !== typeof h) return x('"' + d.type +
					'" is not a Pathfinder algorithm.'), {
					path: [],
					obstacles: []
				};
				h.requiresObstacles && !g && (g = c.chartObstacles = c.getChartObstacles(d), f
					.options.connectors.algorithmMargin = d.algorithmMargin, c
					.chartObstacleMetrics = c.getObstacleMetrics(g));
				return h(this.fromPoint.getPathfinderAnchorPoint(d.startMarker), this.toPoint
					.getPathfinderAnchorPoint(d.endMarker), t({
						chartObstacles: g,
						lineObstacles: c.lineObstacles || [],
						obstacleMetrics: c.chartObstacleMetrics,
						hardBounds: {
							xMin: 0,
							xMax: f.plotWidth,
							yMin: 0,
							yMax: f.plotHeight
						},
						obstacleOptions: {
							margin: d.algorithmMargin
						},
						startDirectionX: c.getAlgorithmStartDirection(d.startMarker)
					}, d))
			};
			d.prototype.render = function() {
				var d = this.fromPoint,
					c = d.series,
					h = c.chart,
					g = h.pathfinder,
					p = t(h.options.connectors, c.options.connectors, d.options.connectors, this
						.options),
					r = {};
				h.styledMode || (r.stroke = p.lineColor || d.color, r["stroke-width"] = p.lineWidth,
					p.dashStyle && (r.dashstyle = p.dashStyle));
				r["class"] = "highcharts-point-connecting-path highcharts-color-" +
					d.colorIndex;
				p = t(r, p);
				A(p.marker.radius) || (p.marker.radius = q(l(Math.ceil((p.algorithmMargin || 8) /
					2) - 1, 1), 5));
				d = this.getPath(p);
				h = d.path;
				d.obstacles && (g.lineObstacles = g.lineObstacles || [], g.lineObstacles = g
					.lineObstacles.concat(d.obstacles));
				this.renderPath(h, r, c.options.animation);
				this.addMarker("start", t(p.marker, p.startMarker), h);
				this.addMarker("end", t(p.marker, p.endMarker), h)
			};
			d.prototype.destroy = function() {
				this.graphics && (r(this.graphics, function(d) {
					d.destroy()
				}), delete this.graphics)
			};
			return d
		}();
		g.Connection = B;
		d(z.prototype, {
			getPathfinderAnchorPoint: function(d) {
				var f = y(this);
				switch (d.align) {
					case "right":
						var c = "xMax";
						break;
					case "left":
						c = "xMin"
				}
				switch (d.verticalAlign) {
					case "top":
						var h = "yMin";
						break;
					case "bottom":
						h = "yMax"
				}
				return {
					x: c ? f[c] : (f.xMin + f.xMax) / 2,
					y: h ? f[h] : (f.yMin + f.yMax) / 2
				}
			},
			getRadiansToVector: function(d, f) {
				var c;
				A(f) || (c = y(this)) && (f = {
					x: (c.xMin + c.xMax) / 2,
					y: (c.yMin + c.yMax) / 2
				});
				return Math.atan2(f.y - d.y, d.x - f.x)
			},
			getMarkerVector: function(d, f, c) {
				var h = 2 * Math.PI,
					g = y(this),
					l = g.xMax - g.xMin,
					p = g.yMax - g.yMin,
					q = Math.atan2(p, l),
					n = !1;
				l /= 2;
				var r = p / 2,
					m = g.xMin + l;
				g = g.yMin + r;
				for (var e = m, b = g, a = 1, k = 1; d < -Math.PI;) d += h;
				for (; d > Math.PI;) d -= h;
				h = Math.tan(d);
				d > -q && d <= q ? (k = -1, n = !0) : d > q && d <= Math.PI - q ? k = -1 : d >
					Math.PI - q || d <= -(Math.PI - q) ? (a = -1, n = !0) : a = -1;
				n ? (e += a * l, b += k * l * h) : (e += p / (2 * h) * a, b += k * r);
				c.x !== m && (e = c.x);
				c.y !== g && (b = c.y);
				return {
					x: e + f * Math.cos(d),
					y: b - f * Math.sin(d)
				}
			}
		});
		return B
	});
	I(g, "Gantt/PathfinderAlgorithms.js", [g["Core/Utilities.js"]], function(d) {
		function g(d, g, q) {
			q = q || 0;
			var h = d.length - 1;
			g -= 1e-7;
			for (var f, c; q <= h;)
				if (f = h + q >> 1, c = g - d[f].xMin, 0 < c) q = f + 1;
				else if (0 > c) h = f - 1;
			else return f;
			return 0 < q ? q - 1 : 0
		}

		function z(d, l) {
			for (var h = g(d, l.x + 1) + 1; h--;) {
				var p;
				if (p = d[h].xMax >= l.x) p = d[h], p = l.x <= p.xMax && l.x >= p.xMin && l.y <= p.yMax && l
					.y >= p.yMin;
				if (p) return h
			}
			return -1
		}

		function B(d) {
			var h = [];
			if (d.length) {
				h.push(["M", d[0].start.x, d[0].start.y]);
				for (var g = 0; g < d.length; ++g) h.push(["L", d[g].end.x, d[g].end.y])
			}
			return h
		}

		function y(d, g) {
			d.yMin = x(d.yMin, g.yMin);
			d.yMax = A(d.yMax, g.yMax);
			d.xMin = x(d.xMin, g.xMin);
			d.xMax = A(d.xMax,
				g.xMax)
		}
		var C = d.pick,
			A = Math.min,
			x = Math.max,
			t = Math.abs;
		d = function(d, g, q) {
			function h(c, d, f, e, b) {
				c = {
					x: c.x,
					y: c.y
				};
				c[d] = f[e || d] + (b || 0);
				return c
			}

			function f(c, d, f) {
				var e = t(d[f] - c[f + "Min"]) > t(d[f] - c[f + "Max"]);
				return h(d, f, c, f + (e ? "Max" : "Min"), e ? 1 : -1)
			}
			var c = [],
				l = C(q.startDirectionX, t(g.x - d.x) > t(g.y - d.y)) ? "x" : "y",
				r = q.chartObstacles,
				x = z(r, d);
			q = z(r, g);
			if (-1 < q) {
				var y = r[q];
				q = f(y, g, l);
				y = {
					start: q,
					end: g
				};
				var w = q
			} else w = g; - 1 < x && (r = r[x], q = f(r, d, l), c.push({
				start: d,
				end: q
			}), q[l] >= d[l] === q[l] >= w[l] && (l = "y" === l ? "x" : "y", g =
				d[l] < g[l], c.push({
					start: q,
					end: h(q, l, r, l + (g ? "Max" : "Min"), g ? 1 : -1)
				}), l = "y" === l ? "x" : "y"));
			d = c.length ? c[c.length - 1].end : d;
			q = h(d, l, w);
			c.push({
				start: d,
				end: q
			});
			l = h(q, "y" === l ? "x" : "y", w);
			c.push({
				start: q,
				end: l
			});
			c.push(y);
			return {
				path: B(c),
				obstacles: c
			}
		};
		d.requiresObstacles = !0;
		var r = function(d, l, q) {
			function h(b, c, d) {
				var e, f = b.x < c.x ? 1 : -1;
				if (b.x < c.x) {
					var h = b;
					var k = c
				} else h = c, k = b;
				if (b.y < c.y) {
					var l = b;
					var m = c
				} else l = c, m = b;
				for (e = 0 > f ? A(g(a, k.x), a.length - 1) : 0; a[e] && (0 < f && a[e].xMin <= k.x ||
						0 > f && a[e].xMax >= h.x);) {
					if (a[e].xMin <=
						k.x && a[e].xMax >= h.x && a[e].yMin <= m.y && a[e].yMax >= l.y) return d ? {
						y: b.y,
						x: b.x < c.x ? a[e].xMin - 1 : a[e].xMax + 1,
						obstacle: a[e]
					} : {
						x: b.x,
						y: b.y < c.y ? a[e].yMin - 1 : a[e].yMax + 1,
						obstacle: a[e]
					};
					e += f
				}
				return c
			}

			function f(a, b, c, d, e) {
				var f = e.soft,
					g = e.hard,
					k = d ? "x" : "y",
					l = {
						x: b.x,
						y: b.y
					},
					m = {
						x: b.x,
						y: b.y
					};
				e = a[k + "Max"] >= f[k + "Max"];
				f = a[k + "Min"] <= f[k + "Min"];
				var n = a[k + "Max"] >= g[k + "Max"];
				g = a[k + "Min"] <= g[k + "Min"];
				var p = t(a[k + "Min"] - b[k]),
					q = t(a[k + "Max"] - b[k]);
				c = 10 > t(p - q) ? b[k] < c[k] : q < p;
				m[k] = a[k + "Min"];
				l[k] = a[k + "Max"];
				a = h(b, m, d)[k] !== m[k];
				b = h(b, l, d)[k] !== l[k];
				c = a ? b ? c : !0 : b ? !1 : c;
				c = f ? e ? c : !0 : e ? !1 : c;
				return g ? n ? c : !0 : n ? !1 : c
			}

			function c(d, g, k) {
				if (d.x === g.x && d.y === g.y) return [];
				var l = k ? "x" : "y",
					n = q.obstacleOptions.margin;
				var p = {
					soft: {
						xMin: u,
						xMax: m,
						yMin: e,
						yMax: b
					},
					hard: q.hardBounds
				};
				var r = z(a, d);
				if (-1 < r) {
					r = a[r];
					p = f(r, d, g, k, p);
					y(r, q.hardBounds);
					var t = k ? {
						y: d.y,
						x: r[p ? "xMax" : "xMin"] + (p ? 1 : -1)
					} : {
						x: d.x,
						y: r[p ? "yMax" : "yMin"] + (p ? 1 : -1)
					};
					var v = z(a, t); - 1 < v && (v = a[v], y(v, q.hardBounds), t[l] = p ? x(r[l +
						"Max"] - n + 1, (v[l + "Min"] + r[l + "Max"]) / 2) : A(r[l + "Min"] +
						n - 1, (v[l + "Max"] +
							r[l + "Min"]) / 2), d.x === t.x && d.y === t.y ? (w && (t[l] = p ?
						x(r[l + "Max"], v[l + "Max"]) + 1 : A(r[l + "Min"], v[l + "Min"]) -
						1), w = !w) : w = !1);
					d = [{
						start: d,
						end: t
					}]
				} else l = h(d, {
					x: k ? g.x : d.x,
					y: k ? d.y : g.y
				}, k), d = [{
					start: d,
					end: {
						x: l.x,
						y: l.y
					}
				}], l[k ? "x" : "y"] !== g[k ? "x" : "y"] && (p = f(l.obstacle, l, g, !k, p), y(l
					.obstacle, q.hardBounds), p = {
					x: k ? l.x : l.obstacle[p ? "xMax" : "xMin"] + (p ? 1 : -1),
					y: k ? l.obstacle[p ? "yMax" : "yMin"] + (p ? 1 : -1) : l.y
				}, k = !k, d = d.concat(c({
					x: l.x,
					y: l.y
				}, p, k)));
				return d = d.concat(c(d[d.length - 1].end, g, !k))
			}

			function r(a, b, c) {
				var d = A(a.xMax - b.x,
					b.x - a.xMin) < A(a.yMax - b.y, b.y - a.yMin);
				c = f(a, b, c, d, {
					soft: q.hardBounds,
					hard: q.hardBounds
				});
				return d ? {
					y: b.y,
					x: a[c ? "xMax" : "xMin"] + (c ? 1 : -1)
				} : {
					x: b.x,
					y: a[c ? "yMax" : "yMin"] + (c ? 1 : -1)
				}
			}
			var G = C(q.startDirectionX, t(l.x - d.x) > t(l.y - d.y)),
				H = G ? "x" : "y",
				I = [],
				w = !1,
				n = q.obstacleMetrics,
				u = A(d.x, l.x) - n.maxWidth - 10,
				m = x(d.x, l.x) + n.maxWidth + 10,
				e = A(d.y, l.y) - n.maxHeight - 10,
				b = x(d.y, l.y) + n.maxHeight + 10,
				a = q.chartObstacles;
			var k = g(a, u);
			n = g(a, m);
			a = a.slice(k, n + 1);
			if (-1 < (n = z(a, l))) {
				var v = r(a[n], l, d);
				I.push({
					end: l,
					start: v
				});
				l = v
			}
			for (; - 1 <
				(n = z(a, l));) k = 0 > l[H] - d[H], v = {
				x: l.x,
				y: l.y
			}, v[H] = a[n][k ? H + "Max" : H + "Min"] + (k ? 1 : -1), I.push({
				end: l,
				start: v
			}), l = v;
			d = c(d, l, G);
			d = d.concat(I.reverse());
			return {
				path: B(d),
				obstacles: d
			}
		};
		r.requiresObstacles = !0;
		return {
			fastAvoid: r,
			straight: function(d, g) {
				return {
					path: [
						["M", d.x, d.y],
						["L", g.x, g.y]
					],
					obstacles: [{
						start: d,
						end: g
					}]
				}
			},
			simpleConnect: d
		}
	});
	I(g, "Gantt/Pathfinder.js", [g["Gantt/Connection.js"], g["Core/Chart/Chart.js"], g["Core/Defaults.js"], g[
			"Core/Globals.js"], g["Core/Series/Point.js"], g["Core/Utilities.js"], g[
			"Gantt/PathfinderAlgorithms.js"]],
		function(d, g, z, B, y, C, A) {
			function x(c) {
				var d = c.shapeArgs;
				return d ? {
					xMin: d.x || 0,
					xMax: (d.x || 0) + (d.width || 0),
					yMin: d.y || 0,
					yMax: (d.y || 0) + (d.height || 0)
				} : (d = c.graphic && c.graphic.getBBox()) ? {
					xMin: c.plotX - d.width / 2,
					xMax: c.plotX + d.width / 2,
					yMin: c.plotY - d.height / 2,
					yMax: c.plotY + d.height / 2
				} : null
			}

			function t(d) {
				for (var f = d.length, g = 0, h, e, b = [], a = function(b, d, e) {
						e = c(e, 10);
						var f = b.yMax + e > d.yMin - e && b.yMin - e < d.yMax + e,
							g = b.xMax + e > d.xMin - e && b.xMin - e < d.xMax + e,
							h = f ? b.xMin > d.xMax ? b.xMin - d.xMax : d.xMin - b.xMax : Infinity,
							k = g ? b.yMin >
							d.yMax ? b.yMin - d.yMax : d.yMin - b.yMax : Infinity;
						return g && f ? e ? a(b, d, Math.floor(e / 2)) : Infinity : H(h, k)
					}; g < f; ++g)
					for (h = g + 1; h < f; ++h) e = a(d[g], d[h]), 80 > e && b.push(e);
				b.push(80);
				return G(Math.floor(b.sort(function(a, b) {
					return a - b
				})[Math.floor(b.length / 10)] / 2 - 1), 1)
			}

			function r(c) {
				if (c.options.pathfinder || c.series.reduce(function(c, d) {
						d.options && f(!0, d.options.connectors = d.options.connectors || {}, d.options
							.pathfinder);
						return c || d.options && d.options.pathfinder
					}, !1)) f(!0, c.options.connectors = c.options.connectors || {}, c.options.pathfinder), q(
					'WARNING: Pathfinder options have been renamed. Use "chart.connectors" or "series.connectors" instead.'
					)
			}
			z = z.defaultOptions;
			var h = C.addEvent,
				l = C.defined,
				q = C.error,
				p = C.extend,
				f = C.merge,
				c = C.pick,
				D = C.splat;
			"";
			var G = Math.max,
				H = Math.min;
			p(z, {
				connectors: {
					type: "straight",
					lineWidth: 1,
					marker: {
						enabled: !1,
						align: "center",
						verticalAlign: "middle",
						inside: !1,
						lineWidth: 1
					},
					startMarker: {
						symbol: "diamond"
					},
					endMarker: {
						symbol: "arrow-filled"
					}
				}
			});
			var I = function() {
				function f(c) {
					this.lineObstacles =
						this.group = this.connections = this.chartObstacleMetrics = this.chartObstacles =
						this.chart = void 0;
					this.init(c)
				}
				f.prototype.init = function(c) {
					this.chart = c;
					this.connections = [];
					h(c, "redraw", function() {
						this.pathfinder.update()
					})
				};
				f.prototype.update = function(c) {
					var f = this.chart,
						g = this,
						e = g.connections;
					g.connections = [];
					f.series.forEach(function(a) {
						a.visible && !a.options.isInternal && a.points.forEach(function(a) {
							var b = a.options;
							b && b.dependency && (b.connect = b.dependency);
							var c;
							b = a.options && a.options.connect && D(a.options.connect);
							a.visible && !1 !== a.isInside && b && b.forEach(function(
							b) {
								c = f.get("string" === typeof b ? b : b.to);
								c instanceof y && c.series.visible && c
									.visible && !1 !== c.isInside && g
									.connections.push(new d(a, c, "string" ===
										typeof b ? {} : b))
							})
						})
					});
					for (var b = 0, a = void 0, h = void 0, l = e.length, n = g.connections.length; b <
						l; ++b) {
						h = !1;
						var p = e[b];
						for (a = 0; a < n; ++a) {
							var q = g.connections[a];
							if ((p.options && p.options.type) === (q.options && q.options.type) && p
								.fromPoint === q.fromPoint && p.toPoint === q.toPoint) {
								q.graphics = p.graphics;
								h = !0;
								break
							}
						}
						h || p.destroy()
					}
					delete this.chartObstacles;
					delete this.lineObstacles;
					g.renderConnections(c)
				};
				f.prototype.renderConnections = function(c) {
					c ? this.chart.series.forEach(function(c) {
						var d = function() {
							var d = c.chart.pathfinder;
							(d && d.connections || []).forEach(function(b) {
								b.fromPoint && b.fromPoint.series === c && b
								.render()
							});
							c.pathfinderRemoveRenderEvent && (c
								.pathfinderRemoveRenderEvent(), delete c
								.pathfinderRemoveRenderEvent)
						};
						!1 === c.options.animation ? d() : c.pathfinderRemoveRenderEvent = h(c,
							"afterAnimate", d)
					}) : this.connections.forEach(function(c) {
						c.render()
					})
				};
				f.prototype.getChartObstacles = function(d) {
					for (var f = [], g = this.chart.series, e = c(d.algorithmMargin, 0), b, a = 0, h = g
							.length; a < h; ++a)
						if (g[a].visible && !g[a].options.isInternal) {
							var n = 0,
								p = g[a].points.length,
								q = void 0;
							for (q = void 0; n < p; ++n) q = g[a].points[n], q.visible && (q = x(q)) &&
								f.push({
									xMin: q.xMin - e,
									xMax: q.xMax + e,
									yMin: q.yMin - e,
									yMax: q.yMax + e
								})
						} f = f.sort(function(a, b) {
						return a.xMin - b.xMin
					});
					l(d.algorithmMargin) || (b = d.algorithmMargin = t(f), f.forEach(function(a) {
						a.xMin -= b;
						a.xMax += b;
						a.yMin -= b;
						a.yMax += b
					}));
					return f
				};
				f.prototype.getObstacleMetrics =
					function(c) {
						for (var d = 0, f = 0, e, b, a = c.length; a--;) e = c[a].xMax - c[a].xMin, b = c[a]
							.yMax - c[a].yMin, d < e && (d = e), f < b && (f = b);
						return {
							maxHeight: f,
							maxWidth: d
						}
					};
				f.prototype.getAlgorithmStartDirection = function(c) {
					var d = "top" !== c.verticalAlign && "bottom" !== c.verticalAlign;
					return "left" !== c.align && "right" !== c.align ? d ? void 0 : !1 : d ? !0 : void 0
				};
				return f
			}();
			I.prototype.algorithms = A;
			B.Pathfinder = I;
			p(y.prototype, {
				getPathfinderAnchorPoint: function(c) {
					var d = x(this);
					switch (c.align) {
						case "right":
							var f = "xMax";
							break;
						case "left":
							f =
								"xMin"
					}
					switch (c.verticalAlign) {
						case "top":
							var g = "yMin";
							break;
						case "bottom":
							g = "yMax"
					}
					return {
						x: f ? d[f] : (d.xMin + d.xMax) / 2,
						y: g ? d[g] : (d.yMin + d.yMax) / 2
					}
				},
				getRadiansToVector: function(c, d) {
					var f;
					l(d) || (f = x(this)) && (d = {
						x: (f.xMin + f.xMax) / 2,
						y: (f.yMin + f.yMax) / 2
					});
					return Math.atan2(d.y - c.y, c.x - d.x)
				},
				getMarkerVector: function(c, d, f) {
					var g = 2 * Math.PI,
						e = x(this),
						b = e.xMax - e.xMin,
						a = e.yMax - e.yMin,
						h = Math.atan2(a, b),
						l = !1;
					b /= 2;
					var n = a / 2,
						p = e.xMin + b;
					e = e.yMin + n;
					for (var q = p, r = e, t = 1, u = 1; c < -Math.PI;) c += g;
					for (; c > Math.PI;) c -= g;
					g =
						Math.tan(c);
					c > -h && c <= h ? (u = -1, l = !0) : c > h && c <= Math.PI - h ? u = -1 : c >
						Math.PI - h || c <= -(Math.PI - h) ? (t = -1, l = !0) : t = -1;
					l ? (q += t * b, r += u * b * g) : (q += a / (2 * g) * t, r += u * n);
					f.x !== p && (q = f.x);
					f.y !== e && (r = f.y);
					return {
						x: q + d * Math.cos(c),
						y: r - d * Math.sin(c)
					}
				}
			});
			g.prototype.callbacks.push(function(c) {
				!1 !== c.options.connectors.enabled && (r(c), this.pathfinder = new I(this), this
					.pathfinder.update(!0))
			});
			return I
		});
	I(g, "Series/Gantt/GanttSeries.js", [g["Core/Axis/Axis.js"], g["Core/Chart/Chart.js"], g[
			"Series/Gantt/GanttPoint.js"], g["Core/Series/SeriesRegistry.js"],
		g["Core/Axis/Tick.js"], g["Core/Utilities.js"], g["Core/Axis/TreeGrid/TreeGridAxis.js"]
	], function(d, g, z, B, y, C, A) {
		var x = this && this.__extends || function() {
				var d = function(f, c) {
					d = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function(c, d) {
						c.__proto__ = d
					} || function(c, d) {
						for (var f in d) d.hasOwnProperty(f) && (c[f] = d[f])
					};
					return d(f, c)
				};
				return function(f, c) {
					function g() {
						this.constructor = f
					}
					d(f, c);
					f.prototype = null === c ? Object.create(c) : (g.prototype = c.prototype, new g)
				}
			}(),
			t = B.series,
			r = B.seriesTypes.xrange,
			h = C.extend,
			l = C.isNumber,
			q = C.merge;
		A.compose(d, g, t, y);
		d = function(d) {
			function f() {
				var c = null !== d && d.apply(this, arguments) || this;
				c.data = void 0;
				c.options = void 0;
				c.points = void 0;
				return c
			}
			x(f, d);
			f.prototype.drawPoint = function(c, d) {
				var f = this.options,
					g = this.chart.renderer,
					h = c.shapeArgs,
					p = c.plotY,
					n = c.graphic,
					q = c.selected && "select",
					m = f.stacking && !f.borderRadius;
				if (c.options.milestone)
					if (l(p) && null !== c.y && !1 !== c.visible) {
						h = g.symbols.diamond(h.x || 0, h.y || 0, h.width || 0, h.height || 0);
						if (n) n[d]({
							d: h
						});
						else c.graphic =
							g.path(h).addClass(c.getClassName(), !0).add(c.group || this.group);
						this.chart.styledMode || c.graphic.attr(this.pointAttribs(c, q)).shadow(f
							.shadow, null, m)
					} else n && (c.graphic = n.destroy());
				else r.prototype.drawPoint.call(this, c, d)
			};
			f.prototype.translatePoint = function(c) {
				r.prototype.translatePoint.call(this, c);
				if (c.options.milestone) {
					var d = c.shapeArgs;
					var f = d.height || 0;
					c.shapeArgs = {
						x: (d.x || 0) - f / 2,
						y: d.y,
						width: f,
						height: f
					}
				}
			};
			f.defaultOptions = q(r.defaultOptions, {
				grouping: !1,
				dataLabels: {
					enabled: !0
				},
				tooltip: {
					headerFormat: '<span style="font-size: 10px">{series.name}</span><br/>',
					pointFormat: null,
					pointFormatter: function() {
						var c = this.series,
							d = c.xAxis,
							f = c.tooltipOptions.dateTimeLabelFormats,
							g = d.options.startOfWeek,
							h = c.tooltipOptions,
							p = h.xDateFormat,
							n = this.options.milestone,
							q = "<b>" + (this.name || this.yCategory) + "</b>";
						if (h.pointFormat) return this.tooltipFormatter(h.pointFormat);
						!p && l(this.start) && (p = c.chart.time.getDateFormat(d
							.closestPointRange, this.start, g, f || {}));
						d = c.chart.time.dateFormat(p, this.start);
						c = c.chart.time.dateFormat(p, this.end);
						q += "<br/>";
						return n ? q + (d + "<br/>") :
							q + ("Start: " + d + "<br/>End: ") + (c + "<br/>")
					}
				},
				connectors: {
					type: "simpleConnect",
					animation: {
						reversed: !0
					},
					startMarker: {
						enabled: !0,
						symbol: "arrow-filled",
						radius: 4,
						fill: "#fa0",
						align: "left"
					},
					endMarker: {
						enabled: !1,
						align: "right"
					}
				}
			});
			return f
		}(r);
		h(d.prototype, {
			pointArrayMap: ["start", "end", "y"],
			pointClass: z,
			setData: t.prototype.setData
		});
		B.registerSeriesType("gantt", d);
		"";
		return d
	});
	I(g, "Core/Chart/GanttChart.js", [g["Core/Chart/Chart.js"], g["Core/Defaults.js"], g["Core/Utilities.js"]],
		function(d, g, z) {
			var B = this &&
				this.__extends || function() {
					var d = function(g, h) {
						d = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function(d, g) {
							d.__proto__ = g
						} || function(d, g) {
							for (var h in g) g.hasOwnProperty(h) && (d[h] = g[h])
						};
						return d(g, h)
					};
					return function(g, h) {
						function l() {
							this.constructor = g
						}
						d(g, h);
						g.prototype = null === h ? Object.create(h) : (l.prototype = h.prototype, new l)
					}
				}(),
				y = g.getOptions,
				C = z.isArray,
				A = z.merge,
				x = z.splat;
			d = function(d) {
				function g() {
					return null !== d && d.apply(this, arguments) || this
				}
				B(g, d);
				g.prototype.init = function(g,
					l) {
					var h = y(),
						p = g.xAxis,
						f = g.yAxis,
						c;
					g.xAxis = g.yAxis = void 0;
					var r = A(!0, {
						chart: {
							type: "gantt"
						},
						title: {
							text: null
						},
						legend: {
							enabled: !1
						},
						navigator: {
							series: {
								type: "gantt"
							},
							yAxis: {
								type: "category"
							}
						}
					}, g, {
						isGantt: !0
					});
					g.xAxis = p;
					g.yAxis = f;
					r.xAxis = (C(g.xAxis) ? g.xAxis : [g.xAxis || {}, {}]).map(function(d, f) {
						1 === f && (c = 0);
						return A(h.xAxis, {
							grid: {
								enabled: !0
							},
							opposite: !0,
							linkedTo: c
						}, d, {
							type: "datetime"
						})
					});
					r.yAxis = x(g.yAxis || {}).map(function(c) {
						return A(h.yAxis, {
							grid: {
								enabled: !0
							},
							staticScale: 50,
							reversed: !0,
							type: c.categories ?
								c.type : "treegrid"
						}, c)
					});
					d.prototype.init.call(this, r, l)
				};
				return g
			}(d);
			(function(d) {
				d.ganttChart = function(g, h, l) {
					return new d(g, h, l)
				}
			})(d || (d = {}));
			return d
		});
	I(g, "masters/modules/gantt.src.js", [g["Core/Globals.js"], g["Stock/Navigator/Navigator.js"], g[
		"Stock/Scrollbar/Scrollbar.js"], g["Stock/RangeSelector/RangeSelector.js"], g[
		"Series/XRange/XRangeSeries.js"], g["Core/Chart/GanttChart.js"]], function(d, g, z, B, y, C) {
		d.GanttChart = C;
		d.ganttChart = C.ganttChart;
		d.Navigator = g;
		d.RangeSelector = B;
		d.Scrollbar = z;
		g.compose(d.Axis,
			d.Chart, d.Series);
		B.compose(d.Axis, d.Chart);
		z.compose(d.Axis);
		y.compose(d.Axis)
	});
	I(g, "masters/highcharts-gantt.src.js", [g["masters/highcharts.src.js"]], function(d) {
		d.product = "Highcharts Gantt";
		return d
	});
	g["masters/highcharts-gantt.src.js"]._modules = g;
	return g["masters/highcharts-gantt.src.js"]
});
//# sourceMappingURL=highcharts-gantt.js.map
