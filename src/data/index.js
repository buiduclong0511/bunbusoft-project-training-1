export const data = [
  {
    id: 1,
    name: "air",
    recipe: [1],
  },
  {
    id: 2,
    name: "earth",
    recipe: [2],
  },
  {
    id: 3,
    name: "fire",
    recipe: [3],
  },
  {
    id: 4,
    name: "water",
    recipe: [4],
  },
  {
    id: 5,
    name: "energy",
    recipe: [1, 3],
  },
  {
    id: 6,
    name: "steam",
    recipe: [3, 4],
  },
  {
    id: 8,
    name: "dust",
    recipe: [1, 2],
  },
  {
    id: 9,
    name: "gunpowder",
    recipe: [3, 8],
  },
  {
    id: 10,
    name: "explosion",
    recipe: [3, 9],
  },
  {
    id: 11,
    name: "earthquake",
    recipe: [2, 5],
  },
  {
    id: 12,
    name: "lava",
    recipe: [2, 3],
  },
  {
    id: 13,
    name: "volcano",
    recipe: [2, 12],
  },
];

export * from "./menuModels";
