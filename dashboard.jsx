// dashboard.jsx — main hub screen
const { useState: useS_D, useEffect: useE_D, useRef: useR_D } = React;

// Animated number count
function Counter({ to, dur = 1200, prefix = '', suffix = '' }) {
  const [n, setN] = useS_D(0);
  useE_D(() => {
    let raf, start;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span style={{ fontFeatureSettings: '"tnum"' }}>{prefix}{n.toLocaleString('en-IN')}{suffix}</span>;
}

// Multi-ring chart (protein, carbs, fats)
function NutritionRings({ p, c, f, size = 156, showCenter = true }) {
  const radii = [size/2 - 12, size/2 - 28, size/2 - 44];
  const colors = ['var(--pink)', 'var(--ochre)', 'var(--lavender)'];
  const pct = [p, c, f];
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {radii.map((r, i) => {
          const C = 2 * Math.PI * r;
          return (
            <g key={i} transform={`rotate(-90 ${size/2} ${size/2})`}>
              <circle cx={size/2} cy={size/2} r={r} fill="none"
                strokeWidth={10} className="ring-track"/>
              <circle cx={size/2} cy={size/2} r={r} fill="none"
                strokeWidth={10}
                stroke={colors[i]}
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - pct[i] / 100)}
                style={{ transition: 'stroke-dashoffset 1400ms cubic-bezier(.2,.8,.2,1)' }}
              />
            </g>
          );
        })}
      </svg>
      {showCenter && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
          justifyContent: 'center', flexDirection: 'column',
        }}>
          <div className="dm" style={{ fontSize: 28 }}><Counter to={Math.round((p+c+f)/3)} suffix="%"/></div>
          <div className="cap" style={{ color: 'var(--muted)' }}>this week</div>
        </div>
      )}
    </div>
  );
}

function GreetingHeader({ name }) {
  return (
    <div style={{ padding: '8px 20px 4px' }}>
      <div className="cap" style={{ color: 'var(--muted)' }}>WED · 14 MAY · 9:41</div>
      <h1 className="dl no-sel" style={{ fontSize: 42, margin: '6px 0 2px', maxWidth: 320 }}>
        Hey {name},
      </h1>
      <h1 className="dl no-sel" style={{ fontSize: 42, margin: 0, color: 'var(--muted)', maxWidth: 320 }}>
        did you eat today<span className="pulse-q" style={{ color: 'var(--coral)', display: 'inline-block', marginLeft: 4 }}>?</span>
      </h1>
    </div>
  );
}

function NutritionCard({ macros }) {
  const overall = Math.round((macros.p + macros.c + macros.f) / 3);
  return (
    <div className="feature-card cream">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <div className="up" style={{ color: 'var(--muted)' }}>WEEKLY MACROS</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
            <div className="dm" style={{ fontSize: 32, fontFeatureSettings: '"tnum"' }}>
              <Counter to={overall}/>%
            </div>
            <div className="ds" style={{ fontSize: 18, color: 'var(--muted)' }}>this week</div>
          </div>
        </div>
        <span className="pill green">
          <span style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--success)' }}/>
          On track
        </span>
      </div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 10 }}>
        <NutritionRings p={macros.p} c={macros.c} f={macros.f} size={132} showCenter={false}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, minWidth: 0 }}>
          <MacroLine label="Protein" pct={macros.p} g={Math.round(macros.p * 1.2)} target={120} color="var(--pink)"/>
          <MacroLine label="Carbs"   pct={macros.c} g={Math.round(macros.c * 2.0)} target={200} color="var(--ochre)"/>
          <MacroLine label="Fats"    pct={macros.f} g={Math.round(macros.f * 0.65)} target={65} color="var(--lavender)"/>
        </div>
      </div>
    </div>
  );
}

function MacroLine({ label, pct, g, target, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, alignItems: 'baseline', gap: 4 }}>
        <span className="cap" style={{ whiteSpace: 'nowrap' }}>{label}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', fontFeatureSettings: '"tnum"', whiteSpace: 'nowrap' }}>
          <Counter to={g}/>g <span style={{ color: 'var(--muted-soft)' }}>/{target}</span>
        </span>
      </div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${pct}%`, background: color }}/>
      </div>
    </div>
  );
}

function CartPreviewCard({ onApprove, approved }) {
  const items = [
    { n: 'Greek Yogurt 400g', q: '×3', p: 270 },
    { n: 'Free-range Eggs', q: '×12', p: 168 },
    { n: 'Spinach 250g', q: '×2', p: 80 },
    { n: 'Whole oats 1kg', q: '×1', p: 220 },
    { n: 'Chicken breast 500g', q: '×2', p: 540 },
  ];
  const total = items.reduce((s, i) => s + i.p, 0);

  return (
    <div className="feature-card peach">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="up" style={{ opacity: 0.7 }}>THIS WEEK · INSTAMART</div>
          <div className="ds" style={{ fontSize: 22, marginTop: 6 }}>5 items · ₹<Counter to={total}/></div>
        </div>
        <span className="pill" style={{ background: 'rgba(0,0,0,0.85)', color: 'white' }}>
          {approved ? '✓ Approved' : 'Pending Approval'}
        </span>
      </div>

      <div style={{
        marginTop: 16, background: 'rgba(255,255,255,0.55)',
        borderRadius: 14, padding: 12,
      }}>
        {items.map((it, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '8px 4px',
            borderBottom: i < items.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
          }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8, background: 'var(--canvas)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
              }}>{['🥛','🥚','🥬','🌾','🍗'][i]}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{it.n}</div>
                <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.55)' }}>{it.q}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, fontFeatureSettings: '"tnum"' }}>₹{it.p}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 16 }}>
        <button onClick={onApprove}
          className="btn btn-primary press"
          style={{ flex: 1, height: 50, fontSize: 15, borderRadius: 14 }}
          disabled={approved}>
          {approved ? '✓ Order placed' : 'Looks Good, Order It 🛒'}
        </button>
        <span className="pill" style={{
          background: 'rgba(0,0,0,0.08)', color: 'var(--ink)', height: 50, padding: '0 14px',
          borderRadius: 14, fontSize: 12,
        }}>
          <I.Cash size={14} stroke="currentColor"/> COD
        </span>
      </div>
    </div>
  );
}

function StreakCard({ days }) {
  return (
    <div className="feature-card ochre" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{
        width: 56, height: 56, borderRadius: 16, background: 'rgba(0,0,0,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 32,
      }}>
        <span className="flame">🔥</span>
      </div>
      <div style={{ flex: 1 }}>
        <div className="up" style={{ opacity: 0.65 }}>CLEAN STREAK</div>
        <div className="dm" style={{ fontSize: 24, marginTop: 4 }}>
          <Counter to={days}/> days strong
        </div>
        <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.6)', marginTop: 2 }}>
          One more for your two-week badge.
        </div>
      </div>
    </div>
  );
}

function DeliveredScroll() {
  const past = [
    { d: '07 May', n: 6, total: 1180 },
    { d: '30 Apr', n: 5, total: 980 },
    { d: '23 Apr', n: 7, total: 1340 },
    { d: '16 Apr', n: 4, total: 720 },
  ];
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 20px', marginBottom: 10 }}>
        <div className="ds" style={{ fontSize: 20 }}>Delivered so far</div>
        <button style={{ background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: 13, cursor: 'pointer' }}>
          See all →
        </button>
      </div>
      <div className="scroll-x" style={{ padding: '0 20px' }}>
        {past.map((p, i) => (
          <div key={i} style={{
            width: 168, padding: 14, borderRadius: 16,
            background: 'var(--canvas)', border: '1px solid var(--hairline)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span className="cap" style={{ color: 'var(--muted)' }}>{p.d}</span>
              <span style={{
                fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 99,
                background: 'rgba(34,197,94,0.18)', color: '#15803d',
              }}>● Delivered</span>
            </div>
            <div className="dm" style={{ fontSize: 24 }}>{p.n} <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--muted)' }}>items</span></div>
            <div style={{ marginTop: 4, fontSize: 13, color: 'var(--body)', fontFeatureSettings: '"tnum"' }}>
              ₹{p.total}
            </div>
            <div style={{ marginTop: 10, display: 'flex', gap: 4 }}>
              {[...Array(p.n)].map((_, j) => (
                <div key={j} style={{
                  width: 14, height: 14, borderRadius: 4,
                  background: ['var(--peach)','var(--ochre)','var(--mint)','var(--lavender)','var(--card)'][j % 5],
                }}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheatToggleCard({ on, onToggle }) {
  return (
    <div className="card" style={{
      display: 'flex', alignItems: 'center', gap: 12,
      background: on ? 'var(--coral)' : 'var(--canvas)',
      color: on ? 'white' : 'var(--ink)',
      borderColor: on ? 'transparent' : 'var(--hairline)',
      transition: 'all 300ms ease',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 12,
        background: on ? 'rgba(255,255,255,0.2)' : 'var(--card)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
      }}>😈</div>
      <div style={{ flex: 1 }}>
        <div className="ts">Cheat Meal Mode</div>
        <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>
          {on ? "You've earned this 😈" : 'Unlock restaurant suggestions'}
        </div>
      </div>
      <div className={`tog ${on ? 'on' : ''}`} onClick={onToggle}/>
    </div>
  );
}

function Dashboard({ name, cheat, setCheat, goPage, macros, approved, setApproved }) {
  return (
    <div className="page">
      <GreetingHeader name={name}/>
      <div style={{ padding: '20px 16px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <NutritionCard macros={macros}/>
        <CartPreviewCard
          approved={approved}
          onApprove={() => { if (!approved) setApproved(true); }}/>
        <DeliveredScroll/>
        <div style={{ padding: '0 4px' }}>
          <StreakCard days={11}/>
        </div>
        <div style={{ padding: '0 4px' }}>
          <CheatToggleCard on={cheat} onToggle={() => {
            setCheat(!cheat);
            if (!cheat) setTimeout(() => goPage('cheat'), 300);
          }}/>
        </div>
      </div>
    </div>
  );
}

window.Dashboard = Dashboard;
window.Counter = Counter;
window.NutritionRings = NutritionRings;
