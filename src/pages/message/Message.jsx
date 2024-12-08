import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", id],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => res.data),
    refetchOnWindowFocus: false, // Optional: Disable refetch on window focus if not needed
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onMutate: (newMessage) => {
      // Optimistically update the cache
      queryClient.setQueryData(["messages", id], (oldData) => {
        return [...oldData, newMessage]; // Append the new message
      });
    },
    onSuccess: () => {
      // Invalidate the "messages" query to refetch the latest messages after sending
      queryClient.invalidateQueries(["messages", id]);
    },
  });

  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null); // Reference to scroll to the bottom

  // Handle the message input
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle form submission when pressing Enter
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        conversationId: id,
        desc: message,
        userId: currentUser._id, // Make sure to include userId
      };
      mutation.mutate(newMessage);
      setMessage(""); // Clear the textarea after submitting the message
    }
  };

  // Handle keypress events for Enter and Shift + Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default Enter behavior (new line)
      handleSubmit(e); // Submit message
    }
  };

  // Scroll to the bottom of the messages whenever they change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]); // Re-run effect when data changes (new message)

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> > John Doe >
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div
                className={m.userId === currentUser._id ? "owner item" : "item"}
                key={m._id}
              >
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
            {/* Scroll to the bottom of the chat */}
            <div ref={messagesEndRef} />
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea
            type="text"
            placeholder="Write a message"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown} // Add keydown event listener
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
