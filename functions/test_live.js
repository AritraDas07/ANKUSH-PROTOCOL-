const axios = require('axios'); // You might need to install axios or use fetch in node 18+

async function testLive() {
    console.log("🧪 Testing AI Agent Server...");

    try {
        // Requires server to be running: node server.js
        const response = await fetch('http://localhost:4000/api/execute-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: "0.1",
                recipient: "0x1234567890123456789012345678901234567890"
            })
        });

        const data = await response.json();
        console.log("📬 Response:", data);

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

testLive();
