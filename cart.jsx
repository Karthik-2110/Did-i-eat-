// cart.jsx — weekly cart, schedule timeline, budget
const { useState: useS_C } = React;

const CART_BY_DAY = [
  { day: 'Mon · 12', delivery: '7:00 AM',
    items: [
      { n: 'Greek Yogurt 400g', q: 3, p: 270, k: '🥛', macro: { p: 22, c: 8, f: 3 } },
      { n: 'Free-range Eggs', q: 12, p: 168, k: '🥚', macro: { p: 78, c: 4, f: 60 } },
      { n: 'Spinach 250g', q: 2, p: 80, k: '🥬', macro: { p: 7, c: 8, f: 1 } },
    ]},
  { day: 'Wed · 14', delivery: '8:30 AM',
    items: [
      { n: 'Whole oats 1kg', q: 1, p: 220, k: '🌾', macro: { p: 130, c: 660, f: 70 } },
      { n: 'Chicken breast 500g', q: 2, p: 540, k: '🍗', macro: { p: 230, c: 0, f: 36 } },
    ]},
  { day: 'Fri · 16', delivery: '6:45 AM',
    items: [
      { n: 'Paneer 200g', q: 2, p: 180, k: '🧀', macro: { p: 36, c: 6, f: 30 } },
      { n: 'Brown rice 1kg', q: 1, p: 140, k: '🌾', macro: { p: 70, c: 720, f: 28 } },
    ]},
];

const STATUS_STEPS = ['Scheduled', 'Approval Pending', 'Ordered', 'Delivered'];

function Cart({ approved }) {
  const total = CART_BY_DAY.reduce((s, d) => s + d.items.reduce((ss, i) => ss + i.p, 0), 0);
  const budget = 1500;
  const status = approved ? 2 : 1; // index in STATUS_STEPS

  return (
    <div className="page" style={{ padding: '8px 16px 0' }}>
      <div style={{ padding: '8px 4px 16px' }}>
        <div className="up" style={{ color: 'var(--muted)' }}>WEEKLY CART · INSTAMART</div>
        <h1 className="dl" style={{ fontSize: 38, margin: '6px 0 0' }}>The list,<br/>broken down.</h1>
      </div>

      {/* Budget tracker */}
      <div className="feature-card cream" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div className="up" style={{ color: 'var(--muted)' }}>BUDGET</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>Resets Mon</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '6px 0 12px' }}>
          <div className="dm" style={{ fontSize: 32 }}>₹<Counter to={total}/></div>
          <div style={{ color: 'var(--muted)', fontSize: 14 }}>of ₹{budget}</div>
        </div>
        <div className="bar-track" style={{ height: 10 }}>
          <div className="bar-fill" style={{
            width: `${Math.min(100, (total/budget)*100)}%`,
            background: total/budget > 0.95 ? 'var(--coral)' : 'var(--success)',
          }}/>
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: 'var(--body)' }}>
          ₹<Counter to={budget - total}/> left — room for one cheat order.
        </div>
      </div>

      {/* Status stepper */}
      <div className="card" style={{ marginBottom: 14 }}>
        <div className="up" style={{ color: 'var(--muted)', marginBottom: 14 }}>ORDER STATUS</div>
        <Stepper current={status}/>
      </div>

      {/* Schedule timeline */}
      <div className="ds" style={{ fontSize: 20, marginBottom: 10, padding: '0 4px' }}>Delivery schedule</div>
      <div style={{ position: 'relative', paddingLeft: 24 }}>
        <div style={{
          position: 'absolute', left: 7, top: 8, bottom: 8, width: 2,
          background: 'linear-gradient(to bottom, var(--ochre), var(--peach), var(--lavender))',
          borderRadius: 1, opacity: 0.6,
        }}/>
        {CART_BY_DAY.map((d, i) => (
          <div key={i} style={{ position: 'relative', marginBottom: 16 }}>
            <div style={{
              position: 'absolute', left: -22, top: 14,
              width: 16, height: 16, borderRadius: 8,
              background: ['var(--ochre)','var(--peach)','var(--lavender)'][i],
              border: '3px solid var(--canvas)', boxShadow: '0 0 0 1px var(--hairline)',
            }}/>
            <DayCart d={d} variant={['ochre','peach','lavender'][i]}/>
          </div>
        ))}
      </div>

      {/* Total bar */}
      <div className="card" style={{
        marginTop: 6, marginBottom: 8, background: 'var(--ink)', color: 'white',
        borderColor: 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div className="up" style={{ opacity: 0.6 }}>WEEK TOTAL</div>
          <div className="dm" style={{ fontSize: 28, marginTop: 2 }}>₹<Counter to={total}/></div>
        </div>
        <button className="btn btn-primary" style={{
          background: 'white', color: 'var(--ink)', height: 44, padding: '0 18px',
        }}>
          Pay COD <I.Arrow size={16}/>
        </button>
      </div>
      <div style={{ height: 24 }}/>
    </div>
  );
}

function Stepper({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      {STATUS_STEPS.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={s}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: '0 0 auto', width: 64, textAlign: 'center' }}>
              <div style={{
                width: 28, height: 28, borderRadius: 14,
                background: done || active ? 'var(--ink)' : 'var(--strong)',
                color: done || active ? 'white' : 'var(--muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700,
                position: 'relative',
              }}>
                {done ? '✓' : i + 1}
                {active && <span style={{
                  position: 'absolute', inset: -4, borderRadius: 18,
                  border: '2px solid var(--ink)', opacity: 0.25,
                  animation: 'pulseDot 1.4s ease-in-out infinite',
                }}/>}
              </div>
              <span style={{
                fontSize: 10, fontWeight: 600,
                color: done || active ? 'var(--ink)' : 'var(--muted)',
                lineHeight: 1.2,
              }}>{s}</span>
            </div>
            {i < STATUS_STEPS.length - 1 && (
              <div style={{
                flex: 1, height: 2, marginTop: 13,
                background: i < current ? 'var(--ink)' : 'var(--strong)',
                transition: 'background 400ms ease',
              }}/>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function DayCart({ d, variant }) {
  const [openIdx, setOpenIdx] = useS_C(null);
  return (
    <div className={`feature-card ${variant}`} style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div>
          <div className="ts">{d.day}</div>
          <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2,
            display: 'flex', alignItems: 'center', gap: 4 }}>
            <I.Truck size={12}/> arrives {d.delivery}
          </div>
        </div>
        <div style={{
          fontSize: 13, fontWeight: 700, fontFeatureSettings: '"tnum"',
          background: 'rgba(255,255,255,0.6)', padding: '4px 10px', borderRadius: 99,
        }}>
          ₹{d.items.reduce((s, i) => s + i.p, 0)}
        </div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.55)', borderRadius: 12, padding: 6 }}>
        {d.items.map((it, i) => {
          const open = openIdx === i;
          return (
            <div key={i} style={{
              borderBottom: i < d.items.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
            }}>
              <div
                onMouseEnter={() => setOpenIdx(i)}
                onMouseLeave={() => setOpenIdx(o => o === i ? null : o)}
                onClick={() => setOpenIdx(o => o === i ? null : i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 8px',
                  cursor: 'pointer',
                  borderRadius: 6,
                  transition: 'background 150ms ease',
                  background: open ? 'rgba(0,0,0,0.04)' : 'transparent',
                }}>
                <span style={{ fontSize: 18 }}>{it.k}</span>
                <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{it.n}</span>
                <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.6)' }}>×{it.q}</span>
                <span style={{ fontSize: 13, fontWeight: 700, fontFeatureSettings: '"tnum"', minWidth: 44, textAlign: 'right' }}>₹{it.p}</span>
              </div>
              <div style={{
                overflow: 'hidden',
                maxHeight: open ? 60 : 0,
                transition: 'max-height 280ms cubic-bezier(.2,.8,.2,1), opacity 200ms ease',
                opacity: open ? 1 : 0,
              }}>
                <div style={{
                  display: 'flex', gap: 6, padding: '4px 8px 10px 38px',
                }}>
                  <span className="macro-chip p">P {it.macro.p}g</span>
                  <span className="macro-chip c">C {it.macro.c}g</span>
                  <span className="macro-chip f">F {it.macro.f}g</span>
                  <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.5)', alignSelf: 'center', marginLeft: 'auto' }}>
                    per pack
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

window.Cart = Cart;
