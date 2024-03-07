export function shortestJobFirst(data) {
    const dataFirst = [...data];
    dataFirst.sort((a, b) => {
        if (a.priority.id !== b.priority.id) {
            return a.priority.id - b.priority.id;
        }
        return a.duration - b.duration;
    })
    return dataFirst;
}
