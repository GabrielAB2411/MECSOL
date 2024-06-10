let collapseFour = '#collapseFour';
let collapseFourAccordionBody = '#collapseFour .accordion-body';
let btnVerify = '#btnVerify';

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
var vonMises;
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
});

function handleExercise() {
  randomImage();
  createCase();
  var accordionBody = document.querySelector(collapseFourAccordionBody);

  accordionBody.innerHTML = '';
  accordionBody.appendChild(img);

  var form = document.createElement('form');
  form.innerHTML = createForm();
  accordionBody.appendChild(form);

  createResults();
   
  $(btnVerify).on('click', function() {
    validateResults();
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
}

function handleExerciseAccordionClose() {
  var accordionBody = document.querySelector(collapseFourAccordionBody);
  accordionBody.innerHTML = '';
}

function createForm(){
  return `
    <div class="container mt-4 mb-4">
        <div class="d-flex flex-column align-items-start mb-3">
          <h5>Calcule o que se pede com base nos dados abaixo:</h5>
          <label><b>[A]</b> = ${valueA} mm</label>
          <label><b>[B]</b> = ${valueB} mm</label>
          <label><b>[C]</b> = ${valueC} N</label>
          <div><b>&sigma;<sub>&epsilon;</sub> = </b> ${tractionFlow} MPa</div>
          <div><b>&sigma;<sub>LRT</sub> = </b> ${tractionLimit} MPa</div>
          <label><b>Ur</b> = ${resilience} MJ/M³</label>
          <label><b>v</b> = ${vonMises}</label>
          </div>
        <div class="mb-3 d-flex align-items-center">
            <label for="tensao" class="form-label me-3">Tensão da estrutura (σ) (3 casas)</label>
            <div style="width: 120px;">
                <input type="number" class="form-control" id="tensao" style="font-size: smaller;">
            </div>
            <label class="mx-2">[MPa]</label>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label for="coeficiente" class="form-label me-3">Coeficiente de Segurança (S) (2 casas)</label>
            <div style="width: 120px;">
                <input type="number" class="form-control" id="coeficiente" style="font-size: smaller;">
            </div>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label for="deformacaoEscoamento" class="form-label me-3">Deformação na Tensão de escoamento (εe) (5 casas)</label>
            <div style="width: 120px;">
                <input type="number" class="form-control" id="deformacaoEscoamento" style="font-size: smaller;">
            </div>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label for="moduloElasticidade" class="form-label me-3">Módulo de Elasticidade (E) (3 casas)</label>
            <div style="width: 120px;">
                <input type="number" class="form-control" id="moduloElasticidade" style="font-size: smaller;">
            </div>
            <label class="mx-2">[GPa]</label>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label for="deformacaoLongitudinal" class="form-label me-3">Deformação Longitudinal (ε) (5 casas)</label>
            <div style="width: 120px;">
                <input type="number" class="form-control" id="deformacaoLongitudinal" style="font-size: smaller;">
            </div>
            <label class="mx-2">[mm/mm]</label>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label for="deformacaoTransversal" class="form-label me-3">Deformação Transversal (εt) (5 casas)</label>
            <div style="width: 120px;">
                <input type="number" class="form-control" id="deformacaoTransversal" style="font-size: smaller;">
            </div>
            <label class="mx-2">[mm/mm]</label>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label for="variacaoComprimento" class="form-label me-3">Variação de Comprimento (Δl) (3 casas)</label>
            <div style="width: 120px;">
                <input type="number" class="form-control" id="variacaoComprimento" style="font-size: smaller;">
            </div>
            <label class="mx-2">[mm]</label>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label for="variacaoLargura" class="form-label me-3">Variação de Largura (Δw) (5 casas)</label>
            <div style="width: 120px;">
                <input type="number" class="form-control" id="variacaoLargura" style="font-size: smaller;">
            </div>
            <label class="mx-2">[mm]</label>
        </div>
        <hr>
        <div class="d-flex justify-content-end mt-3">
            <button id="btnVerify" type="button" class="btn btn-outline-success">Verificar</button>
        </div>
    </div>`;
}

function createCase(){
  //testes de cenários:
  // valueA = 85;
  // valueB = 608;
  // valueC = 200000;
  // tractionFlow = 206;
  // tractionLimit = 440;
  // resilience = 0.75;
  
  valueA = generateValue(40, 90);
  valueB = generateValue(150, 200);
  valueC = generateValue(100000, 200000);
  tractionFlow = generateValue(400, 599);
  tractionLimit = generateValue(600, 800);
  resilience = generateValue(1, 3);
  vonMises = 0.33;
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
  return ((longitudinalDeformation * vonMises) * (-1)).toFixed(5);
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

  test();
}

function showMessage() {
  const percentage = (validResultsCount / totalResultsCount) * 100;

  var alertIcon;

  switch (percentage){
    case 0:
      alertIcon = 'error';
      break;

    case 100:
      alertIcon = 'success';
      break;

    default:
      alertIcon = 'warning';
      break;
  }

  Swal.fire({
    title: 'Resultados',
    text: `Porcentagem de acertos: ${percentage.toFixed(2)}%`,
    icon: alertIcon,
    confirmButtonText: 'OK'
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

function test(){
  console.log(`Tensão: ${traction}`);
  console.log(`S: ${safetyFactor}`);
  console.log(`Flow deformation: ${flowDeformation}`);
  console.log(`Elastic Modulus: ${elasticModulus}`);
  console.log(`Longitudinal Deformation: ${longitudinalDeformation}`);
  console.log(`Transverse Deformation: ${transverseDeformation}`);
  console.log(`Length Variation: ${lengthVariation}`);
  console.log(`Width Variation: ${widthVariation}`);
}