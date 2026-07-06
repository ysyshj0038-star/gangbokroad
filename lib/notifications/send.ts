type PushMessage = {
  to: string;
  title: string;
  body: string;
  sound?: 'default';
};

type ExpoPushTicket = {
  status: 'ok' | 'error';
  message?: string;
};

export async function sendExpoPushNotifications(
  tokens: string[],
  title: string,
  body: string,
): Promise<{ sent: number; failed: number }> {
  if (tokens.length === 0) {
    return { sent: 0, failed: 0 };
  }

  const messages: PushMessage[] = tokens.map((token) => ({
    to: token,
    sound: 'default',
    title,
    body,
  }));

  const chunkSize = 100;
  let sent = 0;
  let failed = 0;

  for (let i = 0; i < messages.length; i += chunkSize) {
    const chunk = messages.slice(i, i + chunkSize);
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chunk),
    });

    if (!response.ok) {
      failed += chunk.length;
      continue;
    }

    const result = (await response.json()) as { data?: ExpoPushTicket[] };
    const tickets = result.data ?? [];

    for (const ticket of tickets) {
      if (ticket.status === 'ok') {
        sent += 1;
      } else {
        failed += 1;
      }
    }
  }

  return { sent, failed };
}
