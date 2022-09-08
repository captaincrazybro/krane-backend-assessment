export default function FunctionLink(props: any) {
  return (
    <button
      type="button"
      className={"link-button" + (!props.className ? "" : " " + props.className)}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}