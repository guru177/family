const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use("/api/announcements", require("./routes/announcementRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/scrolling-banner", require("./routes/scrollingBannerRoutes"));

app.use("/uploads/announcements", express.static("uploads/announcements"));
app.use("/uploads/events", express.static("uploads/events"));
app.use("/uploads/gallery", express.static("uploads/gallery"));
app.use("/uploads/banners", express.static("uploads/banners"));
app.use("/uploads/hero-slider", express.static("uploads/hero-slider"));

app.get("/", (req, res) => {
    res.send("Family API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});