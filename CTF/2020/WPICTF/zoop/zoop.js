// ATTENTION: READING THIS SOURCE CODE MAY NOT ONLY BURN YOUR EYES, IT IS IN VIOLATION OF OFFICIAL ZOOP CORP(TM) LTD. LLC OMGWTFBBQ POLICIES
$(document).ready(() => {
	$('#send').click(() => {
		$('#send-indicator').css('visibility', 'visible');
		$('#send-indicator').css('opacity', 1);
		$('#big-textbox').attr('disabled', true);
		$('#attach').attr('disabled', true);
	});

	$('#attach').click(() => {
		$('#file-url').val('');
		$('#attach-confirm').attr('disabled', true);
		$('#preview').attr('disabled', true);
		$('#attach-modal').modal('show');
	});

	$('#preview').click(() => {
		const fileUrl = $('#file-url').val();
		if (fileUrl.length === 0) {
			return;
		}

		$.get('/preview', {url: fileUrl}, (data) => {
			$('#preview-area').css('color', 'black');
			$('#preview-area').text(data);
		}).fail(() => {
			$('#preview-area').text("Error getting preview. Please try again later");
			$('#preview-area').css('color', 'red');
		});
	});

	$('#file-url').on('input', () => {
		const url = $('#file-url').val();
		$('#attach-confirm').attr('disabled', url.length == 0);
		$('#preview').attr('disabled', url.length == 0);
	});

	$('#attach-confirm').click(() => {
		$('#attach').attr('disabled', true);
		$('#attach-confirm').attr('disabled', true);
		const fileUrl = $('#file-url').text();
		$.post('/attach', {url: fileUrl});
		$('#attach-modal').modal('hide');
	});
});