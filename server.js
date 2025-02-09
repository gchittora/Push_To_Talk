const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

console.log('WebSocket server running on ws://localhost:8081');

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message.toString()); // Convert Buffer to string
            console.log('Received:', data);

            if (data.type === 'start_talking' || data.type === 'stop_talking') {
                // Broadcast message to all connected clients
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(data));
                    }
                });
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    ws.on('close', () => console.log('Client disconnected'));
});
