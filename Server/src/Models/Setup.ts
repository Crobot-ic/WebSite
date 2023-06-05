import Mail from "./Mail";
import Project from "./Project";

const Setup: () => Promise<void> = async (): Promise<void> => {
    await Mail.sync();
    await Project.sync();
};

export default Setup;