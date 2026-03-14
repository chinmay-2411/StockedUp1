import { useState } from "react";
import { motion } from "motion/react";
import { ChefHat, Clock, Sparkles, Check, X } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { mockRecipes } from "../data/mockData";

const dietaryFilters = ["All", "Vegetarian", "Vegan", "Jain", "Gluten-free"];

export function RecipesScreen() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<typeof mockRecipes[0] | null>(null);

  const filteredRecipes = mockRecipes.filter((recipe) => {
    const matchesFilter =
      selectedFilter === "All" || recipe.dietaryTags.includes(selectedFilter);
    const matchesSearch =
      searchQuery === "" || recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (selectedRecipe) {
    return <RecipeDetail recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />;
  }

  return (
    <div className="min-h-screen px-4 py-6 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-1">Recipes</h1>
        <p className="text-gray-600">Cook with what you have</p>
      </div>

      {/* Magic Button */}
      <Button className="w-full mb-6 h-14 text-lg rounded-2xl bg-gradient-to-r from-[#E07A5F] to-[#F2CC8F] hover:opacity-90">
        <Sparkles className="w-5 h-5 mr-2" />
        What can I cook tonight?
      </Button>

      {/* Search */}
      <div className="mb-4">
        <Input
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-2xl h-12"
        />
      </div>

      {/* Dietary Filters */}
      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          {dietaryFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedFilter === filter
                  ? "bg-[#E07A5F] text-white"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredRecipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedRecipe(recipe)}
          >
            <Card className="rounded-3xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
              <div className="relative h-40">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-[#81B29A] text-white">
                    {recipe.matchPercentage}% Match
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span>{recipe.cuisine}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.cookTime} min</span>
                  </div>
                  <span>•</span>
                  <span>{recipe.difficulty}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {recipe.dietaryTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">
                      {recipe.matchedIngredients.join(", ")}
                    </span>
                  </div>
                  {recipe.missingIngredients.length > 0 && (
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">
                        Need: {recipe.missingIngredients.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function RecipeDetail({
  recipe,
  onBack,
}: {
  recipe: typeof mockRecipes[0];
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen pb-24">
      {/* Hero Image */}
      <div className="relative h-64">
        <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-full object-cover" />
        <button
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          ←
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <h1 className="text-3xl text-white mb-2">{recipe.name}</h1>
          <div className="flex items-center gap-4 text-white/90">
            <span>{recipe.cuisine}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.cookTime} min</span>
            </div>
            <span>•</span>
            <span>{recipe.difficulty}</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Ingredients */}
        <Card className="p-6 rounded-3xl shadow-sm bg-white mb-6">
          <h2 className="text-2xl mb-4">Ingredients</h2>
          <div className="space-y-3">
            {recipe.matchedIngredients.map((ing, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span>{ing}</span>
              </div>
            ))}
            {recipe.missingIngredients.map((ing, i) => (
              <div key={i} className="flex items-center gap-3 opacity-60">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="w-4 h-4 text-red-500" />
                </div>
                <span>{ing}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Instructions */}
        <Card className="p-6 rounded-3xl shadow-sm bg-white">
          <h2 className="text-2xl mb-4">Instructions</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#E07A5F] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                1
              </div>
              <p className="text-gray-700">
                Rinse the rice and dal together until the water runs clear.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#E07A5F] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                2
              </div>
              <p className="text-gray-700">
                In a pressure cooker, add rice, dal, turmeric, and water. Cook for 3-4 whistles.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#E07A5F] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                3
              </div>
              <p className="text-gray-700">
                Heat ghee in a pan, add cumin seeds, and let them splutter.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#E07A5F] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                4
              </div>
              <p className="text-gray-700">
                Mix the tempering with the khichdi and serve hot.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
