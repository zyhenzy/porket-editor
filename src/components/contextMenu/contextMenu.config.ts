export interface IMenu {
    title:string,
    value:string
}

export const menus:IMenu[] = [
    {title:'插入区域',value:'add-area'},
    {title:'插入文本控件',value:'add-input'},
    {title:'S',value:'italic'},
    {title:'I',value:'underline'},
    {title:'U',value:'code'}
]

