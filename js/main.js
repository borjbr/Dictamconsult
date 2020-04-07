$(function() {

  // headroom
  var $headroom = $(".headroom");
  $headroom.headroom({
    tolerance: 5,
    offset : 400,
    onNotTop : function() {
      $headroom.removeClass('headroom--initial');
    }
  });

  // button appear
  if ($('.js-appear').length) {

    var posButton = $('.js-appear').offset().top;
    var $buttonAppear = $('.js-appear-btn');

    $(window).on('scroll.button', function() {
      if($(window).scrollTop() > posButton) {
        $buttonAppear.addClass('show');
      } else {
        if($buttonAppear.hasClass('show')) {
          $buttonAppear.removeClass('show');
          $buttonAppear.addClass('hide');
        }

        setTimeout(function(){
          $buttonAppear.removeClass('hide');
        }, 500);
      }
    });
  }

  // button appear mobile bottom inside page
  // var $buttonAppearInside = $('.js-appear-inside');
  // var exit = false;

  // if($buttonAppearInside.length) {
  //   $(window).on('scroll.button.inside', function() {
  //     if($(window).scrollTop() > 0 && !exit) {
  //       $buttonAppearInside.addClass('show');
  //       exit = true;
  //     } else {
  //       if($(window).scrollTop() == 0) {
  //         $buttonAppearInside.removeClass('show');
  //         exit = false;
  //       }
  //     }
  //   });
  // }


  // AOS
  AOS.init();


  // navigation items
  var $item = $nav.find('.c-nav__list').find('li');

  $item.on('click', function() {
    $item.removeClass('active');
    $(this).addClass('active');
  });

  // navigation accesibility
  var screenXL = 1200;
  var tab = 9;
  var time = null;
  var $navAccess = $('.js-nav');

  if($(window).width() < screenXL) {
    access();
  }

  $(window).on('resize', function() {
    clearTimeout(time);
    time = setTimeout(function() {
      if($(window).width() < screenXL) {
        access();
      } else {
        $navAccess.off();
      }
    }, 500);
  });

  function access() {
    var $elemsFocus = $navAccess.find('a, button');
    var firstElement = $elemsFocus.first()[0];
    var lastElement = $elemsFocus.eq(-2)[0];

    $navAccess.on('keydown', function(e) {
      var keyCode = e ? e.keyCode : '';
      if(keyCode == tab) {
        if(document.activeElement === firstElement) {
          if(e.shiftKey) {
            if($navAccess.hasClass('close')) {
              firstElement.blur();
            } else {
              e.preventDefault();
              lastElement.focus();
            }
          }
        }
        if(document.activeElement === lastElement) {
          if(!e.shiftKey) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }

  // smooth scrolling
  var $body = $('body, html');
  var $hash = $('a[href^="#"]');

  $hash.on('click', function(e) {
    e.preventDefault();
    var id = $(this).attr('href');

    $body.animate({
      scrollTop: $(id).offset().top - 80
    }, 1000);
  });

  // validate form
  var $form = $('#form');
  var $formParsley = $form.parsley();
  var $submit = $form.find('button[type="submit"]');

  $formParsley.on('field:validated', function() {

    if($formParsley.isValid()){
      $submit.removeAttr('disabled');
    } else {
      $submit.attr('disabled', '');
    }
  });

  // form accesibility
	window.Parsley.on('field:error', function() {
		this.$element.attr( 'aria-describedby', this._ui.errorsWrapperId ).attr( 'aria-invalid', 'true' );
		this._ui.$errorsWrapper.attr( 'aria-live', 'polite' );
	});

	window.Parsley.on( 'field:success', function () {
		if( this.$element.attr( 'aria-invalid' ) ){
			this.$element.removeAttr( 'aria-invalid' );
		}
	});

  // form submit
  $form.on('submit', function(e){
    e.preventDefault();

    $.ajax({
      type: 'POST',
      url: 'contact.php',
      data: $(this).serialize(),
      success: function (data) {
        $form.addClass('c-form--success');
        $form[0].reset();
        $form.parsley().reset();
      }
    });

  });

  // back form
  var $back = $('.js-back-form');

  $back.on('click', function(e){
    e.preventDefault();
    $form.removeClass('c-form--success');
  });

  // lang
  var lang = $('html').attr('lang');
  var $es = $('.c-footer__es');
  var $en = $('.c-footer__en');

  if(lang == 'es') {
    $es.addClass('active');
  } else {
    $en.addClass('active');
  }

  // skip accesibility
  var $skip = $('.js-skip');
	var $main = $('#main');

	$skip.on('click', function(e) {
		e.preventDefault();
		$main.attr('tabindex', -1).focus();
  });


  // cookie
  var st = {
    pane: '.c-cookie',
    acceptButton: '.js-cookie-accept'
  };

  var dom = {};

  var catchDom = function () {
    dom.pane = $(st.pane);
    dom.acceptButton = $(st.acceptButton);
  };

  var susbscribeEvents = function () {
    dom.acceptButton.on('click', events.acceptCookies);
  };

  var events = {
    acceptCookies: function (e) {
      localStorage.setItem('amaine', 'accepted');
      dom.pane.removeClass('c-cookie--visible');
    }
  };

  var checkCookies = function () {
    if (localStorage.getItem('amaine') && localStorage.getItem('amaine') === 'accepted') {
      dom.pane.removeClass('c-cookie--visible');
    } else {
      dom.pane.addClass('c-cookie--visible');
    }
  };

  catchDom();
  susbscribeEvents();
  checkCookies();

});

(function() {
  try {
    // centra imagenes recortando por los lados proporcionalmente
    objectFitImages();

  } catch(err) {
    alert("Error: " + err + ".");
  }
})();

