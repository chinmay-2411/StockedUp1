import { useState } from "react";
import { motion } from "motion/react";
import { Plus, ArrowUpCircle } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { CircularGauge } from "../components/CircularGauge";
import { mockContainers, categories } from "../data/mockData";
import { useNavigate } from "react-router";

export function ContainersScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const filteredContainers =
    selectedCategory === "All"
      ? mockContainers
      : mockContainers.filter((c) => c.category === selectedCategory);

  return (
    <div className="min-h-screen px-4 py-6 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-1">Containers</h1>
        <p className="text-gray-600">Monitor your kitchen inventory</p>
      </div>

      {/* Category Filter */}
      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-[#E07A5F] text-white"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Container Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredContainers.map((container, index) => {
          const percentage = (container.currentWeight / container.maxCapacity) * 100;
          const isLowStock = percentage < 30;

          return (
            <motion.div
              key={container.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`p-4 rounded-3xl shadow-md overflow-hidden relative ${
                  isLowStock ? "ring-2 ring-red-400 animate-pulse" : ""
                }`}
              >
                {/* Background Image with Overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${container.imageUrl})` }}
                >
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-white">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 text-sm">{container.name}</h3>
                      <p className="text-xs opacity-90">{container.category}</p>
                    </div>
                  </div>

                  {/* Circular Gauge */}
                  <div className="flex justify-center mb-3">
                    <CircularGauge percentage={percentage} size={70} />
                  </div>

                  {/* Weight Info */}
                  <div className="text-center mb-3">
                    <div className="text-lg font-semibold">
                      {container.currentWeight}g / {container.maxCapacity}g
                    </div>
                    <div className="text-xs opacity-90">Module: {container.moduleId}</div>
                  </div>

                  {/* Refill Button */}
                  <Button
                    onClick={() => navigate(`/app/containers/refill/${container.id}`)}
                    className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30"
                  >
                    <ArrowUpCircle className="w-4 h-4 mr-2" />
                    Refill
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* FAB Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-24 right-6 z-10"
      >
        <Button
          onClick={() => navigate("/app/containers/add")}
          className="w-16 h-16 rounded-full bg-[#E07A5F] hover:bg-[#d66b50] shadow-lg"
        >
          <Plus className="w-8 h-8" />
        </Button>
      </motion.div>
    </div>
  );
}
