import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import type { HardwareModuleSpec } from "@/data/portfolio-data";

export type ModuleId = HardwareModuleSpec["id"] | null;

interface CameraPose {
  position: THREE.Vector3;
  target: THREE.Vector3;
}

const DEFAULT_POSE: CameraPose = {
  position: new THREE.Vector3(6.4, 5.4, 7.0),
  target: new THREE.Vector3(0, 0.3, 0.15),
};

const MODULE_POSES: Record<HardwareModuleSpec["id"], CameraPose> = {
  cpu: {
    position: new THREE.Vector3(1.1, 3.4, 2.5),
    target: new THREE.Vector3(-0.15, 0.75, -0.35),
  },
  pcie: {
    position: new THREE.Vector3(1.9, 2.7, 4.7),
    target: new THREE.Vector3(0.05, 0.78, 1.5),
  },
  mem: {
    position: new THREE.Vector3(3.7, 3.4, 1.8),
    target: new THREE.Vector3(1.9, 0.85, -0.35),
  },
  vrm: {
    position: new THREE.Vector3(-0.2, 3.8, 1.1),
    target: new THREE.Vector3(-0.15, 0.85, -1.9),
  },
  io: {
    position: new THREE.Vector3(-4.4, 3.2, 2.1),
    target: new THREE.Vector3(-2.35, 0.9, -0.55),
  },
};

export interface RigSceneCallbacks {
  getPinElement: (id: HardwareModuleSpec["id"]) => HTMLButtonElement | null;
  onHoverModule: (id: ModuleId) => void;
  onSelectModule: (id: ModuleId) => void;
  onWebGLUnavailable: () => void;
}

export interface RigSceneController {
  setSelectedModule: (id: ModuleId) => void;
  setHoveredModule: (id: ModuleId) => void;
  setExploded: (exploded: boolean) => void;
  nudgeCamera: (deltaYaw: number, deltaPitch: number) => void;
  dispose: () => void;
}

export function createHardwareRigScene(
  container: HTMLElement,
  callbacks: RigSceneCallbacks
): RigSceneController | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch {
    callbacks.onWebGLUnavailable();
    return null;
  }

  const width = Math.max(container.clientWidth, 1);
  const height = Math.max(container.clientHeight, 1);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  container.appendChild(renderer.domElement);

  const onContextLost = (event: Event) => {
    event.preventDefault();
    callbacks.onWebGLUnavailable();
  };
  renderer.domElement.addEventListener("webglcontextlost", onContextLost);

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let prefersReducedMotion = motionQuery.matches;
  const onMotionChange = (e: MediaQueryListEvent) => {
    prefersReducedMotion = e.matches;
  };
  motionQuery.addEventListener("change", onMotionChange);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#EFEDE6");
  scene.fog = new THREE.FogExp2("#EFEDE6", 0.022);

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const roomEnv = new RoomEnvironment();
  const envRenderTarget = pmremGenerator.fromScene(roomEnv, 0.035);
  roomEnv.dispose();
  scene.environment = envRenderTarget.texture;

  const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
  camera.position.copy(DEFAULT_POSE.position);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.045;
  controls.maxPolarAngle = Math.PI / 2 - 0.04;
  controls.minDistance = 2.4;
  controls.maxDistance = 15;
  controls.target.copy(DEFAULT_POSE.target);

  let selectedId: ModuleId = null;
  let hoveredId: ModuleId = null;
  let isExploded = false;
  let cameraAnimating = false;
  const desiredPose: CameraPose = {
    position: DEFAULT_POSE.position.clone(),
    target: DEFAULT_POSE.target.clone(),
  };

  const onControlStart = () => {
    cameraAnimating = false;
  };
  controls.addEventListener("start", onControlStart);

  // Studio 4-Point Lighting
  const hemiLight = new THREE.HemisphereLight("#FFFDF9", "#D6D1C4", 0.85);
  hemiLight.position.set(0, 12, 0);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight("#FFF8EB", 2.45);
  keyLight.position.set(6.5, 11.5, 7.5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  keyLight.shadow.camera.near = 2;
  keyLight.shadow.camera.far = 26;
  const shadowExtent = 5.4;
  keyLight.shadow.camera.left = -shadowExtent;
  keyLight.shadow.camera.right = shadowExtent;
  keyLight.shadow.camera.top = shadowExtent;
  keyLight.shadow.camera.bottom = -shadowExtent;
  keyLight.shadow.bias = -0.0004;
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight("#D6E4FF", 1.15);
  rimLight.position.set(-7.5, 5.5, -6.5);
  scene.add(rimLight);

  const warmBounce = new THREE.PointLight("#FF6A22", 1.4, 9, 1.8);
  warmBounce.position.set(0.2, 1.4, 2.2);
  scene.add(warmBounce);

  // Studio Shadow Receiver Floor
  const floorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 60),
    new THREE.ShadowMaterial({ opacity: 0.16 })
  );
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.y = -0.36;
  floorMesh.receiveShadow = true;
  scene.add(floorMesh);

  // Tactile Physical Materials
  const matChassisOrange = new THREE.MeshPhysicalMaterial({
    color: "#FF4F00",
    roughness: 0.28,
    metalness: 0.12,
    clearcoat: 0.45,
    clearcoatRoughness: 0.22,
  });
  const matAnodizedSilver = new THREE.MeshPhysicalMaterial({
    color: "#E8E6E0",
    roughness: 0.22,
    metalness: 0.86,
    clearcoat: 0.3,
    clearcoatRoughness: 0.2,
  });
  const matGunmetal = new THREE.MeshPhysicalMaterial({
    color: "#282A2E",
    roughness: 0.28,
    metalness: 0.78,
    clearcoat: 0.25,
  });
  const matBeadBlastedDark = new THREE.MeshPhysicalMaterial({
    color: "#161719",
    roughness: 0.36,
    metalness: 0.42,
    clearcoat: 0.18,
  });
  const matMattePCB = new THREE.MeshStandardMaterial({
    color: "#111214",
    roughness: 0.52,
    metalness: 0.24,
  });
  const matBonePlastic = new THREE.MeshPhysicalMaterial({
    color: "#FAF9F5",
    roughness: 0.28,
    metalness: 0.05,
    clearcoat: 0.35,
    clearcoatRoughness: 0.25,
  });
  const matCopperGold = new THREE.MeshPhysicalMaterial({
    color: "#DF9B28",
    roughness: 0.18,
    metalness: 0.94,
    clearcoat: 0.4,
  });
  const matCobaltAccent = new THREE.MeshPhysicalMaterial({
    color: "#1E56E8",
    roughness: 0.28,
    metalness: 0.25,
    clearcoat: 0.4,
  });
  const matSmokedGlass = new THREE.MeshPhysicalMaterial({
    color: "#1C1E22",
    roughness: 0.12,
    metalness: 0.1,
    transparent: true,
    opacity: 0.58,
    clearcoat: 0.9,
  });
  const matOrangeLED = new THREE.MeshStandardMaterial({
    color: "#FF5500",
    emissive: "#FF4F00",
    emissiveIntensity: 1.8,
    roughness: 0.2,
  });
  const matTraceGold = new THREE.MeshStandardMaterial({
    color: "#B5832A",
    roughness: 0.3,
    metalness: 0.85,
  });

  const tagModuleGroup = (
    group: THREE.Group,
    moduleId: HardwareModuleSpec["id"]
  ) => {
    group.userData.moduleId = moduleId;
    group.traverse((child) => {
      child.userData.moduleId = moduleId;
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  };

  const rigRoot = new THREE.Group();
  scene.add(rigRoot);

  // Base Chassis + Bent Aluminum Tray + Carrying Handle + PCB
  const baseGroup = new THREE.Group();
  rigRoot.add(baseGroup);

  const trayFloor = new THREE.Mesh(
    new RoundedBoxGeometry(6.0, 0.14, 5.0, 5, 0.05),
    matChassisOrange
  );
  trayFloor.position.set(0, -0.18, 0);
  trayFloor.castShadow = true;
  trayFloor.receiveShadow = true;
  baseGroup.add(trayFloor);

  const rearLip = new THREE.Mesh(
    new RoundedBoxGeometry(6.0, 0.62, 0.12, 4, 0.04),
    matChassisOrange
  );
  rearLip.position.set(0, 0.12, -2.44);
  rearLip.castShadow = true;
  baseGroup.add(rearLip);

  const handleCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.68, 0.05, -2.36),
    new THREE.Vector3(-2.68, 0.58, -2.36),
    new THREE.Vector3(-2.35, 0.68, -2.36),
    new THREE.Vector3(0, 0.68, -2.36),
    new THREE.Vector3(2.35, 0.68, -2.36),
    new THREE.Vector3(2.68, 0.58, -2.36),
    new THREE.Vector3(2.68, 0.05, -2.36),
  ]);
  const handleTube = new THREE.Mesh(
    new THREE.TubeGeometry(handleCurve, 48, 0.052, 16, false),
    matAnodizedSilver
  );
  handleTube.castShadow = true;
  baseGroup.add(handleTube);

  const footGeo = new THREE.CylinderGeometry(0.24, 0.19, 0.18, 28);
  const footRingGeo = new THREE.TorusGeometry(0.21, 0.018, 12, 28);
  [
    [-2.62, -2.12],
    [2.62, -2.12],
    [-2.62, 2.12],
    [2.62, 2.12],
  ].forEach(([fx, fz]) => {
    const foot = new THREE.Mesh(footGeo, matBeadBlastedDark);
    foot.position.set(fx, -0.27, fz);
    foot.castShadow = true;
    baseGroup.add(foot);

    const footRing = new THREE.Mesh(footRingGeo, matCopperGold);
    footRing.rotation.x = Math.PI / 2;
    footRing.position.set(fx, -0.23, fz);
    baseGroup.add(footRing);
  });

  const pcbSlab = new THREE.Mesh(
    new RoundedBoxGeometry(5.48, 0.15, 4.48, 5, 0.045),
    matMattePCB
  );
  pcbSlab.position.set(0, 0.02, 0);
  pcbSlab.receiveShadow = true;
  pcbSlab.castShadow = true;
  baseGroup.add(pcbSlab);

  const standoffGeo = new THREE.CylinderGeometry(0.095, 0.095, 0.06, 20);
  [
    [-2.5, -2.0],
    [2.5, -2.0],
    [-2.5, 2.0],
    [2.5, 2.0],
  ].forEach(([sx, sz]) => {
    const screw = new THREE.Mesh(standoffGeo, matCopperGold);
    screw.position.set(sx, 0.11, sz);
    baseGroup.add(screw);
  });

  const hTraceGeo = new THREE.BoxGeometry(1.55, 0.008, 0.018);
  const vTraceGeo = new THREE.BoxGeometry(0.018, 0.008, 1.38);
  for (let i = -4; i <= 4; i++) {
    const trace = new THREE.Mesh(hTraceGeo, matTraceGold);
    trace.position.set(0.92, 0.098, -0.35 + i * 0.11);
    baseGroup.add(trace);

    const pcieTrace = new THREE.Mesh(vTraceGeo, matTraceGold);
    pcieTrace.position.set(-0.15 + i * 0.11, 0.098, 0.55);
    baseGroup.add(pcieTrace);
  }

  const moduleGroups: Record<HardwareModuleSpec["id"], THREE.Group> = {
    cpu: new THREE.Group(),
    pcie: new THREE.Group(),
    mem: new THREE.Group(),
    vrm: new THREE.Group(),
    io: new THREE.Group(),
  };

  const restPositions: Record<HardwareModuleSpec["id"], THREE.Vector3> = {
    cpu: new THREE.Vector3(-0.15, 0.1, -0.35),
    pcie: new THREE.Vector3(0.18, 0.1, 1.46),
    mem: new THREE.Vector3(1.92, 0.1, -0.35),
    vrm: new THREE.Vector3(-0.15, 0.1, -1.78),
    io: new THREE.Vector3(-2.22, 0.1, -0.45),
  };

  const explodeOffsets: Record<HardwareModuleSpec["id"], THREE.Vector3> = {
    cpu: new THREE.Vector3(0, 1.25, 0),
    pcie: new THREE.Vector3(0, 1.05, 0.65),
    mem: new THREE.Vector3(0.65, 0.95, 0),
    vrm: new THREE.Vector3(0, 0.85, -0.42),
    io: new THREE.Vector3(-0.68, 0.72, 0),
  };

  const pinLocalOffsets: Record<HardwareModuleSpec["id"], THREE.Vector3> = {
    cpu: new THREE.Vector3(0, 0.88, 0),
    pcie: new THREE.Vector3(0, 1.15, 0),
    mem: new THREE.Vector3(0, 0.94, 0),
    vrm: new THREE.Vector3(0, 0.72, 0),
    io: new THREE.Vector3(0, 1.32, 0),
  };

  // Module 1: CPU Socket LGA-2124 & Pump Block
  const cpuGroup = moduleGroups.cpu;
  cpuGroup.position.copy(restPositions.cpu);

  const socketBase = new THREE.Mesh(
    new RoundedBoxGeometry(1.68, 0.14, 1.68, 4, 0.04),
    matBonePlastic
  );
  socketBase.position.y = 0.07;
  cpuGroup.add(socketBase);

  const pinBed = new THREE.Mesh(
    new RoundedBoxGeometry(1.36, 0.16, 1.36, 4, 0.03),
    matCopperGold
  );
  pinBed.position.y = 0.08;
  cpuGroup.add(pinBed);

  const ihsMesh = new THREE.Mesh(
    new RoundedBoxGeometry(1.16, 0.22, 1.16, 4, 0.045),
    matAnodizedSilver
  );
  ihsMesh.position.y = 0.2;
  cpuGroup.add(ihsMesh);

  const coolerHousing = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.52, 0.36, 40),
    matBeadBlastedDark
  );
  coolerHousing.position.y = 0.42;
  cpuGroup.add(coolerHousing);

  const collarGeo = new THREE.TorusGeometry(0.51, 0.015, 12, 40);
  for (let r = 0; r < 3; r++) {
    const collarRing = new THREE.Mesh(collarGeo, matGunmetal);
    collarRing.rotation.x = Math.PI / 2;
    collarRing.position.y = 0.32 + r * 0.09;
    cpuGroup.add(collarRing);
  }

  const coolerRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.36, 0.036, 20, 48),
    matOrangeLED
  );
  coolerRing.rotation.x = Math.PI / 2;
  coolerRing.position.y = 0.61;
  cpuGroup.add(coolerRing);

  const coolerGlassCap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.34, 0.34, 0.04, 32),
    matSmokedGlass
  );
  coolerGlassCap.position.y = 0.61;
  cpuGroup.add(coolerGlassCap);

  [-0.16, 0.16].forEach((tz, idx) => {
    const tubeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.38, 0.45, tz),
      new THREE.Vector3(-0.78, 0.68, tz * 1.3),
      new THREE.Vector3(-1.12, 0.38, tz * 1.6 - 0.35),
      new THREE.Vector3(-1.25, 0.14, tz * 1.6 - 0.68),
    ]);
    const tubeMesh = new THREE.Mesh(
      new THREE.TubeGeometry(tubeCurve, 32, 0.042, 14, false),
      idx === 0 ? matChassisOrange : matBeadBlastedDark
    );
    cpuGroup.add(tubeMesh);
  });

  tagModuleGroup(cpuGroup, "cpu");
  rigRoot.add(cpuGroup);

  // Module 2: PCIe 5.0 Dual-Axial GPU Accelerator
  const pcieGroup = moduleGroups.pcie;
  pcieGroup.position.copy(restPositions.pcie);

  const pcieSlot = new THREE.Mesh(
    new RoundedBoxGeometry(3.3, 0.14, 0.24, 3, 0.03),
    matCobaltAccent
  );
  pcieSlot.position.set(-0.15, 0.07, -0.34);
  pcieGroup.add(pcieSlot);

  const goldEdge = new THREE.Mesh(
    new RoundedBoxGeometry(3.0, 0.2, 0.07, 2, 0.02),
    matCopperGold
  );
  goldEdge.position.set(-0.15, 0.17, -0.34);
  pcieGroup.add(goldEdge);

  const gpuPcb = new THREE.Mesh(
    new RoundedBoxGeometry(4.28, 0.78, 0.06, 4, 0.02),
    matMattePCB
  );
  gpuPcb.position.set(0, 0.54, -0.34);
  pcieGroup.add(gpuPcb);

  const gpuBackplate = new THREE.Mesh(
    new RoundedBoxGeometry(4.32, 0.82, 0.06, 4, 0.025),
    matGunmetal
  );
  gpuBackplate.position.set(0, 0.55, -0.4);
  pcieGroup.add(gpuBackplate);

  const gpuFinGeo = new THREE.BoxGeometry(0.032, 0.74, 0.68);
  for (let f = -20; f <= 20; f++) {
    const fin = new THREE.Mesh(gpuFinGeo, matAnodizedSilver);
    fin.position.set(f * 0.098, 0.55, -0.02);
    pcieGroup.add(fin);
  }

  [-0.18, -0.06, 0.06, 0.18].forEach((hz, hIdx) => {
    const hpCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.05, 0.42 + hIdx * 0.05, hz),
      new THREE.Vector3(-0.6, 0.52 + hIdx * 0.06, hz),
      new THREE.Vector3(0.7, 0.94, hz * 0.85),
      new THREE.Vector3(1.85, 0.94, hz * 0.85),
      new THREE.Vector3(2.05, 0.62, hz),
    ]);
    const hpMesh = new THREE.Mesh(
      new THREE.TubeGeometry(hpCurve, 36, 0.032, 12, false),
      matCopperGold
    );
    pcieGroup.add(hpMesh);
  });

  const shroudRailGeo = new RoundedBoxGeometry(4.38, 0.14, 0.86, 5, 0.055);
  const shroudTopRail = new THREE.Mesh(shroudRailGeo, matAnodizedSilver);
  shroudTopRail.position.set(0, 0.91, 0.04);
  pcieGroup.add(shroudTopRail);

  const shroudBottomRail = new THREE.Mesh(shroudRailGeo, matAnodizedSilver);
  shroudBottomRail.position.set(0, 0.19, 0.04);
  pcieGroup.add(shroudBottomRail);

  const shroudLeftCap = new THREE.Mesh(
    new RoundedBoxGeometry(0.42, 0.84, 0.86, 5, 0.06),
    matAnodizedSilver
  );
  shroudLeftCap.position.set(-1.98, 0.55, 0.04);
  pcieGroup.add(shroudLeftCap);

  const shroudRightCap = new THREE.Mesh(
    new RoundedBoxGeometry(0.46, 0.84, 0.86, 5, 0.06),
    matChassisOrange
  );
  shroudRightCap.position.set(1.96, 0.55, 0.04);
  pcieGroup.add(shroudRightCap);

  const shroudCenterBridge = new THREE.Mesh(
    new RoundedBoxGeometry(0.36, 0.82, 0.84, 4, 0.05),
    matGunmetal
  );
  shroudCenterBridge.position.set(0, 0.55, 0.05);
  pcieGroup.add(shroudCenterBridge);

  const shroudFrontPlate = new THREE.Mesh(
    new RoundedBoxGeometry(3.6, 0.68, 0.08, 4, 0.03),
    matBeadBlastedDark
  );
  shroudFrontPlate.position.set(0, 0.55, 0.43);
  pcieGroup.add(shroudFrontPlate);

  const ioBracket = new THREE.Mesh(
    new RoundedBoxGeometry(0.08, 1.02, 0.92, 3, 0.025),
    matAnodizedSilver
  );
  ioBracket.position.set(-2.22, 0.48, 0.02);
  pcieGroup.add(ioBracket);

  const gpuLightBar = new THREE.Mesh(
    new RoundedBoxGeometry(1.45, 0.055, 0.14, 3, 0.02),
    matOrangeLED
  );
  gpuLightBar.position.set(-0.85, 0.985, 0.28);
  pcieGroup.add(gpuLightBar);

  const pwrConnector = new THREE.Mesh(
    new RoundedBoxGeometry(0.34, 0.16, 0.24, 3, 0.03),
    matBeadBlastedDark
  );
  pwrConnector.position.set(1.42, 0.98, 0.12);
  pcieGroup.add(pwrConnector);

  [-0.08, 0, 0.08].forEach((cz, cIdx) => {
    const pwrCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.42 + cz * 0.8, 1.02, 0.12),
      new THREE.Vector3(1.55 + cz * 0.9, 1.34, -0.18),
      new THREE.Vector3(1.72 + cz * 0.9, 0.92, -0.68),
      new THREE.Vector3(1.65 + cz * 0.8, 0.12, -0.82),
    ]);
    const pwrCable = new THREE.Mesh(
      new THREE.TubeGeometry(pwrCurve, 32, 0.028, 12, false),
      cIdx === 1 ? matChassisOrange : matBeadBlastedDark
    );
    pcieGroup.add(pwrCable);
  });

  const gpuFans: THREE.Group[] = [];
  const bezelGeo = new THREE.TorusGeometry(0.34, 0.032, 20, 48);
  const accentRingGeo = new THREE.TorusGeometry(0.305, 0.012, 16, 48);
  const hubGeo = new THREE.CylinderGeometry(0.115, 0.115, 0.07, 28);
  const hubCapGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.08, 20);
  const bladeGeo = new RoundedBoxGeometry(0.19, 0.052, 0.016, 2, 0.006);

  [-0.96, 0.96].forEach((fanX, fanIdx) => {
    const outerBezel = new THREE.Mesh(bezelGeo, matAnodizedSilver);
    outerBezel.position.set(fanX, 0.55, 0.47);
    pcieGroup.add(outerBezel);

    const innerAccentRing = new THREE.Mesh(
      accentRingGeo,
      fanIdx === 0 ? matChassisOrange : matCopperGold
    );
    innerAccentRing.position.set(fanX, 0.55, 0.485);
    pcieGroup.add(innerAccentRing);

    const fanRotor = new THREE.Group();
    fanRotor.position.set(fanX, 0.55, 0.465);

    const hub = new THREE.Mesh(
      hubGeo,
      fanIdx === 0 ? matChassisOrange : matGunmetal
    );
    hub.rotation.x = Math.PI / 2;
    fanRotor.add(hub);

    const hubCap = new THREE.Mesh(hubCapGeo, matAnodizedSilver);
    hubCap.rotation.x = Math.PI / 2;
    fanRotor.add(hubCap);

    const bladeCount = 11;
    for (let b = 0; b < bladeCount; b++) {
      const bladePivot = new THREE.Group();
      bladePivot.rotation.z = (b / bladeCount) * Math.PI * 2;

      const blade = new THREE.Mesh(bladeGeo, matBeadBlastedDark);
      blade.position.set(0.185, 0.02, 0);
      blade.rotation.x = 0.48;
      blade.rotation.z = -0.28;
      bladePivot.add(blade);
      fanRotor.add(bladePivot);
    }

    gpuFans.push(fanRotor);
    pcieGroup.add(fanRotor);
  });

  tagModuleGroup(pcieGroup, "pcie");
  rigRoot.add(pcieGroup);

  // Module 3: DDR5 DIMM Slots + M.2 NVMe Array
  const memGroup = moduleGroups.mem;
  memGroup.position.copy(restPositions.mem);

  const dimmSlotGeo = new RoundedBoxGeometry(0.14, 0.12, 1.8, 3, 0.02);
  const dimmStickGeo = new RoundedBoxGeometry(0.095, 0.62, 1.68, 4, 0.025);
  const dimmDiffuserGeo = new RoundedBoxGeometry(0.105, 0.075, 1.7, 4, 0.025);

  [-0.42, -0.14, 0.14, 0.42].forEach((rx, idx) => {
    const slot = new THREE.Mesh(dimmSlotGeo, matBonePlastic);
    slot.position.set(rx, 0.06, 0);
    memGroup.add(slot);

    const stick = new THREE.Mesh(
      dimmStickGeo,
      idx % 2 === 1 ? matChassisOrange : matGunmetal
    );
    stick.position.set(rx, 0.38, 0);
    memGroup.add(stick);

    const topDiffuser = new THREE.Mesh(
      dimmDiffuserGeo,
      idx % 2 === 1 ? matBonePlastic : matAnodizedSilver
    );
    topDiffuser.position.set(rx, 0.72, 0);
    memGroup.add(topDiffuser);
  });

  const nvmeBlock = new THREE.Mesh(
    new RoundedBoxGeometry(0.4, 0.24, 1.48, 4, 0.04),
    matAnodizedSilver
  );
  nvmeBlock.position.set(0.78, 0.14, 0);
  memGroup.add(nvmeBlock);

  const nvmeCap = new THREE.Mesh(
    new RoundedBoxGeometry(0.34, 0.045, 0.58, 3, 0.015),
    matCobaltAccent
  );
  nvmeCap.position.set(0.78, 0.27, -0.25);
  memGroup.add(nvmeCap);

  tagModuleGroup(memGroup, "mem");
  rigRoot.add(memGroup);

  // Module 4: VRM Power Stage & Knurled Rotary Encoder
  const vrmGroup = moduleGroups.vrm;
  vrmGroup.position.copy(restPositions.vrm);

  const vrmBase = new THREE.Mesh(
    new RoundedBoxGeometry(2.65, 0.24, 0.6, 4, 0.04),
    matAnodizedSilver
  );
  vrmBase.position.set(0, 0.12, 0);
  vrmGroup.add(vrmBase);

  const vrmFinGeo = new RoundedBoxGeometry(0.085, 0.44, 0.58, 3, 0.02);
  for (let f = -5; f <= 5; f++) {
    const fin = new THREE.Mesh(vrmFinGeo, matAnodizedSilver);
    fin.position.set(f * 0.22, 0.33, 0);
    vrmGroup.add(fin);
  }

  const chokeGeo = new RoundedBoxGeometry(0.24, 0.22, 0.24, 3, 0.03);
  const capGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.23, 20);
  for (let c = -2.5; c <= 2.5; c += 1) {
    const choke = new THREE.Mesh(chokeGeo, matGunmetal);
    choke.position.set(c * 0.36, 0.11, 0.46);
    vrmGroup.add(choke);

    const cap = new THREE.Mesh(capGeo, matCopperGold);
    cap.position.set(c * 0.36, 0.11, 0.72);
    vrmGroup.add(cap);
  }

  const vrmKnob = new THREE.Mesh(
    new THREE.CylinderGeometry(0.23, 0.23, 0.36, 32),
    matChassisOrange
  );
  vrmKnob.position.set(1.58, 0.25, 0.12);
  vrmGroup.add(vrmKnob);

  const knobMarker = new THREE.Mesh(
    new RoundedBoxGeometry(0.04, 0.04, 0.16, 2, 0.01),
    matBonePlastic
  );
  knobMarker.position.set(1.58, 0.44, 0.18);
  vrmGroup.add(knobMarker);

  tagModuleGroup(vrmGroup, "vrm");
  rigRoot.add(vrmGroup);

  // Module 5: Rear I/O Shield & Dual SMA Antennas
  const ioGroup = moduleGroups.io;
  ioGroup.position.copy(restPositions.io);

  const ioShroud = new THREE.Mesh(
    new RoundedBoxGeometry(0.8, 0.76, 2.88, 5, 0.05),
    matBonePlastic
  );
  ioShroud.position.set(0, 0.38, 0);
  ioGroup.add(ioShroud);

  const ioTopPlate = new THREE.Mesh(
    new RoundedBoxGeometry(0.75, 0.06, 2.8, 4, 0.02),
    matGunmetal
  );
  ioTopPlate.position.set(0, 0.77, 0);
  ioGroup.add(ioTopPlate);

  const rj45Housing = new THREE.Mesh(
    new RoundedBoxGeometry(0.46, 0.44, 0.54, 3, 0.03),
    matAnodizedSilver
  );
  rj45Housing.position.set(-0.22, 0.32, -0.85);
  ioGroup.add(rj45Housing);

  const usbStack = new THREE.Mesh(
    new RoundedBoxGeometry(0.46, 0.52, 0.64, 3, 0.03),
    matCobaltAccent
  );
  usbStack.position.set(-0.22, 0.35, -0.15);
  ioGroup.add(usbStack);

  const jackGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.34, 24);
  [0.45, 0.78, 1.11].forEach((jz, jIdx) => {
    const jack = new THREE.Mesh(
      jackGeo,
      jIdx === 0 ? matChassisOrange : matCopperGold
    );
    jack.rotation.z = Math.PI / 2;
    jack.position.set(-0.36, 0.34, jz);
    ioGroup.add(jack);
  });

  const smaBaseGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.15, 20);
  const antennaGeo = new THREE.CylinderGeometry(0.032, 0.048, 0.62, 20);
  [-1.05, 1.05].forEach((az) => {
    const smaBase = new THREE.Mesh(smaBaseGeo, matCopperGold);
    smaBase.position.set(0, 0.84, az);
    ioGroup.add(smaBase);

    const antennaMast = new THREE.Mesh(antennaGeo, matBeadBlastedDark);
    antennaMast.position.set(0, 1.18, az);
    ioGroup.add(antennaMast);
  });

  tagModuleGroup(ioGroup, "io");
  rigRoot.add(ioGroup);

  // Raycasting & Pointer Tracking
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const smoothPointer = new THREE.Vector2();
  let pointerDownPos = { x: 0, y: 0 };

  const getHitModuleId = (event: PointerEvent): ModuleId => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(
      Object.values(moduleGroups),
      true
    );

    if (intersects.length > 0) {
      let obj: THREE.Object3D | null = intersects[0].object;
      while (obj) {
        if (obj.userData?.moduleId) {
          return obj.userData.moduleId as HardwareModuleSpec["id"];
        }
        obj = obj.parent;
      }
    }
    return null;
  };

  const onPointerMove = (event: PointerEvent) => {
    const hitId = getHitModuleId(event);
    if (hitId !== hoveredId) {
      hoveredId = hitId;
      callbacks.onHoverModule(hitId);
      renderer.domElement.style.cursor = hitId ? "pointer" : "grab";
    }
  };

  const onPointerDown = (event: PointerEvent) => {
    pointerDownPos = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: PointerEvent) => {
    const dx = event.clientX - pointerDownPos.x;
    const dy = event.clientY - pointerDownPos.y;
    if (Math.hypot(dx, dy) < 6) {
      const hitId = getHitModuleId(event);
      if (hitId) {
        callbacks.onSelectModule(hitId);
      }
    }
  };

  renderer.domElement.addEventListener("pointermove", onPointerMove);
  renderer.domElement.addEventListener("pointerdown", onPointerDown);
  renderer.domElement.addEventListener("pointerup", onPointerUp);

  const handleResize = () => {
    const w = Math.max(container.clientWidth, 1);
    const h = Math.max(container.clientHeight, 1);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };

  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(container);
  window.addEventListener("resize", handleResize);

  // Render Loop
  let frameId = 0;
  let lastTime = performance.now();
  let elapsedTime = 0;
  const targetVec = new THREE.Vector3();
  const projVec = new THREE.Vector3();

  const phaseOffsets: Record<HardwareModuleSpec["id"], number> = {
    cpu: 0.0,
    pcie: 1.25,
    mem: 2.4,
    vrm: 3.6,
    io: 4.8,
  };

  const animate = () => {
    frameId = requestAnimationFrame(animate);
    const now = performance.now();
    const delta = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;
    elapsedTime += delta;

    smoothPointer.lerp(pointer, 1 - Math.pow(0.02, delta));

    if (!prefersReducedMotion) {
      const breathY = Math.sin(elapsedTime * 1.35) * 0.045;
      const targetRigRotY =
        Math.sin(elapsedTime * 0.55) * 0.035 + smoothPointer.x * 0.055;
      const targetRigRotX =
        Math.cos(elapsedTime * 0.7) * 0.015 - smoothPointer.y * 0.035;

      rigRoot.position.y = THREE.MathUtils.lerp(
        rigRoot.position.y,
        breathY,
        0.08
      );
      rigRoot.rotation.y = THREE.MathUtils.lerp(
        rigRoot.rotation.y,
        targetRigRotY,
        0.06
      );
      rigRoot.rotation.x = THREE.MathUtils.lerp(
        rigRoot.rotation.x,
        targetRigRotX,
        0.06
      );

      const fanSpeed =
        selectedId === "pcie" || hoveredId === "pcie" ? 15.5 : 4.2;
      gpuFans.forEach((fan, idx) => {
        fan.rotation.z -= delta * fanSpeed * (idx === 0 ? 1 : -1);
      });

      matOrangeLED.emissiveIntensity =
        1.6 + Math.sin(elapsedTime * 2.8) * 0.35;
    } else {
      rigRoot.position.y = 0;
      rigRoot.rotation.set(0, 0, 0);
      matOrangeLED.emissiveIntensity = 1.6;
    }

    const w = Math.max(container.clientWidth, 1);
    const h = Math.max(container.clientHeight, 1);
    const pinMarginX = w < 640 ? 68 : w < 1280 ? 96 : 160;
    const pinTopMargin = w < 640 ? 150 : 84;
    const pinBottomMargin = 92;

    (Object.keys(moduleGroups) as HardwareModuleSpec["id"][]).forEach((id) => {
      const group = moduleGroups[id];
      const base = restPositions[id];
      const exp = explodeOffsets[id];

      const isSelected = selectedId === id;
      const isHovered = hoveredId === id;

      targetVec.copy(base);
      if (isExploded) {
        targetVec.add(exp);
        if (!prefersReducedMotion) {
          targetVec.y +=
            Math.sin(elapsedTime * 2.1 + phaseOffsets[id]) * 0.045;
        }
      }
      if (isSelected) {
        targetVec.y += 0.38;
      } else if (isHovered) {
        targetVec.y += 0.18;
      }

      const targetRotZ =
        !prefersReducedMotion && (isHovered || isSelected)
          ? Math.sin(elapsedTime * 2.4 + phaseOffsets[id]) * 0.025
          : 0;
      const targetRotX = !prefersReducedMotion && isSelected ? 0.04 : 0;

      if (prefersReducedMotion) {
        group.position.copy(targetVec);
        group.rotation.set(0, 0, 0);
      } else {
        group.position.lerp(targetVec, 1 - Math.pow(0.0006, delta));
        group.rotation.z = THREE.MathUtils.lerp(
          group.rotation.z,
          targetRotZ,
          0.1
        );
        group.rotation.x = THREE.MathUtils.lerp(
          group.rotation.x,
          targetRotX,
          0.1
        );
      }

      const pinEl = callbacks.getPinElement(id);
      if (pinEl) {
        projVec.copy(pinLocalOffsets[id]);
        group.localToWorld(projVec);
        projVec.project(camera);

        const rawSx = (projVec.x * 0.5 + 0.5) * w;
        const sx = Math.max(pinMarginX, Math.min(w - pinMarginX, rawSx));
        const sy = Math.max(
          pinTopMargin,
          Math.min(h - pinBottomMargin, (-(projVec.y * 0.5) + 0.5) * h)
        );

        if (projVec.z > 1) {
          pinEl.style.opacity = "0";
          pinEl.style.visibility = "hidden";
          pinEl.style.pointerEvents = "none";
        } else {
          pinEl.style.opacity = "1";
          pinEl.style.visibility = "visible";
          pinEl.style.pointerEvents = "auto";
          pinEl.style.transform = `translate3d(${sx}px, ${sy}px, 0) translate(-50%, -100%)`;
        }
      }
    });

    if (cameraAnimating) {
      if (prefersReducedMotion) {
        camera.position.copy(desiredPose.position);
        controls.target.copy(desiredPose.target);
        cameraAnimating = false;
      } else {
        camera.position.lerp(desiredPose.position, 0.075);
        controls.target.lerp(desiredPose.target, 0.085);

        if (
          camera.position.distanceTo(desiredPose.position) < 0.025 &&
          controls.target.distanceTo(desiredPose.target) < 0.025
        ) {
          cameraAnimating = false;
        }
      }
    }

    controls.update();
    renderer.render(scene, camera);
  };

  animate();

  return {
    setSelectedModule(id) {
      selectedId = id;
      const targetPose = id ? MODULE_POSES[id] : DEFAULT_POSE;
      desiredPose.position.copy(targetPose.position);
      desiredPose.target.copy(targetPose.target);
      cameraAnimating = true;
    },
    setHoveredModule(id) {
      hoveredId = id;
    },
    setExploded(next) {
      isExploded = next;
    },
    nudgeCamera(deltaYaw, deltaPitch) {
      cameraAnimating = false;
      const offset = camera.position.clone().sub(controls.target);
      const spherical = new THREE.Spherical().setFromVector3(offset);
      spherical.theta += deltaYaw;
      spherical.phi = THREE.MathUtils.clamp(
        spherical.phi + deltaPitch,
        0.2,
        Math.PI / 2 - 0.06
      );
      offset.setFromSpherical(spherical);
      camera.position.copy(controls.target).add(offset);
      controls.update();
    },
    dispose() {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      motionQuery.removeEventListener("change", onMotionChange);
      controls.removeEventListener("start", onControlStart);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);

      const disposedGeometries = new Set<THREE.BufferGeometry>();
      const disposedMaterials = new Set<THREE.Material>();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry && !disposedGeometries.has(mesh.geometry)) {
          mesh.geometry.dispose();
          disposedGeometries.add(mesh.geometry);
        }
        if (mesh.material) {
          const mats = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];
          mats.forEach((m) => {
            if (!disposedMaterials.has(m)) {
              m.dispose();
              disposedMaterials.add(m);
            }
          });
        }
      });

      envRenderTarget.dispose();
      pmremGenerator.dispose();
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    },
  };
}
