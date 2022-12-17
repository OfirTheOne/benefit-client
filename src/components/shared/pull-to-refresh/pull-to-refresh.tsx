

import React, { useState } from 'react';
import './pull-to-refresh.scss';


interface PullToRefreshProps {

}

export const PullToRefresh: React.FC<React.PropsWithChildren<PullToRefreshProps>> = (props) => {
    const [isPulledState, setIsPulledState] = useState(false)
    const { children } = props;

    const onDragStart: React.DOMAttributes<HTMLDivElement>['onDragStart'] = (event) => {
        console.log('dragstart on div: ',);
        event.dataTransfer.setData("taskName", '123');
    }
    const onDragOver: React.DOMAttributes<HTMLDivElement>['onDragOver'] = (event) => {
        setIsPulledState(true)
        event.preventDefault();
    }

    const onDrop: React.DOMAttributes<HTMLDivElement>['onDrop'] = (event) => {
        let taskName = event.dataTransfer.getData("taskName");
        console.log('onDrop: ', taskName);
    }

    return (<div className="drag-container">
        {
            isPulledState ? <div 
                style={{marginTop: '70px', marginBottom: '70px', textAlign:'center'}}
            >
                refresh
            </div>: null
        }
        <div draggable="true" className="draggable"
            onDragOver={(event) => onDragOver(event)}
            onDrop={(event) => onDrop(event)}
        >
            {children}
        </div>
    </div>);
}