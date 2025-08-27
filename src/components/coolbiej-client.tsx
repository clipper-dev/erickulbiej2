"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { ButtonLoading } from "./shadcnPlus";
import { cn } from "@/lib/utils";
import { FieldsPermittedForUpdate } from "@/types/auth/User";
import * as SelectPrimitive from "@radix-ui/react-select"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function InputChange({
  className,
  onUpdate,
  value = "",
  isPending,
  ...props
}: React.ComponentProps<"input"> & {
  onUpdate: (
    value: string | number | string[],
    field: FieldsPermittedForUpdate
  ) => void;
  value: string | number | string[];
  isPending?: boolean;
}) {
  const [internalValue, setValue] = useState<string | number | string[]>(
    value ?? ""
  );
  return (
    <div className={cn("flex flex-row gap-4", className)}>
      <Input
        className={"w-full"}
        {...props}
        value={internalValue}
        onChange={(e) => setValue(e.target.value)}
      />
      <ButtonLoading
        className=""
        isPending={isPending}
        pendingText="Saving..."
        onClick={() =>
          onUpdate(internalValue, props.name as FieldsPermittedForUpdate)
        }
      >
        Update
      </ButtonLoading>
    </div>
  );
}

export function SelectChange({
  className,
  onUpdate,
  value = "",
  isPending,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root> & {
  onUpdate: (
    value: string | number | string[],
    field: FieldsPermittedForUpdate
  ) => void;
  value: string | number | string[];
  isPending?: boolean;
  className?: string;
}) {
  const [internalValue, setValue] = useState<string | number | string[]>(
    value ?? ""
  );
  return (
    <div className={cn("flex flex-row gap-4", className)}>
      <Select
        {...props}
        defaultValue={internalValue.toString()}
        onValueChange={setValue}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="City" />
        </SelectTrigger>
        <SelectContent>{props.children}</SelectContent>
      </Select>
      <ButtonLoading
        className=""
        isPending={isPending}
        pendingText="Saving..."
        onClick={() =>
          onUpdate(internalValue, props.name as FieldsPermittedForUpdate)
        }
      >
        Update
      </ButtonLoading>
    </div>
  );
}

export function PasswordChange({
  className,
  onUpdate,
  isPending,
  ...props
}: React.ComponentProps<"input"> & {
  onUpdate: (
    value: string | number | string[],
    field: FieldsPermittedForUpdate
  ) => void;
  value: string | number | string[];
  isPending?: boolean;
}) {
  const [internalValue, setValue] = useState<string | number | string[]>(
    ""
  );
  const [confirmValue, setConfirmValue] = useState<string | number | string[]>(
    ""
  );
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  return (
    <div className={cn("flex flex-row gap-4", className)}>
      <Input
        aria-invalid={!isPasswordMatch}
        className={"w-full"}
        {...props}
        value={internalValue}
        onChange={(e) => setValue(e.target.value)}
        type="password"
      />
      <Input
        aria-invalid={!isPasswordMatch}
        className={"w-full"}
        {...props}
        value={confirmValue}
        onChange={(e) => setConfirmValue(e.target.value)}
        type="password"
      />
      <ButtonLoading
        className=""
        isPending={isPending}
        pendingText="Saving..."
        onClick={() => {
          if (internalValue === confirmValue) {
            onUpdate(internalValue, props.name as FieldsPermittedForUpdate);
            setIsPasswordMatch(true);
          } else {
            setIsPasswordMatch(false);
          }
        }}
      >
        Update
      </ButtonLoading>
    </div>
  );
}
