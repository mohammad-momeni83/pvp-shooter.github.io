//create a show winner window
function showWinner(winner) {
    $('.winner-message').remove();
    const $msg = $('<div class="winner-message"></div>');
    $msg.text(winner + ' wins! ');
    $msg.css({
        position: 'fixed',
        left: '50%',
        top: '30%',
        transform: 'translate(-50%, -50%)',
        background: "#143b9d",
        color: '#fff',
        fontSize: '2.5rem',
        padding: '32px 48px',
        border: '4px solid white',
        zIndex: 3000,
        boxShadow: '0 8px 32px #0003',
        textAlign: 'center',
        fontFamily: 'press2'
    });
    $('body').append($msg);
}
//check winner
function checkWinner() {
    if (window.leftScore >= 10) {
        showWinner('Player Left');
        return true;
    }
    if (window.rightScore >= 10) {
        showWinner('Player Right');
        return true;
    }
    return false;
}

window.leftScore = window.leftScore || 0;
window.rightScore = window.rightScore || 0;

const observer = new MutationObserver(function() {
    checkWinner();
});
observer.observe(document.querySelector('.player-info-L span'), { childList: true });
observer.observe(document.querySelector('.player-info-R span'), { childList: true });