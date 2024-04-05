// Színek generálása és megjelenítése a kiválasztott módszerrel
function generateColor(src, tar, method) {
    // Forrás kép lekérése az azonosító alapján
    var srcIMG = document.querySelector(src);
    // Cél elem lekérése az azonosító alapján
    var target = document.querySelector(tar);
    // Hibakezelés: Ellenőrzi, hogy az azonosítók tartalmaznak-e '.' vagy '#' karaktereket, ha nem, akkor hibaüzenetet ad vissza
    if (!(src.includes('.') || src.includes('#')) && !(tar.includes('.') || tar.includes('#'))) return "Something went wrong!";
    // Szín megjelenítése a kiválasztott módszerrel
    else displayColor(srcIMG, target, method);
}

// Szín megjelenítése a kiválasztott módszerrel
function displayColor(srcIMG, tar, method) {
    // Az ablak betöltésekor futó művelet
    window.onload = () => {
        // Forrás kép feldolgozása, és szín RGB értékek kinyerése
        var colorRGB = processInput(srcIMG);
        // Módszer szerinti szín megjelenítése
        switch (method) {
            case "backgroundColor":
                // Háttérszín beállítása a cél elemnek
                tar.style.backgroundColor = `rgb(${colorRGB.r},${colorRGB.g},${colorRGB.b})`;
                break;
            case "color":
                // Szövegszín beállítása a cél elemnek
                tar.style.color = `rgb(${colorRGB.r},${colorRGB.g},${colorRGB.b})`;
                break;
            case "background":
                // Háttér lineáris gradiens beállítása a cél elemnek (lentről felfelé)
                tar.style.background = `linear-gradient(to bottom, rgb(${colorRGB.r},${colorRGB.g},${colorRGB.b}), transparent)`;
                break;
            case "background-top":
                // Háttér lineáris gradiens beállítása a cél elemnek (fentről lefelé)
                tar.style.background = `linear-gradient(to top, rgb(${colorRGB.r},${colorRGB.g},${colorRGB.b}), transparent)`;
                break;
            default:
                // Alap eset: nincs teendő
                break;
        }
    }
}

// Bemeneti kép feldolgozása és a leggyakoribb szín RGB értékeinek kinyerése
function processInput(img) {
    // Vászon létrehozása
    var canvas = document.createElement('canvas'),
    // Vászon kontextusának meghatározása
        context = canvas.getContext('2d'),
        // Kép szélességének meghatározása
        width = img.width,
        // Kép magasságának meghatározása
        height = img.height,
        // Kép adatok
        imgData,
        // Pixel számláló objektum
        pixelCounts = {},
        // Maximális számolt előfordulók száma
        maxCount = 0,
        // Kimeneti RGB értékek
        outputRGB;

        // Vászon méreteinek beállítása
    canvas.width = width;
    canvas.height = height;

    // Kép másolása a vászonra
    context.drawImage(img, 0, 0, width, height);
    // Kép adatok lekérése a vászonról
    imgData = context.getImageData(0, 0, width, height);

    // Számoljuk meg a pixel színeket
    for (var i = 0; i < imgData.data.length; i += 4) {
        var r = imgData.data[i];
        var g = imgData.data[i + 1];
        var b = imgData.data[i + 2];
        var color = `rgb(${r},${g},${b})`;

        // Ha a pixel szín még nem szerepelt a színek között, inicializáljuk a számlálót
        if (pixelCounts[color] === undefined) {
            pixelCounts[color] = 0;
        }
        pixelCounts[color]++;

        // Ha az adott szín előfordulásai meghaladják a maximális előfordulások számát
        if (pixelCounts[color] > maxCount) {
            // Ha a szín szürke, fehér vagy fekete, keresünk egy másik leggyakoribb színt
            if (isGray(r, g, b) || isWhite(r, g, b) || isBlack(r, g, b)) {
                continue;
            }
            
            // Maximális előfordulások számának frissítése
            maxCount = pixelCounts[color];
            // Kimeneti RGB értékek frissítése
            outputRGB = { r, g, b };
        }
    }

    // Kimeneti RGB értékek visszaadása
    return outputRGB;
}

function isGray(r, g, b) {
    // A szürke szín az, ahol a vörös, zöld és kék értékek nagyon közel vannak egymáshoz
    var threshold = 10; // küszöbérték a szürkeség ellenőrzéséhez
    return Math.abs(r - g) < threshold && Math.abs(r - b) < threshold && Math.abs(g - b) < threshold;
}

function isWhite(r, g, b) {
    // A fehér szín az, ahol minden RGB érték közel van a maximálishoz
    var threshold = 200; // küszöbérték a fehérség ellenőrzéséhez
    return r > threshold && g > threshold && b > threshold;
}

function isBlack(r, g, b) {
    // A fekete szín az, ahol minden RGB érték közel van a minimális értékhez
    var threshold = 50; // küszöbérték a feketeség ellenőrzéséhez
    return r < threshold && g < threshold && b < threshold;
}

// To generate color from input image use: generateColor("#sourceimage-example", "#target-element-example", "apply-method");

/* ==Apply methods== */

//backgroundColor
//color
//background
//background-top