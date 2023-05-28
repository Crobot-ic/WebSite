import Mail from "./Mail";

const Setup: () => Promise<void> = async (): Promise<void> => {
    await Mail.sync();
};

export default Setup;