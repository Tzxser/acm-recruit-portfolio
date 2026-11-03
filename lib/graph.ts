export type GraphNode = { id: string; x: number; y: number }
export type GraphEdge = readonly [number, number]
export type BfsStep = { current: number; visited: number[]; queue: number[]; added: number[]; path: number[]; found: boolean }

export function runBfs(nodes: GraphNode[], edges: GraphEdge[], start: number, target: number): BfsStep[] {
  const adjacent = nodes.map(() => [] as number[])
  for (const [a, b] of edges) { adjacent[a].push(b); adjacent[b].push(a) }
  const queue = [start]
  const discovered = new Set([start])
  const visited: number[] = []
  const parents = new Map<number, number>()
  const steps: BfsStep[] = []
  while (queue.length) {
    const current = queue.shift()!
    visited.push(current)
    const added: number[] = []
    const found = current === target
    if (!found) for (const next of adjacent[current]) {
      if (!discovered.has(next)) {
        discovered.add(next); parents.set(next, current); queue.push(next); added.push(next)
      }
    }
    const path: number[] = []
    if (found) {
      let node: number | undefined = target
      while (node !== undefined) { path.unshift(node); node = parents.get(node) }
    }
    steps.push({ current, visited: [...visited], queue: [...queue], added, path, found })
    if (found) break
  }
  return steps
}

export const arenaNodes: GraphNode[] = [
  { id: 'A', x: 65, y: 190 }, { id: 'B', x: 170, y: 90 },
  { id: 'C', x: 170, y: 290 }, { id: 'D', x: 270, y: 175 },
  { id: 'E', x: 290, y: 45 }, { id: 'F', x: 320, y: 315 },
  { id: 'G', x: 385, y: 110 }, { id: 'H', x: 420, y: 245 },
  { id: 'I', x: 500, y: 55 }, { id: 'J', x: 525, y: 175 },
  { id: 'K', x: 545, y: 300 }, { id: 'L', x: 630, y: 190 },
]
export const arenaEdges: GraphEdge[] = [[0,1],[0,2],[1,3],[1,4],[2,3],[2,5],[3,6],[3,7],[4,6],[5,7],[6,8],[6,9],[7,9],[7,10],[8,9],[9,11],[10,11]]
export const arenaSteps = runBfs(arenaNodes, arenaEdges, 0, 11)

export const heroNodes: GraphNode[] = [
  [64,210],[129,127],[134,298],[215,197],[204,56],[232,346],[318,108],
  [325,252],[358,400],[428,59],[423,168],[446,312],[500,238],[528,116],
  [568,347],[594,194],[661,104],[662,273],[727,184],[691,392],[746,325],
  [91,384],[373,19],[555,26],[790,237],[296,448],[529,444],[172,440],
].map(([x,y], i) => ({id: i < 26 ? String.fromCharCode(65+i) : `A${String.fromCharCode(65+i-26)}`, x, y}))
export const heroEdges: GraphEdge[] = [[0,1],[0,2],[0,3],[1,3],[1,4],[2,3],[2,5],[2,21],[3,4],[3,6],[3,7],[4,6],[4,22],[5,7],[5,8],[5,21],[5,27],[6,7],[6,9],[6,10],[6,22],[7,10],[7,11],[7,8],[8,11],[8,25],[8,26],[9,10],[9,13],[9,23],[10,11],[10,12],[10,13],[11,12],[11,14],[12,13],[12,14],[12,15],[13,15],[13,16],[13,23],[14,15],[14,17],[14,19],[14,26],[15,16],[15,17],[15,18],[16,18],[17,18],[17,19],[17,20],[18,20],[18,24],[19,20],[20,24],[21,27],[22,9],[23,16],[25,26],[25,27]]
export const heroSteps = runBfs(heroNodes, heroEdges, 0, 18)
