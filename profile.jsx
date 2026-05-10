// profile.jsx — settings + goals + achievements
const { useState: useS_R } = React;

const ACHIEVEMENTS = [
  { name: 'First Clean Week', emoji: '🥗', color: 'var(--mint)', earned: true, sub: 'Earned 02 May' },
  { name: 'Protein Streak', emoji: '💪', color: 'var(--pink)', earned: true, sub: '7 days · earned 09 May' },
  { name: 'Budget Boss', emoji: '💰', color: 'var(--ochre)', earned: true, sub: 'Under budget × 3 weeks' },
  { name: 'Iron Gut', emoji: '🛡️', color: 'var(--lavender)', earned: false, sub: '12/14 days' },
  { name: 'Cheat Curator', emoji: '😈', color: 'var(--coral)', earned: false, sub: '2/5 cheat days' },
  { name: 'Sourdough Sage', emoji: '🍞', color: 'var(--peach)', earned: false, sub: '4/10 home cooks' },
];

function Profile({ name, onRerunOnboarding }) {
  return (
    <div className="page" style={{ padding: '8px 16px 0' }}>
      {/* Header card */}
      <div className="feature-card teal" style={{ padding: 22, marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 22,
            background: 'var(--ochre)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 30, color: 'var(--ink)',
            border: '3px solid rgba(255,255,255,0.2)',
          }}>{name.charAt(0).toUpperCase()}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, opacity: 0.65, letterSpacing: 1 }}>MEMBER · LEVEL 4</div>
            <div className="dm" style={{ fontSize: 26, marginTop: 2 }}>{name}</div>
          </div>
          <button style={{
            background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 12,
            width: 40, height: 40, color: 'white', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <I.Edit size={16} stroke="white"/>
          </button>
        </div>
        <div style={{ display: 'flex', gap: 18, marginTop: 18 }}>
          <Mini label="Streak" val={11} suffix="d"/>
          <Mini label="Clean weeks" val={4}/>
          <Mini label="Saved" val={2840} prefix="₹"/>
        </div>
      </div>

      {/* Goals */}
      <div className="ds" style={{ fontSize: 20, marginBottom: 10, padding: '0 4px' }}>Your goals</div>
      <div className="feature-card cream" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div className="up" style={{ color: 'var(--muted)' }}>OVERALL PROGRESS</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
              <div className="dm" style={{ fontSize: 32, fontFeatureSettings: '"tnum"' }}>
                <Counter to={62}/>%
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
          <NutritionRings p={72} c={85} f={90} size={132} showCenter={false}/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, minWidth: 0 }}>
            <Goal label="Protein"  val="86"     target="120g"   pct={72} color="var(--pink)"/>
            <Goal label="Budget"   val="₹1,278" target="₹1,500" pct={85} color="var(--ochre)"/>
            <Goal label="Cook-time" val="18"    target="20 min" pct={90} color="var(--lavender)"/>
          </div>
        </div>
      </div>

      {/* Editable settings */}
      <div className="ds" style={{ fontSize: 20, marginBottom: 10, padding: '0 4px' }}>Health profile</div>
      <div className="card" style={{ padding: 0, marginBottom: 14 }}>
        <SettingRow label="Diet" val="Eggetarian"/>
        <SettingRow label="Sensitivities" val="Lactose, Raw alliums" wrap/>
        <SettingRow label="Cuisines" val="Indian, Mediterranean, Asian"/>
        <SettingRow label="Notifications" val="Daily 9 AM"/>
        <SettingRow label="Linked accounts" val="Instamart · Swiggy" last/>
      </div>

      {/* Re-run onboarding */}
      <button onClick={onRerunOnboarding} className="btn btn-secondary" style={{
        width: '100%', marginBottom: 18, height: 50, fontSize: 14,
      }}>
        <I.Refresh size={16}/> Re-run AI Onboarding
      </button>

      {/* Achievements */}
      <div className="ds" style={{ fontSize: 20, marginBottom: 10, padding: '0 4px' }}>
        Achievements <span style={{ color: 'var(--muted)', fontSize: 14 }}>· 3 of 6</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {ACHIEVEMENTS.map(a => <Badge key={a.name} a={a}/>)}
      </div>

      {/* Built-with-love sign-off */}
      <div style={{
        marginTop: 32, padding: '24px 16px 28px',
        textAlign: 'center', display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 8,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 12, fontWeight: 600, color: 'var(--muted)',
          letterSpacing: 0.2,
        }}>
          built with
          <span style={{
            display: 'inline-block',
            color: 'var(--pink)', fontSize: 14,
            animation: 'heartbeat 1.6s ease-in-out infinite',
          }}>♥</span>
          for people who forget to eat
        </div>
        <div style={{ fontSize: 11, color: 'var(--muted-soft)', fontWeight: 500 }}>
          Powered by Instamart · Swiggy · a little tough love
        </div>
      </div>

      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15%      { transform: scale(1.25); }
          30%      { transform: scale(1); }
          45%      { transform: scale(1.18); }
          60%      { transform: scale(1); }
        }
      `}</style>

      <div style={{ height: 24 }}/>
    </div>
  );
}

function Mini({ label, val, prefix = '', suffix = '' }) {
  return (
    <div style={{ flex: 1 }}>
      <div className="dm" style={{ fontSize: 22, color: 'white', fontFeatureSettings: '"tnum"' }}>
        {prefix}<Counter to={val}/>{suffix}
      </div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2,
        textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>{label}</div>
    </div>
  );
}

function Goal({ label, val, target, pct, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, alignItems: 'baseline', gap: 4 }}>
        <span className="cap" style={{ whiteSpace: 'nowrap' }}>
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 3,
            background: color, marginRight: 6, transform: 'translateY(-1px)' }}/>
          {label}
        </span>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', fontFeatureSettings: '"tnum"', whiteSpace: 'nowrap' }}>
          <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{val}</span> <span style={{ color: 'var(--muted-soft)' }}>/{target}</span>
        </span>
      </div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${pct}%`, background: color }}/>
      </div>
    </div>
  );
}

function SettingRow({ label, val, last, wrap }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 18px', borderBottom: last ? 'none' : '1px solid var(--hairline)',
      gap: 16,
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'flex-end' }}>
        <div style={{ fontSize: 14, fontWeight: 600, textAlign: 'right',
          whiteSpace: wrap ? 'normal' : 'nowrap' }}>{val}</div>
        <I.Arrow size={14} stroke="var(--muted)"/>
      </div>
    </div>
  );
}

function Badge({ a }) {
  return (
    <div style={{
      borderRadius: 18, padding: 16, position: 'relative', overflow: 'hidden',
      background: a.earned ? a.color : 'var(--card)',
      color: a.earned ? 'var(--ink)' : 'var(--muted)',
      opacity: a.earned ? 1 : 0.7,
      minHeight: 130, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      {a.earned && <div className="shimmer-overlay"/>}
      <div style={{
        width: 36, height: 36, borderRadius: 12,
        background: 'rgba(255,255,255,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
      }}>{a.emoji}</div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>{a.name}</div>
        <div style={{ fontSize: 10, marginTop: 4, opacity: 0.75 }}>{a.sub}</div>
      </div>
      {!a.earned && <div style={{
        position: 'absolute', top: 14, right: 14,
        fontSize: 9, fontWeight: 700, letterSpacing: 1,
        padding: '3px 7px', borderRadius: 99,
        background: 'rgba(0,0,0,0.08)', color: 'var(--muted)',
      }}>LOCKED</div>}
    </div>
  );
}

window.Profile = Profile;
