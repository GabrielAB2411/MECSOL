$(document).ready(function () {
    RemoveStickyTop();
    $(window).resize(RemoveStickyTop);

    $('#lblCurrentYear').text(`© ${new Date().getFullYear().toString()}`);
    
    $('#btnFundamentals').click(function () {
        window.location.replace('src/pages/contents/fundamentals.html'); 
    });

    $('#btnTractionCompression').click(function () {
        window.location.replace('src/pages/contents/tractionCompression.html'); 
    });

    $('#btnShear').click(function () {
        window.location.replace('src/pages/contents/shear.html');
    });

    function RemoveStickyTop() {
        if ($(window).width() < 992) {
            $('.navbar-expand-lg').removeClass('sticky-top');
        } else {
            $('.navbar-expand-lg').addClass('sticky-top'); 
        }
    }
});