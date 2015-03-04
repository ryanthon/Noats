var score = 0;

$(document).ready( function() {
	initializePage();

	score = parseInt( $('.helpful-count').attr( 'id' ) );
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

	$('body').on( 'click', '.helpful', function( e ) {
		e.preventDefault();
	    e.stopImmediatePropagation();

		var noteID = $(this).attr( 'id' );

		var parameters = {
			notesID : noteID
		}

		woopra.track( 'mark_helpful_a' );

		score = score + 1;
		$('.helpful-count').text( function() {
			return score + ' people found these notes helpful.';
		});

		$(this).text( function() {
			return 'Mark as Unhelpful';
		});
		$(this).removeClass( 'helpful' ).addClass( 'unhelpful' );
		$(this).removeClass( 'btn-success' ).addClass( 'btn-danger' );

		$.post( '/notes/helpful', parameters );
	});

	$('body').on( 'click', '.unhelpful', function( e ) {
		e.preventDefault();
	    e.stopImmediatePropagation();

		var noteID = $(this).attr( 'id' );

		var parameters = {
			notesID : noteID
		}

		if( $(this).hasClass( 'btn-success' ) ) {
			return;
		}

		woopra.track( 'mark_unhelpful_a' );

		score = score - 1;
		if( score < 0 ) {
			score = 0;
		}
		$('.helpful-count').text( function() {
			return score + ' people found these notes helpful.';
		});

		$(this).text( function() {
			return 'Mark as Helpful';
		});
		$(this).removeClass( 'unhelpful' ).addClass( 'helpful' );
		$(this).removeClass( 'btn-danger' ).addClass( 'btn-success' );

		$.post( '/notes/unhelpful', parameters );
	});
}