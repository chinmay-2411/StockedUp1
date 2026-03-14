export interface Container {
  id: string;
  name: string;
  category: string;
  currentWeight: number;
  maxCapacity: number;
  threshold: number;
  moduleId: string;
  imageUrl: string;
  lastRefill?: string;
}

export interface WiFiModule {
  id: string;
  name: string;
  ipAddress: string;
  signalStrength: number;
  status: "online" | "offline";
  lastPing: string;
  assignedContainer?: string;
}

export interface Recipe {
  id: string;
  name: string;
  cuisine: string;
  cookTime: number;
  difficulty: string;
  matchPercentage: number;
  imageUrl: string;
  matchedIngredients: string[];
  missingIngredients: string[];
  dietaryTags: string[];
}

export interface ShopItem {
  id: string;
  name: string;
  imageUrl: string;
  amazonPrice: number;
  blinkitPrice: number;
  zeptoPrice: number;
  category: string;
}

export const categories = [
  "All",
  "Grains",
  "Pulses",
  "Spices",
  "Oils",
  "Sweeteners",
  "Dairy",
  "Nuts & Dry Fruits",
  "Snacks",
  "Beverages",
];

export const mockContainers: Container[] = [
  {
    id: "1",
    name: "Basmati Rice",
    category: "Grains",
    currentWeight: 2400,
    maxCapacity: 5000,
    threshold: 1500,
    moduleId: "ESP_01",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    lastRefill: "2026-03-10",
  },
  {
    id: "2",
    name: "Moong Dal",
    category: "Pulses",
    currentWeight: 450,
    maxCapacity: 2000,
    threshold: 600,
    moduleId: "ESP_02",
    imageUrl: "https://images.unsplash.com/photo-1596797038530-2c107229654b",
    lastRefill: "2026-03-08",
  },
  {
    id: "3",
    name: "Turmeric Powder",
    category: "Spices",
    currentWeight: 80,
    maxCapacity: 500,
    threshold: 100,
    moduleId: "ESP_03",
    imageUrl: "https://images.unsplash.com/photo-1615485500920-20be39f79a8b",
    lastRefill: "2026-02-28",
  },
  {
    id: "4",
    name: "Wheat Flour (Atta)",
    category: "Grains",
    currentWeight: 3200,
    maxCapacity: 10000,
    threshold: 3000,
    moduleId: "ESP_04",
    imageUrl: "https://images.unsplash.com/photo-1628776214506-27ae65da1ea6",
    lastRefill: "2026-03-12",
  },
  {
    id: "5",
    name: "Toor Dal",
    category: "Pulses",
    currentWeight: 1200,
    maxCapacity: 2000,
    threshold: 600,
    moduleId: "ESP_05",
    imageUrl: "https://images.unsplash.com/photo-1596797038530-2c107229654b",
    lastRefill: "2026-03-11",
  },
  {
    id: "6",
    name: "Mustard Oil",
    category: "Oils",
    currentWeight: 450,
    maxCapacity: 1000,
    threshold: 300,
    moduleId: "ESP_06",
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
    lastRefill: "2026-03-05",
  },
  {
    id: "7",
    name: "Sugar",
    category: "Sweeteners",
    currentWeight: 800,
    maxCapacity: 2000,
    threshold: 500,
    moduleId: "ESP_07",
    imageUrl: "https://images.unsplash.com/photo-1587894266450-e5e3c784b5f5",
    lastRefill: "2026-03-09",
  },
  {
    id: "8",
    name: "Cumin Seeds",
    category: "Spices",
    currentWeight: 120,
    maxCapacity: 300,
    threshold: 80,
    moduleId: "ESP_08",
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a0b55ed90c85",
    lastRefill: "2026-03-07",
  },
];

export const mockModules: WiFiModule[] = [
  {
    id: "ESP_01",
    name: "Kitchen Module 1",
    ipAddress: "192.168.1.101",
    signalStrength: 85,
    status: "online",
    lastPing: "2 seconds ago",
    assignedContainer: "Basmati Rice",
  },
  {
    id: "ESP_02",
    name: "Kitchen Module 2",
    ipAddress: "192.168.1.102",
    signalStrength: 72,
    status: "online",
    lastPing: "3 seconds ago",
    assignedContainer: "Moong Dal",
  },
  {
    id: "ESP_03",
    name: "Kitchen Module 3",
    ipAddress: "192.168.1.103",
    signalStrength: 65,
    status: "online",
    lastPing: "5 seconds ago",
    assignedContainer: "Turmeric Powder",
  },
  {
    id: "ESP_04",
    name: "Kitchen Module 4",
    ipAddress: "192.168.1.104",
    signalStrength: 90,
    status: "online",
    lastPing: "1 second ago",
    assignedContainer: "Wheat Flour (Atta)",
  },
  {
    id: "ESP_05",
    name: "Kitchen Module 5",
    ipAddress: "192.168.1.105",
    signalStrength: 45,
    status: "offline",
    lastPing: "2 minutes ago",
    assignedContainer: "Toor Dal",
  },
];

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    name: "Dal Khichdi",
    cuisine: "Indian",
    cookTime: 30,
    difficulty: "Easy",
    matchPercentage: 95,
    imageUrl: "https://images.unsplash.com/photo-1645177628172-a94c30a5e8e8",
    matchedIngredients: ["Basmati Rice", "Moong Dal", "Turmeric Powder", "Cumin Seeds"],
    missingIngredients: ["Ghee", "Ginger"],
    dietaryTags: ["Vegetarian", "Gluten-free"],
  },
  {
    id: "2",
    name: "Chapati",
    cuisine: "Indian",
    cookTime: 20,
    difficulty: "Easy",
    matchPercentage: 90,
    imageUrl: "https://images.unsplash.com/photo-1617093727343-374698b1b08d",
    matchedIngredients: ["Wheat Flour (Atta)"],
    missingIngredients: ["Water", "Salt"],
    dietaryTags: ["Vegan", "Vegetarian"],
  },
  {
    id: "3",
    name: "Dal Tadka",
    cuisine: "Indian",
    cookTime: 35,
    difficulty: "Medium",
    matchPercentage: 85,
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d",
    matchedIngredients: ["Toor Dal", "Turmeric Powder", "Cumin Seeds", "Mustard Oil"],
    missingIngredients: ["Tomatoes", "Onions", "Garlic"],
    dietaryTags: ["Vegetarian", "Gluten-free"],
  },
  {
    id: "4",
    name: "Jeera Rice",
    cuisine: "Indian",
    cookTime: 25,
    difficulty: "Easy",
    matchPercentage: 88,
    imageUrl: "https://images.unsplash.com/photo-1596560548464-f010549b84d7",
    matchedIngredients: ["Basmati Rice", "Cumin Seeds"],
    missingIngredients: ["Ghee", "Bay Leaves"],
    dietaryTags: ["Vegetarian", "Gluten-free"],
  },
];

export const mockShopItems: ShopItem[] = [
  {
    id: "1",
    name: "Moong Dal",
    imageUrl: "https://images.unsplash.com/photo-1596797038530-2c107229654b",
    amazonPrice: 145,
    blinkitPrice: 152,
    zeptoPrice: 148,
    category: "Pulses",
  },
  {
    id: "2",
    name: "Turmeric Powder",
    imageUrl: "https://images.unsplash.com/photo-1615485500920-20be39f79a8b",
    amazonPrice: 85,
    blinkitPrice: 79,
    zeptoPrice: 82,
    category: "Spices",
  },
  {
    id: "3",
    name: "Mustard Oil",
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
    amazonPrice: 235,
    blinkitPrice: 245,
    zeptoPrice: 239,
    category: "Oils",
  },
];

export const weightHistoryData = [
  { day: "Mon", weight: 2800 },
  { day: "Tue", weight: 2650 },
  { day: "Wed", weight: 2500 },
  { day: "Thu", weight: 2350 },
  { day: "Fri", weight: 2200 },
  { day: "Sat", weight: 2100 },
  { day: "Sun", weight: 2400 },
];

export const consumptionData = [
  { name: "Basmati Rice", value: 2600 },
  { name: "Wheat Flour", value: 6800 },
  { name: "Moong Dal", value: 1550 },
  { name: "Toor Dal", value: 800 },
  { name: "Sugar", value: 1200 },
  { name: "Turmeric", value: 420 },
  { name: "Cumin", value: 180 },
  { name: "Mustard Oil", value: 550 },
];
