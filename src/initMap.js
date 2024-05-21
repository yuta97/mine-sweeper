export const funcInitMap = (len, CountBomb) => {
    var baseMap = [...Array(len)].map(() => [...Array(len)].map(() => 0))
    var bombs = [...Array(CountBomb)].map(() => [
        Math.floor(Math.random() * (len - 1)),
        Math.floor(Math.random() * (len - 1)),
    ])
    bombs.forEach(v => {
        const [y, x] = v
        baseMap[y][x] = -1
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const targetX = x + i - 1
                const targetY = y + j - 1
                if (
                    (targetX === x && targetY === y) ||
                    targetX < 0 ||
                    targetY < 0 ||
                    targetX > len ||
                    targetY > len ||
                    baseMap[targetY][targetX] === -1
                ) {
                    continue
                }
                baseMap[targetY][targetX]++
            }
        }
    })
    return baseMap
}
