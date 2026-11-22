export type MenuCategory =
  | 'All'
  | 'Coffee & Matcha'
  | 'Breakfast & Toasts'
  | 'Savory Plates'
  | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'All'>;
  price: number;
  description: string;
  image: string;
  highlightNote?: string;
  featured?: boolean;
  menuPhotoIndex: number;
}

export interface MenuPhotoPage {
  id: number;
  title: string;
  sectionLabel: string;
  subtitle: string;
  image: string;
  featuredItemIds: string[];
}

export interface GuestReview {
  id: string;
  quote: string;
  author: string;
  context: string;
  rating: number;
  category: 'Coffee' | 'Food' | 'Ambience' | 'Service';
}

export const CAFE_INFO = {
  name: 'Cafe Black Cat & Wolf',
  shortName: 'Cafe Black Cat & Wolf',
  rating: 4.7,
  reviewCount: 587,
  positiveHighlightsCount: 343,
  priceRange: '₹200–1,000',
  pricePerPersonText: '₹200–1,000 per person',
  priceReportedBy: 283,
  category: 'Cafe',
  status: 'Open',
  closesAt: '12 AM',
  hoursSummary: 'Open · Closes 12 AM',
  address: 'Pradeep Chambers, Law College Rd, Deccan Gymkhana, Pune, Maharashtra 411004',
  shortAddress: 'Pradeep Chambers, Law College Rd, Deccan Gymkhana, Pune',
  neighborhood: 'Law College Rd, Deccan Gymkhana, Pune',
  description:
    'Cozy, pet-friendly cafe serving specialty coffee and breakfast favorites like avocado toast.',
  reviewSummary:
    'People say this cafe offers delicious food, including flavorful pasta, fresh sandwiches, and excellent coffee and desserts. They also highlight the cozy, calm, and aesthetically pleasing ambiance, making it a great spot for relaxing or working. Guests mention the staff provides friendly, attentive, and prompt service.',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Cafe+Black+Cat+%26+Wolf+Pradeep+Chambers+Law+College+Rd+Deccan+Gymkhana+Pune+Maharashtra+411004',
  heroImage: '/src/assets/images/cafe_black_cat_hero_1795355336823.jpg',
};

export const IMAGES = {
  hero: '/src/assets/images/cafe_black_cat_hero_1795355336823.jpg',
  coffeeMatcha: '/src/assets/images/coffee_pistachio_matcha_1795355321351.jpg',
  savoryPizzaPasta: '/src/assets/images/savory_pizza_pasta_1795355321754.jpg',
  bakeryDesserts: '/src/assets/images/bakery_french_toast_1795355321784.jpg',
  breakfastColdBrew: '/src/assets/images/avocado_toast_sandwich_1795355321539.jpg',
};

export const RATING_DISTRIBUTION = [
  { stars: 5, count: 468, percentage: 79.7 },
  { stars: 4, count: 79, percentage: 13.5 },
  { stars: 3, count: 24, percentage: 4.1 },
  { stars: 2, count: 9, percentage: 1.5 },
  { stars: 1, count: 7, percentage: 1.2 },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'pistachio-latte',
    name: 'Pistachio Latte',
    category: 'Coffee & Matcha',
    price: 340,
    description:
      'Double-shot house espresso poured over roasted pistachio cream and silky steamed milk, finished with crushed green pistachios.',
    image: IMAGES.coffeeMatcha,
    highlightNote: 'House Favorite',
    featured: true,
    menuPhotoIndex: 1,
  },
  {
    id: 'avocado-toast',
    name: 'Avocado Toast',
    category: 'Breakfast & Toasts',
    price: 420,
    description:
      'Country sourdough layered with smashed Hass avocado, toasted pumpkin seeds, sea salt flakes, fresh herbs, and a soft poached egg.',
    image: IMAGES.breakfastColdBrew,
    highlightNote: 'Breakfast Signature',
    featured: true,
    menuPhotoIndex: 3,
  },
  {
    id: 'mushroom-pizza-burrata',
    name: 'Mushroom Pizza with Burrata Cheese',
    category: 'Savory Plates',
    price: 690,
    description:
      'Stone-baked sourdough crust topped with roasted wild mushrooms, thyme, garlic oil, and a whole fresh burrata ball.',
    image: IMAGES.savoryPizzaPasta,
    highlightNote: 'Wood-Fired',
    featured: true,
    menuPhotoIndex: 9,
  },
  {
    id: 'pesto-pasta-garlic-bread',
    name: 'Pesto Pasta with Garlic Bread',
    category: 'Savory Plates',
    price: 540,
    description:
      'Al dente fusilli tossed in fresh basil and toasted pine nut pesto, blistered cherry tomatoes, and two slices of warm garlic bread.',
    image: IMAGES.savoryPizzaPasta,
    highlightNote: 'Chef Recommended',
    featured: true,
    menuPhotoIndex: 8,
  },
  {
    id: 'burnt-basque-cheesecake',
    name: 'Burnt Basque Cheesecake',
    category: 'Desserts',
    price: 380,
    description:
      'Caramelized deep amber crust with a custardy, melt-in-the-mouth vanilla bean cream cheese center.',
    image: IMAGES.bakeryDesserts,
    highlightNote: 'Daily Bake',
    featured: true,
    menuPhotoIndex: 14,
  },
  {
    id: 'iced-matcha-latte-chips',
    name: 'Iced Matcha Latte and Chips',
    category: 'Coffee & Matcha',
    price: 390,
    description:
      'Ceremonial-grade whisked Japanese matcha over cold milk and ice, paired with crisp sea-salted kettle chips.',
    image: IMAGES.coffeeMatcha,
    highlightNote: 'Most Ordered',
    featured: true,
    menuPhotoIndex: 2,
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    category: 'Coffee & Matcha',
    price: 260,
    description:
      '18g double ristretto espresso balanced with velvety microfoam for a smooth, chocolate-forward finish.',
    image: IMAGES.coffeeMatcha,
    menuPhotoIndex: 1,
  },
  {
    id: 'vietnamese-cold-brew',
    name: 'Vietnamese Cold Brew',
    category: 'Coffee & Matcha',
    price: 290,
    description:
      '18-hour slow-steeped dark roast cold brew layered over rich sweetened condensed milk and crystal ice.',
    image: IMAGES.breakfastColdBrew,
    menuPhotoIndex: 2,
  },
  {
    id: 'chocolaty-french-toast',
    name: 'Chocolaty French Toast',
    category: 'Desserts',
    price: 410,
    description:
      'Thick-cut brioche soaked in cinnamon custard, griddled golden, and finished with dark chocolate ganache, berries, and vanilla gelato.',
    image: IMAGES.bakeryDesserts,
    menuPhotoIndex: 13,
  },
  {
    id: 'souffle-vanilla-sauce',
    name: 'Souffle with Vanilla Sauce',
    category: 'Desserts',
    price: 430,
    description:
      'Light, airy warm baked souffle dusted with confectioners sugar and served table-side with warm Madagascar vanilla bean anglaise.',
    image: IMAGES.bakeryDesserts,
    menuPhotoIndex: 15,
  },
  {
    id: 'sandwich-chips-dip',
    name: 'Sandwich with Chips and Dip',
    category: 'Breakfast & Toasts',
    price: 360,
    description:
      'Grilled artisanal sourdough sandwich packed with roasted fillings and greens, served alongside crisp house chips and herb dip.',
    image: IMAGES.breakfastColdBrew,
    menuPhotoIndex: 5,
  },
  {
    id: 'hand-cut-fries',
    name: 'Hand Cut Fries',
    category: 'Savory Plates',
    price: 250,
    description:
      'Double-cooked skin-on potato fries tossed with rosemary sea salt.',
    image: IMAGES.savoryPizzaPasta,
    menuPhotoIndex: 6,
  },
  {
    id: 'fries-with-dips',
    name: 'Fries with Dips',
    category: 'Savory Plates',
    price: 290,
    description:
      'Crispy golden fries served with house roasted garlic aioli and smoky chipotle dip.',
    image: IMAGES.savoryPizzaPasta,
    menuPhotoIndex: 7,
  },
  {
    id: 'fried-mozzarella-sticks',
    name: 'Fried Mozzarella Sticks with Dip',
    category: 'Savory Plates',
    price: 340,
    description:
      'Herb-crusted golden mozzarella batons with a warm molten center and spiced marinara dip.',
    image: IMAGES.savoryPizzaPasta,
    menuPhotoIndex: 10,
  },
];

export const MENU_PHOTO_PAGES: MenuPhotoPage[] = [
  {
    id: 1,
    title: 'Menu Photo 1',
    sectionLabel: 'Espresso & Pistachio Specials',
    subtitle: 'Pistachio Latte, Flat White, Cortado & Single-Origin Pour Overs',
    image: IMAGES.coffeeMatcha,
    featuredItemIds: ['pistachio-latte', 'flat-white'],
  },
  {
    id: 2,
    title: 'Menu Photo 2',
    sectionLabel: 'Cold Brews & Iced Matcha',
    subtitle: 'Vietnamese Cold Brew, Iced Matcha Latte and Chips, Espresso Tonic',
    image: IMAGES.coffeeMatcha,
    featuredItemIds: ['vietnamese-cold-brew', 'iced-matcha-latte-chips'],
  },
  {
    id: 3,
    title: 'Menu Photo 3',
    sectionLabel: 'All-Day Breakfast & Toasts',
    subtitle: 'Sourdough Avocado Toast, Poached Eggs & Morning Plates',
    image: IMAGES.breakfastColdBrew,
    featuredItemIds: ['avocado-toast'],
  },
  {
    id: 4,
    title: 'Menu Photo 4',
    sectionLabel: 'Cozy Window Seating & Pet Treats',
    subtitle: 'Sunlit work tables, pup cups, and calm Law College Road corners',
    image: IMAGES.hero,
    featuredItemIds: ['flat-white', 'avocado-toast'],
  },
  {
    id: 5,
    title: 'Menu Photo 5',
    sectionLabel: 'Artisan Sandwiches',
    subtitle: 'Toasted Sourdough Sandwiches with Kettle Chips and House Dip',
    image: IMAGES.breakfastColdBrew,
    featuredItemIds: ['sandwich-chips-dip'],
  },
  {
    id: 6,
    title: 'Menu Photo 6',
    sectionLabel: 'Hand Cut Fries & Small Plates',
    subtitle: 'Fresh-cut rosemary salted fries prepared crisp to order',
    image: IMAGES.savoryPizzaPasta,
    featuredItemIds: ['hand-cut-fries'],
  },
  {
    id: 7,
    title: 'Menu Photo 7',
    sectionLabel: 'Shareable Fries & House Dips',
    subtitle: 'Fries with Roasted Garlic Aioli, Chipotle & Herb Dips',
    image: IMAGES.savoryPizzaPasta,
    featuredItemIds: ['fries-with-dips'],
  },
  {
    id: 8,
    title: 'Menu Photo 8',
    sectionLabel: 'Fresh Pastas & Garlic Bread',
    subtitle: 'Basil Pesto Pasta served with golden toasted Garlic Bread',
    image: IMAGES.savoryPizzaPasta,
    featuredItemIds: ['pesto-pasta-garlic-bread'],
  },
  {
    id: 9,
    title: 'Menu Photo 9',
    sectionLabel: 'Sourdough Pizzas',
    subtitle: 'Mushroom Pizza topped with fresh creamy Burrata Cheese',
    image: IMAGES.savoryPizzaPasta,
    featuredItemIds: ['mushroom-pizza-burrata'],
  },
  {
    id: 10,
    title: 'Menu Photo 10',
    sectionLabel: 'Cheese Starters & Crispy Bites',
    subtitle: 'Fried Mozzarella Sticks with warm house marinara Dip',
    image: IMAGES.savoryPizzaPasta,
    featuredItemIds: ['fried-mozzarella-sticks'],
  },
  {
    id: 11,
    title: 'Menu Photo 11',
    sectionLabel: 'Afternoon Coffee & Work Pairings',
    subtitle: 'Iced Matcha Latte and Chips paired with quiet Wi-Fi corners',
    image: IMAGES.coffeeMatcha,
    featuredItemIds: ['iced-matcha-latte-chips', 'pistachio-latte'],
  },
  {
    id: 12,
    title: 'Menu Photo 12',
    sectionLabel: 'Evening Brunch Favorites',
    subtitle: 'Sandwich with Chips and Dip & Vietnamese Cold Brew pairings',
    image: IMAGES.breakfastColdBrew,
    featuredItemIds: ['sandwich-chips-dip', 'vietnamese-cold-brew'],
  },
  {
    id: 13,
    title: 'Menu Photo 13',
    sectionLabel: 'Sweet Brioche & French Toast',
    subtitle: 'Chocolaty French Toast with dark ganache and berries',
    image: IMAGES.bakeryDesserts,
    featuredItemIds: ['chocolaty-french-toast'],
  },
  {
    id: 14,
    title: 'Menu Photo 14',
    sectionLabel: 'Cheesecakes & Counter Bakes',
    subtitle: 'Caramelized Burnt Basque Cheesecake baked fresh daily',
    image: IMAGES.bakeryDesserts,
    featuredItemIds: ['burnt-basque-cheesecake'],
  },
  {
    id: 15,
    title: 'Menu Photo 15',
    sectionLabel: 'Warm Oven Desserts',
    subtitle: 'Baked Souffle served with warm Madagascar Vanilla Sauce',
    image: IMAGES.bakeryDesserts,
    featuredItemIds: ['souffle-vanilla-sauce'],
  },
  {
    id: 16,
    title: 'Menu Photo 16',
    sectionLabel: 'Late-Night Cafe Classics (Till 12 AM)',
    subtitle: 'Full coffee bar, desserts, fries, and pizzas served until midnight',
    image: IMAGES.hero,
    featuredItemIds: ['burnt-basque-cheesecake', 'pistachio-latte'],
  },
];

export const GUEST_REVIEWS: GuestReview[] = [
  {
    id: 'rev-1',
    quote:
      'Cute ambience, great food, calming vibes, and the sweetest cafe experience ever.',
    author: 'Aarav Kulkarni',
    context: 'Google Review · Deccan Gymkhana',
    rating: 5,
    category: 'Ambience',
  },
  {
    id: 'rev-2',
    quote:
      "Enjoyed a great breakfast and Yash's service and coffee was very good.",
    author: 'Meera Deshmukh',
    context: 'Google Review · Breakfast & Coffee',
    rating: 5,
    category: 'Service',
  },
  {
    id: 'rev-3',
    quote:
      'Amazing place with cozy atmosphere, delicious food, and professional staff.',
    author: 'Rohan Joshi',
    context: 'Google Review · Dinner & Desserts',
    rating: 5,
    category: 'Food',
  },
];
