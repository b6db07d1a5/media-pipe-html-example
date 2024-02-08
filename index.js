import {
  FilesetResolver,
  FaceDetector,
  ObjectDetector,
} from "./package/vision_bundle.mjs";

document.addEventListener("DOMContentLoaded", async (event) => {
  console.log("DOM fully loaded and parsed");
  await main();
});

async function main() {
  console.log("log");

  const vision = await FilesetResolver.forVisionTasks(
    // path/to/wasm/root
    "./package/wasm"
  );
  //   const facedetector = await FaceDetector.createFromOptions(vision, {
  //     baseOptions: {
  //       modelAssetPath: "/app/shared/models/blaze_face_short_range.tflite",
  //     },
  //     runningMode: "IMAGE",
  //   });

  const objectDetector = await ObjectDetector.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `/app/shared/models/efficientdet_lite0.tflite`,
    },
    scoreThreshold: 0.5,
    runningMode: "IMAGE",
  });

  const image = document.getElementById("image");
  //   const detections = facedetector.detect(image);

  const detections = objectDetector.detect(image);

  console.log(detections);
}
