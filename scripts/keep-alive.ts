export default async function keepAlive(
  endpoints: Array<{ name: string; url: string }>,
  config: {
    notify: {
      telegram?: {
        botToken: string;
        chatId: string;
        successMsg?: string;
        failMsg?: string;
        sendErrorMsg?: boolean;
      };
    };
  },
) {
  let responses = await Promise.all(
    endpoints.map(async (endpoint) => {
      try {
        const response = await fetch(endpoint.url);
        if (!response.ok) {
          throw new Error(`Failed to reach ${endpoint.name}`);
        }
        return { name: endpoint.name, status: "success" };
      } catch (error: any) {
        return { name: endpoint.name, status: "fail", error: error.message };
      }
    }),
  );
  if (!config.notify.telegram) return;
  await Promise.all(
    responses.map(async (response) => {
      if (response.status === "fail") {
        const { botToken, chatId, failMsg, sendErrorMsg } =
          config.notify.telegram!;
        const message = failMsg || `Endpoint ${response.name} is down.`;
        const errorMessage = sendErrorMsg ? ` Error: ${response.error}` : "";
        await fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}${errorMessage}`,
        );
      } else if (response.status === "success") {
        const { botToken, chatId, successMsg } = config.notify.telegram!;
        const message = successMsg || `Endpoint ${response.name} is up.`;
        await fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`,
        );
      }
    }),
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  keepAlive(
    [
      { name: "Backend", url: process.env.PING_URL_BACKEND! },
      { name: "Supabase", url: process.env.PING_URL_SUPABASE! },
    ],
    {
      notify: {
        telegram: {
          botToken: process.env.TELEGRAM_BOT_TOKEN!,
          chatId: process.env.TELEGRAM_CHAT_ID!,
        },
      },
    },
  );
}
