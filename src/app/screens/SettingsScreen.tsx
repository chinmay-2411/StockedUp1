import { motion } from "motion/react";
import {
  User,
  Scale,
  Bell,
  Wifi,
  Palette,
  Database,
  Info,
  ChevronRight,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router";

export function SettingsScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-4 py-6 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-1">Settings</h1>
        <p className="text-gray-600">Manage your preferences</p>
      </div>

      {/* User Profile */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-5 bg-white rounded-3xl shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#E07A5F] to-[#F2CC8F] rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-gray-600">john.doe@email.com</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Card>
      </motion.div>

      {/* Household Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-5 bg-white rounded-3xl shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>Household Size</Label>
              <p className="text-gray-600">4 members</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Card>
      </motion.div>

      {/* Units */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg mb-3 px-2">Preferences</h3>
        <Card className="p-5 bg-white rounded-3xl shadow-sm mb-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E07A5F]/10 rounded-xl flex items-center justify-center">
                  <Scale className="w-5 h-5 text-[#E07A5F]" />
                </div>
                <div>
                  <Label>Weight Units</Label>
                  <p className="text-sm text-gray-600">Grams / Kilograms</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="h-px bg-gray-200" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F2CC8F]/20 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[#F2CC8F]" />
                </div>
                <div>
                  <Label>Notifications</Label>
                  <p className="text-sm text-gray-600">Push & in-app alerts</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* WiFi Modules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={() => navigate("/app/wifi")}
          className="w-full"
        >
          <Card className="p-5 bg-white rounded-3xl shadow-sm mb-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#81B29A]/10 rounded-xl flex items-center justify-center">
                  <Wifi className="w-5 h-5 text-[#81B29A]" />
                </div>
                <div className="text-left">
                  <Label>WiFi Module Management</Label>
                  <p className="text-sm text-gray-600">Configure IoT sensors</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        </button>
      </motion.div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg mb-3 px-2">Appearance</h3>
        <Card className="p-5 bg-white rounded-3xl shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Palette className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <Label>Theme</Label>
                <p className="text-sm text-gray-600">Light</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Card>
      </motion.div>

      {/* Data & Backup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg mb-3 px-2">Data</h3>
        <Card className="p-5 bg-white rounded-3xl shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <Label>Data Sync & Backup</Label>
                <p className="text-sm text-gray-600">Last synced: 2 hours ago</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Card>
      </motion.div>

      {/* App Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-5 bg-white rounded-3xl shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <Info className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <Label>App Version</Label>
                <p className="text-sm text-gray-600">StockedUp v1.0.0</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
