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
import { zodResolver } from "@hookform/resolvers/zod";
import { ChannelSchema, type Channel } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "../../spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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

  const form = useForm<Pick<Channel, "name">>({
    resolver: zodResolver(ChannelSchema.pick({ name: true })),
    defaultValues: {
      ...state.fields,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleFormAction = (data: Pick<Channel, "name">) => {
    startTransition(() => {
      formAction(data);
    });
  };

  useEffect(() => {
    if (state.status === ActionStatus.Success) {
      setDialogOpen(false);
    }
  }, [state.status]);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleFormAction)}
      >
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
        {state.status === ActionStatus.Error && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.issue}</AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
};
