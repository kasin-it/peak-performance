import { create } from "zustand"

interface useExercisesSearchStore {
    search: string
    muscle: string
    skillLevel: string
    exerciseType: string
    sort: string
    reset: boolean

    setSearch: (value: string) => void
    setMuscle: (value: string) => void
    setSkillLevel: (value: string) => void
    setExerciseType: (value: string) => void
    setSort: (value: string) => void
    onReset: () => void
}

export const useExercisesSearch = create<useExercisesSearchStore>((set) => ({
    search: "",
    muscle: "",
    skillLevel: "",
    exerciseType: "",
    sort: "",
    reset: false,
    setSearch: (value) => set({ search: value }),
    setMuscle: (value) => set({ muscle: value }),
    setSkillLevel: (value) => set({ skillLevel: value }),
    setExerciseType: (value) => set({ exerciseType: value }),
    setSort: (value) => set({ sort: value }),
    onReset: () => set((prevState) => ({ reset: !prevState.reset })),
}))
