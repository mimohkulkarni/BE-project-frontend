import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-recognition";
import SpeechRecognition from "react-speech-recognition/lib/SpeechRecognition";
import '../assets/css/drag.css';
import '../assets/css/mic.css';
import '../assets/css/styles.css';
import '../assets/css/waves.css';

const Home = () =>{

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const [databaseFile, setDatabaseFile] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const [showData, setShowData] = useState(false);
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(data);
    const [isListening, setIsListening] = useState(false);
    const [dataError, setDataError] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
      setQuery(transcript);
    }, [transcript]);

    useEffect(() => {
      setFilteredData(data);
    }, [data]);

    const onFileUpload = event => {
        if(event.target.files[0]){
            setDatabaseFile(event.target.files[0]);
        }
    }

    const toogleListening = () => {
        if(!isListening){
            setIsListening(true);
            resetTranscript();            
            SpeechRecognition.startListening();
        }
    }

    const onQuerySubmit = () => {
        document.getElementById("record-toggle").checked = false;
        stopListening();
    }

    const onSearchChange = value => {
        if(value && data){
            const new_data = data.filter(record => { 
                if(JSON.stringify(record).toLowerCase().includes(value)) return {...JSON.stringify(record).includes(value)}; 
                return false;                
            });
            setFilteredData(new_data);
        }
    }

    const stopListening = async () => {
        SpeechRecognition.stopListening();
        setIsListening(false);
        if(query && databaseFile){
            setShowData(true);
            setShowLoader(true);
            setData(null);
            setDataError(null);
            const form = new FormData();
            form.append("query",query);
            form.append("file",databaseFile);
            await axios.post("http://127.0.0.1:5000/",form,{headers: {'Content-Type': 'multipart/form-data'}})
                .then(res => {
                    if(res.data?.data)
                        setData(res.data.data);
                    else
                        setDataError("Opps! Error occured while fetching the data");
                    setShowLoader(false);
                })
                .catch(err => setDataError("Opps! Error occured while fetching the data"));
        }
        else setDataError("Database file or Voice input not found");
    }

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return(
        <div>
            <div className="jumbotron container-fluid header col-l px-0">
                <nav className="navbar navbar-expand-lg navbar-dark shadow-5-strong">
                        <div className="container-fluid">
                            <h1><Link className="navbar-brand" to="/">BE PROJECT</Link></h1>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-mdb-toggle="collapse"
                                data-mdb-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation">
                                <i className="fas fa-bars"></i>
                            </button>
                        
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="#upload">Upload</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#data">Output</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                </nav>
                <hr style={{backgroundColor: 'black', height: '2px'}}/>
                <div className="inner-header flex">
                    <div className="container">
                        <input type="checkbox" name="toggle" id="record-toggle"/>
                        <svg viewBox="0 0 100 100">
                            <circle cx="50%" cy="50%" r="45" className="circle-svg" />
                        </svg>
                        <div className="mic">
                            <div className="mic__head"></div>
                            <div className="mic__neck"></div>
                            <div className="mic__leg"></div>
                        </div>
                        <div className="recording">
                            <div className="round"></div>
                            <div className="round"></div>
                            <div className="round"></div>
                        </div>
                        <label htmlFor="record-toggle" className="toggle-label" id="mikeLabel" onClick={toogleListening}></label>
                        <div className="string">
                            {transcript ? 
                                <div className="my-3">
                                    <input type="text" value={query} id="transcript" className="form-control form-control-lg text-center my-4" onChange={e => setQuery(e.target.value)}/>
                                    <button className="btn btn-primary btn-lg" onClick={onQuerySubmit}>Submit</button>
                                </div>
                                : <i><h1>Click on mic icon to start listening</h1></i>}
                            {!databaseFile && <i><small>Please Upload Database File Too</small></i>}
                        </div>
                    </div>
                </div>
                <svg className="waves" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                    <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                    <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                    <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                    <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                    </g>
                </svg>
            </div>
            {showData && 
            <div className="jumbotron-1 inner-header" id="data">
                <div className="container-fluid text-center">
                    <h1 className="fw-bold my-3">{showLoader ? "Extracting Data" : "Extracted Data"}</h1>
                    {showLoader && <div className="spinner-grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
                    {dataError ? <h5 className="w-100 text-danger mt-4">
                        {dataError}
                    </h5> : 
                    !dataError && (filteredData?.length > 0 || data?.length > 0) ? <div className="container mt-2">
                        <input type="text" className="form-control form-control-lg float-end w-25 my-2" placeholder="Search" onChange={e => onSearchChange(e.target.value.trim())} />
                        {filteredData?.length > 0 ? 
                            <table className="table table-bordered" style={{border: '0.5px solid #b2b2b2'}}>
                                <thead className="thead-dark">
                                    <tr>
                                        {Object.keys(filteredData[0]).map((key,i) => 
                                            <th key={i}>{key}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((row,i) => 
                                        <tr key={i}>
                                            {Object.values(row).map((entry,j) => 
                                                <td key={j}>{entry}</td>)}
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        : <h4 className="pt-5">No Data</h4>}
                    </div> : null}
                </div>
            </div>
            }
            <hr/>    
            <div className="jumbotron-1 py-4" id="upload">
                <div className="container-fluid text-center">
                    <h1>Upload Database{databaseFile && <small style={{fontSize: '15px'}}>&emsp;(1 File Seleted)</small>}</h1>
                    <p>
                        <label htmlFor="myDragElement" className="dragAndUpload" data-post-string="?todo=test">
                            <span className="dragAndUploadIcon">
                                <i className="dragAndUploadIconNeutral fas fa-arrow-up"></i>
                                <i className="dragAndUploadIconUploading fas fa-cog fa-spin"></i>
                                <i className="dragAndUploadIconSuccess fas fa-thumbs-up"></i>
                                <i className="dragAndUploadIconFailure fas fa-thumbs-down"></i>
                            </span>
                            <b className="dragAndUploadText">
                                <span className="dragAndUploadTextLarge w-100">Click to upload</span>
                                <span className="dragAndUploadTextSmall">{databaseFile && databaseFile.name}</span>
                            </b>
                            <i className="dragAndUploadCounter">0%</i>
                            <input type="file" multiple="multiple" accept=".sql" className="dragAndUploadManual" name="myDragElement" id="myDragElement" onChange={e => onFileUpload(e)} />
                        </label>
                    </p>
                </div>
            </div>
            <div className="jumbotron" id="footer" >
                <div className="text-center p-3 foot">
                    © 2022 Copyright:
                </div>
            </div>
        </div>
    )
}
export default Home;