import { create } from "zustand"

interface useArticlesSearchStore {
    search: string
    sort: string

    setSearch: (value: string) => void
    setSort: (value: string) => void
}

export const useArticlesSearch = create<useArticlesSearchStore>((set) => ({
    search: "",
    sort: "",
    setSearch: (value) => set({ search: value }),
    setSort: (value) => set({ sort: value }),
}))
