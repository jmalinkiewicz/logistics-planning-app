export default function Control({
  keyName,
  label,
}: {
  keyName: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <kbd className="px-2 py-0.5 text-[10px] font-semibold bg-background/80 border border-border rounded shadow-sm">
        {keyName}
      </kbd>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
