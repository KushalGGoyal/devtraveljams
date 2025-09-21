function startJourney() {
    const photoInput = document.getElementById("photoInput").files[0];
    const country = document.getElementById("countrySelect").value;
    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;

    // Check if at least one input is provided
    if(!photoInput && !country && !fromDate && !toDate){
        alert("Please provide at least one input!");
        return;
    }

    // Save to localStorage
    if(photoInput) {
        localStorage.setItem("fromPhoto", "true");
        localStorage.setItem("photoName", photoInput.name);
    } else {
        localStorage.setItem("fromPhoto", "false");
    }

    if(country) {
        localStorage.setItem("travelCountry", country);
    }

    if(fromDate) {
        localStorage.setItem("fromDate", fromDate);
    }

    if(toDate) {
        localStorage.setItem("toDate", toDate);
    }

    window.location.href = "travel.html";
}

// Disable inputs mutually
function disablePhoto() {
    const country = document.getElementById("countrySelect").value;
    document.getElementById("photoInput").disabled = !!country;
}

function disableCountry() {
    const photo = document.getElementById("photoInput").files[0];
    document.getElementById("countrySelect").disabled = !!photo;
}
