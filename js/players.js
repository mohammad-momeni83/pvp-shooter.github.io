// get player's current position as a number (px)
var r_right_move = parseInt($(".character-R").css("right")) || 0;
console.log(r_right_move);



$(document).ready(function() {
    $(document).keydown(function(event) {
        // player right moving function
        switch (event.which) {
            case 37: // left arrow
                r_right_move += 5;
                $(".character-R").css({ "right": r_right_move + "px" });
                break;
            case 38: // up arrow
                // Jump logic: animate bottom property
                var $player = $(".character-R");
                var originalBottom = parseInt($player.css("bottom")) || 0;
                var jumpHeight = 60; // مقدار پرش به پیکسل
                // $player.stop(true); // توقف انیمیشن قبلی اگر هست
                $player.animate({ bottom: (originalBottom + jumpHeight) + "px" }, 200, "swing", function() {
                    // بازگشت به حالت اولیه
                    $player.animate({ bottom: originalBottom + "px" }, 200);
                });
                break;
            case 39: // right arrow
                r_right_move -= 5;
                $(".character-R").css({ "right": r_right_move + "px" });
                break;
            case 40: // down arrow
                console.log("فلش پایین زده شد");
                break;
            default:
                return; // برای کلیدهای دیگه کاری انجام نمیده
        }
    });
});