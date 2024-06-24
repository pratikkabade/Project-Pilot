export function GetItem(array: string) {
    return JSON.parse(localStorage.getItem(array) || '[]');
}

export function SetItem(array: string, item: any) {
    localStorage.setItem(array, JSON.stringify(item));
}