export interface IMenu {
    title: string,
    value: string,
    type?:string // 特殊菜单类型
    children?: IMenu[]
}

export const menus: IMenu[] = [
    {title: '插入区域', value: 'add-area'},
    {title: '插入文本控件', value: 'add-input',type:'line'},
    {title: '颜色', value: 'color',type:'color'},
    {
        title: '主菜单2', value: 'main2', children: [
            {title: '子菜单1', value: 'zi12'},
            {title: '子菜单2', value: 'zi22'},
        ]
    },
    {title: 'S', value: 'italic'},
    {title: 'I', value: 'underline'},
    {title: 'U', value: 'code'},
    {title: '测试函数', value: 'test'},
    {
        title: '主菜单', value: 'main', children: [
            {title: '子菜单1', value: 'zi1'},
            {title: '子菜单2', value: 'zi2'},
        ]
    },
]

// 预设字体颜色
export const colorFont = [
    {
        "label": "浅灰色",
        "value": "#E9EAE9"
    },
    {
        "label": "深灰色",
        "value": "#C4C6CB"
    },
    {
        "label": "红色",
        "value": "#F1776D"
    },
    {
        "label": "橙色",
        "value": "#F3B137"
    },
    {
        "label": "黄色",
        "value": "#FEED00"
    },
    {
        "label": "绿色",
        "value": "#7FD954"
    },
    {
        "label": "蓝色",
        "value": "#B1C4FF"
    },
    {
        "label": "紫色",
        "value": "#C9B2FF"
    }
]

// 预设背景颜色
export const colorBack = [
    {
        "label": "浅灰色",
        "value": "#E9EAE9"
    },
    {
        "label": "深灰色",
        "value": "#C4C6CB"
    },
    {
        "label": "红色",
        "value": "#F1776D"
    },
    {
        "label": "橙色",
        "value": "#F3B137"
    },
    {
        "label": "黄色",
        "value": "#FEED00"
    },
    {
        "label": "绿色",
        "value": "#7FD954"
    },
    {
        "label": "蓝色",
        "value": "#B1C4FF"
    },
    {
        "label": "紫色",
        "value": "#C9B2FF"
    }
]

