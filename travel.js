// --------------------
// Data
// --------------------
const checklistItems = [
  "Passport","Flight Tickets","Hotel Booking","Travel Insurance","Clothes",
  "Shoes","Charger","Power Bank","Toiletries","Sunglasses",
  "Umbrella","Camera / Phone","Medicines","Local Currency / Cards","Guidebook / Maps"
];

// Replace with your OpenWeather API key
const weatherApiKey = "c7467bf794f55507265aaf7e38219992";

// RapidAPI key
const rapidApiKey = "67cec666e8msh7f6f24fdd4f4738p122849jsn96b9e5bb0796";

// --------------------
// Country code mapping for Visa API
// --------------------
const countryCodes = {
  "Afghanistan":"AF","Albania":"AL","Algeria":"DZ","Andorra":"AD","Angola":"AO",
  "Argentina":"AR","Armenia":"AM","Australia":"AU","Austria":"AT","Azerbaijan":"AZ",
  "Bahamas":"BS","Bahrain":"BH","Bangladesh":"BD","Barbados":"BB","Belarus":"BY",
  "Belgium":"BE","Belize":"BZ","Bhutan":"BT","Bolivia":"BO","Bosnia and Herzegovina":"BA",
  "Brazil":"BR","Brunei":"BN","Bulgaria":"BG","Cambodia":"KH","Canada":"CA",
  "Chile":"CL","China":"CN","Colombia":"CO","Costa Rica":"CR","Croatia":"HR",
  "Cuba":"CU","Cyprus":"CY","Czech Republic":"CZ","Denmark":"DK","Dominican Republic":"DO",
  "Ecuador":"EC","Egypt":"EG","El Salvador":"SV","Estonia":"EE","Finland":"FI",
  "France":"FR","Germany":"DE","Greece":"GR","Hungary":"HU","Iceland":"IS",
  "India":"IN","Indonesia":"ID","Iran":"IR","Iraq":"IQ","Ireland":"IE",
  "Israel":"IL","Italy":"IT","Japan":"JP","Jordan":"JO","Kazakhstan":"KZ",
  "Kenya":"KE","Kuwait":"KW","Latvia":"LV","Lebanon":"LB","Lithuania":"LT",
  "Luxembourg":"LU","Malaysia":"MY","Malta":"MT","Mexico":"MX","Monaco":"MC",
  "Morocco":"MA","Netherlands":"NL","New Zealand":"NZ","Norway":"NO","Pakistan":"PK",
  "Peru":"PE","Philippines":"PH","Poland":"PL","Portugal":"PT","Qatar":"QA",
  "Romania":"RO","Russia":"RU","Saudi Arabia":"SA","Singapore":"SG","South Africa":"ZA",
  "Spain":"ES","Sweden":"SE","Switzerland":"CH","Thailand":"TH","Turkey":"TR",
  "Ukraine":"UA","United Kingdom":"GB","USA":"US","Vietnam":"VN"
};

// --------------------
// Country → Representative city mapping for weather
// --------------------
const countryCities = {
  "Afghanistan":"Kabul","Albania":"Tirana","Algeria":"Algiers","Andorra":"Andorra la Vella",
  "Angola":"Luanda","Argentina":"Buenos Aires","Armenia":"Yerevan","Australia":"Canberra",
  "Austria":"Vienna","Azerbaijan":"Baku","Bahamas":"Nassau","Bahrain":"Manama",
  "Bangladesh":"Dhaka","Barbados":"Bridgetown","Belarus":"Minsk","Belgium":"Brussels",
  "Belize":"Belmopan","Bhutan":"Thimphu","Bolivia":"Sucre","Bosnia and Herzegovina":"Sarajevo",
  "Brazil":"Brasília","Brunei":"Bandar Seri Begawan","Bulgaria":"Sofia","Cambodia":"Phnom Penh",
  "Canada":"Ottawa","Chile":"Santiago","China":"Beijing","Colombia":"Bogotá",
  "Costa Rica":"San Jose","Croatia":"Zagreb","Cuba":"Havana","Cyprus":"Nicosia",
  "Czech Republic":"Prague","Denmark":"Copenhagen","Dominican Republic":"Santo Domingo",
  "Ecuador":"Quito","Egypt":"Cairo","El Salvador":"San Salvador","Estonia":"Tallinn",
  "Finland":"Helsinki","France":"Paris","Germany":"Berlin","Greece":"Athens","Hungary":"Budapest",
  "Iceland":"Reykjavik","India":"New Delhi","Indonesia":"Jakarta","Iran":"Tehran",
  "Iraq":"Baghdad","Ireland":"Dublin","Israel":"Jerusalem","Italy":"Rome","Japan":"Tokyo",
  "Jordan":"Amman","Kazakhstan":"Nur-Sultan","Kenya":"Nairobi","Kuwait":"Kuwait City",
  "Latvia":"Riga","Lebanon":"Beirut","Lithuania":"Vilnius","Luxembourg":"Luxembourg",
  "Malaysia":"Kuala Lumpur","Malta":"Valletta","Mexico":"Mexico City","Monaco":"Monaco",
  "Morocco":"Rabat","Netherlands":"Amsterdam","New Zealand":"Wellington","Norway":"Oslo",
  "Pakistan":"Islamabad","Peru":"Lima","Philippines":"Manila","Poland":"Warsaw",
  "Portugal":"Lisbon","Qatar":"Doha","Romania":"Bucharest","Russia":"Moscow",
  "Saudi Arabia":"Riyadh","Singapore":"Singapore","South Africa":"Pretoria","Spain":"Madrid",
  "Sweden":"Stockholm","Switzerland":"Bern","Thailand":"Bangkok","Turkey":"Ankara",
  "Ukraine":"Kyiv","United Kingdom":"London","USA":"Washington","Vietnam":"Hanoi"
};

// --------------------
// On page load
// --------------------
window.onload = async function() {
  const fromPhoto = localStorage.getItem("fromPhoto") === "true";
  let country = localStorage.getItem("travelCountry");

  if(fromPhoto) {
    country = "France"; // Demo detection
    document.getElementById("locationResult").innerText = "Detected from photo: Eiffel Tower → France";
  } else {
    document.getElementById("locationResult").innerText = "Selected country: " + country;
  }

  renderChecklist();
  getWeather(country);

  document.getElementById('check-visa').addEventListener('click', () => {
    const passportCode = document.getElementById('passportSelect').value;
    const destinationCode = countryCodes[country] || country;
    showVisaInfo(passportCode, destinationCode, country);
  });

  // Hugging Face Photo Detection button
  const photoBtn = document.getElementById("identifyPhotoBtn");
  if(photoBtn){
    photoBtn.addEventListener("click", identifyLocation);
  }
};

// --------------------
// Weather
// --------------------
async function getWeather(country) {
  const result = document.getElementById("weatherResult");
  const city = countryCities[country] || country;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if(data.cod === 200) {
      const temp = data.main.temp;
      const condition = data.weather[0].description;

      let clothing = "👕 Wear something light.";
      if(temp < 10) clothing = "🧥 Take a jacket.";
      if(condition.includes("rain")) clothing += " ☔ Don’t forget an umbrella!";

      result.innerText = `${country} Weather: ${temp}°C, ${condition}. Suggestion: ${clothing}`;
    } else {
      result.innerText = "Weather not found.";
    }
  } catch(err) {
    result.innerText = "Error fetching weather.";
    console.error(err);
  }
}

// --------------------
// Checklist + Mood
// --------------------
function renderChecklist() {
  const checklist = document.getElementById("checklist");
  checklist.innerHTML = "";
  checklistItems.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" class="checkItem"> ${item}`;
    checklist.appendChild(li);
  });

  const checkboxes = document.querySelectorAll(".checkItem");
  checkboxes.forEach(cb => cb.addEventListener("change", updateMood));
}

function updateMood() {
  const checkboxes = document.querySelectorAll(".checkItem");
  const total = checkboxes.length;
  const checked = Array.from(checkboxes).filter(cb => cb.checked).length;

  const percentage = (checked / total) * 100;
  document.getElementById("moodBar").style.width = percentage + "%";

  const moodText = document.getElementById("moodText");
  if(percentage === 0) moodText.innerText = "Mood: 😐";
  else if(percentage <= 30) moodText.innerText = "Mood: 🙂";
  else if(percentage <= 60) moodText.innerText = "Mood: 😃";
  else if(percentage <= 90) moodText.innerText = "Mood: 😄";
  else moodText.innerText = "Mood: 🤩";
}

// --------------------
// Visa Info
// --------------------
async function showVisaInfo(passportCode, destinationCode, countryName) {
  const infoElement = document.getElementById("visaInfo");

  const url = 'https://visa-requirement.p.rapidapi.com/';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': 'visa-requirement.p.rapidapi.com',
    },
    body: new URLSearchParams({
      passport: passportCode,
      destination: destinationCode,
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if(data && data.visa) {
      infoElement.innerHTML = `
        🛂 ${countryName} Visa & Docs Info:
        <p><strong>Status:</strong> ${data.visa}</p>
        <p><strong>Stay Duration:</strong> ${data.stay_of}</p>
        <p><strong>Passport Validity:</strong> ${data.pass_valid}</p>
        <p><strong>Embassy Link:</strong> <a href="${data.embassy}" target="_blank">Visit Embassy</a></p>
        <p><strong>eVisa Link:</strong> <a href="${data.link}" target="_blank">Apply for eVisa</a></p>
      `;
    } else {
      infoElement.innerText = "Visa info not available";
    }
  } catch(err) {
    console.error(err);
    infoElement.innerText = "Error fetching visa info.";
  }
}

// --------------------
// AI Itinerary
// --------------------
