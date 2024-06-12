let collapseFour = '#collapseFour';
let collapseFourAccordionBody = '#collapseFour .accordion-body';
let btnShowRightAnswers = '#btnShowRightAnswers';
let btnVerify = '#btnVerify';
let btnRandomize = '#btnRandomize';

let _square = 'Square';
let _circle = 'Circle';
let _compression = 'Compression';
let _traction = 'Traction';
let validResultsCount = 0;
let totalResultsCount = 0;

var img = '';
var randomIndex = '';
var randomImageType = '';
var randomImageShape = '';
var randomImagePath = '';

var signal;
var valueA;
var valueB;
var valueC;
var tractionFlow;
var tractionLimit;
var traction;
var generateResilience;
var poisson;
var safetyFactor;
var area;
var flowDeformation;
var elasticModulus;
var longitudinalDeformation;
var transverseDeformation;
var lengthVariation;
var widthVariation;

var imagePaths = [
  {
    name: 'Compression Circle',
    path: '../../assets/compressionCircle.png',
    type: 'Compression',
    shape: 'Circle',
  },
  {
    name: 'Compression Square',
    path: '../../assets/compressionSquare.png',
    type: 'Compression',
    shape: 'Square',
  },
  {
    name: 'Traction Circle',
    path: '../../assets/tractionCircle.png',
    type: 'Traction',
    shape: 'Circle',
  },
  {
    name: 'Traction Square',
    path: '../../assets/tractionSquare.png',
    type: 'Traction',
    shape: 'Square',
  },
];

$(document).ready(function () {
  handleExercise();

  $('[data-toggle="tooltip"]').each(function () {
    const $this = $(this);
    const tooltip = new bootstrap.Tooltip($this[0]);

    let pressTimer;

    $this.on('touchstart', function () {
      pressTimer = setTimeout(function () {
        tooltip.show();
      }, 500); 
    });

    $this.on('touchend touchmove', function () {
      clearTimeout(pressTimer);
      tooltip.hide();
    });
  });

  $('#lblCurrentYear').text(`© ${new Date().getFullYear().toString()}`);
});

function handleExercise() {
  randomImage();
  createCase();
  var accordionBody = document.querySelector(collapseFourAccordionBody);

  accordionBody.innerHTML = '';
  img.classList.add('mt-3');
  accordionBody.appendChild(img);

  var form = document.createElement('form');
  form.innerHTML = createForm();
  accordionBody.appendChild(form);

  createResults();
   
  $(btnShowRightAnswers).on('click', function() {
    showRightAnswers();
  });

  $(btnVerify).on('click', function() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-outline-success mx-2",
        cancelButton: "btn btn-outline-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Você tem certeza?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Finalizar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        validateResults();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {}
    });
  });

  $(btnRandomize).on('click', function() {
    handleExercise();

    var targetOffset = $('#headingFour').offset().top;

    $('html, body').animate({
      scrollTop: targetOffset 
    }, 200); 
  });
}

function randomImage(){ 
  randomIndex = Math.floor(Math.random() * imagePaths.length);  
  randomImageType = imagePaths[randomIndex].type;
  randomImageShape = imagePaths[randomIndex].shape;
  randomImagePath = imagePaths[randomIndex].path;
  img = document.createElement('img');
  img.src = randomImagePath;
  img.alt = 'Image';
  img.classList.add('rounded');
}

function handleExerciseAccordionClose() {
  var accordionBody = document.querySelector(collapseFourAccordionBody);
  accordionBody.innerHTML = '';
}

function createForm(){
  return `
    <div class="container mt-4">
        <div class="d-flex flex-column align-items-start mb-4">
          <h4 class="mb-3"><b>Calcule o que se pede com base nos dados abaixo:</b></h4>
          <ul class="text-start">
            <li><label><b>[A]</b> = ${valueA} mm</label></li>
            <li><label><b>[B]</b> = ${valueB} mm</label></li>
            <li><label><b>[C]</b> = ${valueC / 1000} kN</label></li>
            <li><div><b>&sigma;<sub>&epsilon;</sub> = </b> ${tractionFlow} MPa</div></li>
            <li><div><b>&sigma;<sub>LRT</sub> = </b> ${tractionLimit} MPa</div></li>
            <li><label><b>Ur</b> = ${resilience} MJ/M³</label></li>
            <li><label><b>v</b> = ${poisson}</label></li>
          </ul>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-3" style="cursor: pointer;" data-toggle="tooltip" data-placement="top" title="σ = F ⁄ A"><b>a)</b> Tensão da estrutura (σ)</label>
            <div style="width: 120px;">
                <input type="number" autocomplete="off" class="form-control" id="tensao" style="font-size: smaller;">
            </div>
            <label class="mx-2">[MPa]</label>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-3" style="cursor: pointer;" data-toggle="tooltip" data-placement="top" title="S = σe ⁄ σ"><b>b)</b> Coeficiente de Segurança (S)</label>
            <div style="width: 120px;">
                <input type="number" autocomplete="off" class="form-control" id="coeficiente" style="font-size: smaller;">
            </div>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-3" style="cursor: pointer;" data-toggle="tooltip" data-placement="top" title="εe = 2Ur / σe"><b>c)</b> Deformação na Tensão de escoamento (εe)</label>
            <div style="width: 120px;">
                <input type="number" autocomplete="off" class="form-control" id="deformacaoEscoamento" style="font-size: smaller;">
            </div>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-3" style="cursor: pointer;" data-toggle="tooltip" data-placement="top" title="E = σe / εe"><b>d)</b> Módulo de Elasticidade (E)</label>
            <div style="width: 120px;">
                <input type="number" autocomplete="off" class="form-control" id="moduloElasticidade" style="font-size: smaller;">
            </div>
            <label class="mx-2">[GPa]</label>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-3" style="cursor: pointer;" data-toggle="tooltip" data-placement="top" title="ε = σ / E"><b>e)</b> Deformação Longitudinal (ε)</label>
            <div style="width: 120px;">
                <input type="number" autocomplete="off" class="form-control" id="deformacaoLongitudinal" style="font-size: smaller;">
            </div>
            <label class="mx-2">[mm/mm]</label>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-3" style="cursor: pointer;" data-toggle="tooltip" data-placement="top" title="εt = - v . ε"><b>f)</b> Deformação Transversal (εt)</label>
            <div style="width: 120px;">
                <input type="number" autocomplete="off" class="form-control" id="deformacaoTransversal" style="font-size: smaller;">
            </div>
            <label class="mx-2">[mm/mm]</label>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-3" style="cursor: pointer;" data-toggle="tooltip" data-placement="top" title="Δl = ε . l0"><b>g)</b> Variação de Comprimento (Δl)</label>
            <div style="width: 120px;">
                <input type="number" autocomplete="off" class="form-control" id="variacaoComprimento" style="font-size: smaller;">
            </div>
            <label class="mx-2">[mm]</label>
        </div>
        <div class="mb-5 d-flex align-items-center">
            <label class="form-label me-3" style="cursor: pointer;" data-toggle="tooltip" data-placement="top" title="wΔ = εt . w0"><b>h)</b> Variação de Largura (Δw)</label>
            <div style="width: 120px;">
                <input type="number" autocomplete="off" class="form-control" id="variacaoLargura" style="font-size: smaller;">
            </div>
            <label class="mx-2">[mm]</label>
        </div>
        <hr>
        <div class="d-flex justify-content-end mt-3">
            <button id="btnShowRightAnswers" type="button" class="btn btn-outline-secondary" title="Mostrar respostas">
              <i class="fa-solid fa-eye"></i>
            </button> 
            <button id="btnRandomize" type="button" class="btn btn-outline-info mx-2" title="Gerar um novo exercício">
              <i class="fa-solid fa-arrows-rotate"></i>
            </button> 
            <button id="btnVerify" type="button" class="btn btn-outline-success">Verificar</button>
        </div>
    </div>`;
}

function createCase(){
  valueA = generateValue(40, 90);
  valueB = generateValue(150, 200);
  valueC = generateValue(100000, 200000);
  tractionFlow = generateValue(400, 599);
  tractionLimit = generateValue(600, 800);
  resilience = generateValue(1, 3);
  poisson = 0.33;
}

function generateValue(min, max){
  var randomValue = Math.random();
  var scaledValue = randomValue * (max - min) + min;
  var roundedValue = Math.round(scaledValue);
  return roundedValue;
}

function calculateArea(){
  return randomImageShape == _circle ? (Math.PI * Math.pow((valueA/2), 2)) : Math.pow(valueA, 2);
}

function calculateTraction(){
  return (valueC / area).toFixed(3);
}

function calculateSignal(){
  return ((randomImageType == _compression) ? -1 : 1);
}

function calculateSafetyFactor(){
  return (tractionFlow / traction).toFixed(2);
}

function calculateFlowDeformation(){
  return ((((2 * resilience) / tractionFlow).toFixed(5)));
}

function calculateElasticModulus(){
  return ((Math.abs(tractionFlow) / Math.abs(flowDeformation))/1000).toFixed(3);
}

function calculateLongitudinalDeformation(){
  return (((traction / elasticModulus) / 1000).toFixed(5) * signal);  
}

function calculateTransverseDeformation() {
  return ((longitudinalDeformation * poisson) * (-1)).toFixed(5);
}

function calculateLengthVariation() {
  return (traction * valueB * signal / elasticModulus / 1000).toFixed(3);
}

function calculateWidthVariation() {
  return (transverseDeformation * valueA).toFixed(5);
}

function createResults(){
  safetyFactor = calculateSafetyFactor();
  signal = calculateSignal();
  area = calculateArea();
  traction = calculateTraction();
  safetyFactor = calculateSafetyFactor();
  flowDeformation = calculateFlowDeformation();
  elasticModulus = calculateElasticModulus();
  longitudinalDeformation = calculateLongitudinalDeformation();
  transverseDeformation = calculateTransverseDeformation();
  lengthVariation = calculateLengthVariation();
  widthVariation = calculateWidthVariation();
}

function showMessage() {
  const percentage = (validResultsCount / totalResultsCount) * 100;

  var alertIcon;
  var alertTitle;

  switch (percentage){
    case 0:
      alertIcon = 'error';
      alertTitle = 'Estude um pouco mais';
      break;

    case 100:
      alertIcon = 'success';
      alertTitle = 'Parabéns!';
      break;

    default:
      alertIcon = 'warning';
      alertTitle = 'Você está indo bem';
      break;
  }

  Swal.fire({
    title: alertTitle,
    text: `Porcentagem de acertos: ${percentage.toFixed(2)}%`,
    icon: alertIcon,
    customClass: {
      title: 'text-center',
      htmlContainer: 'text-center'
    }
  });

  totalResultsCount = 0;
  validResultsCount = 0;
}

function validateInput(input, expectedValue) {
  const value = parseFloat($(input).val());
  const margin = 0.15;  
  const absExpectedValue = Math.abs(expectedValue);
  const minValue = expectedValue >= 0 ? expectedValue - absExpectedValue * margin : expectedValue + absExpectedValue * margin;
  const maxValue = expectedValue >= 0 ? expectedValue + absExpectedValue * margin : expectedValue - absExpectedValue * margin;

  totalResultsCount++;
  if (!isNaN(value) && ((value >= minValue && value <= maxValue) || (value <= minValue && value >= maxValue))) {
      $(input).removeClass('is-invalid').addClass('is-valid');
      validResultsCount++;
  } else {
      $(input).removeClass('is-valid').addClass('is-invalid');
  }
}

function validateResults() {
  const inputs = [
    { id: '#tensao', expectedValue: parseFloat(traction) },
    { id: '#coeficiente', expectedValue: parseFloat(safetyFactor) },
    { id: '#deformacaoEscoamento', expectedValue: parseFloat(flowDeformation) },
    { id: '#moduloElasticidade', expectedValue: parseFloat(elasticModulus) },
    { id: '#deformacaoLongitudinal', expectedValue: parseFloat(longitudinalDeformation) },
    { id: '#deformacaoTransversal', expectedValue: parseFloat(transverseDeformation) },
    { id: '#variacaoComprimento', expectedValue: parseFloat(lengthVariation) },
    { id: '#variacaoLargura', expectedValue: parseFloat(widthVariation) }
  ];

  inputs.forEach(input => {
    validateInput(input.id, input.expectedValue);
  });

  showMessage();
}

function showRightAnswers() {
  $('#tensao').val(traction);
  $('#coeficiente').val(safetyFactor);
  $('#deformacaoEscoamento').val(flowDeformation);
  $('#moduloElasticidade').val(elasticModulus);
  $('#deformacaoLongitudinal').val(longitudinalDeformation);
  $('#deformacaoTransversal').val(transverseDeformation);
  $('#variacaoComprimento').val(lengthVariation);
  $('#variacaoLargura').val(widthVariation);
}