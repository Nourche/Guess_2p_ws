#  Guessing Game

**Overview:**
A multiplayer number guessing game using WebSocket communication. Players connect, guess a random number, and compete to win with a limited number of attempts.

**Features:**
- WebSocket communication with `ws` library.
- Two-player real-time gameplay.
- Random number generation.
- Instant feedback through WebSocket messages.

## Branches

- **main:** The default version with limited attempts.
- **no_attempts:** A version without limited attempts for an extended gameplay experience.

## How to Run (main):

1. Install dependencies: `npm install`.
2. Run the server: `node server.js`.
3. Connect players via WebSocket clients.
4. Follow on-screen instructions to play.

## How to Run (no_attempts):

1. Switch to the `no_attempts` branch: `git checkout no_attempts`.
2. Install dependencies: `npm install`.
3. Run the server: `node server.js`.
4. Connect players via WebSocket clients.
5. Follow on-screen instructions to play.

**Gameplay:**
1. Players get a unique number on connecting.
2. Game starts with two players.
3. Players take turns guessing the random number.
4. No limit on attempts in the `no_attempts` version.
5. First correct guess wins.
6. Real-time feedback on guesses.

**Tech Stack:**
- Node.js
- WebSocket (`ws`)

**Acknowledgments:**
A simple example of WebSocket communication for multiplayer gaming. Customize for more complexity and features.

