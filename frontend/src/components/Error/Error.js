import React from 'react';

const Error = (props) =>{
    return(
        <div class="alert alert-danger">
                        
                               
                                <strong>{props.message}</strong>
                            </div>
    )
}

export default Error;

