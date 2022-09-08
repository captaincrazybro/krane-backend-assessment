import { useReducer, useState } from "react";
import axios from "axios";
import { useFetch } from "../../hooks/useFetch";
import { DEMO_TEXT, API_ENDPOINT } from "../../commons/";
import "./styles.css";

const PostComponent = (props: any) => {
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

const PostInputComponent = (props: any) => (
  <form onSubmit={props.uploadPost} className=" text-black min-h-2/3 flex flex-col gap-5">
    <input
      onChange={(e) => props.setTitle(e.target.value)}
      value={props.title}
      type="text"
      placeholder="Title..."
      className=" rounded text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 "
    />

    <textarea
      onChange={(e) => props.setBody(e.target.value)}
      value={props.body}
      className="block p-2.5 w-full text-sm text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Your message..."
    ></textarea>
    <button
      type="submit"
      className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
    >
      Submit
    </button>
  </form>
);

function LandingPage() {
  const [isPosting, togglePosting] = useReducer((s) => !s, true);
  const [title, setTitle] = useState<string | undefined>("");
  const [body, setBody] = useState<string | undefined>("");
  const [posts, setPosts, error] = useFetch(API_ENDPOINT.GET_POSTS);

  async function deletePost(e: any, id: number) {
    e.preventDefault()
    console.log("deleting post...")
    try {
      const { data } = await axios.post(API_ENDPOINT.DELETE_POST, {
        id: id,
      })
      setPosts((posts: any) => posts.filter((post: any) => post.id != data.id))
    } catch (err: any) {
      console.error("ERROR:", err);
    }
  }

  const uploadPost = async (e: any) => {
    e.preventDefault();
    //@ts-ignore
    try {
      const { data } = await axios.post(API_ENDPOINT.UPLOAD_POST, {
        title: title,
        text_body: body,
      });
      setPosts(() => [data, ...posts]);
      setTitle(() => "");
      setBody(() => "");
    } catch (err: any) {
      console.error("ERROR:", err);
    }
  };

  return (
    <div className="w-2/3 p-5  rounded text-white">
      {error && (
        <div
          className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="font-medium">Error:</span>
          {error}
        </div>
      )}
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl pb-5">Posts</h1>
        <button
          type="button"
          onClick={togglePosting}
          className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
        >
          {isPosting ? "View Posts" : "Make a Post"}
        </button>
      </div>
      {isPosting ? (
        <PostInputComponent uploadPost={uploadPost} title={title} setTitle={setTitle} body={body} setBody={setBody} />
      ) : (
        <>
          {posts.map((post: any, i: number) => (
            <PostComponent deletePost={deletePost} key={i} post={post} />
          ))}
        </>
      )}
    </div>
  );
}

export { LandingPage };
