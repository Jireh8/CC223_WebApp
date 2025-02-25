document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const popupList = document.getElementById("popup-list");
    const closeBtn = document.querySelector(".close");

    let instrumentsData = {}; 

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
