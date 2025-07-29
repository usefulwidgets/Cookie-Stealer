export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

    const discordResponse = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: message })
    });

    if (!discordResponse.ok) {
      const text = await discordResponse.text();
      console.error("Discord error:", text);
      return res.status(500).json({ error: "Failed to send to Discord" });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
