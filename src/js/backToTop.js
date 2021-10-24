var amountScrolled = 200;
export function foo() {
  $(window).scroll(function () {
    if ($(window).scrollTop() > amountScrolled) {
      $('a.back-to-top').fadeIn('slow');
    } else {
      $('a.back-to-top').fadeOut('slow');
    }
  });
  $('a.back-to-top').click(function () {
    $('html, body').animate(
      {
        scrollTop: 0,
      },
      400,
    );
    return false;
  });
}
