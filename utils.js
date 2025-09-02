
function configurePage() {
  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    // Mobile device style: fill the whole browser client area with the game canvas:
    var meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content =
      "width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes";
    document.getElementsByTagName("head")[0].appendChild(meta);

    var canvas = document.querySelector("#unity-canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.position = "fixed";

    document.body.style.textAlign = "left";
  }
}

/**
 *
 * @param {string} version
 */
async function startGameVersion(version) {
  configurePage();

  while (!window.createUnityInstance) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  createUnityInstance(document.querySelector("#unity-canvas"), {
    arguments: [],
    dataUrl: `builds/${version}/brackeys.data.gz`,
    frameworkUrl: `builds/${version}/brackeys.framework.js.gz`,
    codeUrl: `builds/${version}/brackeys.wasm.gz`,
    streamingAssetsUrl: "StreamingAssets",
    companyName: "TheNuclearNexus _ Jachro",
    productName: "Mages of Biscocta",
    productVersion: "1.0",
    // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
    // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
  });
}
