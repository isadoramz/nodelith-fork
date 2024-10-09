import { AuthPrincipal } from "@nodelith/context";
import { Request } from "express";

export type ControllerRequest = Request & {
  principal?: AuthPrincipal
}