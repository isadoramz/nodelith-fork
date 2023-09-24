import { AuthPrincipal } from "@core-fusion/context";
import { Request } from "express";


export type ControllerRequest = Request & {
  principal?: AuthPrincipal
}