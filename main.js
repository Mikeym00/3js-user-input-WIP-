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
// MAIN CODE HERE 

const mySphere =  new THREE.Mesh(
    new THREE.SphereGeometry(12,23,23),
    new THREE.MeshStandardMaterial({color: 0x5543321})
);
scene.add(mySphere);




//############################################################################################
//############################################################################################



function animate(){
    requestAnimationFrame(animate);  
    controls.update();
    renderer.render(scene, camera);
}
animate();
