import React from 'react';

function Filetab(props){
    return(
        <div className="file-tab">
            <p><i className={props.icon}></i> {props.text}</p>
        </div>
    );
}

export default Filetab;