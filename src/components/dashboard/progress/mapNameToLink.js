
export const mapNameToLink = (name) => {
    switch (name) {
        case "Prędkość czytania": return "speed-meter";
        case "Zrozumienie tekstu": return "understand-meter";
        case "Znikające liczby": return "perception-exercise-1";
        case "Kolumny liczb": return "perception-exercise-2";
        case "Eliminacja fonetyzacji": return "fonetization-remover";
        case "Szybkie słowa": return "fast-words";
        case "Tablice Schultza": return "schultz-array";
        case "Piramida liczbowa": return "pyramid";
        case "Wskaźnik podstawowy": return "pointer-basic";
        case "Wskaźnik średni": return "pointer-medium";
        default: return "dashboard";
    }
}
export const mapNameToShortName = (name) => {
    switch (name) {
        case "Prędkość czytania": return "speedmeter";
        case "Zrozumienie tekstu": return "understandmeter";
        case "Znikające liczby": return "perceptionexercise1";
        case "Kolumny liczb": return "perceptionexercise2";
        case "Eliminacja fonetyzacji": return "fonetizationremover";
        case "Szybkie słowa": return "fastwords";
        case "Tablice Schultza": return "schultzarray";
        case "Piramida liczbowa": return "pyramid";
        case "Wskaźnik podstawowy": return "pointerbasic";
        case "Wskaźnik średni": return "pointermedium";
        default: return "dashboard";
    }
}

