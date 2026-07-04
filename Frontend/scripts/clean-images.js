import fg from "fast-glob";
import fs from "fs/promises";
import path from "path";

const sizes = [400, 800, 1600, 2400];

const files = (await fg("public/assets/**/*.{jpg,jpeg,png,webp}"))
    .filter((file) => path.basename(file).toLowerCase() !== "favicon.webp");

for (const file of files) {
    const ext = path.extname(file);
    const base = file.replace(ext, "");

    for (const width of sizes) {
        const target = `${base}-${width}.webp`;
        try {
            await fs.unlink(target);
            console.log(`Removed ${target}`);
        } catch {}
    }
}
