export declare type VTNMenuItem = {
    label: string
    link?: string
    action?: string
    query?: Record<string, string>
    submenu?: Array<VTNMenuItem>
}

export declare type VTNMenu = {
    home: VTNMenuItem
    vehicles: VTNMenuItem
    services: VTNMenuItem
    community: VTNMenuItem
    sell: VTNMenuItem
}

export declare type VTNUserMenu = {
    userSearchHistory: VTNMenuItem,
    favorites: VTNMenuItem,
    userPublications: VTNMenuItem,
    sellAVehicle: VTNMenuItem,
    profile: VTNMenuItem,
    closeSession: VTNMenuItem,
}
