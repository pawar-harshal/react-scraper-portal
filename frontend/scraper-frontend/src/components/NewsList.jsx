import React from 'react';

const NewsList = ({ news }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {news.map((article, index) => (
                    <div
                        key={index}
                        className="bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200"
                    >
                        <div className="flex flex-col h-full">
                            {article.isLive === 'true' && (
                                <div className="flex items-center mb-3">
                                    <span className="inline-block w-3 h-3 bg-red-600 rounded-full mr-2 animate-pulse"></span>
                                    <span className="text-red-600 font-semibold text-sm">LIVE</span>
                                </div>
                            )}
                            <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                                <a
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-indigo-600 transition-colors"
                                >
                                    {article.title || 'No title available'}
                                </a>
                            </h2>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                                {article.description || 'No description available'}
                            </p>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                                <span>{article.time || 'N/A'}</span>
                                <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                                    {article.category || 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsList;