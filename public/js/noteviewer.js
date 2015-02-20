$(document).ready( function() {
	initializePage();
})

function initializePage() {
	$('.delete-note').click( function( e ) {
		var noteID = $(this).attr( 'id' );
		console.log( noteID );

		var ladda = Ladda.create( this );
	 	ladda.start();

		$.post( '/notes/delete/' + noteID, function( data ) {
			var classID = data['classID'];
			window.location.replace( '/classes/' + classID );
		});
	});
}