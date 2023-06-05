const sleepMs: (delay: number) => Promise<void> = (delay: number): Promise<void> => {
    return new Promise (resolve => setTimeout(resolve, delay));
}
export default sleepMs;