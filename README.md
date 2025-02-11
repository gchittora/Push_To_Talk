# Push-To-Talk App

This is a React Native app implementing a push-to-talk system using WebSockets.

## Prerequisites
Ensure you have the following installed:
- Node.js
- npm or yarn
- Android SDK (for running on a physical device or emulator)
- A physical Android device (preferred) or an emulator
- React Native CLI (`npm install -g react-native-cli`)

## Installation

1. **Clone the Repository**
   ```sh
   git clone https://github.com/gchittora/Push_To_Talk.git
   cd Push_To_Talk
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

## Running the Application

### 1. Start the WebSocket Server
In a separate terminal, navigate to the server directory (if applicable) and run:
   ```sh
   node server.js
   ```

### 2. Start Metro Bundler
In the main project directory, run:
   ```sh
   npx react-native start
   ```

### 3. Run the App on a Physical Device (Preferred)
Using a physical Android phone is preferred over a browser or emulator. To run the app:
   ```sh
   npx react-native run-android
   ```
   - Connect your Android device via USB and enable USB debugging.
   - Ensure Android SDK is installed and properly set up.
Since, you will be running it on local server make sure you are on the same network
### 4. Running in an Emulator (Optional)
If using an emulator, ensure Android Studio and an emulator instance are properly configured.
   ```sh
   npx react-native run-android
   ```

## Notes
- Ensure your WebSocket server is running before starting the app.
- Metro Bundler and the WebSocket server must run in separate terminals.
- If you encounter build errors, check if Android SDK is properly configured and `adb` is accessible.

## Troubleshooting
- If the app does not load, ensure Metro Bundler is running.
- If WebSocket is not connecting, verify the server is running and update the `WEBSOCKET_URL` in the code.
- Run `adb devices` to check if your device is detected.

---
Developed by Garvit Chittora

