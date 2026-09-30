$(function () {
  let isMenuOpen = false;

  // ハンバーガーメニューのクリック処理
  $('#icon-show, #icon-hide').click(function(e){
    e.stopPropagation();
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      $('.menu_wrapper').fadeIn();
      $('#icon-show').hide();
      $('#icon-hide').show();
    } else {
      $('.menu_wrapper').fadeOut();
      $('#icon-show').show();
      $('#icon-hide').hide();
    }
  });

  // 外側クリックでメニューを閉じる
  $(document).click(function(e) {
    if (
      isMenuOpen &&
      !$(e.target).closest('.menu_wrapper').length &&
      !$(e.target).is('#icon-show') &&
      !$(e.target).is('#icon-hide')
    ) {
      $('.menu_wrapper').fadeOut();
      $('#icon-show').show();
      $('#icon-hide').hide();
      isMenuOpen = false;
    }
  });

  // 画像とテキストを同期して切り替える（PC・SP共通）
  const imagesPc = $('.top_img_wrapper_pc img');
  const imagesSp = $('.top_img_wrapper_sp img');
  const messages = document.querySelectorAll('.message');
  const imgWrapperPc = document.querySelector('.top_img_wrapper_pc');
  const imgWrapperSp = document.querySelector('.top_img_wrapper_sp');
  let index = 0;

  function updateOverlay(i) {
    const noOverlay = i === 1 || i === 2;
    if (imgWrapperPc) imgWrapperPc.classList.toggle('no-overlay', noOverlay);
    if (imgWrapperSp) imgWrapperSp.classList.toggle('no-overlay', noOverlay);
  }

  imagesPc.hide().eq(0).show();
  imagesSp.hide().eq(0).show();
  messages.forEach((msg, i) => msg.classList.toggle('appear', i === 0));
  updateOverlay(index);

  setInterval(() => {
    imagesPc.eq(index).fadeOut('slow');
    imagesSp.eq(index).fadeOut('slow');
    messages[index].classList.remove('appear');

    index = (index + 1) % imagesPc.length;

    imagesPc.eq(index).fadeIn('slow');
    imagesSp.eq(index).fadeIn('slow');
    messages[index].classList.add('appear');
    updateOverlay(index);
  }, 5000);


  // スクロール時のアニメーション発火
  function fadeAnime(){
    $('.fadeUpTrigger').each(function(){
      var elemPos = $(this).offset().top - 50;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll >= elemPos - windowHeight){
        $(this).addClass('fadeUp');
      } else {
        $(this).removeClass('fadeUp');
      }
    });
  }

  $(window).scroll(function (){
    fadeAnime();
    
    // オンライン診察セクションのスクロール表現（iOS対応）
    var onlineSection = $('.online-med-wrap-sp');
    if (onlineSection.length) {
      var scrolled = $(window).scrollTop();
      var sectionTop = onlineSection.offset().top;
      var offset = scrolled - sectionTop + 200;
      var yPos = offset * 0.5;
      onlineSection.css('background-position', '30% ' + yPos + 'px');
    }
  });
});
