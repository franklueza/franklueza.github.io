// 偵測捲動位置 Highlight 連結（捲動到的連結會亮起來）
$('body').scrollspy({ target: '#navbar-link' })

// 建立 function 以利重複運用
function navbarDarkBG() {
  $(".navbar").css({
    "background-color": "white",
    "transition": "all .8s"
  })
}
function navbarNoBG() {
  $(".navbar").css({
    "background-color": "rgba(0, 0, 0, 0)",
    "transition": "all .8s"
  });
}
function collapseHide() {
  $(".navbar-collapse").collapse("hide")
} 
function subNaviFixedDarkBG() {
  $(".sub-navi-fixed").css({
    'background-color': 'rgba(0, 0, 0, 0.8)',
    "transition": "all .8s"
  }); 
}
function subNaviFixedDownNoBG() {
  $(".sub-navi-fixed-down").css({
    'background-color': 'rgba(0, 0, 0, 0)',
    
    "transition": "all .8s"
  }); 
}
function togglerCollapseBG() {
  // 手機導行列開啟、關閉行為（初始 top、捲動後 top 的不同回饋）
  // 此段置外無法解決往上滑的關閉問題( navbar 背景會變透明 )，故於往上滑程式段再放一次。
  $(".navbar-toggler").click(function() {
    var scrollTop = $(document).scrollTop();
    var opened = $("#navbar-link").hasClass("show");
    if (scrollTop > 0) {
      if (opened !== true) {
        navbarDarkBG();
      } else {
        navbarDarkBG();
      }
    } else {
      if (opened !== true) {
        navbarDarkBG();
      } else {
        navbarNoBG();
      }
    }
  });
}

// 執行「手機導行列開啟、關閉行為」function
togglerCollapseBG();

// 拖動相關行為設定
var naviTop = $(document).scrollTop();
var navbarH = $(".navbar").outerHeight();
var original = 1;

// 整個網頁往下滑動後的效果
$(window).scroll(function() {
  // 宣告變數 scrolled
  var scrolled = $(document).scrollTop();

  // 如果拖曳後的 top 值大於 navbar 的高度( 加 = 號避免中介狀態 )
  if (scrolled >= navbarH) {  
    // 延後 250 毫秒時間，顯示 .sub-navi-fixed 的背景為深色。
    // setTimeout(function() {
    //   subNaviFixedDarkBG();
    // }, 250);
    subNaviFixedDarkBG();
    // 往下捲動時就直接關閉展開的手機導行列
    $('.navbar-collapse').collapse('hide');
    // 在 .sub-navi-container 中增加 .sub-navi-fixed
    // 與上述 subNaviFixedDarkBG() 相同，一個寫在 JS 中，一個加載 CSS。
    $(".sub-navi-container").addClass("sub-navi-fixed");
    // 加載使 .navbar 上移的 .nav-move-up
    $(".navbar").addClass("nav-move-up");
    // 加載細線，使畫面上移時細線不會突然跳掉
    $(".line").addClass("line-appear");
    // 不然就……
  // } else {
  //   // 在 .sub-navi-container 中移除 .sub-navi-fixed
  //   $(".sub-navi-container").removeClass("sub-navi-fixed");
  //   // 移除使 .navbar 上移的 .nav-move-up
  //   $(".navbar").removeClass("nav-move-up");
  //   // 移除細線
  //   // $(".line").removeClass("line-appear");
  } 

  // 往上捲動效果( 正敘法 )
  // 如果「當前的」 top 值小於「前一刻」的 top 值
  if (scrolled < naviTop) {
    // 在 .sub-navi-container 中增加 .sub-navi-fixed-down
    $(".sub-navi-container").addClass("sub-navi-fixed-down");
    // 移除使 .navbar 上移的 .nav-move-up
    $(".navbar").removeClass("nav-move-up");
    // 加載細線
    $(".line").addClass("line-appear");
    // 執行 navbar 深色背景的函式
    navbarDarkBG();
    // 往上捲動時就直接關閉展開的手機導行列
    $('.navbar-collapse').collapse('hide');
    // 手機導行列開啟、關閉行為
    togglerCollapseBG(); 
    // 不然就…… 
  } else { 
    // 在 .sub-navi-container 中移除 .sub-navi-fixed-down
    $(".sub-navi-container").removeClass("sub-navi-fixed-down");
    // 移除細線
    // $(".line").removeClass("line-appear");
  }

  // 如果捲動回到最頂端
  if (scrolled <= original) {
    // navbar 背景透明
    navbarNoBG();
    // sub-navi-fixed-down 背景透明
    subNaviFixedDownNoBG();
    function removeFixedSubNavi() {
      // 在 .sub-navi-container 中移除 .sub-navi-fixed-down 與 sub-navi-fixed
      $(".sub-navi-container").removeClass("sub-navi-fixed-down");
      $(".sub-navi-container").removeClass("sub-navi-fixed");
      // 移除細線
      $(".line").removeClass("line-appear");
    }
    setTimeout(removeFixedSubNavi, 100);
  }
  
  // 再抓一次頁面 top 值，此值將丟回上面的判斷式，使兩組導行列下滑。
  naviTop = $(document).scrollTop();
});

// 關閉 collapse 選單當選單內任何連結被按下後
// 在這整隻程式中，「關閉 collapse 選單」的行為已被定義在「上滑、下滑」中，故不需要此段再述。
// $('.navbar-collapse ul li a').click(function() {
//   togglerCollapseBG();
//   $('.navbar-collapse').collapse('hide'); 
// });

var smoothScroll_finish = false; 
function smoothScroll() {
  // 通用型 Smooth Scroll
  // Select all links with hashes
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
  smoothScroll_finish = true; 
}

smoothScroll();

function navibarUp() {
  // $("p").css({
  //   "color": "rgba(255, 0, 0, 1)"
  // });
  $(".navbar").addClass("nav-move-up");
  $(".sub-navi-container").removeClass("sub-navi-fixed-down");
}

function li_A() {
  $('.navbar-collapse ul li a').click(function() {
    if(smoothScroll_finish) { 
      setTimeout(navibarUp, 1100);
    } 
  });
}

li_A(); 

// A 函式執行完，再執行 B 函式樣板
// var a_finish = false; 
// function a() { 
//   // Do some thing... 
//   a_finish = true; 
// } 
// function b() { 
//   if(!a_finish) { 
//     setTimeout(b, 10); 
//   } 
// } 
// setTimeout(a, 1000); 
// b(); 

// 網頁 top 值為 0 時手機導行列開啟後，logo 按下行為
// 多寫，反而造成畫面閃動，因為 navbarNoBG()
// $(".navbar-brand").click(function() {
//   navbarNoBG();
//   collapseHide();
// });



var words = ['Diseño Web', 'Desarrollo Web'],
    wordWrapper = document.getElementById('word'),
    wordWrapperContent = wordWrapper.innerHTML,
    addingWord = false,
    counter = 1;

setInterval(function(){

  if(wordWrapperContent.length > 0 && !addingWord ) {
    wordWrapper.innerHTML = wordWrapperContent.slice(0, -1);
    wordWrapperContent = wordWrapper.innerHTML;
  } else {
    addingWord = true;
  }

  if( addingWord ){
    if( wordWrapperContent.length < words[counter].length  ) {
      wordWrapper.innerHTML = words[counter].slice(0, wordWrapperContent.length + 1);
      wordWrapperContent = wordWrapper.innerHTML;
    } else {
      if( counter < words.length) {
        counter ++
      }
      addingWord = false;
    }
  }

  if( counter == words.length) {
    counter = 0;
  }

}, 150);

