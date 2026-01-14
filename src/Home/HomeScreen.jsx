import { useState } from "react";
import ArticleInput from "../components/ArticleInput";
import ArticlePreview from "../components/ArticlePreview";
import "../App.css";
import axios from "axios";

const HomeScreen = () => {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExtract = async (url) => {
    setIsLoading(true);

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const response = await axios.get(`http://localhost:3000/articles/${url}`);
    console.log(response);

    if (response.status === 200) {
      console.log("data", response.data.data); //data response from the API
    }
    setArticle({ ...response.data.data });
    console.log("Article ", article);
    setIsLoading(false);
  };

  const handleUpdateArticle = (updatedArticle) => {
    setArticle(updatedArticle);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Article URL Provider
          </h1>
          <p className="text-gray-600">
            Extract, preview, and upload articles to WordPress
          </p>
          {article && (
            <button
              onClick={() => setArticle(null)}
              className="mt-4 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Reset
            </button>
          )}
        </header>

        {/* Main Content */}
        <main className="space-y-6">
          {/* Input Section */}
          <ArticleInput onExtract={handleExtract} isLoading={isLoading} />

          {/* Preview Section */}
          {article && (
            <>
              <ArticlePreview
                article={article}
                onUpdate={handleUpdateArticle}
              />

              <button
                onClick={() => alert("Uploaded to WordPress")}
                className="w-full py-3 bg-green-600 text-white font-medium
                rounded-lg hover:bg-green-700 disabled:opacity-50
                disabled:cursor-not-allowed transition-colors hover:cursor-pointer"
              >
                Upload to WordPress
              </button>
            </>
          )}

          {/* Empty State */}
          {!article && !isLoading && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No Article Loaded
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Paste a Google Doc URL above and click Extract to preview your
                article content.
              </p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center mt-12 pt-6 border-t border-gray-200">
          <p className="text-gray-400 text-sm">
            Article Extractor • WordPress Integration Demo
          </p>
        </footer>
      </div>
    </div>
  );
};

export default HomeScreen;
