// min and max values
function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}
// left player
var l_left_move = parseInt($(".character-L").css("left")) || 0;
let l_bottom_move = parseInt($(".character-L").css("bottom")) || 0;
let l_canJump = true;
let l_velocityY = 0;
let l_isJumping = false;
const l_gravity = -10;
const l_jumpVelocity = 20;
const l_moveSpeed = 5;
let l_keys = { left: false, right: false, up: false };
var r_right_move = parseInt($(".character-R").css("right")) || 0;
let r_bottom_move = parseInt($(".character-R").css("bottom")) || 0;
let r_canJump = true; // player right jump status
let r_velocityY = 0;
let r_isJumping = false;
const r_gravity = -10; // nagtive gravity
const r_jumpVelocity = 20; // jump speed
const r_moveSpeed = 5;
let r_keys = { left: false, right: false, up: false };

function isColliding($el1, $el2, margin = 5) {
    const r1 = $el1[0].getBoundingClientRect();
    const r2 = $el2[0].getBoundingClientRect();

    return !(
        r1.top > r2.bottom - margin ||
        r1.bottom < r2.top + margin ||
        r1.right < r2.left + margin ||
        r1.left > r2.right - margin
    );
}




$(document).ready(function() {
    const $player = $(".character-R");

    const $playerL = $(".character-L");

    // move control keys
    $(document).keydown(function(event) {
        // player right keys
        if (event.which === 37) r_keys.left = true;
        if (event.which === 39) r_keys.right = true;
        if (event.which === 38) r_keys.up = true;

        // player left keys
        if (event.which === 65) l_keys.left = true;
        if (event.which === 68) l_keys.right = true;
        if (event.which === 87) l_keys.up = true;
    });
    $(document).keyup(function(event) {
        if (event.which === 37) r_keys.left = false;
        if (event.which === 39) r_keys.right = false;
        if (event.which === 38) r_keys.up = false;

        if (event.which === 65) l_keys.left = false;
        if (event.which === 68) l_keys.right = false;
        if (event.which === 87) l_keys.up = false;
    });


    function gameLoop() {
        // players area condition
        const gameWidth = $(".game-container").width();
        const playerWidth = $player.width();
        const playerLWidth = $playerL.width();

        // right area
        const r_min = 0;
        const r_max = gameWidth / 2 - playerWidth;

        // left area
        const l_min = 0;
        const l_max = gameWidth / 2 - playerLWidth;

        // jump and run playert right
        if (r_keys.left) {
            r_right_move += r_moveSpeed;
        }
        if (r_keys.right) {
            r_right_move -= r_moveSpeed;
        }
        // right area
        r_right_move = clamp(r_right_move, r_min, r_max);
        $player.css({ "right": r_right_move + "px" });

        // jump and run playert left
        if (l_keys.left) {
            l_left_move -= l_moveSpeed;
        }
        if (l_keys.right) {
            l_left_move += l_moveSpeed;
        }
        // محدود کردن حرکت بازیکن چپ
        l_left_move = clamp(l_left_move, l_min, l_max);
        $playerL.css({ "left": l_left_move + "px" });
        $(".obstacle").each(function() {
            if (isColliding($playerL, $(this))) {
                if (l_keys.left) l_left_move += l_moveSpeed;
                if (l_keys.right) l_left_move -= l_moveSpeed;
                $playerL.css({ "left": l_left_move + "px" });
            }
        });

        // jump
        if (r_keys.up && r_canJump && !r_isJumping) {
            r_velocityY = r_jumpVelocity;
            r_isJumping = true;
            r_canJump = false;
        }

        // left player jump
        if (l_keys.up && l_canJump && !l_isJumping) {
            l_velocityY = l_jumpVelocity;
            l_isJumping = true;
            l_canJump = false;
        }

        // gravity and Y-move right
        if (r_isJumping) {
            r_bottom_move += r_velocityY;
            r_velocityY += r_gravity * 0.1; // decrease speed
            if (r_bottom_move < 0) {
                r_bottom_move = 0;
                r_isJumping = false;
                setTimeout(() => { r_canJump = true; }, 200);
            }
            $player.css({ "bottom": r_bottom_move + "px" });


            // $(".obstacle").each(function() {
            //     if (isColliding($player, $(this), 3)) {
            //         let obstacleTop = parseInt($(this).css("top"));
            //         let obstacleHeight = $(this).height();
            //         let newBottom = $(window).height() - (obstacleTop + obstacleHeight) + 10;
            //         r_bottom_move = newBottom;
            //         $player.css("bottom", r_bottom_move + "px");
            //         r_isJumping = false;
            //         setTimeout(() => { r_canJump = true; }, 200);
            //     }
            // });
        }

        // gravity and Y-move left
        if (l_isJumping) {
            l_bottom_move += l_velocityY;
            l_velocityY += l_gravity * 0.1;
            if (l_bottom_move < 0) {
                l_bottom_move = 0;
                l_isJumping = false;
                setTimeout(() => { l_canJump = true; }, 200);
            }
            $playerL.css({ "bottom": l_bottom_move + "px" });

            // $(".obstacle").each(function() {
            //     if (isColliding($playerL, $(this), 3)) {
            //         let obstacleTop = parseInt($(this).css("top"));
            //         let obstacleHeight = $(this).height();
            //         let newBottom = $(window).height() - (obstacleTop + obstacleHeight) + 10;
            //         l_bottom_move = newBottom;
            //         $playerL.css("bottom", l_bottom_move + "px");
            //         l_isJumping = false;
            //         setTimeout(() => { l_canJump = true; }, 200);
            //     }
            // });
        }

        requestAnimationFrame(gameLoop);
    }

    // مقداردهی اولیه bottom
    r_bottom_move = parseInt($player.css("bottom")) || 0;
    l_bottom_move = parseInt($playerL.css("bottom")) || 0;
    gameLoop();
});