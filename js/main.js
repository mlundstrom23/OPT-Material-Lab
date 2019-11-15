var canvas = document.getElementById('babylon-canvas');
var engine = new BABYLON.Engine(canvas);

var createScene = function () {
  var scene = new BABYLON.Scene(engine);

  //Adding a light
  var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, 100), scene);

  //Adding an Arc Rotate Camera
  var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, false);

  // The first parameter can be used to specify which mesh to import. Here we import all meshes
  //BABYLON.SceneLoader.ImportMesh("", "", "Ring_10mm.stl", scene, function (newMeshes) {
      // Set the target of the camera to the first imported mesh
      //camera.target = newMeshes[0];
  //});

  // Move the light with the camera
  scene.registerBeforeRender(function () {
      light.position = camera.position;

  });

  function handleFiles (event) {
    var uploader = event.srcElement || event.currentTarget;
    var files = uploader.files;
    var reader = new FileReader();

      reader.onload = (function (e) {
          var result = e.target.result;
              //File content.
              BABYLON.SceneLoader.ImportMesh(null, result, '', scene, function (newMeshes) {
                  camera.target = newMeshes[0];
                  console.log(newMeshes);
              });
            })     
    };
// Read in the image file as a data URL.
  reader.readAsDataURL(files[0]);
  return scene;
};

$(document).ready(() => {
  var scene = createScene();

  engine.runRenderLoop(() => {
    if (scene) {
      scene.render();
    }
  })
});

/* var engine = new BABYLON.Engine(document.getElementById('babylon-canvas'));

var delayCreateScene = function () {
    // Create a scene.
    var scene = new BABYLON.Scene(engine);

    // Create a default skybox with an environment.
    // var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("textures/environment.dds", scene);
    // var currentSkybox = scene.createDefaultSkybox(hdrTexture, true);

    // Append model to scene.
    BABYLON.SceneLoader.Append("", window.fileToParse, scene, function (scene) {
        // Create a default arc rotate camera and light.
        scene.createDefaultCamera(true, true, true);
        
        // The default camera looks at the back of the asset.
        // Rotate the camera by 180 degrees to the front of the asset.
        scene.activeCamera.alpha += Math.PI;
    });

    return scene;
};

$(document).ready(() => {
    $('.inputfile').on('change', () => {
        delayCreateScene();
    })
}); */