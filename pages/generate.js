import { useState } from 'react'

export default function Generate({ user }) {
  const [ingredients, setIngredients] = useState('')
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(false)

  const generateRecipe = async () => {
    setLoading(true)
    setRecipe(null)
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients }),
    })
    const data = await response.json()
    setRecipe(data.recipe)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-green-100">
        <h2 className="text-4xl font-extrabold text-green-700 mb-4 text-center">
          🍳 AI Recipe Generator
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Type your available ingredients and get a delicious recipe suggestion in seconds.
        </p>

        <textarea
          rows={4}
          className="w-full resize-none rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none p-4 text-sm text-gray-800 placeholder-gray-400 transition"
          placeholder="e.g., eggs, tomatoes, cheese"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <button
          onClick={generateRecipe}
          disabled={loading || !ingredients.trim()}
          className={`mt-4 w-full py-3 rounded-xl font-semibold transition ${
            loading || !ingredients.trim()
              ? 'bg-green-300 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          } text-white shadow-md`}
        >
          {loading ? 'Cooking up your recipe...' : 'Generate Recipe'}
        </button>

        <div className="mt-8">
          {loading && (
            <p className="text-center text-gray-500 animate-pulse">
              🧠 Thinking...
            </p>
          )}

          {recipe ? (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-700 mb-2">
                🍽️ Your AI-Generated Recipe
              </h3>
              <p className="whitespace-pre-wrap text-gray-800 text-sm">{recipe}</p>
            </div>
          ) : (
            !loading && (
              <p className="text-center text-gray-400 mt-8">
                Your recipe will appear here after generation.
              </p>
            )
          )}
        </div>
      </div>
    </div>
  )
}
