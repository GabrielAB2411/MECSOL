$(document).ready(function () {
    $('#lblCurrentYear').text(`© ${new Date().getFullYear().toString()}`);
    
    $('#btnFundamentals').click(function () {
        window.location.replace('/src/pages/contents/fundamentals.html');
    });

    $('#btnTractionCompression').click(function () {
        window.location.replace('/src/pages/contents/tractionCompression.html');
    });

    $('#btnShear').click(function () {
        window.location.replace('/src/pages/contents/shear.html');
    });
});