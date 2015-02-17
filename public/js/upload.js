var selectedClassID = '';

$(document).ready( function() {
	initializePage();
})

function initializePage() {
	$('.class-btn').first().button( 'toggle' );
	selectedClassID = $('.class-btn').first().attr( 'id' );

	$('.class-btn').click( function( e ) {
		selectedClassID = e.target.id;
		console.log( selectedClassID );
	})

	$('#submit-text').click( function( e ) {
		console.log( selectedClassID );
		console.log( $('#note-text').val() );
	})
}