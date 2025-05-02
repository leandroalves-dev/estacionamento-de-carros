import Container from "../Container";

interface PaginationProps{
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange}: PaginationProps) => {
    return (
        <Container>
            <div className="flex justify-center items-center gap-1">
                <button
                     className={`px-4 py-2 bg-sky-400/40 backdrop-blur-md text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => onPageChange(currentPage -1)}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => onPageChange(index + 1)}
                        className={`px-4 py-2 cursor-pointer text-white hover:bg-blue-800 rounded ${currentPage === index + 1 ? 'bg-sky-400/40 backdrop-blur-md' : 'bg-blue-800/30'} `}
                    >
                        {index + 1}
                    </button>
                ))}
                <button 
                    className={`px-4 py-2 bg-sky-400/40 backdrop-blur-md text-white rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} `}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Proxima
                </button>
            </div>
        </Container>
    )
}

export default Pagination