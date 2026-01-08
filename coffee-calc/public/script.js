
let currentBrewData = null; // Data untuk disave ke DB
let timerInterval;          // Variable buat Timer
let seconds = 0;            // Hitungan detik
let isRunning = false;      // Status timer


document.getElementById('calcForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
 
    const response = await fetch('/calc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Network error');
    const result = await response.json();


    currentBrewData = {
      coffeeName: "My Daily Brew", 
      method: data.type === 'coffee' ? 'V60 (Coffee Based)' : 'V60 (Water Based)',
      ratio: parseFloat(data.ratio),
      coffeeWeight: result.coffee,
      waterAmount: result.water
    };

    
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('saveStatus').innerText = ''; 

    
    document.getElementById('resultText').innerHTML = `
      <p>Coffee: <strong>${result.coffee} g</strong></p>
      <p>Water: <strong>${result.water} g</strong></p>
      <p>Ratio: 1 : ${data.ratio}</p>
    `;

  
    const list = document.getElementById('recipeList');
    list.innerHTML = '';
    document.getElementById('recipeContainer').classList.remove('hidden');

    result.recipe.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${item.step}</strong>: ${item.amount}g <small>(Total: ${item.total}g)</small>`;
      list.appendChild(li);
    });


    document.getElementById('timerControls').classList.remove('hidden');

  } catch (error) {
    console.error(error);
    alert('Gagal menghitung resep.');
  }
});


const saveBtn = document.getElementById('saveBtn');

if (saveBtn) {
    saveBtn.addEventListener('click', async () => {
      if (!currentBrewData) return;

      const statusSpan = document.getElementById('saveStatus');
      statusSpan.innerText = 'Saving...';
      statusSpan.style.color = 'blue';

      try {
        const response = await fetch('/api/save-brew', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentBrewData)
        });

        const result = await response.json();
        if (result.status === 'success') {
          statusSpan.innerText = '✅ Saved!';
          statusSpan.style.color = 'green';
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        console.error(err);
        statusSpan.innerText = '❌ Error Saving';
        statusSpan.style.color = 'red';
      }
    });
}


const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

function formatTime(sec) {
    // Format detik jadi mm:ss (opsional, tapi biar keren)
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`; // Format Menit:Detik
    // Kalau mau simpel detik doang: return `${sec}s`;
}

function updateDisplay() {
    
    timerDisplay.innerText = `${seconds}s`; 
}

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000); 
    }
});

pauseBtn.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
    }
});

resetBtn.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timerInterval);
    seconds = 0;
    updateDisplay();
});