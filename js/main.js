$(function() {

  // headroom
  // var $headroom = $(".headroom");
  // $headroom.headroom({
  //   tolerance: 5,
  //   offset : 400,
  //   onNotTop : function() {
  //     $headroom.removeClass('headroom--initial');
  //   }
  // });

  //particles
  if ($('#particles-js').length) {
    particlesJS.load('particles-js', 'data/particles.json', function() {});
  }



  // AOS
  AOS.init();

  
  // navigation
  var $nav = $('.js-nav');
  var $navBody = $('body, html');
  var $navHamburger= $nav.find('.c-nav__hamburger');

  $navHamburger.on('click', function() {
    if($nav.hasClass('open')) {
      $navBody.removeClass('c-nav-noscroll');
      $nav.removeClass('open');
      $nav.addClass('close');
    } else {
      $nav.removeClass('close');
      $nav.addClass('open');
      $navBody.addClass('c-nav-noscroll');
    }
  });

  // navigation items
  var $item = $nav.find('.c-nav__list').find('li');

  $item.on('click', function() {
    $item.removeClass('active');
    $(this).addClass('active');
  });

  // navigation items mobile
  var $itemMobile = $nav.find('.c-nav__list-mobile').find('li');

  $itemMobile.on('click', function() {
    $itemMobile.removeClass('active');
    $(this).addClass('active');
    if($nav.hasClass('open')) {
      $navBody.removeClass('c-nav-noscroll');
      $nav.removeClass('open');
      $nav.addClass('close');
    } else {
      $nav.removeClass('close');
      $nav.addClass('open');
      $navBody.addClass('c-nav-noscroll');
    }
  });



  // // navigation accesibility
  // var screenXL = 1200;
  // var tab = 9;
  // var time = null;
  // var $navAccess = $('.js-nav');

  // if($(window).width() < screenXL) {
  //   access();
  // }

  // $(window).on('resize', function() {
  //   clearTimeout(time);
  //   time = setTimeout(function() {
  //     if($(window).width() < screenXL) {
  //       access();
  //     } else {
  //       $navAccess.off();
  //     }
  //   }, 500);
  // });

  // function access() {
  //   var $elemsFocus = $navAccess.find('a, button');
  //   var firstElement = $elemsFocus.first()[0];
  //   var lastElement = $elemsFocus.eq(-2)[0];

  //   $navAccess.on('keydown', function(e) {
  //     var keyCode = e ? e.keyCode : '';
  //     if(keyCode == tab) {
  //       if(document.activeElement === firstElement) {
  //         if(e.shiftKey) {
  //           if($navAccess.hasClass('close')) {
  //             firstElement.blur();
  //           } else {
  //             e.preventDefault();
  //             lastElement.focus();
  //           }
  //         }
  //       }
  //       if(document.activeElement === lastElement) {
  //         if(!e.shiftKey) {
  //           e.preventDefault();
  //           firstElement.focus();
  //         }
  //       }
  //     }
  //   });
  // }

  // smooth scrolling
  // var $body = $('body, html');
  // var $hash = $('a[href^="#"]');

  // $hash.on('click', function(e) {
  //   e.preventDefault();
  //   var id = $(this).attr('href');

  //   $body.animate({
  //     scrollTop: $(id).offset().top - 80
  //   }, 1000);
  // });

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



//cambiar logotipo scroll

$(function() { var logo = $(".lrg-logo"); $(window).scroll(function() {
  var scroll = $(window).scrollTop();
  
      if (scroll >= 500) {
        if(!logo.hasClass("sml-logo")) {
          logo.hide();
          logo.removeClass('lrg-logo').addClass("sml-logo").fadeIn( "slow");
          $(".c-header").css("height", "60px").fadeIn( "slow");
        }
      } else {
        if(!logo.hasClass("lrg-logo")) {
          logo.hide();
          logo.removeClass("sml-logo").addClass('lrg-logo').fadeIn( "slow");
          $(".c-header").css("height", "120px").fadeIn( "slow");
        }
      }
  });

	function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires + "; path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var user=getCookie("_namecookie");
if (user == "") {
    $('#js_barra_aceptacion_cookie').css({
      display: 'block'
    });
 }
$('#js_btn_cookie').on('click', function(e) {
  e.preventDefault();
  user = 'Dictamconsult';
  if (user != "" && user != null) {
    setCookie("_namecookie", user, 30);
    $('#js_barra_aceptacion_cookie').css({
      display: 'none'
    });
    console.log("cookie creada: " + user);
   }
});

if(user == ""){
  console.log("cookie actual: Null");
}else{
 console.log("cookie actual: " + user);
}

});
});

// Este es el método que vamos a llamar
// cada vez que se detecte una intersección
function onScrollEvent(entries, observer) {
  entries.forEach(function(entry) {
      if (entry.isIntersecting) {
          var attributes = entry.target.attributes;
          var src = attributes['data-src'].textContent;
          entry.target.src = src;
          entry.target.classList.add('visible');
      }
  });
}

// Utilizamos como objetivos todos los
// elementos que tengan la clase lazyLoad,
// que vimos en el HTML de ejemplo.
var targets = document.querySelectorAll('.lazyLoad');

// Instanciamos un nuevo observador.
var observer = new IntersectionObserver(onScrollEvent);

// Y se lo aplicamos a cada una de las
// imágenes.
targets.forEach(function(entry) {
  observer.observe(entry);
});