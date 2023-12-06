import { create } from "zustand"

interface useArticlesSearchStore {
    search: string
    sort: string
    reset: boolean

    setSearch: (value: string) => void
    setSort: (value: string) => void
    onReset: () => void
}

export const useArticlesSearch = create<useArticlesSearchStore>((set) => ({
    search: "",
    sort: "",
    reset: false,
    setSearch: (value) => set({ search: value }),
    setSort: (value) => set({ sort: value }),
    onReset: () => set((prevState) => ({ reset: !prevState.reset })),
}))
