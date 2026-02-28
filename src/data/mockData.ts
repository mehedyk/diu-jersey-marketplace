// ============================================================
// MOCK DATA — Sample suppliers, jersey designs, stores, and testimonials
// ============================================================

import jerseySports11 from "@/assets/jersey-sports11.jpg";
import jerseyTealPolo from "@/assets/jersey-teal-polo.jpg";
import jerseyDikaSports from "@/assets/jersey-dika-sports.jpg";
import jerseyEeeChbd from "@/assets/jersey-eee-chbd.jpg";
import jerseySweBlue from "@/assets/jersey-swe-blue.jpg";
import jerseySweGreen from "@/assets/jersey-swe-green.jpg";
import jerseySaudi from "@/assets/jersey-saudi.jpg";
import jerseyPortugal from "@/assets/jersey-portugal.jpg";
import jerseyItaly from "@/assets/jersey-italy.jpg";
import jerseyBarcelona from "@/assets/jersey-barcelona.jpg";
import jerseyArsenal from "@/assets/jersey-arsenal.jpg";
import jerseyBayern from "@/assets/jersey-bayern.jpg";
import jerseyCollection from "@/assets/jersey-collection.jpg";
import jerseyArgentina from "@/assets/jersey-argentina.jpg";
import jerseyWhirlPink from "@/assets/jersey-whirl-pink.jpg";
import jerseyWhirlBlue from "@/assets/jersey-whirl-blue.jpg";
import jerseyWhirlOrange from "@/assets/jersey-whirl-orange.jpg";
import jerseyWhirlMaroon from "@/assets/jersey-whirl-maroon.jpg";
import jerseyNationNavy from "@/assets/jersey-nation-navy.jpg";
import jerseyNationBlue from "@/assets/jersey-nation-blue.jpg";
import jerseyNationRed from "@/assets/jersey-nation-red.jpg";
import jerseyJcuDiamond from "@/assets/jersey-jcu-diamond.jpg";
import jerseyJcuGeometric from "@/assets/jersey-jcu-geometric.jpg";
import jerseyJcuTeal from "@/assets/jersey-jcu-teal.jpg";
import jerseyJcuSwirl from "@/assets/jersey-jcu-swirl.jpg";
import jerseyJcuPink from "@/assets/jersey-jcu-pink.jpg";
import jerseyJcuRedgray from "@/assets/jersey-jcu-redgray.jpg";
import jerseyJcuPurple from "@/assets/jersey-jcu-purple.jpg";
import jerseyJcuGreen from "@/assets/jersey-jcu-green.jpg";
import jerseyJcuBluePattern from "@/assets/jersey-jcu-blue-pattern.jpg";
import jerseyTailorBlue from "@/assets/jersey-tailor-blue.jpg";
import jerseyTailorPurple from "@/assets/jersey-tailor-purple.jpg";

export interface Supplier {
  id: string;
  brandName: string;
  description: string;
  rating: number;
  designCount: number;
  logoUrl: string;
  coverImageUrl: string;
}

export interface JerseyDesign {
  id: string;
  supplierId: string;
  supplierName: string;
  storeId: string;
  title: string;
  description: string;
  category: "Section" | "Club" | "Batch Jersey" | "Tournament" | "Departmental";
  baseColor: string;
  fabricType: string;
  pricePerPiece: number;
  minOrderQuantity: number;
  estimatedDeliveryDays: number;
  mainImageUrl: string;
  rating: number;
  isTopSeller: boolean;
  isFeatured: boolean;
  tags: string[];
}

export interface Store {
  id: string;
  name: string;
  description: string;
  rating: number;
  deliveryTime: string;
  coverImageUrl: string;
  logoUrl: string;
  jerseyCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  department: string;
  quote: string;
  avatarUrl: string;
}

// --- Stores (Foodpanda-style) ---
export const stores: Store[] = [
  {
    id: "store-1", name: "Jersey Champs BD",
    description: "Premium international jerseys — Saudi, Portugal, Italy & more",
    rating: 4.9, deliveryTime: "3-5 days", coverImageUrl: jerseyCollection,
    logoUrl: "https://ui-avatars.com/api/?name=JC&background=006b3f&color=fff&size=128&bold=true",
    jerseyCount: 4,
  },
  {
    id: "store-2", name: "Jersey Whirl",
    description: "Born to Win — Custom sublimation jerseys with name & number",
    rating: 4.8, deliveryTime: "5-7 days", coverImageUrl: jerseyWhirlOrange,
    logoUrl: "https://ui-avatars.com/api/?name=JW&background=d63384&color=fff&size=128&bold=true",
    jerseyCount: 5,
  },
  {
    id: "store-3", name: "CC Sports Store",
    description: "Classic club jerseys — Barcelona, Arsenal, Bayern & more",
    rating: 4.7, deliveryTime: "3-5 days", coverImageUrl: jerseyBarcelona,
    logoUrl: "https://ui-avatars.com/api/?name=CC&background=1a1a6c&color=fff&size=128&bold=true",
    jerseyCount: 3,
  },
  {
    id: "store-4", name: "JerseyBD Pro",
    description: "Premium sublimation jerseys trusted by 50+ university teams",
    rating: 4.8, deliveryTime: "5-7 days", coverImageUrl: jerseySports11,
    logoUrl: "https://ui-avatars.com/api/?name=JB&background=006b3f&color=fff&size=128&bold=true",
    jerseyCount: 3,
  },
  {
    id: "store-5", name: "Dhaka Sports Wear",
    description: "Affordable quality jerseys for clubs and departments",
    rating: 4.5, deliveryTime: "5-8 days", coverImageUrl: jerseyDikaSports,
    logoUrl: "https://ui-avatars.com/api/?name=DS&background=1a1a2e&color=fff&size=128&bold=true",
    jerseyCount: 3,
  },
  {
    id: "store-6", name: "Concept House BD",
    description: "University team kits with custom name/number printing",
    rating: 4.7, deliveryTime: "7-10 days", coverImageUrl: jerseyEeeChbd,
    logoUrl: "https://ui-avatars.com/api/?name=CH&background=006b3f&color=fff&size=128&bold=true",
    jerseyCount: 3,
  },
  {
    id: "store-7", name: "Kapor Sports",
    description: "Eco-friendly fabric options with modern designs",
    rating: 4.3, deliveryTime: "7-9 days", coverImageUrl: jerseySweBlue,
    logoUrl: "https://ui-avatars.com/api/?name=KS&background=2d6a4f&color=fff&size=128&bold=true",
    jerseyCount: 2,
  },
  {
    id: "store-8", name: "Argentina Fan Store",
    description: "Official replicas — Messi, De Paul & national team collection",
    rating: 4.9, deliveryTime: "3-5 days", coverImageUrl: jerseyArgentina,
    logoUrl: "https://ui-avatars.com/api/?name=AF&background=75aadb&color=fff&size=128&bold=true",
    jerseyCount: 2,
  },
  {
    id: "store-9", name: "Euro Classics",
    description: "Retro & modern European national team jerseys",
    rating: 4.6, deliveryTime: "5-7 days", coverImageUrl: jerseyItaly,
    logoUrl: "https://ui-avatars.com/api/?name=EC&background=003399&color=fff&size=128&bold=true",
    jerseyCount: 2,
  },
  {
    id: "store-10", name: "Middle East Kits",
    description: "Saudi Arabia & Gulf region official replica jerseys",
    rating: 4.4, deliveryTime: "5-7 days", coverImageUrl: jerseySaudi,
    logoUrl: "https://ui-avatars.com/api/?name=MK&background=006c35&color=fff&size=128&bold=true",
    jerseyCount: 2,
  },
  {
    id: "store-11", name: "Jersey Nation BD",
    description: "Premium custom polo jerseys with name & number — Min order 10 pcs",
    rating: 4.8, deliveryTime: "5-7 days", coverImageUrl: jerseyNationNavy,
    logoUrl: "https://ui-avatars.com/api/?name=JN&background=1a237e&color=ffd600&size=128&bold=true",
    jerseyCount: 3,
  },
  {
    id: "store-12", name: "Jersey Collector's Unite",
    description: "Wear Comfort — Premium quality custom jerseys, min order 10 pcs",
    rating: 4.7, deliveryTime: "5-8 days", coverImageUrl: jerseyJcuGreen,
    logoUrl: "https://ui-avatars.com/api/?name=JU&background=0d47a1&color=fff&size=128&bold=true",
    jerseyCount: 9,
  },
  {
    id: "store-13", name: "Jersey Tailor BD",
    description: "Wholesale & Retail — Custom jersey polo & T-shirt with sublimation",
    rating: 4.6, deliveryTime: "5-8 days", coverImageUrl: jerseyTailorBlue,
    logoUrl: "https://ui-avatars.com/api/?name=JT&background=1565c0&color=fff&size=128&bold=true",
    jerseyCount: 2,
  },
];

// --- Suppliers ---
export const suppliers: Supplier[] = [
  { id: "s1", brandName: "JerseyBD Pro", description: "Premium sublimation jerseys trusted by 50+ university teams across Bangladesh.", rating: 4.8, designCount: 25, logoUrl: "https://ui-avatars.com/api/?name=JB&background=006b3f&color=fff&size=128&bold=true", coverImageUrl: "" },
  { id: "s2", brandName: "Dhaka Sports Wear", description: "Affordable quality jerseys for clubs and departments.", rating: 4.5, designCount: 18, logoUrl: "https://ui-avatars.com/api/?name=DS&background=1a1a2e&color=fff&size=128&bold=true", coverImageUrl: "" },
  { id: "s3", brandName: "Concept House BD", description: "University team kits with custom name/number printing.", rating: 4.7, designCount: 30, logoUrl: "https://ui-avatars.com/api/?name=CH&background=006b3f&color=fff&size=128&bold=true", coverImageUrl: "" },
  { id: "s4", brandName: "Kapor Sports", description: "Eco-friendly fabric options with modern designs.", rating: 4.3, designCount: 12, logoUrl: "https://ui-avatars.com/api/?name=KS&background=2d6a4f&color=fff&size=128&bold=true", coverImageUrl: "" },
  { id: "s5", brandName: "Jersey Nation BD", description: "Premium custom polo jerseys with sublimation printing.", rating: 4.8, designCount: 15, logoUrl: "https://ui-avatars.com/api/?name=JN&background=1a237e&color=ffd600&size=128&bold=true", coverImageUrl: "" },
  { id: "s6", brandName: "Jersey Collector's Unite", description: "Wear Comfort — Premium quality custom jerseys.", rating: 4.7, designCount: 20, logoUrl: "https://ui-avatars.com/api/?name=JU&background=0d47a1&color=fff&size=128&bold=true", coverImageUrl: "" },
  { id: "s7", brandName: "Jersey Tailor BD", description: "Custom jersey polo & T-shirt — Wholesale & Retail.", rating: 4.6, designCount: 10, logoUrl: "https://ui-avatars.com/api/?name=JT&background=1565c0&color=fff&size=128&bold=true", coverImageUrl: "" },
];

// --- Jersey Designs (each assigned to a store) ---
export const jerseyDesigns: JerseyDesign[] = [
  // Store 1: Jersey Champs BD
  { id: "j-saudi", supplierId: "s1", supplierName: "Jersey Champs BD", storeId: "store-1", title: "Saudi Arabia Away Jersey 2026", description: "Green geometric pattern with purple diamond accents. Official replica design.", category: "Club", baseColor: "Green/Purple", fabricType: "Polyester Mesh", pricePerPiece: 750, minOrderQuantity: 1, estimatedDeliveryDays: 5, mainImageUrl: jerseySaudi, rating: 4.9, isTopSeller: true, isFeatured: true, tags: ["national", "saudi"] },
  { id: "j-portugal", supplierId: "s1", supplierName: "Jersey Champs BD", storeId: "store-1", title: "Portugal Vitinha #23 Third Kit", description: "Black with gold lettering. Premium player edition.", category: "Club", baseColor: "Black/Gold", fabricType: "Premium Polyester", pricePerPiece: 850, minOrderQuantity: 1, estimatedDeliveryDays: 5, mainImageUrl: jerseyPortugal, rating: 4.8, isTopSeller: true, isFeatured: true, tags: ["national", "portugal"] },
  { id: "j-italy", supplierId: "s1", supplierName: "Jersey Champs BD", storeId: "store-1", title: "Italy Retro Away Jersey", description: "White retro design with navy and gold trim. Adidas originals.", category: "Club", baseColor: "White/Navy/Gold", fabricType: "Climacool Polyester", pricePerPiece: 780, minOrderQuantity: 1, estimatedDeliveryDays: 5, mainImageUrl: jerseyItaly, rating: 4.7, isTopSeller: false, isFeatured: true, tags: ["national", "italy", "retro"] },
  { id: "j-collection", supplierId: "s1", supplierName: "Jersey Champs BD", storeId: "store-1", title: "World Stars Collection Pack", description: "Kimmich, De Bruyne, Messi, Barella — premium player jerseys bundle.", category: "Club", baseColor: "Multi", fabricType: "Premium Polyester", pricePerPiece: 690, minOrderQuantity: 1, estimatedDeliveryDays: 5, mainImageUrl: jerseyCollection, rating: 4.9, isTopSeller: true, isFeatured: true, tags: ["collection", "stars"] },

  // Store 2: Jersey Whirl (now with orange + maroon images)
  { id: "j-whirl-pink", supplierId: "s2", supplierName: "Jersey Whirl", storeId: "store-2", title: "Jersey Whirl — Pink Magma", description: "Custom sublimation jersey in pink and black lava pattern. Born to Win series.", category: "Section", baseColor: "Pink/Black", fabricType: "100% Polyester Sublimation", pricePerPiece: 550, minOrderQuantity: 11, estimatedDeliveryDays: 7, mainImageUrl: jerseyWhirlPink, rating: 4.8, isTopSeller: true, isFeatured: true, tags: ["custom", "sublimation"] },
  { id: "j-whirl-blue", supplierId: "s2", supplierName: "Jersey Whirl", storeId: "store-2", title: "Jersey Whirl — Sky Tribal", description: "Custom sublimation jersey in sky blue with tribal pattern. Born to Win series.", category: "Section", baseColor: "Sky Blue/White", fabricType: "100% Polyester Sublimation", pricePerPiece: 550, minOrderQuantity: 11, estimatedDeliveryDays: 7, mainImageUrl: jerseyWhirlBlue, rating: 4.7, isTopSeller: true, isFeatured: true, tags: ["custom", "sublimation"] },
  { id: "j-whirl-orange", supplierId: "s2", supplierName: "Jersey Whirl", storeId: "store-2", title: "Jersey Whirl — Orange Splash", description: "Navy and orange splash pattern polo jersey with custom name & number. Born to Win series.", category: "Section", baseColor: "Navy/Orange", fabricType: "100% Polyester Sublimation", pricePerPiece: 560, minOrderQuantity: 11, estimatedDeliveryDays: 7, mainImageUrl: jerseyWhirlOrange, rating: 4.9, isTopSeller: true, isFeatured: true, tags: ["custom", "sublimation", "polo"] },
  { id: "j-whirl-maroon", supplierId: "s2", supplierName: "Jersey Whirl", storeId: "store-2", title: "Jersey Whirl — Maroon Lightning", description: "Maroon and pink jersey with white lightning accents. Born to Win series.", category: "Section", baseColor: "Maroon/Pink", fabricType: "100% Polyester Sublimation", pricePerPiece: 560, minOrderQuantity: 11, estimatedDeliveryDays: 7, mainImageUrl: jerseyWhirlMaroon, rating: 4.8, isTopSeller: true, isFeatured: true, tags: ["custom", "sublimation", "lightning"] },
  { id: "j1", supplierId: "s2", supplierName: "Jersey Whirl", storeId: "store-2", title: "Sports Jersey 11 — Pink Splash", description: "Bold pink and navy football jersey with splash art design.", category: "Club", baseColor: "Pink/Navy", fabricType: "Polyester Mesh", pricePerPiece: 520, minOrderQuantity: 15, estimatedDeliveryDays: 7, mainImageUrl: jerseySports11, rating: 4.9, isTopSeller: true, isFeatured: true, tags: ["club", "breathable"] },

  // Store 3: CC Sports Store
  { id: "j-barcelona", supplierId: "s3", supplierName: "CC Sports Store", storeId: "store-3", title: "FC Barcelona Retro Home Jersey", description: "Classic blaugrana stripes. Nike retro edition.", category: "Club", baseColor: "Maroon/Navy", fabricType: "Premium Polyester", pricePerPiece: 720, minOrderQuantity: 1, estimatedDeliveryDays: 5, mainImageUrl: jerseyBarcelona, rating: 4.8, isTopSeller: true, isFeatured: true, tags: ["club", "barcelona", "retro"] },
  { id: "j-arsenal", supplierId: "s3", supplierName: "CC Sports Store", storeId: "store-3", title: "Arsenal Emirates Away Jersey", description: "White polo jersey with maroon and gold trim. Adidas originals.", category: "Club", baseColor: "White/Maroon", fabricType: "Climacool Polyester", pricePerPiece: 780, minOrderQuantity: 1, estimatedDeliveryDays: 5, mainImageUrl: jerseyArsenal, rating: 4.7, isTopSeller: true, isFeatured: true, tags: ["club", "arsenal"] },
  { id: "j-bayern", supplierId: "s3", supplierName: "CC Sports Store", storeId: "store-3", title: "Bayern Munich Away Jersey 2026", description: "White with pink-red digital camo pattern. Adidas player edition.", category: "Club", baseColor: "White/Pink/Red", fabricType: "Aeroready Polyester", pricePerPiece: 790, minOrderQuantity: 1, estimatedDeliveryDays: 5, mainImageUrl: jerseyBayern, rating: 4.6, isTopSeller: false, isFeatured: true, tags: ["club", "bayern"] },

  // Store 4: JerseyBD Pro
  { id: "j2", supplierId: "s1", supplierName: "JerseyBD Pro", storeId: "store-4", title: "Teal Wave Polo Jersey", description: "Stunning teal polo jersey with abstract wave pattern.", category: "Section", baseColor: "Teal/White", fabricType: "Dry-Fit Polyester", pricePerPiece: 550, minOrderQuantity: 12, estimatedDeliveryDays: 10, mainImageUrl: jerseyTealPolo, rating: 4.6, isTopSeller: false, isFeatured: true, tags: ["section", "polo"] },
  { id: "j8", supplierId: "s1", supplierName: "JerseyBD Pro", storeId: "store-4", title: "DIU Club League Champion", description: "Premium champion-edition club jersey with gold accents.", category: "Club", baseColor: "Black/Gold", fabricType: "Premium Sublimation", pricePerPiece: 650, minOrderQuantity: 11, estimatedDeliveryDays: 6, mainImageUrl: jerseyTailorPurple, rating: 4.9, isTopSeller: true, isFeatured: true, tags: ["club", "premium"] },
  { id: "j10", supplierId: "s1", supplierName: "JerseyBD Pro", storeId: "store-4", title: "DIU Spring Tournament Kit", description: "Fresh spring-themed tournament kit.", category: "Tournament", baseColor: "White/Pastel Green", fabricType: "Sublimation Polyester", pricePerPiece: 490, minOrderQuantity: 10, estimatedDeliveryDays: 7, mainImageUrl: jerseyTailorBlue, rating: 4.6, isTopSeller: false, isFeatured: false, tags: ["tournament", "spring"] },

  // Store 5: Dhaka Sports Wear
  { id: "j3", supplierId: "s2", supplierName: "Dhaka Sports Wear", storeId: "store-5", title: "DIKA Sports Player 01", description: "Gray and black gradient jersey with red accents.", category: "Club", baseColor: "Gray/Black/Red", fabricType: "Premium Polyester", pricePerPiece: 480, minOrderQuantity: 11, estimatedDeliveryDays: 8, mainImageUrl: jerseyDikaSports, rating: 4.8, isTopSeller: true, isFeatured: false, tags: ["club", "tournament"] },
  { id: "j7", supplierId: "s2", supplierName: "Dhaka Sports Wear", storeId: "store-5", title: "CSE Batch '25 Reunion Kit", description: "Maroon and gold batch reunion jersey.", category: "Batch Jersey", baseColor: "Maroon/Gold", fabricType: "Polyester", pricePerPiece: 470, minOrderQuantity: 20, estimatedDeliveryDays: 7, mainImageUrl: jerseyWhirlMaroon, rating: 4.3, isTopSeller: false, isFeatured: false, tags: ["batch", "reunion"] },
  { id: "j11", supplierId: "s2", supplierName: "Dhaka Sports Wear", storeId: "store-5", title: "BBA Batch '27 V-Neck", description: "Stylish v-neck batch jersey in royal blue.", category: "Batch Jersey", baseColor: "Royal Blue", fabricType: "Combed Cotton", pricePerPiece: 430, minOrderQuantity: 25, estimatedDeliveryDays: 8, mainImageUrl: jerseyJcuBluePattern, rating: 4.4, isTopSeller: false, isFeatured: false, tags: ["batch", "v-neck"] },

  // Store 6: Concept House BD
  { id: "j4", supplierId: "s3", supplierName: "Concept House BD", storeId: "store-6", title: "EEE Department — Circuit Board", description: "Black and cyan circuit board themed jersey for EEE department.", category: "Section", baseColor: "Black/Cyan", fabricType: "Sublimation Polyester", pricePerPiece: 500, minOrderQuantity: 10, estimatedDeliveryDays: 7, mainImageUrl: jerseyEeeChbd, rating: 4.7, isTopSeller: true, isFeatured: true, tags: ["section", "departmental"] },
  { id: "j9", supplierId: "s3", supplierName: "Concept House BD", storeId: "store-6", title: "Pharmacy Dept Polo Jersey", description: "Smart casual polo jersey for Pharmacy department.", category: "Departmental", baseColor: "White/Green", fabricType: "Pique Cotton", pricePerPiece: 520, minOrderQuantity: 15, estimatedDeliveryDays: 10, mainImageUrl: jerseyTealPolo, rating: 4.2, isTopSeller: false, isFeatured: false, tags: ["departmental", "polo"] },
  { id: "j12", supplierId: "s3", supplierName: "Concept House BD", storeId: "store-6", title: "DIU All-Star Club Jersey", description: "Premium club jersey with raglan sleeves and UV protection.", category: "Club", baseColor: "Green/Yellow", fabricType: "UV-Shield Polyester", pricePerPiece: 580, minOrderQuantity: 11, estimatedDeliveryDays: 6, mainImageUrl: jerseyJcuGreen, rating: 4.8, isTopSeller: true, isFeatured: false, tags: ["club", "premium", "uv"] },

  // Store 7: Kapor Sports
  { id: "j5", supplierId: "s4", supplierName: "Kapor Sports", storeId: "store-7", title: "SWE Department — Neon Tech", description: "Software Engineering department jersey with neon blue electric effects.", category: "Section", baseColor: "Black/Neon Blue", fabricType: "Leaf Jacquard", pricePerPiece: 580, minOrderQuantity: 15, estimatedDeliveryDays: 9, mainImageUrl: jerseySweBlue, rating: 4.8, isTopSeller: true, isFeatured: true, tags: ["section", "premium"] },
  { id: "j6", supplierId: "s4", supplierName: "Kapor Sports", storeId: "store-7", title: "SWE Department — Classic Green", description: "Deep green Software Engineering jersey with white accents.", category: "Section", baseColor: "Dark Green/White", fabricType: "Premium Polyester", pricePerPiece: 550, minOrderQuantity: 12, estimatedDeliveryDays: 8, mainImageUrl: jerseySweGreen, rating: 4.5, isTopSeller: false, isFeatured: true, tags: ["section", "classic"] },

  // Store 8: Argentina Fan Store
  { id: "j-argentina-1", supplierId: "s1", supplierName: "Argentina Fan Store", storeId: "store-8", title: "Argentina Messi #10 Home Jersey", description: "Sky blue and white stripes. Official replica with Messi print.", category: "Club", baseColor: "Sky Blue/White", fabricType: "Premium Polyester", pricePerPiece: 820, minOrderQuantity: 1, estimatedDeliveryDays: 5, mainImageUrl: jerseyArgentina, rating: 4.9, isTopSeller: true, isFeatured: true, tags: ["national", "argentina", "messi"] },
  { id: "j-argentina-2", supplierId: "s1", supplierName: "Argentina Fan Store", storeId: "store-8", title: "Argentina World Stars Collection", description: "De Paul, Messi & more — full collection available.", category: "Club", baseColor: "Multi", fabricType: "Premium Polyester", pricePerPiece: 750, minOrderQuantity: 1, estimatedDeliveryDays: 5, mainImageUrl: jerseyCollection, rating: 4.8, isTopSeller: true, isFeatured: true, tags: ["national", "argentina", "collection"] },

  // Store 9: Euro Classics
  { id: "j-euro-italy", supplierId: "s3", supplierName: "Euro Classics", storeId: "store-9", title: "Italy Away Retro — Adidas Originals", description: "White retro Italy jersey with intricate weave pattern.", category: "Club", baseColor: "White/Navy", fabricType: "Climacool", pricePerPiece: 780, minOrderQuantity: 1, estimatedDeliveryDays: 7, mainImageUrl: jerseyItaly, rating: 4.7, isTopSeller: false, isFeatured: true, tags: ["retro", "italy"] },
  { id: "j-euro-portugal", supplierId: "s3", supplierName: "Euro Classics", storeId: "store-9", title: "Portugal Third Kit — Pantera Negra", description: "Black with gold details. Vitinha #23 player edition.", category: "Club", baseColor: "Black/Gold", fabricType: "Dri-Fit", pricePerPiece: 850, minOrderQuantity: 1, estimatedDeliveryDays: 7, mainImageUrl: jerseyPortugal, rating: 4.8, isTopSeller: true, isFeatured: true, tags: ["portugal", "player"] },

  // Store 10: Middle East Kits
  { id: "j-me-saudi", supplierId: "s1", supplierName: "Middle East Kits", storeId: "store-10", title: "Saudi Arabia Home Jersey 2026", description: "Green with purple geometric diamond pattern. Adidas.", category: "Club", baseColor: "Green/Purple", fabricType: "Aeroready", pricePerPiece: 720, minOrderQuantity: 1, estimatedDeliveryDays: 7, mainImageUrl: jerseySaudi, rating: 4.6, isTopSeller: false, isFeatured: true, tags: ["national", "saudi"] },
  { id: "j-me-saudi-2", supplierId: "s1", supplierName: "Middle East Kits", storeId: "store-10", title: "Saudi Arabia Training Kit", description: "Training edition in dark green. Lightweight and breathable.", category: "Club", baseColor: "Dark Green", fabricType: "Polyester Mesh", pricePerPiece: 650, minOrderQuantity: 1, estimatedDeliveryDays: 7, mainImageUrl: jerseySaudi, rating: 4.5, isTopSeller: false, isFeatured: false, tags: ["national", "saudi", "training"] },

  // Store 11: Jersey Nation BD
  { id: "j-jn-navy", supplierId: "s5", supplierName: "Jersey Nation BD", storeId: "store-11", title: "Navy Gold Polo — Custom Name & Number", description: "Navy blue polo jersey with yellow collar and accents. Sublimation print with custom name and number on back.", category: "Section", baseColor: "Navy/Yellow", fabricType: "100% Polyester Sublimation", pricePerPiece: 520, minOrderQuantity: 10, estimatedDeliveryDays: 7, mainImageUrl: jerseyNationNavy, rating: 4.8, isTopSeller: true, isFeatured: true, tags: ["custom", "polo", "sublimation"] },
  { id: "j-jn-blue", supplierId: "s5", supplierName: "Jersey Nation BD", storeId: "store-11", title: "Blue Sports Polo — Cricket Edition", description: "Sky blue sports polo with grey collar. Perfect for cricket and casual sports.", category: "Section", baseColor: "Blue/Grey", fabricType: "100% Polyester Sublimation", pricePerPiece: 500, minOrderQuantity: 10, estimatedDeliveryDays: 7, mainImageUrl: jerseyNationBlue, rating: 4.7, isTopSeller: true, isFeatured: true, tags: ["custom", "cricket", "polo"] },
  { id: "j-jn-red", supplierId: "s5", supplierName: "Jersey Nation BD", storeId: "store-11", title: "Red Storm — Bold Geometric", description: "Red and dark navy geometric pattern polo jersey. Bold street-sport design.", category: "Section", baseColor: "Red/Navy", fabricType: "100% Polyester Sublimation", pricePerPiece: 540, minOrderQuantity: 10, estimatedDeliveryDays: 7, mainImageUrl: jerseyNationRed, rating: 4.9, isTopSeller: true, isFeatured: true, tags: ["custom", "geometric", "bold"] },

  // Store 12: Jersey Collector's Unite (with new green + blue pattern images)
  { id: "j-jcu-diamond", supplierId: "s6", supplierName: "Jersey Collector's Unite", storeId: "store-12", title: "Blue Diamond Pattern Tee", description: "Deep blue with diamond geometric pattern. Premium quality sublimation print.", category: "Section", baseColor: "Blue/Navy", fabricType: "Premium Sublimation", pricePerPiece: 490, minOrderQuantity: 10, estimatedDeliveryDays: 7, mainImageUrl: jerseyJcuDiamond, rating: 4.7, isTopSeller: true, isFeatured: true, tags: ["custom", "diamond", "premium"] },
  { id: "j-jcu-geometric", supplierId: "s6", supplierName: "Jersey Collector's Unite", storeId: "store-12", title: "White Geometric Abstract", description: "White jersey with colorful geometric abstract art. Navy, green, orange accents.", category: "Section", baseColor: "White/Multi", fabricType: "Premium Sublimation", pricePerPiece: 510, minOrderQuantity: 10, estimatedDeliveryDays: 7, mainImageUrl: jerseyJcuGeometric, rating: 4.6, isTopSeller: false, isFeatured: true, tags: ["custom", "abstract", "colorful"] },
  { id: "j-jcu-teal", supplierId: "s6", supplierName: "Jersey Collector's Unite", storeId: "store-12", title: "Teal Shatter — Labib Edition", description: "Teal with dark navy angular shatter pattern. Custom name and number available.", category: "Section", baseColor: "Teal/Navy", fabricType: "Premium Sublimation", pricePerPiece: 530, minOrderQuantity: 10, estimatedDeliveryDays: 8, mainImageUrl: jerseyJcuTeal, rating: 4.8, isTopSeller: true, isFeatured: true, tags: ["custom", "teal", "shatter"] },
  { id: "j-jcu-swirl", supplierId: "s6", supplierName: "Jersey Collector's Unite", storeId: "store-12", title: "Blue Swirl Team Polo", description: "Blue swirl wave polo jersey. Perfect for team events and tournaments.", category: "Section", baseColor: "Blue/Teal", fabricType: "Premium Sublimation", pricePerPiece: 520, minOrderQuantity: 10, estimatedDeliveryDays: 7, mainImageUrl: jerseyJcuSwirl, rating: 4.7, isTopSeller: true, isFeatured: true, tags: ["custom", "swirl", "polo"] },
  { id: "j-jcu-pink", supplierId: "s6", supplierName: "Jersey Collector's Unite", storeId: "store-12", title: "Pink Mandala Polo", description: "Navy polo jersey with pink mandala pattern and pink collar accents.", category: "Section", baseColor: "Navy/Pink", fabricType: "Premium Sublimation", pricePerPiece: 540, minOrderQuantity: 10, estimatedDeliveryDays: 7, mainImageUrl: jerseyJcuPink, rating: 4.6, isTopSeller: false, isFeatured: true, tags: ["custom", "mandala", "pink"] },
  { id: "j-jcu-redgray", supplierId: "s6", supplierName: "Jersey Collector's Unite", storeId: "store-12", title: "Red & Gray Flame Tee", description: "Dynamic red, gray and white jersey with flame-like swirl patterns.", category: "Section", baseColor: "Red/Gray/White", fabricType: "Premium Sublimation", pricePerPiece: 500, minOrderQuantity: 10, estimatedDeliveryDays: 8, mainImageUrl: jerseyJcuRedgray, rating: 4.5, isTopSeller: false, isFeatured: false, tags: ["custom", "flame", "dynamic"] },
  { id: "j-jcu-purple", supplierId: "s6", supplierName: "Jersey Collector's Unite", storeId: "store-12", title: "Purple Diamond Polo", description: "Purple polo jersey with pink diamond crosshatch pattern. Premium quality.", category: "Section", baseColor: "Purple/Pink", fabricType: "Premium Sublimation", pricePerPiece: 510, minOrderQuantity: 10, estimatedDeliveryDays: 7, mainImageUrl: jerseyJcuPurple, rating: 4.7, isTopSeller: true, isFeatured: true, tags: ["custom", "purple", "diamond"] },
  { id: "j-jcu-green", supplierId: "s6", supplierName: "Jersey Collector's Unite", storeId: "store-12", title: "Teal Heritage — Sayem Edition", description: "Teal green with orange geometric heritage pattern. Custom name & number.", category: "Section", baseColor: "Teal/Orange", fabricType: "Premium Sublimation", pricePerPiece: 530, minOrderQuantity: 10, estimatedDeliveryDays: 7, mainImageUrl: jerseyJcuGreen, rating: 4.8, isTopSeller: true, isFeatured: true, tags: ["custom", "heritage", "teal"] },
  { id: "j-jcu-bluepattern", supplierId: "s6", supplierName: "Jersey Collector's Unite", storeId: "store-12", title: "Blue Diamond Splash Tee", description: "Deep blue with diamond pattern splash design. Premium quality fabric.", category: "Section", baseColor: "Blue/Navy", fabricType: "Premium Sublimation", pricePerPiece: 500, minOrderQuantity: 10, estimatedDeliveryDays: 7, mainImageUrl: jerseyJcuBluePattern, rating: 4.7, isTopSeller: true, isFeatured: true, tags: ["custom", "diamond", "splash"] },

  // Store 13: Jersey Tailor BD (new store with uploaded images)
  { id: "j-tailor-blue", supplierId: "s7", supplierName: "Jersey Tailor BD", storeId: "store-13", title: "Cricket Thunder — Blue & Gold", description: "Royal blue polo jersey with golden flame accents. Custom sublimation with name & number. Model M-214.", category: "Section", baseColor: "Blue/Gold", fabricType: "100% Polyester Sublimation", pricePerPiece: 550, minOrderQuantity: 10, estimatedDeliveryDays: 7, mainImageUrl: jerseyTailorBlue, rating: 4.7, isTopSeller: true, isFeatured: true, tags: ["custom", "cricket", "polo"] },
  { id: "j-tailor-purple", supplierId: "s7", supplierName: "Jersey Tailor BD", storeId: "store-13", title: "Purple Checkmate Polo", description: "Purple polo with white checkered pattern and sleek white collar. Custom sublimation. Model M-220.", category: "Section", baseColor: "Purple/White", fabricType: "100% Polyester Sublimation", pricePerPiece: 550, minOrderQuantity: 10, estimatedDeliveryDays: 7, mainImageUrl: jerseyTailorPurple, rating: 4.6, isTopSeller: true, isFeatured: true, tags: ["custom", "purple", "checkered"] },
];

// --- Testimonials ---
export const testimonials: Testimonial[] = [
  { id: "t1", name: "Rafiq Ahmed", department: "SWE Department, DIU", quote: "DIU Jersey Hub made ordering jerseys for our entire batch so easy.", avatarUrl: "https://ui-avatars.com/api/?name=RA&background=006b3f&color=fff" },
  { id: "t2", name: "Fatima Akter", department: "DIU Football Club", quote: "Our football team's jerseys looked absolutely professional.", avatarUrl: "https://ui-avatars.com/api/?name=FA&background=1a1a2e&color=fff" },
  { id: "t3", name: "Tanvir Hasan", department: "EEE Batch '25", quote: "From design selection to delivery, everything was smooth.", avatarUrl: "https://ui-avatars.com/api/?name=TH&background=2d6a4f&color=fff" },
];

// --- Categories for filter chips ---
export const categories = ["All", "Section", "Club", "Batch Jersey", "Tournament", "Departmental"] as const;
export type Category = (typeof categories)[number];
