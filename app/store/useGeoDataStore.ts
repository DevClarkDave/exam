import { create } from "zustand"

const useGeoDataStore = create((set: any, get: any) => ({
	geo: [],
	ip: '',
	error: '',

	setIp: (val: string) => set((state: any) => ({ip: val})),

	setError: (val: string) => set((state: any) => ({error: val})),

	setGeo: (val: any[]) => set((state: any) => ({geo: val})),

	fetchData: (endpoint: string) => {
		fetch(endpoint)
			.then(res => res.json())
			.then(data => {
				
				if ( data?.status === 404 ) {
					get().setError(data?.error?.message)
					return
				}
				
				get().setError('')
				get().setGeo([])
				let newVal: any = []
				
				Object.keys(data).forEach((k: string, v: any) => {
					console.log(data[k])
					const obj = {
						key: k,
						value: data[k]
					}

					newVal.push(obj)
				})
				get().setGeo(newVal)
				return
			})
			.catch(() => get().setError('Invalid IP Address'))
	},

	fetchFromUser: () => {
		get().fetchData('https://ipinfo.io/geo')
	},

	fetchFromInput: (input: string) => {
		get().fetchData(`https://ipinfo.io/${input}/geo`)
	}
}))

export default useGeoDataStore