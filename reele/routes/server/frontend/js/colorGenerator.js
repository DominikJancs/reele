function generateColor(src, tar, method) {
    var srcIMG = document.querySelector(src);
    var target = document.querySelector(tar);
    if (!(src.includes('.') || src.includes('#')) && !(tar.includes('.') || tar.includes('#'))) return "Something went wrong!";
    else displayColor(srcIMG, target, method);
}

function displayColor(srcIMG, tar, method) {
    window.onload = () => {
        var colorRGB = processInput(srcIMG);
        switch (method) {
            case "backgroundColor":
                tar.style.backgroundColor = `rgb(${colorRGB.r},${colorRGB.g},${colorRGB.b})`;
                break;
            case "color":
                tar.style.color = `rgb(${colorRGB.r},${colorRGB.g},${colorRGB.b})`;
                break;
            case "background":
                tar.style.background = `linear-gradient(to bottom, rgb(${colorRGB.r},${colorRGB.g},${colorRGB.b}), transparent)`;
                break;
            case "background-top":
                tar.style.background = `linear-gradient(to top, rgb(${colorRGB.r},${colorRGB.g},${colorRGB.b}), transparent)`;
                break;
            default:
                break;
        }
    }
}

function processInput(img) {
    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        width = img.width,
        height = img.height,
        imgData,
        pixelCounts = {},
        maxCount = 0,
        outputRGB;

    canvas.width = width;
    canvas.height = height;

    context.drawImage(img, 0, 0, width, height);
    imgData = context.getImageData(0, 0, width, height);

    for (var i = 0; i < imgData.data.length; i += 4) {
        var r = imgData.data[i];
        var g = imgData.data[i + 1];
        var b = imgData.data[i + 2];
        var color = `rgb(${r},${g},${b})`;

        if (pixelCounts[color] === undefined) {
            pixelCounts[color] = 0;
        }
        pixelCounts[color]++;

        if (pixelCounts[color] > maxCount) {
            if (isGray(r, g, b) || isWhite(r, g, b) || isBlack(r, g, b)) {
                continue;
            }
            
            maxCount = pixelCounts[color];
            outputRGB = { r, g, b };
        }
    }

    return outputRGB;
}

function isGray(r, g, b) {
    var threshold = 10;
    return Math.abs(r - g) < threshold && Math.abs(r - b) < threshold && Math.abs(g - b) < threshold;
}

function isWhite(r, g, b) {
    var threshold = 200;
    return r > threshold && g > threshold && b > threshold;
}

function isBlack(r, g, b) {
    var threshold = 50;
    return r < threshold && g < threshold && b < threshold;
}