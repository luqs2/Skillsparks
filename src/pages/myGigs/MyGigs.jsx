import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import waste from "../../assets/img/icon/waste.png";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyGigs() {


  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  if (!currentUser) {
    return <div>Please log in to view your gigs.</div>;
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () => {
      console.log("Fetching gigs with userId:", currentUser?.id);
      return newRequest
        .get(`/gigs?userId=${currentUser?._id}`)
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((err) => {
          console.error(err);
          throw new Error("Error fetching gigs");
        });
    },
  });

  const mutation = useMutation({
    mutationFn: (id) => newRequest.delete(`/gigs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
    onError: (err) => {
      console.error("Error deleting gig:", err);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this gig?")) {
      mutation.mutate(id);
    }
  };

  return (
    <div className="myGigs">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="container">
          <div className="title">
            <h1>My Gigs</h1>
            {currentUser?.isSeller && (
              <Link to="/add">
                <button>Add New Gig</button>
              </Link>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((gig) => (
                  <tr key={gig._id}>
                    <td>
                      <img
                        className="image"
                        src={gig.cover}
                        alt="Gig Cover"
                      />
                    </td>
                    <td>{gig.title}</td>
                    <td>RM{gig.price}</td>
                    <td>{gig.sales}</td>
                    <td>
                      <img
                        className="delete"
                        src={waste}
                        alt="Delete Icon"
                        onClick={() => handleDelete(gig._id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No gigs found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGigs;
