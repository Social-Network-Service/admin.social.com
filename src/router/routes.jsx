import React from 'react';
import components from "./components";
import ProLayout from "@/layout/ProLayout";
import {Navigate} from "react-router-dom";

export let routes = []

export let routeMap = {}

export let routeList = []

export function generateRoutes(userInfo, userMenus) {
    // 生成动态路由配置
    const dynamicRoutes = generateRoutesFromMenus(userMenus);

    routes = routes.concat([
        // 公共路由
        {
            path: '/login',
            element: React.createElement(components['/login']),
        },
        {
            path: '/logout',
            element: React.createElement(components['/logout']),
        },
        {
            path: '/',
            element: <ProLayout userInfo={userInfo} userMenus={userMenus}/>,
            children: [
                {
                    path: '',
                    element: <Navigate to="/dashboard" replace/>,
                },
                {
                    path: 'dashboard',
                    element: React.createElement(components['/dashboard']),
                },
                {
                    path: 'user_center',
                    element: React.createElement(components['/user_center']),
                },
                // 添加动态生成的路由
                ...dynamicRoutes,
                // 404 路由放在最后
                {
                    path: '*',
                    element: React.createElement(components['/404']),
                }
            ]
        }
    ]);
}

// 递归处理菜单数据，生成路由配置
export const generateRoutesFromMenus = (menus) => {
    if (!menus) return [];

    const routes = menus.map(menu => {
        // 如果没有routes，说明是菜单组，继续处理子菜单
        if (menu.routes) {
            return generateRoutesFromMenus(menu.routes);
        }

        // 如果有路径，创建路由配置
        if (menu.path) {
            const element = components[menu.path]
                ? React.createElement(components[menu.path])
                :
                <span>未找到路径{menu.path}对应的页面组件，请检查router/components.jsx模块是否配置了对应的组件。</span>
            return {
                path: menu.path,
                element
            }
        }

        return null;
    })

    return routes.filter(Boolean).flat(Infinity);
};

