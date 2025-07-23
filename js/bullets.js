// create bullets
function createBullet(player, direction) {
    // score var
    if (typeof window.leftScore === 'undefined') window.leftScore = 0;
    if (typeof window.rightScore === 'undefined') window.rightScore = 0;
    const $bullet = $('<div class="bullet"></div>');
    $bullet.css({
        position: 'absolute',
        width: '16px',
        height: '8px',
        background: 'orange',
        borderRadius: '4px',
        zIndex: 1000
    });

    // bullets position relative to players
    const playerOffset = player.offset();
    const playerWidth = player.width();
    const playerHeight = player.height();
    const bulletTop = playerOffset.top + playerHeight / 2 - 4;
    let bulletLeft;
    if (direction === 'right') {
        bulletLeft = playerOffset.left + playerWidth;
    } else {
        bulletLeft = playerOffset.left - 16;
    }
    $bullet.css({ top: bulletTop + 'px', left: bulletLeft + 'px' });

    $('body').append($bullet);

    // bullets move
    const speed = 12 * (direction === 'right' ? 1 : -1);

    // push score 
    const $target = direction === 'right' ? $('.character-R') : $('.character-L');
    const $scoreSpanL = $('.player-info-L span');
    const $scoreSpanR = $('.player-info-R span');

    function isBulletColliding($b, $t) {
        const b1 = $b[0].getBoundingClientRect();
        const b2 = $t[0].getBoundingClientRect();
        return !(
            b1.top > b2.bottom ||
            b1.bottom < b2.top ||
            b1.right < b2.left ||
            b1.left > b2.right
        );
    }



    //bullets explosion effect
    function showHitEffect(x, y) {
        const $effect = $('<div></div>');
        $effect.css({
            position: 'absolute',
            left: x - 12 + 'px',
            top: y - 12 + 'px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'rgba(255,140,0,0.5)',
            border: '2px solid orange',
            zIndex: 2000,
            pointerEvents: 'none',
            opacity: 1,
            transition: 'opacity 0.3s'
        });
        $('body').append($effect);
        setTimeout(() => {
            $effect.css('opacity', 0);
            setTimeout(() => $effect.remove(), 300);
        }, 100);
    }

    function moveBullet() {
        let left = parseInt($bullet.css('left'));
        left += speed;
        $bullet.css('left', left + 'px');
        // delete bullets out  of the window
        if (left < 0 || left > $(window).width()) {
            $bullet.remove();
            return;
        }
        // player get bullets
        if (isBulletColliding($bullet, $target)) {
            $bullet.remove();
            // take score
            if (direction === 'right') {
                window.leftScore++;
                $scoreSpanL.text('score: ' + window.leftScore);
            } else {
                window.rightScore++;
                $scoreSpanR.text('score: ' + window.rightScore);
            }
            return;
        }
        requestAnimationFrame(moveBullet);
    }
    moveBullet();
}

// shoots control
$(document).keydown(function(event) {
    // press 0 on numlock to shoot player righht
    if (event.which === 96) {
        const $playerR = $('.character-R');
        createBullet($playerR, 'left');
    }
    // press space to shoot player left
    if (event.which === 32) {
        const $playerL = $('.character-L');
        createBullet($playerL, 'right');
    }
});