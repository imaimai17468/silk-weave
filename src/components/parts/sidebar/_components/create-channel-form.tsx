"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ActionStatus } from "@/types/action-status";
import { type Channel, ChannelSchema } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useTransition } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { Spinner } from "../../spinner";
import { createChannel } from "../_libs/create-channel";

export type CreateChannelFormProps = {
  setDialogOpen: (open: boolean) => void;
};

export const CreateChannelForm: React.FC<CreateChannelFormProps> = ({ setDialogOpen }) => {
  const { toast } = useToast();

  const [state, formAction] = useFormState(createChannel, {
    status: ActionStatus.Idle,
    fields: {
      name: "",
    },
  });

  const form = useForm<Pick<Channel, "name">>({
    resolver: zodResolver(ChannelSchema.pick({ name: true })),
    defaultValues: {
      ...state.fields,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const handleFormAction = (data: Pick<Channel, "name">) => {
    startTransition(() => {
      formAction(data);
    });
  };

  useEffect(() => {
    if (state.status === ActionStatus.Success) {
      toast({
        description: "チャンネルを作成しました",
      });
      setDialogOpen(false);
    } else if (state.status === ActionStatus.Error) {
      toast({
        title: "チャンネルを作成できませんでした",
        description: state.issue,
        variant: "destructive",
      });
    }
  }, [state.status]);

  return (
    <Form {...form}>
      <form ref={formRef} className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleFormAction)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
