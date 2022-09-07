import { useReducer, useState, useEffect } from "react";
import axios from "axios";
import { useFetch } from "../../hooks/useFetch";
import { IPost } from "../../interfaces";
import { DEMO_TEXT, API_ENDPOINT } from "../../commons/";
import "./styles.css";

const PostComponent = (props: any) => (
  <div className="bg-slate-100 text-black">
    <h1 className="py-3">{props.title || DEMO_TEXT.TITLE}</h1>
    <p className="p-5">{props.textBody || "No Body"}</p>
    <div className="w-full flex align-left">
      <p className="px-3">
        {props.createdAt ? new Date(props.createdAt).toDateString() : DEMO_TEXT.CREATED_AT}
      </p>
    </div>
  </div>
);

const PostInputComponent = (props: any) => (
  <form onSubmit={props.uploadPost} className=" text-black min-h-2/3 flex flex-col gap-5">
    <input
      onChange={(e) => props.setTitle(e.target.value)}
      type="text"
      placeholder="Title..."
      className=" rounded text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 "
    />

    <textarea
      onChange={(e) => props.setBody(e.target.value)}
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

  const uploadPost = async (e: any) => {
    e.preventDefault();
    //@ts-ignore
    try {
      const { data } = await axios.post(API_ENDPOINT.UPLOAD_POST, {
        title: title,
        text_body: body,
      });
      setPosts(() => [data, ...posts]);
      setTitle(undefined);
      setBody(undefined);
      console.log(posts, [data, ...posts]);
    } catch (err: any) {
      console.error("ERROR:", err);
    }
  };

  return (
    <div className="App min-h-screen">
      <header className="App-header bg-black">
        <h1 className="px-5">Krane Assessment</h1>
      </header>
      <section className="App-body flex items-center justify-center">
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
            <PostInputComponent uploadPost={uploadPost} setTitle={setTitle} setBody={setBody} />
          ) : (
            <>
              {posts.map((post: any, i: number) => (
                <PostComponent key={i} {...post} />
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export { LandingPage };
