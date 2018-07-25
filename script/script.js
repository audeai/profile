/*
  RequestAnimationFrame Polyfill

  http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
  by Erik Möller, fixes from Paul Irish and Tino Zijdel

  MIT license
 */

(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if ( ! window.requestAnimationFrame ) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = windowindow.setTimeout(function() { callback(currTime + timeToCall); },
      timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if ( ! window.cancelAnimationFrame ) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
}());


(function(w,d,undefined){

  var el_html = d.documentElement,
    el_body = d.getElementsByTagName('body')[0],
    header = d.getElementById('header'),
    menuIsStuck = function(triggerElement, untriggerElement) {

      var wScrollTop  = w.pageYOffset || el_body.scrollTop,
        regexp    = /(nav\-is\-stuck)/i,
        classFound  = el_html.className.match( regexp ),
        navHeight = header.offsetHeight,
        bodyRect  = el_body.getBoundingClientRect(),
        scrollValue = triggerElement ?
            triggerElement.getBoundingClientRect().top - bodyRect.top - navHeight
            : 600,
        unscrollValue = untriggerElement ?
            untriggerElement.getBoundingClientRect().top - bodyRect.top - navHeight
            : 2;

      // si le scroll est d'au moins 600 et
      // la class nav-is-stuck n'existe pas sur HTML
      if ( wScrollTop > scrollValue && !classFound ) {
        el_html.className = el_html.className + ' nav-is-stuck';
        el_body.style.paddingTop = navHeight + 'px';
      }

      // si le scroll est inférieur à 2 et
      // la class nav-is-stuck existe
      if ( wScrollTop < unscrollValue && classFound ) {
        el_html.className = el_html.className.replace( regexp, '' );
        el_body.style.paddingTop = '0';
      }

    },
    onScrolling = function() {
      // on exécute notre fonction menuIsStuck()
      // dans la fonction onScrolling()
      var pinTrigger = d.getElementById('pinpoint')
      var unpinTrigger = d.getElementById('unpinpoint')
      menuIsStuck(pinTrigger, unpinTrigger);
      // on pourrait faire plein d'autres choses ici
    };

  // quand on scroll
  w.addEventListener('scroll', function(){
    // on exécute la fonction onScrolling()
    w.requestAnimationFrame( onScrolling );
  });

}(window, document));

$(".tab_content").hide();
$(".tab_content:first").show();

/* if in tab mode */
  $("ul.tabs li").click(function() {

    $(".tab_content").hide();
    var activeTab = $(this).attr("rel");
    $("#"+activeTab).fadeIn();

    $("ul.tabs li").removeClass("active");
    $(this).addClass("active");

  $(".tab_drawer_heading").removeClass("d_active");
  $(".tab_drawer_heading[rel^='"+activeTab+"']").addClass("d_active");

  });
/* if in drawer mode */
$(".tab_drawer_heading").click(function() {

    $(".tab_content").hide();
    var d_activeTab = $(this).attr("rel");
    $("#"+d_activeTab).fadeIn();

  $(".tab_drawer_heading").removeClass("d_active");
    $(this).addClass("d_active");

  $("ul.tabs li").removeClass("active");
  $("ul.tabs li[rel^='"+d_activeTab+"']").addClass("active");
  });


/* Extra class "tab_last"
   to add border to right side
   of last tab */
$('ul.tabs li').last().addClass("tab_last");

