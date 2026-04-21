import { classNames } from "@/shared/lib/classNames";

export default function BuilderWorkspace() {
  return (
    <div className="flex-1 overflow-auto bg-slate-50 p-4">
      <div
        className={classNames(
          "mx-auto rounded-md border border-slate-200 bg-white bg-[radial-gradient(circle,#e2e8f0_1px,transparent_1px)] bg-size-[16px_16px] transition-[max-width] duration-200 max-w-full",
        )}
        style={{ minHeight: "calc(100vh - 56px - 48px)" }}
      >
        <div className="flex flex-col items-center justify-center px-6 py-32">
          <h1 className="text-center text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Sáng tạo Landing Page
            <br />
            không giới hạn
          </h1>
          <p className="mt-6 max-w-xl text-center text-base text-slate-500">
            Kéo thả, tinh chỉnh và xuất bản trang đích đẹp mắt chỉ trong vài
            phút.
            <br />
            Mọi công cụ đều nằm trong tầm tay bạn.
          </p>
          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              onClick={() => console.log("start design")}
              className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Bắt đầu thiết kế
            </button>
            <button
              type="button"
              onClick={() => console.log("view tutorial")}
              className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Xem hướng dẫn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
