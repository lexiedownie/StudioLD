import sharp from "sharp";
import fg from "fast-glob";
import fs from "fs/promises";
import path from "path";

const sizes = [400, 800, 1600, 2400];

const files = await fg("public/assets/**/*.{jpg,jpeg,png,webp}");

for (const file of files) {
    const ext = path.extname(file);
    const base = file.replace(ext, "");

    const metadata = await sharp(file).metadata();

    console.log(`Optimizing ${file}`);

    for (const width of sizes) {

        // Don't upscale
        if (metadata.width < width) continue;

        const output = `${base}-${width}.webp`;

        try {
            await fs.access(output);
            continue; // already exists
        } catch {}

        await sharp(file)
            .resize({ width })
            .webp({ quality: 82 })
            .toFile(output);

        console.log(` -> ${output}`);
    }
}