
export default interface ValidatorFields {
    validate(fields: Record<string, any>): string[]
}