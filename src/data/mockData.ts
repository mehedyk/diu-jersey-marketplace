// ============================================================
// MOCK DATA — Sample suppliers, jersey designs, and testimonials
// This will be replaced with database data in Phase 2
// ============================================================

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
  category: "Football" | "Cricket" | "Batch Jersey" | "Tournament" | "Departmental";
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
    brandName: "UniKit Bangladesh",
    description: "Specializing in university team kits with custom name/number printing. Official supplier for 10+ universities.",
    rating: 4.7,
    designCount: 30,
    logoUrl: "https://ui-avatars.com/api/?name=UK&background=006b3f&color=fff&size=128&bold=true",
    coverImageUrl: "",
  },
  {
    id: "s4",
    brandName: "GreenLine Jerseys",
    description: "Eco-friendly fabric options with modern designs. Great for batch and departmental jerseys.",
    rating: 4.3,
    designCount: 12,
    logoUrl: "https://ui-avatars.com/api/?name=GL&background=2d6a4f&color=fff&size=128&bold=true",
    coverImageUrl: "",
  },
];

// --- Jersey Designs ---
export const jerseyDesigns: JerseyDesign[] = [
  {
    id: "j1", supplierId: "s1", supplierName: "JerseyBD Pro",
    title: "DIU Warriors Football Kit",
    description: "Bold green and white football jersey with diagonal stripes. Breathable mesh fabric.",
    category: "Football", baseColor: "Green/White", fabricType: "Polyester Mesh",
    pricePerPiece: 520, minOrderQuantity: 15, estimatedDeliveryDays: 7,
    mainImageUrl: "https://images.unsplash.com/photo-1580087256394-dc5f7e202b59?w=400&h=500&fit=crop",
    rating: 4.9, isTopSeller: true, isFeatured: true, tags: ["football", "breathable"],
  },
  {
    id: "j2", supplierId: "s2", supplierName: "Dhaka Sports Wear",
    title: "Classic Cricket Whites",
    description: "Traditional off-white cricket jersey with green collar and cuffs. UV-protected fabric.",
    category: "Cricket", baseColor: "Off-White/Green", fabricType: "Dry-Fit Polyester",
    pricePerPiece: 480, minOrderQuantity: 12, estimatedDeliveryDays: 10,
    mainImageUrl: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=400&h=500&fit=crop",
    rating: 4.6, isTopSeller: false, isFeatured: true, tags: ["cricket", "classic"],
  },
  {
    id: "j3", supplierId: "s1", supplierName: "JerseyBD Pro",
    title: "SWE Batch '26 Special",
    description: "Exclusive batch jersey for Software Engineering 2026. Custom gradient design.",
    category: "Batch Jersey", baseColor: "Navy/Teal", fabricType: "Premium Polyester",
    pricePerPiece: 550, minOrderQuantity: 20, estimatedDeliveryDays: 8,
    mainImageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    rating: 4.8, isTopSeller: true, isFeatured: false, tags: ["batch", "custom"],
  },
  {
    id: "j4", supplierId: "s3", supplierName: "UniKit Bangladesh",
    title: "DIU Inter-Dept Tournament Tee",
    description: "Lightweight tournament jersey with moisture-wicking technology. Available in 8 color combos.",
    category: "Tournament", baseColor: "Multi-color", fabricType: "Micro-Polyester",
    pricePerPiece: 450, minOrderQuantity: 10, estimatedDeliveryDays: 5,
    mainImageUrl: "https://images.unsplash.com/photo-1503341504253-dff4f94032fc?w=400&h=500&fit=crop",
    rating: 4.5, isTopSeller: false, isFeatured: true, tags: ["tournament", "lightweight"],
  },
  {
    id: "j5", supplierId: "s3", supplierName: "UniKit Bangladesh",
    title: "EEE Department Official Jersey",
    description: "Navy blue departmental jersey with embroidered department logo. Collar neck design.",
    category: "Departmental", baseColor: "Navy Blue", fabricType: "Cotton-Poly Blend",
    pricePerPiece: 500, minOrderQuantity: 15, estimatedDeliveryDays: 9,
    mainImageUrl: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop",
    rating: 4.7, isTopSeller: true, isFeatured: false, tags: ["departmental", "embroidered"],
  },
  {
    id: "j6", supplierId: "s4", supplierName: "GreenLine Jerseys",
    title: "Eco Cricket Green",
    description: "Sustainable bamboo-blend cricket jersey. Soft touch, eco-friendly dyes.",
    category: "Cricket", baseColor: "Forest Green", fabricType: "Bamboo Blend",
    pricePerPiece: 600, minOrderQuantity: 12, estimatedDeliveryDays: 12,
    mainImageUrl: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&h=500&fit=crop",
    rating: 4.4, isTopSeller: false, isFeatured: false, tags: ["eco", "cricket"],
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
    title: "DIU Football League Champion",
    description: "Premium champion-edition football jersey with gold accents. Sublimation print.",
    category: "Football", baseColor: "Black/Gold", fabricType: "Premium Sublimation",
    pricePerPiece: 650, minOrderQuantity: 11, estimatedDeliveryDays: 6,
    mainImageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
    rating: 4.9, isTopSeller: true, isFeatured: true, tags: ["football", "premium"],
  },
  {
    id: "j9", supplierId: "s4", supplierName: "GreenLine Jerseys",
    title: "Pharmacy Dept Polo Jersey",
    description: "Smart casual polo jersey for Pharmacy department. Embroidered logo on chest.",
    category: "Departmental", baseColor: "White/Green", fabricType: "Pique Cotton",
    pricePerPiece: 520, minOrderQuantity: 15, estimatedDeliveryDays: 10,
    mainImageUrl: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&h=500&fit=crop",
    rating: 4.2, isTopSeller: false, isFeatured: false, tags: ["departmental", "polo"],
  },
  {
    id: "j10", supplierId: "s3", supplierName: "UniKit Bangladesh",
    title: "DIU Spring Tournament Kit",
    description: "Fresh spring-themed tournament kit with pastel accents. Full sublimation.",
    category: "Tournament", baseColor: "White/Pastel Green", fabricType: "Sublimation Polyester",
    pricePerPiece: 490, minOrderQuantity: 10, estimatedDeliveryDays: 7,
    mainImageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
    rating: 4.6, isTopSeller: false, isFeatured: true, tags: ["tournament", "spring"],
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
    id: "j12", supplierId: "s1", supplierName: "JerseyBD Pro",
    title: "DIU All-Star Cricket Jersey",
    description: "Premium cricket jersey with raglan sleeves and UV protection. Match-ready quality.",
    category: "Cricket", baseColor: "Green/Yellow", fabricType: "UV-Shield Polyester",
    pricePerPiece: 580, minOrderQuantity: 11, estimatedDeliveryDays: 6,
    mainImageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
    rating: 4.8, isTopSeller: true, isFeatured: false, tags: ["cricket", "premium", "uv"],
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
export const categories = ["All", "Football", "Cricket", "Batch Jersey", "Tournament", "Departmental"] as const;
export type Category = (typeof categories)[number];
