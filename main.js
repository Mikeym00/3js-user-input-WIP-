import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

// always need canvas, camera, and renderer 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer(
    {canvas:document.querySelector("#bg")}
);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90,140,100);


//############################################################################################
//############################################################################################
const gridHelper =  new THREE.GridHelper(200);
scene.add(gridHelper);
const ambientLight =  new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

//############################################################################################
//############################################################################################
//SPHERES 

const player =  new THREE.Mesh(
    new THREE.SphereGeometry(12,23,23),
    new THREE.MeshStandardMaterial({color: 0x5543321})
);
scene.add(player);
//############################################################################################
//############################################################################################
// SPHERE/CHARACTER MOVEMENT

//both keyup and keydown? + mousedown and mouseup?
//button based movement 

const forwardButton =  document.getElementById("forward");
const backwardButton = document.getElementById("backward");

let mousedownID = -1;
function mouseDown(e){
    if(mousedownID==-1){
        // mousedownID = setInterval(whilemousedownforward, 25);
        if(e.target == forwardButton){
            mousedownID = setInterval(whilemousedownforward, 25);
        }
        else if(e.target == backwardButton){
            mousedownID = setInterval(whilemousedownbackward, 25);
        }  
    }    
}


function mouseUp(){
    if(mousedownID!=-1){
        clearInterval(mousedownID);
        mousedownID=-1;
    }
}
function whilemousedownforward(){
    player.position.x += 1;
}
function whilemousedownbackward(){
    player.position.x -= 1;
}


forwardButton.addEventListener("mousedown", mouseDown);
forwardButton.addEventListener("mouseup", mouseUp);

backwardButton.addEventListener("mousedown", mouseDown);
backwardButton.addEventListener("mouseup", mouseUp);


//Keyboard based movement 
document.addEventListener("keydown",(e) => {
    switch (e.key) {
      case "w":
      player.position.x += 1;
      break;
      case "s":
      player.position.x -= 1;
      break;
    }
  })

//############################################################################################
//############################################################################################



function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();


window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});