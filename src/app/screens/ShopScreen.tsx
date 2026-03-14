import { motion } from "motion/react";
import { ExternalLink, TrendingDown, ShoppingBag } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { mockShopItems, mockContainers } from "../data/mockData";

export function ShopScreen() {
  const lowStockItems = mockContainers.filter(
    (c) => (c.currentWeight / c.maxCapacity) * 100 < 30
  );

  const getBestPrice = (item: typeof mockShopItems[0]) => {
    const prices = [
      { platform: "Amazon", price: item.amazonPrice },
      { platform: "Blinkit", price: item.blinkitPrice },
      { platform: "Zepto", price: item.zeptoPrice },
    ];
    return prices.reduce((min, p) => (p.price < min.price ? p : min));
  };

  return (
    <div className="min-h-screen px-4 py-6 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-1">Shop & Reorder</h1>
        <p className="text-gray-600">Compare prices and restock easily</p>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-4 rounded-2xl shadow-sm bg-red-50 border-red-200 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-red-900">
                  {lowStockItems.length} items running low
                </h3>
                <p className="text-sm text-red-700">Time to restock your pantry!</p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Shop Items */}
      <div className="space-y-4">
        {mockShopItems.map((item, index) => {
          const bestDeal = getBestPrice(item);
          const savings =
            Math.max(item.amazonPrice, item.blinkitPrice, item.zeptoPrice) - bestDeal.price;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-5 rounded-3xl shadow-sm bg-white overflow-hidden">
                <div className="flex gap-4 mb-4">
                  {/* Product Image */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-24 h-24 rounded-2xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                    <Badge variant="secondary" className="mb-2">
                      {item.category}
                    </Badge>
                    {savings > 0 && (
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingDown className="w-4 h-4" />
                        <span className="text-sm font-medium">Save ₹{savings}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price Comparison */}
                <div className="space-y-3">
                  <PriceCard
                    platform="Amazon"
                    price={item.amazonPrice}
                    isBest={bestDeal.platform === "Amazon"}
                    url={`https://amazon.in/s?k=${encodeURIComponent(item.name)}`}
                  />
                  <PriceCard
                    platform="Blinkit"
                    price={item.blinkitPrice}
                    isBest={bestDeal.platform === "Blinkit"}
                    url={`https://blinkit.com/search?q=${encodeURIComponent(item.name)}`}
                  />
                  <PriceCard
                    platform="Zepto"
                    price={item.zeptoPrice}
                    isBest={bestDeal.platform === "Zepto"}
                    url={`https://zeptonow.com/search?query=${encodeURIComponent(item.name)}`}
                  />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Add to Cart Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="mt-6 p-5 rounded-3xl shadow-sm bg-[#81B29A]/5 border-[#81B29A]/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#81B29A]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-5 h-5 text-[#81B29A]" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Smart Shopping</h3>
              <p className="text-sm text-gray-600">
                Click on any price to visit the platform and purchase. We'll automatically track
                your refills when you update container weights.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

function PriceCard({
  platform,
  price,
  isBest,
  url,
}: {
  platform: string;
  price: number;
  isBest: boolean;
  url: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between p-3 rounded-2xl border-2 transition-all ${
        isBest
          ? "border-[#81B29A] bg-[#81B29A]/5"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="font-medium">{platform}</span>
        {isBest && (
          <Badge className="bg-[#81B29A] text-white">Best Price</Badge>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xl font-semibold">₹{price}</span>
        <ExternalLink className="w-4 h-4 text-gray-400" />
      </div>
    </a>
  );
}
