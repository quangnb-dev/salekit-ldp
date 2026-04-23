import type { LucideIcon } from "lucide-react";

export type SettingsItemId =
  | "grid"
  | "seo-social"
  | "conversion-code"
  | "custom-code"
  | "page-settings";

export type SettingsItem = {
  id: SettingsItemId;
  title: string;
  description: string;
  icon: LucideIcon;
};
