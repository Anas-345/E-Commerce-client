export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-background-base py-5 text-center text-sm text-text-tertiary">
      <div className="mx-auto px-4">
        &copy; {year}{" "}
        <span className="font-semibold text-text-primary">StoreApp</span>. All
        rights reserved.
      </div>
    </footer>
  );
}