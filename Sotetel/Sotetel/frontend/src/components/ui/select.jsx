// src/components/ui/select.jsx
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import clsx from "clsx";

export const Select = SelectPrimitive.Root;
export const SelectTrigger = ({ className, children, ...props }) => (
  <SelectPrimitive.Trigger
    className={clsx(
      "inline-flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 text-gray-500 ml-2" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);

export const SelectValue = SelectPrimitive.Value;

export const SelectContent = ({ className, ...props }) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={clsx(
        "rounded-md border border-gray-300 bg-white shadow-lg p-1",
        className
      )}
      {...props}
    />
  </SelectPrimitive.Portal>
);

export const SelectItem = ({ children, className, ...props }) => (
  <SelectPrimitive.Item
    className={clsx(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className="absolute right-2 inline-flex items-center">
      <Check className="h-4 w-4" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
);
