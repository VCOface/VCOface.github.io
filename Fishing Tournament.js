// Define an array to store the participant scores
let scores = [];

// Get references to the form inputs and table body
const form = document.querySelector('form');
const participantInput = document.querySelector('#participant');
const speciesInput = document.querySelector('#fish-species');
const weightInput = document.querySelector('#fish-weight');
const tableBody = document.querySelector('tbody');

// Define a function to add a new score to the scoreboard
function addScoreToScoreboard(score) {
  const row = document.createElement('tr');
  const nameCell = document.createElement('td');
  const speciesCell = document.createElement('td');
  const weightCell = document.createElement('td');
  const scoreCell = document.createElement('td');

  nameCell.textContent = score.name;
  speciesCell.textContent = score.species;
  weightCell.textContent = score.weight;
  scoreCell.textContent = calculateTotalScore(score.name);

  row.appendChild(nameCell);
  row.appendChild(speciesCell);
  row.appendChild(weightCell);
  row.appendChild(scoreCell);

  tableBody.appendChild(row);
}

// Define a function to calculate the total score for a participant
function calculateTotalScore(participantName) {
  let totalScore = 0;

  // Loop through the scores array and add up the scores for the participant
  scores.forEach((score) => {
    if (score.name === participantName) {
      totalScore += score.score;
    }
  });

  return totalScore;
}

// Define a function to handle the form submission
function handleSubmit(event) {
  event.preventDefault();

  // Get the selected participant and its index
  const selectedParticipant = participantInput.value;
  const participantIndex = scores.findIndex((score) => score.name === selectedParticipant);

  // Calculate the score for the new catch
  const weight = parseFloat(weightInput.value);
  const score = weight * 2;

  // If the participant already has a score, update it; otherwise, add a new score
  if (participantIndex !== -1) {
    scores[participantIndex].species = speciesInput.value;
    scores[participantIndex].weight = weight;
    scores[participantIndex].score = score;
  } else {
    const newScore = {
      name: selectedParticipant,
      species: speciesInput.value,
      weight: weight,
      score: score,
    };
    scores.push(newScore);
  }

  // Add the new score to the scoreboard
  addScoreToScoreboard({
    name: selectedParticipant,
    species: speciesInput.value,
    weight: weight,
    score: score,
  });

  // Reset the form inputs
  form.reset();
}

// Add an event listener to the form submit button
form.addEventListener('submit', handleSubmit);
