import {v4 as uuidv4} from "uuid"
import UUIDInterface from "../../aplication/service/UUIDInterface"

export default class UUIDService implements UUIDInterface {
    get_uuid(): string {
        return uuidv4();
    }
}