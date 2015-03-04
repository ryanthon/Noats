$(document).ready( function() {
	initializePage();

	var topic = $('.topic-label').attr( 'id' );
	var matched = $("[id='" + topic + "']").addClass( 'active' );
})

function initializePage() {
	$('body').on( 'click', '.add-class', function( e ) {
		e.preventDefault();
	    e.stopImmediatePropagation();

		var classID = $(this).attr( 'id' );
		var parameters = {
			"classID" : classID
		}

		$(this).removeClass( 'add-class' );

		$.post( '/classes/add', parameters, function( response ) {
			window.location.replace( '/home' );
		});
	});

	$('body').on( 'click', '.remove-class', function( e ) {
		e.preventDefault();
    	e.stopImmediatePropagation();

		var classID = $(this).attr( 'id' );
		var parameters = {
			"classID" : classID
		}

		$(this).removeClass( 'remove-class' );

		$.post( '/classes/remove', parameters, function( response ) {
			window.location.replace( '/home' );
		});
	});
}