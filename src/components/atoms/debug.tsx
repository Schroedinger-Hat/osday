export function Debug({ children }: { children: any }) {
  return (
    <pre className="my-4 max-h-[500px] max-w-full overflow-x-auto rounded-sm border border-slate-200 bg-slate-100/50 p-4 font-mono text-xs tracking-tight text-slate-800">
      {JSON.stringify(children, null, 4)}
    </pre>
  )
}
