import { build } from "electron-builder";

build({
  config: {
    appId: "org.tky.Shokushu2",
    productName: "Shokushu2",
    copyright: "© 2021 tky",
    // eslint-disable-next-line no-template-curly-in-string
    artifactName: "${name}-${version}-${platform}-${arch}.${ext}",
    files: ["dist/**/*"],
    directories: {
      output: "release",
      // buildResources: "assets",
    },
    win: {
      icon: "resources/icon.ico",
    },
    mac: {
      identity: null,
      icon: "resources/icon.icns",
    },
    linux: {
      category: "Utility",
    },
  },
})
  .then(() => console.log("Completed."))
  .catch((err) => console.log(err));
