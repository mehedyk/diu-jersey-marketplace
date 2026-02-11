// ============================================================
// MOCK DATA — Sample suppliers, jersey designs, and testimonials
// ============================================================

import jerseySports11 from "@/assets/jersey-sports11.jpg";
import jerseyTealPolo from "@/assets/jersey-teal-polo.jpg";
import jerseyDikaSports from "@/assets/jersey-dika-sports.jpg";
import jerseyEeeChbd from "@/assets/jersey-eee-chbd.jpg";
import jerseySweBlue from "@/assets/jersey-swe-blue.jpg";
import jerseySweGreen from "@/assets/jersey-swe-green.jpg";

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

export interface Testimonial {
  id: string;
  name: string;
  department: string;
  quote: string;
  avatarUrl: string;
}

// --- Suppliers ---
export const suppliers: Supplier[] = [
  {
    id: "s1",
    brandName: "JerseyBD Pro",
    description: "Premium sublimation jerseys trusted by 50+ university teams across Bangladesh. Fast delivery and vibrant prints.",
    rating: 4.8,
    designCount: 25,
    logoUrl: "https://ui-avatars.com/api/?name=JB&background=006b3f&color=fff&size=128&bold=true",
    coverImageUrl: "",
  },
  {
    id: "s2",
    brandName: "Dhaka Sports Wear",
    description: "Affordable quality jerseys for clubs and departments. Bulk orders with competitive pricing since 2018.",
    rating: 4.5,
    designCount: 18,
    logoUrl: "https://ui-avatars.com/api/?name=DS&background=1a1a2e&color=fff&size=128&bold=true",
    coverImageUrl: "",
  },
  {
    id: "s3",
    brandName: "Concept House BD",
    description: "Specializing in university team kits with custom name/number printing. Official supplier for 10+ universities.",
    rating: 4.7,
    designCount: 30,
    logoUrl: "https://ui-avatars.com/api/?name=CH&background=006b3f&color=fff&size=128&bold=true",
    coverImageUrl: "",
  },
  {
    id: "s4",
    brandName: "Kapor Sports",
    description: "Eco-friendly fabric options with modern designs. Great for batch and departmental jerseys.",
    rating: 4.3,
    designCount: 12,
    logoUrl: "https://ui-avatars.com/api/?name=KS&background=2d6a4f&color=fff&size=128&bold=true",
    coverImageUrl: "",
  },
];

// --- Jersey Designs ---
export const jerseyDesigns: JerseyDesign[] = [
  {
    id: "j1", supplierId: "s1", supplierName: "JerseyBD Pro",
    title: "Sports Jersey 11 — Pink Splash",
    description: "Bold pink and navy football jersey with splash art design. Breathable mesh fabric.",
    category: "Club", baseColor: "Pink/Navy", fabricType: "Polyester Mesh",
    pricePerPiece: 520, minOrderQuantity: 15, estimatedDeliveryDays: 7,
    mainImageUrl: jerseySports11,
    rating: 4.9, isTopSeller: true, isFeatured: true, tags: ["club", "breathable"],
  },
  {
    id: "j2", supplierId: "s3", supplierName: "Concept House BD",
    title: "Teal Wave Polo Jersey",
    description: "Stunning teal polo jersey with abstract wave pattern. Collar design with premium finish.",
    category: "Section", baseColor: "Teal/White", fabricType: "Dry-Fit Polyester",
    pricePerPiece: 550, minOrderQuantity: 12, estimatedDeliveryDays: 10,
    mainImageUrl: jerseyTealPolo,
    rating: 4.6, isTopSeller: false, isFeatured: true, tags: ["section", "polo"],
  },
  {
    id: "j3", supplierId: "s2", supplierName: "Dhaka Sports Wear",
    title: "DIKA Sports Player 01",
    description: "Gray and black gradient jersey with red accents. Perfect for tournament and club wear.",
    category: "Club", baseColor: "Gray/Black/Red", fabricType: "Premium Polyester",
    pricePerPiece: 480, minOrderQuantity: 11, estimatedDeliveryDays: 8,
    mainImageUrl: jerseyDikaSports,
    rating: 4.8, isTopSeller: true, isFeatured: false, tags: ["club", "tournament"],
  },
  {
    id: "j4", supplierId: "s3", supplierName: "Concept House BD",
    title: "EEE Department — Circuit Board",
    description: "Black and cyan circuit board themed jersey for EEE department. Half sleeve, collar, round neck available.",
    category: "Section", baseColor: "Black/Cyan", fabricType: "Sublimation Polyester",
    pricePerPiece: 500, minOrderQuantity: 10, estimatedDeliveryDays: 7,
    mainImageUrl: jerseyEeeChbd,
    rating: 4.7, isTopSeller: true, isFeatured: true, tags: ["section", "departmental"],
  },
  {
    id: "j5", supplierId: "s4", supplierName: "Kapor Sports",
    title: "SWE Department — Neon Tech",
    description: "Software Engineering department jersey with neon blue electric effects. Leaf jacquard fabric.",
    category: "Section", baseColor: "Black/Neon Blue", fabricType: "Leaf Jacquard",
    pricePerPiece: 580, minOrderQuantity: 15, estimatedDeliveryDays: 9,
    mainImageUrl: jerseySweBlue,
    rating: 4.8, isTopSeller: true, isFeatured: true, tags: ["section", "premium"],
  },
  {
    id: "j6", supplierId: "s4", supplierName: "Kapor Sports",
    title: "SWE Department — Classic Green",
    description: "Deep green Software Engineering jersey with white accents. Classic design, premium quality.",
    category: "Section", baseColor: "Dark Green/White", fabricType: "Premium Polyester",
    pricePerPiece: 550, minOrderQuantity: 12, estimatedDeliveryDays: 8,
    mainImageUrl: jerseySweGreen,
    rating: 4.5, isTopSeller: false, isFeatured: true, tags: ["section", "classic"],
  },
  {
    id: "j7", supplierId: "s2", supplierName: "Dhaka Sports Wear",
    title: "CSE Batch '25 Reunion Kit",
    description: "Maroon and gold batch reunion jersey. Comes with matching shorts option.",
    category: "Batch Jersey", baseColor: "Maroon/Gold", fabricType: "Polyester",
    pricePerPiece: 470, minOrderQuantity: 20, estimatedDeliveryDays: 7,
    mainImageUrl: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=500&fit=crop",
    rating: 4.3, isTopSeller: false, isFeatured: false, tags: ["batch", "reunion"],
  },
  {
    id: "j8", supplierId: "s1", supplierName: "JerseyBD Pro",
    title: "DIU Club League Champion",
    description: "Premium champion-edition club jersey with gold accents. Sublimation print.",
    category: "Club", baseColor: "Black/Gold", fabricType: "Premium Sublimation",
    pricePerPiece: 650, minOrderQuantity: 11, estimatedDeliveryDays: 6,
    mainImageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
    rating: 4.9, isTopSeller: true, isFeatured: true, tags: ["club", "premium"],
  },
  {
    id: "j9", supplierId: "s3", supplierName: "Concept House BD",
    title: "Pharmacy Dept Polo Jersey",
    description: "Smart casual polo jersey for Pharmacy department. Embroidered logo on chest.",
    category: "Departmental", baseColor: "White/Green", fabricType: "Pique Cotton",
    pricePerPiece: 520, minOrderQuantity: 15, estimatedDeliveryDays: 10,
    mainImageUrl: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&h=500&fit=crop",
    rating: 4.2, isTopSeller: false, isFeatured: false, tags: ["departmental", "polo"],
  },
  {
    id: "j10", supplierId: "s1", supplierName: "JerseyBD Pro",
    title: "DIU Spring Tournament Kit",
    description: "Fresh spring-themed tournament kit with pastel accents. Full sublimation.",
    category: "Tournament", baseColor: "White/Pastel Green", fabricType: "Sublimation Polyester",
    pricePerPiece: 490, minOrderQuantity: 10, estimatedDeliveryDays: 7,
    mainImageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
    rating: 4.6, isTopSeller: false, isFeatured: false, tags: ["tournament", "spring"],
  },
  {
    id: "j11", supplierId: "s2", supplierName: "Dhaka Sports Wear",
    title: "BBA Batch '27 V-Neck",
    description: "Stylish v-neck batch jersey in royal blue. Comfortable for all-day wear.",
    category: "Batch Jersey", baseColor: "Royal Blue", fabricType: "Combed Cotton",
    pricePerPiece: 430, minOrderQuantity: 25, estimatedDeliveryDays: 8,
    mainImageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=500&fit=crop",
    rating: 4.4, isTopSeller: false, isFeatured: false, tags: ["batch", "v-neck"],
  },
  {
    id: "j12", supplierId: "s3", supplierName: "Concept House BD",
    title: "DIU All-Star Club Jersey",
    description: "Premium club jersey with raglan sleeves and UV protection. Match-ready quality.",
    category: "Club", baseColor: "Green/Yellow", fabricType: "UV-Shield Polyester",
    pricePerPiece: 580, minOrderQuantity: 11, estimatedDeliveryDays: 6,
    mainImageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
    rating: 4.8, isTopSeller: true, isFeatured: false, tags: ["club", "premium", "uv"],
  },
];

// --- Testimonials ---
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rafiq Ahmed",
    department: "SWE Department, DIU",
    quote: "DIU Jersey Hub made ordering jerseys for our entire batch so easy. We compared 5 suppliers and got the best deal in just 2 days!",
    avatarUrl: "https://ui-avatars.com/api/?name=RA&background=006b3f&color=fff",
  },
  {
    id: "t2",
    name: "Fatima Akter",
    department: "DIU Football Club",
    quote: "Our football team's jerseys looked absolutely professional. The suppliers on this platform really understand university sports needs.",
    avatarUrl: "https://ui-avatars.com/api/?name=FA&background=1a1a2e&color=fff",
  },
  {
    id: "t3",
    name: "Tanvir Hasan",
    department: "EEE Batch '25",
    quote: "From design selection to delivery, everything was smooth. We got our batch jerseys exactly as we wanted. Highly recommend!",
    avatarUrl: "https://ui-avatars.com/api/?name=TH&background=2d6a4f&color=fff",
  },
];

// --- Categories for filter chips ---
export const categories = ["All", "Section", "Club", "Batch Jersey", "Tournament", "Departmental"] as const;
export type Category = (typeof categories)[number];
