export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const webhookURL = process.env.WEBHOOK_URL;
  const { content } = req.body;

  try {
    const discordRes = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (discordRes.ok) {
      return res.status(200).json({ message: "Gesendet" });
    } else {
      return res.status(500).json({ error: "Discord Fehler" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Serverfehler" });
  }
}
