export default function DeveloperCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3.5">
          <div className="h-14 w-14 rounded-full bg-slate-200 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-32 rounded-md bg-slate-200 animate-pulse" />
            <div className="h-3 w-20 rounded-md bg-slate-100 animate-pulse" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-8 rounded-lg bg-slate-100" />
          <div className="h-8 w-8 rounded-lg bg-slate-100" />
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-2 mb-4">
        <div className="h-3 w-4/5 rounded bg-slate-100" />
        <div className="h-3 w-3/5 rounded bg-slate-100" />
      </div>

      {/* Stats row */}
      <div className="mb-4 grid grid-cols-4 gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100">
        <div className="h-6 rounded bg-slate-200/80 animate-pulse" />
        <div className="h-6 rounded bg-slate-200/80 animate-pulse" />
        <div className="h-6 rounded bg-slate-200/80 animate-pulse" />
        <div className="h-6 rounded bg-slate-200/80 animate-pulse" />
      </div>

      {/* Heatmap skeleton */}
      <div className="h-28 rounded-xl bg-slate-50 p-3 mb-4 border border-slate-100 animate-pulse" />

      {/* Repos skeleton */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        <div className="h-20 rounded-xl bg-slate-50 border border-slate-100 animate-pulse" />
        <div className="h-20 rounded-xl bg-slate-50 border border-slate-100 animate-pulse" />
        <div className="h-20 rounded-xl bg-slate-50 border border-slate-100 animate-pulse" />
      </div>
    </div>
  );
}
