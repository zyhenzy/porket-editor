export interface IMenu {
    title:string,
    format:string
}

export const menus:IMenu[] = [
    {title:'B',format:'bold'},
    {title:'S',format:'italic'},
    {title:'I',format:'underline'},
    {title:'U',format:'code'}
]

