var selectedTopic = '';
var classID = '';

$(document).ready( function() {
	initializePage();
})

function initializePage() {
	classID = $('.class-link').attr( 'id' );

	$('.topic-btn').first().addClass( 'active' );
	selectedTopic = $('.topic-btn').first().attr( 'id' );

	$('#note-topic').keyup( function() {
		$('.topic-btn').removeClass( 'active' );
		selectedTopic = $(this).val();
		console.log( selectedTopic );
	});

	$('.topic-btn').click( function( e ) {
		$('.topic-btn').removeClass( 'active' );
		selectedTopic = e.target.id;
		$("[id='" + selectedTopic + "']").addClass( 'active' );
		$('#note-topic').val( '' );
		console.log( selectedTopic );
	});

	$('#submit-text').click( function( e ) {
		var data = {
			"topic" : selectedTopic,
			"text" : $('#note-text').val(),
			"title" : $('#note-title').val(),
			"classID" : classID
		}

		var ladda = Ladda.create( this );
	 	ladda.start();

		$.post( '/upload/text', data, function() {
			window.location.replace( '/classes/' + classID );
		});
	});

	$('#submit-file').click( function( e ) {
		var data = {
			"topic" : selectedTopic,
			"url" : $('#note-file').val(),
			"title" : $('#note-title').val(),
			"classID" : classID
		}

		var ladda = Ladda.create( this );
	 	ladda.start();

		$.post( '/upload/file', data, function() {
			window.location.replace( '/classes/' + classID );
		});
	});

}