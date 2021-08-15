import logo from './logo.svg';
import './App.css';
import CoutDown from './dist/coutdown.esm'

function App() {
    const endTime = new Date('2021/08/27 : 11:20:23').getTime()
    const endTime2 = new Date('2021/08/26 : 11:30:23').getTime()
    const nowTime = new Date().getTime()
    const endCallback = () => {
        alert('end callback')
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <div className="coutdown">
                    倒计时剩余时间为：
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
                </div>
                <div>
                    倒计时剩余时间为：
                    <CoutDown
                        start="days"
                        endTime={endTime2}
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
                </div>
            </header>
        </div>
    );
}

export default App;
