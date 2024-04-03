// Not sure if this is correct yet, check state transfer
store.action("UPDATE_TARGET_DETAILS", (state, updatedData) => {
  // Check if target tracking is enabled
  if (state.enableTracking) {
    store.getStore("RobotMechanism").dispatch("SET_NEW_ROBOT_TARGET", {
      newCoords: {
        ...state.coords, // Enables partial updates for coordinates
        ...updatedData.coords,
      },
      newAngles: { ...state.angles, ...updatedData.angles },
    });
  }
  return {
    ...state,
    coords: {
      ...state.coords,
      ...updatedData.coords,
    },
    angles: { ...state.angles, ...updatedData.angles },
  };
});

function redefineTarget(coords, angles) {
  store.dispatch("UPDATE_TARGET_DETAILS", {
    coords: {
      x: coords.x,
      y: coords.y,
      z: coords.z,
    },
    angles: {
      x: angles.x,
      y: angles.y,
      z: angles.z,
    },
  });
}

store.action("TOGGLE_TARGET_TRACKING", (state, trackingStatus) => {
  return {
    ...state,
    enableTracking: trackingStatus,
  };
});

function switchTrackingMode(trackingStatus) {
  store.dispatch("TOGGLE_TARGET_TRACKING", trackingStatus);
}
