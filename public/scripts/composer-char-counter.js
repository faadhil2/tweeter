$(document).ready(function () {
  // --- our code goes here ---

  $("#tweet-text").on('input', function () {
    const $count = $(this).closest('section')
    const $charCount = $count.find('.counter')
    const currentLength = $(this).val().length;

    if (currentLength <= 140) {
      $charCount.removeClass('negative')
      $charCount.text(140 - currentLength);
    
    } else if (currentLength > 140) {
      $charCount.addClass('negative')
      $charCount.text(140 - currentLength);
    }
  });


});