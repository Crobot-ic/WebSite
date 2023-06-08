const replaceAll: (initString: string, search: any, replace: string) => string = (initString: string, search: any, replace: string): string => {
    let str = initString;
    while (true) {
        const lastStr = str;
        str = str.replace(search, replace);
        if(lastStr == str) return str;
    }
}

export default replaceAll;