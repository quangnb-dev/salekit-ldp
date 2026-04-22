import { BuilderEditorProvider } from "@/modules/builder/editor";
import BuilderHeader from "@/modules/builder/header/BuilderHeader";
import BuilderWorkspace from "@/modules/builder/workspace/BuilderWorkspace";

export default function BuilderPage() {
  return (
    <BuilderEditorProvider>
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <BuilderHeader />
        <BuilderWorkspace />
      </div>
    </BuilderEditorProvider>
  );
}
