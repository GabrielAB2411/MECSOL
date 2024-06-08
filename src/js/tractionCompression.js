let collapseFour = "#collapseFour";
let collapseFourAccordionBody = "#collapseFour .accordion-body";
let btnVerificar = "#btnVerificar";

let _square = "Square";
let _circle = "Circle";
let _compression = "Compression";
let _traction = "Traction";

var randomImageType = "";
var randomImageShape = "";
var randomImagePath = "";

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

var imagePaths = [
  {
    name: "Compression Circle",
    path: "../../assets/compressionCircle.png",
    type: "Compression",
    shape: "Circle",
  },
  {
    name: "Compression Square",
    path: "../../assets/compressionSquare.png",
    type: "Compression",
    shape: "Square",
  },
  {
    name: "Traction Circle",
    path: "../../assets/tractionCircle.png",
    type: "Traction",
    shape: "Circle",
  },
  {
    name: "Traction Square",
    path: "../../assets/tractionSquare.png",
    type: "Traction",
    shape: "Square",
  },
];

$(document).ready(function () {
  $(collapseFour).on("shown.bs.collapse", function () {
    handleExerciseAccordionOpen();
  });
  $(collapseFour).on("hide.bs.collapse", function () {
    handleExerciseAccordionClose();
  });
});

function handleExerciseAccordionOpen() {
  var randomIndex = Math.floor(Math.random() * imagePaths.length);  
  randomImageType = imagePaths[randomIndex].type;
  randomImageShape = imagePaths[randomIndex].shape;
  randomImagePath = imagePaths[randomIndex].path;
  var img = document.createElement("img");
  img.src = randomImagePath;
  img.alt = "Random Image";

  valueA = generateValueA();
  valueB = generateValueB();
  valueC = generateValueC();
  tractionFlow = generateTractionFlow();
  tractionLimit = generateTractionLimit();
  resilience = generateResilience();
  vonMises = 0.31;

  safetyFactor = calculateSafetyFactor();

  var accordionBody = document.querySelector(collapseFourAccordionBody);

  accordionBody.innerHTML = "";
  accordionBody.appendChild(img);

  var form = document.createElement("form");
  form.innerHTML = `
    <div class="container mt-4 mb-4">
        <div class="mb-3 d-flex align-items-center">
            <label for="tensao" class="form-label me-3">Tensão da estrutura (σ) (3 casas)</label>
            <div style="width: 90px;">
                <input type="text" class="form-control" id="tensao" style="font-size: smaller;">
            </div>
            <label class="mx-2">[MPa]</label>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label for="coeficiente" class="form-label me-3">Coeficiente de Segurança (S) (2 casas)</label>
            <div style="width: 90px;">
                <input type="text" class="form-control" id="coeficiente" style="font-size: smaller;">
            </div>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label for="deformacaoEscoamento" class="form-label me-3">Deformação na Tensão de escoamento (εe) (5 casas)</label>
            <div style="width: 90px;">
                <input type="text" class="form-control" id="deformacaoEscoamento" style="font-size: smaller;">
            </div>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label for="moduloElasticidade" class="form-label me-3">Módulo de Elasticidade (E) (3 casas)</label>
            <div style="width: 90px;">
                <input type="text" class="form-control" id="moduloElasticidade" style="font-size: smaller;">
            </div>
            <label class="mx-2">[GPa]</label>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label for="deformacaoLongitudinal" class="form-label me-3">Deformação Longitudinal (ε) (5 casas)</label>
            <div style="width: 90px;">
                <input type="text" class="form-control" id="deformacaoLongitudinal" style="font-size: smaller;">
            </div>
            <label class="mx-2">[mm/mm]</label>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label for="deformacaoTransversal" class="form-label me-3">Deformação Transversal (εt) (5 casas)</label>
            <div style="width: 90px;">
                <input type="text" class="form-control" id="deformacaoTransversal" style="font-size: smaller;">
            </div>
            <label class="mx-2">[mm/mm]</label>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label for="variacaoComprimento" class="form-label me-3">Variação de Comprimento (Δl) (3 casas)</label>
            <div style="width: 90px;">
                <input type="text" class="form-control" id="variacaoComprimento" style="font-size: smaller;">
            </div>
            <label class="mx-2">[mm]</label>
        </div>
        <div class="mb-3 d-flex align-items-center">
            <label for="variacaoLargura" class="form-label me-3">Variação de Largura (Δw) (5 casas)</label>
            <div style="width: 90px;">
                <input type="text" class="form-control" id="variacaoLargura" style="font-size: smaller;">
            </div>
            <label class="mx-2">[mm]</label>
        </div>
        <div class="d-flex justify-content-start">
            <button id="btnVerificar" type="button" class="btn btn-secondary">Verificar</button>
        </div>

        <div>
          <label>[A] = ${valueA} mm</label>
        </div>
        <div>
          <label>[B] = ${valueB} mm</label>
        </div>
        <div>
          <label>[C] = ${valueC} N</label>
        </div>
        <div>&sigma;<sub>&epsilon;</sub>: ${tractionFlow} MPa</div>
        <div>&sigma;<sub>LRT</sub>: ${tractionLimit} MPa</div>
        <div>
          <label>Ur = ${resilience} MJ/M³</label>
        </div>
        <div>
          <label>v = ${vonMises} MJ/M³</label>
        </div>
    </div>`;

  accordionBody.appendChild(form);
   
  $(btnVerificar).on("click", function() {
    validateResult();
  });
}

function handleExerciseAccordionClose() {
  var accordionBody = document.querySelector(collapseFourAccordionBody);
  accordionBody.innerHTML = "";
}

function generateValueA(){
  var randomValue = Math.random();
  var scaledValue = randomValue * (90 - 40) + 40;
  var roundedValue = Math.round(scaledValue);
  return roundedValue;
}

function generateValueB(){
  var randomValue = Math.random();
  var scaledValue = randomValue * (200 - 150) + 150;
  var roundedValue = Math.round(scaledValue);
  return roundedValue;
}

function generateValueC(){
  var randomValue = Math.random();
  var scaledValue = randomValue * (200000 - 100000) + 100000;
  var roundedValue = Math.round(scaledValue);
  return roundedValue;
}

function generateTractionFlow(){
  var randomValue = Math.random();
  var scaledValue = randomValue * (599 - 400) + 400;
  var roundedValue = Math.round(scaledValue);
  return roundedValue;
}

function generateTractionLimit(){
  var randomValue = Math.random();
  var scaledValue = randomValue * (800 - 600) + 600;
  var roundedValue = Math.round(scaledValue);
  return roundedValue;
}

function generateResilience(){
  var randomValue = Math.random();
  var scaledValue = randomValue * (3 - 1) + 1;
  var roundedValue = Math.round(scaledValue);
  return roundedValue;
}

function calculateArea(){
  return randomImageShape == _circle ? (Math.PI * Math.pow(valueA, 2)) : Math.pow(valueA, 2);
}

function calculateTraction(){
  return (valueC / area); 
}

function calculateSignal(){
  if(randomImageType == _compression){
    //tratativa para calcular os sinais (+/-)
  }
  else if(randomImageType == _traction){
    //tratativa para calcular os sinais (+/-)
  }
}

function calculateSafetyFactor(){
  return (tractionFlow / traction);
}

function validateResult(){
  area = calculateArea();
  traction = calculateTraction();
  safetyFactor = calculateSafetyFactor();

  console.log(`Área: ${area}`);
  console.log(`Tensão: ${traction}`);
  console.log(`S: ${safetyFactor}`);
}