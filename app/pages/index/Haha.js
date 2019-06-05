import React, { Component, useRef, useImperativeHandle } from 'react';
import {DragSource, DropTarget} from 'react-dnd';

const Haha = React.forwardRef((props, ref) => {
    // 函数式组件有一个东西叫做hook，组件的DOM本身，叫做hook钩子。
    const elementRef = useRef(null);
    props.connectDragSource(elementRef);
    props.connectDropTarget(elementRef);

    useImperativeHandle(ref, () => ({
        getNode: () => elementRef.current
    }));
    
    return <h1 ref={elementRef}>{props.chinese}</h1>;
});

export default DropTarget(
    'A',
    {
        hover(
			props,
			monitor,
			component,
		) {
			if (!component) {
				return null;
			}
			// node = HTML Div element from imperative API
			const node = component.getNode();
			if (!node) {
				return null;
			}

			const dragIndex = monitor.getItem().index;
			const hoverIndex = props.index;

			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}

			// Determine rectangle on screen
			const hoverBoundingRect = node.getBoundingClientRect();

			// Get vertical middle
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

			// Determine mouse position
			const clientOffset = monitor.getClientOffset();

			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%

			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
            }
            
			// Time to actually perform the action
			props.movehaha(dragIndex, hoverIndex);

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			monitor.getItem().index = hoverIndex;
		}
    },
    (connect) => ({
		connectDropTarget: connect.dropTarget()
	})
)(
    DragSource(
        'A',
        {
            beginDrag: (props) => ({
                
            })
        },
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
        })
    )(Haha)    
);


