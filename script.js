// Example packing checklist
const checklistItems = [
  "Passport",
  "Flight Tickets",
  "Hotel Booking",
  "Clothes",
  "Charger",
  "Power Bank"
];

// Load checklist into page
window.onload = function () {
  const checklist = document.getElementById("checklist");
  checklistItems.forEach(item => {
    let li = document.createElement("li");
    li.innerHTML = `<input type="checkbox"> ${item}`;
    checklist.appendChild(li);
  });
};

// 🔍 (Placeholder) Photo → Location
async function identifyLocation() {
  const result = document.getElementById("locationResult");
  result.innerText = "⚠️ Photo → Location AI not connected yet. (Mock: Eiffel Tower → Paris)";
}

// 🌦 Weather API
async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const result = document.getElementById("weatherResult");

  const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // 🔑 Put your key here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const temp = data.main.temp;
      const condition = data.weather[0].description;

      let clothing = "👕 Wear something light.";
      if (temp < 10) clothing = "🧥 Take a jacket.";
      if (condition.includes("rain")) clothing += " ☔ Don’t forget an umbrella!";

      result.innerText = `${city}: ${temp}°C, ${condition}. Suggestion: ${clothing}`;
    } else {
      result.innerText = "City not found.";
    }
  } catch (error) {
    result.innerText = "Error fetching weather.";
  }
}
async function identifyLocation() {
  const result = document.getElementById("locationResult");
  const input = document.getElementById("photoInput");
  const file = input.files[0];

  if (!file) {
    result.innerText = "Please upload a photo first!";
    return;
  }

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer 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" 
        },
        body: file
      }
    );

    const data = await response.json();
    console.log(data);

    if (data.error) {
      result.innerText = "⚠️ API is waking up, try again in a few seconds.";
      return;
    }

    result.innerText = `Prediction: ${data[0].label} (Confidence: ${(data[0].score * 100).toFixed(2)}%)`;
  } catch (error) {
    result.innerText = "❌ Error detecting location.";
    console.error(error);
  }
}
async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const result = document.getElementById("weatherResult");

  const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // 🔑 replace with your key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const temp = data.main.temp;
      const condition = data.weather[0].description;

      let clothing = "👕 Wear something light.";
      if (temp < 10) clothing = "🧥 Take a jacket.";
      if (condition.includes("rain")) clothing += " ☔ Don’t forget an umbrella!";

      result.innerText = `${city}: ${temp}°C, ${condition}. Suggestion: ${clothing}`;
    } else {
      result.innerText = "City not found.";
    }
  } catch (error) {
    result.innerText = "Error fetching weather.";
    console.error(error);
  }
}
async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const result = document.getElementById("weatherResult");

  const apiKey = "63d0031ca2d0e2e01962ba60a4dc81b7";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const temp = data.main.temp;
      const condition = data.weather[0].description;

      let clothing = "👕 Wear something light.";
      if (temp < 10) clothing = "🧥 Take a jacket.";
      if (condition.includes("rain")) clothing += " ☔ Don’t forget an umbrella!";

      result.innerText = `${city}: ${temp}°C, ${condition}. Suggestion: ${clothing}`;
    } else {
      result.innerText = "City not found.";
    }
  } catch (error) {
    result.innerText = "Error fetching weather.";
    console.error(error);
  }
}
// ✅ Expanded Travel Checklist
const checklistItems = [
  "Passport",
  "Flight Tickets",
  "Hotel Booking",
  "Travel Insurance",
  "Clothes",
  "Shoes",
  "Charger",
  "Power Bank",
  "Toiletries",
  "Sunglasses",
  "Umbrella",
  "Camera / Phone",
  "Medicines",
  "Local Currency / Cards",
  "Guidebook / Maps"
];

// 🌟 Render Checklist on Page Load
window.onload = function () {
  const checklist = document.getElementById("checklist");

  checklistItems.forEach(item => {
    let li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" class="checkItem"> ${item}`;
    checklist.appendChild(li);
  });

  // Attach event listeners to checkboxes
  const checkboxes = document.querySelectorAll(".checkItem");
  checkboxes.forEach(cb => {
    cb.addEventListener("change", updateMood);
  });
};

// 🌈 Function to Update Mood / Progress Bar
function updateMood() {
  const checkboxes = document.querySelectorAll(".checkItem");
  const total = checkboxes.length;
  const checked = Array.from(checkboxes).filter(cb => cb.checked).length;

  // Update progress bar width
  const percentage = (checked / total) * 100;
  const moodBar = document.getElementById("moodBar");
  moodBar.style.width = percentage + "%";

  // Update mood emoji
  const moodText = document.getElementById("moodText");
  if (percentage === 0) moodText.innerText = "Mood: 😐";
  else if (percentage <= 30) moodText.innerText = "Mood: 🙂";
  else if (percentage <= 60) moodText.innerText = "Mood: 😃";
  else if (percentage <= 90) moodText.innerText = "Mood: 😄";
  else moodText.innerText = "Mood: 🤩";
}
const visaInfo = {
  "Japan": "Visa required for Indian citizens. Apply online or at embassy.",
  "France": "Schengen visa required. Apply online or at embassy.",
  "USA": "Visa required. Apply for B1/B2 tourist visa online."
};

function showVisaInfo(country) {
  const info = visaInfo[country];
  if (info) {
    alert(`${country} Visa Info:\n${info}`);
  } else {
    alert("Visa info not available for this country.");
  }
}



