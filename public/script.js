function showSection(sectionClass) {
    
    document.querySelector('.home').style.display = 'none';
    document.querySelector('.workout').style.display = 'none';
    document.querySelector('.nutrition').style.display = 'none';
    document.querySelector('.profile').style.display = 'none';

    
    document.querySelector('.' + sectionClass).style.display = 'block';
    colorchange_nav(sectionClass);
}

showSection('home');

function colorchange_nav(sectionClass){
    const navLinks = document.querySelectorAll('header ul li a');
    navLinks.forEach(link => {
    link.style.color = 'white';
    link.style.textShadow = 'none';
  });

  const activeLink = Array.from(navLinks).find(link =>
    link.getAttribute('onclick').includes(sectionClass)
  );

  if (activeLink) {
    activeLink.style.color="#08e8de";
  }
}

async function fetchExercises(muscle) {
  const overlay = document.querySelector('.overlay');
  const title = document.getElementById('muscle-title');
  const container = document.getElementById('exercise-container');

  overlay.style.display = 'flex';
  title.textContent = `${muscle.toUpperCase()} Exercises`;
  container.innerHTML = '<p class="loading">Loading exercises...</p>';

  try {
    const res = await fetch(`/exercises/${muscle}`);
    if (!res.ok) throw new Error('Failed to load exercises');

    const exercises = await res.json();

    if (!exercises.length) {
      container.innerHTML = `<p style="color:#f66;">No exercises found for ${muscle}</p>`;
      return;
    }

    // Render exercise info (no image)
    container.innerHTML = exercises.map(ex => `
      <div class="exercise-card">
        <div class="exercise-info">
          <h3>${ex.name.charAt(0).toUpperCase() + ex.name.slice(1)}</h3>
          <p><strong>Target:</strong> ${ex.target}</p>
          <p><strong>Equipment:</strong> ${ex.equipment}</p>
        </div>
      </div>
    `).join('');

  } catch (error) {
    console.error('❌', error);
    container.innerHTML = '<p style="color:red;">⚠️ Error loading exercises!</p>';
  }
}

function closeOverlay() {
  document.querySelector('.overlay').style.display = 'none';
}

async function searchFood() {
  const foodName = document.getElementById("foodSearch").value;
  const resultBox = document.getElementById("food-results");

  if (foodName.trim() === "") {
    resultBox.innerHTML = "<p>Please type a food name.</p>";
    return;
  }

  resultBox.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`/nutrition?query=${foodName}`);
    const data = await response.json();

    if (data.error) {
      resultBox.innerHTML = `<p>${data.error}</p>`;
      return;
    }

    if (data.length === 0) {
      resultBox.innerHTML = "<p>No food found.</p>";
      return;
    }

    resultBox.innerHTML = "";
    data.forEach(item => {
      resultBox.innerHTML += `
        <div class="food-card">
          <h3>${item.name}</h3>
          <p>🔥 Calories: ${item.calories}</p>
          <p>💪 Protein: ${item.protein_g} g</p>
          <p>🥔 Carbs: ${item.carbohydrates_total_g} g</p>
          <p>🧈 Fat: ${item.fat_total_g} g</p>
        </div>
      `;
    });

  } catch (error) {
    console.log("Error:", error);
    resultBox.innerHTML = "<p>Something went wrong. Try again later.</p>";
  }
}


function showTrending() {
  document.getElementById('trendingOverlay').style.display = 'flex';
}

function closeTrending() {
  document.getElementById('trendingOverlay').style.display = 'none';
}




