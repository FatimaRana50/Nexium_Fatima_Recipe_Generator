export default async function handler(req, res) {
  const { ingredients } = req.body;

  const formattedIngredients = Array.isArray(ingredients)
    ? ingredients
    : ingredients.split(',').map(i => i.trim());

  try {
    // ✅ Step 1: Log ingredients to n8n webhook (optional)
    await fetch('https://n8n-production-d948.up.railway.app/webhook-test/generate-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: formattedIngredients })
    });

    // ✅ Step 2: Call OpenRouter directly for recipe generation
    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `Suggest a recipe using these ingredients: ${formattedIngredients.join(', ')}`
          }
        ]
      })
    });

    const result = await openRouterResponse.json();
    const recipe = result.choices?.[0]?.message?.content || 'No recipe generated';

    res.status(200).json({ recipe });
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ error: 'Failed to generate recipe' });
  }
}
