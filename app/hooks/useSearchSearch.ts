import { create } from "zustand"

interface useSearchSearchStore {
    search: string
    sort: string
    reset: boolean

    setSearch: (value: string) => void
    setSort: (value: string) => void
    onReset: () => void
}

export const useSearchSearch = create<useSearchSearchStore>((set) => ({
    search: "",
    sort: "",
    reset: false,

    setSearch: (value) => set({ search: value }),
    setSort: (value) => set({ sort: value }),
    onReset: () => set((prevState) => ({ reset: !prevState.reset })),
}))
