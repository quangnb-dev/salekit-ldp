import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import { usePageSettings } from "../hooks/usePageSettings";

export default function CustomCodeSettings() {
  const { settings, setSetting } = usePageSettings();

  const editorProps = {
    width: "100%",
    height: "160px",
    fontSize: 13,
    theme: "github",
    showPrintMargin: false,
    setOptions: {
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      tabSize: 2,
    },
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1 text-sm font-medium text-slate-700">Javascript</p>
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <AceEditor
            {...editorProps}
            mode="javascript"
            value={settings.javascriptCode}
            onChange={(value) => setSetting("javascriptCode", value)}
            placeholder="Javascript tùy chỉnh"
            name="custom-js-editor"
          />
        </div>
      </div>

      <div>
        <p className="mb-1 text-sm font-medium text-slate-700">CSS</p>
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <AceEditor
            {...editorProps}
            mode="css"
            value={settings.cssCode}
            onChange={(value) => setSetting("cssCode", value)}
            placeholder="CSS tùy chỉnh"
            name="custom-css-editor"
          />
        </div>
      </div>
    </div>
  );
}
