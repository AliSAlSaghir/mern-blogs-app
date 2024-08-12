import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreatePostMutation } from "../redux/api/posts";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageUploadProgress, setImageUploadProgress] = useState(null);

  const navigate = useNavigate();

  const [createPost, { isLoading }] = useCreatePostMutation();

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        toast.error("Please select an image");
        return;
      }
      toast.error(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        error => {
          toast.error("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            setImageUploadProgress(null);
            toast.error(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      toast.error("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await createPost(formData);
      console.log(res);

      toast.success("Post created successfully");
      navigate(`/post/${res.data.slug}`);
    } catch (error) {
      console.log(error.error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="max-w-3xl min-h-screen p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
          <Select
            onChange={e =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-4 p-3 border-4 border-teal-500 border-dotted">
          <FileInput
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="object-cover w-full h-72"
          />
        )}

        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="mb-12 h-72"
          required
          onChange={value => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
      </form>
    </div>
  );
}
