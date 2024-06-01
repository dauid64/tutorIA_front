import { z } from "zod"

export type UsuarioForCreate = {
    username: String | undefined ,
    pwd: String | undefined
}