import Events from "./Events";
import Mail from "./Mail";
import Project from "./Project";

const Setup: () => Promise<void> = async (): Promise<void> => {
    await Mail.sync();
    await Project.sync();
    await Events.sync();
};

export default Setup;