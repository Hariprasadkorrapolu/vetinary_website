export default function Loading() {
  return (
    <div className="min-h-screen bg-white px-6 pt-32">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="h-8 w-52 animate-pulse rounded-full bg-slate-100" />
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-64 animate-pulse rounded-3xl bg-slate-100"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
