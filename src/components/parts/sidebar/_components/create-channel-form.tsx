"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createChannel } from "../_libs/create-channel";
import { useFormState } from "react-dom";
import { ActionStatus } from "@/types/action-status";
import { useTransition, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChannelSchema } from "@/types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "../../spinner";

export type CreateChannelFormProps = {
  setDialogOpen: (open: boolean) => void;
};

export const CreateChannelForm: React.FC<CreateChannelFormProps> = ({
  setDialogOpen,
}) => {
  const [state, formAction] = useFormState(createChannel, {
    status: ActionStatus.Idle,
    fields: {
      name: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ChannelSchema>>({
    resolver: zodResolver(ChannelSchema),
    defaultValues: {
      ...state.fields,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === ActionStatus.Success) {
      setDialogOpen(false);
    }
  }, [state.status]);

  return (
    <Form {...form}>
      <form
        action={formAction}
        ref={formRef}
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(() => {
          if (formRef.current) {
            const formData = new FormData(formRef.current);
            console.log(formRef.current);
            console.log(formData);
            startTransition(() => {
              formAction(formData);
            });
          }
        })}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a channel" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="flex gap-2" disabled={isPending}>
          {isPending && <Spinner />}
          Create
        </Button>
      </form>
    </Form>
  );
};
