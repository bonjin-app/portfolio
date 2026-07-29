import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ArrowLeft,
  Code2,
  Feather,
  Globe2,
  Image,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  ShieldCheck,
} from 'lucide-react';
import { skills, works } from './data';

const routeContext = createContext('/');

const navItems = [
  ['Home', '/'],
  ['About Me', '/about'],
  ['Services', '/services'],
  ['Works', '/works'],
  ['Contact', '/contact'],
];

const services = [
  {
    title: 'Security',
    content: 'Strict security system.',
    items: [
      'Per User Permissions',
      'Communication encryption',
      'Personal information security',
    ],
    icon: ShieldCheck,
  },
  {
    title: 'Mobile Applications',
    content: 'Mobile convenience features.',
    items: ['Simple operation'],
    icon: MonitorSmartphone,
  },
  {
    title: 'UX & UI Design',
    content: 'Neat design.',
    items: ['Easy to see UI UX', 'Preferred design'],
    icon: Image,
  },
  {
    title: 'Light',
    content: 'Fast and light.',
    items: ['Smooth movement'],
    icon: Feather,
  },
];

function getRoute() {
  return window.location.hash.replace(/^#/, '') || '/';
}

function Router({ children }) {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <routeContext.Provider value={route}>{children}</routeContext.Provider>
  );
}

function useRoute() {
  return useContext(routeContext);
}

function Link({ to, children, ...props }) {
  return (
    <a href={`#${to}`} {...props}>
      {children}
    </a>
  );
}

function ScrollToTop() {
  const route = useRoute();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [route]);

  return null;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const route = useRoute();

  useEffect(() => {
    setMenuOpen(false);
  }, [route]);

  return (
    <>
      <div
        id="main-navbar"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`grid overflow-hidden bg-ink text-white transition-[grid-template-rows] duration-300 ${
          menuOpen
            ? 'visible grid-rows-[1fr]'
            : 'invisible grid-rows-[0fr] pointer-events-none'
        }`}
      >
        <div className="min-h-0">
          <div className="site-container grid gap-10 py-8 md:grid-cols-12 md:py-14">
            <nav className="md:col-span-2" aria-label="Main menu">
              <ul className="space-y-0">
                {navItems.map(([label, path]) => {
                  const active =
                    path === '/' ? route === '/' : route.startsWith(path);
                  return (
                    <li key={path} className="text-xl">
                      <Link
                        to={path}
                        aria-current={active ? 'page' : undefined}
                        className={`inline-block py-1.5 text-white ${
                          active ? 'underline' : ''
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="hidden md:col-span-6 md:flex md:gap-4">
              <MessageCircle className="mt-2 size-5 shrink-0" />
              <p className="text-white/60">
                <em>
                  Team Bonjin.
                  <br />
                  <a
                    href="https://open.kakao.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/70 hover:text-white"
                  >
                    Kakao Talk
                  </a>
                </em>
              </p>
            </div>

            <div className="hidden md:col-span-4 md:block">
              <h2 className="mb-2 font-heading text-xl">Hire Me</h2>
              <p className="text-white/60">
                Contact by email.
                <br />
                <a
                  href="mailto:bonjin.app@gmail.com"
                  className="text-white/70 hover:text-white"
                >
                  bonjin.app@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <header className="site-container flex items-start justify-between pt-[50px]">
        <Link to="/" className="font-heading text-[1.7rem] text-ink">
          Bonjin Portfolio.
        </Link>
        <button
          type="button"
          className={`burger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-controls="main-navbar"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          <span />
        </button>
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="site-container pb-16 pt-2 sm:flex sm:items-start sm:justify-between">
      <div>
        <p className="mb-1 text-sm">
          © {new Date().getFullYear()} Copyright Bonjin. All Rights Reserved
        </p>
        <p className="text-sm text-[#777]">
          Designed by{' '}
          <a
            href="https://github.com/bonjin-app"
            target="_blank"
            rel="noreferrer"
            className="text-ink"
          >
            Bonjin
          </a>
        </p>
      </div>
      <div className="mt-6 flex gap-1 sm:mt-0">
        <SocialLink href="https://github.com/bonjin-app" label="GitHub">
          <Code2 />
        </SocialLink>
        <SocialLink href="https://gigas-blog.tistory.com" label="Blog">
          <Globe2 />
        </SocialLink>
        <SocialLink href="mailto:bonjin.app@gmail.com" label="Email">
          <Mail />
        </SocialLink>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      aria-label={label}
      className="grid size-[50px] place-items-center rounded-full bg-[#f8f9fa] text-ink"
    >
      <span className="[&>svg]:size-4">{children}</span>
    </a>
  );
}

function Intro({ title, description, className = '' }) {
  return (
    <div className={`mb-12 max-w-xl animate-fade-up ${className}`}>
      <h1 className="mb-2 font-heading text-[2rem] leading-tight">{title}</h1>
      <p className="text-[#777]">{description}</p>
    </div>
  );
}

function Portfolio({ showIntro = true }) {
  const [filter, setFilter] = useState('All');
  const visibleWorks = useMemo(
    () => works.filter((work) => filter === 'All' || work.type === filter),
    [filter],
  );

  return (
    <>
      <div className="mb-12 grid items-center gap-6 lg:grid-cols-2">
        {showIntro ? (
          <div className="animate-fade-up">
            <h1 className="mb-2 font-heading text-[2rem] leading-tight">
              Hey, We are Bonjin Team
            </h1>
            <p className="text-[#777]">Professional web & app developer</p>
          </div>
        ) : (
          <div />
        )}
        <div className="filters animate-fade-up lg:text-right">
          {['All', 'Web', 'App'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={filter === item ? 'active' : ''}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {visibleWorks.map((work) => (
          <WorkCard key={work.slug} work={work} />
        ))}
      </div>
    </>
  );
}

function WorkCard({ work }) {
  return (
    <div className="work-item">
      <Link to={`/works/${work.slug}`} className="work-wrap">
        <img src={work.image} alt={`${work.name} project`} />
        <span className="work-overlay" />
        <span className="work-info">
          <strong>{work.name}</strong>
          <span>{work.type}</span>
        </span>
      </Link>
    </div>
  );
}

function Services({ wide = false }) {
  return (
    <div className={`grid gap-y-12 sm:grid-cols-2 ${wide ? '' : 'lg:grid-cols-4'}`}>
      {services.map(({ title, content, items, icon: Icon }) => (
        <article key={title} className={wide ? 'mb-2 pr-10' : 'pr-8'}>
          <Icon className="mb-6 size-12 stroke-[1.25]" />
          <h2 className="mb-2 font-heading text-base font-semibold">{title}</h2>
          <p className="mb-4 text-[#777]">{content}</p>
          <ul className="list-line">
            {items.map((item) => (
              <li key={item}>{item}</li>
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
      <section className="site-section site-container">
        <Portfolio />
      </section>

      <section className="site-section site-container">
        <SectionTitle title="Technology used" subtitle="It uses a variety of techniques." />
        <div className="grid grid-cols-3 items-center">
          {['adobe', 'apple', 'google'].map((brand) => (
            <div key={brand} className="px-4 sm:px-8">
              <img
                src={`/images/logo-${brand}.png`}
                alt={brand}
                className="mx-auto w-full max-w-[258px]"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="site-section site-container">
        <SectionTitle
          title="My Services"
          subtitle="We have made great service through various technologies."
        />
        <Services />
      </section>

      <section className="site-section site-container">
        <div className="testimonial-wrap">
          <img
            src="/images/man-profile-512x512.png"
            alt="Gigas profile"
            className="mx-auto mb-7 size-[120px] rounded-full object-cover"
          />
          <blockquote className="mb-4 text-xl">
            <p>“Will you study for life?”</p>
          </blockquote>
          <p>GIGAS</p>
          <div className="mt-7 flex justify-center gap-2" aria-hidden="true">
            <span className="size-[7px] rounded-full bg-ink" />
            <span className="size-[7px] rounded-full bg-[#cbd3da]" />
          </div>
        </div>
      </section>
    </>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="mx-auto mb-10 max-w-xl text-center">
      <h2 className="mb-2 font-heading text-[28px]">{title}</h2>
      <p className="text-[#777]">{subtitle}</p>
    </div>
  );
}

function AboutPage() {
  return (
    <section className="site-section site-container">
      <Intro
        title="About Me"
        description="I am a web & app developer. We actively solve problems."
      />
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <img
            src="/images/man-profile-512x512.png"
            alt="Bonjin developer profile"
            className="w-full"
          />
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <h2 className="mb-6 font-heading text-xl">Skills</h2>
          <ul className="space-y-5">
            {skills.map(([skill, progress]) => (
              <li key={skill}>
                <div className="mb-1 flex justify-between">
                  <strong>{skill}</strong>
                  <span>{progress}%</span>
                </div>
                <div className="h-[7px] bg-[#e9ecef]">
                  <div className="h-full bg-black" style={{ width: `${progress}%` }} />
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
    <section className="site-section site-container">
      <Intro
        title="My Services"
        description="We have made great service through various technologies."
      />
      <div className="pt-12">
        <Services wide />
      </div>
    </section>
  );
}

function WorksPage() {
  return (
    <section className="site-section site-container">
      <Portfolio />
    </section>
  );
}

function WorkDetailPage({ slug }) {
  const work = works.find((item) => item.slug === slug);

  if (!work) {
    return <NotFoundPage />;
  }

  return (
    <section className="site-section site-container">
      <Intro title="Work Detail Page" description="Job details page." />
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <img src={work.image} alt={`${work.name} project`} className="w-full" />
        </div>
        <aside className="md:col-span-3 md:col-start-10">
          <div className="md:sticky md:top-0">
            <h1 className="mb-1 font-heading text-xl">{work.name}</h1>
            <p className="mb-6 text-[#777]">{work.type}</p>
            <p className="mb-8 text-[#777]">{work.description}</p>
            <h2 className="mb-4 font-heading text-base font-semibold">What I did</h2>
            <ul className="list-line mb-8">
              {work.technologies.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a
              href={work.site}
              target="_blank"
              rel="noreferrer"
              className="readmore"
            >
              Visit Website
            </a>
          </div>
        </aside>
      </div>

      <div className="pt-28">
        <SectionTitle title="More Works" subtitle="Other works." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {works
            .filter((item) => item.slug !== slug)
            .slice(0, 3)
            .map((item) => (
              <WorkCard key={item.slug} work={item} />
            ))}
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  const [ready, setReady] = useState(false);

  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(data.get('subject'));
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`,
    );
    setReady(true);
    window.location.href = `mailto:bonjin.app@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <section className="site-section site-container">
      <Intro title="Contact" description="Please contact" />
      <div className="grid gap-12 md:grid-cols-12">
        <form onSubmit={submit} className="md:col-span-6">
          <div className="grid gap-x-6 sm:grid-cols-2">
            <FormField label="Name">
              <input name="name" type="text" required />
            </FormField>
            <FormField label="Email">
              <input name="email" type="email" required />
            </FormField>
          </div>
          <FormField label="Subject">
            <input name="subject" type="text" required />
          </FormField>
          <FormField label="Message">
            <textarea name="message" rows="10" required />
          </FormField>
          <button type="submit" className="readmore w-full sm:w-auto">
            Send Message
          </button>
          {ready && (
            <p className="mt-4 text-sm text-[#777]">
              이메일 앱에서 내용을 확인한 후 전송해 주세요.
            </p>
          )}
        </form>

        <aside className="md:col-span-4 md:col-start-9">
          <ContactItem title="Blog">
            <a
              href="https://gigas-blog.tistory.com"
              target="_blank"
              rel="noreferrer"
            >
              gigas-blog.tistory.com
            </a>
          </ContactItem>
          <ContactItem title="Phone">+82 10 5054 5654</ContactItem>
          <ContactItem title="Email">bonjin.app@gmail.com</ContactItem>
        </aside>
      </div>
    </section>
  );
}

function FormField({ label, children }) {
  return (
    <label className="mb-5 block">
      <span className="mb-2 block">{label}</span>
      <span className="form-control">{children}</span>
    </label>
  );
}

function ContactItem({ title, children }) {
  return (
    <div className="mb-5">
      <strong className="mb-1 block">{title}</strong>
      <span className="text-[#777]">{children}</span>
    </div>
  );
}

function NotFoundPage() {
  return (
    <section className="site-section site-container text-center">
      <p className="mb-2 text-[#777]">404</p>
      <h1 className="mb-8 font-heading text-[2rem]">Page not found.</h1>
      <Link to="/" className="readmore">
        <ArrowLeft className="mr-2 inline size-4" /> Back Home
      </Link>
    </section>
  );
}

function CurrentPage() {
  const route = useRoute();

  if (route === '/') return <HomePage />;
  if (route === '/about') return <AboutPage />;
  if (route === '/services') return <ServicesPage />;
  if (route === '/works') return <WorksPage />;
  if (route.startsWith('/works/')) {
    return <WorkDetailPage slug={route.slice('/works/'.length)} />;
  }
  if (route === '/contact') return <ContactPage />;
  return <NotFoundPage />;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main>
        <CurrentPage />
      </main>
      <Footer />
    </Router>
  );
}
