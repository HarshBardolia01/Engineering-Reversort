import './App.css';
import { React } from 'react';
import { useState } from 'react';
import NumberLine from './components/NumberLine';

function App() {
    const [n, setN] = useState(-1);
    const [c, setC] = useState(-1);
    const [curN, setCurN] = useState(-1);
    const [curC, setCurC] = useState(-1);
    const [nextC, setNextC] = useState(-1);
    const [lowerLimitForN, setLowerLimitForN] = useState(-1);
    const [upperLimitForN, setUpperLimitForN] = useState(-1);
    const [lowerLimitForNm1, setLowerLimitForNm1] = useState(-1);
    const [upperLimitForNm1, setUpperLimitForNm1] = useState(-1);
    const [currentNumber, setCurrentNumber] = useState(1);
    const [simulate, setSimulate] = useState(true);
    const [message, setMessage] = useState("Info about the steps will be shown here!");
    const [disable, setDisable] = useState(false);
    const [perform, setPerform] = useState(false);
    const [showMessage, setShowMessage] = useState(true);
    const [createArray, setCreateArray] = useState(false);
    const [operations, setOperations] = useState([]);
    const [buttonMessage, setButtonMessage] = useState("Create Array!");
    const [hide, setHide] = useState(false);
    const [array, setArray] = useState([]);

    function handleSimulate() {
        if (c < n - 1 || c > ((n * (n + 1)) / 2) - 1) {
            setMessage("This is immpossible, as C is not in valid range for N");
            return;
        }

        setCurN(n);
        setCurC(c);

        let lln = n - 1;
        let uln = ((n * (n + 1)) / 2) - 1;

        setLowerLimitForN(lln);
        setUpperLimitForN(uln);

        let llnm1 = n - 2;
        let ulnm1 = ((n * (n - 1)) / 2) - 1;

        setLowerLimitForNm1(llnm1);
        setUpperLimitForNm1(ulnm1);

        setShowMessage(false);
        setDisable(true);
        setSimulate(false);
    }

    function handlePerform() {
        setCurN(prevVal => prevVal - 1);
        setCurC(nextC);
        setShowMessage(false);
        setPerform(false);
    }

    function handleShow() {
        if (curN === 1) {
            setMessage("We reached the end of array!");
            setShowMessage(true);
            setCreateArray(true);
            return;   
        }

        let lln = curN - 1;
        let uln = ((curN * (curN + 1)) / 2) - 1;

        setLowerLimitForN(lln);
        setUpperLimitForN(uln);

        let llnm1 = curN - 2;
        let ulnm1 = ((curN * (curN - 1)) / 2) - 1;

        setLowerLimitForNm1(llnm1);
        setUpperLimitForNm1(ulnm1);

        if (((curC - 1) >= curN - 2) && ((curC - 1) <= ((curN * (curN - 1)) / 2) - 1)) {
            setNextC(curC - 1);
            setOperations((prevArray) => {
                return [
                    ...prevArray,
                    [currentNumber, 1]
                ];
            })
            setMessage(`As C - 1 is in valid range of C for N - 1, so in the next step we will be for N-1 and C-1. Cost to put ${currentNumber} at its correct possition will be: 1`);
        } else {
            let dif = Math.floor(curC - ((curN * (curN - 1)) / 2) + 1);
            setOperations((prevArray) => {
                return [
                    ...prevArray,
                    [currentNumber, dif]
                ];
            })
            setNextC(curC - dif);
            setMessage(`The smallest cost that can be taken in this step will be ( currentCost - upperLimit of valid range of Cost for N - 1 ). So we will change values of N and C accordingly. Cost to put ${currentNumber} at it correct position will be: ${dif}`);
        }

        setCurrentNumber(prevVal => prevVal + 1);
        setPerform(true);
        setShowMessage(true);
    }

    function reverseInRange(arr, start, end) {
        const res = arr.slice();
        res.splice(start, end - start + 1, ...res.slice(start, end + 1).reverse());
        return res;
    }

    function handleCreate() {
        let arr = [];
        for (let i = 1; i <= n; i++)
            arr.push(i);
        
        for (let i = n - 2; i >= 0; i--) {
            let ele = operations[i][0];
            let cost = operations[i][1];

            let start = arr.indexOf(ele);
            let end = start + cost - 1;

            arr = reverseInRange(arr, start, end);
            console.log(arr);
        }

        console.log(arr);
        setArray(arr);
        setShowMessage(false);
        setHide(true);
        setButtonMessage("Show Array");
    }

    function reset() {
        setN(-1);
        setC(-1);
        setCurN(-1);
        setCurC(-1);
        setNextC(-1);
        setCurrentNumber(1);
        setLowerLimitForN(-1);
        setLowerLimitForNm1(-1);
        setUpperLimitForN(-1);
        setUpperLimitForNm1(-1);
        setSimulate(true);
        setMessage("Info about the steps will be shown here!");
        setDisable(false);
        setPerform(false);
        setShowMessage(true);
        setCreateArray(false);
        setOperations([]);
        setButtonMessage("Create Array!");
        setHide(false);
        setArray([]);
    }

    return (
        <div className="App">
            <h1>Engineering Reversort!</h1>
            <div className='horizontal'>
                <div className='displayBox'> Value of N in input: {n !== -1 && n} </div>
                <div className='displayBox'> Value of C in input: {c !== -1 && c} </div>
            </div>
            <div className='horizontal'>
                {
                    !disable && 
                    <>
                        <input
                            disabled={disable}
                            placeholder='N'
                            type='number'
                            onChange={(e) => {
                                setN(parseInt(e.target.value, 10));
                            }}
                        />

                        <input
                            disabled={disable}
                            placeholder='C'
                            type='number'
                            onChange={(e) => {
                                setC(parseInt(e.target.value, 10));
                            }}
                        />
                    </>
                }

                { simulate && <button onClick={handleSimulate} > Simulate! </button> }
                { !simulate && perform && <button onClick={handlePerform}> Perform next step!</button>}
                { !simulate && !perform && !createArray && <button onClick={handleShow}> Show what will happen! </button>}
                { createArray && !hide && <button onClick={handleCreate}> {buttonMessage} </button>}

            </div>
            { 
                !simulate && perform && 
                <div className='vertical'>
                    <NumberLine curC={curC} lowerLimit='0' upperLimit='30' from={lowerLimitForN} to={upperLimitForN} message="Range of valid C for N --> [ N - 1 ... (N * ( N + 1 )) / 2 - 1 ]" />
                    <NumberLine curC={-1} lowerLimit='0' upperLimit='30' from={lowerLimitForNm1} to={upperLimitForNm1} message="Range of valid C for N-1 --> [ N - 2 ... (N * ( N - 1 )) / 2 - 1 ]" />
                </div>
            }

            { 
                !hide && 
                <div className='horizontal'>
                    <div className='displayBox'><b> Current N: {curN !== -1 && curN} </b></div>
                    <div className='displayBox'><b> Current C: {curC !== -1 && curC} </b></div>
                </div>
            }

            { 
                showMessage && 
                <div className='vertical'>
                    <div className='message'> {message} </div>
                </div>
            }

            {
                hide &&
                <div className='numberLine'>
                    {
                        array.map((ele) => {
                            return <div className='numbersNormal'>{ele}</div>
                        })
                    }
                </div>
            }

            {
                hide && 
                <button onClick={reset}> Try with some other input! </button>
            }
        </div>
    );
}

export default App;
