document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-upload");
    const fileLabel = document.querySelector(".file");
    const fileNameDisplay = document.getElementById("file-name");
    const previewContainer = document.getElementById("previewContainer");
    const visualizarBtn = document.getElementById("visualizar-btn");
    const excluirBtn = document.getElementById("excluir-btn");

    function updatePreview() {
        previewContainer.innerHTML = "";
        if (fileInput.files.length > 0) {
            Array.from(fileInput.files).forEach(file => {
                const fileURL = URL.createObjectURL(file);
                const previewDiv = document.createElement("div");
                previewDiv.classList.add("preview");
                previewDiv.innerHTML = `<img src="${fileURL}" alt="Preview"><button class="remove-btn">×</button>`;
                previewContainer.appendChild(previewDiv);

                previewDiv.querySelector(".remove-btn").addEventListener("click", function () {
                    removeFile(file);
                });
            });
        }
    }

    function removeFile(fileToRemove) {
        const dt = new DataTransfer();
        Array.from(fileInput.files).forEach(file => {
            if (file !== fileToRemove) {
                dt.items.add(file);
            }
        });
        fileInput.files = dt.files;
        updatePreview();
    }

    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            fileNameDisplay.innerText = Array.from(fileInput.files).map(file => file.name).join(", ");
        } else {
            fileNameDisplay.innerText = "Nenhum arquivo selecionado";
        }
        updatePreview();
    });

    fileLabel.addEventListener("click", () => {
        fileInput.click();
    });

    ["dragenter", "dragover"].forEach(event => {
        fileLabel.addEventListener(event, e => {
            e.preventDefault();
            fileLabel.classList.add("dragover");
        });
    });

    ["dragleave", "drop"].forEach(event => {
        fileLabel.addEventListener(event, e => {
            e.preventDefault();
            fileLabel.classList.remove("dragover");
        });
    });

    fileLabel.addEventListener("drop", (e) => {
        const dt = new DataTransfer();
        [...e.dataTransfer.files].forEach(file => dt.items.add(file));
        fileInput.files = dt.files;
        fileNameDisplay.innerText = Array.from(fileInput.files).map(file => file.name).join(", ");
        updatePreview();
    });

    visualizarBtn.addEventListener("click", function () {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, "_blank");
        } else {
            alert("Nenhum arquivo foi selecionado.");
        }
    });

    excluirBtn.addEventListener("click", function () {
        fileInput.value = "";
        fileNameDisplay.innerText = "Clique ou Arraste para Upload";
        previewContainer.innerHTML = "";
    });
});