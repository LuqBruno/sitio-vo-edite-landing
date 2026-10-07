const NAV = [
  { href: '#salao', label: 'O salão' },
  { href: '#para-quem', label: 'Para quem' },
  { href: '#lugar', label: 'O lugar' },
  { href: '#chegar', label: 'Como chegar' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-nanquim/15 bg-capim/85 backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-capim">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-4 sm:px-6">
        <a href="#inicio" className="display text-[1.55rem] font-extrabold no-underline">
          Sítio Vó Edite
        </a>
        <nav aria-label="Seções" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-[0.98rem] font-medium no-underline transition-colors duration-150 hover:bg-nanquim/8"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#pedido" className="btn-sinal ml-auto !min-h-11 !px-4 !text-[0.98rem] lg:ml-2">
          Pedir data
        </a>
      </div>
    </header>
  )
}
