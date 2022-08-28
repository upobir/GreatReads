export function timestampToString(timestamp){
    const createdAt = new Date(timestamp);
    const createdDate = createdAt.toLocaleDateString('en-US');
    const createdTime = createdAt.toLocaleTimeString('en-US');
    return `${createdDate} at ${createdTime}`
} 