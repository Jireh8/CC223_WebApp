const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend"))); // Serve frontend files

// Sample API route to get instruments
app.get("/api/instruments", (req, res) => {
    const instruments = {
        Strings: ["Violin", "Viola", "Cello", "Double Bass", "Harp"],
        Brass: ["Trumpet", "Trombone", "French Horn", "Tuba"],
        More: ["Piano", "Flute", "Clarinet", "Oboe"]
    };
    res.json(instruments);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
