import { motion } from "motion/react";
import { Plus, Package, AlertTriangle, ChefHat, TrendingUp } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { mockContainers, consumptionData } from "../data/mockData";
import { useNavigate } from "react-router";

export function HomeScreen() {
  const navigate = useNavigate();
  const lowStockCount = mockContainers.filter(
    (c) => (c.currentWeight / c.maxCapacity) * 100 < 30
  ).length;

  const topConsumed = consumptionData.slice(0, 5);

  return (
    <div className="min-h-screen px-4 py-6">
      {/* Greeting Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl mb-1">Good Morning, Chef 👋</h1>
        <p className="text-gray-600">Let's check your kitchen inventory</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 bg-white rounded-3xl shadow-sm">
            <div className="w-10 h-10 bg-[#E07A5F]/10 rounded-2xl flex items-center justify-center mb-2">
              <Package className="w-5 h-5 text-[#E07A5F]" />
            </div>
            <div className="text-2xl mb-1">{mockContainers.length}</div>
            <div className="text-xs text-gray-600">Containers</div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 bg-white rounded-3xl shadow-sm">
            <div className="w-10 h-10 bg-red-100 rounded-2xl flex items-center justify-center mb-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-2xl mb-1">{lowStockCount}</div>
            <div className="text-xs text-gray-600">Low Stock</div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4 bg-white rounded-3xl shadow-sm">
            <div className="w-10 h-10 bg-[#F2CC8F]/20 rounded-2xl flex items-center justify-center mb-2">
              <ChefHat className="w-5 h-5 text-[#F2CC8F]" />
            </div>
            <div className="text-2xl mb-1">12</div>
            <div className="text-xs text-gray-600">Recipes</div>
          </Card>
        </motion.div>
      </div>

      {/* Most Consumed This Week */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 bg-white rounded-3xl shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#E07A5F]" />
            <h2 className="text-xl">Most Consumed This Week</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topConsumed} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
              <Bar dataKey="value" fill="#E07A5F" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <Card className="p-4 bg-white rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Refilled Wheat Flour</div>
              <div className="text-sm text-gray-600">March 12, 2026 • 10:30 AM</div>
            </div>
          </Card>

          <Card className="p-4 bg-white rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Low Stock Alert: Moong Dal</div>
              <div className="text-sm text-gray-600">March 12, 2026 • 9:15 AM</div>
            </div>
          </Card>

          <Card className="p-4 bg-white rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F2CC8F]/20 rounded-xl flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-[#F2CC8F]" />
            </div>
            <div className="flex-1">
              <div className="font-medium">New Recipe: Dal Khichdi</div>
              <div className="text-sm text-gray-600">March 11, 2026 • 7:20 PM</div>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* FAB Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
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
