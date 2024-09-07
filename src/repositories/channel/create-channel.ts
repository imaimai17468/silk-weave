"use server";

import { client } from "@/lib/hono";
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
    const response = await client.api.channel.$post({
      form: parsed.data,
    });

    if (!response.ok) {
      return {
        status: ActionStatus.Error,
        issue: `サーバーエラー: ${response.status}`,
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
