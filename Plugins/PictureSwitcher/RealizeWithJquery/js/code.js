
$(function () {
    $.fn.slideBox = function (options) {
        var defaults = {
            SlideTag: "li",
            EleFocus: "a",
            ClsFocus: "s-num",
            Focus: "on",
            Delay: 10,
            Start: 0,
            LastVisit: 0
        };
        var opts = $.extend(defaults, options || {});
        var wrapper = $(this);
        if (!wrapper.size()) { return false; }
        var slideObjs = wrapper.find(opts.SlideTag).toArray();
        if (slideObjs.length == -1) { return false; }
        var slideBtnsParent = wrapper.find(opts.EleFocus);
        var slideBtns = slideBtnsParent.filter("." + opts.ClsFocus).toArray();
        var objNum = slideObjs.length;
        var oTimer = null;
        var Start = function () {
            if (typeof arguments[0] == "undefined") {
                opts.LastVisit = opts.Start;
                opts.Start++;
                if (opts.Start >= objNum) {
                    opts.Start = 0;
                }
            }

            if ($(slideObjs[opts.Start]).css("background-Image") == "none") {
                $(slideObjs[opts.Start]).find(".slide-pic").css("background-Image", "url(" + $(slideObjs[opts.Start]).attr("data-pic") + ")");
            }
            $(slideObjs[opts.Start]).css({ "opacity": "1" });
            $(slideBtns[opts.Start]).addClass(opts.Focus);
            $(slideObjs[opts.LastVisit]).animate({ "opacity": "0" }, 200, function () {
                $(slideObjs[opts.Start]).css("z-Index", 1);
                $(slideObjs[opts.LastVisit]).css("z-Index", 0);
            });
            $(slideBtns[opts.LastVisit]).removeClass(opts.Focus);
        };
        var setTimer = function () {
            if (oTimer) {
                clearInterval(oTimer);
                Start(-1);
            }
            oTimer = window.setInterval(Start, opts.Delay * 1000);
        };
        if (objNum > 1) {
            slideBtnsParent.show();
            $.each(slideBtns, function (i, n) {
                $(n).on("click", function () {
                    if (opts.Start == i || window.allow == "0") { return false; }
                    opts.LastVisit = opts.Start;
                    opts.Start = i;
                    window.allow = "0";
                    setTimeout(function () {
                        setTimer();
                        window.allow = "1";
                    }, 300, null);
                    return false;
                });
                if (opts.Start == i) {
                    $(n).addClass(opts.Focus);
                    return;
                }
            });
            window.allow = "1";
            $(slideObjs[opts.Start]).css({ "z-Index": 1, "opacity": "1" });
            $(slideObjs[opts.Start]).find(".slide-pic").css("background-Image", "url(" + $(slideObjs[opts.Start]).attr("data-pic") + ")");
            setTimer();
        } else {
            slideBtnsParent.hide();
        }
    };


    $("#slidebar").slideBox();
});
