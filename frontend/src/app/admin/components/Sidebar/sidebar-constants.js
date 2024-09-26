// constants.js
export const MENU_ITEMS = [
    // {
    //     id: 1,
    //     icon: '/assets/icons/dashboard.svg',
    //     label: 'Dashboard',
    //     href: '#',
    // },
    {
        id: 2,
        icon: '/assets/icons/movies.png',
        label: 'Movies',
        href: '/admin/movies',
    },
    {
        id: 3,
        icon: '/assets/icons/cinemas.png',
        label: 'Cinemas',
        href: '/admin/cinemas',
    },
    // {
    //     id: 4,
    //     icon: '/assets/icons/mailbox.svg',
    //     label: 'Shows',
    //     href: '#',
    // },
    // {
    //     id: 5,
    //     icon: '/assets/icons/airplane_ticket.svg',
    //     label: 'Bookings',
    //     href: '#',
    // },
    // {
    //     id: 6,
    //     icon: '/assets/icons/airplane_ticket.svg',
    //     label: 'Customers',
    //     href: '#',
    // },
    {
        id: 6,
        icon: '/assets/icons/promotion.png',
        label: 'Promotions',
        href: '/admin/promotions',
    },
];

export const BOTTOM_MENU_ITEMS = [
    {
        id: 1,
        icon: '/assets/icons/help.svg',
        label: 'Help Center',
        href: '#',
        className: 'db',
        extraIcon: '/icons/more_vert.svg',
    },
];

export const PROFILE_INFO = {
    name: 'Admin',
    email: 'Jacobejames@gmail.com',
    profileIcon: '/assets/icons/user.png',
    extraIcon: '/assets/icons/logout.png',
};
