// cheat.jsx — restaurant/dineout suggestions
const { useState: useS_X } = React;

const RESTAURANTS = [
  { name: 'Misu', cuisine: 'Pan-Asian', dist: '1.2 km', cost: 850, badge: 'High Protein Pick',
    color: 'var(--peach)', rating: 4.6, hot: true, mood: 'High Protein Cheat' },
  { name: 'Burma Burma', cuisine: 'Burmese', dist: '2.8 km', cost: 1200, badge: 'Worth the Macros',
    color: 'var(--lavender)', rating: 4.7, mood: 'Comfort Food' },
  { name: 'Sly Granny', cuisine: 'Continental', dist: '0.6 km', cost: 1100, badge: 'Light Indulgence',
    color: 'var(--mint)', rating: 4.4, mood: 'Light Indulgence' },
  { name: 'Toit', cuisine: 'Pub Grub', dist: '3.4 km', cost: 1400, badge: null,
    color: 'var(--ochre)', rating: 4.5, mood: 'Full Send' },
  { name: 'Roast Pluckers', cuisine: 'Grill · Chicken', dist: '0.9 km', cost: 600, badge: 'High Protein Pick',
    color: 'var(--coral)', rating: 4.3, hot: true, mood: 'High Protein Cheat' },
  { name: 'Big Pitcher', cuisine: 'Brewpub', dist: '4.1 km', cost: 1800, badge: null,
    color: 'var(--pink)', rating: 4.2, mood: 'Full Send' },
];

const MOODS = ['All', 'Comfort Food', 'High Protein Cheat', 'Light Indulgence', 'Full Send'];

function Cheat() {
  const [mood, setMood] = useS_X('All');
  const list = mood === 'All' ? RESTAURANTS : RESTAURANTS.filter(r => r.mood === mood);

  return (
    <div className="page" style={{ padding: '8px 16px 0' }}>
      {/* Hero band */}
      <div style={{
        background: 'linear-gradient(135deg, var(--coral), var(--peach))',
        borderRadius: 24, padding: '20px 22px', position: 'relative', overflow: 'hidden',
        marginBottom: 14,
      }}>
        <div style={{
          position: 'absolute', right: -10, top: -20,
          fontSize: 110, opacity: 0.18,
        }}>😈</div>
        <div className="up" style={{ color: 'rgba(0,0,0,0.55)' }}>CHEAT MODE · ON</div>
        <h1 className="dl" style={{ fontSize: 32, margin: '6px 0 4px', maxWidth: 240, color: 'var(--ink)' }}>
          Cheat Day,<br/>No Judgment.
        </h1>
        <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.7)', maxWidth: 260 }}>
          You hit your protein 4 days running. Go enjoy something fried.
        </div>
      </div>

      {/* Mood filter */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none',
        padding: '4px 0 14px', margin: '0 -16px', paddingLeft: 16, paddingRight: 16 }}>
        {MOODS.map(m => {
          const on = m === mood;
          return (
            <button key={m} onClick={() => setMood(m)}
              className="cap no-sel" style={{
                padding: '8px 14px', borderRadius: 99,
                background: on ? 'var(--ink)' : 'var(--card)',
                color: on ? 'white' : 'var(--ink)',
                whiteSpace: 'nowrap', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}>{m}</button>
          );
        })}
      </div>

      {/* Restaurant cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {list.map((r, i) => <RestoCard key={r.name} r={r} i={i}/>)}
      </div>
      <div style={{ height: 24 }}/>
    </div>
  );
}

function RestoCard({ r, i }) {
  const [hover, setHover] = useS_X(false);
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: 18, overflow: 'hidden', background: 'var(--canvas)',
        border: '1px solid var(--hairline)', position: 'relative',
        transition: 'transform 280ms cubic-bezier(.2,.8,.2,1), box-shadow 280ms ease',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hover && r.hot ? '0 14px 30px rgba(255,107,90,0.25)' :
                   hover ? '0 12px 24px rgba(10,10,10,0.10)' : 'none',
      }}>
      {/* image area */}
      <div style={{
        height: 120, background: r.color, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle at ${30 + i*15}% ${40 + (i%2)*20}%, rgba(255,255,255,0.4), transparent 50%),
                            radial-gradient(circle at ${70 - i*10}% ${60}%, rgba(0,0,0,0.12), transparent 60%)`,
          transition: 'transform 600ms cubic-bezier(.2,.8,.2,1)',
          transform: hover ? 'scale(1.08)' : 'scale(1)',
        }}/>
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)',
          padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600,
        }}>
          ⭐ {r.rating}
        </div>
        {r.badge && (
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: 'var(--ink)', color: 'white',
            padding: '5px 10px', borderRadius: 99,
            fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
            whiteSpace: 'nowrap', maxWidth: 'calc(100% - 24px)',
          }}>
            {r.badge === 'High Protein Pick' ? '💪' : '✨'} {r.badge}
          </div>
        )}
        {/* placeholder label */}
        <div style={{
          position: 'absolute', bottom: 10, left: 12,
          fontSize: 32, fontFamily: 'var(--font-display)', fontWeight: 500,
          color: 'rgba(255,255,255,0.7)', letterSpacing: -1,
        }}>{r.name}</div>
      </div>
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="ts">{r.name}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2, whiteSpace: 'nowrap' }}>
              {r.cuisine} · {r.dist}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="cap" style={{ color: 'var(--muted)' }}>FOR TWO</div>
            <div className="ts" style={{ fontFeatureSettings: '"tnum"' }}>₹{r.cost}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button className="btn btn-primary" style={{ flex: 1, height: 40, fontSize: 13, whiteSpace: 'nowrap', padding: '0 14px' }}>
            Order on Swiggy
          </button>
          <button className="btn btn-secondary" style={{ width: 40, padding: 0 }}>
            <I.Pin size={16}/>
          </button>
        </div>
      </div>
    </div>
  );
}

window.Cheat = Cheat;
