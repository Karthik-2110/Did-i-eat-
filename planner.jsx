// planner.jsx — 7-day meal grid + day expansion
const { useState: useS_P } = React;

const WEEK = [
  { day: 'Mon', date: '12', filled: true,
    meals: {
      breakfast: { name: 'Oat bowl, banana, almond butter', p: 22, c: 65, f: 14, items: 4 },
      lunch:     { name: 'Grilled chicken rice bowl', p: 42, c: 72, f: 12, items: 5 },
      dinner:    { name: 'Paneer tikka & sautéed greens', p: 32, c: 18, f: 16, items: 4 },
    } },
  { day: 'Tue', date: '13', filled: true,
    meals: {
      breakfast: { name: 'Greek yogurt & berries', p: 18, c: 24, f: 6, items: 3 },
      lunch:     { name: 'Quinoa egg salad', p: 28, c: 45, f: 14, items: 5 },
      dinner:    { name: 'Salmon, broccoli, lemon rice', p: 36, c: 38, f: 18, items: 4 },
    } },
  { day: 'Wed', date: '14', filled: true, today: true,
    meals: {
      breakfast: { name: 'Veg omelette + sourdough', p: 24, c: 28, f: 16, items: 4 },
      lunch:     { name: 'Rajma rice + cucumber raita', p: 22, c: 80, f: 8, items: 6 },
      dinner:    { name: 'Tofu stir-fry, peanut sauce', p: 30, c: 30, f: 18, items: 5 },
    } },
  { day: 'Thu', date: '15', filled: true,
    meals: {
      breakfast: { name: 'Overnight oats, peanut butter', p: 20, c: 60, f: 18, items: 3 },
      lunch:     { name: 'Chicken caesar wrap', p: 38, c: 42, f: 16, items: 5 },
      dinner:    { name: 'Dal makhani, jeera rice', p: 18, c: 70, f: 12, items: 4 },
    } },
  { day: 'Fri', date: '16', filled: true,
    meals: {
      breakfast: { name: 'Protein smoothie + granola', p: 32, c: 48, f: 8, items: 4 },
      lunch:     { name: 'Sushi bowl, edamame', p: 26, c: 55, f: 14, items: 5 },
      dinner:    { name: 'Egg curry, cauliflower rice', p: 28, c: 22, f: 18, items: 4 },
    } },
  { day: 'Sat', date: '17', filled: false },
  { day: 'Sun', date: '18', filled: false },
];

const COLOR_BY_SLOT = {
  breakfast: 'var(--ochre)',
  lunch:     'var(--peach)',
  dinner:    'var(--lavender)',
};
const EMOJI_BY_SLOT = { breakfast: '🌅', lunch: '☀️', dinner: '🌙' };

function Planner({ goPage }) {
  const [open, setOpen] = useS_P(null);
  const [shuffleI, setShuffleI] = useS_P(null);

  if (open !== null && WEEK[open].filled) {
    return <DayDetail day={WEEK[open]} onBack={() => setOpen(null)}
      onShuffle={() => { setShuffleI(open); setTimeout(() => setShuffleI(null), 700); }}
      shuffling={shuffleI === open}/>;
  }

  return (
    <div className="page" style={{ padding: '8px 16px 0' }}>
      <div style={{ padding: '8px 4px 12px' }}>
        <div className="up" style={{ color: 'var(--muted)' }}>WEEK 20 · MAY 12–18</div>
        <h1 className="dl" style={{ fontSize: 38, margin: '6px 0 0' }}>Your week,<br/>plated.</h1>
      </div>

      <div style={{
        display: 'flex', gap: 8, padding: '12px 4px',
        overflowX: 'auto', scrollbarWidth: 'none',
      }}>
        {[
          { l: 'This week', a: true },
          { l: 'Next week' },
          { l: 'Templates' },
        ].map((t, i) => (
          <span key={i} className="cap" style={{
            padding: '8px 14px', borderRadius: 99,
            background: t.a ? 'var(--ink)' : 'var(--card)',
            color: t.a ? 'white' : 'var(--ink)', whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}>{t.l}</span>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
        {WEEK.map((d, i) => (
          <DayCard key={i} d={d} onClick={() => setOpen(i)}/>
        ))}
      </div>

      <div style={{ height: 24 }}/>
    </div>
  );
}

function DayCard({ d, onClick }) {
  if (!d.filled) {
    return (
      <button onClick={onClick} className="day-card no-sel" style={{
        background: 'transparent', border: '2px dashed var(--hairline-strong)',
        borderRadius: 16, padding: 18, textAlign: 'left', cursor: 'pointer',
        fontFamily: 'var(--font-body)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, textAlign: 'center', fontFamily: 'var(--font-display)',
            fontWeight: 500, color: 'var(--muted)',
          }}>
            <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' }}>{d.day}</div>
            <div style={{ fontSize: 24 }}>{d.date}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div className="ts" style={{ color: 'var(--muted)' }}>+ Let AI plan this</div>
            <div className="bs" style={{ color: 'var(--muted-soft)' }}>Tap to generate breakfast, lunch & dinner</div>
          </div>
          <div style={{ color: 'var(--muted)' }}><I.Sparkle size={20}/></div>
        </div>
      </button>
    );
  }
  const totalItems = Object.values(d.meals).reduce((s, m) => s + m.items, 0);
  return (
    <div onClick={onClick} className="day-card no-sel" style={{
      background: 'var(--canvas)', border: '1px solid var(--hairline)',
      borderRadius: 16, padding: 16, position: 'relative',
    }}>
      {d.today && <div style={{
        position: 'absolute', top: 14, right: 14,
        background: 'var(--ink)', color: 'white',
        fontSize: 10, fontWeight: 700, letterSpacing: 1,
        padding: '3px 8px', borderRadius: 99,
      }}>TODAY</div>}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{
          width: 44, textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 500,
        }}>
          <div className="up" style={{ color: 'var(--muted)' }}>{d.day}</div>
          <div style={{ fontSize: 28, lineHeight: 1 }}>{d.date}</div>
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {Object.entries(d.meals).map(([slot, m]) => (
            <div key={slot} style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 7, background: COLOR_BY_SLOT[slot],
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
                  flexShrink: 0,
                }}>{EMOJI_BY_SLOT[slot]}</div>
                <div style={{
                  flex: 1, minWidth: 0,
                  fontSize: 13, fontWeight: 600, color: 'var(--ink)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {m.name}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4, paddingLeft: 30 }}>
                <span className="macro-chip p">P{m.p}</span>
                <span className="macro-chip c">C{m.c}</span>
                <span className="macro-chip f">F{m.f}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px dashed var(--hairline)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="cap" style={{ color: 'var(--muted)', whiteSpace: 'nowrap' }}>
          🛒 {totalItems} Instamart items
        </span>
        <span className="cap" style={{ color: 'var(--ink)', whiteSpace: 'nowrap' }}>Open →</span>
      </div>
    </div>
  );
}

function DayDetail({ day, onBack, onShuffle, shuffling }) {
  return (
    <div className="page" style={{ padding: '8px 16px 0' }}>
      <button onClick={onBack} style={{
        background: 'transparent', border: 'none', display: 'flex', alignItems: 'center',
        gap: 6, color: 'var(--ink)', cursor: 'pointer', padding: '8px 4px', fontSize: 14, fontWeight: 600,
      }}>
        <I.Back size={18}/> Back
      </button>
      <div style={{ padding: '4px 4px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div className="up" style={{ color: 'var(--muted)' }}>{day.day} · MAY {day.date}</div>
          <h1 className="dl" style={{ fontSize: 36, margin: '4px 0 0' }}>3 meals,<br/>cooked smart.</h1>
        </div>
        <button onClick={onShuffle} className="btn btn-secondary"
          style={{ height: 40, padding: '0 14px', fontSize: 13 }}>
          <I.Shuffle size={14}
            style={{ transition: 'transform 600ms cubic-bezier(.2,.8,.2,1)',
              transform: shuffling ? 'rotate(540deg)' : 'rotate(0deg)' }}/>
          Re-roll
        </button>
      </div>

      <div className="card" style={{ padding: 16, marginBottom: 14 }}>
        <div className="up" style={{ color: 'var(--muted)', marginBottom: 10 }}>DAY MACROS</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stat label="Protein" val={Object.values(day.meals).reduce((s, m) => s + m.p, 0)} u="g" c="var(--pink)"/>
          <Stat label="Carbs"   val={Object.values(day.meals).reduce((s, m) => s + m.c, 0)} u="g" c="var(--ochre)"/>
          <Stat label="Fats"    val={Object.values(day.meals).reduce((s, m) => s + m.f, 0)} u="g" c="var(--lavender)"/>
          <Stat label="kCal"    val={1820} c="var(--ink)"/>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {Object.entries(day.meals).map(([slot, m], i) => (
          <MealCard key={slot} slot={slot} m={m} variant={['peach','lavender','ochre'][i]}/>
        ))}
      </div>
      <div style={{ height: 24 }}/>
    </div>
  );
}

function Stat({ label, val, u = '', c }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="dm" style={{ fontSize: 24, color: c, fontFeatureSettings: '"tnum"' }}>
        <Counter to={val}/>{u}
      </div>
      <div className="cap" style={{ color: 'var(--muted)', marginTop: 2 }}>{label}</div>
    </div>
  );
}

function MealCard({ slot, m, variant }) {
  const ingredients = [
    { n: 'Greek Yogurt', q: '200g', src: 'Instamart', emoji: '🥛' },
    { n: 'Mixed berries', q: '80g', src: 'Instamart', emoji: '🫐' },
    { n: 'Granola', q: '40g', src: 'Pantry', emoji: '🌾' },
    { n: 'Honey', q: '1 tsp', src: 'Pantry', emoji: '🍯' },
  ];
  return (
    <div className={`feature-card ${variant}`} style={{ padding: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="up" style={{ opacity: 0.7 }}>{EMOJI_BY_SLOT[slot]} {slot.toUpperCase()}</div>
          <div className="ds" style={{ fontSize: 22, marginTop: 6, maxWidth: 220 }}>{m.name}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
          <span className="macro-chip p">P {m.p}g</span>
          <span className="macro-chip c">C {m.c}g</span>
          <span className="macro-chip f">F {m.f}g</span>
        </div>
      </div>
      <div style={{
        marginTop: 14, background: 'rgba(255,255,255,0.6)', borderRadius: 12, padding: 12,
      }}>
        <div className="up" style={{ marginBottom: 8, opacity: 0.6 }}>INGREDIENTS · {m.items}</div>
        {ingredients.slice(0, m.items).map((it, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0',
            borderBottom: i < m.items - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
          }}>
            <span style={{ fontSize: 15 }}>{it.emoji}</span>
            <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{it.n}</span>
            <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.55)' }}>{it.q}</span>
            <span style={{
              fontSize: 10, padding: '2px 6px', borderRadius: 4,
              background: it.src === 'Instamart' ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.08)',
              color: it.src === 'Instamart' ? 'white' : 'var(--ink)',
              fontWeight: 600,
            }}>{it.src}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

window.Planner = Planner;
window.WEEK = WEEK;
