##Food Finds 

This application lets you enter ingredients you have at home and suggests recipes you could make with them.
This application was created using the latest version of NextJS (14).


First, install dependencies after navigating within the recipe-generator folder: 
``` npm install ```
Now run the development server:
```npm run dev```

And you can access the application at ```http://localhost:3000/```
API used to show recipes: ```https://spoonacular.com/food-api```
The application uses a dynamic route in pages/recipes/[recipeId].tsx to dynamically show different recipes based on the recipeId passed to the endpoint from the Home Page.

Server Side action is implemented when the user first signs in and then clicks on the like button of a particular recipe.
For simplicity of the demo, the like is currently being cached in the browser however it has also been logged in the server component found at pages/api/likeRecipe.ts which can be used to store the liked recipes in an external database/server.
Check logs to see the liked recipe ID.

This application uses the free version of spoonacular allowing up to 150 points. If the API returns a timeout kindly contact: ```mohiteshubhada98@gmail.com```
