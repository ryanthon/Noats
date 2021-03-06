var score = 0;

$(document).ready( function() {
	initializePage();

	score = parseInt( $('.helpful-count').attr( 'id' ) );
	console.log( score );
})

function initializePage() {
	$('.delete-note').click( function( e ) {
		var noteID = $(this).attr( 'id' );

		var ladda = Ladda.create( this );
	 	ladda.start();

		$.post( '/notes/delete/' + noteID, function( data ) {
			var classID = data['classID'];
			window.location.replace( '/classes/' + classID );
		});
	});

	$('.edit-note').click( function( e ) {
		woopra.track( 'edit_note' );
	});

	$('body').on( 'click', '.helpful', function() {
		var noteID = $(this).attr( 'id' );

		var parameters = {
			notesID : noteID
		}

		woopra.track( 'mark_helpful_b' );

		if( $(this).hasClass( 'btn-success' ) ) {
			return;
		}

		score = score + 1;
		$('.helpful-count').text( function() {
			return score + ' people found these notes helpful.';
		});

		$(this).text( function() {
			return 'Marked as Helpful';
		});

		$('.unhelpful').text( function() {
			return 'Mark as Unhelpful';
		});

		$('.unhelpful').removeClass( 'btn-danger' );
		$(this).addClass( 'btn-success' );

		$.post( '/notes/helpful', parameters );
	});

	$('body').on( 'click', '.unhelpful', function() {
		var noteID = $(this).attr( 'id' );

		var parameters = {
			notesID : noteID
		}

		woopra.track( 'mark_unhelpful_b' );

		if( $(this).hasClass( 'btn-danger' ) ) {
			return;
		}

		score = score - 1;

		if( score < 0 ) {
			score = 0;
		}

		$('.helpful-count').text( function() {
			return score + ' people found these notes helpful.';
		});

		$(this).text( function() {
			return 'Marked as Unhelpful';
		});

		$('.helpful').text( function() {
			return 'Mark as Helpful';
		});

		$('.helpful').removeClass( 'btn-success' );
		$(this).addClass( 'btn-danger' );

		$.post( '/notes/unhelpful', parameters );
	});
}