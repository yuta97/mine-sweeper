import { useState } from 'react'
import { funcSameMap } from './sameMap'
import { funcInitMap } from './initMap'

export const Main = () => {
    const [open, setOpen] = useState(initOpen)
    const [flag, setFlag] = useState(initOpen)
    return (
        <>
            <h1>Mine Sweeper!</h1>
            <div>
                {initMap.map((v, i) => (
                    <Line key={i} line={v} open={open} setOpen={setOpen} flag={flag} setFlag={setFlag} y={i} />
                ))}
            </div>
        </>
    )
}
const len = 9
const initMap = funcInitMap(len, 5)
const sameMap = funcSameMap(initMap)
const initOpen = [...Array(len)].map(() => [...Array(len)].map(() => false))

const createChild = element => {
    if (element === -1) {
        return '●'
    }
    if (element >= 1) {
        return element
    }
    return ''
}
const createNewMap = (element, open, x, y) => {
    if (element === 0) {
        return open.map((v_y, i_y) =>
            v_y.map((v_x, i_x) => ((i_y === y && i_x === x) || sameMap[i_y][i_x] === sameMap[y][x] ? true : v_x))
        )
    }
    return open.map((v_y, i_y) => v_y.map((v_x, i_x) => (i_y === y && i_x === x ? true : v_x)))
}
const BaseBlock = ({ style, onClick, onContextMenu, children }) => {
    return (
        <div
            style={{ height: 30, width: 30, border: '1px solid #000', ...style }}
            onContextMenu={onContextMenu}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
const Block = ({ element, open, setOpen, x, y, flag, setFlag }) => {
    if (open[y][x]) {
        return <BaseBlock>{createChild(element)}</BaseBlock>
    }
    if (flag[y][x]) {
        const newFlag = flag.map((v_y, i_y) => v_y.map((v_x, i_x) => (i_y === y && i_x === x ? false : v_x)))
        return (
            <BaseBlock
                onContextMenu={event => {
                    event.preventDefault()
                    setFlag(newFlag)
                }}
            >
                🏴
            </BaseBlock>
        )
    }
    const newFlag = flag.map((v_y, i_y) => v_y.map((v_x, i_x) => (i_y === y && i_x === x ? true : v_x)))
    const newOpen = createNewMap(element, open, x, y)
    return (
        <BaseBlock
            style={{ backgroundColor: 'gray' }}
            onClick={() => setOpen(newOpen)}
            onContextMenu={event => {
                event.preventDefault()
                setFlag(newFlag)
            }}
        ></BaseBlock>
    )
}
const Line = ({ line, open, setOpen, y, flag, setFlag }) => {
    return (
        <div style={{ display: 'flex' }}>
            {line.map((v, i) => (
                <Block key={i} element={v} open={open} setOpen={setOpen} flag={flag} setFlag={setFlag} x={i} y={y} />
            ))}
        </div>
    )
}
