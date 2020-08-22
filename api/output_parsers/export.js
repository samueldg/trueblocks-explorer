module.exports = {
    getProgress(string) {
        const match = string.match(/\:([A-Za-z|\s]+)([\d]+) of ([\d]+)/);
        if (match) {
            let [, op, done, total] = match;
            op = string.trim(op);
            return { op, done, total };
        }
        return;
    }
};
