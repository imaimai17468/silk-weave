"use server";

import { revalidatePath } from "next/cache";
import { ChannelSchema } from "@/types";
import { ActionStatus } from "@/types/action-status";

export type FormState =
  | {
      status: ActionStatus.Success;
      fields?: Record<string, string>;
      message: string;
    }
  | {
      status: ActionStatus.Error;
      issues: string;
      fields?: Record<string, string>;
    }
  | {
      status: ActionStatus.Idle;
      fields?: Record<string, string>;
    };

export async function createChannel(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  console.log(formData);
  const name: FormDataEntryValue | null = formData.get("name");

  const parsed = ChannelSchema.pick({ name: true }).safeParse({
    name,
  });

  if (!parsed.success) {
    return {
      status: ActionStatus.Error,
      issues: "入力されたデータの形式が不正です",
    };
  }

  await fetch("http://localhost:3000/api/channel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });

  revalidatePath("/");

  return {
    status: ActionStatus.Success,
    message: "Success!",
  };
}
