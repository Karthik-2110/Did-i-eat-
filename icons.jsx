// icons.jsx — minimal stroke icon set
const Icon = ({ d, size = 22, stroke = 'currentColor', fill = 'none', sw = 1.8, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {d ? <path d={d} /> : children}
  </svg>
);

const I = {
  Home:    (p) => <Icon {...p}><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></Icon>,
  Plate:   (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></Icon>,
  Cart:    (p) => <Icon {...p}><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/><path d="M3 4h2l2.4 11.2a2 2 0 002 1.6h7.6a2 2 0 002-1.5L20 8H6"/></Icon>,
  Flame:   (p) => <Icon {...p}><path d="M12 3c1 4 5 5 5 10a5 5 0 11-10 0c0-2 1-3 1-5 2 1 3 0 4-5z"/></Icon>,
  User:    (p) => <Icon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"/></Icon>,
  Plus:    (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>,
  Check:   (p) => <Icon {...p}><path d="M5 12l5 5L20 6"/></Icon>,
  Bell:    (p) => <Icon {...p}><path d="M6 16V11a6 6 0 0112 0v5l1 2H5z"/><path d="M10 21h4"/></Icon>,
  Arrow:   (p) => <Icon {...p}><path d="M5 12h14M13 5l7 7-7 7"/></Icon>,
  Back:    (p) => <Icon {...p}><path d="M19 12H5M11 19l-7-7 7-7"/></Icon>,
  Shuffle: (p) => <Icon {...p}><path d="M16 3h5v5"/><path d="M4 20l17-17"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/></Icon>,
  Sparkle: (p) => <Icon {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/></Icon>,
  Settings:(p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.6 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1A2 2 0 117 4.6l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></Icon>,
  Truck:   (p) => <Icon {...p}><path d="M2 7h11v9H2zM13 10h5l3 3v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></Icon>,
  Edit:    (p) => <Icon {...p}><path d="M14 4l6 6L8 22H2v-6z"/></Icon>,
  Refresh: (p) => <Icon {...p}><path d="M3 12a9 9 0 0115-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 01-15 6.7L3 16"/><path d="M3 21v-5h5"/></Icon>,
  Star:    (p) => <Icon {...p}><path d="M12 3l2.7 6.1 6.6.6-5 4.5 1.5 6.5L12 17l-5.8 3.6L7.7 14 2.7 9.7l6.6-.6z"/></Icon>,
  Pin:     (p) => <Icon {...p}><path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></Icon>,
  Clock:   (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>,
  Send:    (p) => <Icon {...p}><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></Icon>,
  Cash:    (p) => <Icon {...p}><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/></Icon>,
};

window.I = I;
