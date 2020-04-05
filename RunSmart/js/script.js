//carousel
$(document).ready(function(){
  $('.carousel__inner').slick({
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/left_arrow.png" alt="previous"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/right_arrow.png" alt="next"></button>',
      responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
              cssEase: 'linear',
              arrows: false
            }
          }
      ]
  });

  //tabs
  $('ul.tab').on('click', 'li:not(.tab__item_active)', function() {
    $(this)
      .addClass('tab__item_active').siblings().removeClass('tab__item_active')
      .closest('div.container').find('div.catalog__item').removeClass('catalog__item_active').eq($(this).index()).addClass('catalog__item_active');
  });

  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e){
        e.preventDefault();
        $('.card__content').eq(i).toggleClass('card__content_active');
        $('.card__full-descr').eq(i).toggleClass('card__full-descr_active');
      })
    })
  }
  toggleSlide('.card__link');
  toggleSlide('.card__link-back');

  //Modal
  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn();
  });

  $('.modal__close').on('click', function() {
    $('.overlay, #order, #consultation, #thanks').fadeOut();
  });

  $('.btn_mini').each(function(i){
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.card__title').eq(i).text());
      $('.overlay, #order').fadeIn();
    });
  });

  function ValidateForms(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: "Обязательное поля!",
        phone: "Обязательное поля!",
        email: {
          required: "Обязательное поле!",
          email: "Не верно введен email"
        }
      }
    });
  };
  ValidateForms('#consultation form');
  ValidateForms('#consultation-form');
  ValidateForms('#order form');

  $("input[name=phone]").mask("+7 (999) 999-99-99");

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function(){
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn();
      $('form').trigger('reset')
    });
    return false;
  });

  new WOW().init();

  //smooth scroll
  $(window).scroll(function(){
    if($(this).scrollTop() > 1600) {
      $('.to-top').fadeIn();
    }
    else {
      $('.to-top').fadeOut();
    };
  });


  $("a[href^='#top']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });
});