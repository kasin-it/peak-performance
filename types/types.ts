export interface Comment {
    id: string
    user_id: string
    created_at: string
    comment: string
    slug: string
}

export interface Exercise {
    id: string
    name?: string
    type?: string
    muscle?: string
    equipment?: string
    difficulty?: string
    instructions?: string
    repetitions?: number
    sets?: number
}

export interface Workout {
    id: string
    name: string
    desc: string
    exercises?: string[]
}
