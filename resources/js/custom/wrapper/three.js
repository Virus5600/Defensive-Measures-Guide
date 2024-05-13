import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { GUI } from "lil-gui"

/**
 * A utility class for Three.js.
 *
 * The class aims to provide a more organized and structured way to create
 * Three.js scenes by encapsulating the renderer, scene, camera, and others.
 *
 * A single instance of this class will allow basic controls of the entire scene and
 * its objects. For more advanced controls, the user can still access the `renderer`,
 * `scene`, `camera`, and other objects directly.
 *
 * @class
 */
export default class ThreeUtil {
	/**
	 * An instance of {@link HTMLElement}. The parent element of the renderer
	 * and the scene.
	 *
	 * @type {HTMLElement}
	 */
	#parent;

	/**
	 * The width of the renderer.
	 *
	 * @type {number}
	 */
	#width;

	/**
	 * The height of the renderer.
	 *
	 * @type {number}
	 */
	#height;

	/**
	 * The configuration of the instance. This will hold the configuration of the
	 * instance, allowing configurable settings which can be accessed and modified
	 * through its own getter and setter.
	 */
	#instanceConfiguration = {};

	/**
	 * The GUI instance for this class.
	 */
	#gui;

	/**
	 * The scene for this instance.
	 *
	 * @type {undefined|THREE.Scene}
	 */
	scene;

	/**
	 * The renderer for this instance.
	 *
	 * @type {undefined|THREE.WebGLRenderer}
	 */
	renderer;

	/**
	 * The camera for the scene.
	 *
	 * @type {undefined|THREE.PerspectiveCamera}
	 */
	camera;

	/**
	 * Holds the control instance for the camera in this class instance.
	 *
	 * @type {undefined|OrbitControls}
	 */
	controls;

	/**
	 * A dictionary of objects in this current instance, where every object has a pairing
	 * key. This allows every object to have their unique names and thus, allowing easier
	 * management of each objects.
	 *
	 * Objects in this dictionary could be accessed directly or via {@link ThreeUtil.getObject}
	 * or {@link ThreeUtil.getModel}. On the other hand, adding objects to the scene requires
	 * the use of {@link ThreeUtil.addObject} or {@link ThreeUtil.addModel} so
	 * that the object will automatically be registered into this dictionary instead of
	 * manually adding the objects through the {@link ThreeUtil.scene} object then adding the
	 * same object to the dictionary.
	 *
	 * @type {Object.<String, THREE.Object3D>}
	 */
	objects = {};

	/**
	 * A dictionary of callbacks for this instance. This allows the user to add runtime
	 * callbacks which will all be called during the rendering of the scene.
	 *
	 * The key of the dictionary will be the name of the callback, while the value will
	 * be the callback function itself.
	 *
	 * @type {Object.<String, Function>}
	 */
	renderCallbacks = {};

	/**
	 * A GLTF (Graphics Library Transmission Format) object loader, which allows the
	 * user to load 3D models in the GLTF format. Only the loader is set as static to
	 * save memory.
	 *
	 * @type {GLTFLoader}
	 */
	static LOADER = new GLTFLoader();

	/**
	 * Creates an instance of the `ThreeUtil` class. By default, the background of the
	 * canvas will be opaque and colored black. If the user wants a transparent background, they
	 * can set the `enableAlphaBG` parameter to `true`.
	 *
	 * Furthermore, controls will only allow orbiting controls and not panning. If the user
	 * wants to enable panning, they can set the `enablePan` property of the controls to `true`.
	 *
	 * @param {HTMLElement} parent The parent element of the renderer and the scene.
	 * @param {number} width The width of the canvas.
	 * @param {number} height The height of the canvas.
	 * @param {boolean} enableAlphaBG Determines if the background of the canvas should be transparent.
	 */
	constructor(parent, width, height, enableAlphaBG = false) {
		// Sets the canvas properties.
		this.#parent = parent;
		this.#width = width;
		this.#height = height;

		let rendererOpt = {};
		if (enableAlphaBG)
			rendererOpt['alpha'] = true;

		// Sets instances.
		this.scene = new THREE.Scene();
		this.renderer = new THREE.WebGLRenderer(rendererOpt);
		this.camera = new THREE.PerspectiveCamera(
			75,
			this.#width / this.#height,
			0.1,
			1000
		);
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);

		// Configure then append the renderer to the parent.
		this.renderer.setSize(this.#width, this.#height);
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.#parent.appendChild(this.renderer.domElement);

		// Adds a default light source.
		this.addObject('default-light', new THREE.AmbientLight(0xFFFFFF, 1.125));

		// Sets the camera position to allow an angled view of the scene from above.
		this.camera.position.set(0, 1.25, 1.25);
		this.camera.updateProjectionMatrix();
		this.controls.enablePan = false;

		// Adds the animation control GUI.
		this.#addAnimationControlGUI();
	}

	/**
	 * Starts the animation loop for the scene. This method will be called once
	 * to start the animation loop and will continue to call itself recursively.
	 *
	 * This method will also began the initial rendering of the scene, allowing
	 * the user to see the scene.
	 */
	render() {
		requestAnimationFrame(this.render.bind(this));

		Object.keys(this.renderCallbacks).forEach((key) => {
			this.renderCallbacks[key]();
		});

		this.controls.update();
		this.renderer.render(this.scene, this.camera);
	}

	/**
	 * An alias to {@link ThreeUtil.addModel} method.
	 *
	 * @param {String} objectName The unique name for the object.
	 * @param {String|THREE.Object3D} object A resource path or `THREE.Object3D` object to add.
	 */
	addObject(objectName, object) {
		return this.addModel(objectName, object);
	}

	/**
	 * Adds a model inside the scene, positioning it at the point of origin (`[0, 0, 0]`).
	 * The model will be added to the {@link ThreeUtil.object} dictionary as well to be kept
	 * as a record of all current objects inside the scene. This allows easier object
	 * management and if need be, modifications to them.
	 *
	 * The `modelName` will serve as the `model`'s dictionary key so you could fetch the said
	 * object using the {@link ThreeUtil.getObject} method.
	 *
	 * A callback is provided in the parameter to allow follow up codes to be called when
	 * the model to be added is from a URL or path. This allows the user to do additional
	 * operations on the model after it is added to the scene without causing an issue due
	 * to the asynchronous nature of the loader.
	 *
	 * A `callback` should have the following parameters.
	 * - `modelName` The unique name given to the model.
	 * - `model` The model that was added to the scene.
	 *
	 * @param {String} modelName The unique name for the model.
	 * @param {String|THREE.Object3D} model A resource path or `THREE.Object3D` object to add.
	 * @param {Function} callback A callback function to be called after the model is added.
	 *
	 * @alias ThreeUtil.addObject
	 */
	addModel(modelName, model, callback) {
		if (model instanceof THREE.Object3D) {
			this.scene.add(model);
			this.#insertModelToList(modelName, model);
			if (callback)
				callback(modelName, model);
		}
		else if (typeof model == "string") {
			ThreeUtil.LOADER.load(model, (object) => {
				this.addModel(modelName, object.scene);
				if (callback)
					callback(modelName, object);
			}, undefined, (error) => {
				console.error(error);
			});
		}
		else {
			console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", model);
		}

		return this;
	}

	/**
	 *  An alias to {@link ThreeUtil.getModel} method.
	 *
	 * @param {String} objectName The unique name given to the object.
	 * @returns {null|THREE.Object3D}
	 */
	getObject(objectName) {
		return this.getModel(objectName);
	}

	/**
	 * Fetches the object/model with the given unique name.
	 *
	 * @param {String} modelName The unique name given to the model.
	 * @returns {null|THREE.Object3D}
	 *
	 * @alias ThreeUtil.getObject
	 */
	getModel(modelName) {
		return this.objects[modelName];
	}

	/**
	 * Centers the object to the view of the camera. This method will calculate the center
	 * of the object and move the camera to that point. The camera will then look at the
	 * object, making sure that the object is at the center of the view.
	 *
	 * @param {String} objectName The unique name given to the object.
	 */
	centerObjectToView(objectName) {
		const OBJECT = this.getObject(objectName);

		if (!OBJECT) {
			console.error(`Object with name '${objectName}' not found.`);
			return;
		}

		const BOUNDING_BOX = new THREE.Box3().setFromObject(OBJECT),
			CENTER = BOUNDING_BOX.getCenter(new THREE.Vector3()),
			MAX_SIZE = BOUNDING_BOX.getSize(new THREE.Vector3());

		this.camera.position.set(
			CENTER.x,
			CENTER.y + MAX_SIZE.y,
			CENTER.z + Math.max(MAX_SIZE.x, MAX_SIZE.y, MAX_SIZE.z)
		);

		return this;
	}

	/**
	 * Enables or disables the auto rotation of camera around the scene. The speed of the
	 * rotation can also be set and given direction.
	 *
	 * A positive value will rotate the camera in a counter-clockwise direction, while a
	 * negative value will rotate the camera in a clockwise direction.
	 *
	 * @param {boolean} enabled Determines if the auto-rotation is enabled or not.
	 * @param {number} speed Defines the speed of the auto-rotation. Default is `1`.
	 */
	autoRotate(enabled, speed = 1) {
		this.controls.autoRotate = enabled;
		this.controls.autoRotateSpeed = speed;

		return this;
	}

	/**
	 * Adds a CSS class to the canvas element of the renderer.
	 *
	 * @param  {String} classNames CSS class names
	 */
	addClassToCanvas(classNames) {
		this.renderer.domElement.classList.add(...(classNames.split(" ")));

		return this;
	}

	/**
	 * Removes a CSS class from the canvas element of the renderer.
	 *
	 * @param {String} classNames CSS class names
	 */
	removeClassFromCanvas(classNames) {
		this.renderer.domElement.classList.remove(...(classNames.split(" ")));

		return this;
	}

	/**
	 * Adds the specified model to the {@link ThreeUtil.object} dictionary, keeping
	 * track of the said object and allowing easier access to the said object when
	 * needed.
	 *
	 * @param {String} modelName A unique name for the model to be added
	 * @param {THREE.Object3D} model The model that is added to the scene.
	 */
	#insertModelToList(modelName, model) {
		this.objects[modelName] = model;

		return this;
	}

	/**
	 * Adds the animation control GUI to the scene. This GUI will allow the user to
	 * control the animation of the scene, such as enabling/disabling the auto-rotation
	 * of the camera.
	 */
	#addAnimationControlGUI() {
		this.#gui = new GUI();

		Object.keys(this.#instanceConfiguration).forEach((key) => {
			if (this.#instanceConfiguration[key] instanceof Object) {
				if("isFolder" in this.#instanceConfiguration[key]) {
					if (this.#instanceConfiguration[key].isFolder) {
						this.#gui.addFolder(this.#instanceConfiguration[key].name);
						return;
					}
				}
			}

			this.#gui.add(this.#instanceConfiguration, key);
		});
	}
}

// TODO: Implement GUI Controls
