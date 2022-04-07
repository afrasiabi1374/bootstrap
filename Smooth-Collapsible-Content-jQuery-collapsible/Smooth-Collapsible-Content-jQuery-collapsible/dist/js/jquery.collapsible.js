(function ($) {

	$.fn.collapsible = function() {

		var ns = {
			open: function (me, bypass) { // Open the target
				var conf = me[0].__collapsible;
				if (!conf) { return; }

				if (bypass !== true) {
					if (typeof conf.group === 'string') {
						if (String(conf.allowMultiple).toLowerCase() !== 'true') {
							window['collapsibleAnimations_'+conf.group] = 0;
							window['collapsibleGroup_'+conf.group] 		= $('[data-group="'+conf.group+'"]').not(me);

							var group = window['collapsibleGroup_'+conf.group];
								group.each(function () { ns.close($(this)); });

							ns.open(me, true);
							return;
						}
					}
				}

				me.trigger('before:open');
				me.attr('aria-expanded', true);
				conf.target.attr('aria-expanded', true);
				conf.expanded = true;
				me.trigger('open');

				if (conf.init !== true) {
				  setTimeout(function () {
					conf.init = true;
					me.__collapsible = conf;
				  }, conf.speed + 100);
				}
			},

			close: function (me) { // Close the target
				var conf = me[0].__collapsible;
				if (!conf) { return; }

				me.trigger('before:close');
				me.attr('aria-expanded', false);
				conf.target.attr('aria-expanded', false);
				conf.expanded = false;
				me.trigger('close');

				if (conf.init !== true) {
				  setTimeout(function () {
					conf.init = true;
					me.__collapsible = conf;
				  }, conf.speed + 100);
				}
			},

			toggle: function (me) { // Toggle the target open/close
				var conf = me[0].__collapsible;
				if (!conf) { return; }

				me.trigger('before:toggle');

				var active = String(me.attr('aria-expanded')).toLowerCase();
					active = (active === 'true') ? true : false;

				if (active === true) {
					ns.close(me);
				} else {
					ns.open(me);
				}

				me.trigger('toggle');
			},

			set: function () {
				var args = arguments[1];
				var prop = args[1];
				var val = args[2];

				var params = ['allowMultiple', 'group', 'speed', 'target'];
				if (params.indexOf(prop) < 0) { return; }

				arguments[0].each(function () {
					this.__collapsible[prop] = val;
				});
			},

			get: function () {
				var args = arguments[1];
				var prop = args[1];

				var params = ['allowMultiple', 'group', 'speed', 'target'];
				if (params.indexOf(prop) < 0) { return; }

				return arguments[0].__collapsible[prop];
			},

			onClick: function (e) { // On click handler
				if (!e.target.__collapsible) { return; }

				if ($(e.target).is('a')) {
					e.preventDefault();
				}

				ns.toggle($(e.target));
			},

			onClose: function (e) { // On close handler
				if (!e.target.__collapsible) { return; }

				var me = e.target;
				var targ = me.__collapsible.target;
					targ.stop().slideUp(me.__collapsible.speed, function () {
						$(me).trigger('after:close');
						$(me).trigger('animation:complete', ['close']);

						window['collapsibleAnimations_'+me.__collapsible.group] += 1;

						var count = window['collapsibleAnimations_'+me.__collapsible.group];
						var group = window['collapsibleGroup_'+me.__collapsible.group];
						if (!group) { return; }

						if (count >= group.length) {
						  $('[data-group="'+me.__collapsible.group+'"]:focus').trigger('animations:complete', ['close']);
						}

					});
			},

			onOpen: function (e) { // On open handler
				if (!e.target.__collapsible) { return; }
				var me = e.target;
				var targ = me.__collapsible.target;
					targ.stop().slideDown(me.__collapsible.speed, function () {
						$(me).trigger('after:open');
						$(me).trigger('animation:complete', ['open']);

						if (me.__collapsible.init === true) {
						  if (String(me.__collapsible.allowMultiple).toLowerCase() === 'true') {
							  $(me).trigger('animations:complete', ['open']);
						  }
						}
					});
			}
		};

		if (typeof arguments[0] === 'string') { // Public Methods

			switch (String(arguments[0]).toLowerCase()) {
				case 'open':
				case 'show':
					this.each(function () { ns.open($(this)); });
					break;

				case 'close':
				case 'hide':
					this.each(function () { ns.close($(this)); });
					break;

				case 'toggle':
					this.each(function () { ns.toggle($(this)); });
					break;

				case 'set':
					ns.set(this, arguments);
					break;

				case 'get':
					ns.get(this, arguments);
					break;
			}

			return this;

		} else { // Initialization

			// Event listeners
			this.on('click', ns.onClick);
			this.on('open', ns.onOpen);
			this.on('close', ns.onClose);

			var defaultConfig = $.extend({
				allowMultiple: true,
				expanded: false,
				group: null,
				init: false,
				speed: 250,
				target: null,
				temp: {}
			}, arguments[0]);

			// Constructor
			this.each(function (i) {
				// Default config
				var config = $.extend({}, defaultConfig);

				// update the config with data attributes
				var data = $(this).data();
				for (var prop in defaultConfig) {
				  if (data[prop]) { config[prop] = data[prop]; }
				}

				// If the element is an <a> tag -> use the href attribute
				if ($(this).is('a')) {
					config.target = $(this).attr('href') || config.target;
				}


				// Exit if no target specified
				if (!config.target || config.target === null) { return; }

				// Convert the target into a jQuery object
				config.target = $(config.target);

				// Set the expanded value
				config.expanded = $(this).attr('aria-expanded') || config.expanded;
				config.expanded = (typeof config.expanded === 'string') ? config.expanded.toLowerCase() : config.expanded;
				config.expanded = (config.expanded === 'true') ? true : config.expanded;

                // temp storage object
                config.temp = {animations: 0, group: null};


				// Initialize
				this.__collapsible = config;

				// Open/close any elements
				if (config.expanded === true) {
					ns.open($(this));
				} else {
					ns.close($(this));
				}
			});


			// Return the query
			return this;
		}
	};

	// Default initializer
	$('[data-toggle="collapse"]').collapsible();

}(jQuery));
