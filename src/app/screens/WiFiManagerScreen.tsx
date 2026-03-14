import { motion } from "motion/react";
import { Wifi, WifiOff, Plus, Activity } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { mockModules } from "../data/mockData";

export function WiFiManagerScreen() {
  const getSignalBars = (strength: number) => {
    if (strength >= 75) return 4;
    if (strength >= 50) return 3;
    if (strength >= 25) return 2;
    return 1;
  };

  return (
    <div className="min-h-screen px-4 py-6 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-1">WiFi Modules</h1>
        <p className="text-gray-600">Manage your IoT weight sensors</p>
      </div>

      {/* Add Module Button */}
      <Button className="w-full mb-6 h-14 text-lg rounded-2xl bg-[#E07A5F] hover:bg-[#d66b50]">
        <Plus className="w-5 h-5 mr-2" />
        Add New Module
      </Button>

      {/* Module List */}
      <div className="space-y-4">
        {mockModules.map((module, index) => {
          const signalBars = getSignalBars(module.signalStrength);
          const isOnline = module.status === "online";

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-5 rounded-3xl shadow-sm bg-white">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      isOnline ? "bg-[#81B29A]/10" : "bg-gray-100"
                    }`}
                  >
                    {isOnline ? (
                      <Wifi className="w-7 h-7 text-[#81B29A]" />
                    ) : (
                      <WifiOff className="w-7 h-7 text-gray-400" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{module.name}</h3>
                        <p className="text-sm text-gray-600">{module.id}</p>
                      </div>
                      <Badge
                        variant={isOnline ? "default" : "secondary"}
                        className={`${
                          isOnline ? "bg-[#81B29A]" : "bg-gray-400"
                        } text-white`}
                      >
                        {module.status}
                      </Badge>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">IP:</span>
                        <span className="font-mono">{module.ipAddress}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Signal:</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((bar) => (
                            <div
                              key={bar}
                              className={`w-1 rounded-full ${
                                bar <= signalBars ? "bg-[#81B29A]" : "bg-gray-300"
                              }`}
                              style={{ height: `${bar * 4}px` }}
                            />
                          ))}
                        </div>
                        <span>{module.signalStrength}%</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Last ping: {module.lastPing}</span>
                      </div>

                      {module.assignedContainer && (
                        <div className="pt-2 mt-2 border-t">
                          <span className="text-gray-600">Assigned to:</span>{" "}
                          <span className="font-medium text-[#E07A5F]">
                            {module.assignedContainer}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Live Indicator */}
                    {isOnline && (
                      <div className="flex items-center gap-2 mt-3">
                        <div className="w-2 h-2 bg-[#81B29A] rounded-full animate-pulse" />
                        <span className="text-xs text-gray-600">Receiving live data</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Connection Info */}
      <Card className="mt-6 p-5 rounded-3xl shadow-sm bg-[#E07A5F]/5 border-[#E07A5F]/20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-[#E07A5F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Activity className="w-5 h-5 text-[#E07A5F]" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">WebSocket Connection</h3>
            <p className="text-sm text-gray-600">
              Modules send weight data every 5 seconds via WebSocket. The app automatically
              reconnects if the connection drops.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
