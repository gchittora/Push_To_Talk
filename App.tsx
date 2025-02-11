import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';

// WebSocket server URL
const WEBSOCKET_URL = 'ws://172.22.28.123:8081'; // Change based on your network

// Generate a unique user ID (Can be improved using AsyncStorage or react-native-device-info)
const generateUserId = () => `User_${Math.floor(Math.random() * 10000)}`;

const App = () => {
  const ws = useRef<WebSocket | null>(null);
  const [userId] = useState(generateUserId()); // Generate a unique user ID
  const [isTalking, setIsTalking] = useState(false);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Function to connect to WebSocket
  const connectWebSocket = useCallback(() => {
    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
      ws.current = new WebSocket(WEBSOCKET_URL);

      ws.current.onopen = () => {
        addLog(`✅ Connected as ${userId}`);
        ws.current?.send(JSON.stringify({ type: 'connect', user: userId })); // Send connection message
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'start_talking') {
          setActiveUsers((prev) => [...new Set([...prev, data.user])]);
          addLog(`🎙️ ${data.user} started talking`);
        } else if (data.type === 'stop_talking') {
          setActiveUsers((prev) => prev.filter(user => user !== data.user));
          addLog(`🔇 ${data.user} stopped talking`);
        } else if (data.type === 'connect') {
          addLog(`🔵 ${data.user} connected`);
        } else if (data.type === 'disconnect') {
          setActiveUsers((prev) => prev.filter(user => user !== data.user));
          addLog(`❌ ${data.user} disconnected`);
        }
      };

      ws.current.onerror = () => addLog('⚠️ WebSocket error occurred');
      ws.current.onclose = () => {
        addLog('❌ WebSocket disconnected, attempting to reconnect...');
        setTimeout(connectWebSocket, 3000);
      };
    }
  }, [userId]);

  useEffect(() => {
    connectWebSocket();
    return () => ws.current?.close();
  }, [connectWebSocket]);

  // Function to add logs
  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Handle button press (start talking)
  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 1.2, useNativeDriver: true }).start();
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: 'start_talking', user: userId }));
      setIsTalking(true);
    }
  };

  // Handle button release (stop talking)
  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: 'stop_talking', user: userId }));
      setIsTalking(false);
    }
  };

  // Clear logs manually
  const clearLogs = () => setLogs([]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Push-to-Talk</Text>
      <Text style={styles.subHeading}>User ID: {userId}</Text>
      <Text style={styles.subHeading}>Active Users: {activeUsers.length}</Text>

      <View style={styles.card}>
        <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: scaleAnim }] }]}>
          <TouchableOpacity
            style={[styles.button, isTalking ? styles.activeButton : null]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.buttonText}>{isTalking ? '🎙️ Talking...' : '🎤 Hold to Talk'}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View style={styles.usersCard}>
        <Text style={styles.subHeading}>Currently Talking:</Text>
        <Text style={styles.userList}>{activeUsers.length ? activeUsers.join(', ') : 'None'}</Text>
      </View>

      <ScrollView style={styles.logContainer}>
        {logs.map((log, index) => (
          <Text key={index} style={styles.logText}>{log}</Text>
        ))}
      </ScrollView>
      
      <TouchableOpacity style={styles.clearButton} onPress={clearLogs}>
        <Text style={styles.clearButtonText}>Clear Logs</Text>
      </TouchableOpacity>
      
      <Text style={styles.footer}>Developer: Garvit Chittora</Text>
      <Text style={styles.footer}>Built as: Order G's Assignment</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212', padding: 20 },
  heading: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  subHeading: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  card: { backgroundColor: '#1E1E1E', padding: 30, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10 },
  buttonWrapper: { alignItems: 'center' },
  button: { padding: 20, backgroundColor: '#007bff', borderRadius: 50 },
  activeButton: { backgroundColor: '#28a745' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  usersCard: { marginTop: 20, padding: 15, backgroundColor: '#1E1E1E', borderRadius: 15, width: '100%', alignItems: 'center' },
  userList: { fontSize: 16, color: '#bbb' },
  logContainer: { marginTop: 20, width: '100%', height: 150, backgroundColor: '#1E1E1E', padding: 10, borderRadius: 10 },
  logText: { fontSize: 14, color: '#ccc' },
  clearButton: { marginTop: 10, padding: 10, backgroundColor: '#ff4444', borderRadius: 10 },
  clearButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  footer: { marginTop: 10, color: '#bbb', fontSize: 14 },
});

export default App;
