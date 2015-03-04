$(document).ready( function() {
	initializePage();
})

function initializePage() {
	$('#my-noats').click( function( e ) {
		woopra.track( 'click_my_noats' );
	});
	
	$('#find-classes').click( function( e ) {
		woopra.track( 'classes_nav' );
	});
}