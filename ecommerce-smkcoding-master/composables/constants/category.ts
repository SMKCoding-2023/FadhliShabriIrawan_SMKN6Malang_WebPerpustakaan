export const category: Category[] = [
  {
    id: 1,
    name: "Adventure",
  },
  {
    id: 2,
    name: "Horror",
  },
  {
    id: 3,
    name: "Romantis",
  },
  {
    id: 4,
    name: "Comedy",
  },
]

export interface Category {
  id? : number,
  name?: string,
}