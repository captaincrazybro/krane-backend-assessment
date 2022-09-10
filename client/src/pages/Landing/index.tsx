import { useReducer, useState } from "react";
import axios from "axios";
import { useFetch } from "../../hooks/useFetch";
import { API_ENDPOINT } from "../../commons/";
import PostComponent from "../../components/PostComponent";
import { PostInputComponent } from "../../components/PostInputComponent";
import "./styles.css";

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
