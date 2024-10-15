import { db } from "~/server/db";

export async function getClickupKeys(userId: string) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      configurationKeys: {
        select: {
          AuthorizationPkKey: true,
          listId: true,
        },
      },
    },
  });

  if (!user || !user.configurationKeys) {
    throw new Error("User or configuration keys not found");
  }

  return {
    AuthorizationPkKey: user.configurationKeys[0]?.AuthorizationPkKey,
    listId: user.configurationKeys[0]?.listId,
  };
}
