export const ONE_DAY = 24 * 3600e3;

export function setImmediatePromise() {
    return new Promise<void>((resolve) => {
        setImmediate(() => resolve())
    })
}