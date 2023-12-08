const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8083 });

// Store connected players
const players = [];

server.on("connection", async (socket) => {
  console.log("Client connected");

  // Add the new player to the list
  players.push(socket);

  // If two players are connected, start the game
  if (players.length === 2) {
    // Generate a random number for the game
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    console.log("Generated Number:", randomNumber);

    // Notify each player that the game has started
    players.forEach((player, index) => {
      player.send(`Game started! You are Player ${index + 1}.`);
    });

    // Listen for messages from players
    players.forEach((player, index) => {
      player.on("message", (message) => {
        console.log(`Player ${index + 1} guessed: ${message}`);

        if (parseInt(message) === randomNumber) {
          // Notify the winning player
          player.send("Congratulations! You win!");
          console.log(`Player ${index + 1} wins!`);

          // Notify the other player
          const otherPlayer = players.find((p, i) => i !== index);
          otherPlayer.send("Game over. You lose!");
        } else {
          // Notify the player to try again
          player.send("Try again!");
        }
      });
    });
  }

  // Handle socket closure
  socket.on("close", () => {
    console.log("Client disconnected");

    // Remove the disconnected player from the list
    const index = players.indexOf(socket);
    if (index !== -1) {
      players.splice(index, 1);
    }
  });
});

// async function askQuestion(question) {
//   return new Promise((resolve) => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });

//     // readline.question(question, (answer) => {
//     //   resolve(answer);
//     //   readline.close();
//     // });
//   });
// }

