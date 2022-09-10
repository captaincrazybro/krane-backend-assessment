import { DEMO_TEXT } from "../commons";

export default function PostComponent(props: any) {
  return (
    <div className="mb-5 bg-slate-100 text-black">
      <slot className="flex"><a className="Delete-button" onClick={(e) => props.deletePost(e, props.post.id)}>Delete</a></slot>
      <h1 className="py-3">{props.post.title || DEMO_TEXT.TITLE}</h1>
      <p className="p-5">{props.post.textBody || "No Body"}</p>
      <div className="w-full flex align-left">
        <p className="px-3">
          {props.post.createdAt ? new Date(props.post.createdAt).toDateString() : DEMO_TEXT.CREATED_AT}
        </p>
      </div>
    </div>
  );
}
  