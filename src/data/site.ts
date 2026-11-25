// Content copied from thesaradapathshala.com (pages + product covers, Nov 2026).
// Quotes are verbatim where marked; nothing here is invented. TODO = not published on the live site.

const BASE = "https://thesaradapathshala.com";

export const site = {
  name: "সারদা পাঠশালা",
  nameEn: "The Sarada Pathshala",
  slogan: "সাফল্যের প্রতীক", // from the logo image
  domain: "thesaradapathshala.com",
  welcome: "সারদা পাঠশালায় স্বাগতম।", // home H1
  tagline: "শিক্ষার আঙিনায় তোমাকে অভিনন্দন।", // home H2
  phone: "+91 90517 77686",
  phoneHref: "tel:+919051777686",
  emails: ["banglarpathshala22@gmail.com", "meghmallar.2013@gmail.com"], // both listed on Contact Us
  address: "Bhimpur, Charpur, Hooghly, West Bengal, pin 712706",
  shopUrl: `${BASE}/shop/`,
  refundUrl: `${BASE}/refund-and-cancellation-policy/`,
  // Channel names are published (product page + covers); URLs are not. TODO: add real URLs.
  youtubeChannels: [
    { name: "সারদা পাঠশালা", url: "" },
    { name: "বাংলা পাঠশালা", url: "" },
  ],
  facebookPage: { name: "সারদা পাঠশালা", url: "" },
  facebookGroup: { name: "সারদা পাঠশালা", url: "" },
};

/** Avazas ebook app: the "কিনুন" button opens a modal that launches the app, or offers the install file. */
export const ebookApp = {
  name: "Avazas Books",
  tagline: "নোটস কেনো ও পড়ো এক অ্যাপে",
  icon: import.meta.env.VITE_APP_ICON_URL || "/images/avazas-icon.png",
  platform: "Android",
  androidPackage: "com.avazas.ebook",
  features: ["কেনা নোটস সাথে সাথে অ্যাপে", "যেকোনো সময়, যেকোনো জায়গায় পড়ো", "নিরাপদ অনলাইন পেমেন্ট"],
  deepLink: import.meta.env.VITE_APP_DEEP_LINK || "avazasebook://books/{id}", // app scheme + expo-router route books/[slug]
  downloadUrl: import.meta.env.VITE_APP_DOWNLOAD_URL || "/downloads/avazas-books.apk", // .apk file or store page
};

export const nav = [
  { id: "notes", label: "নোটস" },
  { id: "teacher", label: "আমাদের পরিচয়" },
  { id: "how", label: "কীভাবে কিনবে" },
  { id: "faq", label: "প্রশ্নোত্তর" },
  { id: "contact", label: "যোগাযোগ" },
] as const;

/** About page ("আমাদের পরিচয়"), verbatim */
export const about = {
  greeting: "TheSaradaPathshala.com তে তোমাকে স্বাগতম।",
  intro:
    "আমি এই ডিজিটাল প্ল্যাটফর্মের প্রতিষ্ঠাতা এবং প্রধান শিক্ষক। ছাত্র-ছাত্রীদের পড়াশোনাকে আরও সহজ, আধুনিক এবং আনন্দদায়ক করে তোলাই আমাদের মূল উদ্দেশ্য।",
  body:
    "এখানে শিক্ষার্থীরা ঘরে বসেই সম্পূর্ণ আধুনিক সিলেবাস অনুযায়ী তৈরি করা ডিজিটাল স্টাডি মেটেরিয়াল ও গুরুত্বপূর্ণ নোটস অত্যন্ত সাশ্রয়ী মূল্যে পড়তে পারবে। প্রতিটি কন্টেন্ট শিক্ষার্থীদের মেধা ও চাহিদার কথা মাথায় রেখে বিশেষভাবে তৈরি করা হয়েছে, যা তাদের পরীক্ষায় সেরা ফলাফল করতে সাহায্য করবে। আমাদের সাথে থাকার জন্য ধন্যবাদ।",
};

export const teacher = {
  name: "অরবিন্দ ঘোষ",
  role: "প্রতিষ্ঠাতা ও প্রধান শিক্ষক",
  titleLine: "এম.এ (ডবল), বি.এড", // from the book covers
  years: 28, // "দীর্ঘ ২৮ বছর বিশ্ববিদ্যালয়ের ছাত্র পড়ানর দক্ষতা" (RBU product page); "২৮ বছর শিক্ষকতার সাথে যুক্ত" (cover)
  photo: "", // TODO: add a real photo, e.g. "/images/teacher.jpg"
  degrees: [
    { degree: "বাংলা অনার্স", from: "রবীন্দ্রভারতী বিশ্ববিদ্যালয়", short: "RBU" },
    { degree: "বাংলা এম.এ", from: "রবীন্দ্রভারতী বিশ্ববিদ্যালয়", short: "RBU" },
    { degree: "বি.এড", from: "কলকাতা বিশ্ববিদ্যালয়", short: "CU" },
    { degree: "এডুকেশন এম.এ", from: "নেতাজি সুভাষ মুক্ত বিশ্ববিদ্যালয়", short: "NSOU" },
  ],
  experience: "স্কুল ও কলেজের শিক্ষকতার অভিজ্ঞতা সম্পন্ন।",
  roles: ["বাংলা পাঠশালা", "সারদা পাঠশালা ইউটিউব চ্যানেল", "ফেসবুক পেজ ও গ্রুপ"],
};

export type Note = {
  id: string;
  university: string;
  universityShort: string;
  course: string;
  part: string;
  papers: string[];
  description: string; // verbatim from product page where one exists
  highlight: string; // line printed on the cover
  price: number;
  originalPrice: number;
  cover: string;
  buyUrl: string;
  sampleUrl: string;
  samplePdf?: string;
};

export const notes: Note[] = [
  {
    id: "nsou-edu-ma-1",
    university: "নেতাজি সুভাষ মুক্ত বিশ্ববিদ্যালয়",
    universityShort: "NSOU",
    course: "এডুকেশন এম.এ",
    part: "প্রথম বর্ষ",
    papers: ["প্রথম পত্র", "দ্বিতীয় পত্র", "তৃতীয় পত্র", "চতুর্থ পত্র"],
    description: "নেতাজি সুভাষ মুক্ত বিশ্ববিদ্যালয়ের এডুকেশন এম.এ প্রথম বর্ষের ১ম, ২য়, ৩য় ও ৪র্থ পত্রের সম্পূর্ণ নোটস।",
    highlight: "উচ্চমানের সম্পূর্ণ নোটস",
    price: 599,
    originalPrice: 1000,
    cover: "/images/cover-nsou.jpg",
    buyUrl: `${BASE}/product/netaji-subhas-open-university-education-ma-1st-year-1st2nd3rd4th-paper-complete-notes/`,
    sampleUrl: `${BASE}/product/netaji-subhas-open-university-education-ma-1st-year-1st2nd3rd4th-paper-complete-notes/`,
  },
  {
    id: "rbu-bengali-ma-sem4",
    university: "রবীন্দ্রভারতী বিশ্ববিদ্যালয়",
    universityShort: "RBU",
    course: "বাংলা এম.এ (দূরশিক্ষা)",
    part: "৪র্থ সেমিস্টার",
    papers: ["CC – 4.1", "CEC – 4.1", "OEC – 4.1", "OEC – 4.2"],
    description:
      "এই ওয়েবসাইট পেজে রবীন্দ্রভারতী বিশ্ববিদ্যালয়ের বাংলা এম.এ (ডিসট্যান্স) 4th semester complete notes CC – 4.1, CEC – 4.1, OEC – 4.1, OEC – 4.2 দেওয়া রয়েছে। কম মূল্যে সহজ, সরল, উন্নত মানের উত্তর পাবে এখানে।",
    highlight: "কম সময়ে অধিক নাম্বার পাবার উপকরণ",
    price: 999,
    originalPrice: 1500,
    cover: "/images/cover-rbu.jpg",
    buyUrl: `${BASE}/product/rabindra-bharati-university-bengali-m-adistance-4th-sem/`,
    sampleUrl: `${BASE}/product/rabindra-bharati-university-bengali-m-adistance-4th-semester/`,
    samplePdf: `${BASE}/wp-content/uploads/2026/10/Adobe-Scan-Oct-22-2026.pdf`,
  },
];

/** RBU free-sample product page, verbatim */
export const freeSample = {
  title: "রবীন্দ্রভারতী বাংলা এম.এ (দূরশিক্ষা) ৪র্থ সেমিস্টার — ফ্রি স্যাম্পেল",
  text:
    "বিনামূল্যে নমুনা দেখে তারপরে কেনবার সিদ্ধান্ত নাও। এই প্রথম পয়েন্ট ভিত্তিক, সহজ, সাজেশটিভ প্রশ্ন-উত্তর পাবে অতি সামান্য মূল্যে। এখানে পূর্ণ সিলেবাসের CC – 4.1, CEC – 4.1, OEC – 4.1 এবং OEC – 4.2 সমস্ত উত্তর সংগ্রহ রয়েছে।",
  cover: "/images/cover-rbu-sample.jpg",
  pageUrl: `${BASE}/product/rabindra-bharati-university-bengali-m-adistance-4th-semester/`,
  pdfUrl: `${BASE}/wp-content/uploads/2026/10/Adobe-Scan-Oct-22-2026.pdf`,
};

// Stats: every number is published on the live site.
export const stats = [
  { value: 28, prefix: "", suffix: " বছর", label: "শিক্ষকতার অভিজ্ঞতা" },
  { value: 2, prefix: "", suffix: "টি", label: "বিশ্ববিদ্যালয়ের কোর্স" },
  { value: 599, prefix: "₹", suffix: "", label: "থেকে নোটস শুরু" },
  { value: 40, prefix: "", suffix: "%", label: "পর্যন্ত ছাড়" },
];

// "Why us": wording taken from the About page, product pages and the promo cover.
export const promises = [
  { title: "সিলেবাস অনুযায়ী", body: "সম্পূর্ণ আধুনিক সিলেবাস অনুযায়ী তৈরি ডিজিটাল স্টাডি মেটেরিয়াল ও গুরুত্বপূর্ণ নোটস।" },
  { title: "সাজেশন ভিত্তিক প্রশ্ন-উত্তর", body: "পয়েন্ট ভিত্তিক, সহজ, সরল, উন্নত মানের উত্তর। পরীক্ষা উপযোগী, কম সময়ে উন্নত উত্তর।" },
  { title: "মূল্য অত্যন্ত কম", body: "ঘরে বসেই অত্যন্ত সাশ্রয়ী মূল্যে পরীক্ষার পূর্ণ প্রস্তুতি।" },
  { title: "কেনার আগে ফ্রি নমুনা", body: "বিনামূল্যে নমুনা দেখে তারপরে কেনবার সিদ্ধান্ত নাও।" },
];

export const steps = [
  { title: "ফ্রি নমুনা দেখো", body: "যে নোটস চাও, তার ফ্রি নমুনা পাতা খুলে লেখা ও মান যাচাই করে নাও।" },
  { title: "অনলাইনে পেমেন্ট করো", body: "পছন্দ হলে ‘কিনুন’ চাপো, তারপর অনলাইনে পেমেন্ট সম্পূর্ণ করো।" },
  { title: "স্ক্রিনে পড়া শুরু করো", body: "কেনা হয়ে গেলে নোটস সরাসরি তোমার স্ক্রিনে পড়তে পারবে।" },
];

/** Refund & Cancellation Policy page, verbatim */
export const refundPolicy = [
  "যেহেতু আমাদের ওয়েবসাইটে সমস্ত প্রোডাক্ট ডিজিটাল স্টাডি মেটেরিয়াল, গাইড এবং শিক্ষণীয় নোট (যা শিক্ষার্থীরা সরাসরি শুধুমাত্র স্ক্রিনে পড়তে পারে), তাই একবার কোনো কন্টেন্ট বা প্রোডাক্ট কেনা হয়ে গেলে তা কোনো অবস্থাতেই বাতিল (Cancel) বা পরিবর্তন করা যাবে না।",
  "ডিজিটাল প্রোডাক্টের এই বিশেষ বৈশিষ্ট্যের কারণে আমরা কোনো ধরনের রিফান্ড (টাকা ফেরত) বা ক্যাশব্যাক প্রদান করি না। কন্টেন্ট বা নোট কেনার আগে দয়া করে প্রতিটি প্রোডাক্টের সাথে দেওয়া ‘ফ্রি নমুনা পাতা’ দেখে সম্পূর্ণ যাচাই করে নিন। পেমেন্ট সংক্রান্ত কোনো কারিগরি সমস্যা বা জিজ্ঞাসা থাকলে আমাদের ‘Contact Us’ পেজে দেওয়া ঠিকানায় যোগাযোগ করুন।",
];

/** Contact page intro, verbatim (typo "স্টাডিমেডিয়াল" corrected to "স্টাডি মেটেরিয়াল") */
export const contactIntro =
  "আমাদের স্টাডি মেটেরিয়াল, সাজেশন বা পেমেন্ট সংক্রান্ত কোনো জিজ্ঞাসা থাকলে তুমি সরাসরি নিচে দেওয়া তথ্যের মাধ্যমে আমাদের সাথে যোগাযোগ করতে পারো। আমরা দ্রুত তোমার সমস্যার সমাধান করার চেষ্টা করব।";

export const faqs = [
  {
    q: "কোন কোন কোর্সের নোটস পাওয়া যায়?",
    a: "নেতাজি সুভাষ মুক্ত বিশ্ববিদ্যালয়ের (NSOU) এডুকেশন এম.এ প্রথম বর্ষ (১ম–৪র্থ পত্র) এবং রবীন্দ্রভারতী বিশ্ববিদ্যালয়ের বাংলা এম.এ (দূরশিক্ষা) ৪র্থ সেমিস্টার (CC – 4.1, CEC – 4.1, OEC – 4.1, OEC – 4.2)। অন্য কোর্সের নোটস চাইলে আমাদের জানাও।",
  },
  {
    q: "নোটস কি ছাপানো বই হিসেবে পাঠানো হয়?",
    a: "না। সমস্ত প্রোডাক্ট ডিজিটাল স্টাডি মেটেরিয়াল, গাইড এবং শিক্ষণীয় নোট, যা শিক্ষার্থীরা সরাসরি স্ক্রিনে পড়তে পারে।",
  },
  {
    q: "কেনার আগে কি নোটস দেখে নেওয়া যায়?",
    a: "হ্যাঁ। বিনামূল্যে নমুনা দেখে তারপরে কেনবার সিদ্ধান্ত নাও। প্রতিটি প্রোডাক্টের সাথে ‘ফ্রি নমুনা পাতা’ দেওয়া আছে।",
  },
  {
    q: "টাকা ফেরত (রিফান্ড) পাওয়া যাবে?",
    a: "না। ডিজিটাল প্রোডাক্ট একবার কেনা হয়ে গেলে তা কোনো অবস্থাতেই বাতিল বা পরিবর্তন করা যায় না, এবং কোনো রিফান্ড বা ক্যাশব্যাক দেওয়া হয় না। তাই কেনার আগে ফ্রি নমুনা দেখে সম্পূর্ণ যাচাই করে নাও।",
  },
  {
    q: "পেমেন্টে সমস্যা হলে কী করব?",
    a: "পেমেন্ট সংক্রান্ত কোনো কারিগরি সমস্যা বা জিজ্ঞাসা থাকলে নিচের ফোন নম্বর বা ইমেলে সরাসরি যোগাযোগ করো। আমরা দ্রুত তোমার সমস্যার সমাধান করার চেষ্টা করব।",
  },
  {
    q: "পাঠ্য আলোচনা কোথায় পাব?",
    a: "আমাদের ইউটিউব চ্যানেল “সারদা পাঠশালা” ও “বাংলা পাঠশালা”-তে পাঠ্য আলোচনা রয়েছে।",
  },
];
