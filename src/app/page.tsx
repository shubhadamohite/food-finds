"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { MdOutlineClear } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { useSession } from 'next-auth/react';
import SignInModal from "./SignInModal";

interface Recipe {
  id: number;
  title: string;
  image: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { id, title, image } = recipe;
  const [liked, setLiked] = useState<boolean>(false);
  const { data: session } = useSession();
  const [showSignInModal, setShowSignInModal] = useState<boolean>(false);

  useEffect(() => {
    const likedRecipe = localStorage.getItem(`likedRecipe-${id}`);
    if (likedRecipe) {
      setLiked(true);
    }
  }, [id]);

  const handleLike = async () => {
    if (session) {
      try {
        const response = await fetch('/api/likeRecipe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ recipeId: recipe.id }),
        });

        if (response.ok) {
          setLiked(!liked);

          // Update local storage
          if (!liked) {
            localStorage.setItem(`likedRecipe-${id}`, 'true');
          } else {
            localStorage.removeItem(`likedRecipe-${id}`);
          }
        } else {
          console.error('Failed to like recipe:', response.statusText);
        }
      } catch (error) {
        console.error('Error liking recipe:', error);
      }
    } else {
      // User is not authenticated, display alert/modal
      setShowSignInModal(true);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden relative">
      <img src={image} alt={title} className="w-full p-8" />
      <div className="p-2">
        <Link href={`/recipes/${id}`}>
          <p className="block font-bold text-sm  text-center text-blu-dark pb-10">{title}</p>
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
        <div className="flex justify-between items-center">
          <button onClick={handleLike} className="text-pink-500 ">
            {liked ? <BiSolidLike /> : <BiLike />}
          </button>
          <Link href={`/recipes/${id}`}>
            <p className="text-pink-500 text-xs">Visit Recipe</p>
          </Link>
        </div>
      </div>
      {/* Conditionally render the sign-in modal */}
      {showSignInModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <SignInModal onClose={() => setShowSignInModal(false)} />
        </div>
      )}
    </div>
  );
};


const HomePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if there is a cached search query in local storage
    const cachedSearchQuery = localStorage.getItem("searchQuery");
    if (cachedSearchQuery) {
      setInputValue(cachedSearchQuery);
      console.log("cached results", cachedSearchQuery)
    }
    const cachedRecipes = localStorage.getItem("recipes");
    if (cachedRecipes) {
      setRecipes(JSON.parse(cachedRecipes));
    }
  }, []);


  // Function to handle changes in the input value
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setLoading(true);
      try {
        // Clear the cached recipes since we're making a new search
        localStorage.removeItem("recipes");

        const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${inputValue}&number=25&ignorePantry=true&apiKey=c02a328cd90b48059bbb78001cb47132&includeNutrition=true`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);

        // Cache the fetched recipes
        localStorage.setItem("recipes", JSON.stringify(data));

        // Remember the search query
        localStorage.setItem("searchQuery", inputValue);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
      setLoading(false);
    }
  };
  // Function to clear search results
  const handleClearResults = () => {
    setRecipes([]); // Clear recipes array
    setInputValue(''); // Clear input value
    localStorage.removeItem("recipes"); // Clear cached recipes
    localStorage.removeItem("searchQuery"); // Clear cached search query
  };
  return (
    <div className="flex flex-col items-center justify-center bg-peach-light p-10 min-h-screen">
      <div className="container mx-auto flex flex-col items-center space-y-8">
        <div className="w-full max-w-md">
          <h1 className="antialiased text-3xl font-bold text-blu-dark whitespace-nowrap">{"What's in your fridge today?"}</h1>
          <p className="text-sm text-center text-blu-dark p-4 whitespace-nowrap">Create a scrumptious meal with ingredients in your kitchen!</p>
          <div className="relative w-full">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="border border-gray-300 rounded-full p-2 pr-10 w-full text-sm text-neutral-500"
              placeholder="Enter ingredients..."
            />
            {inputValue && (
              <MdOutlineClear
                className="absolute top-3 right-2 text-gray-500 cursor-pointer"
                onClick={handleClearResults}
              />
            )}
          </div>
          <p className="text-xs text-center text-blu-dark p-4">Enter ingredients separated by commas and press Enter...</p>
        </div>
      </div>

      <div className="container mx-auto mt-8">
        {loading && <p>Loading...</p>}
        {recipes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;