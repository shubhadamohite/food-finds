import './styles.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AppBar from '@/src/app/AppBar';
import { IoMdArrowRoundBack } from "react-icons/io";

interface InstructionStep {
  number: number;
  step: string;
}
interface IngredientList{
  id:number;
  original: string;
}
const RecipePage = () => {
  const router = useRouter();
  const { recipeId,query } = router.query; // Retrieve the dynamic route parameter

  // State to hold recipe details
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch recipe details based on the recipeId
    const fetchRecipe = async () => {
      if (!recipeId) {
        return; // recipeId is not available yet
      }

      setLoading(true);
      try {
        // Check if recipe is available in cache
        const cachedRecipe = localStorage.getItem(`recipe-${recipeId}`);
        if (cachedRecipe) {
          setRecipe(JSON.parse(cachedRecipe));
          setLoading(false);
          return;
        }
        
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=c02a328cd90b48059bbb78001cb47132`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const data = await response.json();
        setRecipe(data);
        
        // Cache the fetched recipe
        localStorage.setItem(`recipe-${recipeId}`, JSON.stringify(data));
      } catch (error) {
        setError('Error fetching recipe');
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);
  const handleBack = () => {
    if (query) {
      router.push(`/search?query=${query}`); // Navigate back to the search results page with query parameters
    } else {
      router.push('/'); // Navigate back to the home page if query parameters are not available
    }
  };
// Clear cached data when navigating away from the homepage
useEffect(() => {
  const handleRouteChange = () => {
    if (router.pathname !== '/') {
      // Clear cached data
      localStorage.removeItem('recipes');
      localStorage.removeItem('searchQuery');
    }
  };

  router.events.on('routeChangeStart', handleRouteChange);

  return () => {
    router.events.off('routeChangeStart', handleRouteChange);
  };
}, [router]);

const { title, extendedIngredients, analyzedInstructions } = recipe || {};

  return (
    <div style={{ minHeight: '100vh', backgroundColor:'#f4cccc' }}>
    <AppBar />
    <div className='flex flex-row p-2'>
      <IoMdArrowRoundBack onClick={handleBack} className='text-blu-dark' />
      <button className='text-blu-dark text-sm px-2' onClick={handleBack}>Back to Search Results</button>
    </div>
    <div className="flex justify-center items-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {recipe && (
          <>
            <h1 className='text-blu-dark font-bold text-center mb-4'>{recipe.title}</h1>
            <div className="flex justify-center items-center mb-4">
            <img src={recipe.image} alt={recipe.title} className="h-auto" />
          </div>
            <h3 className="mb-2 text-sm font-bold">Ingredients:</h3>
            <ul className="list-disc pl-4 mb-2">
              {recipe.extendedIngredients.map((ingredient: any) => (
                <li key={ingredient.id} className='text-sm'>{ingredient.original}</li>
              ))}
            </ul>
            <h3 className="mt-2 mb-2 text-sm font-bold">Instructions:</h3>
            <ol className="list-decimal pl-6">
              {recipe.analyzedInstructions[0].steps.map((step: InstructionStep) => (
                <li key={step.number} className='text-sm'>{step.step}</li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  </div>
  );
};

export default RecipePage;

