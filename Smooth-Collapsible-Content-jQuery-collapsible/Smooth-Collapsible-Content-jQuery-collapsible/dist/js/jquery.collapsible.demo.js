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
});
