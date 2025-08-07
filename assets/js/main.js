/**
 * Main JavaScript file for the portfolio website.
 * Handles navigation, animations, and multi-language support.
 */
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    const navbar = select('#navbar');
    navbar.classList.toggle('navbar-mobile');
    
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');

    // Remove attention animation on click
    this.classList.remove('attention-animation');
  });

  /**
   * Add animation to menu icon on load
   */
  window.addEventListener('load', () => {
    const menuIcon = select('.mobile-nav-toggle');
    if (menuIcon) {
      menuIcon.classList.add('attention-animation');
    }
  });

  /**
   * Scroll with offset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Portfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /**
   * Language translation logic
   */
  document.addEventListener("DOMContentLoaded", function() {
    const translations = {
      en: {
        page_title: "Saeed Masoudi's personal website | Python and Django developer",
        meta_description: "I am Saeed Masoudi, a Python and Django developer. This is my personal website where I present my portfolio, skills, and services.",
        og_title: "Saeed Masoudi's personal website",
        og_description: "I am Saeed Masoudi, a Python and Django developer. You can learn more about me and my skills here.",
        twitter_title: "Saeed Masoudi's personal website",
        twitter_description: "I'm Saeed Masoudi, a Python and Django developer. You can learn more about me and my skills here.",
        header_title: "Saeed Masoudi",
        header_subtitle: "I am a <span>freelancer and Python developer</span> and interested in learning more",
        nav_home: "Home",
        nav_about: "About Me",
        nav_resume: "Resume",
        nav_services: "Services",
        nav_portfolio: "Portfolio",
        nav_contact: "Contact Me",
        nav_donate: "Donate",
        about_me_title: "About Me",
        about_me_subtitle: "Learn More About Me",
        about_me_heading: "Web Developer, Python and Artificial Intelligence",
        about_me_text1: "Fully proficient in the Django framework as a web developer in the Python framework, the API interface and the POSTGRE database, and is learning the knowledge of artificial intelligence and more and more...",
        about_me_age: "Age:",
        about_me_actual_age:"26 years",
        about_me_website: "Personal website:",
        about_me_blog: "Blog:",
        about_me_blog_value: "Coming soon",
        about_me_languages: "Languages:",
        about_me_languages_value: "English, Persian",
        about_me_learning: "Learning:",
        about_me_learning_value: "Ai Frameworks",
        about_me_education: "Education:",
        about_me_education_value: "Bachelor's Degree",
        about_me_email: "Email:",
        about_me_freelance: "Freelance Status:",
        about_me_freelance_value: "Available",
        about_me_text2: "My passion for programming began in childhood, but due to limited resources, I was forced to take a different path for a while. After pursuing an unrelated academic field and facing various challenges, I eventually returned to my true interest Python development. Today, I am fully committed to this field, continuously learning and growing with determination and purpose.",
        counts_customers: "Customers",
        counts_projects: "Projects",
        counts_support: "Support hours",
        counts_awards: "Awards",
        skills_title: "Skills",
        interests_title: "Interests",
        interests_web_design: "Web Design",
        interests_software_dev: "Windows Software Development",
        interests_gaming: "Gaming",
        interests_network_security: "Network and Security",
        interests_databases: "Databases",
        interests_program_scripts: "Program Scripts",
        interests_ai: "Artificial Intelligence",
        interests_robots: "Robots",
        resume_title: "Resume",
        resume_subtitle: "Take a look at my resume",
        resume_download_button: "Download Resume",
        resume_summary_title: "Summary",
        resume_summary_name: "Saeed Masoudi",
        resume_summary_text: "Interested in web, programming and game development, born in Gorgan.",
        resume_summary_address: "Iran, Golestan, Gorgan...",
        resume_education_title: "Education",
        resume_education_associate: "Associate",
        resume_education_associate_date: "2017 - 2019",
        resume_education_associate_university: "University No. 1 of Sari",
        resume_education_associate_duration: "For 2 years",
        resume_education_bachelor: "Bachelor's Degree",
        resume_education_bachelor_date: "2019 - 2021",
        resume_education_bachelor_university: "University of Gorgan",
        resume_education_bachelor_duration: "For 2 years",
        resume_experience_title: "Professional Work History",
        resume_experience_voip: "VoIP and IT support",
        resume_experience_voip_date: "2021",
        resume_experience_voip_location: "Remote",
        resume_experience_voip_details: "<ul><li>In Company 5040 Tehran</li><li>VoIP and IT support for company employees</li><li>For 1 year</li></ul>",
        resume_experience_store: "Online store building project",
        resume_experience_store_date: "2025",
        resume_experience_store_location: "Remote",
        resume_experience_store_details: "<ul><li>First big work experience in website development using Django and API architecture</li><li>Although I had no experience in this field, with hard work and perseverance I managed to support the front-end and back-end.</li><li>First introduction to Jquery, JS, AJAX languages</li><li>Completion of the project in the same year without any cost to gain experience</li></ul>",
        services_title: "Services",
        services_subtitle: "Available Services",
        services_shopping_website_title: "Shopping Website Design",
        services_shopping_website_text: "All physical goods store websites come with high security, optimization, SEO, and special features such as REST API to connect the website to the mobile app",
        services_admin_panel_title: "Admin and Management Panel Design",
        services_admin_panel_text: "Management and accounting panels and special solutions such as a special panel for controlling the transportation of goods and tracking, and APIs for transferring data over the Internet, and another example, managing students back to school",
        services_special_features_title: "Websites with special features",
        services_special_features_text: "Some websites need a number of features for further simplification, such as a medical clinic site with online appointment scheduling, etc.",
        services_python_apps_title: "Python Apps",
        services_python_apps_text: "All programs in the Python platform as solutions for other programs or better optimization of software and apps in the Python platform",
        services_telegram_bots_title: "Telegram bots on Python",
        services_telegram_bots_text: "Today, most companies use mobile apps like Telegram to manage their data for better and easier communication",
        services_new_solutions_title: "New Solutions",
        services_new_solutions_text: "Providing services to organizations and private websites for website optimization and two-way advertising",
        portfolio_title: "Portfolio",
        portfolio_subtitle: "My projects",
        portfolio_filter_all: "All",
        portfolio_filter_website: "Website",
        portfolio_filter_javascript: "JavaScript",
        portfolio_filter_ai: "AI",
        portfolio_filter_application: "Application",
        portfolio_project1_title: "Django-Python Online Store Project",
        portfolio_project1_description: "Multipurpose store with full features, multiple payment gateways, high security and optimal security",
        portfolio_project2_title: "Real-Time Communication Platform Built with Django",
        portfolio_project2_description: "Communication website project using Django, Webrtc",
        portfolio_project3_title: "Weather JavaScript Project",
        portfolio_project3_description: "Weather widget with Persian and Chinese numbers, languages English, Persian, Russian, very simple and practical",
        portfolio_project4_title: "PySheetX program based on Python and artificial intelligence",
        portfolio_project4_description: "PySheetX is a Python-based application that integrates with Google Sheets and OpenAI's GPT models to automate data management and analysis.",
        portfolio_project5_title: "PIDM - Python Internet Download Manager",
        portfolio_project5_description: "PIDM is a powerful and modern internet download manager written in Python using PySide6 (Qt). It features advanced queue handling, browser extension integration, metadata prefetching, resume support, and a clean, theme-aware GUI.",
        contact_title: "Contact me",
        contact_subtitle: "Communications",
        contact_address_title: "My address",
        contact_address_text: "Iran, Golestan Province, Gorgan City",
        contact_social_title: "Social Links",
        contact_email_title: "Personal Email",
        contact_phone_title: "Contact Number",
        contact_form_name_placeholder: "your name",
        contact_form_email_placeholder: "Email address",
        contact_form_subject_placeholder: "subject",
        contact_form_message_placeholder: "message text",
        contact_form_loading: "Loading",
        contact_form_sent_message: "Your message has been sent. Thank you!",
        contact_form_submit_button: "Send message",
        credits: "Designed by <a href=\"\">Saeed Masoudi </a>",
        
        // Project Details Pages
        project_page_title: "Saeed Masoudi's personal website",
        project_description_title: "Project Description",

        // 404 page
        fourofour_page_title:"Page Not Found - 404",
        fourofour_page_header_title:"404",
        fourofour_page_header_content:"Sorry, the page you are looking for was not found.",
        fourofour_page_button:"Return to home page",

        // donate page
        donation_page_main_title:"Donate - Saeed Masoudi",
        donation_page_title:"Support My Work",
        donation_page_subtitle:"Your contribution helps me continue developing and sharing open-source projects.",
        donation_iranian_title:"Donate via Iranian Gateway",
        donation_iranian_text:"For users inside Iran, you can use the secure payment portal to donate using your credit card.",
        donation_iranian_button:"Go to Payment Portal",
        donation_crypto_title:"Donate with Cryptocurrency",
        donation_crypto_text:"You can also support me by sending cryptocurrency to one of the wallet addresses below.",
        donation_page_home_button:"&larr; Back to Home",
        
        
        // Demo 1: Online Store
        project_demo1_title: "Online store designed with Django",
        project_demo1_category: "<strong>Category</strong>: Web Design",
        project_demo1_client: "<strong>Client</strong>: Portfolio",
        project_demo1_date: "<strong>Project Date</strong>: March 2025",
        project_demo1_demolink: "<strong>Demo Link</strong>: <a href=\"https://demo1.saeedmasoudie.ir/\" target=\"_blank\">demo1.saeedmasoudie.ir</a>",
        project_demo1_offline_note: "<a href=\"index.html#contact\">If the demo is offline, request a demo by contacting me</a>",
        project_demo1_description: "This website is written in the Python programming language and has features such as: multi-purpose website, product features such as size and color, features can have different prices and discounts from the main product, discounts can be time-limited and at the end of the discount period, discount coupons with limited use and time, small size and optimized codes for better speed, high security for both spam and bots, API capability for connecting to external programs, personal management panel with details and reports and dashboard, sales and visit reports with presentation table, ability to put the site in reconstruction mode by management, and ...",

        // Demo 2: PyComms
        project_demo2_title: "Real-Time Communication Platform Built with Django",
        project_demo2_category: "<strong>Category</strong>: Web Design",
        project_demo2_client: "<strong>Client</strong>: Portfolio",
        project_demo2_date: "<strong>Project Date</strong>: March 2025",
        project_demo2_language: "<strong>Project Language</strong>: English",
        project_demo2_demolink: "<strong>Demo Link</strong>: <a href=\"#\" target=\"_blank\">None</a>",
        project_demo2_githublink: "<strong>GitHub Link</strong>: <a href=\"https://github.com/saeedmasoudie/pycomms\" target=\"_blank\">PyComms</a>",
        project_demo2_description: "An instant communication platform for connecting multiple users with voice communication and voice and chat messages using the webrtc and django channels architecture. The project is fully tested but executable, current capabilities: Create a channel with a password to connect to Channel Save channel messages Change user profile User information settings Get ping from user and display it to all channel users Change the volume of users in the channel Mute and unmute microphone and sound Not implemented features: Private message between users Private call between users Friend list Add new friend or delete teams Website management Channel management such as removing a user from the channel by the channel administrator Block users",

        // PySheetX
        project_pysheetx_title: "PySheetX program based on Python and artificial intelligence",
        project_pysheetx_category: "<strong>Category</strong>: Artificial Intelligence",
        project_pysheetx_client: "<strong>Client</strong>: Portfolio",
        project_pysheetx_date: "<strong>Project Date</strong>: April 2024",
        project_pysheetx_demolink: "<strong>Demo Link</strong>: <a href=\"https://github.com/saeedmasoudie/pysheetx\" target=\"_blank\">Github</a>",
        project_pysheetx_description: "PySheetX is a Python-based application that integrates with Google Sheets and OpenAI's GPT models to automate data management and analysis. It enables users to interact with Google Sheets by providing an easy-to-use interface that connects to the Google Sheets API and allows AI-based queries to manipulate data in the spreadsheet.",

        // PIDM
        project_pidm_title: "PIDM - Python Internet Download Manager",
        project_pidm_category: "<strong>Category</strong>: Software",
        project_pidm_client: "<strong>Client</strong>: Portfolio",
        project_pidm_date: "<strong>Project Date</strong>: May 2025",
        project_pidm_demolink: "<strong>Demo Link</strong>: <a href=\"https://github.com/saeedmasoudie/PIDM\" target=\"_blank\">Github</a>",
        project_pidm_description: "PIDM is a powerful and modern internet download manager written in Python using PySide6 (Qt). It features advanced queue handling, browser extension integration, metadata prefetching, resume support, and a clean, theme-aware GUI.",

        // Widget-JS
        project_widgetjs_title: "Weather widget for website",
        project_widgetjs_category: "<strong>Category</strong>: Web Design",
        project_widgetjs_client: "<strong>Client</strong>: Portfolio",
        project_widgetjs_date: "<strong>Project Date</strong>: March 2024",
        project_widgetjs_demolink: "<strong>Demo Link</strong>: <a href=\"https://github.com/saeedmasoudie/weather-widget\" target=\"_blank\">Github</a>",
        project_widgetjs_description: "Displays the weather for today and the next few days, along with right-clicks and Persian numbers, without the need for registration and completely simple. Tutorials are posted on GitHub"
      },
      fa: {
        page_title: "وب سایت شخصی سعید مسعودی | توسعه دهنده پایتون و جنگو",
        meta_description: "من سعید مسعودی، توسعه دهنده پایتون و جنگو هستم. این وب سایت شخصی من است که در آن نمونه کارها، مهارت ها و خدمات خود را ارائه می دهم.",
        og_title: "وب سایت شخصی سعید مسعودی",
        og_description: "من سعید مسعودی، توسعه دهنده پایتون و جنگو هستم. در اینجا می توانید اطلاعات بیشتری در مورد من و مهارت های من کسب کنید.",
        twitter_title: "وب سایت شخصی سعید مسعودی",
        twitter_description: "من سعید مسودی هستم، یک توسعه دهنده پایتون و جنگو. در اینجا می توانید اطلاعات بیشتری در مورد من و مهارت های من کسب کنید.",
        header_title: "سعید مسعودی",
        header_subtitle: "من یک <span>فریلنسر و توسعه دهنده پایتون</span> هستم و علاقه مند به یادگیری بیشتر هستم",
        nav_home: "خانه",
        nav_about: "درباره من",
        nav_resume: "رزومه",
        nav_services: "خدمات",
        nav_portfolio: "نمونه کارها",
        nav_contact: "تماس با من",
        nav_donate: "حمایت مالی",
        about_me_title: "درباره من",
        about_me_subtitle: "بیشتر درباره من بدانید",
        about_me_heading: "توسعه دهنده وب، پایتون و هوش مصنوعی",
        about_me_text1: "تسلط کامل بر فریمورک جنگو به عنوان توسعه دهنده وب در فریمورک پایتون، رابط API و پایگاه داده POSTGRE و در حال یادگیری دانش هوش مصنوعی و بیشتر و بیشتر...",
        about_me_age: "سن:",
        about_me_actual_age:"۲۶ سال",
        about_me_website: "وب سایت شخصی:",
        about_me_blog: "وبلاگ:",
        about_me_blog_value: "به زودی",
        about_me_languages: "زبان ها:",
        about_me_languages_value: "انگلیسی، فارسی",
        about_me_learning: "در حال یادگیری:",
        about_me_learning_value: "فریمورک های هوش مصنوعی",
        about_me_education: "تحصیلات:",
        about_me_education_value: "مدرک کارشناسی",
        about_me_email: "ایمیل:",
        about_me_freelance: "وضعیت فریلنسری:",
        about_me_freelance_value: "در دسترس",
        about_me_text2: "علاقه من به برنامه نویسی از کودکی شروع شد، اما به دلیل منابع محدود، مجبور شدم برای مدتی مسیر دیگری را در پیش بگیرم. پس از دنبال کردن یک رشته دانشگاهی نامرتبط و مواجهه با چالش های مختلف، سرانجام به علاقه واقعی خود یعنی توسعه پایتون بازگشتم. امروز، من کاملاً به این رشته متعهد هستم و با عزم و اراده به طور مداوم در حال یادگیری و رشد هستم.",
        counts_customers: "مشتریان",
        counts_projects: "پروژه ها",
        counts_support: "ساعات پشتیبانی",
        counts_awards: "جوایز",
        skills_title: "مهارت ها",
        interests_title: "علایق",
        interests_web_design: "طراحی وب",
        interests_software_dev: "توسعه نرم افزار ویندوز",
        interests_gaming: "بازی",
        interests_network_security: "شبکه و امنیت",
        interests_databases: "پایگاه های داده",
        interests_program_scripts: "اسکریپت های برنامه",
        interests_ai: "هوش مصنوعی",
        interests_robots: "ربات ها",
        resume_title: "رزومه",
        resume_subtitle: "نگاهی به رزومه من بیندازید",
        resume_download_button: "دانلود رزومه",
        resume_summary_title: "خلاصه",
        resume_summary_name: "سعید مسعودی",
        resume_summary_text: "علاقه مند به توسعه وب، برنامه نویسی و بازی، متولد گرگان.",
        resume_summary_address: "ایران، گلستان، گرگان...",
        resume_education_title: "تحصیلات",
        resume_education_associate: "کاردانی",
        resume_education_associate_date: "۱۳۹۶ - ۱۳۹۸",
        resume_education_associate_university: "دانشگاه شماره ۱ ساری",
        resume_education_associate_duration: "به مدت ۲ سال",
        resume_education_bachelor: "مدرک کارشناسی",
        resume_education_bachelor_date: "۱۳۹۸ - ۱۴۰۰",
        resume_education_bachelor_university: "دانشگاه گرگان",
        resume_education_bachelor_duration: "به مدت ۲ سال",
        resume_experience_title: "سوابق کاری حرفه ای",
        resume_experience_voip: "پشتیبانی VoIP و IT",
        resume_experience_voip_date: "۱۴۰۰",
        resume_experience_voip_location: "ریموت",
        resume_experience_voip_details: "<ul><li>در شرکت ۵۰۴۰ تهران</li><li>پشتیبانی VoIP و IT برای کارمندان شرکت</li><li>به مدت ۱ سال</li></ul>",
        resume_experience_store: "پروژه ساخت فروشگاه آنلاین",
        resume_experience_store_date: "۱۴۰۴",
        resume_experience_store_location: "ریموت",
        resume_experience_store_details: "<ul><li>اولین تجربه کاری بزرگ در توسعه وب سایت با استفاده از جنگو و معماری API</li><li>اگرچه من تجربه ای در این زمینه نداشتم، اما با سخت کوشی و پشتکار موفق به پشتیبانی از فرانت اند و بک اند شدم.</li><li>اولین آشنایی با زبان های Jquery، JS، AJAX</li><li>تکمیل پروژه در همان سال بدون هیچ هزینه ای برای کسب تجربه</li></ul>",
        services_title: "خدمات",
        services_subtitle: "خدمات موجود",
        services_shopping_website_title: "طراحی وب سایت فروشگاهی",
        services_shopping_website_text: "تمامی وب سایت های فروشگاه کالاهای فیزیکی با امنیت بالا، بهینه سازی، سئو و امکانات ویژه ای مانند REST API برای اتصال وب سایت به اپلیکیشن موبایل ارائه می شوند.",
        services_admin_panel_title: "طراحی پنل مدیریت و ادمین",
        services_admin_panel_text: "پنل های مدیریتی و حسابداری و راهکارهای ویژه ای مانند پنل ویژه کنترل حمل و نقل کالا و رهگیری و API برای انتقال داده ها از طریق اینترنت و نمونه دیگر مدیریت دانش آموزان بازگشتی به مدرسه",
        services_special_features_title: "وب سایت هایی با امکانات ویژه",
        services_special_features_text: "برخی از وب سایت ها برای ساده سازی بیشتر به تعدادی ویژگی نیاز دارند، مانند سایت کلینیک پزشکی با امکان نوبت دهی آنلاین و غیره.",
        services_python_apps_title: "برنامه های پایتون",
        services_python_apps_text: "همه برنامه ها در پلتفرم پایتون به عنوان راه حل برای برنامه های دیگر یا بهینه سازی بهتر نرم افزار و برنامه ها در پلتفرم پایتون",
        services_telegram_bots_title: "ربات های تلگرام در پایتون",
        services_telegram_bots_text: "امروزه اکثر شرکت ها برای مدیریت داده های خود برای ارتباط بهتر و آسان تر از اپلیکیشن های موبایلی مانند تلگرام استفاده می کنند.",
        services_new_solutions_title: "راه حل های جدید",
        services_new_solutions_text: "ارائه خدمات به سازمان ها و وب سایت های خصوصی برای بهینه سازی وب سایت و تبلیغات دو طرفه",
        portfolio_title: "نمونه کارها",
        portfolio_subtitle: "پروژه های من",
        portfolio_filter_all: "همه",
        portfolio_filter_website: "وب سایت",
        portfolio_filter_javascript: "جاوا اسکریپت",
        portfolio_filter_ai: "هوش مصنوعی",
        portfolio_filter_application: "اپلیکیشن",
        portfolio_project1_title: "پروژه فروشگاه آنلاین جنگو-پایتون",
        portfolio_project1_description: "فروشگاه چند منظوره با امکانات کامل، درگاه های پرداخت متعدد، امنیت بالا و امنیت بهینه",
        portfolio_project2_title: "پلتفرم ارتباطی بلادرنگ ساخته شده با جنگو",
        portfolio_project2_description: "پروژه وب سایت ارتباطی با استفاده از جنگو، Webrtc",
        portfolio_project3_title: "پروژه جاوا اسکریپت آب و هوا",
        portfolio_project3_description: "ویجت آب و هوا با اعداد فارسی و چینی، زبان های انگلیسی، فارسی، روسی، بسیار ساده و کاربردی",
        portfolio_project4_title: "برنامه PySheetX مبتنی بر پایتون و هوش مصنوعی",
        portfolio_project4_description: "PySheetX یک برنامه مبتنی بر پایتون است که با Google Sheets و مدل های GPT OpenAI برای خودکارسازی مدیریت و تجزیه و تحلیل داده ها یکپارچه شده است.",
        portfolio_project5_title: "PIDM - مدیر دانلود اینترنت پایتون",
        portfolio_project5_description: "PIDM یک مدیر دانلود اینترنتی قدرتمند و مدرن است که با پایتون با استفاده از PySide6 (Qt) نوشته شده است. این برنامه دارای مدیریت صف پیشرفته، یکپارچه سازی افزونه مرورگر، واکشی فراداده، پشتیبانی از رزومه و یک رابط کاربری گرافیکی تمیز و آگاه از تم است.",
        contact_title: "تماس با من",
        contact_subtitle: "ارتباطات",
        contact_address_title: "آدرس من",
        contact_address_text: "ایران، استان گلستان، شهر گرگان",
        contact_social_title: "لینک های اجتماعی",
        contact_email_title: "ایمیل شخصی",
        contact_phone_title: "شماره تماس",
        contact_form_name_placeholder: "نام شما",
        contact_form_email_placeholder: "آدرس ایمیل",
        contact_form_subject_placeholder: "موضوع",
        contact_form_message_placeholder: "متن پیام",
        contact_form_loading: "در حال بارگذاری",
        contact_form_sent_message: "پیام شما ارسال شد. متشکرم!",
        contact_form_submit_button: "ارسال پیام",
        credits: "طراحی شده توسط <a href=\"\">سعید مسعودی</a>",

        // Project Details Pages
        project_page_title: "وب سایت شخصی سعید مسعودی",
        project_description_title: "توضیحات پروژه",

        // 404 page
        fourofour_page_title:"صفحه یافت نشد - ۴۰۴",
        fourofour_page_header_title:"۴۰۴",
        fourofour_page_header_content:"متاسفیم، صفحه مورد نظر شما یافت نشد.",
        fourofour_page_button:"بازگشت به صفحه اصلی",

        // donate page
        donation_page_main_title:"حمایت مالی - سعید مسعودی",
        donation_page_title:"از کار من حمایت کنید",
        donation_page_subtitle:"مشارکت شما به من کمک می‌کند تا به توسعه و اشتراک‌ گذاری پروژه‌های متن‌باز ادامه دهم.",
        donation_iranian_title:"حمایت از طریق درگاه پرداخت",
        donation_iranian_text:"برای کاربران داخل ایران، می‌توانید از درگاه پرداخت امن برای کمک مالی با استفاده از کارت اعتباری خود استفاده کنید.",
        donation_iranian_button:"به درگاه پرداخت بروید",
        donation_crypto_title:"حمایت با ارز دیجیتال",
        donation_crypto_text:"همچنین می‌توانید با ارسال ارز دیجیتال به یکی از آدرس ‌های کیف پول زیر از من حمایت کنید.",
        donation_page_home_button:"&larr; بازگشت به صفحه اصلی",

        // Demo 1: Online Store
        project_demo1_title: "فروشگاه آنلاین طراحی شده با جنگو",
        project_demo1_category: "<strong>دسته بندی</strong>: طراحی وب",
        project_demo1_client: "<strong>مشتری</strong>: نمونه کار",
        project_demo1_date: "<strong>تاریخ پروژه</strong>: اسفند ۱۴۰۳",
        project_demo1_demolink: "<strong>لینک دمو</strong>: <a href=\"https://demo1.saeedmasoudie.ir/\" target=\"_blank\">demo1.saeedmasoudie.ir</a>",
        project_demo1_offline_note: "<a href=\"index.html#contact\">اگر دمو آفلاین است، با من تماس بگیرید و درخواست دمو کنید</a>",
        project_demo1_description: "این وب سایت با زبان برنامه نویسی پایتون نوشته شده است و دارای ویژگی هایی مانند: وب سایت چند منظوره، ویژگی های محصول مانند اندازه و رنگ، ویژگی ها می توانند قیمت ها و تخفیف های متفاوتی از محصول اصلی داشته باشند، تخفیف ها می توانند محدود به زمان باشند و در پایان دوره تخفیف، کوپن های تخفیف با استفاده و زمان محدود، حجم کم و کدهای بهینه شده برای سرعت بهتر، امنیت بالا برای هرزنامه و ربات ها، قابلیت API برای اتصال به برنامه های خارجی، پنل مدیریت شخصی با جزئیات و گزارشات و داشبورد، گزارشات فروش و بازدید با جدول ارائه، امکان قرار دادن سایت در حالت بازسازی توسط مدیریت و ...",

        // Demo 2: PyComms
        project_demo2_title: "پلتفرم ارتباطی بلادرنگ ساخته شده با جنگو",
        project_demo2_category: "<strong>دسته بندی</strong>: طراحی وب",
        project_demo2_client: "<strong>مشتری</strong>: نمونه کار",
        project_demo2_date: "<strong>تاریخ پروژه</strong>: اسفند ۱۴۰۳",
        project_demo2_language: "<strong>زبان پروژه</strong>: انگلیسی",
        project_demo2_demolink: "<strong>لینک دمو</strong>: <a href=\"#\" target=\"_blank\">ندارد</a>",
        project_demo2_githublink: "<strong>لینک گیت هاب</strong>: <a href=\"https://github.com/saeedmasoudie/pycomms\" target=\"_blank\">PyComms</a>",
        project_demo2_description: "یک پلتفرم ارتباطی فوری برای اتصال چندین کاربر با ارتباط صوتی و پیام های صوتی و چت با استفاده از معماری webrtc و کانال های جنگو. پروژه به طور کامل تست شده اما قابل اجرا است، قابلیت های فعلی: ایجاد یک کانال با رمز عبور برای اتصال به کانال ذخیره پیام های کانال تغییر پروفایل کاربر تنظیمات اطلاعات کاربر دریافت پینگ از کاربر و نمایش آن به تمام کاربران کانال تغییر حجم صدای کاربران در کانال بی صدا کردن و باصدا کردن میکروفون و صدا ویژگی های پیاده سازی نشده: پیام خصوصی بین کاربران تماس خصوصی بین کاربران لیست دوستان افزودن دوست جدید یا حذف تیم ها مدیریت وب سایت مدیریت کانال مانند حذف یک کاربر از کانال توسط مدیر کانال مسدود کردن کاربران",

        // PySheetX
        project_pysheetx_title: "برنامه PySheetX مبتنی بر پایتون و هوش مصنوعی",
        project_pysheetx_category: "<strong>دسته بندی</strong>: هوش مصنوعی",
        project_pysheetx_client: "<strong>مشتری</strong>: نمونه کار",
        project_pysheetx_date: "<strong>تاریخ پروژه</strong>: فروردین ۱۴۰۴",
        project_pysheetx_demolink: "<strong>لینک دمو</strong>: <a href=\"https://github.com/saeedmasoudie/pysheetx\" target=\"_blank\">Github</a>",
        project_pysheetx_description: "PySheetX یک برنامه مبتنی بر پایتون است که با Google Sheets و مدل های GPT OpenAI برای خودکارسازی مدیریت و تجزیه و تحلیل داده ها یکپارچه شده است. این برنامه به کاربران امکان می دهد با ارائه یک رابط کاربری آسان که به API Google Sheets متصل می شود و به پرس و جوهای مبتنی بر هوش مصنوعی برای دستکاری داده ها در صفحه گسترده اجازه می دهد، با Google Sheets تعامل داشته باشند.",

        // PIDM
        project_pidm_title: "PIDM - مدیر دانلود اینترنت پایتون",
        project_pidm_category: "<strong>دسته بندی</strong>: نرم افزار",
        project_pidm_client: "<strong>مشتری</strong>: نمونه کار",
        project_pidm_date: "<strong>تاریخ پروژه</strong>: اردیبهشت ۱۴۰۴",
        project_pidm_demolink: "<strong>لینک دمو</strong>: <a href=\"https://github.com/saeedmasoudie/PIDM\" target=\"_blank\">Github</a>",
        project_pidm_description: "PIDM یک مدیر دانلود اینترنتی قدرتمند و مدرن است که با پایتون با استفاده از PySide6 (Qt) نوشته شده است. این برنامه دارای مدیریت صف پیشرفته، یکپارچه سازی افزونه مرورگر، واکشی فراداده، پشتیبانی از رزومه و یک رابط کاربری گرافیکی تمیز و آگاه از تم است.",
        
        // Widget-JS
        project_widgetjs_title: "ویجت آب و هوا برای وب سایت",
        project_widgetjs_category: "<strong>دسته بندی</strong>: طراحی وب",
        project_widgetjs_client: "<strong>مشتری</strong>: نمونه کار",
        project_widgetjs_date: "<strong>تاریخ پروژه</strong>: اسفند ۱۴۰۳",
        project_widgetjs_demolink: "<strong>لینک دمو</strong>: <a href=\"https://github.com/saeedmasoudie/weather-widget\" target=\"_blank\">Github</a>",
        project_widgetjs_description: "آب و هوای امروز و چند روز آینده را به همراه کلیک راست و اعداد فارسی، بدون نیاز به ثبت نام و کاملاً ساده نمایش می دهد. آموزش ها در گیت هاب قرار داده شده است"
      }
    };
    const rtlStylesheet = document.getElementById('rtl-stylesheet');

    function setLanguage(lang) {
      document.documentElement.lang = lang;
      document.body.dir = lang === 'fa' ? 'rtl' : 'ltr';
      if(rtlStylesheet) rtlStylesheet.disabled = lang !== 'fa';

      document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
          const translation = translations[lang][key];
          
          if (element.tagName === 'META') {
            element.setAttribute('content', translation);
          } else if (element.tagName === 'TITLE') {
            element.innerText = translation;
          } else if (element.hasAttribute('placeholder')) {
             element.placeholder = translation;
          } else {
            element.innerHTML = translation;
          }
        }
      });
      
      const langImage = document.querySelector('#dropdownLang img');
      if (langImage) {
        langImage.src = `assets/img/${lang}.png`;
        langImage.alt = lang.toUpperCase();
      }
    }

    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function setCookie(name, value, days) {
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = `${name}=${encodeURIComponent(value || "")}${expires}; path=/; SameSite=Lax`;
    }
    
    async function detectLanguage() {
      const savedLang = getCookie('lang');
      if (savedLang) {
        setLanguage(savedLang);
        return;
      }

      try {
        // Cloudflare includes the user's country in this response header
        const response = await fetch(window.location.href, { method: "HEAD" });
        const country = response.headers.get("cf-ipcountry");

        let lang = 'en'; // default
        if (country === 'IR') {
          lang = 'fa';
        } else {
          const browserLang = navigator.language.split('-')[0];
          if (['fa', 'en'].includes(browserLang)) {
            lang = browserLang;
          }
        }

        setLanguage(lang);
        setCookie('lang', lang, 365);
      } catch (error) {
        console.error('Language detection failed:', error);
        // fallback: use browser language
        const browserLang = navigator.language.split('-')[0];
        const lang = browserLang === 'fa' ? 'fa' : 'en';
        setLanguage(lang);
        setCookie('lang', lang, 365);
      }
    }

    document.querySelectorAll('.dropdown-item[data-lang]').forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const selectedLang = this.getAttribute('data-lang');

        setCookie('lang', selectedLang, 365);
        setLanguage(selectedLang);
      });
    });

    detectLanguage();
  });

})(); 