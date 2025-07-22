var r_right_move = parseInt($(".character-R").css("right")) || 0;
let r_canJump = true; // وضعیت پرش برای بازیکن راست

function isColliding($el1, $el2, margin=5) {
    const r1 = $el1[0].getBoundingClientRect();
    const r2 = $el2[0].getBoundingClientRect();

    return !(
        r1.top > r2.bottom -margin ||
        r1.bottom < r2.top +margin||
        r1.right < r2.left +margin||
        r1.left > r2.right -margin
    );
}



$(document).ready(function () {
    $(document).keydown(function (event) {
        const $player = $(".character-R");

        switch (event.which) {
            case 37: // ←
                r_right_move += 5;
                $player.css({ "right": r_right_move + "px" });

                $(".obstacle").each(function () {
                    if (isColliding($player, $(this))) {
                        r_right_move -= 5;
                        $player.css({ "right": r_right_move + "px" });
                    }
                });
                break;

            case 38: // ↑ jump
                if (!r_canJump) return;
                r_canJump = false;

                const originalBottom = parseInt($player.css("bottom")) || 0;
                const jumpHeight = 180;

                $player.animate({ bottom: (originalBottom + jumpHeight) + "px" }, 200, "swing", function () {
                    $player.animate({ bottom: originalBottom + "px" }, 200, function () {

                        let landed = false;
                        $(".obstacle").each(function () {
                            if (isColliding($player, $(this), 3)) {
                                let obstacleTop = parseInt($(this).css("top"));
                                let obstacleHeight = $(this).height();
                                let newBottom = $(window).height() - (obstacleTop + obstacleHeight) + 10;
                                $player.css("bottom", newBottom + "px");
                                landed = true;
                            }
                        });

                        if (!landed) {
                            $player.css("bottom", originalBottom + "px");
                        }

                        setTimeout(() => {
                            r_canJump = true;
                        }, 1000);
                    });
                });
                break;

            case 39: // →
                r_right_move -= 5;
                $player.css({ "right": r_right_move + "px" });

                $(".obstacle").each(function () {
                    if (isColliding($player, $(this))) {
                        r_right_move += 5;
                        $player.css({ "right": r_right_move + "px" });
                    }
                });
                break;
        }
    });
});
