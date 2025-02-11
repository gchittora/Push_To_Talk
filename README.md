# Push-To-Talk App

This is a **React Native** push-to-talk app that enables real-time voice communication using **WebSockets**.

---
## Prerequisites
Ensure you have the following installed:

- **Node.js** (Download from [nodejs.org](https://nodejs.org/))
- **npm** or **yarn**
- **Android SDK** (Required for running on an emulator or physical device)
- **A physical Android device** (Preferred) or an emulator
- **React Native CLI** (Install globally using: `npm install -g react-native-cli`)
- **Java Development Kit (JDK 17 or higher)**
- **Gradle** (Installed with Android Studio)
- **USB Debugging enabled** (For running on a physical device)

---
## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/gchittora/Push_To_Talk.git
cd Push_To_Talk
```

### 2. Install Dependencies
```sh
npm install
```

---
## Running the Application

### 1. Start the WebSocket Server
If you have a WebSocket server, navigate to its directory and run:
```sh
node server.js
```
Ensure your WebSocket **server is running** before starting the app.

### 2. Start Metro Bundler
```sh
npx react-native start
```
This must be kept running in a separate terminal.

### 3. Run the App on a Physical Device (Preferred)
Using a **physical Android phone** is recommended. Connect your device via USB and ensure **USB debugging** is enabled.
```sh
npx react-native run-android
```

### 4. Running in an Emulator (Optional)
Ensure Android Studio and an emulator instance are properly configured, then run:
```sh
npx react-native run-android
```

If the emulator does not detect the device, use:
```sh
adb devices
```
This will list all connected devices/emulators.

---
## Troubleshooting

### 1. WebSocket Not Connecting
- Verify the WebSocket server is running.
- Check if the **WEBSOCKET_URL** is correct in the code.
- Ensure the device and server are on the **same network**.
- Try restarting Metro Bundler and clearing cache:
  ```sh
  npx react-native start --reset-cache
  ```

### 2. Metro Bundler Issues
If the app is stuck on the bundler screen, stop Metro (`Ctrl+C`) and restart:
```sh
npx react-native start --reset-cache
```

### 3. Gradle Build Errors
If `npx react-native run-android` fails due to **Gradle errors**, try:
```sh
cd android
./gradlew clean
./gradlew build
cd ..
npx react-native run-android
```
On Windows, use:
```sh
cd android
gradlew.bat clean
gradlew.bat build
cd ..
npx react-native run-android
```

### 4. SDK Licenses Not Accepted
If you see an SDK license error, accept licenses manually:
```sh
sdkmanager --licenses
```

### 5. Java Version Issues
If there is a **Java version** mismatch, set Java 17 manually:
- **macOS/Linux:**
  ```sh
  export JAVA_HOME=$(/usr/libexec/java_home -v 17)
  ```
- **Windows:**
  ```sh
  set JAVA_HOME="C:\Program Files\Java\jdk-17"
  ```

### 6. Check Android SDK and ADB
Make sure **ADB (Android Debug Bridge)** is working properly:
```sh
adb devices
```
If no device appears, restart the **ADB server**:
```sh
adb kill-server
adb start-server
```

### 7. Clearing and Reinstalling Everything
If none of the above solutions work, try a full clean:
```sh
cd android && ./gradlew clean && cd ..
rm -rf node_modules
npm install
npx react-native start --reset-cache
npx react-native run-android
```

---
## Notes
- WebSocket server **must be running** before starting the app.
- Metro Bundler and WebSocket server should run in **separate terminals**.
- **Ensure Android SDK is installed** and properly set up in Android Studio.
- Run `adb devices` to check if your device is detected.

---
## Developed By
**Garvit Chittora**

This project was built as an assignment.

