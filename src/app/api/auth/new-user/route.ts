import { type WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { db } from "~/server/db";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  try {
    if (!evt.data.id) return new Response("No id provided");
    switch (evt.type) {
      case "user.deleted":
        await db.user.delete({
          where: {
            id: evt.data.id,
          },
        });
        break;
      case "user.created":
        await db.user.create({
          data: {
            id: evt.data.id,
            name: `${evt.data.first_name} ${evt.data.last_name}`,
            email: evt.data.email_addresses[0]?.email_address,
          },
        });
        break;
      case "user.updated":
        await db.user.update({
          where: {
            id: evt.data.id,
          },
          data: {
            email: evt.data.email_addresses[0]?.email_address,
          },
        });
      default:
    }
  } catch (error) {
    console.error("Error handling event:", error);
    return Response.json(
      { success: false, eventType: evt.type },
      { status: 500 }
    );
  }

  return new Response("", { status: 200 });
}
