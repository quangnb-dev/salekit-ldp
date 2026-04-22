import { BuilderEditorProvider } from "@/modules/builder/editor";
import { BuilderPage } from "@/pages/builder";

export default function App() {
  return (
    <BuilderEditorProvider>
      <BuilderPage />
    </BuilderEditorProvider>
  );
}
