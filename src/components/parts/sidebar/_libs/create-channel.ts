"use server";

import { ActionStatus } from "@/types/action-status";
import { type Channel, ChannelSchema } from "@/types/zod";
import { revalidatePath } from "next/cache";

export type FormState =
  | {
      status: ActionStatus.Success;
      fields?: Pick<Channel, "name">;
      message: string;
    }
  | {
      status: ActionStatus.Error;
      issue: string;
      fields?: Pick<Channel, "name">;
    }
  | {
      status: ActionStatus.Idle;
      fields?: Pick<Channel, "name">;
    };

export async function createChannel(_: FormState, data: Pick<Channel, "name">): Promise<FormState> {
  const name: FormDataEntryValue | null = data.name;

  const parsed = ChannelSchema.pick({ name: true }).safeParse({
    name,
  });

  if (!parsed.success) {
    return {
      status: ActionStatus.Error,
      issue: "入力されたデータの形式が不正です",
    };
  }

  try {
    const response = await fetch("http://localhost:3000/api/channel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    if (!response.ok) {
      return {
        status: ActionStatus.Error,
        issue: `サーバーエラー: ${response.statusText}`,
      };
    }
  } catch (error) {
    return {
      status: ActionStatus.Error,
      issue: `ネットワークエラー: ${error}`,
    };
  }

  revalidatePath("/");

  return {
    status: ActionStatus.Success,
    message: "Success!",
  };
}
