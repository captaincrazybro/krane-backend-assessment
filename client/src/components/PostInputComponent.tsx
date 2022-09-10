export function PostInputComponent(props: any) {
  return (
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
}