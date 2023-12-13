import {HistoryEditor} from "slate-history";
import {ReactEditor} from "slate-react";
import {BaseEditor, Descendant} from "slate";

export type AreaElement = {
    type: 'area'
    children: Descendant[]
}

export type InputElement = {
    type: 'input'
    children: Descendant[]
}

export type PorketEditor = BaseEditor & ReactEditor & HistoryEditor

export type PorketElement = AreaElement | InputElement

declare module 'slate' {
    interface PorketTypes {
        Editor: PorketEditor
        Element: PorketElement
    }
}