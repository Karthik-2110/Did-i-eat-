// onboarding.jsx — conversational health profile setup
const { useState, useEffect, useRef } = React;

// Steps definition
const ONB_STEPS = [
  {
    q: "Hey! I'm your meal AI. What should I call you?",
    kind: "text",
    placeholder: "Your first name…",
    key: "name",
  },
  {
    q: (s) => `Nice to meet you, ${s.name || 'friend'}. What's your daily protein goal?`,
    kind: "chips",
    options: ["80g", "120g", "150g", "180g+"],
    key: "protein",
  },
  {
    q: "How do you eat?",
    kind: "chips",
    options: ["Vegetarian 🥗", "Eggetarian 🍳", "Non-veg 🍗", "Pescetarian 🐟"],
    key: "diet",
  },
  {
    q: "Anything your gut hates? (pick any)",
    kind: "multi",
    options: ["Lactose", "Gluten", "Raw alliums", "Spicy food", "Soy", "Nuts"],
    key: "sensitivities",
  },
  {
    q: "Weekly grocery budget?",
    kind: "chips",
    options: ["₹1,000", "₹1,500", "₹2,500", "₹4,000+"],
    key: "budget",
  },
  {
    q: "How much time do you actually have to cook on a weekday?",
    kind: "chips",
    options: ["10 min", "20 min", "30 min", "I order in 😅"],
    key: "cookTime",
  },
];

function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState([]); // {role, content, kind}
  const [input, setInput] = useState('');
  const [picks, setPicks] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [done, setDone] = useState(false);
  const scrollRef = useRef();

  const cur = ONB_STEPS[step];
  const progress = done ? 1 : step / ONB_STEPS.length;

  // push AI question
  useEffect(() => {
    if (done || step >= ONB_STEPS.length) return;
    setThinking(true);
    const t = setTimeout(() => {
      setThinking(false);
      const text = typeof cur.q === 'function' ? cur.q(answers) : cur.q;
      setHistory(h => [...h, { role: 'ai', content: text }]);
    }, 600);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, thinking]);

  const submit = (val, display) => {
    setHistory(h => [...h, { role: 'me', content: display ?? val }]);
    setAnswers(a => ({ ...a, [cur.key]: val }));
    setInput('');
    setPicks([]);
    if (step + 1 >= ONB_STEPS.length) {
      // Done — show cooking screen
      setTimeout(() => setDone(true), 700);
      setTimeout(() => onDone({ ...answers, [cur.key]: val }), 3200);
    } else {
      setTimeout(() => setStep(s => s + 1), 350);
    }
  };

  if (done) return <CookingScreen />;

  return (
    <div className="page" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--canvas)' }}>
      {/* progress + skip */}
      <div style={{ padding: '14px 20px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, height: 6, background: 'var(--strong)', borderRadius: 99 }}>
            <div style={{
              width: `${Math.max(8, progress * 100)}%`, height: '100%',
              background: 'var(--ink)', borderRadius: 99,
              transition: 'width 400ms cubic-bezier(.2,.8,.2,1)',
            }}/>
          </div>
          <button onClick={() => onDone(answers)} className="cap" style={{
            background: 'transparent', border: 'none', color: 'var(--muted)',
            cursor: 'pointer', padding: 4,
          }}>Skip</button>
        </div>
        <div className="cap" style={{ color: 'var(--muted)', marginTop: 8 }}>
          STEP {Math.min(step + 1, ONB_STEPS.length)} / {ONB_STEPS.length}
        </div>
      </div>

      {/* chat area */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '8px 20px 20px' }}>
        {history.map((m, i) => (
          <Bubble key={i} role={m.role}>{m.content}</Bubble>
        ))}
        {thinking && <Typing/>}
      </div>

      {/* input row */}
      <div style={{ padding: '12px 16px 20px', borderTop: '1px solid var(--hairline)', background: 'var(--soft)' }}>
        {cur && cur.kind === 'text' && (
          <form onSubmit={(e) => { e.preventDefault(); if (input.trim()) submit(input.trim()); }}
                style={{ display: 'flex', gap: 8 }}>
            <input
              autoFocus
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={cur.placeholder}
              style={{
                flex: 1, height: 44, borderRadius: 12, border: '1px solid var(--hairline-strong)',
                padding: '0 14px', fontFamily: 'var(--font-body)', fontSize: 15,
                background: 'white', outline: 'none',
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ width: 44, padding: 0 }}>
              <I.Send size={18} stroke="white"/>
            </button>
          </form>
        )}

        {cur && cur.kind === 'chips' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {cur.options.map(o => (
              <button key={o} onClick={() => submit(o)}
                className="cap" style={{
                  padding: '10px 16px', border: '1px solid var(--ink)',
                  borderRadius: 99, background: 'white', cursor: 'pointer',
                  fontFamily: 'var(--font-body)', fontSize: 14,
                }}>{o}</button>
            ))}
          </div>
        )}

        {cur && cur.kind === 'multi' && (
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
              {cur.options.map(o => {
                const on = picks.includes(o);
                return (
                  <button key={o} onClick={() =>
                    setPicks(p => on ? p.filter(x => x !== o) : [...p, o])
                  }
                  style={{
                    padding: '10px 14px',
                    border: `1px solid ${on ? 'var(--ink)' : 'var(--hairline-strong)'}`,
                    borderRadius: 99,
                    background: on ? 'var(--ink)' : 'white',
                    color: on ? 'white' : 'var(--ink)',
                    cursor: 'pointer', fontFamily: 'var(--font-body)',
                    fontSize: 13, fontWeight: 600,
                  }}>{on && '✓ '}{o}</button>
                );
              })}
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }}
              onClick={() => submit(picks, picks.length ? picks.join(', ') : 'None, my gut is iron')}>
              {picks.length ? `Continue · ${picks.length} selected` : 'None of these'}
              <I.Arrow size={16} stroke="white"/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Bubble({ role, children }) {
  if (role === 'ai') {
    return (
      <div className="anim-l" style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginTop: 14 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 16,
          background: 'var(--teal)', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14,
          flexShrink: 0,
        }}>D</div>
        <div style={{
          maxWidth: '78%',
          background: 'var(--card)',
          padding: '12px 16px',
          borderRadius: '18px 18px 18px 4px',
          fontSize: 15, lineHeight: 1.45, color: 'var(--ink)',
        }}>{children}</div>
      </div>
    );
  }
  return (
    <div className="anim-r" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
      <div style={{
        maxWidth: '78%',
        background: 'var(--ink)', color: 'white',
        padding: '12px 16px',
        borderRadius: '18px 18px 4px 18px',
        fontSize: 15, lineHeight: 1.45,
      }}>{children}</div>
    </div>
  );
}

function Typing() {
  return (
    <div className="anim-l" style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginTop: 14 }}>
      <div style={{
        width: 32, height: 32, borderRadius: 16, background: 'var(--teal)', color: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14,
      }}>D</div>
      <div style={{
        background: 'var(--card)', padding: '14px 16px',
        borderRadius: '18px 18px 18px 4px', display: 'flex', gap: 4,
      }}>
        {[0,1,2].map(i => (
          <span key={i} style={{
            width: 6, height: 6, borderRadius: 3, background: 'var(--muted)',
            animation: `pulseDot 1.2s ease-in-out infinite`,
            animationDelay: `${i * 150}ms`,
          }}/>
        ))}
      </div>
    </div>
  );
}

function CookingScreen() {
  const [phase, setPhase] = useState(0);
  const phases = [
    "Reading your goals…",
    "Cross-checking lactose tolerance…",
    "Building your week of meals…",
    "Mapping ingredients to Instamart…",
    "Your plan is being cooked 🍳",
  ];
  useEffect(() => {
    const t = setInterval(() => setPhase(p => Math.min(p + 1, phases.length - 1)), 550);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="page" style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 32,
      background: 'var(--canvas)',
    }}>
      <div style={{
        width: 120, height: 120, borderRadius: '50%',
        background: 'var(--ochre)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 32, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.6), transparent)',
          animation: 'spin 1.6s linear infinite',
        }}/>
        <div style={{
          width: 92, height: 92, borderRadius: '50%', background: 'var(--ochre)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48,
          position: 'relative', zIndex: 2,
        }}>🍳</div>
      </div>
      <div className="dm" style={{ fontSize: 32, textAlign: 'center', marginBottom: 16 }}>
        Cooking your plan
      </div>
      <div className="bm" style={{ color: 'var(--muted)', textAlign: 'center', minHeight: 48 }}>
        {phases[phase]}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

window.Onboarding = Onboarding;
