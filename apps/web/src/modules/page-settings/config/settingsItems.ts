import { BadgePercent, Braces, Grid2x2, Search, Settings2 } from "lucide-react";
import type { SettingsItem } from "../types/settings";

export const SETTINGS_ITEMS: SettingsItem[] = [
  {
    id: "grid",
    title: "Bật/Tắt lưới",
    description: "Điều chỉnh hiển thị lưới khi thiết kế trang.",
    icon: Grid2x2,
  },
  {
    id: "seo-social",
    title: "SEO & Social",
    description: "Cấu hình metadata cho công cụ tìm kiếm và mạng xã hội.",
    icon: Search,
  },
  {
    id: "conversion-code",
    title: "Mã chuyển đổi",
    description: "Thêm mã theo dõi chuyển đổi cho chiến dịch quảng cáo.",
    icon: BadgePercent,
  },
  {
    id: "custom-code",
    title: "Javascript/css",
    description: "Tiêm Javascript hoặc CSS tùy chỉnh theo nhu cầu.",
    icon: Braces,
  },
  {
    id: "page-settings",
    title: "Cài đặt trang",
    description: "Thiết lập cơ bản cho trang đích.",
    icon: Settings2,
  },
];
