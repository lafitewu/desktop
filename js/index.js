//本地存储功能
    var storage = window.localStorage;
    if(storage.url) {
        $(".container").css({"background":"url("+storage.url+") no-repeat center","background-size":"100%"});
    }
    function requestFullScreen(element) {
     // 判断各种浏览器，找到正确的方法
     var requestMethod = element.requestFullScreen || //W3C
     element.webkitRequestFullScreen || //Chrome等
     element.mozRequestFullScreen || //FireFox
     element.msRequestFullScreen; //IE11
     if (requestMethod) {
      requestMethod.call(element);
     }
     else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
      var wscript = new ActiveXObject("WScript.Shell");
      if (wscript !== null) {
       wscript.SendKeys("{F11}");
      }
     }
    }
    $("body").contextmenu(function() {  
      return false;
    });
    $("body").click(function() {requestFullScreen(document.documentElement)}); 
    function pclock() {
      this.dom = $(".input input");
      this.Animate = ["zoomOutDown","bounce","fadeInDown","lightSpeedIn","lightSpeedOut","flipInY","rotateOut","bounceInUp"];
    };
    pclock.prototype = {
        Class:function(a,b,c) {
          $(a).show().addClass(b);
          $(a).removeClass(c);
        },
        Notice:function(a,b,c) {
          if(c) {
            $(a).slideDown(b);
          }else{
            $(a).slideUp(b);
          }
        },
        yanzhen:function() {
          var pwd = 123456; //设置密码
          if(this.dom.val() == pwd) {
              Lock.Class(".lock",Lock.Animate[0]);
              this.Notice(".notice",1000,1);
          }else {
              this.dom.val("");
              Lock.Class(".input input",Lock.Animate[1]);
              this.dom.attr({"placeholder":"密码错误"});
          }
        },
        //锁屏
        lockClick:function() {
             this.dom.blur(function() {
                Lock.Class(this,"",Lock.Animate[1]);
                Lock.yanzhen();
              });
              $(window).keydown(function(a) {
                Lock.Class(".input input","",Lock.Animate[1]);
                if(a.which == 13) {
                  Lock.yanzhen();
                }
              })
              $(".n_lock").click(function() {
                  Lock.dom.val("");
                  Lock.dom.attr({"placeholder":"请输入密码"});
                  Lock.Class(".lock",Lock.Animate[2],Lock.Animate[0]);
              })
        },
        photoClick:function(dom,a,b,c) {
            $(dom).click(function() {
                Lock.Class(a,b,c);
            });
        },
        //设置壁纸
        setPhoto:function() {
            $(".small_pic").click(function() {
                var that = $(this);
                $(".img_cover").addClass("animated");
                $(".img_cover").hide().removeClass("rotateIn");
                $(this).find(".img_cover").show().addClass("rotateIn");
                $(this).find(".progress").css("width","0%").stop().animate({
                    width: "100%"
                },5000,function() {
                    var imgUrl = that.find("img").attr("src");
                    $(".container").css({"background":"url("+imgUrl+") no-repeat center","background-size":"100%"});
                    storage.url = imgUrl; // 把最后设置的壁纸存储到localstorage
                });
            });
        },
        NoticeClose:function(a,b) {
            $(a).click(function() {
                Lock.Notice(".notice",1000,b);
            });
        },
        //作品
        Work:function() {
            //初始化
            function Zero() {
              $(".works ul li").css("width","98px").stop();
              $(".w_x").hide();
              $(".w_font").show();
              $(".w_content").removeClass(Lock.Animate[7]).hide(500);
            };
            $(".n_work").click(function() {
                Lock.Class(".works","",Lock.Animate[6]);
                Lock.Class(".works ul li",Lock.Animate[5]);
                Zero();
            });
            $(".works ul li").click(function() {
                //此判断==防止冒泡
                if($(this).width() != "571") {
                  Zero();
                  var that = $(this);
                  $(this).find(".w_x").show();
                  $(this).find(".w_font").fadeOut(500);
                  $(this).animate({"width":"60%"},1000,function() {
                    that.find(".w_content").show().addClass(Lock.Animate[7]);
                  });
                }
            });
            $(".w_x").click(function() {
                $(".works").addClass(Lock.Animate[6]).hide(1000);
            });
        }
      }
      var Lock = new pclock();
      Lock.lockClick();
      Lock.photoClick(".n_photo",".photo",Lock.Animate[3],Lock.Animate[4]);
      Lock.photoClick(".photo_exit",".photo",Lock.Animate[4],Lock.Animate[3]);
      Lock.setPhoto();
      Lock.NoticeClose(".n_x");
      Lock.NoticeClose(".n_notices",1);
      Lock.Work();