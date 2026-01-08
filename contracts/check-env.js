require("dotenv").config();

console.log("Checking Environment Variables...");
if (!process.env.RPC_URL) {
    console.error("❌ RPC_URL is MISSING or EMPTY");
} else {
    console.log(`✅ RPC_URL found: ${process.env.RPC_URL.substring(0, 15)}...`);
}

if (!process.env.PRIVATE_KEY) {
    console.error("❌ PRIVATE_KEY is MISSING or EMPTY");
} else {
    const key = process.env.PRIVATE_KEY;
    console.log(`✅ PRIVATE_KEY found. Length: ${key.length}`);
    if (!key.startsWith("0x")) {
        console.warn("⚠️ PRIVATE_KEY does not start with '0x'. This might cause issues with Hardhat.");
    }
}
