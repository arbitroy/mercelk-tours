// ============= CONSTANTS =============
export const COLORS = {
    sage: '#CDCA96',
    darkRed: '#8B0000',
    cream: '#F5E6D3',
    brown: '#3d2817',
    white: '#ffffff'
};
export const MENU_ITEMS = [
    { label: 'Home', link: '#hero' },
    { label: 'About', link: '#about' },
    { label: 'Tours', link: '#tours' },
    { label: 'Gallery', link: '#gallery' },
    { label: 'Contact', link: '#contact' }
];
export const SOCIAL_ITEMS = [
    { label: 'Instagram', link: 'https://www.instagram.com/mercelktours/' },
    { label: 'WhatsApp', link: 'https://wa.me/254748937141' },
    { label: 'Community', link: 'https://community-si.com/en/public/profile/mercelk-tours' }
];
export const MASONRY_IMAGES = [
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
    'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800',
    'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800',
    'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800',
    'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800',
    'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=800',
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
    'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800'
];
export const ROAD_TOURS = [
    {
        name: 'Savannah Symphony',
        subtitle: 'Bush-Beach Adventure',
        days: '9 days, 8 nights',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
        itinerary: 'Nairobi → Maasai Mara → Lake Naivasha → Amboseli → Tsavo West → Taita Hills → Coast',
        type: 'Safari by road',
        operates: 'Daily on Request',
        starts: 'Nairobi',
        ends: 'Mombasa',
        detailedItinerary: [
            { day: 1, location: 'Nairobi', activities: 'Arrival at JKIA. Overnight in Nairobi.' },
            { day: 2, location: 'Maasai Mara', activities: 'Drive to Maasai Mara. Afternoon game drive in Kenya\'s premier wildlife reserve.' },
            { day: 3, location: 'Maasai Mara', activities: 'Full-day exploration of Maasai Mara. Optional hot air balloon safari at dawn.' },
            { day: 4, location: 'Lake Naivasha', activities: 'Morning drive to Lake Naivasha. Boat ride and walking safari at Crescent Island.' },
            { day: 5, location: 'Amboseli', activities: 'Drive to Amboseli National Park with stunning views of Mt. Kilimanjaro.' },
            { day: 6, location: 'Tsavo West', activities: 'Transfer to Tsavo West. Visit Mzima Springs and explore volcanic landscapes.' },
            { day: 7, location: 'Taita Hills', activities: 'Drive to Taita Hills Sanctuary. Game drive in this beautiful wildlife corridor.' },
            { day: 8, location: 'Coast', activities: 'Transfer to the coast. Relax on pristine beaches.' },
            { day: 9, location: 'Coast', activities: 'Beach relaxation, optional water sports, and departure.' }
        ]
    },
    {
        name: 'Peaks & Plains',
        subtitle: 'Kenya in Focus',
        days: '7 days, 6 nights',
        image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800',
        itinerary: 'Nairobi → Nyeri → Nanyuki → Meru → Samburu',
        type: 'Safari by road',
        operates: 'Daily on Request',
        starts: 'Nairobi',
        ends: 'Nairobi',
        detailedItinerary: [
            { day: 1, location: 'Nairobi', activities: 'Arrival at JKIA. Overnight in Nairobi.' },
            { day: 2, location: 'Nyeri', activities: 'Drive to Nyeri. Visit Aberdare National Park with waterfalls and forest game viewing.' },
            { day: 3, location: 'Nanyuki', activities: 'Transfer to Nanyuki at the foot of Mt. Kenya. Visit Equator line and Ol Pejeta Conservancy.' },
            { day: 4, location: 'Meru', activities: 'Drive to Meru. Afternoon game drive in Meru National Park, land of Elsa the lion.' },
            { day: 5, location: 'Samburu', activities: 'Morning drive to Samburu. Afternoon game drive in this unique arid landscape.' },
            { day: 6, location: 'Samburu', activities: 'Full-day exploration. Spot the "Samburu Special Five": Grevy\'s zebra, reticulated giraffe, Somali ostrich, Beisa oryx, and gerenuk.' },
            { day: 7, location: 'Nairobi', activities: 'Return to Nairobi. Departure or optional overnight depending on schedule.' }
        ]
    },
    {
        name: 'Rift Valley Explorer',
        subtitle: 'Classic Safari',
        days: '5 days, 4 nights',
        image: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800',
        itinerary: 'Nairobi → Maasai Mara → Lake Nakuru → Nairobi',
        type: 'Safari by road',
        operates: 'Daily on Request',
        starts: 'Nairobi',
        ends: 'Nairobi',
        detailedItinerary: [
            { day: 1, location: 'Nairobi', activities: 'Arrival and transfer to hotel. City tour optional.' },
            { day: 2, location: 'Maasai Mara', activities: 'Drive through the Great Rift Valley to Maasai Mara. Afternoon game drive.' },
            { day: 3, location: 'Maasai Mara', activities: 'Full-day game drives in the Mara. Search for the Big Five and witness the wildebeest migration (seasonal).' },
            { day: 4, location: 'Lake Nakuru/Elementaita', activities: 'Drive to Lake Nakuru or Elementaita. Game drive to see flamingos, rhinos, and tree-climbing lions.' },
            { day: 5, location: 'Nairobi', activities: 'Morning game drive, then return to Nairobi for departure.' }
        ]
    },
    {
        name: 'Kenya Classic',
        subtitle: 'Essential Kenya',
        days: '6 days, 5 nights',
        image: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800',
        itinerary: 'Nairobi → Maasai Mara → Lake Nakuru → Amboseli',
        type: 'Safari by road',
        operates: 'Daily on Request',
        starts: 'Nairobi',
        ends: 'Nairobi',
        detailedItinerary: [
            { day: 1, location: 'Nairobi', activities: 'Arrival at JKIA. Overnight in Nairobi.' },
            { day: 2, location: 'Maasai Mara', activities: 'Scenic drive to Maasai Mara. Evening game drive.' },
            { day: 3, location: 'Maasai Mara', activities: 'Full-day game viewing in the Mara. Optional cultural visit to Maasai village.' },
            { day: 4, location: 'Lake Nakuru/Elementaita', activities: 'Transfer to Lake Nakuru. Afternoon game drive around the lake.' },
            { day: 5, location: 'Amboseli', activities: 'Drive to Amboseli National Park. Game drive with views of Mt. Kilimanjaro.' },
            { day: 6, location: 'Amboseli', activities: 'Morning game drive, then return to Nairobi.' },
            { day: 7, location: 'Nairobi (Depart)', activities: 'Transfer to airport for departure.' }
        ]
    }
];
export const AIR_TOURS = [
    {
        name: 'Ethereal Kenya',
        subtitle: 'Luxury Air Safari',
        days: '6 days, 5 nights',
        image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800',
        itinerary: 'Nairobi → Amboseli → Samburu → Maasai Mara (by air)',
        type: 'Safari by air',
        operates: 'Daily on Request',
        starts: 'Nairobi',
        ends: 'Nairobi',
        detailedItinerary: [
            { day: 1, location: 'Nairobi', activities: 'Arrival and overnight in Nairobi.' },
            { day: 2, location: 'Amboseli', activities: 'Flight to Amboseli. Game drives with spectacular views of Mt. Kilimanjaro.' },
            { day: 3, location: 'Amboseli', activities: 'Full-day exploring Amboseli\'s elephant herds and diverse wildlife.' },
            { day: 4, location: 'Samburu', activities: 'Flight to Samburu. Game drive in this unique northern ecosystem.' },
            { day: 5, location: 'Samburu', activities: 'Full-day game viewing. Spot rare species found only in northern Kenya.' },
            { day: 6, location: 'Maasai Mara', activities: 'Flight to Maasai Mara. Afternoon game drive in Kenya\'s most famous reserve.' },
            { day: 7, location: 'Maasai Mara', activities: 'Morning game drive, then flight back to Nairobi for departure.' }
        ]
    }
];
export const EXCURSIONS = [
    { name: 'Hot Air Ballooning', location: 'Maasai Mara & Amboseli', image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600' },
    { name: 'Out of Africa Experience', location: 'Karen Blixen & Giraffe Centre', image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=600' },
    { name: 'Nairobi Museums', location: 'Cultural Heritage Tours', image: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=600' },
    { name: 'Nairobi National Park', location: 'Wildlife in the City', image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600' }
];
export const GALLERY_IMAGES = [
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200',
    'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=1200',
    'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1200',
    'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=1200',
    'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200',
    'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=1200',
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200',
    'https://images.unsplash.com/photo-1549366021-9f761d450615?w=1200',
    'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=1200',
    'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200'
];
export const CORE_VALUES = [
    { title: 'Authenticity', desc: 'Genuine experiences showcasing Kenya\'s unique heritage', color: COLORS.darkRed },
    { title: 'Sustainability', desc: 'Protecting environment & supporting communities', color: '#A0522D' },
    { title: 'Customer-Centric', desc: 'Prioritizing traveler satisfaction & safety', color: '#8B4513' },
    { title: 'Innovation', desc: 'Unique and memorable experiences', color: '#D2691E' }
];
