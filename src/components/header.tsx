export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  
  return (
    <header className="sticky top-0 z-20 bg-bg/95 border-b border-border backdrop-blur-md">
      <nav
        className="w-[min(100%-32px,1160px)] min-h-[72px] mx-auto flex items-center justify-between gap-5"
        aria-label="Menu principal"
      >
        <Link to="/" className="inline-flex items-center gap-2.5 font-extrabold">
          <span className="w-[38px] h-[38px] grid place-items-center rounded-full bg-primary text-white font-black">
            E
          </span>
          EcoScore Engine
        </Link>
 
     
 
        <div
          className={`
            ${open ? "flex" : "hidden"} flex-col items-stretch gap-1.5 absolute top-[72px] inset-x-4 p-3
            border border-border rounded-lg bg-surface shadow-[0_18px_48px_rgba(21,50,35,0.12)]
            md:static md:flex md:flex-row md:items-center md:gap-1.5 md:p-0 md:border-0 md:shadow-none md:bg-transparent
          `}
        >
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2.5 rounded-lg text-[0.95rem] font-bold ${
                  isActive ? "bg-surface-strong text-primary-dark" : "text-muted hover:bg-surface-strong hover:text-primary-dark"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}