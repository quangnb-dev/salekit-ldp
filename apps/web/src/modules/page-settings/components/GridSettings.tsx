import ToggleRow from "@/shared/ui/ToggleRow";

export default function GridSettings() {
  return (
    <div className="space-y-3">
      <ToggleRow label="Hiển thị lưới trên canvas" defaultChecked />
      <ToggleRow label="Snap vào lưới" defaultChecked />
    </div>
  );
}
