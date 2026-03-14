import { useState } from "react";
import { motion } from "motion/react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Bell, TrendingDown, Calendar } from "lucide-react";
import { Card } from "../components/ui/card";
import { Slider } from "../components/ui/slider";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { mockContainers, weightHistoryData } from "../data/mockData";

export function WeightAlertsScreen() {
  const [selectedContainer, setSelectedContainer] = useState(mockContainers[0].id);
  const [threshold, setThreshold] = useState(30);
  const [notifications, setNotifications] = useState({
    push: true,
    inApp: true,
    digest: false,
  });

  const container = mockContainers.find((c) => c.id === selectedContainer);
  const consumptionRate = 150; // grams per day (mock)
  const daysUntilEmpty = container ? Math.floor(container.currentWeight / consumptionRate) : 0;

  return (
    <div className="min-h-screen px-4 py-6 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-1">Weight & Alerts</h1>
        <p className="text-gray-600">Monitor consumption and set alerts</p>
      </div>

      {/* Container Selector */}
      <div className="mb-6">
        <Label>Select Container</Label>
        <Select value={selectedContainer} onValueChange={setSelectedContainer}>
          <SelectTrigger className="rounded-2xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {mockContainers.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Weight History Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-6 rounded-3xl shadow-sm bg-white mb-6">
          <h2 className="text-xl mb-4">7-Day Weight History</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weightHistoryData}>
              <XAxis dataKey="day" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#E07A5F"
                strokeWidth={3}
                dot={{ fill: "#E07A5F", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Consumption Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 rounded-3xl shadow-sm bg-white mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-5 h-5 text-[#E07A5F]" />
            <h2 className="text-xl">Consumption Analytics</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg. Daily Usage</span>
              <span className="font-semibold text-lg">{consumptionRate}g/day</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Predicted Empty Date</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#F2CC8F]" />
                <span className="font-semibold">
                  {daysUntilEmpty} days ({new Date(Date.now() + daysUntilEmpty * 24 * 60 * 60 * 1000).toLocaleDateString()})
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Alert Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6 rounded-3xl shadow-sm bg-white mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-[#E07A5F]" />
            <h2 className="text-xl">Alert Settings</h2>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Low Stock Threshold</Label>
                <span className="font-semibold text-[#E07A5F]">{threshold}%</span>
              </div>
              <Slider
                value={[threshold]}
                onValueChange={(value) => setThreshold(value[0])}
                min={10}
                max={50}
                step={5}
              />
              <p className="text-xs text-gray-600 mt-2">
                Alert when container drops below {threshold}% capacity
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-gray-600">Get instant alerts</p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, push: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>In-App Banner</Label>
                  <p className="text-sm text-gray-600">Show alerts in app</p>
                </div>
                <Switch
                  checked={notifications.inApp}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, inApp: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Daily Digest</Label>
                  <p className="text-sm text-gray-600">Summary email at 8 AM</p>
                </div>
                <Switch
                  checked={notifications.digest}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, digest: checked })
                  }
                />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Notification History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl mb-4">Recent Alerts</h2>
        <div className="space-y-3">
          <Card className="p-4 rounded-2xl shadow-sm bg-white">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">⚠️ Your Moong Dal is almost empty! Only 150g left.</p>
                <p className="text-sm text-gray-600 mt-1">March 12, 2026 • 9:15 AM</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 rounded-2xl shadow-sm bg-white">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#F2CC8F]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-[#F2CC8F]" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Time to restock! 3 containers need refilling.</p>
                <p className="text-sm text-gray-600 mt-1">March 11, 2026 • 7:00 PM</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 rounded-2xl shadow-sm bg-white">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">📉 Toor Dal is 15% cheaper on Blinkit today!</p>
                <p className="text-sm text-gray-600 mt-1">March 11, 2026 • 2:30 PM</p>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
