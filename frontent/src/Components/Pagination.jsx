import React from 'react'

const Pagination = ({ setCurrentPage , currentPage , totalPages}) => {
    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${currentPage === 1 ? 'text-gray-400 border-gray-200' : 'hover:bg-gray-100'
                    }`}
            >
                Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 border rounded ${currentPage === i + 1
                        ? 'bg-gray-700 text-white border-gray-700'
                        : 'hover:bg-gray-100 border-gray-200'
                        }`}
                >
                    {i + 1}
                </button>
            ))}

            <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'text-gray-400 border-gray-200' : 'hover:bg-gray-100'
                    }`}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination
