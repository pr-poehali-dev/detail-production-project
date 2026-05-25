import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "О нас", href: "#about" },
  { label: "Продукция", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  {
    icon: "ShoppingCart",
    title: "Складские тележки",
    desc: "Платформенные, рамные, г-образные и угловые тележки из стали под любую нагрузку. Колёса — полиуретан или чугун, грузоподъёмность до 1500 кг.",
  },
  {
    icon: "Square",
    title: "Металлические фреймы",
    desc: "Сварные рамные конструкции для штабелирования, транспортировки крупногабаритных изделий и защиты грузов в логистической цепи.",
  },
  {
    icon: "Package",
    title: "Возвратная тара",
    desc: "Ящики, контейнеры и корзины из сетки или листового металла — многооборотная тара для автопрома, машиностроения и дистрибуции.",
  },
  {
    icon: "Layers",
    title: "Стеллажные системы",
    desc: "Мобильные и стационарные стеллажи под нестандартные габариты. Интегрируем в существующую складскую инфраструктуру.",
  },
  {
    icon: "Settings",
    title: "Изготовление по чертежам",
    desc: "Принимаем DWG, DXF, STEP, PDF и эскизы от руки. Разрабатываем чертёж с нуля или дорабатываем существующий под ваши задачи.",
  },
  {
    icon: "RefreshCw",
    title: "Ремонт и модернизация",
    desc: "Восстанавливаем вышедшую из строя тару: замена колёс, сварка трещин, нанесение нового покрытия, усиление конструкции.",
  },
];

const PORTFOLIO = [
  {
    title: "Тележки для автозавода",
    desc: "Г-образные рамные тележки, 800 шт.",
    material: "Сталь 3сп, порошковое покрытие",
    img: "https://cdn.poehali.dev/projects/c2ab5e88-4f4a-404f-91fc-fd09399670c8/files/a6635b51-3621-48ad-92bd-e0e358734327.jpg",
  },
  {
    title: "Контейнеры для деталей",
    desc: "Сетчатые складные контейнеры, 500 шт.",
    material: "Проволока 6 мм, горячий цинк",
    img: "https://cdn.poehali.dev/projects/c2ab5e88-4f4a-404f-91fc-fd09399670c8/files/a3cfec98-5f05-4962-a712-66c50e988bee.jpg",
  },
  {
    title: "Фреймы для логистики",
    desc: "Штабелируемые фреймы под паллеты, 200 шт.",
    material: "Профильная труба 60×40, цинк",
    img: "https://cdn.poehali.dev/projects/c2ab5e88-4f4a-404f-91fc-fd09399670c8/files/5599114f-34fd-45ab-a0f7-c2a63c51b3a6.jpg",
  },
];

const STATS = [
  { value: "12+", label: "лет на рынке" },
  { value: "200+", label: "клиентов по России" },
  { value: "50 000+", label: "единиц тары в год" },
  { value: "14 дн.", label: "средний срок партии" },
];

const CLIENTS = [
  "Автопром", "Машиностроение", "Дистрибуция", "Ритейл", "Фармацевтика", "Пищевое производство",
];

const ACCEPTED_FORMATS = ["DWG", "DXF", "STEP", "PDF", "JPEG", "PNG"];

export default function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).map((f) => f.name);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).map((f) => f.name);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (name: string) =>
    setUploadedFiles((prev) => prev.filter((f) => f !== name));

  return (
    <div className="min-h-screen bg-background text-foreground font-golos">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <a href="#hero" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="w-2 h-6 bg-accent inline-block rounded-sm" />
            МДМ Групп
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#upload" className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-accent text-accent-foreground text-sm font-semibold rounded-sm hover:opacity-90 transition-opacity">
            <Icon name="FileText" size={15} />
            Получить расчёт
          </a>
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4 animate-fade-in">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-sm py-1 text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#upload" onClick={() => setMobileOpen(false)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground text-sm font-semibold rounded-sm w-fit">
              <Icon name="FileText" size={15} />
              Получить расчёт
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/c2ab5e88-4f4a-404f-91fc-fd09399670c8/files/5599114f-34fd-45ab-a0f7-c2a63c51b3a6.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />

        <div className="container mx-auto px-6 relative z-10 pb-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-6 animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
              <span className="w-8 h-px bg-accent" />
              Производство металлической складской тары
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6 animate-fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
              Тележки.
              <br />Фреймы.
              <br /><span className="text-accent">Возвратная тара.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed animate-fade-up" style={{ animationDelay: "0.35s", opacity: 0 }}>
              Изготавливаем металлическую складскую тару по чертежам и ТЗ. Серийное производство от 10 до 10 000 единиц. Срок — от 14 дней.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.5s", opacity: 0 }}>
              <a href="#upload" className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground font-semibold rounded-sm hover:opacity-90 transition-opacity text-sm">
                <Icon name="FileText" size={16} />
                Получить расчёт
              </a>
              <a href="#services" className="inline-flex items-center gap-2 px-8 py-3.5 border border-border text-foreground font-medium rounded-sm hover:border-foreground transition-colors text-sm">
                Вся продукция
                <Icon name="ArrowRight" size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
              {STATS.map((s) => (
                <div key={s.label} className="py-5 px-6 text-center">
                  <div className="text-2xl font-black text-accent">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">О компании</div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                МДМ Групп —<br />производство полного цикла
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                С 2012 года выпускаем металлическую возвратную тару для складской и производственной логистики. Работаем с предприятиями автопрома, машиностроения, дистрибуции и ритейла.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Собственное производство площадью 4 500 м², лазерная резка, роботизированная сварка, порошковое окрашивание и горячее цинкование — всё под одной крышей.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Производство", "4 500 м²"],
                  ["Покрытие", "порошок, цинк, грунт"],
                  ["Сталь", "3–12 мм, труба, сетка"],
                  ["Срок партии", "от 14 дней"],
                ].map(([k, v]) => (
                  <div key={k} className="border border-border p-4 rounded-sm bg-background">
                    <div className="text-xs text-muted-foreground mb-1">{k}</div>
                    <div className="font-semibold text-sm">{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border border-border rounded-sm" />
              <img
                src="https://cdn.poehali.dev/projects/c2ab5e88-4f4a-404f-91fc-fd09399670c8/files/5599114f-34fd-45ab-a0f7-c2a63c51b3a6.jpg"
                alt="Производство МДМ Групп"
                className="w-full aspect-[4/3] object-cover rounded-sm relative z-10"
              />
            </div>
          </div>

          {/* Clients strip */}
          <div className="mt-16 border-t border-border pt-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6 text-center">Работаем с отраслями</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {CLIENTS.map((c) => (
                <span key={c} className="px-4 py-2 border border-border rounded-sm text-sm font-medium text-muted-foreground hover:border-accent hover:text-accent transition-colors">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES / PRODUCTS */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Что мы производим</div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">Продукция</h2>
            </div>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              Стандартные и нестандартные решения — от эскиза до серийной партии на вашем складе.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-background p-8 group hover:bg-secondary/40 transition-colors">
                <div className="w-10 h-10 flex items-center justify-center bg-secondary rounded-sm mb-5 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Icon name={s.icon as "Settings"} size={20} />
                </div>
                <h3 className="font-bold text-base mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD / QUOTE */}
      <section id="upload" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Быстрый расчёт</div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-3">
                Загрузите чертёж<br />или опишите задачу
              </h2>
              <p className="text-muted-foreground text-sm">
                Принимаем {ACCEPTED_FORMATS.join(", ")} — коммерческое предложение за 4 часа
              </p>
            </div>

            {/* Drop zone */}
            <div
              className={`upload-zone rounded-sm p-12 text-center cursor-pointer mb-6 ${dragOver ? "drag-over" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".dwg,.dxf,.step,.stp,.pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <Icon name="Upload" size={24} className="text-muted-foreground" />
              </div>
              <p className="font-semibold mb-1 text-sm">Перетащите файлы сюда</p>
              <p className="text-xs text-muted-foreground">или нажмите для выбора файлов</p>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {ACCEPTED_FORMATS.map((f) => (
                  <span key={f} className="text-xs px-2 py-0.5 bg-secondary rounded-sm text-muted-foreground font-mono">
                    .{f.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mb-6 space-y-2">
                {uploadedFiles.map((name) => (
                  <div key={name} className="flex items-center justify-between px-4 py-3 bg-background border border-border rounded-sm">
                    <div className="flex items-center gap-3">
                      <Icon name="FileText" size={16} className="text-accent" />
                      <span className="text-sm font-medium truncate max-w-xs">{name}</span>
                    </div>
                    <button onClick={() => removeFile(name)} className="text-muted-foreground hover:text-foreground transition-colors">
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-background border border-border rounded-sm p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5">Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Иван Петров"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-sm bg-background focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5">Телефон</label>
                  <input
                    type="tel"
                    placeholder="+7 (999) 000-00-00"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-sm bg-background focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5">Описание задачи</label>
                <textarea
                  rows={3}
                  placeholder="Тип тары, количество, размеры, материал, срок, особые требования..."
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-sm bg-background focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
              <button className="w-full py-3 bg-accent text-accent-foreground font-semibold text-sm rounded-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Icon name="Send" size={16} />
                Отправить заявку
              </button>
              <p className="text-xs text-muted-foreground text-center">
                Ответим в течение 4 часов в рабочее время · Пн–Пт 9:00–18:00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Реализованные проекты</div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">Портфолио</h2>
            </div>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              Примеры тары, изготовленной для крупных производственных и логистических компаний
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PORTFOLIO.map((p) => (
              <div key={p.title} className="group overflow-hidden rounded-sm border border-border bg-background hover:shadow-lg transition-shadow">
                <div className="overflow-hidden aspect-[4/3]">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-sm mb-1">{p.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{p.desc}</p>
                  <span className="text-xs font-mono bg-secondary px-2 py-1 rounded-sm text-muted-foreground">
                    {p.material}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-foreground text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Свяжитесь с нами</div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-8">Контакты</h2>
              <div className="space-y-6">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (800) 000-00-00" },
                  { icon: "Mail", label: "Email", value: "info@mdmgrupp.ru" },
                  { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Промышленная, 12" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт 9:00–18:00" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-9 h-9 flex items-center justify-center bg-primary-foreground/10 rounded-sm flex-shrink-0">
                      <Icon name={c.icon as "Phone"} size={17} className="text-accent" />
                    </div>
                    <div>
                      <div className="text-xs text-primary-foreground/50 mb-0.5">{c.label}</div>
                      <div className="text-sm font-medium">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-5 border border-primary-foreground/10 rounded-sm bg-primary-foreground/5">
                <p className="text-sm font-semibold mb-1">Нужна консультация?</p>
                <p className="text-xs text-primary-foreground/60">
                  Наши технологи помогут подобрать оптимальную конструкцию тары под ваши задачи — бесплатно.
                </p>
              </div>
            </div>

            <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-sm p-8">
              <h3 className="font-bold text-lg mb-6">Написать нам</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя и компания"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-3 text-sm bg-primary-foreground/5 border border-primary-foreground/10 rounded-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-3 text-sm bg-primary-foreground/5 border border-primary-foreground/10 rounded-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent transition-colors"
                />
                <textarea
                  rows={4}
                  placeholder="Опишите вашу задачу или вопрос..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-4 py-3 text-sm bg-primary-foreground/5 border border-primary-foreground/10 rounded-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent transition-colors resize-none"
                />
                <button className="w-full py-3 bg-accent text-accent-foreground font-semibold text-sm rounded-sm hover:opacity-90 transition-opacity">
                  Отправить сообщение
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-primary-foreground border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold">
            <span className="w-2 h-5 bg-accent inline-block rounded-sm" />
            МДМ Групп
          </div>
          <p className="text-xs text-primary-foreground/40">
            © 2025 МДМ Групп. Производство металлической складской тары.
          </p>
          <div className="flex gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-xs text-primary-foreground/40 hover:text-primary-foreground/80 transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
