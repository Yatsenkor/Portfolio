$('.modalBtn').click(function(){
    $('.modal').fadeIn('fast').addClass('modal_active');
    $('body').css('overflow-y', 'hidden');
});

$('.modal-close').click(function() {
    $('body').css('overflow-y', 'unset');
    $('html').css('padding-right', '0');
    $('.modal').removeClass('modal_active');
    $('.modal').fadeOut('fast');
});

$(document).keydown(function(eventObject) {
    if (eventObject.which == 27) {
        $('.modal').removeClass('modal_active');
        $('.modal').fadeOut('fast');
        $('body').css('overflow-y', 'unset');
        $('html').css('padding-right', '0');

    }
});

$('#tel').mask("+7 (999) 999-9999");
$('#modalTel').mask("+7 (999) 999-9999");


$('.footer-form__btn').click(function() {
    let tel = $('#tel').val();
if (tel.length != 17) {
    $('.footer-form__text').css('color', 'red');

} else {
    $('.footer-form__text').css('color', 'grey');
}
if (!($('#checkbox').is(':checked'))) {
    $('.label-check-text').css('color', 'red');
} else {
    $('.label-check-text').css('color', 'grey');
}
$.ajax({
  url: 'send.php',
  type: 'POST',
  data: {
    'tel': tel
},
  success: function(msg) {
    console.log(msg);
    if (msg == 'ok') {
      alert('Сообщение отправлено');
      $('.footer-form').trigger('reset'); // очистка формы
    } else {
      alert('Ошибка');
    }
  }
});
});
