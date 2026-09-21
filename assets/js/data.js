/* ==========================================================================
   AI-Native Front-End Development — Curriculum data (Syllabus V3)
   IT Step Academy
   ========================================================================== */
(function (APP) {
  'use strict';

  APP.META = {
    course: 'AI-Native Front-End Development',
    school: 'IT STEP ACADEMY',
    version: 'SYLLABUS V3',
    lectures: 72,
    modules: 11,
    releases: 3
  };

  function t(title, detail) { return detail ? { t: title, d: detail } : { t: title }; }

  APP.TRAIL = [

    /* ------------------------------------------------------------------ 01 */
    {
      type: 'module', id: 'm01', n: '01',
      title: 'კურსის შესავალი, AI-Native Workflow',
      en: 'Foundations & AI Collaboration',
      range: [1, 3],
      summary: 'ვიწყებთ არა სინტაქსით, არამედ აზროვნებით — როგორ იქცევა მოთხოვნა გადაწყვეტად და სად გადის ფრონტენდის საზღვარი.',
      lectures: [
        {
          n: 1, t: 'Product Engineering & Engineering Canvas',
          topics: [
            t('Coding'), t('Software Development'), t('Product Engineering'),
            t('Frontend Product Engineering'), t('Requirement vs Solution'),
            t('Functional Requirement'), t('Business Rule'), t('Edge Case'),
            t('Acceptance Criterion')
          ]
        },
        {
          n: 2, t: 'AI Collaboration',
          topics: [
            t('AI როგორც Copilot'), t('Context Quality'), t('Hallucination'),
            t('Assumption'), t('Verification')
          ]
        },
        {
          n: 3, t: 'Business Ecosystem & Business Modeling',
          topics: [
            t('System'), t('Ecosystem'), t('Dependency'), t('Data Flow'),
            t('Source of Truth'), t('Frontend Boundary'), t('Shared Language'),
            t('Event'), t('State'), t('Rule'), t('Decision')
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ 02 */
    {
      type: 'module', id: 'm02', n: '02',
      title: 'HTML & CSS — Visual Product Foundations',
      en: 'Markup · Layout · Motion · Accessibility',
      range: [4, 16],
      summary: 'სემანტიკიდან დიზაინ-ტოკენებამდე — ვაშენებთ ინტერფეისს, რომელსაც სწორად კითხულობს ბრაუზერი, screen reader და გუნდი.',
      lectures: [
        {
          n: 4, t: 'Intro HTML',
          topics: [
            t('Document Structure', '<!DOCTYPE html>, html, head, body, Metadata, Viewport, Page title'),
            t('Content Elements', 'Headings, Paragraphs, Lists, Links, Images, Buttons'),
            t('Button vs Link'), t('Heading Hierarchy')
          ]
        },
        {
          n: 5, t: 'Semantic HTML & Intro CSS',
          topics: [
            t('Semantic Elements', 'header, nav, main, section, article, aside, footer'),
            t('CSS Rule'), t('Selectors')
          ]
        },
        {
          n: 6, t: 'CSS: Cascade, Specificity',
          topics: [t('Cascade'), t('Specificity'), t('Inheritance')]
        },
        {
          n: 7, t: 'Box Model, Units',
          topics: [t('Box Model'), t('Units', 'px, %, rem, em, vw, vh'), t('DevTools')]
        },
        {
          n: 8, t: 'CSS Flexbox & Positions',
          topics: [
            t('Flexbox Refinement', 'display:flex · Main & Cross Axis · flex-direction · justify-content · align-items · gap · flex-wrap · flex-grow · flex-shrink · flex-basis · align-self'),
            t('CSS Positions & Containing Block', 'static · relative · absolute · fixed · sticky · top/right/bottom/left · z-index')
          ]
        },
        {
          n: 9, t: 'Responsive Design',
          topics: [
            t('Mobile-First'), t('Viewport'), t('Media Queries'),
            t('Responsive Units', '%, rem, vw, clamp(), min(), max()'),
            t('Responsive Images'), t('Breakpoints')
          ]
        },
        {
          n: 10, t: 'CSS Grid Layouts & Semantic Data Tables',
          topics: [
            t('HTML5 სემანტიკური ცხრილები', 'table, thead, tbody, tfoot, tr, th, td'),
            t('საინჟინრო ევოლუცია', 'რატომ არის table ანტი-პატერნი გვერდის მაკრო-განლაგებისთვის'),
            t('Data Table vs Layout Grid'),
            t('CSS Grid საფუძვლები', 'display:grid · grid-template-columns/rows · repeat() · fr · minmax() · gap · grid-column · grid-row · auto-fit · auto-fill'),
            t('Flexbox (1D) vs Grid (2D)')
          ]
        },
        {
          n: 11, t: 'CSS Transitions & Animations',
          topics: [
            t('CSS Transitions', 'transition-property · duration · timing-function · delay'),
            t('CSS Transforms', 'translate() · scale() · rotate()'),
            t('Keyframes Animations', '@keyframes · animation-name · duration · iteration-count · fill-mode'),
            t('Performance Optimization', 'Browser Rendering Pipeline · GPU Hardware Acceleration · Reflow/Repaint-ის არიდება')
          ]
        },
        {
          n: 12, t: 'Forms, Semantics & Accessibility (a11y) Masterclass',
          topics: [
            t('Form Elements & Grouping', 'form, label, input, select, textarea, button, fieldset, legend'),
            t('Input Types', 'text, email, tel, number, date, time, checkbox, radio'),
            t('Validation Attributes', 'required, min, max, minlength, maxlength, pattern'),
            t('POUR პრინციპები', 'Perceivable · Operable · Understandable · Robust'),
            t('ARIA-ს ოქროს წესი & Error States', 'aria-invalid="true" · aria-describedby · role="alert"'),
            t('Form States', 'Default · Focus · Valid · Invalid · Disabled · Submitting · Success · Failure')
          ]
        },
        {
          n: 13, t: 'CSS Variables — Design Tokens, SCSS',
          topics: [
            t('Design Token'),
            t('Token Categories', 'Color · Typography · Spacing · Radius · Shadow · Border · Motion'),
            t('Semantic Token'), t('Theme Foundations', 'Light / Dark Theme')
          ]
        },
        {
          n: 14, t: 'Tailwind Refactoring',
          topics: [
            t('Utility-First CSS'), t('Responsive Prefixes', 'sm: · md: · lg: · xl:'),
            t('State Variants', 'hover: · focus: · disabled: · group-hover:'),
            t('Tailwind Theme'), t('როდის დარჩეს Traditional CSS?')
          ]
        },
        {
          n: 15, t: 'GitHub UI Prototype & GitHub-დან დაჰოსტვა',
          topics: [
            t('Git Workflow — Level 2', 'git status · add · commit · log · .gitignore · push'),
            t('Commit Quality'), t('README'), t('Release'), t('GitHub-დან დაჰოსტვა')
          ]
        },
        { n: 16, t: 'პროექტის პრეზენტაცია', kind: 'milestone', topics: [t('პირველი პროდუქტის დაცვა')] }
      ]
    },

    /* --------------------------------------------------------- CHECKPOINT 1 */
    {
      type: 'checkpoint', id: 'cp1', release: 'v0.1',
      label: 'Static Product',
      stage: 'ეტაპი 01 — მარკაპი',
      when: 'ლექცია 15 — 16',
      title: 'პირველი რელიზი',
      lead: 'სამივე რელიზში ერთი და იგივე სამი პროდუქტია — აირჩიე ერთი და ბოლომდე ის გაგყვება. პირველი ვერსია სუფთა მარკაპია: სემანტიკური სტრუქტურა, საკუთარი დიზაინ-ტოკენები და GitHub-ზე დაჰოსტილი ბილდი.',
      projects: [
        {
          tag: 'HORECA', mock: 'grid',
          title: 'Restaurant',
          demo: { url: 'https://restaurant.stepacademy.ge/', label: 'restaurant.stepacademy.ge' },
          pitch: 'რესტორნის საიტი: ჰირო, მენიუს ბადე, გალერეა და ჯავშნის ფორმა — მხოლოდ HTML-ითა და CSS-ით.',
          points: [
            'სემანტიკური სტრუქტურა და სწორი heading hierarchy',
            'Grid + Flexbox მენიუს ბადისთვის, mobile-first breakpoints',
            'Design tokens და light / dark თემა',
            'ჯავშნის ფორმა ვალიდაციითა და ARIA error states-ით'
          ],
          stack: ['HTML5', 'CSS Grid', 'Flexbox', 'Design Tokens', 'Tailwind', 'Git'],
          deliver: 'GitHub Pages ლინკი · README · Release v0.1'
        },
        {
          tag: 'TRANSPORT', mock: 'list',
          title: 'Trains',
          demo: { url: 'https://trains.stepacademy.ge/trains', label: 'trains.stepacademy.ge' },
          pitch: 'მატარებლების განრიგი: მარშრუტების ცხრილი, ფილტრების პანელი და ბილეთის ბარათი სტატიკურ მარკაპში.',
          points: [
            'Data table vs layout grid — სწორი არჩევანი',
            'Sticky thead და ცხრილი, რომელიც ტელეფონზე იშლება ბარათებად',
            'clamp() ტიპოგრაფია და responsive images',
            'a11y აუდიტი მხოლოდ კლავიატურით'
          ],
          stack: ['Semantic HTML', 'CSS Grid', 'Tables', 'Responsive', 'a11y'],
          deliver: 'დაჰოსტილი განრიგი · a11y ჩეკლისტი · Release v0.1'
        },
        {
          tag: 'E-COMMERCE', mock: 'dash',
          title: 'Shop',
          demo: { url: 'https://shop.stepacademy.ge/', label: 'shop.stepacademy.ge' },
          pitch: 'მაღაზიის ვიტრინა: პროდუქტების ბადე, ფილტრების გვერდითი პანელი, პროდუქტის გვერდი და კალათის ეკრანი.',
          points: [
            'პროდუქტის ბარათი და მისი რვა მდგომარეობა',
            'CSS transitions და keyframes GPU-ზე',
            'Semantic tokens და თემების გადართვა',
            'მიგრაცია Tailwind theme-ზე'
          ],
          stack: ['HTML5', 'CSS Variables', 'Flexbox', 'Tailwind', 'Git'],
          deliver: 'დაჰოსტილი ვიტრინა · ცოცხალი style guide · Release v0.1'
        }
      ]
    },

    /* ------------------------------------------------------------------ 03 */
    {
      type: 'module', id: 'm03', n: '03',
      title: 'DOM-First JavaScript',
      en: 'Logic · State · Network · Architecture',
      range: [17, 33],
      summary: 'ინტერფეისი ცოცხლდება: ბიზნესწესები კოდში, სერვერთან კომუნიკაცია, უცვლელი state და მოდულური არქიტექტურა MVP რელიზამდე.',
      lectures: [
        {
          n: 17, t: 'შესავალი JS & DOM',
          topics: [
            t('ცვლადები & საბაზისო ტიპები', 'const vs let · String · Boolean'),
            t('DOM (Document Object Model)'),
            t('Element Selection', 'querySelector · querySelectorAll · getElementById'),
            t('Element Manipulation', 'textContent · innerHTML · classList · setAttribute'),
            t('Events & Event Listeners'),
            t('Script Loading Execution', 'defer')
          ]
        },
        {
          n: 18, t: 'if/else Decisions — ბიზნესწესები კოდში',
          topics: [
            t('Comparison Operators', '=== · !== · > · < · >= · <='),
            t('Logical Operators', '&& · || · !'),
            t('Conditions', 'if · else if · else · Ternary Operator'),
            t('Boolean Variables'), t('Guard Clause')
          ]
        },
        {
          n: 19, t: 'Functions — პასუხისმგებლობების გამოყოფა',
          topics: [
            t('Function Declaration'), t('Parameters and Arguments'), t('Return Value'),
            t('Function Expression'), t('Arrow Function'),
            t('Scope', 'Global · Function · Block'), t('Single Responsibility')
          ]
        },
        {
          n: 20, t: 'Objects — ბიზნესცნებების მოდელირება',
          topics: [
            t('Object Literal'), t('Properties'),
            t('Property Access', 'dot & bracket notation'), t('Methods'),
            t('Destructuring'), t('Spread Operator'), t('Reference Behavior')
          ]
        },
        {
          n: 21, t: 'Arrays — კოლექციების მართვა',
          topics: [
            t('Array Foundations', 'Array Literal · Zero-based Indexing · length'),
            t('Basic Array Operations', 'push() · pop()'),
            t('Index Access & Mutability')
          ]
        },
        {
          n: 22, t: 'For Loops, Iteration & Dynamic Rendering',
          topics: [
            t('Iteration / Loops', 'for · for...of · forEach'),
            t('Template Literals', 'backticks და ${expression}'),
            t('DOM Injection', 'innerHTML vs insertAdjacentHTML()'),
            t('Conditional Rendering')
          ]
        },
        {
          n: 23, t: 'Array Search, Transformation & Cart State',
          topics: [
            t('Modern Array Methods', 'find() · filter() · map() · reduce() · some() · every()')
          ]
        },
        {
          n: 24, t: 'HTTP Protocol, Promises & Async/Await Foundations',
          kind: 'handout',
          topics: [
            t('Client-Server Architecture', 'Client · Server · API'),
            t('HTTP Request/Response Anatomy', 'Request & Response Components · HTTP Status Categories'),
            t('Synchronous vs Asynchronous Execution'),
            t('Promise Lifecycle', 'Pending · Fulfilled · Rejected'),
            t('Async / Await Syntax'),
            t('Resilient try / catch / finally'),
            t('Fetch API & JSON Parsing'),
            t('GET with async try/catch'),
            t('პროექტის გაცემა', 'მეორე პროექტი ირთვება ამ ლექციიდან')
          ]
        },
        {
          n: 25, t: 'LocalStorage — მდგომარეობის შენარჩუნება',
          topics: [
            t('LocalStorage API', 'setItem · getItem · removeItem · clear'),
            t('Serialization', 'JSON.stringify'), t('Deserialization', 'JSON.parse'),
            t('Safe Loading'), t('Storage Limitations')
          ]
        },
        {
          n: 26, t: 'Auth, Authorization & Session Lifecycle',
          topics: [
            t('Authentication vs Authorization'),
            t('JWT Token Lifecycle', 'Access Token · Refresh Token'),
            t('Session Expiration & Automatic Logout'),
            t('Silent Token Refresh Pattern'),
            t('User Identity Context / Auth State'),
            t('Role-Based Access Control (RBAC)', 'Permission Engine UI-ში')
          ]
        },
        {
          n: 27, t: 'Data Mapping & Full Server CRUD',
          topics: [
            t('Cart State Structure & Management'), t('Full CRUD'),
            t('DTO Mapping', 'Data Transfer Object')
          ]
        },
        {
          n: 28, t: 'Calculations — ფინანსური ლოგიკა',
          topics: [
            t('Number Conversion', 'Number() · parseInt() · parseFloat()'),
            t('reduce()'), t('Calculation Pipeline'), t('Pure Function'),
            t('Currency Formatting', 'Intl.NumberFormat'), t('Floating Point Awareness')
          ]
        },
        {
          n: 29, t: 'Immutability — უსაფრთხო State Updates',
          topics: [
            t('Primitive vs Reference Values'), t('Mutable Update'),
            t('Immutable Object Update'),
            t('Immutable Array Update', 'Add · Remove · Modify — spread და array methods')
          ]
        },
        {
          n: 30, t: 'Modules — არქიტექტურული დაყოფა & MVP Release',
          topics: [
            t('ES Modules', 'export · import'), t('Named Export'), t('Default Export'),
            t('Module Scope'), t('Separation of Concerns'), t('Public API'),
            t('Reliable UI State Lifecycle', 'Idle · Loading · Success · Empty · Error'),
            t('Duplicate Request Prevention'),
            t('LocalStorage-ის როლის ცვლილება', 'Server as Source of Truth')
          ]
        },
        { n: 31, t: 'წინა თემების გამეორება', kind: 'review', topics: [t('Consolidation')] },
        { n: 32, t: 'პროექტის განხილვა ლექციაზე', kind: 'review', topics: [t('Code Review')] },
        { n: 33, t: 'პროექტის წარდგენა', kind: 'milestone', topics: [t('Demo & Defense')] }
      ]
    },

    /* --------------------------------------------------------- CHECKPOINT 2 */
    {
      type: 'checkpoint', id: 'cp2', release: 'v0.5',
      label: 'Dynamic Application',
      stage: 'ეტაპი 02 — JavaScript',
      when: 'გაცემა — ლექცია 24 · წარდგენა — ლექცია 33',
      title: 'მეორე რელიზი',
      lead: 'იგივე პროდუქტი ცოცხლდება: მონაცემები API-დან, ავთენტიფიკაცია, CRUD, გამოთვლები, უცვლელი state და მოდულური არქიტექტურა — ფრეიმვორქის გარეშე.',
      projects: [
        {
          tag: 'HORECA', mock: 'grid',
          title: 'Restaurant',
          demo: { url: 'https://restaurant.stepacademy.ge/', label: 'restaurant.stepacademy.ge' },
          pitch: 'მენიუ API-დან, კალათა, ფასების გამოთვლა, ავტორიზაცია და შეკვეთის სრული ციკლი — სუფთა DOM-ზე.',
          points: [
            'fetch + async/await, try/catch/finally მდგრადობა',
            'კალათის state და immutable განახლებები',
            'JWT სესია, silent refresh და RBAC ხედები',
            'UI state lifecycle: idle → loading → success → empty → error'
          ],
          stack: ['JavaScript', 'Fetch API', 'ES Modules', 'LocalStorage', 'JWT', 'CRUD'],
          deliver: 'MVP Release · მოდულური კოდბეისი · დემო ლექცია 33-ზე'
        },
        {
          tag: 'TRANSPORT', mock: 'list',
          title: 'Trains',
          demo: { url: 'https://trains.stepacademy.ge/trains', label: 'trains.stepacademy.ge' },
          pitch: 'მარშრუტების ძიება, ფილტრები, ადგილის არჩევა და ჯავშნის შენახვა — სია დინამიკურად რენდერდება.',
          points: [
            'დინამიკური რენდერი insertAdjacentHTML()-ით',
            'ძიება, ფილტრაცია და სორტირება filter() / map() / reduce()-ით',
            'Guard clause-ები და ჯავშნის ბიზნესწესები კოდში',
            'Intl.DateTimeFormat განრიგისთვის, LocalStorage ჯავშნებისთვის'
          ],
          stack: ['JavaScript', 'REST', 'DTO', 'Immutability', 'Intl'],
          deliver: 'სამუშაო ჯავშნის ნაკადი · README · ტექნიკური გარჩევა'
        },
        {
          tag: 'E-COMMERCE', mock: 'dash',
          title: 'Shop',
          demo: { url: 'https://shop.stepacademy.ge/', label: 'shop.stepacademy.ge' },
          pitch: 'კატალოგი ძიებით, ფილტრებით და პაგინაციით, კალათა და ადმინის CRUD — სერვერი როგორც ერთადერთი წყარო.',
          points: [
            'CRUD ოპერაციები და DTO mapping',
            'LocalStorage როგორც ქეში, სერვერი როგორც წყარო',
            'Intl.NumberFormat ფასებისთვის და ფინანსური გამოთვლები',
            'Duplicate request prevention და შეცდომებისგან აღდგენა'
          ],
          stack: ['JavaScript', 'Fetch API', 'LocalStorage', 'JWT', 'CRUD', 'Intl'],
          deliver: 'დაჰოსტილი აპლიკაცია · Release notes v0.5'
        }
      ]
    },

    /* ------------------------------------------------------------------ 04 */
    {
      type: 'module', id: 'm04', n: '04',
      title: 'Angular-ის საფუძვლები, არქიტექტურა და მკაცრი ტიპიზაცია',
      en: 'Angular Core · TypeScript · Routing',
      range: [34, 40],
      summary: 'გადავდივართ ფრეიმვორქზე: standalone კომპონენტები, მკაცრი ტიპები, ბაინდინგები, კომპონენტებს შორის კომუნიკაცია და როუტინგი.',
      lectures: [
        {
          n: 34, t: 'Welcome to Angular, TS Setup & One-Way Binding',
          topics: [
            t('SPA კონცეფცია'),
            t('tsconfig.json და strict: true'),
            t('One-Way Binding', '{{ value }} და [property] — მონაცემი კლასიდან ტემპლეიტისკენ'),
            t('შესავალი TypeScript-ში', 'basic OOP classes')
          ]
        },
        {
          n: 35, t: 'Standalone Components, TS OOP Classes & All Other Bindings',
          topics: [
            t('Standalone არქიტექტურა'),
            t('TypeScript OOP', 'class · private · public · protected'),
            t('Interfaces', 'მონაცემთა მოდელირება'),
            t('ბაინდინგების ეკოსისტემა', 'Event Binding (click) · Two-way [(ngModel)] · [class.active]'),
            t('პრაქტიკა პროექტიდან', 'SRMS — სურათები, სერჩი და სხვ.')
          ]
        },
        {
          n: 36, t: 'Modern Control Flow, Structural Containers & Advanced TS Types',
          topics: [
            t('ახალი Control Flow', '@for · @if · @empty'),
            t('ნატივ ელემენტები vs სტრუქტურული კონტეინერები'),
            t('ng-container vs ng-template'),
            t('TypeScript Union Types', '|')
          ]
        },
        {
          n: 37, t: 'Component Communication: @Input() & Error Handling',
          topics: [
            t('@Input() მონაცემთა მილსადენი'),
            t('Safe Navigation', 'item?.price'),
            t('Nullish Coalescing', '??'),
            t('Feature Branching Strategy', 'git checkout -b · merge')
          ]
        },
        {
          n: 38, t: 'Component Communication: @Output() & Custom Events',
          topics: [
            t('Event Binding & EventEmitter'), t('.emit() მეთოდი'),
            t('Literal Types და Enums', 'შეკვეთის სტატუსების შეზღუდვა'),
            t('იზოლირებული კომუნიკაცია', '@Input() / @Output() ნაკადები')
          ]
        },
        {
          n: 39, t: 'Angular Router — ნავიგაციის არქიტექტურა',
          topics: [
            t('Route'), t('Router Outlet'), t('Router Link'), t('Route Parameter'),
            t('Query Parameter'), t('Wildcard Route'), t('Navigation vs UI State')
          ]
        },
        {
          n: 40, t: 'Dynamic Routing, Route Parameters & Children Routing',
          topics: [
            t('Nested / Children Routes'), t('Route Parameters'), t('ActivatedRoute')
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ 05 */
    {
      type: 'module', id: 'm05', n: '05',
      title: 'Services, HttpClient, CRUD, RxJS Observable',
      en: 'Dependency Injection · Streams · REST',
      range: [41, 47],
      summary: 'ლოგიკა გადადის სერვისებში, მონაცემი — ნაკადებში. DI, HttpClient, RxJS ოპერატორები და შეცდომებისგან აღდგენა.',
      lectures: [
        {
          n: 41, t: 'Angular Services & Dependency Injection',
          topics: [
            t('Dependency Injection პრინციპი'), t('@Injectable დეკორატორი'),
            t('Singleton სერვისები', "providedIn: 'root'"),
            t('Constructor Injection და inject()')
          ]
        },
        {
          n: 42, t: 'HttpClient და შეცდომების მართვა',
          topics: [
            t('HTTP პროტოკოლი და HttpClient'), t('get() მეთოდი'),
            t('Error Handling არქიტექტურა', 'try · catch · finally')
          ]
        },
        {
          n: 43, t: 'Introduction to RxJS Observables & Subscription მენეჯმენტი',
          topics: [
            t('რეაქტიული პროგრამირების საფუძვლები'), t('Observable'), t('Stream-ის კონცეფცია'),
            t('კომპონენტის სასიცოცხლო ციკლი', 'ngOnInit · ngOnChanges · ngOnDestroy'),
            t('Subscription Management')
          ]
        },
        {
          n: 44, t: 'Core RxJS Operators (map, filter), async Pipe',
          topics: [
            t('Pipes კონცეფცია'), t('ტრანსფორმაცია მუტაციის გარეშე'),
            t('Marble Diagrams'), t('async pipe-ის უპირატესობები')
          ]
        },
        {
          n: 45, t: 'Template და Reactive Forms',
          topics: [
            t('Template Driven Forms'),
            t('Reactive Forms', 'FormGroup · FormControl · FormBuilder')
          ]
        },
        {
          n: 46, t: 'Full CRUD Operations & Resource Mutations',
          topics: [
            t('REST არქიტექტურული პრინციპები', 'POST · PUT · DELETE ანატომია'),
            t('HttpParams'), t('ქეშის სინქრონიზაცია', '.reload() · .update()'),
            t('HTTP სტატუს კოდები')
          ]
        },
        {
          n: 47, t: 'Error Handling & Stream Recovery',
          topics: [
            t('ნაკადის დასრულება შეცდომით'),
            t('აღდგენის სტრატეგიები', 'retry · catchError')
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ 06 */
    {
      type: 'module', id: 'm06', n: '06',
      title: 'Signals და Signal Forms',
      en: 'Fine-grained Reactivity',
      range: [48, 51],
      summary: 'Angular-ის ახალი რეაქტიულობა: signal, computed, effect და სიგნალებზე აგებული ფორმები ვალიდაციით.',
      lectures: [
        {
          n: 48, t: 'Signals საფუძვლები',
          topics: [t('Angular Signals', 'set · update'), t('Signals vs Observable')]
        },
        {
          n: 49, t: 'Computed Signals, Effects & LocalStorage Persistence',
          topics: [
            t('computed() სიგნალები', 'read-only ბუნება · დამოკიდებულებების ავტომატური თრექინგი'),
            t('effect() ფუნქცია', 'სასიცოცხლო ციკლი'),
            t('ლოკალურ მეხსიერებასთან მუშაობა')
          ]
        },
        {
          n: 50, t: 'Modern Reactive Signal Forms, FormBuilder & TS Utility Types',
          topics: [
            t('Signal Forms ეკოსისტემა', 'SignalFormControl · SignalFormGroup'),
            t('საარქიტექტურო ევოლუცია', 'რით განსხვავდება ძველი FormGroup / RxJS მიდგომისგან'),
            t('TypeScript Utility Types', 'Required<T> · Readonly<T>')
          ]
        },
        {
          n: 51, t: 'Built-in & Custom Form Validators',
          topics: [
            t('Built-in Validators', 'Validators.required · Validators.pattern'),
            t('კონტროლის მდგომარეობები', 'pristine · dirty · touched · invalid'),
            t('კლიენტის ვალიდაციის ზღვარი', 'სერვერული ასინქრონული ვალიდაციის აუცილებლობა')
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ 07 */
    {
      type: 'module', id: 'm07', n: '07',
      title: 'Advanced OOP და სხვა „Injectable" ფაილები',
      en: 'Guards · Lazy Loading · Directives',
      range: [52, 54],
      summary: 'უსაფრთხოების ფენა, ბანდლის დაშლა და საკუთარი დირექტივები — აპლიკაცია მზადდება წარმოებისთვის.',
      lectures: [
        {
          n: 52, t: 'Functional Router Guards & Custom Type Guards',
          topics: [
            t('canActivate და Functional Router Guards'),
            t('Custom Type Guards ენტერპრაიზში')
          ]
        },
        {
          n: 53, t: 'Production Optimization: Lazy Loading & Deferrable Views',
          topics: [
            t('Bundle Splitting'),
            t('Initial Bundle Size', 'გავლენა SEO-სა და Core Web Vitals-ზე'),
            t('@defer თრიგერები', 'on viewport · on idle · on hover · when')
          ]
        },
        {
          n: 54, t: 'Custom Directives, Pipes & Utility Types',
          topics: [
            t('@Directive'), t('@Pipe და PipeTransform'),
            t('Utility Types', 'Partial<T> ნაწილობრივი მუტაციისთვის')
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ 08 */
    {
      type: 'module', id: 'm08', n: '08',
      title: 'Advanced Signals & RxJS',
      en: 'Zoneless · Interceptors · SignalStore',
      range: [55, 60],
      summary: 'ენტერპრაიზ დონე: zoneless რეაქტიულობა, stream switching, გლობალური state და HTTP middleware.',
      lectures: [
        {
          n: 55, t: 'Enterprise Performance: Advanced Signals API & Zoneless Angular',
          topics: [
            t('Advanced Signals API-ის ანატომია'),
            t('RxJS Interoperability', 'toSignal() · toObservable()'),
            t('untracked() ფუნქცია'), t('Fine-grained Zoneless Reactivity')
          ]
        },
        {
          n: 56, t: 'Advanced Signals vs Observable: switchMap & Stream Switching',
          topics: [
            t('Higher-order Observables'),
            t('switchMap · mergeMap · concatMap'), t('Flattening კონცეფცია')
          ]
        },
        {
          n: 57, t: 'Global State Services using Signals',
          topics: [
            t('Unidirectional Data Flow'), t('სიგნალის ექსპორტი', '.asReadonly()')
          ]
        },
        {
          n: 58, t: 'HTTP Middleware: Functional Interceptors & Global Error Resilience',
          topics: [
            t('Functional Interceptors', 'Request / Response Pipeline'),
            t('Request Immutability', 'req.clone()'),
            t('HttpErrorResponse ანატომია'),
            t('catchError და გლობალური ErrorHandler')
          ]
        },
        {
          n: 59, t: 'Next-Gen HTTP: rxResource API და HttpClient-ის სიმბიოზი',
          topics: [
            t('დეკლარაციული მოდელი', 'resource() · rxResource()'),
            t('TypeScript Generics', 'rxResource<Dish[], RequestType>'),
            t('ნატივი სიგნალები', '.isLoading · .error'),
            t('Change Detection ევოლუცია', 'OnPush რეჟიმი')
          ]
        },
        {
          n: 60, t: 'Enterprise State Management: NgRx SignalStore & Global Cart',
          topics: [
            t('Single Source of Truth'),
            t('SignalStore ანატომია', 'withState() · withMethods() · withComputed()'),
            t('State Immutability')
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ 09 */
    {
      type: 'module', id: 'm09', n: '09',
      title: 'Angular-ის დამატებითი თემები',
      en: 'UI Libraries · Internationalization',
      range: [61, 62],
      summary: 'მზა კომპონენტების ბიბლიოთეკა და მრავალენოვანი პროდუქტი — სისწრაფე ხარისხის დათმობის გარეშე.',
      lectures: [
        {
          n: 61, t: 'PrimeNG UI კომპონენტების ინტეგრაცია',
          topics: [
            t('UI Component Libraries'),
            t('კოდის მრავალჯერადი გამოყენება', 'Design Systems სტანდარტები')
          ]
        },
        {
          n: 62, t: 'ინტერნაციონალიზაცია (i18n) და ენების დინამიკური გადართვა',
          topics: [
            t('i18n და Localization'),
            t('Server-driven i18n-ის უპირატესობა'),
            t('@ngx-translate არქიტექტურა', 'TranslateService · TranslateLoader')
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ 10 */
    {
      type: 'module', id: 'm10', n: '10',
      title: 'Production-Grade Angular',
      en: 'Performance · Accessibility · SSR',
      range: [63, 65],
      summary: 'პროდუქტი, რომელიც არ „ჭედავს", რომელსაც კლავიატურით მართავ და რომელსაც Google ხედავს.',
      lectures: [
        {
          n: 63, t: 'Runtime Performance & Profiling — მენიუ, რომელიც არ „ჭედავს"',
          topics: [
            t('@for-ის track ფუნქცია', 'რატომ იშლება და ხელახლა იქმნება DOM მის გარეშე'),
            t('NgOptimizedImage', 'lazy loading · priority · srcset'),
            t('CDK Virtual Scroll', '500-ელემენტიანი მენიუ 20 DOM ნოუდით'),
            t('Angular DevTools Profiler', 'Change Detection ციკლების გაზომვა'),
            t('Lighthouse & Core Web Vitals', 'LCP · INP · CLS'),
            t('Garbage Collector და მეხსიერების გაჟონვა', 'Memory tab')
          ]
        },
        {
          n: 64, t: 'Accessibility & Angular CDK',
          topics: [
            t('a11y როგორც კანონისმიერი მოთხოვნა', 'EU Accessibility Act და ბიზნეს ღირებულება'),
            t('ARIA როლები და სემანტიკური HTML-ის დაბრუნება'),
            t('Focus Management', 'CDK FocusTrap · LiveAnnouncer'),
            t('CDK Overlay', 'კასტომ dropdown / popover'),
            t('CDK Drag & Drop', 'მაგიდების სქემის ინტერაქციული რედაქტორი'),
            t('Content Projection', 'Single-slot vs Multi-slot · select ატრიბუტი')
          ]
        },
        {
          n: 65, t: 'SSR & Hydration (@angular/ssr) — მენიუ, რომელსაც Google ხედავს',
          topics: [
            t('რას ხედავს Crawler-ი', 'რატომ ვერ ინდექსირდება SPA-ს მენიუ'),
            t('ng add @angular/ssr', 'SSR vs Prerendering (SSG) vs Client-Side'),
            t('Hydration და Incremental Hydration', '@defer-თან კომბინაციაში'),
            t('HttpTransferCache', 'ორმაგი HTTP მოთხოვნის არიდება'),
            t('პლატფორმის ხაფანგები', 'window · document · localStorage — isPlatformBrowser · afterNextRender'),
            t('SEO მეტა-თეგები', 'Title და Meta სერვისები')
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ 11 */
    {
      type: 'module', id: 'm11', n: '11',
      title: 'AI Service Integration (n8n), Testing & Cloud Deployment',
      en: 'Automation · Testing · CI/CD',
      range: [66, 72],
      summary: 'ფინალური მონაკვეთი: AI გეითვეი, მოვლენებზე დაფუძნებული ავტომატიზაცია, ავტოტესტები და ცოცხალი დეპლოი v1.0.0.',
      lectures: [
        {
          n: 66, t: 'AI Assistant Integration: Smart Restaurant Chatbot & n8n Gateway',
          topics: [
            t('Low-code პლატფორმები და Third-Party API Integration'),
            t('CORS პოლიტიკა და Angular Reverse Proxy'),
            t('AI Chatbot არქიტექტურა', 'Context Windows · Token Optimization'),
            t('Guardrails და System Prompts')
          ]
        },
        {
          n: 67, t: 'Operational Automation: Event-Driven B2B Notifications & Email Pipeline',
          topics: [
            t('Event-Driven Architecture ფრონტენდში'),
            t('Non-blocking API Calls და ფონური პროცესები'),
            t('ტექნიკური უსაფრთხოება', 'იმეილების გენერირება იზოლირებულ n8n Gateway-ზე')
          ]
        },
        {
          n: 68, t: 'The Testing Matrix: Unit Testing & DOM Verification',
          topics: [
            t('ტესტირების ფილოსოფია და TDD'),
            t('Jasmine სინტაქსი', 'describe · it · expect · beforeEach · Karma'),
            t('Angular TestBed', 'ComponentFixture · DebugElement'),
            t('ასინქრონული ტესტირება', 'fakeAsync · tick · waitForAsync'),
            t('Mocking', 'provideHttpClientTesting() · HttpTestingController')
          ]
        },
        {
          n: 69, t: 'Ultimate DevOps: Environments, Secret Isolation & CI/CD Live Launch',
          topics: [
            t('Dev vs Prod გარემოები'),
            t('სეკრეტების იზოლაცია კლიენტის მხარეს'),
            t('dist/ ანატომია', 'AOT კომპილაცია · მინიფიკაცია · Tree-shaking'),
            t('SPA Fallback Redirects Cloud სერვერებზე'),
            t('CI/CD და სემანტიკური ვერსიონირება', 'SemVer · v1.0.0')
          ]
        },
        { n: 70, t: 'სარეზერვო ლექცია', kind: 'review', topics: [t('Buffer / Deep dive')] },
        { n: 71, t: 'საფინალო პროექტის განხილვა — განვითარება', kind: 'review', topics: [t('Architecture Review')] },
        { n: 72, t: 'საფინალო პროექტის წარდგენა', kind: 'milestone', topics: [t('Final Defense')] }
      ]
    },

    /* --------------------------------------------------------- CHECKPOINT 3 */
    {
      type: 'checkpoint', id: 'cp3', release: 'v1.0.0',
      label: 'Production Platform',
      stage: 'ეტაპი 03 — Angular',
      when: 'ლექცია 71 — 72',
      title: 'საფინალო რელიზი',
      lead: 'ბოლო ვერსია Angular-ზე: signals-ზე აგებული state, SSR, ტესტები, AI ასისტენტი და CI/CD-ით გაშვებული v1.0.0. ქვემოთ ლინკები ზუსტად იმ პროდუქტებზეა, სადაც უნდა მიხვიდე.',
      projects: [
        {
          tag: 'HORECA', mock: 'grid',
          title: 'Restaurant',
          demo: { url: 'https://restaurant.stepacademy.ge/', label: 'restaurant.stepacademy.ge' },
          pitch: 'სრული პროდუქტი: მენიუ, კალათა, შეკვეთები, ადმინ პანელი და AI ასისტენტი ერთ არქიტექტურაში.',
          points: [
            'NgRx SignalStore — გლობალური cart და single source of truth',
            'SSR + Incremental Hydration SEO-სთვის',
            'AI chatbot n8n gateway-ით და guardrails-ით',
            'Jasmine/TestBed ტესტები და CI/CD გაშვება'
          ],
          stack: ['Angular', 'Signals', 'RxJS', 'SSR', 'NgRx', 'n8n', 'Jasmine', 'CI/CD'],
          deliver: 'ცოცხალი დომენი · v1.0.0 რელიზი · ტესტების რეპორტი'
        },
        {
          tag: 'TRANSPORT', mock: 'list',
          title: 'Trains',
          demo: { url: 'https://trains.stepacademy.ge/trains', label: 'trains.stepacademy.ge' },
          pitch: 'ჯავშნების სისტემა მარშრუტების ძიებით, ვაგონის ინტერაქციული სქემითა და რეალურ დროსთან მიახლოებული სტატუსებით.',
          points: [
            'rxResource() — მარშრუტების დეკლარაციული ჩატვირთვა',
            'Signal Forms კასტომ ვალიდატორებით',
            'CDK Virtual Scroll და Drag & Drop ადგილების სქემაზე',
            'a11y — FocusTrap, LiveAnnouncer, კლავიატურა'
          ],
          stack: ['Angular', 'Signal Forms', 'CDK', 'rxResource', 'a11y'],
          deliver: 'დაჰოსტილი სისტემა · ტესტები · SemVer ტეგები'
        },
        {
          tag: 'E-COMMERCE', mock: 'dash',
          title: 'Shop',
          demo: { url: 'https://shop.stepacademy.ge/', label: 'shop.stepacademy.ge' },
          pitch: 'მაღაზია ადმინ პანელით: დიდი ცხრილები, როლები, ანალიტიკა და მრავალენოვანი ინტერფეისი.',
          points: [
            'CDK Virtual Scroll ათასობით ჩანაწერზე',
            'Functional guards და RBAC ნავიგაცია',
            'Interceptors — auth, retry, გლობალური შეცდომები',
            'i18n და Core Web Vitals აუდიტი'
          ],
          stack: ['Angular', 'CDK', 'Interceptors', 'i18n', 'PrimeNG', 'SSR'],
          deliver: 'დეპლოიმენტი · Lighthouse აუდიტი · დოკუმენტაცია'
        }
      ]
    }
  ];

  /* outcomes — what the student owns at the end */
  APP.OUTCOMES = [
    { k: 'Product Thinking', v: 'მოთხოვნას ყოფ ფუნქციებად, წესებად და acceptance criteria-დ, სანამ ერთ ხაზს დაწერ.' },
    { k: 'Interface Craft', v: 'სემანტიკური, რესპონსიული და ხელმისაწვდომი ინტერფეისი დიზაინ-ტოკენებზე.' },
    { k: 'JavaScript Core', v: 'DOM, async, immutability და მოდულური არქიტექტურა ფრეიმვორქის გარეშე.' },
    { k: 'Angular Architecture', v: 'Standalone კომპონენტები, DI, RxJS და Signals ერთ სისტემაში.' },
    { k: 'Performance & a11y', v: 'Core Web Vitals, virtual scroll, SSR და კლავიატურით სრული კონტროლი.' },
    { k: 'AI-Native Workflow', v: 'AI როგორც copilot — კონტექსტი, ვერიფიკაცია და გეითვეი ინტეგრაციები.' },
    { k: 'Testing', v: 'Jasmine, TestBed და ასინქრონული ტესტირება როგორც ნორმა.' },
    { k: 'Shipping', v: 'Git, რელიზები, CI/CD და SemVer — კოდი, რომელიც პროდაქშენში ცხოვრობს.' }
  ];

})(window.APP = window.APP || {});
