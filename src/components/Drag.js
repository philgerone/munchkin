// https://www.pluralsight.com/guides/drag-and-drop-react-components
export function Drag(props) {
  function startDrag(ev) {
    ev.dataTransfer.setData("drag-item", JSON.stringify(props.dataItem));
  }

  return (
    <div draggable onDragStart={startDrag}>
      {props.children}
    </div>
  );
}
