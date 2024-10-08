export interface Mii {
    entry_id?: number;
    artisan_id: number;
    initials?: string;
    skill?: number;
    nickname?: string;
    gender?: 1 | 2;
    country_id: number;
    mii_data: string;
    likes: number;
    perm_likes?: number;
    ranking?: number;
    contest_id?: number;
    artisan?: Artisan;
    wii_number?: bigint;
    artisan_name?: string;
    artisan_is_master?: boolean;
}

export interface Contest {
    contest_id: number;
    has_thumbnail: boolean;
    english_name: string;
    status: string;
    open_time: string;
    close_time: string;
    has_souvenir: boolean;
}

export interface Artisan {
    name: string;
    country_id: number;
    wii_number: bigint;
    mii_data: string;
    number_of_posts: any;
    total_likes: number;
    is_master: boolean;
    last_post: string;
    artisan_id?: number;
}


