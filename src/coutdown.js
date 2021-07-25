import React, {useState, useEffect, useRef} from 'react'

/**
 * 定时器组件
 * 使用方式为传入child方式
 * endTime, 结束时间的毫秒
 * nowTime, 当前时间的毫秒
 * endCallback 结束事件
 */
const CoutDown = (props) => {
    const {start} = props
    const {endTime, nowTime, endCallback} = props
    const startFrom = {
        days: 1,
        hour: 2
    }
    const time = endTime - nowTime
    let timeRef = useRef(time)
    const [days, setDays] = useState('')
    const [hour, setHour] = useState('')
    const [minute, setMinute] = useState('')
    const [second, setSecond] = useState('')
    let timer = null
    const setToEnd = () => {
        setDays(0)
        setHour(0)
        setMinute(0)
        setSecond(0)
    }
    const calcLeftTimes = () => {
        let leftTimes = timeRef.current
        if (leftTimes <= 0) {
            console.log('end')
            setToEnd()
            endCallback && endCallback()
            clearInterval(timer)
            return
        }
        if (start && startFrom[start]) {
            if (start === 'days') {
                const days = Math.floor(leftTimes / (24 * 60 * 60 * 1000))
                leftTimes -= days * (24 * 60 * 60 * 1000)
                setDays(days)
            }
        }
        const hour = Math.floor(leftTimes / (60 * 60 * 1000))
        leftTimes -= hour * (60 * 60 * 1000)
        setHour(hour)
        const minute = Math.floor(leftTimes / (60 * 1000))
        leftTimes -= minute * (60 * 1000)
        setMinute(minute)
        const second = Math.floor(leftTimes / (1000))
        leftTimes -= second * (1000)
        setSecond(second)
        timeRef.current -= 1000
    }
    useEffect(() => {
        timer = setInterval(() => {
            calcLeftTimes()
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    return props.children(days, hour, minute, second)
}
export default CoutDown