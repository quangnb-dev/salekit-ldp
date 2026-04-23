import type { FC } from "react";
import { FieldRow } from "@/shared/ui/FieldRow";
import { Select } from "@/shared/ui/Input";
import { SwitchToggle } from "@/shared/ui/SwitchToggle";
import { usePageSettings } from "../hooks/usePageSettings";
import { PageSettingsBackgroundSection } from "./PageSettingsBackgroundSection";

export const FONT_OPTIONS = ["Roboto", "Inter", "Open Sans", "Montserrat"];
const DESKTOP_SIZE_OPTIONS = ["960px", "1024px", "1200px", "1280px", "1440px"];
const MOBILE_SIZE_OPTIONS = ["420px", "375px", "390px"];
const LANGUAGE_OPTIONS = ["Tiếng Việt", "English"];
const PAGE_TYPE_OPTIONS = ["Trang bán hàng", "Landing page", "Squeeze page"];
const EFFECT_OPTIONS = ["Không chọn", "Mờ dần", "Trượt lên"];

type SelectRowProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

const SelectRow: FC<SelectRowProps> = ({
  label,
  options,
  value,
  onChange,
}: SelectRowProps) => {
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
};

export const PageSettings: FC = () => {
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
        label="Kích thước máy tính"
        options={DESKTOP_SIZE_OPTIONS}
        value={settings.desktopSize}
        onChange={(value) => setSetting("desktopSize", value)}
      />
      <SelectRow
        label="Kích thước di động"
        options={MOBILE_SIZE_OPTIONS}
        value={settings.mobileSize}
        onChange={(value) => setSetting("mobileSize", value)}
      />

      <SwitchToggle
        label="Chỉ hiển thị trên di động"
        checked={settings.mobileOnly}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSetting("mobileOnly", event.target.checked)
        }
      />
      <SwitchToggle
        label="Yêu cầu đăng nhập"
        checked={settings.requireLogin}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSetting("requireLogin", event.target.checked)
        }
      />
      <SwitchToggle
        label="Captcha"
        hint
        checked={settings.captcha}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSetting("captcha", event.target.checked)
        }
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
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSetting("dynamicContent", event.target.checked)
        }
      />
    </div>
  );
};
