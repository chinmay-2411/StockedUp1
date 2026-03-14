import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Camera } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { mockContainers, mockModules, categories } from "../data/mockData";
import confetti from "canvas-confetti";
import { toast } from "sonner";

export function AddRefillScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isRefillMode = !!id;

  const container = isRefillMode ? mockContainers.find((c) => c.id === id) : null;

  const [formData, setFormData] = useState({
    name: container?.name || "",
    category: container?.category || "",
    maxCapacity: container?.maxCapacity || 1000,
    threshold: container?.threshold || 300,
    moduleId: container?.moduleId || "",
    notes: "",
  });

  const [refillAmount, setRefillAmount] = useState(0);

  const handleSubmit = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#E07A5F", "#81B29A", "#F2CC8F"],
    });

    if (isRefillMode) {
      toast.success(`${container?.name} refilled successfully! Added ${refillAmount}g`);
    } else {
      toast.success(`Container added successfully!`);
    }

    setTimeout(() => navigate("/app/containers"), 500);
  };

  useEffect(() => {
    if (isRefillMode && container) {
      const maxRefill = container.maxCapacity - container.currentWeight;
      setRefillAmount(maxRefill);
    }
  }, [isRefillMode, container]);

  return (
    <div className="min-h-screen px-4 py-6 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl">{isRefillMode ? "Refill Container" : "Add Container"}</h1>
          <p className="text-gray-600">
            {isRefillMode ? "Update your inventory" : "Register a new container"}
          </p>
        </div>
      </div>

      {isRefillMode && container ? (
        /* Refill Mode */
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 bg-white rounded-3xl shadow-sm mb-6">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={container.imageUrl}
                alt={container.name}
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <div>
                <h2 className="text-2xl">{container.name}</h2>
                <p className="text-gray-600">{container.category}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Current Weight</Label>
                <div className="text-3xl font-semibold text-[#E07A5F]">
                  {container.currentWeight}g
                </div>
              </div>

              <div>
                <Label>Target Weight</Label>
                <div className="text-3xl font-semibold text-[#81B29A]">
                  {container.maxCapacity}g
                </div>
              </div>

              <div>
                <Label>Amount to Add</Label>
                <div className="text-3xl font-semibold">{refillAmount}g</div>
                <Slider
                  value={[refillAmount]}
                  onValueChange={(value) => setRefillAmount(value[0])}
                  max={container.maxCapacity - container.currentWeight}
                  step={10}
                  className="mt-4"
                />
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between text-lg">
                  <span>New Weight:</span>
                  <span className="font-semibold">
                    {container.currentWeight + refillAmount}g
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <div>
              <Label>Refill Notes (Optional)</Label>
              <Textarea
                placeholder="Add any notes about this refill..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="rounded-2xl"
              />
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full h-14 text-lg rounded-2xl bg-[#E07A5F] hover:bg-[#d66b50] mt-6"
          >
            Confirm Refill
          </Button>
        </motion.div>
      ) : (
        /* Add Mode */
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 bg-white rounded-3xl shadow-sm">
            <div className="space-y-6">
              <div>
                <Label>Ingredient Name</Label>
                <Input
                  placeholder="e.g., Basmati Rice"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-2xl"
                />
              </div>

              <div>
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter((c) => c !== "All").map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>WiFi Module</Label>
                <Select
                  value={formData.moduleId}
                  onValueChange={(value) => setFormData({ ...formData, moduleId: value })}
                >
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder="Select module" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockModules.map((module) => (
                      <SelectItem key={module.id} value={module.id}>
                        {module.name} ({module.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Container Capacity (grams)</Label>
                <Input
                  type="number"
                  value={formData.maxCapacity}
                  onChange={(e) =>
                    setFormData({ ...formData, maxCapacity: parseInt(e.target.value) })
                  }
                  className="rounded-2xl"
                />
              </div>

              <div>
                <Label>Low Stock Threshold (grams)</Label>
                <Input
                  type="number"
                  value={formData.threshold}
                  onChange={(e) =>
                    setFormData({ ...formData, threshold: parseInt(e.target.value) })
                  }
                  className="rounded-2xl"
                />
              </div>

              <div>
                <Label>Upload Photo</Label>
                <button className="w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-[#E07A5F] transition-colors">
                  <Camera className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">Tap to upload</span>
                </button>
              </div>

              <div>
                <Label>Notes (Optional)</Label>
                <Textarea
                  placeholder="Add any additional notes..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="rounded-2xl"
                />
              </div>
            </div>
          </Card>

          <Button
            onClick={handleSubmit}
            className="w-full h-14 text-lg rounded-2xl bg-[#E07A5F] hover:bg-[#d66b50] mt-6"
          >
            Add Container
          </Button>
        </motion.div>
      )}
    </div>
  );
}
