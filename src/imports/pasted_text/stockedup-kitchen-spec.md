Build a mobile app called "StockedUp" — a smart kitchen inventory 
management system. Here is the full specification:

---

🎨 DESIGN & AESTHETICS
- Minimalist background: deep off-white (#F7F5F0) or soft cream with 
  subtle grain texture
- Accent palette: warm terracotta (#E07A5F), sage green (#81B29A), 
  golden yellow (#F2CC8F), soft navy (#3D405B)
- Use food/ingredient photography as card backgrounds with dark overlays
- Rounded cards (24px radius), soft shadows, generous whitespace
- Font pairing: "Playfair Display" for headings, "DM Sans" for body
- Smooth transitions and micro-animations throughout
- Bottom navigation bar with 5 tabs

---

📱 SCREENS & FEATURES

1. SPLASH / ONBOARDING SCREEN
   - Animated logo: a smart pantry shelf icon
   - Tagline: "Your Kitchen, Intelligently Stocked"
   - 3 onboarding slides explaining: weight sensing, smart alerts, 
     recipe suggestions
   - "Get Started" CTA button

2. HOME DASHBOARD
   - Greeting header: "Good Morning, [Name] 👋"
   - Summary cards: Total containers, Low stock alerts, Today's recipes
   - "Most Consumed This Week" horizontal bar chart
   - Quick-add container FAB button
   - Recent activity feed

3. CONTAINERS SCREEN (Main Feature)
   - Grid of container cards, each showing:
     * Ingredient photo + name
     * Circular weight gauge (%) with animated fill
     * Current weight (in grams/kg) received from ESP8266 via WebSocket/MQTT
     * WiFi module ID it's connected to
     * Color coded: Green (>60%), Yellow (30-60%), Red (<30%)
     * "Refill" button on each card
   - Filter tabs: All | Grains | Pulses | Spices | Oils | Dairy | Snacks
   - Ingredient categories and sub-types:
     * GRAINS: Basmati Rice, Brown Rice, Wheat Flour (Atta), Semolina (Suji), 
               Poha, Oats, Cornmeal, Millet (Bajra), Jowar
     * PULSES: Moong Dal, Toor Dal, Chana Dal, Urad Dal, Masoor Dal, 
               Rajma (Kidney Beans), Chole (Chickpeas), Lobiya, Moth Dal
     * SPICES: Turmeric, Cumin, Coriander, Chili Powder, Garam Masala, 
               Mustard Seeds, Fenugreek, Cardamom, Cinnamon, Bay Leaves, 
               Cloves, Black Pepper, Asafoetida (Hing), Ajwain
     * OILS: Mustard Oil, Coconut Oil, Sunflower Oil, Olive Oil, Ghee
     * SWEETENERS: Sugar, Jaggery, Honey, Brown Sugar
     * DAIRY: Milk Powder, Paneer Mix
     * NUTS & DRY FRUITS: Almonds, Cashews, Raisins, Walnuts, Pistachios
     * SNACKS: Popcorn Kernels, Murmura, Namkeen, Biscuits
     * BEVERAGES: Tea Leaves, Coffee Powder, Protein Powder

4. ADD / REFILL CONTAINER SCREEN
   - Form fields: Ingredient name (with search + autocomplete), Category, 
     Sub-type, Container capacity (max weight), WiFi module selector, 
     Set low-stock threshold, Upload container photo, Notes
   - "Refill Container" mode: shows current weight, target weight, 
     calculates how much to add, logs refill history with timestamp

5. WIFI MODULE MANAGER
   - List of connected ESP8266 modules with:
     * Module name/ID, IP address, signal strength (RSSI bars)
     * Last ping timestamp, assigned container
     * Online/Offline status badge
   - "Add New Module" flow: enter IP/hostname, test connection, assign container
   - Real-time weight updates via WebSocket or MQTT broker
   - Auto-reconnect logic shown as animated pulse indicator

6. WEIGHT & ALERTS SCREEN
   - Per-container weight history graph (7-day line chart)
   - Set custom alert thresholds per container (slider UI)
   - Alert types: Push notification, In-app banner, Daily digest
   - Notification history log
   - "Consumption Analytics": which ingredients are used most 
     (animated bar chart, sortable by week/month)
   - Predicted restock date based on consumption rate

7. SHOP / REORDER SCREEN
   - For each low-stock ingredient, show:
     * Product image, current price from Amazon, Blinkit, Zepto
     * Price comparison side by side with best deal highlighted
     * "Buy on Amazon" / "Order on Blinkit" / "Get on Zepto" deep-link buttons
     * Estimated delivery time per platform
   - "Add to Cart" aggregator (groups items for one-click ordering)
   - Price alert toggle: notify when price drops
   - Note: Use affiliate/product search URLs for Amazon 
     (amazon.in/s?k=ingredient+name), Blinkit (blinkit.com), 
     Zepto (zeptonow.com) as redirect links

8. RECIPES SCREEN
   - AI-powered recipe suggestions based on:
     * Current available ingredients (from weight sensors > threshold)
     * User-specified additional ingredients (text input)
     * Dietary preferences filter (Veg / Vegan / Jain / Gluten-free)
   - Recipe cards with: dish photo, name, cuisine type, cook time, 
     difficulty, matched ingredients %, missing ingredients list
   - Tap recipe → full recipe detail with step-by-step instructions
   - "What can I cook tonight?" magic button
   - Ingredient type guide section: shows nutritional info and 
     cooking uses for each ingredient type

9. ANALYTICS / INSIGHTS SCREEN
   - "Most Consumed Ingredients" — horizontal bar chart (top 10)
   - Monthly consumption trend — area chart
   - Money saved tracker (vs buying without planning)
   - Waste reduction score
   - Container utilization heatmap
   - Weekly summary push notification digest

10. SETTINGS SCREEN
    - User profile, household size
    - Units: grams / kg toggle
    - Notification preferences
    - WiFi module management
    - Theme: Light / Dark / Auto
    - Data sync & backup
    - App version info

---

🔌 ESP8266 / IoT INTEGRATION
- Protocol: WebSocket (ws://) or MQTT
- ESP8266 sends JSON payload every 5 seconds:
  {"module_id": "ESP_01", "weight_grams": 342.5, "timestamp": 1234567890}
- App maintains persistent connection, auto-reconnects on drop
- Show live weight with animated number ticker

---

🔔 NOTIFICATIONS
- Low stock alert: "⚠️ Your Moong Dal is almost empty! Only 150g left."
- Refill reminder: "Time to restock! 3 containers need refilling."
- Recipe suggestion: "🍳 You can make Khichdi with what you have!"
- Price drop: "📉 Toor Dal is 15% cheaper on Blinkit today!"

---

🎯 INTERACTION & ANIMATIONS
- Container cards: tap to expand with spring animation
- Weight gauge: animated circular progress with fill animation on load
- Refill button: triggers confetti animation on completion
- Low stock cards: gentle pulsing red glow
- Tab transitions: slide + fade
- Pull to refresh with custom pantry-themed loader
- Haptic feedback on alerts and confirmations