import React, {useState} from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var check = new Array(10);
for(let i = 0 ; i < 10 ; i++) check[i] = new Array(10);
for(let i = 0 ; i < 10 ; i++) for(let j = 0 ; j < 10 ; j++) check[i][j] = 0;

const addElement = (value , startSeg , endSeg , setElements , elName , unit , hasValue , volId , setStartSeg , setEndSeg) => {
    if(hasValue && value <= 0) {
        toast.error('Value is missed!', {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setStartSeg("0");
            setEndSeg("0");
            return;
    }
    if(startSeg == 0 || endSeg == 0) {
        toast.error('Segments cannot leave empty!', {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setStartSeg("0");
            setEndSeg("0");
            return;
    }
    if(check[startSeg][endSeg] == 1) {
        toast.error('This place is full!', {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setStartSeg("0");
            setEndSeg("0");
            return;
    }
    else {
        check[startSeg][endSeg] = 1;
        check[endSeg][startSeg] = 1;
        setElements(oldArr => [...oldArr , {name : elName , unit : unit , value : (hasValue ? value : undefined) , startSeg : startSeg , endSeg : endSeg , id : volId}])
        setStartSeg("0");
        setEndSeg("0");
    }
}

const Modal = ({setElements , modalName , modalId , elName , unit , hasValue , isVol , volId}) => {
    const [value , setValue] = useState(0)
    const [startSeg , setStartSeg] = useState("0")
    const [endSeg , setEndSeg] = useState("0")

    return (
    <div class="modal fade" id={modalId} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header" style={{background : "wheat"}}>
            <h5 class="modal-title" id="exampleModalLabel">{modalName}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body" style={{background : "#d3d3d3"}}>
            {hasValue && <div class="form-group">
                <label for="exampleFormControlInput1">Value</label>
                <input style={{background : "wheat"}} required onChange={e => setValue(e.target.value)} className="form-control text-center" id="exampleFormControlInput1" placeholder={"Value("+unit+")"} />
            </div>}
            <div class="form-group">
            <label for="StartSegment">Start Segment</label>
            <select style={{background : "wheat"}} onChange={e => setStartSeg(e.target.value)} class="form-control" id="StartSegment">
                <option value={0}>EMPTY</option>
                <option value={1} selected={startSeg == 1}>1</option>
                <option value={2} selected={startSeg == 2}>2</option>
                <option value={3} selected={startSeg == 3}>3</option>
                <option value={4} selected={startSeg == 4}>4</option>
                <option value={5} selected={startSeg == 5}>5</option>
                <option value={6} selected={startSeg == 6}>6</option>
                <option value={7} selected={startSeg == 7}>7</option>
                <option value={8} selected={startSeg == 8}>8</option>
                <option value={9} selected={startSeg == 9}>9</option>
            </select>
            </div>
            <div class="form-group">
            <label for="EndSegment">End Segment</label>
            <select style={{background : "wheat"}} onChange={e => setEndSeg(e.target.value)} class="form-control" id="EndSegment">
                <option value={0}>EMPTY</option>
                {(startSeg == 4 || startSeg == 2 ) && <option value={1} selected={endSeg == 1}>1</option>}
                {(startSeg == 1 || startSeg == 5 || startSeg == 3 ) && <option selected={endSeg == 2} value={2}>2</option>}
                {(startSeg == 2 || startSeg == 6 ) && <option selected={endSeg == 3} value={3}>3</option>}
                {(startSeg == 1 || startSeg == 7 || startSeg == 5 ) && <option selected={endSeg == 4} value={4}>4</option>}
                {(startSeg == 4 || startSeg == 2 || startSeg == 6 || startSeg == 8 ) && <option selected={endSeg == 5} value={5}>5</option>}
                {(startSeg == 3 || startSeg == 9 || startSeg == 5 ) && <option selected={endSeg == 6} value={6}>6</option>}
                {(startSeg == 4 || startSeg == 8 ) && <option selected={endSeg == 7} value={7}>7</option>}
                {(startSeg == 5 || startSeg == 7 || startSeg == 9 ) && <option selected={endSeg == 8} value={8}>8</option>}
                {(startSeg == 8 || startSeg == 6) && <option selected={endSeg == 9} value={9}>9</option>}
            </select>
            </div>
        </div>
        <div class="modal-footer" style={{background : "wheat"}}>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            <button type="button" onClick = {() => addElement(value , startSeg , endSeg , setElements , elName , unit , hasValue , volId , setStartSeg , setEndSeg)} data-dismiss="modal" class="btn btn-success">Add</button>
        </div>
        </div>
    </div>
    </div>
    );
}
  
export default Modal;





