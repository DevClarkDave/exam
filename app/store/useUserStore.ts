import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'

const useUserStore = create(
    persist(
        (set, get) => ({
            user: {},
            token: '',
            error: '',
            
            setError: (val: string) => set((state: any) => ({error: val})),
            setUser: (val: string) => set((state: any) => ({user: val})),
            setToken: (val: string) => set((state: any) => ({token: val})),
        }),
        {
            name: 'user-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    )
)

export default useUserStore