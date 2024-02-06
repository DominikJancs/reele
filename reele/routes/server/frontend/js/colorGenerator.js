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
            default:
                //
                break;
        }
    }
}

function processInput(img) {
    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        width = height = 1,
        imgData,
        outputRGB;

    canvas.width = width
    canvas.height = height

    context.drawImage(img, 0, 0, width, height);
    imgData = context.getImageData(0, 0, width, height);

    outputRGB = {
        r: imgData.data[0],
        g: imgData.data[1],
        b: imgData.data[2]
    };

    return outputRGB;
}

// To generate color from input image use: generateColor("#sourceimage-example", "#target-element-example", "apply-method");

/* ==Apply methods== */

//backgroundColor
//color
//background