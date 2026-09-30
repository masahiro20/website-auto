$(function () {
  let isMenuOpen = false;

  // ハンバーガーメニューの開閉処理
  $('#icon-show, #icon-hide').click(function (e) {
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

  // 外側クリックで閉じる
  $(document).click(function (e) {
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

  // トップ画像とテキストの同期表示
  const images = $('.top_img_wrapper_pc img');
  const messages = document.querySelectorAll('.message');
  let index = 0;

  images.hide().eq(0).show();
  messages.forEach((msg, i) => msg.classList.toggle('appear', i === 0));

  setInterval(() => {
    images.eq(index).fadeOut('slow');
    messages[index].classList.remove('appear');

    index = (index + 1) % images.length;

    images.eq(index).fadeIn('slow');
    messages[index].classList.add('appear');
  }, 7000);

  // スクロールアニメーション
  function fadeAnime() {
    $('.fadeUpTrigger').each(function () {
      const elemPos = $(this).offset().top - 50;
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();
      if (scroll >= elemPos - windowHeight) {
        $(this).addClass('fadeUp');
      } else {
        $(this).removeClass('fadeUp');
      }
    });
  }

  $(window).scroll(function () {
    fadeAnime();
  });

  // メッセージ表示アニメーションCSS
  const style = document.createElement('style');
  style.innerHTML = `
    .message {
      display: none;
      text-align: center;
      opacity: 0;
    }
    .message.appear {
      display: block;
      animation: fadeIn 1s ease-out forwards;
    }
    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: translateY(30px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
});
