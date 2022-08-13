const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const authRoutes = require("./routes/auth");

// middleware
app.use(cors());
app.use(express.json());

// server setup
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: [],
    credentials: true,
  },
});

const port = 5000;

io.on("connection", (socket) => {
  console.log("socket connected with id " + socket.id);
  socket.on("disconnect", () => {
    console.log("user disconected");
  });
});

server.listen(port, () => {
  console.log(`listening in port ${port}`);
});

const counter = (limit, curr) => {
  // <<<<<<< HEAD
  setTimeout(() => {
    if (limit >= curr) {
      io.emit("counter", curr.toFixed(2));
      counter(limit, (curr += 0.01));
    } else {
      io.emit("state", "Busted");
      io.emit("limit", limit.toFixed(2));
      io.emit("counter", parseFloat(limit).toFixed(2));
      setTimeout(() => startTimer(), 1000);
    }
  }, 50);
};

const randomFloat = (min, max) => {
  return Math.random() * (max - min) + min;
};

const startTimer = () => {
  var timer = 5;
  io.emit("state", "timer");
  setInterval(() => {
    if (timer >= 0) {
      io.emit("timer", timer);
      timer -= 1;
      if (timer < 0) {
        io.emit("state", "inProgress");
        //||THE BET ALGORITHMS||

        //TOTAL AMOUNT IN SYSTEM
        const totolAmountInSystem = 0;

        //ALL AMOUNT PLACED BY THE USER
        const totalBetPlaced = 10000;
        const oddsStack = 15.1;
        //TOTOL POSSIBLE WIN
        const totalPosibleWin = totalBetPlaced * oddsStack;
        if (totalPosibleWin > totolAmountInSystem) {
          var randommizer = Math.floor(Math.random() * 5);
          var randlimit = randommizer;
        } else {
          var randlimit = totolAmountInSystem / totalPosibleWin;
        }
        const checkOdds = randomFloat(1.02, randlimit);

        if (checkOdds <= 1.01) {
          var limit = checkOdds + 1.01;
        } else {
          var limit = checkOdds;
        }

        const curr = 1.0;
        counter(limit, curr);
      }
    }
  }, 1000);
};

startTimer();

//Authentication
app.use("/api/v1", authRoutes);
