import utils from "../utils.js";
import MusicBar from "./MusicBar.jsx";
import { useState, useEffect, useRef } from "react";
import play from "../assets/play.svg";
import back from "../assets/skip-back.svg";
import next from "../assets/skip-forward.svg";
import stop from "../assets/pause.svg";

function Musique() {
  const [musique, setMusique] = useState([]);
  const [isplaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const datas = await utils.GetMusique();
        console.log("Données reçues :", datas);

        if (datas && datas.length > 0) {
          setMusique(datas);
          setIndex(0);
        } else {
          setError("Aucune musique trouvée");
        }
      } catch (e) {
        console.error("Erreur lors du chargement :", e);
        setError("Erreur lors du chargement des musiques");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Effect pour gérer les event listeners de l'audio
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onEnded = () => {
      setIsPlaying(false);
      goToNext();
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    // Réinitialiser les états quand la musique change
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [index]); // Réexécuter quand l'index change

  // Fonction pour play/pause
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isplaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isplaying);
  };

  // Fonctions pour naviguer
  const goToPrevious = () => {
    setIsPlaying(false); // Arrêter la musique actuelle
    setIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : musique.length - 1
    );
  };

  const goToNext = () => {
    setIsPlaying(false); // Arrêter la musique actuelle
    setIndex((prevIndex) =>
      prevIndex < musique.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Fonction pour changer la position de la musique
  const seekTo = (time) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
      setCurrentTime(time);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white text-3xl">Chargement des musiques...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500 text-3xl">{error}</div>
      </div>
    );
  }

  if (!musique || musique.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white text-3xl">Aucune musique disponible</div>
      </div>
    );
  }

  const item = musique[index];

  if (!item) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white">Erreur lors du chargement de la musique</div>
      </div>
    );
  }

  return (
    <>
      <div className={`flex flex-row  bg-[url('${item.artwork?.["480x480"]}')] bg-cover bg-center gap-28`}  >
        <div
          key={item.id}
          className="bg-[#1A1B21] min-w-[300px] shadow-blue-700 shadow-lg rounded-lg mt-10 ml-auto h-[30%] mr-auto w-[400px] flex flex-col"
        >
          <div>
            <img
              className="h-72 w-[350px] p-4 ml-auto mr-auto"
              src={item.artwork?.["480x480"] || "/default-cover.jpg"}
              alt="cover"
              onError={(e) => {
                e.target.src = "/default-cover.jpg";
              }}
            />
          </div>

          <div className="flex flex-col text-white px-4">
            <span className="text-2xl font-bold">{item.title || "Titre inconnu"}</span>
            <span className="text-amber-500">@{item.user?.name || "Artiste inconnu"}</span>
            <span className="text-sm text-gray-300">
              {item.genre || "Genre inconnu"} - {item.mood || "Mood inconnu"}
            </span>
          </div>

          <div className="flex flex-col justify-center p-4 mt-4">
            <div className="flex ml-auto mb-4 mr-auto flex-row gap-10">
              <img
                className="cursor-pointer hover:scale-105"
                src={back}
                onClick={goToPrevious}
                alt="previous track"
              />
              <img
                className="cursor-pointer hover:scale-105"
                onClick={togglePlayPause}
                src={isplaying ? stop : play}
                alt={isplaying ? "pause" : "play"}
              />
              <img
                className="cursor-pointer hover:scale-105"
                src={next}
                onClick={goToNext}
                alt="next track"
              />
            </div>

            {/* Element audio caché */}
            <audio
              ref={audioRef}
              src={`https://discoveryprovider.audius.co/v1/tracks/${item.id}/stream?app_name=musiqueweb`}
              preload="metadata"
              className="hidden"
            />

            <MusicBar
              duration={duration}
              currentTime={currentTime}
              onSeek={seekTo}
              isPlaying={isplaying}
            />
          </div>

          <div className="text-white px-4 mt-4">
            <h1 className="text-xl font-semibold">Description</h1>
            <p className="p-3 text-justify overflow-hidden">
              {item.description
                ? item.description.split(" ").slice(0, 10).join(" ") + "..."
                : "Pas de description."}
            </p>
          </div>

          {/* Indicateur de position */}
          <div className="text-white px-4 pb-4 text-center">
            <span className="text-sm text-gray-400">
              {index + 1} / {musique.length}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Musique;