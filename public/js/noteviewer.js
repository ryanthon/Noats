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

	$('body').on( 'click', '.helpful', function() {
		var noteID = $(this).attr( 'id' );

		var parameters = {
			notesID : noteID
		}

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

	$('body').on( 'click', '.unhelpful', function() {
		var noteID = $(this).attr( 'id' );

		var parameters = {
			notesID : noteID
		}

		score = score - 1;
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