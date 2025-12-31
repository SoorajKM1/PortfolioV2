import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, message } = body;

    // Basic validation
    if (!email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Prepare the Discord payload
    const discordPayload = {
      embeds: [
        {
          title: "🚀 New Portfolio Contact",
          color: 0x22d3ee, // Cyan color to match your site
          fields: [
            { name: "Sender Email", value: email, inline: true },
            { name: "Message", value: message }
          ],
          timestamp: new Date().toISOString(),
        }
      ]
    };

    //  Send to Discord
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordPayload),
      });
    }

    // Return success
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}