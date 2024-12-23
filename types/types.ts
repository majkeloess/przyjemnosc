import { z } from "zod";

export type MenuEnumType =
  | "przystawki"
  | "salatki"
  | "zupy"
  | "miesa"
  | "ryby"
  | "regionalne"
  | "dodatki"
  | "napoje";

export const MenuItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  created_at: z.date(),
  type: z.enum([
    "przystawki",
    "salatki",
    "zupy",
    "miesa",
    "ryby",
    "regionalne",
    "dodatki",
    "napoje",
  ]),
});

export type MenuItem = z.infer<typeof MenuItemSchema>;
