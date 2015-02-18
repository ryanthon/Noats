$(document).ready( function() {
	initializePage();

	var topic = $('.topic-label').attr( 'id' );
	var matched = $("[id='" + topic + "']").addClass( 'active' );
})

function initializePage() {
	$('body').on( 'click', '.add-class', function() {
		var classID = $(this).attr( 'id' );
		var parameters = {
			"classID" : classID
		}

		$(this).text( function() {
			return 'Remove Class';
		});
		$(this).removeClass( 'add-class' ).addClass( 'remove-class' );

		$.post( '/classes/add', parameters );
	});

	$('body').on( 'click', '.remove-class', function() {
		var classID = $(this).attr( 'id' );
		var parameters = {
			"classID" : classID
		}

		$(this).text( function() {
			return 'Add Class';
		});
		$(this).removeClass( 'remove-class' ).addClass( 'add-class' );

		$.post( '/classes/remove', parameters );
	});
}