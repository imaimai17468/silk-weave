"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ActionStatus } from "@/types/action-status";
import { type Channel, ChannelSchema } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
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

  const channels = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "blueberry", label: "Blueberry" },
  ];

  return (
    <Form {...form}>
      <form ref={formRef} className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleFormAction)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                    >
                      {field.value
                        ? channels.find((channel) => channel.value === field.value)?.label
                        : "Select a channel"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-96 p-0">
                  <Command>
                    <CommandInput placeholder="Search channel..." />
                    <CommandList>
                      <CommandEmpty>No channel found.</CommandEmpty>
                      <CommandGroup>
                        {channels.map((channel) => (
                          <CommandItem
                            value={channel.label}
                            key={channel.value}
                            onSelect={() => {
                              form.setValue("name", channel.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                channel.value === field.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {channel.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
