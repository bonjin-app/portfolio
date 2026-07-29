import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Camera,
  Code2,
  Mail,
  Menu,
  MessageCircle,
  X,
} from 'lucide-react';
import { services, skills, works } from './data';

const navItems = [
  ['Home', '/'],
  ['About Me', '/about'],
  ['Services', '/services'],
  ['Works', '/works'],
  ['Contact', '/contact'],
];

const RouteContext = createContext('/');

function getHashPath() {
  return window.location.hash.replace(/^#/, '') || '/';
}

function Router({ children }) {
  const [path, setPath] = useState(getHashPath);

  useEffect(() => {
    const handleHashChange = () => setPath(getHashPath());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return <RouteContext.Provider value={path}>{children}</RouteContext.Provider>;
}

function useLocation() {
  return { pathname: useContext(RouteContext) };
}

function Link({ to, children, ...props }) {
  return (
    <a href={`#${to}`} {...props}>
      {children}
    </a>
  );
}

function NavLink({ to, end = false, className, children }) {
  const { pathname } = useLocation();
  const isActive = end ? pathname === to : pathname.startsWith(to);

  return (
    <Link
      to={to}
      aria-current={isActive ? 'page' : undefined}
      className={
        typeof className === 'function' ? className({ isActive }) : className
      }
    >
      {children}
    </Link>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white text-ink">
      <div
        id="site-menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`grid overflow-hidden bg-ink text-white transition-[grid-template-rows] duration-500 ease-out ${
          menuOpen
            ? 'visible grid-rows-[1fr]'
            : 'invisible grid-rows-[0fr] pointer-events-none'
        }`}
      >
        <div className="min-h-0">
          <div className="page-container grid gap-12 py-10 md:grid-cols-[160px_1fr_280px] md:py-14">
            <nav aria-label="Main menu">
              <ul className="space-y-2">
                {navItems.map(([label, path]) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      end={path === '/'}
                      className={({ isActive }) =>
                        `inline-block py-1 font-heading text-xl text-white decoration-1 underline-offset-4 transition-opacity hover:opacity-100 ${
                          isActive ? 'underline opacity-100' : 'opacity-65'
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden items-start gap-4 pt-1 text-white/60 md:flex">
              <MessageCircle className="mt-1 size-5 shrink-0 text-white" />
              <p className="max-w-sm text-lg leading-relaxed">
                작은 아이디어도 편하게 이야기해 주세요.
                <br />
                <a
                  href="https://open.kakao.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white underline decoration-white/40 underline-offset-4"
                >
                  Kakao Talk
                </a>
              </p>
            </div>

            <div className="hidden md:block">
              <p className="mb-3 font-heading text-xl text-white">Hire us</p>
              <p className="mb-3 leading-relaxed text-white/60">
                함께 만들고 싶은 서비스가 있다면 이메일을 보내주세요.
              </p>
              <a
                href="mailto:bonjin.app@gmail.com"
                className="text-white underline decoration-white/40 underline-offset-4"
              >
                bonjin.app@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <header className="page-container flex items-center justify-between pb-8 pt-9 md:pb-12 md:pt-12">
        <Link
          to="/"
          className="font-heading text-2xl font-medium tracking-tight md:text-[1.7rem]"
        >
          Bonjin Portfolio<span className="text-signal">.</span>
        </Link>
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          onClick={() => setMenuOpen((open) => !open)}
          className="grid size-11 place-items-center transition-transform hover:scale-105"
        >
          {menuOpen ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </header>

      <main>{children}</main>

      <footer className="page-container mt-12 border-t border-black/10 py-10 md:mt-20 md:flex md:items-center md:justify-between md:py-14">
        <div>
          <p className="mb-1 text-sm">
            © {new Date().getFullYear()} Bonjin. All rights reserved.
          </p>
          <p className="text-sm text-muted">Designed and built by Bonjin.</p>
        </div>
        <div className="mt-6 flex gap-2 md:mt-0">
          <SocialLink href="https://github.com/bonjin-app" label="GitHub">
            <Code2 className="size-4" />
          </SocialLink>
          <SocialLink href="https://gigas-blog.tistory.com" label="Blog">
            <ArrowUpRight className="size-4" />
          </SocialLink>
          <SocialLink href="mailto:bonjin.app@gmail.com" label="Email">
            <Mail className="size-4" />
          </SocialLink>
        </div>
      </footer>
    </div>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      aria-label={label}
      className="grid size-11 place-items-center rounded-full bg-soft transition-colors hover:bg-ink hover:text-white"
    >
      {children}
    </a>
  );
}

function PageHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-12 max-w-2xl animate-rise md:mb-16">
      {eyebrow && (
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-signal">
          {eyebrow}
        </p>
      )}
      <h1 className="font-heading text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
        {title}
      </h1>
      {description && (
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          {description}
        </p>
      )}
    </div>
  );
}

function PortfolioGrid({ compact = false }) {
  const [filter, setFilter] = useState('All');
  const filteredWorks = useMemo(
    () => works.filter((work) => filter === 'All' || work.type === filter),
    [filter],
  );

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-5 md:justify-end">
        {['All', 'Web', 'App'].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`filter-link ${filter === item ? 'active' : ''}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredWorks.slice(0, compact ? 3 : undefined).map((work, index) => (
          <WorkCard key={work.slug} work={work} index={index} />
        ))}
      </div>
    </>
  );
}

function WorkCard({ work, index = 0 }) {
  return (
    <Link
      to={`/works/${work.slug}`}
      className="work-card group animate-rise overflow-hidden bg-soft"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <img
        src={work.image}
        alt={`${work.name} project`}
        className="aspect-[4/3] h-full min-h-72 w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-ink/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute inset-0 grid translate-y-4 place-content-center text-center text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <strong className="font-heading text-2xl font-medium">{work.name}</strong>
        <span className="mt-2 text-xs uppercase tracking-[0.28em]">
          {work.type}
        </span>
      </span>
    </Link>
  );
}

function ServicesGrid({ columns = 4 }) {
  return (
    <div
      className={`grid gap-x-10 gap-y-12 sm:grid-cols-2 ${
        columns === 4 ? 'lg:grid-cols-4' : ''
      }`}
    >
      {services.map(({ title, description, items, icon: Icon }) => (
        <article key={title}>
          <Icon className="mb-6 size-10 stroke-[1.4]" aria-hidden="true" />
          <h2 className="mb-3 font-heading text-lg font-semibold">{title}</h2>
          <p className="mb-5 leading-relaxed text-muted">{description}</p>
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-4 text-sm">
                <span className="h-px w-3 bg-ink" />
                {item}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section className="page-container pb-20 pt-8 md:pb-28 md:pt-16">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="animate-rise">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-signal">
              Web & App Development
            </p>
            <h1 className="max-w-4xl font-heading text-5xl font-medium leading-[1.04] tracking-[-0.045em] sm:text-6xl md:text-8xl">
              Ideas, built
              <br />
              with care.
            </h1>
          </div>
          <div className="animate-rise lg:pb-2" style={{ animationDelay: '120ms' }}>
            <p className="max-w-md text-lg leading-relaxed text-muted">
              Bonjin은 작은 아이디어를 오래 쓰이는 웹과 앱으로 만듭니다.
              명확한 설계, 섬세한 디자인, 단단한 기술을 한 흐름으로 연결합니다.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-bold uppercase tracking-widest"
            >
              Start a project <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-space bg-mist">
        <div className="page-container">
          <div className="mb-12 items-end justify-between md:flex">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-signal">
                Selected work
              </p>
              <h2 className="font-heading text-3xl font-medium tracking-tight md:text-5xl">
                What we’ve made
              </h2>
            </div>
          </div>
          <PortfolioGrid />
        </div>
      </section>

      <section className="section-space page-container">
        <div className="mb-14 max-w-xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-signal">
            Capabilities
          </p>
          <h2 className="font-heading text-3xl font-medium tracking-tight md:text-5xl">
            Useful, thoughtful,
            <br />
            and made to last.
          </h2>
        </div>
        <ServicesGrid />
      </section>

      <section className="section-space bg-ink text-white">
        <div className="page-container grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <img
            src="/images/bonjin/logo_transparent.png"
            alt="Bonjin"
            className="mx-auto aspect-square w-full max-w-xs rounded-full object-cover"
          />
          <blockquote>
            <p className="font-heading text-3xl font-medium leading-snug md:text-5xl">
              “평생 공부할 것인가?”
            </p>
            <footer className="mt-6 text-sm uppercase tracking-[0.2em] text-white/55">
              Gigas · Bonjin Team
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="page-container section-space">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-signal">
            Technology used
          </p>
        </div>
        <div className="grid grid-cols-3 items-center gap-6 opacity-60 sm:grid-cols-6">
          {['adobe', 'apple', 'google', 'netflix', 'nike', 'uber'].map(
            (brand) => (
              <img
                key={brand}
                src={`/images/logo-${brand}.png`}
                alt={brand}
                className="mx-auto max-h-10 w-auto object-contain grayscale"
              />
            ),
          )}
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <section className="page-container section-space pt-8">
      <PageHeading
        eyebrow="About"
        title="We solve problems through design and code."
        description="웹과 앱을 만들고, 더 나은 방법을 발견할 때까지 적극적으로 문제를 풀어갑니다."
      />
      <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
        <div className="overflow-hidden bg-soft">
          <img
            src="/images/man-profile-512x512.png"
            alt="Bonjin developer profile"
            className="aspect-[4/3] w-full object-cover object-top"
          />
        </div>
        <div>
          <h2 className="mb-8 font-heading text-2xl font-medium">Skills</h2>
          <ul className="space-y-6">
            {skills.map(([skill, progress]) => (
              <li key={skill}>
                <div className="mb-2 flex justify-between text-sm font-semibold">
                  <span>{skill}</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1.5 bg-soft">
                  <div
                    className="h-full bg-ink"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ServicesPage() {
  return (
    <section className="page-container section-space pt-8">
      <PageHeading
        eyebrow="Services"
        title="From a rough idea to a polished product."
        description="다양한 기술을 목적에 맞게 선택해, 쓰기 편하고 운영하기 좋은 서비스를 만듭니다."
      />
      <div className="border-t border-black/10 pt-14">
        <ServicesGrid columns={2} />
      </div>
    </section>
  );
}

function WorksPage() {
  return (
    <section className="page-container section-space pt-8">
      <PageHeading
        eyebrow="Works"
        title="A selection of web and app projects."
        description="아이디어를 실제 서비스로 연결하며 쌓아온 Bonjin의 작업입니다."
      />
      <PortfolioGrid />
    </section>
  );
}

function WorkDetailPage({ slug }) {
  const work = works.find((item) => item.slug === slug);

  if (!work) {
    return <NotFoundPage />;
  }

  const moreWorks = works.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <section className="page-container section-space pt-8">
      <Link
        to="/works"
        className="mb-10 inline-flex items-center gap-2 text-sm font-semibold"
      >
        <ArrowLeft className="size-4" /> Back to works
      </Link>
      <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr]">
        <img
          src={work.image}
          alt={`${work.name} project`}
          className="aspect-[4/3] w-full bg-soft object-cover"
        />
        <aside className="lg:sticky lg:top-10 lg:self-start">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-signal">
            {work.type} project
          </p>
          <h1 className="font-heading text-4xl font-medium tracking-tight">
            {work.name}
          </h1>
          <p className="mt-6 leading-relaxed text-muted">{work.description}</p>
          <h2 className="mb-4 mt-10 font-heading text-lg font-semibold">
            What we did
          </h2>
          <ul className="space-y-3">
            {work.technologies.map((technology) => (
              <li key={technology} className="flex items-center gap-4 text-sm">
                <span className="h-px w-3 bg-ink" />
                {technology}
              </li>
            ))}
          </ul>
          <a
            href={work.site}
            target="_blank"
            rel="noreferrer"
            className="button-outline mt-10"
          >
            Visit website <ArrowUpRight className="size-4" />
          </a>
        </aside>
      </div>

      <div className="mt-24 border-t border-black/10 pt-14">
        <h2 className="mb-10 font-heading text-3xl font-medium">More works</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {moreWorks.map((item, index) => (
            <WorkCard key={item.slug} work={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = encodeURIComponent(formData.get('subject'));
    const body = encodeURIComponent(
      `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`,
    );

    setSent(true);
    window.location.href = `mailto:bonjin.app@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <section className="page-container section-space pt-8">
      <PageHeading
        eyebrow="Contact"
        title="Let’s make something useful together."
        description="프로젝트에 대한 간단한 이야기만 들려주세요. 다음 단계를 함께 정리해 드립니다."
      />
      <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr]">
        <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
          <label className="form-field">
            <span>Name</span>
            <input name="name" type="text" required />
          </label>
          <label className="form-field">
            <span>Email</span>
            <input name="email" type="email" required />
          </label>
          <label className="form-field sm:col-span-2">
            <span>Subject</span>
            <input name="subject" type="text" required />
          </label>
          <label className="form-field sm:col-span-2">
            <span>Message</span>
            <textarea name="message" rows="7" required />
          </label>
          <div className="sm:col-span-2">
            <button type="submit" className="button-outline">
              Send message <Mail className="size-4" />
            </button>
            {sent && (
              <p className="mt-4 text-sm text-muted">
                이메일 앱이 열립니다. 작성된 내용을 확인한 뒤 전송해 주세요.
              </p>
            )}
          </div>
        </form>

        <aside className="space-y-8 lg:pl-10">
          <ContactItem label="Blog">
            <a
              href="https://gigas-blog.tistory.com"
              target="_blank"
              rel="noreferrer"
            >
              gigas-blog.tistory.com
            </a>
          </ContactItem>
          <ContactItem label="Phone">+82 10 5054 5654</ContactItem>
          <ContactItem label="Email">
            <a href="mailto:bonjin.app@gmail.com">bonjin.app@gmail.com</a>
          </ContactItem>
          <div className="flex gap-2 pt-4">
            <SocialLink href="https://github.com/bonjin-app" label="GitHub">
              <Code2 className="size-4" />
            </SocialLink>
            <SocialLink href="https://www.instagram.com" label="Instagram">
              <Camera className="size-4" />
            </SocialLink>
          </div>
        </aside>
      </div>
    </section>
  );
}

function ContactItem({ label, children }) {
  return (
    <div>
      <p className="mb-2 font-heading text-sm font-semibold">{label}</p>
      <div className="text-lg text-muted">{children}</div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <section className="page-container section-space pt-8 text-center">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-signal">
        404
      </p>
      <h1 className="font-heading text-5xl font-medium">Page not found.</h1>
      <Link to="/" className="button-outline mt-10">
        Back home <ArrowLeft className="size-4" />
      </Link>
    </section>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const { pathname } = useLocation();
  let page;

  if (pathname === '/') {
    page = <HomePage />;
  } else if (pathname === '/about') {
    page = <AboutPage />;
  } else if (pathname === '/services') {
    page = <ServicesPage />;
  } else if (pathname === '/works') {
    page = <WorksPage />;
  } else if (pathname.startsWith('/works/')) {
    page = <WorkDetailPage slug={pathname.slice('/works/'.length)} />;
  } else if (pathname === '/contact') {
    page = <ContactPage />;
  } else {
    page = <NotFoundPage />;
  }

  return (
    <Layout>
      <ScrollToTop />
      {page}
    </Layout>
  );
}
