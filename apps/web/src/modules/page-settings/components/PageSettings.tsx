import FieldRow from "@/shared/ui/FieldRow";
import { Select } from "@/shared/ui/Input";
import SwitchToggle from "@/shared/ui/SwitchToggle";
import { usePageSettings } from "../hooks/usePageSettings";
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
  value: string;
  onChange: (value: string) => void;
};

function SelectRow({ label, options, value, onChange }: SelectRowProps) {
  return (
    <FieldRow label={label}>
      <Select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </FieldRow>
  );
}

export default function PageSettings() {
  const { settings, setSetting } = usePageSettings();

  return (
    <div className="space-y-3">
      <SelectRow
        label="Font chữ"
        options={FONT_OPTIONS}
        value={settings.fontFamily}
        onChange={(value) => setSetting("fontFamily", value)}
      />

      <PageSettingsBackgroundSection />

      <SelectRow
        label="K/Thước Desktop"
        options={DESKTOP_SIZE_OPTIONS}
        value={settings.desktopSize}
        onChange={(value) => setSetting("desktopSize", value)}
      />
      <SelectRow
        label="K/Thước di động"
        options={MOBILE_SIZE_OPTIONS}
        value={settings.mobileSize}
        onChange={(value) => setSetting("mobileSize", value)}
      />

      <SwitchToggle
        label="Mobile only"
        checked={settings.mobileOnly}
        onChange={(event) => setSetting("mobileOnly", event.target.checked)}
      />
      <SwitchToggle
        label="Yêu cầu đăng nhập"
        checked={settings.requireLogin}
        onChange={(event) => setSetting("requireLogin", event.target.checked)}
      />
      <SwitchToggle
        label="Captcha"
        hint
        checked={settings.captcha}
        onChange={(event) => setSetting("captcha", event.target.checked)}
      />

      <SelectRow
        label="Ngôn ngữ"
        options={LANGUAGE_OPTIONS}
        value={settings.language}
        onChange={(value) => setSetting("language", value)}
      />
      <SelectRow
        label="Loại trang"
        options={PAGE_TYPE_OPTIONS}
        value={settings.pageType}
        onChange={(value) => setSetting("pageType", value)}
      />
      <SelectRow
        label="Hiệu ứng"
        options={EFFECT_OPTIONS}
        value={settings.effect}
        onChange={(value) => setSetting("effect", value)}
      />

      <SwitchToggle
        label="Nội dung động"
        hint
        checked={settings.dynamicContent}
        onChange={(event) => setSetting("dynamicContent", event.target.checked)}
      />
    </div>
  );
}
