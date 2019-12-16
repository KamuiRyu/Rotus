$(".button-collapse").sideNav();
$(document).ready(function(){
  $('.parallax').parallax();
  $("#userMenu").dropdown();
  $('#pagTop').click(function(){
    $('html,body').animate({scrollTop: 0},'slow');
  });
});