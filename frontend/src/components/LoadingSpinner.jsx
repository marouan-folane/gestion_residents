
const LoadingSpinner = ({ message = "Chargement..." }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                <span className="text-lg font-semibold text-slate-700 animate-pulse">
                    Chargement...
                </span>
            </div>
            <span className="text-slate-500">Redirection...</span>
        </div>
    );
};
export default LoadingSpinner;
