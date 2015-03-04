var selectedTopic = '';
var classID = '';
var notesID = '';

$(document).ready( function() {
	initializePage();
});

function initializePage() {
	notesID = $('.outer-edit').attr( 'id' );
	classID = $('.class-link').attr( 'id' );

	console.log( notesID );
	console.log( classID );

	var topic = $('.topic-title').attr( 'id' );

	if( topic ) {
		var matched = $("[id='" + topic + "']").addClass( 'active' );
		selectedTopic = topic;
	}
	else {
		$('.topic-btn').first().addClass( 'active' );
		selectedTopic = $('.topic-btn').first().attr( 'id' );
	}
	
	$('#note-topic').keyup( function() {
		var text = $(this).val();

		if( text.length == 0 ) {
			$('.topic-btn').first().addClass( 'active' );
			selectedTopic = $('.topic-btn').first().attr( 'id' );
		}
		else {
			$('.topic-btn').removeClass( 'active' );
			selectedTopic = $(this).val();
		}
	});

	$('#note-text').keyup( function() {
		$('#text-error').remove();
	});

	$('#note-title').keyup( function() {
		$('#title-error').remove();
	});

	$('#note-file').keyup( function() {
		$('#url-error').remove();
	});

	$('.topic-btn').click( function( e ) {
		$('.topic-btn').removeClass( 'active' );
		selectedTopic = e.target.id;
		$("[id='" + selectedTopic + "']").addClass( 'active' );
		$('#note-topic').val( '' );
		console.log( selectedTopic );
	});

	$('#submit-text').click( function( e ) {
		var text = $('#note-text').val();
		var title = $('#note-title').val();

		if( title.length == 0 ) {
			var errorMsg = $('#text-form').find( '#title-error' );
			if( !errorMsg.length ) {
				$('#text-form').append( '<span style="color:red" id="title-error">&nbspYour document needs a title!</span>' );
			}
			return;
		}
		else if( text.length == 0 ) {
			var errorMsg = $('#text-form').find( '#text-error' );
			if( !errorMsg.length ) {
				$('#text-form').append( '<span style="color:red" id="text-error">&nbspThe text box is empty!</span>' );
			}
			return;
		}

		var data = {
			"topic"   : selectedTopic,
			"text"    : text,
			"title"   : title,
			"classID" : classID
		}

		var ladda = Ladda.create( this );
	 	ladda.start();

		$.ajax({
			url: '/upload/edit/' + notesID, 
			type: 'PUT',
			data: data, 
			success: function() {
				window.location.replace( '/notes/' + notesID );
			},
			error: function() {
				window.location.replace( '/notes/' + notesID );
			}
		});
	});

	$('#submit-file').click( function( e ) {
		var url = $('#note-file').val();
		var title = $('#note-title').val();

		if( title.length == 0 ) {
			var errorMsg = $('#file-form').find( '#title-error' );
			if( !errorMsg.length ) {
				$('#file-form').append( '<span style="color:red" id="title-error">&nbspYour document needs a title!</span>' );
			}
			return;
		}
		else if( url.length == 0 ) {
			var errorMsg = $('#file-form').find( '#url-error' );
			if( !errorMsg.length ) {
				$('#file-form').append( '<span style="color:red" id="url-error">&nbspYou must enter a link/URL!</span>' );
			}
			return;
		}

		var data = {
			"topic"   : selectedTopic,
			"url"     : url,
			"title"   : title,
			"classID" : classID
		}

		var ladda = Ladda.create( this );
	 	ladda.start();

		$.ajax({
			url: '/upload/edit/' + notesID, 
			type: 'PUT',
			data: data, 
			success: function() {
				window.location.replace( '/notes/' + notesID );
			},
			error: function() {
				window.location.replace( '/notes/' + notesID );
			}
		});
	});

}