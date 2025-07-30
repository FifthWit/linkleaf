interface LinkSchema {
    name: string;
    badges: {
        name: string;
        link: string;
        image: string;
    }[];
    links: {
        url: string;
        name: string;
        image: string | null;
    }[];
}