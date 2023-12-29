export interface IMenu {
    title: string,
    value: string,
    line?:boolean // 特殊菜单类型
    children?: IMenu[]
}

export const menus: IMenu[] = [
    {title: '复制', value: 'fuzhi'},
    {title: '粘贴', value: 'affix'},
    {title: '在下方添加文本', value: 'add-bottom'},
    {title: '插入图片', value: 'add-image'},
    {title: '添加批注', value: 'add-comment'},
    {title: '添加分页符', value: 'add-page-break'},
    {title: '添加分割线', value: 'add-line'},
    {title: '撤销', value: 'undo'},
    {title: '恢复', value: 'redo',line:true},
    {
        title: '格式', value: 'format', children: [
            {title: '清除格式', value: 'clear-format'},
            {title: '删除当前行', value: 'del-current-line'},
            {title: '加粗', value: 'bold'},
            {title: '斜体', value: 'italic'},
            {title: '下划线', value: 'underline'},
            {title: '上标', value: 'sup'},
            {title: '下标', value: 'sub'},
        ]
    },
    {title: '颜色', value: 'color',line:true},
    {title: '操作日志', value: 'logs'},
    {title: '下载日志文件', value: 'down-logs'},
    {title: '测试函数', value: 'test'},
    {title: '插入区域', value: 'add-area'},
    {title: '插入文本控件', value: 'add-input'},
    {
        title: '主菜单', value: 'main', children: [
            {title: '子菜单1', value: 'zi1'},
            {title: '子菜单2', value: 'zi2'},
            {title: '子菜单3', value: 'zi3'},
            {title: '子菜单4', value: 'zi4'},
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

