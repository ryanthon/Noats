$(document).ready( function() {
	initializePage();
})

function initializePage() {
	$('.add-class').click( function( e ) {
		var classID = e.target.id;
		var parameters = {
			"classID" : classID
		}

		$.post( '/classes/add', parameters, function() {
			console.log( "DID POST" );
			location.reload( true );
		});
	})

	$('.remove-class').click( function( e ) {
		var classID = e.target.id;
		var parameters = {
			"classID" : classID
		}

		$.post( '/classes/remove', parameters, function() {
			location.reload( true );
		});
	})
}