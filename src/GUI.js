// Unfinished!

const configGui = gui.addFolder("Settings");
Object.keys(configuration).forEach((setting) => {
  configGui
    .add(configuration, setting)
    .listen()
    .onChange(() => {
      robotStore.dispatch(
        "UPDATE_ROBOT_CONFIG",
        Object.values(configuration)
      );
    });
});

const jointLimitFolder = anglesGui.addFolder("Joint Boundaries");
Object.entries(jointLimitsDeg).forEach(([joint, limits]) => {
  const jointSubFolder = jointLimitFolder.addFolder(`Joint ${joint}`);
  Object.entries(limits).forEach(([limitType, value], index) => {
    jointSubFolder
      .add(jointLimitsDeg[joint], index)
      .name(limitType === "0" ? "Minimum" : "Maximum")
      .min(-360)
      .max(360)
      .step(1)
      .onChange(() => {
        const limitsInRadians = {};
        limitsInRadians[joint] = [
          jointLimitsDeg[joint][0] * DEG_TO_RAD,
          jointLimitsDeg[joint][1] * DEG_TO_RAD,
        ];
        robotStore.dispatch("UPDATE_JOINT_LIMITS", limitsInRadians);
      });
  });
});
