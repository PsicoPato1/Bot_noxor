const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log("🌌 CN × NEXOR ONLINE");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // comando teste
  if (message.content === "!ping") {
    message.reply("🌌 CN × NEXOR ONLINE!");
  }

  // MISSÃO (print enviado)
  if (message.attachments.size > 0) {
    const today = new Date().toISOString().split("T")[0];

    await db.collection("missions")
      .doc(today)
      .set({
        [message.author.id]: true
      }, { merge: true });

    message.reply("✅ Missão registrada no CN × NEXOR!");
  }
});

client.login(process.env.TOKEN);