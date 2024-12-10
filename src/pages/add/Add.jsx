import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducer/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";


const Add = () => {
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
};
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({ type: "CHANGE_INPUT", payload: { name: e.target.name, value: e.target.value } });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    const featureValue = e.target.elements[0].value; // Fixed accessing the form input
    if (featureValue) {
      dispatch({ type: "ADD_FEATURE", payload: featureValue });
      e.target.reset(); // Resets the form after submission
    }
  };

  const handleUpload = async () => { // Fixed the async function syntax
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );

      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
      setUploading(false); // Ensure uploading state is updated even on error
    }
  };

  const navigate = useNavigate()
  const queryClient= useQueryClient();
  const mutation = useMutation({
    mutationFn: (gig) =>{
      return newRequest.post("/gigs", gig);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries("myGigs");
      
    }
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/mygigs")
  }

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="cat">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="image">
              <div className="imagesInput">
                <label htmlFor="coverImage">Cover Image</label>
                <input type="file" onChange={(e) => setSingleFile(e.target.files[0])} />
                <label htmlFor="uploadImages">Upload Images</label>
                <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
              id="desc"
              placeholder="Brief descriptions to introduce your service to customers"
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="shortTitle">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="shortDesc">Short Description</label>
            <textarea
              name="shortDesc"
              id="shortDesc"
              placeholder="Short description of your service"
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
            <label htmlFor="deliveryTime">Delivery Time (e.g. 3 days)</label>
            <input
              type="number"
              name="deliveryTime"
              onChange={handleChange}
            />
            <label htmlFor="revisionNumber">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="features">Add Features</label>
            <form onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit" className="add">Add</button>
            </form>
            <div className="addedfeature">
              {state?.features?.map(f=>(

                <div className="item" key={f}>
                <button onClick={()=>dispatch({type:"REMOVE_FEATURE", payload: f})}>{f}
                  <span>X</span>
                </button>
              </div>
              ))
            }
            </div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
