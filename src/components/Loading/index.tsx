const Loading = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/95 z-50">
            <div className="w-16 h-16 border-4 border-blue-300 border-t-sky-700 rounded-full animate-spin mr-5"></div>
        </div>
    );
}
  
export default Loading;
  