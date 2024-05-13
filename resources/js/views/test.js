import ThreeUtil from "../custom/wrapper/three";

document.addEventListener("DOMContentLoaded", () => {
	const PARENT = document.querySelector('#testingBody');

	const DISPLAY = new ThreeUtil(PARENT, 512, 512, true);
	DISPLAY.addModel(
		'cannon_turret',
		'uploads/models/cannon_turret/cannon_turret.gltf',
		(modelName, model) => {
			DISPLAY.centerObjectToView(modelName);
		})
		.autoRotate(true, 1.25)
		.addClassToCanvas(`border rounded`)
		.render();

	window.DISPLAY = DISPLAY;
});

// Implement the auto resize implementor for dynamic canvas.
window.addEventListener('resize', (e) => {
	var WIDTH, HEIGHT;
	if (window.innerWidth > window.innerHeight) {
	}
	else {
	}
});
