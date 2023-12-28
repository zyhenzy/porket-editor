export interface IMenu {
    title:string,
    value:string,
    children?:IMenu[]
}

export const menus:IMenu[] = [
    {title:'插入区域',value:'add-area'},
    {title:'插入文本控件',value:'add-input'},
    {title:'主菜单2',value:'main2',children:[
            {title:'子菜单1',value:'zi12'},
            {title:'子菜单2',value:'zi22'},
        ]},
    {title:'S',value:'italic'},
    {title:'I',value:'underline'},
    {title:'U',value:'code'},
    {title:'测试函数',value:'test'},
    {title:'主菜单',value:'main',children:[
        {title:'子菜单1',value:'zi1'},
        {title:'子菜单2',value:'zi2'},
    ]},
]

