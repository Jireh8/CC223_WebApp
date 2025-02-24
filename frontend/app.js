document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const popupList = document.getElementById("popup-list");
    const closeBtn = document.querySelector(".close");

    // Fallback data in case the backend is unavailable
    const defaultInstruments = {
        "Strings": ["Violin", "Viola", "Cello", "Double Bass", "Harp"],
        "Brass": ["Trumpet", "Trombone", "French Horn", "Tuba"],
        "More": ["Piano", "Flute", "Clarinet", "Oboe"]
    };

    let instrumentsData = {}; // Store fetched data

    // Fetch instruments from backend
    fetch("http://localhost:5000/api/instruments")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched instruments:", data);
            instrumentsData = data;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            console.log("Using fallback instruments.");
            instrumentsData = defaultInstruments; // Use fallback data if backend fails
        });

    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", function () {
            let type = this.getAttribute("data-type");
            let list = instrumentsData[type] || ["No instruments found"];

            popupTitle.innerText = type + " Instruments";
            popupList.innerHTML = list.map(item => `<li>${item}</li>`).join(", ");

            popup.style.display = "flex";
        });
    });

    closeBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});
