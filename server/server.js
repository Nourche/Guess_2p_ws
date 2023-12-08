const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8083 });

// Store connected players
const players = [];

server.on("connection", async (socket) => {
  console.log("Client connected");

  // Add the new player to the list
  players.push({
    socket,
    attempts: 0,
  });

  // If two players are connected, start the game
  if (players.length === 2) {
    // Generate a random number for the game
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    console.log("Generated Number:", randomNumber);

    // Notify each player that the game has started
    players.forEach((player, index) => {
      player.socket.send(`Game started! You are Player ${index + 1}.`);
    });

    // Listen for messages from players
    players.forEach((playerObj, index) => {
      playerObj.socket.on("message", (message) => {
        console.log(`Player ${index + 1} guessed: ${message}`);
        const player = players[index];

        // Check if player and attempts property exist
        if (player &&   player.attempts < 5) {
          // Check if attempts have reached the limit
          if (parseInt(message) === randomNumber) {
            // Notify the winning player
            player.socket.send("Congratulations! You win!");
            console.log(`Player ${index + 1} wins!`);

            // Notify the other player
            const otherPlayerObj = players.find((p, i) => i !== index);
            otherPlayerObj.socket.send("Game over. You lose!");

            // Reset the game
            resetGame();
          } else {
            // Notify the player to try again
            player.socket.send(`Try again! Attempts left: ${4 - player.attempts}`);
            
            // Increment attempts
            player.attempts++;

            // If attempts reach the limit, notify the player and reset the game
            if (player.attempts === 5) {
              player.socket.send("You've reached the maximum number of attempts. Game over!");
              const otherPlayerObj = players.find((p, i) => i !== index);
            otherPlayerObj.socket.send("other user passed the limitted attempts ,you win!!");
            resetGame();
            }
          }
        }
      });
    });
  }

  // Handle socket closure
  socket.on("close", () => {
    console.log("Client disconnected");

    // Remove the disconnected player from the list
    const index = players.findIndex((player) => player.socket === socket);
    if (index !== -1) {
      players.splice(index, 1);
    }

    // Reset the game if a player disconnects
    resetGame();
  });
});

function resetGame() {
  // Clear the list of players
  players.length = 0;
}
