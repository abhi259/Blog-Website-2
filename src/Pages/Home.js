import { useEffect, useState } from "react"
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore"
import { db, auth } from "../firebase-config"
import { AiOutlinePlus } from "react-icons/ai"
import { FaTrashAlt } from "react-icons/fa"

function Home({ isAuth, setIsAuth }) {
  const [title, setTitle] = useState("")
  const [postText, setPostText] = useState("")
  const [postList, setPostList] = useState([])
  const [count, setCount] = useState(0)

  const postCollectionRef = collection(db, "posts")
  const sortedCollection = query(postCollectionRef, orderBy("date", "desc"))

  let date = new Date()
  let day = date.getDate()
  let month = date.toLocaleString("default", { month: "long" })
  let year = date.getFullYear()

  let formatedTime = new Intl.DateTimeFormat("default", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  }).format(date)

  let formatedDate = `${formatedTime} - ${day} ${month}, ${year}`

  async function createPost() {
    await addDoc(postCollectionRef, {
      title,
      postText,
      date,
      formatedDate,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
        image: auth.currentUser.photoURL,
      },
    })
    setCount((prevState) => prevState + 1)
  }
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(sortedCollection)
      setPostList(
        data.docs.map((post) => ({
          ...post.data(),
          id: post.id,
        }))
      )
      console.log(postList)
    }
    getPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, isAuth])

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id)
    await deleteDoc(postDoc)
    setCount((prevState) => prevState - 1)
  }

  return (
    <div className="flex flex-col  items-center grow ">
      <form className="bg-[#373C41] p-5 rounded-xl max-w-[90%] w-[600px] my-10 relative text-[#d7d7d7] shadow-xl shadow-black caret-white">
        <div className="text-[#d1d1d1]">
          <input
            className="w-[100%] border-none outline-none text-2xl font-semibold bg-[#373C41]"
            placeholder="Title"
            onChange={(event) => {
              setTitle(event.target.value)
            }}
          ></input>
        </div>
        <div className="text-[#d1d1d1]">
          <textarea
            placeholder="Write Something..."
            className="resize-none text-xl outline-none w-[100%] h-32 mt-5 bg-[#373C41]"
            onChange={(event) => setPostText(event.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end absolute w-[90%] top-[202px]">
          {isAuth && (
            <button
              type="reset"
              onClick={createPost}
              className="bg-cyan-600 h-12 w-12  rounded-full  flex items-center justify-center"
            >
              <AiOutlinePlus />
            </button>
          )}

          {!isAuth && (
            <button
              type="reset"
              onClick={(event) => {
                event.preventDefault()
                alert("Please Login to add your post")
              }}
              className="bg-cyan-600 h-12 w-12  rounded-full  flex items-center justify-center"
            >
              <AiOutlinePlus />
            </button>
          )}
        </div>
      </form>

      <div className="flex flex-wrap justify-center ">
        {postList.map((post) => {
          return (
            <div
              key={post.id}
              className="flex justify-between bg-[#373C41] rounded-xl shadow-xl shadow-black text-[#d1d1d1] m-5 p-7   w-[350px] md:w-[500px] "
            >
              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="text-2xl font-semibold pr-2">{post.title}</h1>
                  <p className="my-6 h-32 overflow-auto pr-2">
                    {post.postText}
                  </p>
                </div>
                <div className="flex">
                  <div>
                    <img
                      src={post.author.image}
                      alt={post.author.name}
                      className="h-12 w-12 rounded-full"
                    />
                  </div>

                  <div className="flex flex-col pl-2 justify-around">
                    <p className="font-semibold">{post.author.name}</p>
                    <p>{post.formatedDate}</p>
                  </div>
                </div>
              </div>
              <div>
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id)
                    }}
                  >
                    <FaTrashAlt className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
