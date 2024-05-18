var collapseFour = '#collapseFour';
var collapseFourAccordionBody = '#collapseFour .accordion-body';

var imagePaths = [
    { name: 'Compression Circle', path: '../../assets/compressionCircle.png' },
    { name: 'Compression Square', path: '../../assets/compressionSquare.png' },
    { name: 'Traction Circle', path: '../../assets/tractionCircle.png' },
    { name: 'Traction Square', path: '../../assets/tractionSquare.png' }
];

$(document).ready(function(){
    $(collapseFour).on('shown.bs.collapse', function () {
        handleExerciseAccordionOpen();
    });

    $(collapseFour).on('hide.bs.collapse', function () {
        handleExerciseAccordionClose();
    });
});

function handleExerciseAccordionOpen() {
    var randomIndex = Math.floor(Math.random() * imagePaths.length);
    var randomImagePath = imagePaths[randomIndex].path;
    var img = document.createElement('img');
    img.src = randomImagePath;
    img.alt = 'Random Image';
    
    var accordionBody = document.querySelector(collapseFourAccordionBody);
    
    accordionBody.innerHTML = '';
    accordionBody.appendChild(img);
}

function handleExerciseAccordionClose() {
    var accordionBody = document.querySelector(collapseFourAccordionBody);
    accordionBody.innerHTML = '';
}
