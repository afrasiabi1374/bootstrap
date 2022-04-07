$(function() {
	$('[data-toggle="collapse"]').on('animations:complete', function (e) {
		$('html,body').animate({
			scrollTop: $(this).offset().top
		});
	});

	$('[data-toggle="collapse"]').collapsible('set', 'allowMultiple', true);

	$('#toggleMultiple').on('click', function () {
		var allow 	= Boolean($(this).data('allow'));
			allow 	= !allow;

		$(this).data('allow', allow);
		$(this).text('toggle allowMultiple: ' + allow);
		$('[data-toggle="collapse"]').collapsible('set', 'allowMultiple', allow);
	});

	$('#toggle4').on('click', function () {
		var clps = $('[data-target="#box4"]');
			clps.collapsible('toggle');
	});

	$('#open2').on('click', function () {
		var clps = $('[data-target="#box2"]');
			clps.collapsible('open');
	});

	$('#close1').on('click', function () {
		var clps = $('[data-target="#box1"]');
			clps.collapsible('close');

		$('html,body').animate({
			scrollTop: clps.offset().top
		});
	});
});
