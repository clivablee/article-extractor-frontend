import { useState } from "react";

export default function ArticlePreview({ article, onUpdate }) {
  const [copied, setCopied] = useState(false);

  const copyHtml = async () => {
    await navigator.clipboard.writeText(article.articleHtml); //copy text
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFieldChange = (field, value) => {
    onUpdate({ ...article, [field]: value });
  };

  return (
    <div className="space-y-4">
      {/* Meta Information */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Meta Information
        </h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Title
            </label>
            <input
              type="text"
              value={article.meta.title}
              onChange={(e) => handleFieldChange("metaTitle", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Description
            </label>
            <textarea
              value={article.meta.description}
              onChange={(e) =>
                handleFieldChange("metaDescription", e.target.value)
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Article Content
        </h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Article Title
          </label>
          <input
            type="text"
            value={article.article.title}
            onChange={(e) => handleFieldChange("articleTitle", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Article HTML
            </label>
            <button
              onClick={copyHtml}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm overflow-x-auto max-h-64 overflow-y-auto">
            <p>{article.article.html}</p>
          </div>
        </div>
      </div>

      {/* Extracted Elements */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Links */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Article Issues
          </h3>
          <ul className="space-y-2">
            {article.articleIssues.issues?.map((item, index) => (
              <li key={index}>
                <p className="text-red-900 text-sm font-medium truncate">
                  {item.message}
                </p>
                <p className="text-red-500 text-xs truncate">{item.type}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Stats */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Article Stats
          </h3>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-semibold text-gray-900">
                {article.articleStats.imageCount}
              </p>
              <p className="text-gray-500 text-xs">Images</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-semibold text-gray-900">
                {article.articleStats.linkCount}
              </p>
              <p className="text-gray-500 text-xs">Links</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-semibold text-gray-900">
                {article.articleStats.productCount}
              </p>
              <p className="text-gray-500 text-xs">Product Links</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
