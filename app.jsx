// app.jsx — shell, bottom nav, page routing
const { useState: useS_A, useEffect: useE_A } = React;

function App() {
  const [page, setPage] = useS_A('dashboard');
  const [showOnb, setShowOnb] = useS_A(true);
  const [name, setName] = useS_A('Mira');
  const [cheat, setCheat] = useS_A(false);
  const [approved, setApproved] = useS_A(false);
  const [macros, setMacros] = useS_A({ p: 0, c: 0, f: 0 });

  // Animate macros in once
  useE_A(() => {
    const t = setTimeout(() => setMacros({ p: 72, c: 64, f: 51 }), 250);
    return () => clearTimeout(t);
  }, [page === 'dashboard']);

  // Auto-flip page color when cheat is on while on cheat page
  useE_A(() => {
    if (cheat && page === 'dashboard') {
      // do nothing, just visual subtle shift via tint overlay
    }
  }, [cheat, page]);

  const onOnbDone = (answers) => {
    if (answers && answers.name) setName(answers.name);
    setShowOnb(false);
    setPage('dashboard');
  };

  if (showOnb) {
    return (
      <PhoneShell cheat={cheat}>
        <Onboarding onDone={onOnbDone}/>
      </PhoneShell>
    );
  }

  let body;
  switch (page) {
    case 'dashboard': body = <Dashboard name={name} cheat={cheat} setCheat={setCheat}
      goPage={setPage} macros={macros} approved={approved} setApproved={setApproved}/>; break;
    case 'planner':   body = <Planner goPage={setPage}/>; break;
    case 'cart':      body = <Cart approved={approved}/>; break;
    case 'cheat':     body = <Cheat/>; break;
    case 'profile':   body = <Profile name={name} onRerunOnboarding={() => setShowOnb(true)}/>; break;
    default:          body = null;
  }

  return (
    <PhoneShell cheat={cheat}>
      <div className="screen" key={page}>
        {body}
      </div>
      <BottomNav active={page} onChange={setPage} cheat={cheat}/>
    </PhoneShell>
  );
}

function PhoneShell({ cheat, children }) {
  return (
    <IOSDevice width={402} height={874} dark={false}>
      {/* base canvas */}
      <div style={{
        position: 'absolute', inset: 0, background: 'var(--canvas)',
        overflow: 'hidden',
      }}>
        {cheat && <div className="cheat-tint"/>}
        {children}
      </div>
    </IOSDevice>
  );
}

function BottomNav({ active, onChange, cheat }) {
  const items = [
    { k: 'dashboard', l: 'Home',    Icon: I.Home },
    { k: 'planner',   l: 'Planner', Icon: I.Plate },
    { k: 'cart',      l: 'Cart',    Icon: I.Cart },
    { k: 'cheat',     l: 'Cheat',   Icon: I.Flame },
    { k: 'profile',   l: 'Profile', Icon: I.User },
  ];
  return (
    <div className={`bnav ${cheat ? 'cheat' : ''}`}>
      {items.map(it => (
        <button key={it.k} className={`bnav-item ${active === it.k ? 'active' : ''}`}
          onClick={() => onChange(it.k)}>
          <it.Icon size={22}/>
          <span className="bnav-label">{it.l}</span>
          <span className="bnav-dot"/>
        </button>
      ))}
    </div>
  );
}

window.App = App;
