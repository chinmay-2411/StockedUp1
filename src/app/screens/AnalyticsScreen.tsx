import { motion } from "motion/react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TrendingUp, DollarSign, Leaf, Grid3x3 } from "lucide-react";
import { Card } from "../components/ui/card";
import { consumptionData } from "../data/mockData";

const monthlyData = [
  { month: "Oct", consumption: 12500 },
  { month: "Nov", consumption: 13200 },
  { month: "Dec", consumption: 14800 },
  { month: "Jan", consumption: 13900 },
  { month: "Feb", consumption: 15200 },
  { month: "Mar", consumption: 14500 },
];

const containerUtilization = [
  { name: "Grains", value: 85 },
  { name: "Pulses", value: 72 },
  { name: "Spices", value: 45 },
  { name: "Oils", value: 60 },
  { name: "Sweeteners", value: 55 },
];

export function AnalyticsScreen() {
  return (
    <div className="min-h-screen px-4 py-6 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-1">Analytics & Insights</h1>
        <p className="text-gray-600">Track your kitchen efficiency</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="p-4 bg-white rounded-3xl shadow-sm">
            <div className="w-10 h-10 bg-[#81B29A]/10 rounded-2xl flex items-center justify-center mb-2">
              <DollarSign className="w-5 h-5 text-[#81B29A]" />
            </div>
            <div className="text-2xl mb-1">₹2,450</div>
            <div className="text-xs text-gray-600">Money Saved</div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 bg-white rounded-3xl shadow-sm">
            <div className="w-10 h-10 bg-[#F2CC8F]/20 rounded-2xl flex items-center justify-center mb-2">
              <Leaf className="w-5 h-5 text-[#F2CC8F]" />
            </div>
            <div className="text-2xl mb-1">87%</div>
            <div className="text-xs text-gray-600">Waste Reduction</div>
          </Card>
        </motion.div>
      </div>

      {/* Most Consumed Ingredients */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6 bg-white rounded-3xl shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#E07A5F]" />
            <h2 className="text-xl">Most Consumed Ingredients</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={consumptionData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                }}
              />
              <Bar dataKey="value" fill="#E07A5F" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Monthly Consumption Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6 bg-white rounded-3xl shadow-sm mb-6">
          <h2 className="text-xl mb-4">Monthly Consumption Trend</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyData}>
              <XAxis dataKey="month" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="consumption"
                stroke="#81B29A"
                fill="#81B29A"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Container Utilization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 bg-white rounded-3xl shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Grid3x3 className="w-5 h-5 text-[#E07A5F]" />
            <h2 className="text-xl">Container Utilization</h2>
          </div>
          <div className="space-y-4">
            {containerUtilization.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-sm text-gray-600">{item.value}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#E07A5F] to-[#F2CC8F]"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Weekly Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-br from-[#E07A5F]/10 to-[#81B29A]/10 rounded-3xl shadow-sm border-[#E07A5F]/20">
          <h2 className="text-xl mb-4">This Week's Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-700">Total Consumption</span>
              <span className="font-semibold">3,420g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Containers Refilled</span>
              <span className="font-semibold">4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Recipes Cooked</span>
              <span className="font-semibold">7</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Shopping Saved</span>
              <span className="font-semibold text-[#81B29A]">₹385</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
