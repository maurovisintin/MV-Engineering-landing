import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   NOISE OVERLAY
   ═══════════════════════════════════════════ */
function NoiseOverlay() {
  return (
    <svg className="noise-overlay" xmlns="http://www.w3.org/2000/svg">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   MAGNETIC BUTTON
   ═══════════════════════════════════════════ */
function MagneticButton({ children, className = '', variant = 'primary', href, onClick }) {
  const Tag = href ? 'a' : 'button';
  const props = href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: href.startsWith('http') ? 'noopener noreferrer' : undefined } : { onClick };
  return (
    <Tag className={`btn-magnetic btn-${variant} ${className}`} {...props}>
      <span className="btn-bg" />
      <span className="btn-label">{children}</span>
    </Tag>
  );
}

/* ═══════════════════════════════════════════
   NAVBAR — "The Floating Island"
   ═══════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 flex items-center gap-8 transition-all duration-500 rounded-[2rem] ${
        scrolled
          ? 'bg-offwhite/60 backdrop-blur-xl border border-paper text-black shadow-lg'
          : 'bg-transparent text-offwhite'
      }`}
    >
      <span className="font-heading font-bold text-sm tracking-tight whitespace-nowrap">MV Engineering</span>
      <div className="hidden md:flex items-center gap-6">
        {[
          ['Work', 'features'],
          ['Philosophy', 'philosophy'],
          ['Process', 'protocol'],
        ].map(([label, id]) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="link-lift font-heading text-xs font-medium tracking-wide uppercase bg-transparent border-none cursor-pointer"
            style={{ color: 'inherit' }}
          >
            {label}
          </button>
        ))}
      </div>
      <MagneticButton variant="primary" href="mailto:visintin1.mauro@gmail.com" className="text-xs py-2 px-5">
        <span className="btn-label flex items-center gap-2">Get in Touch <ArrowRight size={14} /></span>
      </MagneticButton>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   HERO SECTION — "The Opening Shot"
   ═══════════════════════════════════════════ */
function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-line-1', { y: 60, opacity: 0, duration: 1, delay: 0.3 })
        .from('.hero-line-2', { y: 60, opacity: 0, duration: 1 }, '-=0.6')
        .from('.hero-sub', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
        .from('.hero-cta', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.hero-meta', { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.4');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-[100dvh] flex items-end overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1470723710355-95304d8aece4?w=1920&q=80')`,
        }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
        <div className="max-w-4xl">
          <h1 className="hero-line-1 font-heading font-bold text-offwhite text-3xl md:text-5xl lg:text-6xl tracking-tight leading-none mb-2">
            Engineering the
          </h1>
          <h1 className="hero-line-2 font-drama italic text-signal text-6xl md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tight mb-8">
            Intelligence.
          </h1>
          <p className="hero-sub font-heading text-paper/70 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
            AI-powered mobile craftsmanship — from startup co-founder to engineering leader. Building intelligent systems that scale from zero to millions.
          </p>
          <div className="hero-cta mb-12">
            <MagneticButton variant="primary" href="mailto:visintin1.mauro@gmail.com">
              <span className="btn-label flex items-center gap-2">Get in Touch <ArrowRight size={16} /></span>
            </MagneticButton>
          </div>
          <div className="flex flex-wrap gap-6 md:gap-10">
            {[
              ['8+ Years', 'React Native'],
              ['10+ Years', 'Engineering'],
              ['Co-Founder', 'Startup Builder'],
              ['AI / ML', 'Specialist'],
            ].map(([top, bottom]) => (
              <div key={top} className="hero-meta">
                <p className="font-mono text-signal text-xs">{top}</p>
                <p className="font-heading text-offwhite/60 text-xs">{bottom}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FEATURE CARD 1 — "Diagnostic Shuffler"
   AI-Native Mobile Engineering
   ═══════════════════════════════════════════ */
function DiagnosticShuffler() {
  const [cards, setCards] = useState([
    { id: 0, label: 'Neural Network Integration', detail: 'Custom ML models in production apps' },
    { id: 1, label: 'Computer Vision Pipeline', detail: 'Real-time image processing on-device' },
    { id: 2, label: 'LLM-Powered Features', detail: 'Intelligent conversational interfaces' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) => {
        const next = [...prev];
        next.unshift(next.pop());
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-offwhite border border-paper rounded-[2rem] p-6 md:p-8 shadow-sm h-full flex flex-col">
      <p className="font-mono text-signal text-xs mb-1 tracking-wider uppercase">01 — Diagnostics</p>
      <h3 className="font-heading font-bold text-lg md:text-xl mb-2 tracking-tight">AI-Native Engineering</h3>
      <p className="font-heading text-black/50 text-sm mb-6 leading-relaxed">From ML models to production apps — building intelligence at the edge.</p>
      <div className="relative flex-1 min-h-[180px]">
        {cards.map((card, i) => (
          <div
            key={card.id}
            className="absolute left-0 right-0 bg-white border border-paper rounded-2xl p-4 transition-all"
            style={{
              top: `${i * 12}px`,
              zIndex: cards.length - i,
              opacity: 1 - i * 0.2,
              transform: `scale(${1 - i * 0.04})`,
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <p className="font-heading font-semibold text-sm">{card.label}</p>
            <p className="font-heading text-black/40 text-xs mt-1">{card.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FEATURE CARD 2 — "Telemetry Typewriter"
   Zero-to-Market React Native
   ═══════════════════════════════════════════ */
function TelemetryTypewriter() {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);

  const messages = [
    '> Initializing React Native bridge...',
    '> Compiling TypeScript modules — 0 errors',
    '> Redux store hydrated — 42 reducers loaded',
    '> Running Maestro E2E suite — 128/128 passed',
    '> Bundle size: 2.4MB (gzip) — optimized',
    '> Deploying to App Store Connect...',
    '> 2.3M monthly active users — stable',
    '> Performance: 60fps — zero frame drops',
    '> CI/CD pipeline green — shipping to prod',
  ];

  useEffect(() => {
    const msg = messages[lineIndex % messages.length];
    if (charIndex < msg.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + msg[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 30 + Math.random() * 30);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev.slice(-5), msg]);
        setCurrentLine('');
        setCharIndex(0);
        setLineIndex((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [charIndex, lineIndex]);

  return (
    <div className="bg-offwhite border border-paper rounded-[2rem] p-6 md:p-8 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2 h-2 rounded-full bg-signal pulse-dot" />
        <p className="font-mono text-signal text-xs tracking-wider uppercase">Live Feed</p>
      </div>
      <p className="font-mono text-black/30 text-xs mb-1 tracking-wider uppercase">02 — Telemetry</p>
      <h3 className="font-heading font-bold text-lg md:text-xl mb-2 tracking-tight">Zero-to-Market Mobile</h3>
      <p className="font-heading text-black/50 text-sm mb-6 leading-relaxed">8+ years building cross-platform apps used by millions.</p>
      <div className="bg-black rounded-xl p-4 flex-1 min-h-[180px] overflow-hidden">
        {lines.map((line, i) => (
          <p key={i} className="font-mono text-paper/40 text-[11px] leading-relaxed">{line}</p>
        ))}
        <p className="font-mono text-paper text-[11px] leading-relaxed">
          {currentLine}
          <span className="cursor-blink text-signal">▌</span>
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FEATURE CARD 3 — "Cursor Protocol Scheduler"
   Engineering Leadership
   ═══════════════════════════════════════════ */
function CursorScheduler() {
  const [activeDay, setActiveDay] = useState(-1);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, visible: false });
  const [saved, setSaved] = useState(false);
  const [activeDays, setActiveDays] = useState([]);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const gridRef = useRef(null);

  useEffect(() => {
    const sequence = [1, 2, 3, 4, 5]; // Mon-Fri
    let step = 0;
    let timeout;

    const runStep = () => {
      if (step < sequence.length) {
        const dayIdx = sequence[step];
        setCursorPos({ x: dayIdx * 44 + 20, y: 20, visible: true });

        timeout = setTimeout(() => {
          setActiveDay(dayIdx);
          setActiveDays((prev) => [...prev, dayIdx]);
          step++;
          timeout = setTimeout(runStep, 400);
        }, 500);
      } else {
        setCursorPos({ x: 280, y: 70, visible: true });
        timeout = setTimeout(() => {
          setSaved(true);
          timeout = setTimeout(() => {
            setCursorPos({ x: 280, y: 70, visible: false });
            timeout = setTimeout(() => {
              setActiveDay(-1);
              setActiveDays([]);
              setSaved(false);
              step = 0;
              timeout = setTimeout(runStep, 1000);
            }, 2000);
          }, 800);
        }, 600);
      }
    };

    timeout = setTimeout(runStep, 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-offwhite border border-paper rounded-[2rem] p-6 md:p-8 shadow-sm h-full flex flex-col">
      <p className="font-mono text-signal text-xs mb-1 tracking-wider uppercase">03 — Protocol</p>
      <h3 className="font-heading font-bold text-lg md:text-xl mb-2 tracking-tight">Engineering Leadership</h3>
      <p className="font-heading text-black/50 text-sm mb-6 leading-relaxed">Scaling teams, roadmaps, and codebases at international fintechs.</p>
      <div ref={gridRef} className="relative flex-1 min-h-[180px]">
        {/* Animated cursor */}
        <svg
          className="absolute pointer-events-none z-20 transition-all duration-500"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            opacity: cursorPos.visible ? 1 : 0,
          }}
          width="20" height="20" viewBox="0 0 24 24"
        >
          <path d="M5 3l14 8-6 2-4 6z" fill="#E63B2E" stroke="#111" strokeWidth="1" />
        </svg>

        {/* Day grid */}
        <div className="flex gap-2 mb-4">
          {days.map((d, i) => (
            <div
              key={i}
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                activeDays.includes(i)
                  ? 'bg-signal text-offwhite scale-95'
                  : 'bg-paper text-black/40'
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Schedule labels */}
        <div className="space-y-2 mt-4">
          {['Sprint Planning', '1:1 Reviews', 'Arch Review', 'Team Retro'].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-signal/30" />
              <span className="font-heading text-black/50 text-xs">{item}</span>
            </div>
          ))}
        </div>

        {/* Save button */}
        <div className="absolute bottom-0 right-0">
          <div
            className={`px-4 py-2 rounded-xl font-mono text-xs transition-all duration-300 ${
              saved ? 'bg-signal text-offwhite scale-95' : 'bg-paper text-black/40'
            }`}
          >
            {saved ? '✓ Saved' : 'Save'}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FEATURES SECTION
   ═══════════════════════════════════════════ */
function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16">
        <p className="font-mono text-signal text-xs tracking-wider uppercase mb-3">Core Expertise</p>
        <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight">
          What I Build
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="feature-card"><DiagnosticShuffler /></div>
        <div className="feature-card"><TelemetryTypewriter /></div>
        <div className="feature-card"><CursorScheduler /></div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PHILOSOPHY — "The Manifesto"
   ═══════════════════════════════════════════ */
function Philosophy() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = sectionRef.current.querySelectorAll('.reveal-word');
      gsap.from(words, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 bg-black overflow-hidden"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517697471339-4aa32003c11a?w=1920&q=60')`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="font-mono text-signal text-xs tracking-wider uppercase mb-12">Philosophy</p>

        <div className="mb-16">
          <p className="font-heading text-paper/40 text-lg md:text-2xl leading-relaxed mb-8">
            {'Most engineers focus on: shipping features fast, chasing frameworks, optimizing for the short term.'.split(' ').map((word, i) => (
              <span key={i} className="reveal-word inline-block mr-[0.3em]">{word}</span>
            ))}
          </p>
        </div>

        <div>
          <h2 className="font-heading text-offwhite text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            {'I focus on:'.split(' ').map((word, i) => (
              <span key={i} className="reveal-word inline-block mr-[0.3em]">{word}</span>
            ))}
            <br />
            <span className="font-drama italic text-signal text-4xl md:text-6xl lg:text-7xl">
              {'building systems that think.'.split(' ').map((word, i) => (
                <span key={i} className="reveal-word inline-block mr-[0.3em]">{word}</span>
              ))}
            </span>
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            ['First-Principles', 'Every architecture decision traced back to the actual user problem.'],
            ['AI-Augmented', 'Machine learning integrated where it creates real value, not novelty.'],
            ['Ownership Mindset', 'From co-founding startups to managing teams — I build like I own it.'],
          ].map(([title, desc]) => (
            <div key={title} className="reveal-word">
              <h4 className="font-heading font-bold text-offwhite text-sm mb-2">{title}</h4>
              <p className="font-heading text-paper/30 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PROTOCOL — "Sticky Stacking Archive"
   ═══════════════════════════════════════════ */
function ProtocolCard({ index, title, description, children }) {
  return (
    <div className="protocol-card w-full min-h-screen flex items-center justify-center px-6 md:px-12">
      <div className="bg-offwhite border border-paper rounded-[3rem] p-8 md:p-16 max-w-5xl w-full shadow-xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-signal text-xs tracking-wider uppercase mb-4">
              Step {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="font-heading font-bold text-3xl md:text-4xl tracking-tight mb-4">{title}</h3>
            <p className="font-heading text-black/50 text-base leading-relaxed">{description}</p>
          </div>
          <div className="flex items-center justify-center">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* Rotating geometric motif */
function GeometricMotif() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.geo-rotate', { rotation: 360, duration: 20, repeat: -1, ease: 'none' });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="w-48 h-48 md:w-64 md:h-64 relative">
      <svg className="geo-rotate w-full h-full" viewBox="0 0 200 200">
        {[0, 30, 60, 90, 120, 150].map((angle) => (
          <ellipse
            key={angle}
            cx="100" cy="100" rx="80" ry="30"
            fill="none" stroke="#E63B2E" strokeWidth="0.5" opacity="0.6"
            transform={`rotate(${angle} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="4" fill="#E63B2E" />
      </svg>
    </div>
  );
}

/* Scanning laser line */
function ScanningGrid() {
  return (
    <div className="w-48 h-48 md:w-64 md:h-64 relative overflow-hidden rounded-2xl bg-paper">
      <svg className="w-full h-full" viewBox="0 0 200 200">
        {Array.from({ length: 10 }, (_, row) =>
          Array.from({ length: 10 }, (_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={20 + col * 18}
              cy={20 + row * 18}
              r="2"
              fill="#111111"
              opacity="0.15"
            />
          ))
        )}
      </svg>
      <div
        className="absolute top-0 left-0 w-12 h-full scan-line"
        style={{
          background: 'linear-gradient(90deg, transparent, #E63B2E40, transparent)',
        }}
      />
    </div>
  );
}

/* EKG Waveform */
function EKGWaveform() {
  const pathRef = useRef(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const length = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray = length;
    pathRef.current.style.strokeDashoffset = length;

    const ctx = gsap.context(() => {
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 3,
        repeat: -1,
        ease: 'none',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
      <svg viewBox="0 0 200 100" className="w-full">
        <path
          ref={pathRef}
          d="M0,50 L30,50 L40,50 L50,20 L55,80 L60,10 L65,70 L70,50 L100,50 L110,50 L120,20 L125,80 L130,10 L135,70 L140,50 L200,50"
          fill="none"
          stroke="#E63B2E"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function Protocol() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            endTrigger: cards[i + 1],
            end: 'top top',
            pin: true,
            pinSpacing: false,
            onUpdate: (self) => {
              const inner = card.querySelector('.bg-offwhite');
              if (inner) {
                gsap.set(inner, {
                  scale: 1 - self.progress * 0.1,
                  filter: `blur(${self.progress * 20}px)`,
                  opacity: 1 - self.progress * 0.5,
                });
              }
            },
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      title: 'Analyze',
      description: 'Deep-dive into the problem space. Understand the user, the constraints, the data landscape. Every great system starts with first-principles understanding — not assumptions.',
      visual: <GeometricMotif />,
    },
    {
      title: 'Architect',
      description: 'Design intelligent solutions that scale. From React Native architectures serving millions, to ML pipelines processing real-time data, to team structures that ship consistently.',
      visual: <ScanningGrid />,
    },
    {
      title: 'Ship',
      description: 'Deliver production-grade products. CI/CD, comprehensive testing, performance monitoring. A decade of shipping software that real people depend on, every single day.',
      visual: <EKGWaveform />,
    },
  ];

  return (
    <section id="protocol" ref={sectionRef} className="relative">
      <div className="sticky top-0 z-0 py-16 px-6 md:px-12 bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-signal text-xs tracking-wider uppercase mb-3">Process</p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight">How I Work</h2>
        </div>
      </div>
      {steps.map((step, i) => (
        <ProtocolCard key={i} index={i} title={step.title} description={step.description}>
          {step.visual}
        </ProtocolCard>
      ))}
    </section>
  );
}

/* ═══════════════════════════════════════════
   EXPERIENCE TIMELINE
   ═══════════════════════════════════════════ */
function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const roles = [
    { period: '2024 — Now', title: 'Freelance Engineer', company: 'MVP Software Solutions', desc: 'Designing and building web & mobile platforms for a diverse portfolio of clients.' },
    { period: '2023 — 2024', title: 'Engineering Manager', company: 'Chipper Cash', desc: 'Crafted roadmaps, coached team members, conducted architecture reviews — scaling mobile for millions of users across Africa.' },
    { period: '2021 — 2023', title: 'Senior Mobile Engineer', company: 'Chipper Cash', desc: 'Owned planning, tech debt, testing, observability, and all horizontal product features for the mobile platform.' },
    { period: '2020 — 2022', title: 'Co-Founder & Developer', company: 'Indaco', desc: 'Co-founded a live-stream shopping platform. Built cross-platform streaming from scratch.' },
    { period: '2019 — 2020', title: 'Senior Mobile Developer', company: 'Lykke', desc: 'Built a modern cryptocurrency exchange app from scratch with React Native for a European fintech.' },
    { period: '2017 — 2019', title: 'Senior Mobile Developer', company: 'Oreegano', desc: 'Developed a community recipes and smart nutritional advisor app using early React Native.' },
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <p className="font-mono text-signal text-xs tracking-wider uppercase mb-3">Track Record</p>
      <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight mb-16">Experience</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {roles.map((role, i) => (
          <div key={i} className="exp-card bg-offwhite border border-paper rounded-[2rem] p-6 md:p-8 hover:border-signal/30 transition-colors duration-300">
            <p className="font-mono text-signal text-xs mb-2">{role.period}</p>
            <h4 className="font-heading font-bold text-base md:text-lg tracking-tight">{role.title}</h4>
            <p className="font-heading text-black/40 text-sm mb-3">{role.company}</p>
            <p className="font-heading text-black/60 text-sm leading-relaxed">{role.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   GET STARTED / CTA
   ═══════════════════════════════════════════ */
function GetStarted() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center cta-content">
        <p className="font-mono text-signal text-xs tracking-wider uppercase mb-6">Ready?</p>
        <h2 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight mb-4">
          Let's build
        </h2>
        <h2 className="font-drama italic text-signal text-5xl md:text-7xl lg:text-8xl mb-8">
          something remarkable.
        </h2>
        <p className="font-heading text-black/50 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Whether you need a mobile app built from scratch, AI integration expertise, or engineering leadership — I'm ready to bring your vision to production.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton variant="primary" href="mailto:visintin1.mauro@gmail.com">
            <span className="btn-label flex items-center gap-2">Get in Touch <Mail size={16} /></span>
          </MagneticButton>
          <MagneticButton variant="outline" href="https://linkedin.com/in/mauro-visintin/">
            <span className="btn-label flex items-center gap-2">LinkedIn <ExternalLink size={14} /></span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-black text-offwhite rounded-t-[4rem] px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-heading font-bold text-xl tracking-tight mb-3">MV Engineering</h3>
            <p className="font-heading text-paper/40 text-sm leading-relaxed max-w-sm">
              AI-powered mobile craftsmanship. From startup co-founder to engineering leader — building intelligent systems that scale.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-paper/30 text-xs tracking-wider uppercase mb-4">Navigate</p>
            <div className="flex flex-col gap-2">
              {['Work', 'Philosophy', 'Process', 'Experience'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const id = item.toLowerCase();
                    const el = document.getElementById(id === 'work' ? 'features' : id === 'experience' ? 'features' : id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="link-lift font-heading text-paper/60 text-sm text-left bg-transparent border-none cursor-pointer w-fit"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <p className="font-mono text-paper/30 text-xs tracking-wider uppercase mb-4">Connect</p>
            <div className="flex flex-col gap-2">
              <a href="mailto:visintin1.mauro@gmail.com" className="link-lift font-heading text-paper/60 text-sm flex items-center gap-2">
                <Mail size={14} /> Email
              </a>
              <a href="https://linkedin.com/in/mauro-visintin/" target="_blank" rel="noopener noreferrer" className="link-lift font-heading text-paper/60 text-sm flex items-center gap-2">
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-paper/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-paper/20 text-xs">
            &copy; {new Date().getFullYear()} Mauro Visintin. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
            <span className="font-mono text-paper/30 text-xs">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <NoiseOverlay />
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Experience />
      <GetStarted />
      <Footer />
    </>
  );
}
