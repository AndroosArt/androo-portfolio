export interface Artwork {
    id: string;
    title: string;
    category: string;
    price: number;
    image: string;
    orientation: 'portrait' | 'landscape' | 'square';
}

export const artworks: Artwork[] = [
    {
        id: '1',
        title: 'Neon Dystopia',
        category: 'Cyberpunk',
        price: 450,
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
        orientation: 'portrait',
    },
    {
        id: '2',
        title: 'Urban Decay',
        category: 'Street Art',
        price: 320,
        image: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=800&q=80',
        orientation: 'landscape',
    },
    {
        id: '3',
        title: 'Plastic Soul',
        category: 'Pop Art',
        price: 800,
        image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80',
        orientation: 'square',
    },
    {
        id: '4',
        title: 'Midnight Vandal',
        category: 'Graffiti',
        price: 290,
        image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=800&q=80',
        orientation: 'portrait',
    },
    {
        id: '5',
        title: 'Color Riot',
        category: 'Abstract',
        price: 550,
        image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=800&q=80',
        orientation: 'landscape',
    },
    {
        id: '6',
        title: 'Future Shock',
        category: 'Digital',
        price: 400,
        image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
        orientation: 'square',
    }
];
