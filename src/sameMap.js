export const funcSameMap = initMap => {
    var resultMap = initMap.map(v => [...v])
    const len = initMap.length
    var sameGroupNum = 8
    for (let y = 0; y < len; y++) {
        for (let x = 0; x < len; x++) {
            if (resultMap[y][x] !== 0) {
                continue
            }
            sameGroupNum++
            var ary = []
            ary.push([y, x])
            while (ary.length > 0) {
                var aryTop = ary.shift()
                const [targetY, targetX] = aryTop
                resultMap[targetY][targetX] = sameGroupNum
                if (targetX + 1 < len && resultMap[targetY][targetX + 1] >= 0 && resultMap[targetY][targetX + 1] < 9) {
                    if (resultMap[targetY][targetX + 1] === 0) {
                        ary.push([targetY, targetX + 1])
                    }
                    resultMap[targetY][targetX + 1] = sameGroupNum
                }
                if (targetY + 1 < len && resultMap[targetY + 1][targetX] >= 0 && resultMap[targetY + 1][targetX] < 9) {
                    if (resultMap[targetY + 1][targetX] === 0) {
                        ary.push([targetY + 1, targetX])
                    }
                    resultMap[targetY + 1][targetX] = sameGroupNum
                }
                if (0 <= targetX - 1 && resultMap[targetY][targetX - 1] >= 0 && resultMap[targetY][targetX - 1] < 9) {
                    if (resultMap[targetY][targetX - 1] === 0) {
                        ary.push([targetY, targetX - 1])
                    }
                    resultMap[targetY][targetX - 1] = sameGroupNum
                }
                if (0 < targetY - 1 && resultMap[targetY - 1][targetX] >= 0 && resultMap[targetY - 1][targetX] < 9) {
                    if (resultMap[targetY - 1][targetX] === 0) {
                        ary.push([targetY - 1, targetX])
                    }
                    resultMap[targetY - 1][targetX] = sameGroupNum
                }
            }
        }
    }
    return resultMap
}
