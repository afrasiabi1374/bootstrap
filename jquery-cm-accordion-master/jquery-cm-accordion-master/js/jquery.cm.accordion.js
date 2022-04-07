/*!
 *  Plugin: jQuery CM Accordion 
 *  Author: Asif Mughal 
 *  URL: www.codehim.com
 *  Copyright (c) 2019 - CodeHim
 */
(function ($) {
	$.fn.cmAccordion = function (options) {
		var setting = $.extend({
			slidingSpeed: 300, //Define the transition speed in miliseconds for accordion sliding 
			collapsed: true, //Decide whether to open or close accordion on load
			closeOther: false, //Close other opened accordions 
			section: {
				margin: 10,
				overflow: 'hidden',
				boxSizing: 'border-box',
				borderRadius: 4,

			}, //CSS properties for accordion wraper
			summary: {
				background: '#414141',
				color: '#fff',
				textAlign: 'left',
				padding: 10,
				cursor: 'pointer',
			}, //CSS properties for visible heading of accordion 
			details: {
				background: '#ddd',
				padding: 10,

			}, //CSS properties for detailed items of accordion 
			onSlideToggle: function () {

			}, //Callback function on accordion slide toggle

		}, options);

		return this.each(function () {

			//section 
			var accordionSection = $(this).find("section");
			//summary 
			var summary = $(this).find("section .summary");

			var detailContents = $(this).find(".details");

			$(accordionSection).css(setting.section);

			$(summary).css(setting.summary);

			$(detailContents).css(setting.details);

			if (setting.collapsed == true) {
				$(detailContents).css('display', 'none');

			}

			$(summary).click(function (e) {

				e = $(this).siblings(".details");
				e.slideToggle(setting.slidingSpeed, function () {

					setting.onSlideToggle(); //callback function 

				});

				if (setting.closeOther == true) {

					$(".details").not(e).slideUp(setting.slidingSpeed); //close other opened accordions while opening new 

				}

			});

		});
	};

})(jQuery);
