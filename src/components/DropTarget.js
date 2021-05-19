// https://www.pluralsight.com/guides/drag-and-drop-react-components
export function DropTarget(props) {
  function dragOver(ev) {
    ev.preventDefault();
  }

  function drop(ev) {
    const droppedItem = JSON.parse(ev.dataTransfer.getData("drag-item"));
    if (droppedItem) {
      props.onItemDropped(droppedItem);
    }
  }

  return (
    <div onDragOver={dragOver} onDrop={drop} className={props.className}>
      {props.children}
    </div>
  );
}
