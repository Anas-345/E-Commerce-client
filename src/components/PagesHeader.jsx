export default function PagesHeader({ header, content, border = "border-b" }) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 ${border}`}
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{header}</h1>
        <p className="text-sm text-muted-foreground">{content}</p>
      </div>
    </div>
  );
}
