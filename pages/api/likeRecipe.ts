import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Parse request body
    const { recipeId } = req.body;

    try {
      // Server-side logic goes here
      // Sending liked recipes to MongoDB database or Firebase 
      //logging below to check server receives this ID 
        console.log("liked a recipe",recipeId);
      // Send success response
      res.status(200).json({ message: `Recipe ${recipeId} liked successfully` });
    } catch (error) {
      console.error('Error liking recipe:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
