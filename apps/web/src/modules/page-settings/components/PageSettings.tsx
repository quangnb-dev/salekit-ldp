import FieldRow from "@/shared/ui/FieldRow";
import { Select } from "@/shared/ui/Input";
import SwitchToggle from "@/shared/ui/SwitchToggle";
import PageSettingsBackgroundSection from "./PageSettingsBackgroundSection";

const FONT_OPTIONS = ["Roboto", "Inter", "Open Sans", "Montserrat"];
const DESKTOP_SIZE_OPTIONS = ["960px", "1024px", "1200px", "1280px", "1440px"];
const MOBILE_SIZE_OPTIONS = ["420px", "375px", "390px"];
const LANGUAGE_OPTIONS = ["Tiếng Việt", "English"];
const PAGE_TYPE_OPTIONS = ["Sale page", "Landing page", "Squeeze page"];
const EFFECT_OPTIONS = ["Không chọn", "Fade in", "Slide up"];

type SelectRowProps = {
  label: string;
  options: string[];
};

function SelectRow({ label, options }: SelectRowProps) {
  return (
    <FieldRow label={label}>
      <Select>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </Select>
    </FieldRow>
  );
}

export default function PageSettings() {
  return (
    <div className="space-y-3">
      <SelectRow label="Font chữ" options={FONT_OPTIONS} />

      <PageSettingsBackgroundSection />

      <SelectRow label="K/Thước Desktop" options={DESKTOP_SIZE_OPTIONS} />
      <SelectRow label="K/Thước di động" options={MOBILE_SIZE_OPTIONS} />

      <SwitchToggle label="Mobile only" />
      <SwitchToggle label="Yêu cầu đăng nhập" />
      <SwitchToggle label="Captcha" hint />

      <SelectRow label="Ngôn ngữ" options={LANGUAGE_OPTIONS} />
      <SelectRow label="Loại trang" options={PAGE_TYPE_OPTIONS} />
      <SelectRow label="Hiệu ứng" options={EFFECT_OPTIONS} />

      <SwitchToggle label="Nội dung động" hint />
    </div>
  );
}
