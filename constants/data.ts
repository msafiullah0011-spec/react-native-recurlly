import { icons } from './icons';

export const tabs =[
    {name: 'index' ,title:'Home' ,icon:icons.home},
    {name: 'subscriptions' ,title:'Subscriptions' ,icon:icons.wallet},
    {name: 'insights' ,title:'Insights' ,icon:icons.activity},
    {name: 'settings' ,title:'Settings' ,icon:icons.setting},
];

export const colors = {
    primary: '#081126',
} as const;

export const tabBar = {
    height: 60,
    horizontalInset: 16,
    radius: 32,
} as const;