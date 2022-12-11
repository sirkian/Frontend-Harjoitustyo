import { Box, Button, TextField, Typography } from "@mui/material";
import { database } from "../utils/Firebase";
import { ref, push, onValue, remove } from "firebase/database";
import React, { useEffect, useState } from "react";

function Comments(props) {
  const { id, user } = props;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, []);

  const fetchComments = () => {
    const commentRef = ref(database, "comments/" + id + "/");
    onValue(commentRef, (snapshot) => {
      const data = snapshot.val();
      const comments = data
        ? Object.keys(data).map((key) => ({ key, ...data[key] }))
        : [];
      setComments(comments);
    });
  };

  const handleSave = () => {
    if (user) {
      try {
        push(ref(database, "comments/" + id), {
          comment,
          userId: user.uid,
          username: user.displayName,
        });
      } catch (error) {
        console.log(error.message);
      }
      setComment("");
    }
  };

  const handleDelete = (key) => {
    remove(ref(database, "comments/" + id + "/" + key));
  };

  return (
    <Box sx={commentBox}>
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: 1 }}>
        Kommentit
      </Typography>
      {user && (
        <Box
          sx={{ marginY: 3, display: "flex", justifyContent: "space-around" }}
        >
          <TextField
            sx={{ width: "50%" }}
            placeholder="Kommentoi reseptiä"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button color="secondary" onClick={handleSave}>
            Lähetä kommentti
          </Button>
        </Box>
      )}
      {comments.length > 0 ? (
        <Box>
          {comments
            .slice(0)
            .reverse()
            .map((comment) => {
              return (
                <Box sx={commentBg} key={comment.key}>
                  <Typography sx={{ color: "text.contrast", fontSize: 17 }}>
                    {comment.username}
                  </Typography>
                  <Typography sx={{ fontWeight: "light", fontSize: 15 }}>
                    {comment.comment}
                  </Typography>
                  {user && (
                    <>
                      {user.uid === comment.userId && (
                        <Typography
                          sx={deleteText}
                          onClick={() => handleDelete(comment.key)}
                        >
                          Poista
                        </Typography>
                      )}
                    </>
                  )}
                </Box>
              );
            })}
        </Box>
      ) : (
        <Box>
          <Typography sx={{ textAlign: "center" }}>
            Lisää ensimmäinen kommentti!
          </Typography>
        </Box>
      )}
    </Box>
  );
}

const commentBox = {
  backgroundColor: "background.paperContrast",
  marginTop: 5,
  padding: 1,
  borderRadius: 2,
};

const commentBg = {
  backgroundColor: "background.paper",
  marginBottom: 2,
  padding: 1,
  borderRadius: 1,
};

const deleteText = {
  fontWeight: "light",
  fontSize: 14,
  textAlign: "right",
  cursor: "pointer",
};

export default Comments;
