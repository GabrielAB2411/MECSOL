var collapseFour = "#collapseFour";
var collapseFourAccordionBody = "#collapseFour .accordion-body";

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
  var randomImagePath = imagePaths[randomIndex].path;
  var img = document.createElement("img");
  img.src = randomImagePath;
  img.alt = "Random Image";

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
            <button type="button" class="btn btn-secondary">Verificar</button>
        </div>
    </div>`;

  accordionBody.appendChild(form);
}

function handleExerciseAccordionClose() {
  var accordionBody = document.querySelector(collapseFourAccordionBody);
  accordionBody.innerHTML = "";
}
