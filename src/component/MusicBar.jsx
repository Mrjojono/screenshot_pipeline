function MusicBar({ duration, currentTime, onSeek, isPlaying }) {
    // Calculer le pourcentage de progression
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    // Fonction pour obtenir la classe Tailwind correspondante
    const getWidthClass = (percentage) => {
        if (percentage >= 95) return "w-full";
        if (percentage >= 90) return "w-11/12";
        if (percentage >= 83) return "w-5/6";
        if (percentage >= 75) return "w-3/4";
        if (percentage >= 66) return "w-2/3";
        if (percentage >= 60) return "w-3/5";
        if (percentage >= 50) return "w-1/2";
        if (percentage >= 40) return "w-2/5";
        if (percentage >= 33) return "w-1/3";
        if (percentage >= 25) return "w-1/4";
        if (percentage >= 20) return "w-1/5";
        if (percentage >= 16) return "w-1/6";
        if (percentage >= 8) return "w-1/12";
        return "w-0";
    };

    // Fonction pour formater le temps en mm:ss
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Fonction pour gérer le clic sur la barre
    const handleBarClick = (e) => {
        if (!onSeek || duration === 0) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const barWidth = rect.width;
        const clickPercentage = (clickX / barWidth) * 100;
        const newTime = (clickPercentage / 100) * duration;

        onSeek(newTime);
    };

    const widthClass = getWidthClass(progress);

    return (
        <div className="w-full">
            {/* Barre de progression */}
            <div
                className="h-2 shadow-blue-600 bg-gray-200 cursor-pointer shadow-lg w-full relative overflow-hidden rounded-lg"
                onClick={handleBarClick}
            >
                <div className={`bg-blue-700 cursor-pointer transition-all duration-300 ease-in-out h-full rounded-lg ${widthClass}`} />
            </div>

            {/* Temps actuel / Durée totale */}
            <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(currentTime || 0)}</span>
                <span>{formatTime(duration || 0)}</span>
            </div>
        </div>
    );
}

export default MusicBar;