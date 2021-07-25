# 源代码
```
src/coutdown.js
```

# 例子
```
<CoutDown
    start="days"
    endTime={endTime}
    nowTime={nowTime}
    endCallback={endCallback}>
    {(days, hour, minute, second) => {
        return <>
            <span>{days}天 : </span>
            <span>{hour}小时 : </span>
            <span>{minute}分 : </span>
            <span>{second}秒</span>
        </>
    }}
</CoutDown>

```