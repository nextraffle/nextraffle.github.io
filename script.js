//script.js
document.addEventListener('DOMContentLoaded', function () {
    // Theme switcher
    const themeSwitch = document.getElementById('themeSwitch');
    themeSwitch.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            this.nextElementSibling.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            this.nextElementSibling.classList.remove('dark-mode');
        }
    });

    // Draw button functionality on main.html
    const drawBtn = document.getElementById('drawBtn');
    if (drawBtn) {
        drawBtn.addEventListener('click', function () {
            const quantity = parseInt(document.getElementById('quantity').value);
            const min = parseInt(document.getElementById('min').value);
            const max = parseInt(document.getElementById('max').value);
            const allowRepeats = document.getElementById('allowRepeats').checked;
            const sortAscending = document.getElementById('sortAscending').checked;
            const showOnClick = document.getElementById('showOnClick').checked;

            if (isNaN(quantity) || isNaN(min) || isNaN(max) || min > max || quantity < 1) {
                alert('Por favor, insira valores válidos.');
                return;
            }

            let results = [];
            while (results.length < quantity) {
                const result = Math.floor(Math.random() * (max - min + 1)) + min;
                if (allowRepeats || !results.includes(result)) {
                    results.push(result);
                }
            }

            if (sortAscending) {
                results.sort((a, b) => a - b);
            }

            const params = new URLSearchParams({
                result: results.join(','),
                quantity,
                min,
                max,
                drawDate: new Date().toLocaleString('pt-PT'),
                showOnClick
            });

            window.location.href = `result.html?${params.toString()}`;
        });
    }

    // Display results on result.html
    const urlParams = new URLSearchParams(window.location.search);
    const results = urlParams.get('result') ? urlParams.get('result').split(',') : [];
    const quantity = urlParams.get('quantity');
    const min = urlParams.get('min');
    const max = urlParams.get('max');
    const drawDate = urlParams.get('drawDate');
    const showOnClick = urlParams.get('showOnClick') === 'true';

    const resultsContainer = document.getElementById('results');
    if (resultsContainer && results.length > 0) {
        results.forEach(num => {
            const resultCircle = document.createElement('div');
            resultCircle.classList.add('result-circle');
            if (showOnClick) {
                resultCircle.classList.add('hidden-result');
                resultCircle.addEventListener('click', function () {
                    this.classList.remove('hidden-result');
                    this.innerText = num;
                });
            } else {
                resultCircle.innerText = num;
            }
            resultsContainer.appendChild(resultCircle);
        });

        document.getElementById('quantity').innerText = quantity;
        document.getElementById('min').innerText = min;
        document.getElementById('max').innerText = max;
        document.getElementById('drawDate').innerText = drawDate;

        const copyBtn = document.getElementById('copyBtn');
        copyBtn.addEventListener('click', function () {
            const resultText = `Resultado: ${results.join(', ')}\nData do Sorteio: ${drawDate}\nQuantidade Sorteada: ${quantity}\nSorteio entre: ${min} e ${max}`;
            navigator.clipboard.writeText(resultText).then(function() {
                alert('Resultado copiado para a área de transferência!');
            }, function(err) {
                alert('Erro ao copiar o resultado: ', err);
            });
        });
    }
});

// Function to reset the form on the main.html page
function resetForm() {
    window.location.href = "main.html";
}


