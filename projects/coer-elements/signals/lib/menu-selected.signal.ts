import { signal } from "@angular/core";
import { IMenuSelected } from "coer-elements/interfaces";
export const menuSelectedSIGNAL = signal<IMenuSelected | null>(null);