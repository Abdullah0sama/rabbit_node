

export function getMandatory(name: string): string {
    const value = process.env[name]
    if(!value) throw Error(`Environment variable '${name}' doesn't exist`)
    return value
}


export function getMandatoryInt(name: string): number {
    return Number.parseInt(getMandatory(name))
}