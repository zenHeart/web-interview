// 创建日志记录器
export const createLogger = (prefix) => {
    return (message) => {
        const timestamp = new Date().toISOString();
        const logMessage = `[${prefix}] ${message} (${timestamp})`;
        console.log(logMessage);
        
        // 同时在页面上显示
        const output = document.getElementById('output');
        if (output) {
            const line = document.createElement('div');
            line.textContent = logMessage;
            output.appendChild(line);
        }
    };
};

// 基础数学运算
export const add = (a, b) => {
    return a + b;
};
