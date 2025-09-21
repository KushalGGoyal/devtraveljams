function startWithCountry() {
  const country = document.getElementById("countrySelect").value;
  if(!country) {
    alert("Please select a country!");
    return;
  }
  localStorage.setItem("travelCountry", country);
  localStorage.setItem("fromPhoto", "false");
  window.location.href = "travel.html";
}

function startWithPhoto() {
  const input = document.getElementById("photoInput");
  const file = input.files[0];
  if(!file) {
    alert("Please upload a photo!");
    return;
  }
  localStorage.setItem("fromPhoto", "true");
  localStorage.setItem("photoName", file.name);
  window.location.href = "travel.html";
}
