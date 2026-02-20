const Jimp = require("jimp");

async function removeBackground() {
    try {
        const image = await Jimp.read("public/assets/img/whatsapp-button.png");
        const targetColor = { r: 255, g: 255, b: 255, a: 255 }; // White
        const replaceColor = { r: 0, g: 0, b: 0, a: 0 }; // Transparent
        const colorDistance = (c1, c2) =>
            Math.sqrt(
                Math.pow(c1.r - c2.r, 2) + Math.pow(c1.g - c2.g, 2) + Math.pow(c1.b - c2.b, 2)
            );

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            const thisColor = {
                r: this.bitmap.data[idx + 0],
                g: this.bitmap.data[idx + 1],
                b: this.bitmap.data[idx + 2],
                a: this.bitmap.data[idx + 3],
            };
            if (colorDistance(targetColor, thisColor) <= 50) {
                this.bitmap.data[idx + 3] = replaceColor.a;
            }
        });

        await image.writeAsync("public/assets/img/whatsapp-button-transparent.png");
        console.log("Image processed successfully.");
    } catch (err) {
        console.error(err);
    }
}

removeBackground();
