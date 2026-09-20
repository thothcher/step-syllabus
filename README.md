# AI-Native Front-End Development — ინტერაქტიული სილაბუსი

IT Step Academy · Syllabus V3 · პირველი ლექციის პრეზენტაცია.

სილაბუსი აწყობილია როგორც **რუკა**: ცენტრალური ხაზი (ხერხემალი) კურსია, მისგან
გამოდის განშტოებები — მოდულები, ლექციები და თემები. სქროლვისას ავატარი მიჰყვება
გზას, გავლილი მონაკვეთი ნათდება, კვანძები ინთება. სამ წერტილში იატაკიდან ამოდის
პანელი, სადაც სლაიდერით ნაჩვენებია, რა პროექტებს ქმნიან სტუდენტები.

## გაშვება

ორმაგი დაწკაპუნება `index.html`-ზე საკმარისია — ბილდი და დამოკიდებულებები არ სჭირდება.

ლოკალური სერვერით (რეკომენდებული პრეზენტაციისთვის, ქეშირების გამო):

```bash
npx serve .
# ან
python -m http.server 8080
```

## სტრუქტურა

```
index.html              მარკაპი, SEO მეტა + JSON-LD, noscript ფოლბექი
robots.txt              ინდექსაცია + sitemap-ის მისამართი
sitemap.xml             ერთგვერდიანი საიტის რუკა
assets/css/base.css     ტოკენები, თემები, ტიპოგრაფია, კურსორი, boot
assets/css/layout.css   topbar, rail, hero, legend, outcome, no-JS, footer
assets/css/trail.css    ხერხემალი, კვანძები, ავატარი, მოდულის ბარათები
assets/css/deck.css     კონტროლის წერტილები (იატაკი, ამოსვლა) + სლაიდერი
assets/js/data.js       ► მთელი სილაბუსი: 11 მოდული, 72 ლექცია, 291 თემა
assets/js/core.js       ticker, scroll store, თემა, კურსორი, reveal, parallax
assets/js/hero3d.js     3D ხე hero-ზე (საკუთარი რენდერერი, ბიბლიოთეკის გარეშე)
assets/js/render.js     DOM-ის აგება data.js-დან
assets/js/trail.js      SVG გზა, განშტოებები, ავატარი
assets/js/deck.js       პანელის ამოსვლა სქროლზე + სლაიდერი
assets/js/main.js       გაერთიანება
assets/imgs/images.png  ლოგო (ჰედერი, favicon, apple-touch-icon)
assets/imgs/og-cover.png  1200×630 სოციალური ქარდი
tools/og-card.html      og-cover.png-ის წყარო (რედაქტირებადი)
```

## კონტენტის რედაქტირება

ყველაფერი ერთ ფაილშია — `assets/js/data.js`. HTML-ს ხელი არ სჭირდება.

```js
{
  type: 'module', id: 'm03', n: '03',
  title: 'DOM-First JavaScript',
  en: 'Logic · State · Network · Architecture',
  range: [17, 33],
  summary: '...',
  lectures: [
    { n: 17, t: 'შესავალი JS & DOM', topics: [ t('DOM'), t('Events', 'დეტალი მონოსივრცით') ] }
  ]
}
```

- `t('სათაური')` — მარტივი თემა; `t('სათაური', 'დეტალები')` — დეტალები პატარა შრიფტით.
- `kind: 'milestone' | 'handout' | 'review'` — ლექციაზე ჩნდება ნიშნული.
- `type: 'checkpoint'` — იატაკიდან ამომავალი პანელი; `projects: []` სლაიდერის სლაიდებია.
- თემების სიმკვრივის გრაფიკი (მარჯვენა/მარცხენა პანელი) ავტომატურად ითვლება.

## მართვა

| ქმედება | შედეგი |
|---|---|
| სქროლი | ავატარი მიდის გზაზე, კვანძები ინთება |
| `T` | ღია / მუქი თემა (ინახება localStorage-ში) |
| `←` `→` | სლაიდერი კონტროლის წერტილში |
| `Home` | დასაწყისში დაბრუნება |
| მარჯვენა rail | მოდულზე გადასვლა |

## SEO

კანონიკური მისამართი: **https://thothcher.github.io/step-syllabus/**
(ჩაწერილია `index.html`-ში, `sitemap.xml`-სა და `robots.txt`-ში — დომენის შეცვლისას
სამივეში განაახლე).

> **GitHub Pages-ის ორი თავისებურება**
> - `robots.txt` მხოლოდ დომენის ძირში მუშაობს, ანუ `thothcher.github.io/robots.txt`-ზე.
>   პროექტის საიტის `/step-syllabus/robots.txt` კრაულერს არ წაუკითხავს — ინდექსაციას
>   `<meta name="robots">` მართავს, sitemap კი პირდაპირ Search Console-ში დაამატე.
> - `.nojekyll` ფაილი ჩამატებულია, რომ Pages-მა Jekyll გვერდის ავლით, ფაილები ისე
>   ჩააგდოს, როგორც არის.

რა არის უკვე გაკეთებული:

- **Meta** — `title` (63 სიმბოლო), `description` (156), `author`, `robots`
  (`max-image-preview:large`), `canonical`, `lang="ka"`.
- **Open Graph + Twitter Card** — სრული ნაკრები `og:image`-ით (1200×630, `summary_large_image`).
  ქარდი დახატულია [tools/og-card.html](tools/og-card.html)-ით და შენახულია
  `assets/imgs/og-cover.png`-ად; ტექსტის შეცვლის შემდეგ ხელახლა გადაიღე სქრინი 1200×630-ზე.
- **JSON-LD** (`schema.org`) — `EducationalOrganization`, `WebSite`, `WebPage` და **`Course`**
  11 `syllabusSections`-ით, `teaches[]`-ით და `about[]` ტექნოლოგიებით.
  ეს არის ის, რაც Google-ს კურსის rich result-ისთვის სჭირდება.
- **noscript ფოლბექი** — რუკა JavaScript-ით იგება, ამიტომ `<noscript>`-ში ჩადებულია
  იგივე სილაბუსი ტექსტად (11 მოდული + 3 რელიზი), `.no-js` კლასით სწორად დასტილული.
- **Favicon / apple-touch-icon** — აკადემიის ლოგოდან.
- **ხელმისაწვდომობა** — სათაურების იერარქია h1 → h2 → h3 → h4, ყველა `<img>`-ს აქვს `alt`,
  ლოგოს `width`/`height` მითითებულია (CLS-ის თავიდან ასარიდებლად).

არასავალდებულო გაუმჯობესება: როცა კონკრეტული ჯგუფის განრიგი გეცოდინება, `Course`-ს
დაამატე `hasCourseInstance` (`courseMode`, `courseWorkload`, `startDate`) — Google-ის
„Course info" გაფართოებული შედეგი სწორედ ამას ითხოვს. შეთხზული მონაცემები განზრახ არ ჩავწერე.

## ტექნიკური

- Vanilla JS (classic scripts, `file://`-დანაც მუშაობს), ბილდის გარეშე.
- შრიფტები: **Noto Serif Georgian** (სათაურები) + **Noto Sans Georgian** (ტექსტი),
  ქართულის სრული მხარდაჭერით. ინტერნეტის გარეშე ჩაირთვება სისტემური fallback.
- ანიმაცია: ერთი `requestAnimationFrame` ციკლი, მხოლოდ `transform`/`opacity`,
  IntersectionObserver reveal-ისთვის, `prefers-reduced-motion` გათვალისწინებულია.
- ფერები: `#0B2892` (ძირითადი) → `#1B44CE` → `#3E7BFF` გრადიენტები, ორივე თემაში.

## შენიშვნა სილაბუსზე

საწყის `.docx`-ში მოდულის ნომრები მეორდება — „მოდული 7" ორჯერ (ლექციები 52–54 და
55–60) და „მოდული 9" ორჯერ (ლექციები 63–65 და 66–72). საიტზე მოდულები
გადანომრილია თანმიმდევრულად **01–11**; სათაურები და შიგთავსი უცვლელია.
