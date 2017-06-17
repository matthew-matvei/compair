const packager = require("electron-packager");

const ignore = (filePath) => filePath.includes(".js.map") ||
    filePath.includes("Test");

const options = {
    dir: "dist",
    arch: "all",
    out: "packages",
    overwrite: "true",
    platform: "linux,darwin",
    ignore: ignore,
    // mac-specific
    appBundleId: "compair",
    appCategoryType: "public.app-category.utilities"
};

packager(options, (error, appPaths) => {
    if (error) {
        console.log(error);
    }
    console.log(appPaths);
});
